module GPIO where

import Prelude

import Control.Monad.Eff (kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2)



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


foreign import data GPIO :: Effect

foreign import openReadImpl :: forall eff. EffFn1 (gpio :: GPIO | eff) Pin Unit

foreign import readPinImpl :: forall eff. EffFn1 (gpio :: GPIO | eff) Pin Boolean

foreign import openWriteImpl :: forall eff. EffFn2 (gpio :: GPIO | eff) Pin Boolean Unit

foreign import writePinImpl :: forall eff. EffFn2 (gpio :: GPIO | eff) Pin Boolean Unit

foreign import listenImpl :: forall eff. EffFn2 (gpio :: GPIO | eff) Pin (EffFn1 (gpio :: GPIO | eff) Pin Unit) Unit


