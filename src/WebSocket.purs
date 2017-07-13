module WebSocket where

import Prelude
import Server (Socket, SERVER)

import Control.Monad.Eff (Eff)



websocket :: forall eff. Socket eff -> Eff (server :: SERVER | eff) Unit
websocket {on,emit} = do
  pure unit
