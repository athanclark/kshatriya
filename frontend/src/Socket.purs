module Socket
  ( SOCKET
  , emit, assignSocketHandler
  ) where

import Prelude
import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2, runEffFn2, mkEffFn1)


foreign import data SOCKET :: Effect

foreign import assignSocketHandlerImpl :: forall eff. EffFn2 (socket :: SOCKET | eff) String (EffFn1 (socket :: SOCKET | eff) String Unit) Unit

foreign import emitImpl :: forall eff. EffFn2 (socket :: SOCKET | eff) String String Unit


assignSocketHandler :: forall eff. String -> (String -> Eff (socket :: SOCKET | eff) Unit) -> Eff (socket :: SOCKET | eff) Unit
assignSocketHandler c f = runEffFn2 assignSocketHandlerImpl c (mkEffFn1 f)

emit :: forall eff. String -> String -> Eff (socket :: SOCKET | eff) Unit
emit = runEffFn2 emitImpl
