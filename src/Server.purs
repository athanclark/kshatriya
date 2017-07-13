module Server
  ( SERVER
  , Request, Response, Socket
  , assignHttpHandler, assignSocketHandler, engageServer
  ) where

import Prelude

import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried (EffFn1, EffFn2, runEffFn1, mkEffFn1, runEffFn2, mkEffFn2)


foreign import data SERVER :: Effect

type RequestImpl = Unit

type ResponseImpl eff =
  { sendFile :: EffFn1 (server :: SERVER | eff) String Unit
  }

type SocketImpl = Unit


foreign import assignHttpHandlerImpl :: forall eff. EffFn2 (server :: SERVER | eff) String (EffFn2 (server :: SERVER | eff) RequestImpl (ResponseImpl eff) Unit) Unit

foreign import assignSocketHandlerImpl :: forall eff. EffFn1 (server :: SERVER | eff) (EffFn1 (server :: SERVER | eff) SocketImpl Unit) Unit

foreign import engageServerImpl :: forall eff. EffFn2 (server :: SERVER | eff) Int (Eff (server :: SERVER | eff) Unit) Unit


type Request = Unit

type Response eff =
  { sendFile :: String -> Eff (server :: SERVER | eff) Unit
  }

responseToImpl :: forall eff. Response eff -> ResponseImpl eff
responseToImpl {sendFile} = {sendFile : mkEffFn1 sendFile}

responseFromImpl :: forall eff. ResponseImpl eff -> Response eff
responseFromImpl {sendFile} = {sendFile : runEffFn1 sendFile}


type Socket = Unit


assignHttpHandler :: forall eff
                   . String
                  -> (Request -> Response eff -> Eff (server :: SERVER | eff) Unit)
                  -> Eff (server :: SERVER | eff) Unit
assignHttpHandler loc f = runEffFn2 assignHttpHandlerImpl loc (mkEffFn2 $ \req resp -> f req (responseFromImpl resp))

assignSocketHandler :: forall eff
                     . (Socket -> Eff (server :: SERVER | eff) Unit)
                    -> Eff (server :: SERVER | eff) Unit
assignSocketHandler f = runEffFn1 assignSocketHandlerImpl (mkEffFn1 f)

engageServer :: forall eff
              . Int
             -> Eff (server :: SERVER | eff) Unit
             -> Eff (server :: SERVER | eff) Unit
engageServer p f = runEffFn2 engageServerImpl p f
