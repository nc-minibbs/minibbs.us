module Specs.ExampleTrends exposing (..)

-- import Data.Mbbs exposing ( mbbsData )
import VegaLite exposing (..)

{-|
-}
viz : Data -> List String -> Spec
viz data species =
    let
        {-
           Define the vizulation's encoding
        -}
        enc =
            encoding
                << color
                    [ mName "common_name"
                    , mNominal
                    , mLegend []
                    ]

        
        lineEnc = encoding <<
                position X
                    [ pName "year"
                    , pTemporal
                    , pAxis [ axTitle "" ]
                    ]
                << position Y
                    [ pName "avgCount"
                    , pQuant
                    , pAxis [ axTitle "Average Count per Route" ]
                    ]
                << tooltips
                    [ [ tName "common_name" ]
                    , [ tName "year", tTemporal, tFormat "%Y" ]
                    , [ tName "avgCount", tQuant ]
                    ]
        labelEnc = encoding 
              << position X 
                  [ pName "year"
                  , pAggregate opMax
                  , pTemporal
                 ]
              << position Y
                  [ pName "avgCount"
                  , pQuant
                  , pAggregate (opArgMax (Just "year"))
                  ]
              << text 
                  [ tName "common_name"
                  , tAggregate (opArgMax (Just "year")) ]

        {-
           Define data transform and summaries
        -}
        trans0 =
            transform
                -- Filter to the selected species
                << filter (fiOneOf "common_name" (strs species))
                -- Compute counts per species within each route/year
                -- This and the next sum could combined,
                -- but kept for clarity of the data summarizing steps.
                << aggregate
                    [ opAs opSum "count" "speciesCount" ]
                    [ "year"
                    , "mbbs_county"
                    , "route"
                    , "common_name"
                    ]
                -- Compute counts of all species within each route/year.
                << aggregate
                    [ opAs opSum "speciesCount" "routeCount"
                    ]
                    [ "year"
                    , "mbbs_county"
                    , "route"
                    , "common_name"
                    ]
                -- Per year, compute both:
                -- * counts with a county
                -- * number of routes run within a county
                << aggregate
                    [ opAs opSum "routeCount" "countyCount"
                    , opAs opDistinct "route" "nRoutesRun"
                    ]
                    [ "year"
                    , "mbbs_county"
                    , "common_name"
                    ]
                -- Compute tallies per year (across counties)
                << aggregate
                    [ opAs opSum "countyCount" "yearCount"
                    , opAs opSum "nRoutesRun" "yearRoutes"
                    ]
                    [ "year"
                    , "common_name"
                    ]
                -- Compute yBar as
                --   total count in year
                -- / total routes run in year
                << calculateAs
                    """
                    datum.yearCount / datum.yearRoutes
                    """
                    "avgCount"

    in
    toVegaLite
        [ data
        , width 500
        , height 400
        , enc []
        , layer [
            -- The main line chart 
             asSpec [
               lineEnc []
             , line [] ]
            -- Transparent layer to make it easier to select tooltip
            , asSpec [ 
                lineEnc []
              , line [ maStrokeWidth 12 , maOpacity 0 ]
            ]
            -- Textual Labels for each line
            , asSpec [ 
                  labelEnc []
                , circle []
                , textMark [ 
                  maAlign haLeft
                  , maDx 1.5] 
            ]
          ]
        , trans0 []
        ]