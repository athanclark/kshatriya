module GPIO
  ( GPIOPin (..)
  , Pin
  , GPIO
  , openRead
  , openWrite
  , read
  , write
  , listen
  , sleep
  ) where

import Prelude

import Data.Generic (class Generic, gEq)
import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2, runEffFn1, runEffFn2, mkEffFn1)



data GPIOPin
  = GPIO4
  | GPIO5
  | GPIO6
  | GPIO12
  | GPIO13
  | GPIO16
  | GPIO17
  | GPIO18
  | GPIO19
  | GPIO20
  | GPIO21
  | GPIO22
  | GPIO23
  | GPIO24
  | GPIO25
  | GPIO26
  | GPIO27

derive instance genericGPIOPin :: Generic GPIOPin

instance eqGPIOPin :: Eq GPIOPin where
  eq = gEq


type Pin = Int


toPin :: GPIOPin -> Pin
toPin = case _ of
  GPIO4  -> 7
  GPIO5  -> 29
  GPIO6  -> 31
  GPIO12 -> 32
  GPIO13 -> 33
  GPIO16 -> 36
  GPIO17 -> 11
  GPIO18 -> 12
  GPIO19 -> 35
  GPIO20 -> 38
  GPIO21 -> 40
  GPIO22 -> 15
  GPIO23 -> 16
  GPIO24 -> 18
  GPIO25 -> 22
  GPIO26 -> 37
  GPIO27 -> 13

fromPin :: Pin -> GPIOPin
fromPin pin
  | pin == 7  = GPIO4
  | pin == 29 = GPIO5
  | pin == 31 = GPIO6
  | pin == 32 = GPIO12
  | pin == 33 = GPIO13
  | pin == 36 = GPIO16
  | pin == 11 = GPIO17
  | pin == 12 = GPIO18
  | pin == 35 = GPIO19
  | pin == 38 = GPIO20
  | pin == 40 = GPIO21
  | pin == 15 = GPIO22
  | pin == 16 = GPIO23
  | pin == 18 = GPIO24
  | pin == 22 = GPIO25
  | pin == 37 = GPIO26
  | pin == 13 = GPIO27
  | otherwise = GPIO27


foreign import data GPIO :: Effect

foreign import openReadImpl :: forall eff. EffFn1 (gpio :: GPIO | eff) Pin Unit

foreign import readPinImpl :: forall eff. EffFn1 (gpio :: GPIO | eff) Pin Boolean

foreign import openWriteImpl :: forall eff. EffFn2 (gpio :: GPIO | eff) Pin Boolean Unit

foreign import writePinImpl :: forall eff. EffFn2 (gpio :: GPIO | eff) Pin Boolean Unit

foreign import listenImpl :: forall eff. EffFn2 (gpio :: GPIO | eff) Pin (EffFn1 (gpio :: GPIO | eff) Pin Unit) Unit

foreign import sleepImpl :: forall eff. EffFn1 (gpio :: GPIO | eff) Int Unit



openRead :: forall eff. GPIOPin -> Eff (gpio :: GPIO | eff) Unit
openRead pin = runEffFn1 openReadImpl (toPin pin)

openWrite :: forall eff. GPIOPin -> Boolean -> Eff (gpio :: GPIO | eff) Unit
openWrite pin val = runEffFn2 openWriteImpl (toPin pin) val

read :: forall eff. GPIOPin -> Eff (gpio :: GPIO | eff) Boolean
read pin = runEffFn1 readPinImpl (toPin pin)

write :: forall eff. GPIOPin -> Boolean -> Eff (gpio :: GPIO | eff) Unit
write pin val = runEffFn2 writePinImpl (toPin pin) val

listen :: forall eff. GPIOPin -> (GPIOPin -> Eff (gpio :: GPIO | eff) Unit) -> Eff (gpio :: GPIO | eff) Unit
listen pin f = runEffFn2 listenImpl (toPin pin) (mkEffFn1 (f <<< fromPin))

sleep :: forall eff. Int -> Eff (gpio :: GPIO | eff) Unit
sleep = runEffFn1 sleepImpl
