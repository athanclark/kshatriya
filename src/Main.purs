module Main where

import Prelude
import GPIO (GPIO, GPIOPin, openWrite, write, read, listen, sleep)
import Kshatriya (toGPIOPin, class GPIOPinAble, Lo (..), LoSig (..), Turn (..), TurnSig (..), BrakeHi (..), BrakeSig (..), WheelSig (..), wheelRadius, Horn (..), HornSig (..), FrontEABS (..), BackEABS (..))
import Server (SERVER, engageServer)
import WebSocket (Outgoing (..), onReceive)

import Data.Maybe (Maybe (..))
import Data.Either (Either (..))
import Data.Tuple (Tuple (..))
import Data.Argonaut (encodeJson)
import Data.Time.Duration (Milliseconds (..))
import Data.DateTime.Instant (unInstant)
import Control.Monad (when)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Ref (REF, Ref, newRef, modifyRef, readRef)
import Control.Monad.Eff.Timer (TIMER, setInterval, clearInterval, IntervalId)
import Control.Monad.Eff.Now (NOW, now)
import Math (pi)


main :: forall eff
      . Eff ( console :: CONSOLE
            , gpio    :: GPIO
            , ref     :: REF
            , timer   :: TIMER
            , server  :: SERVER
            , now     :: NOW
            | eff) Unit
