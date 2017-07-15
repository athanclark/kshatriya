module WebSocket where

import Prelude
import Server (SERVER)

import Data.Argonaut (class EncodeJson, encodeJson, (~>), jsonEmptyObject, (:=))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)


data Outgoing
  = ChangedSpeed Number
  | TurnLeft
  | TurnRight
  | NoTurn
  | ChangedBraking Boolean
  | ChangedLights Boolean
  | ChangedHorn Boolean

instance encodeJsonOutgoing :: EncodeJson Outgoing where
  encodeJson = case _ of
    ChangedSpeed n -> "speed" := n ~> jsonEmptyObject
    TurnLeft -> encodeJson "left"
    TurnRight -> encodeJson "right"
    NoTurn -> encodeJson "no"
    ChangedBraking b -> "braking" := b ~> jsonEmptyObject
    ChangedLights l -> "lights" := l ~> jsonEmptyObject
    ChangedHorn h -> "horn" := h ~> jsonEmptyObject


onReceive :: forall eff
           . String
          -> Eff ( server :: SERVER
                 , console :: CONSOLE
                 | eff) Unit
onReceive msg = do
  log $ "received! " <> msg
