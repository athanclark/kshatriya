module Main where

import Prelude
import GPIO (GPIO)
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

main :: forall e. Eff ( console :: CONSOLE
                      , gpio    :: GPIO
                      | e) Unit
main = do
  log "Hello sailor!"
