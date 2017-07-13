module Server
  ( SERVER
  , Request, Response, Socket
  , assignHandlers, engageServer
  ) where

import Prelude

import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2, runEffFn1, mkEffFn1, runEffFn2, mkEffFn2)


foreign import data SERVER :: Effect

type RequestImpl = Unit

type ResponseImpl eff =
  { sendFile :: EffFn1 (server :: SERVER | eff) String Unit
  }

type SocketImpl eff =
  { on :: EffFn1 (server :: SERVER | eff) (EffFn1 (server :: SERVER | eff) String Unit) Unit
  , send :: EffFn1 (server :: SERVER | eff) String Unit
  }


foreign import assignHandlersImpl :: forall eff. EffFn1 (server :: SERVER | eff) (EffFn1 (server :: SERVER | eff) (SocketImpl eff) Unit) Unit

foreign import engageServerImpl :: forall eff. EffFn2 (server :: SERVER | eff) Int (Eff (server :: SERVER | eff) Unit) Unit


type Request = Unit

type Response eff =
  { sendFile :: String -> Eff (server :: SERVER | eff) Unit
  }

responseToImpl :: forall eff. Response eff -> ResponseImpl eff
responseToImpl {sendFile} = {sendFile : mkEffFn1 sendFile}

responseFromImpl :: forall eff. ResponseImpl eff -> Response eff
responseFromImpl {sendFile} = {sendFile : runEffFn1 sendFile}


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

engageServer :: forall eff
              . Int
             -> Eff (server :: SERVER | eff) Unit
             -> Eff (server :: SERVER | eff) Unit
engageServer p f = runEffFn2 engageServerImpl p f
