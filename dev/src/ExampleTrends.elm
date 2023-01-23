port module ExampleTrends exposing (vegaLite, main)

import Data.Mbbs exposing (mbbsData)
import Specs.ExampleTrends exposing (viz)
import Platform
import VegaLite exposing (..)



specs : Spec
specs = viz mbbsData 
  [ --"Northern Cardinal"
    "Wood Thrush"
  , "Chimney Swift"
  , "Carolina Wren"
  , "Northern Bobwhite"
  -- , "Red-tailed Hawk"
  , "Carolina Chickadee"
  -- , "Ruby-throated Hummingbird"
  ]

{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to JavaScript and sends the Vega-Lite spec (myVis) to it.
-}


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( specs, vegaLite specs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port vegaLite : Spec -> Cmd msg
