module SpeciesTrend exposing (..)

-- port module Main2 exposing (elmToJS, main)

-- import Platform
import VegaLite exposing (..)

counts : Data
counts =
    dataFromUrl "./trends.csv"
        [ parse
            [ ( "year", foDate "%Y" )
            , ( "count", foNum )
            ]
        ]

speciesChart : Data -> String -> Spec
speciesChart x species = 
    let 

        {-
           Define parameters for interactivity
        -}
        ps =
            params
                << param "countySelection"
                    [ paSelect sePoint [ seFields [ "mbbs_county" ] ]
                    , paBind
                        (ipSelect
                            [ inOptions
                                [ ""
                                , "orange"
                                , "chatham"
                                , "durham"
                                ]
                            ]
                        )
                    ]
                

        enc = 
            encoding
                << position X 
                    [ pName "year"
                    , pTemporal
                    , pAxis [ axTitle ""] 
                    ]

        -- encCounts =
        --     enc
        --         << position Y 
        --             [ pName "count"
        --             , pQuant 
        --             , pAxis [ axTitle "Count" ]
        --             ]
        --         << detail [dName "route"]

        encMean = 
            enc 
                << position Y [ pName "count", pAggregate opMean]
        
        trans = transform 
                -- Filter based on the selected county
                << filter (fiSelection "countySelection")
                -- Filter to selected species
                << filter (fiEqual "common_name" (str species))

    in 
    toVegaLite 
        [ width 400
        , height 300
        , x
        , ps []
        , trans []
        , layer [
            -- asSpec 
            --     [ encCounts []
            --     , line 
            --         [ maColor "black"
            --         , maOpacity 0.2
            --         , maStrokeWidth 0.5
            --         ]
            --     , trans []
            --     , ps []
            --     ]
             asSpec 
                [ encMean []
                , line [ maColor "gray" ] 
                ]
        ]
        -- , trans [] 
        ] 

-- speciesChart2 : Data -> String -> Spec
-- speciesChart2 data species  =
--     let
--         {-
--            Define parameters for interactivity
--         -}
--         ps =
--             params
--                 << param "countySelection"
--                     [ paSelect sePoint [ seFields [ "mbbs_county" ] ]
--                     , paBind
--                         (ipSelect
--                             [ inOptions
--                                 [ ""
--                                 , "orange"
--                                 , "chatham"
--                                 , "durham"
--                                 ]
--                             ]
--                         )
--                     ]

--         {-
--            Define the primary layer's encoding
--         -}
--         enc =
--             encoding
--                 << position X
--                     [ pName "year"
--                     , pTemporal
--                     , pAxis [ axTitle "" ]
--                     ]

--                 << tooltips
--                     [ [ tName "year", tTemporal, tFormat "%Y" ]
--                     , [ tName "yBar", tQuant, tAggregate opSum ]
--                     ]

--         {-
--            Define data transform and summaries
--         -}
--         trans =
--             transform
--                 -- Filter based on the selected county
--                 << filter (fiSelection "countySelection")
--                 << filter (fiEqual "common_name" (str species))
--                 -- Compute counts per species within each route/year
--                 -- This and the next sum could combined,
--                 -- but kept for clarity of the data summarizing steps.
--                 << aggregate
--                     [ opAs opSum "count" "speciesCount" ]
--                     [ "year"
--                     , "mbbs_county"
--                     , "route"
--                     , "common_name"
--                     ]
--                 -- Compute counts of all species within each route/year.
--                 << aggregate
--                     [ opAs opSum "speciesCount" "routeCount"
--                     ]
--                     [ "year"
--                     , "mbbs_county"
--                     , "route"
--                     ]
--                 -- Per year, compute both:
--                 -- * counts with a county
--                 -- * number of routes run within a county
--                 << aggregate
--                     [ opAs opSum "routeCount" "countyCount"
--                     , opAs opDistinct "route" "nRoutesRun"
--                     ]
--                     [ "year"
--                     , "mbbs_county"
--                     ]
--                 -- Compute tallies per year (across counties)
--                 << aggregate
--                     [ opAs opSum "countyCount" "yearCount"
--                     , opAs opSum "nRoutesRun" "yearRoutes"
--                     ]
--                     [ "year"
--                     ]
--                 -- Compute yBar as
--                 --   total count in year
--                 -- / total routes run in year
--                 << calculateAs
--                     """
--                     datum.yearCount / datum.yearRoutes
--                     """
--                     "yBar"

--         -- trans1 =
--         --     trans0
--         --         -- Compute yHat by
--         --         -- weighting county counts by the proportion of routes run
--         --         << calculateAs
--         --             """
--         --             if ( datum.mbbs_county == "orange",
--         --                 datum.countyCount * 12 / datum.nRoutesRun,
--         --                 if ( datum.mbbs_county == "chatham",
--         --                      datum.countyCount * 14 / datum.nRoutesRun,
--         --                      datum.countyCount * 8 / datum.nRoutesRun
--         --                     )
--         --             )
--         --             """
--         --             "yHat"

--         totalCountSpec =
--             asSpec
--                 [ width 500
--                 , height 400
--                 , (enc
--                     << position Y
--                         [ pName "yBar"
--                         , pQuant
--                         , pAggregate opSum
--                         , pAxis [ axTitle "Total Counts" ]
--                         ]
--                   )
--                     []
--                 , line []
--                 , ps []
--                 , trans []
--                 ]
           
--     in
--     toVegaLite
--         [ data
--         , width 500
--         , height 400
--         , vConcat
--             [ totalCountSpec
--             ]
--         ]

speciesTrend : String -> Spec
speciesTrend = speciesChart counts


{- This list comprises the specifications to be provided to the Vega runtime.
   In this example, only a single spec 'helloWord' is provided.
-}

mbbsSpecs : String -> Spec
mbbsSpecs x =
    combineSpecs [ ( "speciesTrend", speciesTrend x ) ]