main = do
  log "Kshatriya starting"

  -- Statefully start express server
  engageServer 3000 (log "server started") onReceive $ \send -> do
    stateRef <- newRef initialState
    let f = pinCallback (send <<< show <<< encodeJson) stateRef
        listen' :: forall a b c
                . GPIOPinAble a
                => GPIOPinAble b
                => a
                -> Maybe (Either b (Tuple b b))
                -> Eff ( server  :: SERVER
                       , gpio    :: GPIO
                       , ref     :: REF
                       , timer   :: TIMER
                       , console :: CONSOLE
                       , now     :: NOW
                       | eff) Unit
        listen' x meY = do
          listen (toGPIOPin x) f
          q <- read (toGPIOPin x)
          case meY of
            Nothing -> pure unit
            Just ey -> case ey of
              Left y -> openWrite (toGPIOPin y) q
              Right (Tuple y y') -> do
                openWrite (toGPIOPin y) q
                openWrite (toGPIOPin y') q
          f (toGPIOPin x)

    listen' LoSig    $ Just $ (Left Lo :: Either Lo (Tuple Lo Lo))
    listen' TurnSigL $ Just $ (Left TurnL :: Either Turn (Tuple Turn Turn))
    listen' TurnSigR $ Just $ (Left TurnR :: Either Turn (Tuple Turn Turn))
    listen' WheelSig (Nothing :: Maybe (Either Lo (Tuple Lo Lo)))
    listen' HornSig  $ Just $ (Left Horn :: Either Horn (Tuple Horn Horn))
    listen (toGPIOPin BrakeSig) f
    q <- read (toGPIOPin BrakeSig)
    openWrite (toGPIOPin BrakeL) q
    openWrite (toGPIOPin BrakeR) q
    openWrite (toGPIOPin FrontEABS) q
    openWrite (toGPIOPin BackEABS) q
    f (toGPIOPin BrakeSig)

    log "GPIO Pins Ready"

    log "Kshatriya Ready"


data SensorState
  = HitSensor
  | LeftSensor


type State =
  { leftBlinker  :: Maybe IntervalId
  , rightBlinker :: Maybe IntervalId
  , braking      :: Boolean
  , lights       :: Boolean
  , wheel        ::
      { lastHit   :: Maybe Milliseconds
      , sensor    :: SensorState
      , lastSpeed :: Maybe Number
      }
  }

initialState :: State
initialState =
  { leftBlinker  : Nothing
  , rightBlinker : Nothing
  , braking      : false
  , lights       : false
  , wheel        :
      { lastHit   : Nothing
      , sensor    : LeftSensor
      , lastSpeed : Nothing
      }
  }


pinCallback :: forall eff
             . (Outgoing -> Eff ( gpio :: GPIO
                                , console :: CONSOLE
                                , ref :: REF
                                , timer :: TIMER
                                , now :: NOW
                                | eff) Unit)
            -> Ref State
            -> GPIOPin
            -> Eff ( gpio    :: GPIO
                   , console :: CONSOLE
                   , ref     :: REF
                   , timer   :: TIMER
                   , now     :: NOW
                   | eff) Unit
pinCallback dispatchWS stateRef pin
  | pin == toGPIOPin LoSig = do
      on <- read (toGPIOPin LoSig)
      log $ "Low signal: " <> show on
      write (toGPIOPin Lo) on
      modifyRef stateRef $ _ {lights = on}
      dispatchWS $ ChangedLights on
  | pin == toGPIOPin TurnSigL = do
      on <- read (toGPIOPin TurnSigL)
      log $ "Left signal: " <> show on
      {leftBlinker,braking} <- readRef stateRef
      if on
        then case leftBlinker of
               Nothing -> do
                 switcherRef <- newRef false
                 id <- setInterval 300 $ do
                   x <- readRef switcherRef
                   modifyRef switcherRef not
                   write (toGPIOPin TurnL) x
                   write (toGPIOPin BrakeL) x
                 modifyRef stateRef $ _ {leftBlinker = Just id}
                 dispatchWS TurnLeft
               _       -> pure unit
        else case leftBlinker of
               Just id -> do
                 clearInterval id
                 modifyRef stateRef $ _ {leftBlinker = Nothing}
                 write (toGPIOPin TurnL) false
                 write (toGPIOPin BrakeL) braking
                 dispatchWS NoTurn
               _ -> pure unit
  | pin == toGPIOPin TurnSigR = do
      on <- read (toGPIOPin TurnSigR)
      log $ "Right signal: " <> show on
      {rightBlinker,braking} <- readRef stateRef
      if on
        then case rightBlinker of
               Nothing -> do
                 switcherRef <- newRef false
                 id <- setInterval 300 $ do
                   x <- readRef switcherRef
                   modifyRef switcherRef not
                   write (toGPIOPin TurnR) x
                   write (toGPIOPin BrakeR) x
                 modifyRef stateRef $ _ {rightBlinker = Just id}
                 dispatchWS TurnRight
               _       -> pure unit
        else case rightBlinker of
               Just id -> do
                 clearInterval id
                 modifyRef stateRef $ _ {rightBlinker = Nothing}
                 write (toGPIOPin TurnR) false
                 write (toGPIOPin BrakeR) braking
                 dispatchWS NoTurn
               _ -> pure unit
  | pin == toGPIOPin BrakeSig = do
      on' <- read (toGPIOPin BrakeSig)
      let on = not on'
      log $ "Brake signal: " <> show on
      modifyRef stateRef $ _ {braking = on}
      dispatchWS $ ChangedBraking on
      {leftBlinker,rightBlinker} <- readRef stateRef
      case leftBlinker of
        Nothing -> write (toGPIOPin BrakeL) on
        _       -> pure unit
      case rightBlinker of
        Nothing -> write (toGPIOPin BrakeR) on
        _       -> pure unit
      write (toGPIOPin FrontEABS) on
      write (toGPIOPin BackEABS) on
  | pin == toGPIOPin HornSig = do
      on <- read (toGPIOPin HornSig)
      log $ "Horn signal: " <> show on
      dispatchWS $ ChangedHorn on
      write (toGPIOPin Horn) on
  | pin == toGPIOPin WheelSig = do
      on <- read (toGPIOPin WheelSig)
      {wheel} <- readRef stateRef
      case wheel of
        {lastHit,sensor,lastSpeed} ->
          if on
            then case sensor of
              LeftSensor -> case lastHit of
                Nothing -> do
                  x <- unInstant <$> now
                  modifyRef stateRef $
                    _ { wheel =
                          { sensor : HitSensor
                          , lastHit : Just x
                          , lastSpeed : Nothing
                          }
                      }
                Just last -> do
                  x <- unInstant <$> now
                  let Milliseconds dur = x - last
                      circum = 2.0 * pi * wheelRadius
                      spd = circum / dur
                  case lastSpeed of
                    Nothing -> do
                      let spd_ = (3.0 / 4.0) * spd
                      log $ "New speed: " <> show spd_
                      when (spd_ * 1000.0 * 2.23694 <= 50.0) $ do
                        dispatchWS $ ChangedSpeed spd_
                        modifyRef stateRef $ _ { wheel = { lastHit : Just x
                                                        , lastSpeed : Just spd_
                                                        , sensor : HitSensor
                                                        }
                                              }
                    Just spd' -> do
                      let spd_ = ((3.0 / 4.0) * (spd - spd')) + spd'
                      log $ "New speed: " <> show spd'
                      when (spd_ * 1000.0 * 2.23694 <= 50.0) $ do
                        dispatchWS $ ChangedSpeed spd_
                        modifyRef stateRef $ _ { wheel = { lastHit : Just x
                                                        , lastSpeed : Just spd_
                                                        , sensor : HitSensor
                                                        }
                                              }
              HitSensor -> pure unit
            else case sensor of
              LeftSensor -> pure unit
              HitSensor -> modifyRef stateRef $ \state ->
                state { wheel = state.wheel { sensor = LeftSensor } }
  | otherwise =
      log "!?!"
