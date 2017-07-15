module Main where

import Socket (on)

import Prelude
import Data.Maybe (Maybe (..))
import Data.Either (Either (..))
import Data.Argonaut (decodeJson, jsonParser, class DecodeJson, (.?))
import Data.Generic (class Generic, gShow)
import Control.Alternative ((<|>))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log, warn)

import Thermite as T
import React as R
import React.DOM as R
import React.DOM.Props as RP
import DOM (DOM)
import ReactDOM (render)
import DOM as DOM
import DOM.HTML (window) as DOM
import DOM.HTML.Document (body) as DOM
import DOM.HTML.Types (htmlElementToElement) as DOM
import DOM.HTML.Window (document) as DOM
import Data.Foldable (traverse_)


data Direction
  = LeftDir | RightDir

type State =
  { speed   :: Number
  , turning :: Maybe Direction
  , braking :: Boolean
  , lights  :: Boolean
  }

initialState :: State
initialState =
  { speed   : 0.0
  , turning : Nothing
  , braking : false
  , lights  : false
  }

data Action
  = ChangedSpeed Number
  | TurningLeft
  | TurningRight
  | NotTurning
  | ChangedBraking Boolean
  | ChangedLights Boolean

derive instance genericAction :: Generic Action

instance showAction :: Show Action where
  show = gShow

instance decodeJsonOutgoing :: DecodeJson Action where
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
          _ | s == "left" -> pure TurningLeft
            | s == "right" -> pure TurningRight
            | s == "no" -> pure NotTurning
            | otherwise -> Left "Not an Action"

type Props = Unit



spec :: T.Spec _ State Props Action
spec = T.simpleSpec performAction render
  where
    performAction :: T.PerformAction _ State Props Action
    performAction action _ _ = do
      void $ case action of
        ChangedSpeed s   -> T.cotransform $ _ {speed = s}
        TurningLeft      -> T.cotransform $ _ {turning = Just LeftDir}
        TurningRight     -> T.cotransform $ _ {turning = Just RightDir}
        NotTurning       -> T.cotransform $ _ {turning = Nothing}
        ChangedBraking b -> T.cotransform $ _ {braking = b}
        ChangedLights l  -> T.cotransform $ _ {lights  = l}
      pure unit

    render :: T.Render State Props Action
    render _ _ {speed,turning,braking} _ =
      [ R.div [ RP.className "ui grid"
              , RP._id "root"
              ]
          [ R.div [ RP.className "one column row"
                  , RP.style {height: "33%"}
                  ]
              [ R.div [ RP.className "column"
                      , RP.style {background: if braking then "#f00" else "rgba(0,0,0,0)"}
                      ]
                  [ R.h2 [ RP.className "ui center aligned header"
                         , RP.style {color: "#fff"}
                         ] [R.text $ if braking then "braking" else ""]
                  ]
              ]
          , R.div [ RP.className "three column row"
                  , RP.style {height: "33%"}
                  ]
              [ R.div [RP.className "column"] $ case turning of
                  Just LeftDir -> [R.text "turning left"]
                  _            -> []
              , R.div [RP.className "column"]
                  [ R.h1 [ RP.className "ui center aligned header"
                         ] [R.text $ show speed <> " mph"]
                  ]
              , R.div [RP.className "column"] $ case turning of
                  Just RightDir -> [R.text "turning right"]
                  _             -> []
              ]
          , R.div [ RP.className "one column row"
                  , RP.style {height: "33%"}
                  ]
              [ R.div [RP.className "column"]
                  [
                  ]
              ]
          ]
      ]


mainClass :: R.ReactClass Props
mainClass =
  let x@{dispatcher} = T.createReactSpec spec initialState
      reactSpec = x.spec
  in  R.createClass $ reactSpec
        { componentDidMount = \this -> do
            on $ \msg -> case decodeJson =<< jsonParser msg of
              Left err -> warn $ "json decoding error: " <> err
              Right incoming -> do
                log $ "got a message: " <> show (incoming :: Action)
                dispatcher this incoming
        }



main :: forall eff
      . Eff ( console :: CONSOLE
            , dom :: DOM
            | eff) Unit
main = do
  log "Hello sailor!"

  -- T.defaultMain spec initialState unit
  document <- DOM.window >>= DOM.document
  container <- DOM.body document
  traverse_ (render (R.createFactory mainClass unit) <<< DOM.htmlElementToElement) container

