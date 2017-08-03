module Kshatriya where

import Prelude

import GPIO (GPIOPin (..))


data Lo = Lo

data Turn
  = TurnL
  | TurnR

data BrakeHi
  = BrakeL
  | BrakeR
  | BrakeBoth



data LoSig = LoSig

data TurnSig
  = TurnSigL
  | TurnSigR

data BrakeSig
  = BrakeSigL
  | BrakeSigR

data WheelSig = WheelSig



class GPIOPinAble a where
  toGPIOPin :: a -> GPIOPin


instance loGPIOPinAble :: GPIOPinAble Lo where
  toGPIOPin Lo = GPIO4

instance turnGPIOPinAble :: GPIOPinAble Turn where
  toGPIOPin TurnL = GPIO17
  toGPIOPin TurnR = GPIO18

instance brakeGPIOPinAble :: GPIOPinAble BrakeHi where
  toGPIOPin BrakeL = GPIO27
  toGPIOPin BrakeR = GPIO22
  toGPIOPin BrakeBoth = GPIO23


instance loSigGPIOPinAble :: GPIOPinAble LoSig where
  toGPIOPin LoSig = GPIO21

instance turnSigGPIOPinAble :: GPIOPinAble TurnSig where
  toGPIOPin TurnSigL = GPIO26
  toGPIOPin TurnSigR = GPIO20

instance brakeSigGPIOPinAble :: GPIOPinAble BrakeSig where
  toGPIOPin BrakeSigR = GPIO19
  toGPIOPin BrakeSigL = GPIO6

instance wheelSigGPIOPinAble :: GPIOPinAble WheelSig where
  toGPIOPin WheelSig = GPIO16



wheelRadius :: Number
wheelRadius = 0.328 -- meters
