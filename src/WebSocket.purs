module WebSocket where

import Prelude
import Server (Socket, SERVER)

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)



websocket :: forall eff
           . Socket (console :: CONSOLE | eff)
          -> Eff ( server :: SERVER
                 , console :: CONSOLE
                 | eff) Unit
websocket {on,emit} = do
  log "connected!"
  emit "foo" "ayooo"
