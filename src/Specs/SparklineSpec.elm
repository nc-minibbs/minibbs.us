module Specs.SparklineSpec exposing (..)

import VegaLite exposing (..)
import Data.Species exposing (..)
import Data.Mbbs exposing (mbbsData)

mkSparklineSpec : Species -> Spec
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
        
        trans = transform 
                  << filter 
                     (fiEqual "common_name" (str (speciesToString x)))

    in
    toVegaLite
        [ cfg []
        , mbbsData
        , trans []
        , enc []
        , line [ maColor "blue" ]
        ]