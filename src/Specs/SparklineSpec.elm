module Specs.SparklineSpec exposing (..)

import Data.Species exposing (..)
import Data.Mbbs exposing (mbbsParse)
import VegaLite exposing (..)


mkSparklineSpec : SpeciesRec -> Spec
mkSparklineSpec x =
    let
        cfg =
            configure
                << configuration
                    (coView
                        [ vicoStroke Nothing
                        , vicoContinuousHeight 15
                        , vicoContinuousWidth 80
                        ]
                    )

        enc =
            encoding
                << position X
                    [ pName "year"
                    , pTemporal
                    , pAxis
                        [ axTitle ""
                        , axTicks False
                        , axLabels False
                        ]
                    ]
                << position Y
                    [ pName "count"
                    , pAggregate opMean
                    , pAxis []
                    ]
    in
    toVegaLite
        [ cfg []
        , mbbsParse ("../data/" ++ x.id ++ "-counts.csv")
        , enc []
        , line [ maColor "blue" ]
        ]
