module Main where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)

import Thermite as T
import React as R
import React.DOM as R
import React.DOM.Props as RP
import DOM (DOM)



type State = Unit

initialState :: State
initialState = unit

data Action
  = Action

spec :: T.Spec _ State _ Action
spec = T.simpleSpec performAction render
  where
    performAction :: T.PerformAction _ State _ Action
    performAction action _ _ = case action of
      Action -> pure unit

    render :: T.Render State _ Action
    render dispatch _ _ _ =
      [ R.text ":D"
      ]



main :: forall eff
      . Eff ( console :: CONSOLE
            , dom :: DOM
            | eff) Unit
main = do
  log "Hello sailor!"

  T.defaultMain spec initialState unit
