module Server
  ( SERVER
  , Socket
  , assignHandlers
  ) where

import Prelude

import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2, runEffFn1, mkEffFn1, runEffFn2, mkEffFn2)


foreign import data SERVER :: Effect

type SocketImpl eff =
  { on :: EffFn1 (server :: SERVER | eff) (EffFn1 (server :: SERVER | eff) String Unit) Unit
  , send :: EffFn1 (server :: SERVER | eff) String Unit
  }


foreign import assignHandlersImpl :: forall eff. EffFn1 (server :: SERVER | eff) (EffFn1 (server :: SERVER | eff) (SocketImpl eff) Unit) Unit



type Socket eff =
  { on :: (String -> Eff (server :: SERVER | eff) Unit) -> Eff (server :: SERVER | eff) Unit
  , send :: String -> Eff (server :: SERVER | eff) Unit
  }

socketToImpl :: forall eff. Socket eff -> SocketImpl eff
socketToImpl {on,send} =
  { on : mkEffFn1 (on <<< runEffFn1)
  , send : mkEffFn1 send
  }

socketFromImpl :: forall eff. SocketImpl eff -> Socket eff
socketFromImpl {on,send} =
  { on : runEffFn1 on <<< mkEffFn1
  , send : runEffFn1 send
  }


assignHandlers :: forall eff
                . (Socket eff -> Eff (server :: SERVER | eff) Unit)
               -> Eff (server :: SERVER | eff) Unit
assignHandlers f = runEffFn1 assignHandlersImpl (mkEffFn1 (f <<< socketFromImpl))
