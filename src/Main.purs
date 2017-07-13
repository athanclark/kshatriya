module Main where

import Prelude
import GPIO (GPIO, GPIOPin, openWrite, write, read, listen, sleep)
import Kshatriya (toGPIOPin, Lo (..), LoSig (..), Turn (..), TurnSig (..), BrakeHi (..), BrakeSig (..))

import Data.Maybe (Maybe (..))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Ref (REF, Ref, newRef, modifyRef, readRef)
import Control.Monad.Eff.Timer (TIMER, setInterval, clearInterval, IntervalId)


main :: forall e. Eff ( console :: CONSOLE
                      , gpio    :: GPIO
                      , ref     :: REF
                      , timer   :: TIMER
                      | e) Unit
main = do
  log "Hello sailor!"

  openWrite (toGPIOPin Lo) false
  openWrite (toGPIOPin TurnL) false
  openWrite (toGPIOPin TurnR) false
  openWrite (toGPIOPin BrakeL) false
  openWrite (toGPIOPin BrakeR) false

  stateRef <- newRef initialState

  let f = pinCallback stateRef

  listen (toGPIOPin LoSig) f
  listen (toGPIOPin TurnSigL) f
  listen (toGPIOPin TurnSigR) f
  listen (toGPIOPin BrakeSig) f

  sleep 10000



type State =
  { leftBlinker  :: Maybe IntervalId
  , rightBlinker :: Maybe IntervalId
  , braking      :: Boolean
  }

initialState :: State
initialState =
  { leftBlinker  : Nothing
  , rightBlinker : Nothing
  , braking      : false
  }



pinCallback :: forall eff
             . Ref State
            -> GPIOPin
            -> Eff ( gpio    :: GPIO
                   , console :: CONSOLE
                   , ref     :: REF
                   , timer   :: TIMER
                   | eff) Unit
pinCallback stateRef pin
  | pin == toGPIOPin LoSig = do
      on <- read (toGPIOPin LoSig)
      log $ "Low signal: " <> show on
      if on
        then write (toGPIOPin Lo) true
        else write (toGPIOPin Lo) false
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
               _       -> pure unit
        else case leftBlinker of
               Just id -> do
                 clearInterval id
                 modifyRef stateRef $ _ {leftBlinker = Nothing}
                 write (toGPIOPin TurnL) false
                 write (toGPIOPin BrakeL) braking
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
               _       -> pure unit
        else case rightBlinker of
               Just id -> do
                 clearInterval id
                 modifyRef stateRef $ _ {rightBlinker = Nothing}
                 write (toGPIOPin TurnR) false
                 write (toGPIOPin BrakeR) braking
               _ -> pure unit
  | pin == toGPIOPin BrakeSig = do
      on <- read (toGPIOPin BrakeSig)
      log $ "Brake signal: " <> show on
      modifyRef stateRef $ _ {braking = on}
      {leftBlinker,rightBlinker} <- readRef stateRef
      case leftBlinker of
        Nothing -> write (toGPIOPin BrakeL) on
        _       -> pure unit
      case rightBlinker of
        Nothing -> write (toGPIOPin BrakeR) on
        _       -> pure unit
  | otherwise =
      log "!?!"
