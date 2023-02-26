module Specs.SparklineSpec exposing (..)

import VegaLite exposing (..)
import Data.Species exposing (..)

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
                     , pAxis[]
                     ]

    in
    toVegaLite
        [ cfg []
        , x.mbbsCounts
        , enc []
        , line [ maColor "blue" ]
        ]