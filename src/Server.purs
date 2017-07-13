module Server
  ( SERVER
  , Request, Response, Socket
  , assignHomeHandler, assignSocketHandler, engageServer
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
  { on :: EffFn2 (server :: SERVER | eff) String (EffFn1 (server :: SERVER | eff) String Unit) Unit
  , emit :: EffFn2 (server :: SERVER | eff) String String Unit
  }


foreign import assignHomeHandler :: forall eff. Eff (server :: SERVER | eff) Unit

foreign import assignSocketHandlerImpl :: forall eff. EffFn1 (server :: SERVER | eff) (EffFn1 (server :: SERVER | eff) (SocketImpl eff) Unit) Unit

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
  { on :: String -> (String -> Eff (server :: SERVER | eff) Unit) -> Eff (server :: SERVER | eff) Unit
  , emit :: String -> String -> Eff (server :: SERVER | eff) Unit
  }

socketToImpl :: forall eff. Socket eff -> SocketImpl eff
socketToImpl {on,emit} =
  { on : mkEffFn2 (\c f -> on c (runEffFn1 f))
  , emit : mkEffFn2 emit
  }

socketFromImpl :: forall eff. SocketImpl eff -> Socket eff
socketFromImpl {on,emit} =
  { on : \c f -> runEffFn2 on c (mkEffFn1 f)
  , emit : runEffFn2 emit
  }


assignSocketHandler :: forall eff
                     . (Socket eff -> Eff (server :: SERVER | eff) Unit)
                    -> Eff (server :: SERVER | eff) Unit
assignSocketHandler f = runEffFn1 assignSocketHandlerImpl (mkEffFn1 (f <<< socketFromImpl))

engageServer :: forall eff
              . Int
             -> Eff (server :: SERVER | eff) Unit
             -> Eff (server :: SERVER | eff) Unit
engageServer p f = runEffFn2 engageServerImpl p f
