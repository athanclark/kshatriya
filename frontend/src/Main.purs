module Main where

import Socket (on)

import Prelude
import Data.Maybe (Maybe (..))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

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
  = Left | Right

type State =
  { speed   :: Number
  , turning :: Maybe Direction
  , braking :: Boolean
  }

initialState :: State
initialState =
  { speed   : 0.0
  , turning : Nothing
  , braking : false
  }

data Action
  = ChangedSpeed Number
  | TurningLeft
  | TurningRight
  | NotTurning
  | ChangedBraking Boolean

type Props = Unit



spec :: T.Spec _ State Props Action
spec = T.simpleSpec performAction render
  where
    performAction :: T.PerformAction _ State Props Action
    performAction action _ _ = do
      void $ case action of
        ChangedSpeed s   -> T.cotransform $ _ {speed = s}
        TurningLeft      -> T.cotransform $ _ {turning = Just Left}
        TurningRight     -> T.cotransform $ _ {turning = Just Right}
        NotTurning       -> T.cotransform $ _ {turning = Nothing}
        ChangedBraking b -> T.cotransform $ _ {braking = b}
      pure unit

    render :: T.Render State Props Action
    render _ _ {speed,turning,braking} _ =
      [ R.p [] [R.text $ "speed: " <> show speed]
      , R.p [] [R.text $ case turning of
          Nothing -> "not turning"
          Just d -> case d of
            Left -> "turning left"
            Right -> "turning right"]
      , R.p [] [R.text $ if braking then "braking" else "not braking"]
      ]


mainClass :: R.ReactClass Props
mainClass =
  let x@{dispatcher} = T.createReactSpec spec initialState
      reactSpec = x.spec
  in  R.createClass $ reactSpec
        { getInitialState = \this -> do
            on "foo" $ \msg ->
              log $ "got a message: " <> msg
            reactSpec.getInitialState this
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

