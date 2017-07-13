module Socket
  ( SOCKET
  , send, on
  ) where

import Prelude
import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2, runEffFn1, mkEffFn1)


foreign import data SOCKET :: Effect

foreign import onImpl :: forall eff. EffFn1 (socket :: SOCKET | eff) (EffFn1 (socket :: SOCKET | eff) String Unit) Unit

foreign import sendImpl :: forall eff. EffFn1 (socket :: SOCKET | eff) String Unit


on :: forall eff. (String -> Eff (socket :: SOCKET | eff) Unit) -> Eff (socket :: SOCKET | eff) Unit
on = runEffFn1 onImpl <<< mkEffFn1

send :: forall eff. String -> Eff (socket :: SOCKET | eff) Unit
send = runEffFn1 sendImpl
