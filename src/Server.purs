module Server
  ( SERVER
  , engageServer
  ) where

import Prelude

import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn4, runEffFn1, mkEffFn1, runEffFn4, mkEffFn2)


foreign import data SERVER :: Effect



foreign import engageServerImpl :: forall eff
                                 . EffFn4 (server :: SERVER | eff)
                                     Int
                                     (Eff (server :: SERVER | eff) Unit)
                                     (EffFn1 (server :: SERVER | eff) String Unit)
                                     (EffFn1 (server :: SERVER | eff) (EffFn1 (server :: SERVER | eff) String Unit) Unit)
                                     Unit




engageServer :: forall eff
              . Int
             -> Eff (server :: SERVER | eff) Unit
             -> (String -> Eff (server :: SERVER | eff) Unit)
             -> ((String -> Eff (server :: SERVER | eff) Unit) -> Eff (server :: SERVER | eff) Unit)
             -> Eff (server :: SERVER | eff) Unit
engageServer port onServe onMessage websocket =
  runEffFn4 engageServerImpl port onServe (mkEffFn1 onMessage) (mkEffFn1 (websocket <<< runEffFn1))
