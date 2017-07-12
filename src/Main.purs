module Main where

import Prelude
import GPIO (GPIO, GPIOPin, openWrite, write, read, listen, sleep)
import Kshatriya (toGPIOPin, Lo (..), LoSig (..))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

main :: forall e. Eff ( console :: CONSOLE
                      , gpio    :: GPIO
                      | e) Unit
main = do
  log "Hello sailor!"

  openWrite (toGPIOPin Lo) false
  listen (toGPIOPin LoSig) pinCallback

  let loop = do
        sleep 100
        loop

  loop


pinCallback :: forall eff. GPIOPin -> Eff (gpio :: GPIO | eff) Unit
pinCallback pin
  | pin == toGPIOPin LoSig = do
      on <- read (toGPIOPin LoSig)
      if on
        then write (toGPIOPin Lo) true
        else write (toGPIOPin Lo) false
  | otherwise = pure unit
