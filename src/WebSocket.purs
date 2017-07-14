module WebSocket where

import Prelude
import Server (SERVER)

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)


onReceive :: forall eff
           . String
          -> Eff ( server :: SERVER
                 , console :: CONSOLE
                 | eff) Unit
onReceive msg = do
  log $ "received! " <> msg

websocket :: forall eff
           . (String -> Eff ( server :: SERVER
                            , console :: CONSOLE | eff) Unit)
          -> Eff ( server :: SERVER
                 , console :: CONSOLE
                 | eff) Unit
websocket send = do
  log "connected!"
  send "ayooo"
