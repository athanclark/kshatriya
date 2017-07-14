module WebSocket where

import Prelude
import Data.Argonaut (class DecodeJson, decodeJson, (.?))
import Data.Either (Either (Left))
import Control.Alternative ((<|>))


data Incoming
  = ChangedSpeed Number
  | TurnLeft
  | TurnRight
  | NoTurn
  | ChangedBraking Boolean
  | ChangedLights Boolean


instance decodeJsonOutgoing :: DecodeJson Incoming where
  decodeJson json = decodeObject <|> decodeString
    where
      decodeObject = do
        o <- decodeJson json
        (ChangedSpeed <$> o .? "speed")
          <|> (ChangedBraking <$> o .? "braking")
          <|> (ChangedLights <$> o .? "lights")
      decodeString = do
        s <- decodeJson json
        case s of
          _ | s == "left" -> pure TurnLeft
            | s == "right" -> pure TurnRight
            | s == "no" -> pure NoTurn
            | otherwise -> Left "Not an Incoming"
