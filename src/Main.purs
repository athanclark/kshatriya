module Main where

import Prelude
import GPIO (GPIO, GPIOPin, openWrite, write, read, listen, sleep)
import Kshatriya (toGPIOPin, class GPIOPinAble, Lo (..), LoSig (..), Turn (..), TurnSig (..), BrakeHi (..), BrakeSig (..))
import Server (SERVER, engageServer)
import WebSocket (Outgoing (..), onReceive)

import Data.Maybe (Maybe (..))
import Data.Argonaut (encodeJson)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Ref (REF, Ref, newRef, modifyRef, readRef)
import Control.Monad.Eff.Timer (TIMER, setInterval, clearInterval, IntervalId)


main :: forall eff
      . Eff ( console :: CONSOLE
            , gpio    :: GPIO
            , ref     :: REF
            , timer   :: TIMER
            , server  :: SERVER
            | eff) Unit
main = do
  log "Kshatriya starting"

  openWrite (toGPIOPin Lo) false
  openWrite (toGPIOPin TurnL) false
  openWrite (toGPIOPin TurnR) false
  openWrite (toGPIOPin BrakeL) false
  openWrite (toGPIOPin BrakeR) false

  log "Writable GPIO Pins Ready"

  -- Statefully start express server
  engageServer 3000 (log "server started") onReceive $ \send -> do
    log "?!?"

    stateRef <- newRef initialState
    let f = pinCallback (send <<< show <<< encodeJson) stateRef
        listen' :: forall a
                . GPIOPinAble a
                => a -> Eff ( server  :: SERVER
                            , gpio    :: GPIO
                            , ref     :: REF
                            , timer   :: TIMER
                            , console :: CONSOLE
                            | eff) Unit
        listen' x = do
          listen (toGPIOPin x) f
          f (toGPIOPin x)

    listen' LoSig
    listen' TurnSigL
    listen' TurnSigR
    listen' BrakeSig

    log "Readable GPIO Pins Ready"

    log "Kshatriya Ready"



type State =
  { leftBlinker  :: Maybe IntervalId
  , rightBlinker :: Maybe IntervalId
  , braking      :: Boolean
  , lights       :: Boolean
  }

initialState :: State
initialState =
  { leftBlinker  : Nothing
  , rightBlinker : Nothing
  , braking      : false
  , lights       : false
  }


pinCallback :: forall eff
             . (Outgoing -> Eff ( gpio :: GPIO
                                , console :: CONSOLE
                                , ref :: REF
                                , timer :: TIMER
                                | eff) Unit)
            -> Ref State
            -> GPIOPin
            -> Eff ( gpio    :: GPIO
                   , console :: CONSOLE
                   , ref     :: REF
                   , timer   :: TIMER
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
      on <- read (toGPIOPin BrakeSig)
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
  | otherwise =
      log "!?!"
