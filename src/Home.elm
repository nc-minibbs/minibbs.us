port module Home exposing (..)

import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (..)
import Specs.ExampleTrends exposing (..)
import VegaLite exposing (..)


specs : Spec
specs =
    mkExampleTrendsSpec
        mbbsData
        [ WoodThrush
        , NorthernBobwhite
        , EasternBluebird
        , SummerTanager
        ]


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( specs, homeVegaPort specs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port homeVegaPort : Spec -> Cmd msg
