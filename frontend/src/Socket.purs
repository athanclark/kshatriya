module Socket
  ( SOCKET
  , emit, on
  ) where

import Prelude
import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2, runEffFn2, mkEffFn1)


foreign import data SOCKET :: Effect

foreign import onImpl :: forall eff. EffFn2 (socket :: SOCKET | eff) String (EffFn1 (socket :: SOCKET | eff) String Unit) Unit

foreign import emitImpl :: forall eff. EffFn2 (socket :: SOCKET | eff) String String Unit


on :: forall eff. String -> (String -> Eff (socket :: SOCKET | eff) Unit) -> Eff (socket :: SOCKET | eff) Unit
on c f = runEffFn2 onImpl c (mkEffFn1 f)

emit :: forall eff. String -> String -> Eff (socket :: SOCKET | eff) Unit
emit = runEffFn2 emitImpl
