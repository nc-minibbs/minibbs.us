port module Main exposing (main, vegaLite)

import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (Species(..))
import Data.Traits exposing (Trait(..), traitsData)
import Platform
import Specs.ExampleTrends exposing (mkExampleTrendsSpec)
import Specs.SpeciesTrend exposing (mkSpeciesTrendSpec)
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


speciesTrendSpec : Spec
speciesTrendSpec =
    mkSpeciesTrendSpec
        mbbsData
        EasternBluebird


specs : Spec
specs =
    combineSpecs
        [ ( "exampleTrends", exampleTrendsSpec )
        , ( "trendByTrait", trendByTraitSpec )
        , ( "speciesTrend", speciesTrendSpec )
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
