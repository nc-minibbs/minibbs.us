port module Main exposing (main, vegaLite)

import Data.Mbbs exposing (mbbsData)
import Data.Traits exposing (traitsData, Trait(..))
import Data.Species exposing ( Species(..) )
import Platform
import Specs.ExampleTrends exposing (mkExampleTrendsSpec)
import Specs.TrendByTrait exposing (mkTrendByTraitSpec)
import VegaLite exposing (..)

exampleTrendsSpec : Spec
exampleTrendsSpec =
    mkExampleTrendsSpec 
        mbbsData
        [ WoodThrush
        , NorthernBobwhite
        , EasternBluebird
        , SummerTanager
        ]

trendByTraitSpec : Spec 
trendByTraitSpec =
    mkTrendByTraitSpec
        mbbsData
        traitsData
        WinterBiome


specs : Spec
specs =
    combineSpecs 
    [ ( "exampleTrends", exampleTrendsSpec )
    , ( "trendByTrait", trendByTraitSpec)
    ]

{- The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to JavaScript and sends the Vega-Lite spec to it.
-}

main : Program () Spec msg
main =
    Platform.worker
        { init = always ( specs, vegaLite specs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port vegaLite : Spec -> Cmd msg
