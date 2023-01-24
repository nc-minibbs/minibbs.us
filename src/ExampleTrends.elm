port module ExampleTrends exposing (main, vegaLite)

import Data.Mbbs exposing (mbbsData)
import Platform
import Specs.ExampleTrends exposing (mkExampleTrendsSpec)
import VegaLite exposing (..)


specs : Spec
specs =
    mkExampleTrendsSpec 
        mbbsData
        [ --"Northern Cardinal"
          "Wood Thrush"
        -- , "Chimney Swift"
        -- , "Carolina Wren"
        , "Northern Bobwhite"
        , "Eastern Bluebird"
        , "Summer Tanager"
        -- , "Red-tailed Hawk"
        -- , "Carolina Chickadee"

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
