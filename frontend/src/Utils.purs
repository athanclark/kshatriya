module Utils where

import Prelude

import Data.Maybe (Maybe (..))
import Data.Array as Array
import Data.Foldable (foldl)



getWith2Decimals xs =
  let go s@{acc,hitDot} c
        | c == '.' =
            { hitDot : Just 0
            , acc : Array.snoc acc c
            }
        | otherwise = case hitDot of
            Nothing -> s {acc = Array.snoc acc c}
            Just n
              | n <= 1 ->
                  { hitDot : Just (n+1)
                  , acc : Array.snoc acc c
                  }
              | otherwise -> s
  in  (foldl go { hitDot : Nothing, acc : [] } xs).acc
