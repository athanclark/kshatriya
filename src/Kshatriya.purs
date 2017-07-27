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

data Horn = Horn

data FrontEABS = FrontEABS

data BackEABS = BackEABS



data LoSig = LoSig

data TurnSig
  = TurnSigL
  | TurnSigR

data BrakeSig = BrakeSig

data WheelSig = WheelSig

data HornSig = HornSig



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

instance hornGPIOPinAble :: GPIOPinAble Horn where
  toGPIOPin Horn = GPIO23

instance frontEABSGPIOPinAble :: GPIOPinAble FrontEABS where
  toGPIOPin FrontEABS = GPIO24

instance backEABSGPIOPinAble :: GPIOPinAble BackEABS where
  toGPIOPin BackEABS = GPIO25



instance loSigGPIOPinAble :: GPIOPinAble LoSig where
  toGPIOPin LoSig = GPIO21

instance turnSigGPIOPinAble :: GPIOPinAble TurnSig where
  toGPIOPin TurnSigL = GPIO26
  toGPIOPin TurnSigR = GPIO20

instance brakeSigGPIOPinAble :: GPIOPinAble BrakeSig where
  toGPIOPin BrakeSig = GPIO19

instance wheelSigGPIOPinAble :: GPIOPinAble WheelSig where
  toGPIOPin WheelSig = GPIO16

instance hornSigGPIOPinAble :: GPIOPinAble HornSig where
  toGPIOPin HornSig = GPIO6



wheelRadius :: Number
wheelRadius = 0.328 -- meters
