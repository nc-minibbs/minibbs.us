module Specs.TrendByTrait exposing (CountyFilter(..), mkTrendByTraitSpec)

import Data.County exposing (County, countyToString)
import Data.Traits exposing (Trait(..), traitToString)
import Specs.SpecConfig exposing (..)
import String exposing (replace)
import VegaLite exposing (..)


type CountyFilter
    = NoCountyFilter
    | FilterCounty County


mkTrendByTraitSpec : Data -> Data -> Trait -> CountyFilter -> Spec
mkTrendByTraitSpec countData traitData trait countyFilter =
    let
        withCountyFilter noFilter yesFilter x =
            case countyFilter of
                NoCountyFilter ->
                    noFilter x

                FilterCounty c ->
                    yesFilter c x

        -- The ability to modify the spec
        -- based on chosen trait.
        -- Used to address
        -- https://github.com/nc-minibbs/minibbs.us/issues/31
        withTrait diet winter breeding x =
            case trait of
                Diet5Cat ->
                    diet x

                WinterBiome ->
                    winter x

                BreedingBiome ->
                    breeding x

        {-
           Define the primary layer's encoding
        -}
        enc =
            encoding
                << position X
                    [ pName "year"
                    , pTemporal
                    , pAxis
                        [ axTitle ""
                        , axGrid False
                        , axTickCount (niTickCount 5)
                        ]
                    ]
                << position Y
                    [ pName "yBar"
                    , pQuant
                    , pAggregate opMean
                    , pAxis
                        [ axTitle "Average Count per Route"
                        , axGrid False
                        ]
                    ]
                << color
                    ([ mName "group"
                     , mTitle (replace "_" " " (traitToString trait))
                     , mNominal
                     , mLegend ([ leSymbolType symStroke , leSymbolStrokeWidth 5]
                        |> withTrait
                            (\x -> x ++  [ leTitle "Diet"  ] )
                            (\x -> x)
                            (\x -> x))
                     ]
                    )
                << tooltips
                    [ [ tName "group"
                      , tTitle (replace "_" " " (traitToString trait))
                      ]
                    , [ tName "year"
                      , tTitle "Year"
                      , tTemporal
                      , tFormat "%Y"
                      ]
                    , [ tName "yBar"
                      , tTitle "Avg. count"
                      , tQuant
                      , tFormat ".2f"
                      , tAggregate opMean
                      ]
                    ]

        {-
           Define data transform and summaries
        -}
        trans =
            transform
                << lookup "common_name"
                    traitData
                    "english_common_name"
                    (luFieldsAs [ ( traitToString trait, "group" ) ])
                -- Filter based on the selected county
                << withCountyFilter
                    (\x -> x)
                    (\county x ->
                        filter (fiEqual "mbbs_county" (str (countyToString county))) x
                    )
                << withTrait
                    -- relabel diet categories
                    -- TODO: find a more robust way -- rename in source data (?)
                    (\x -> calculateAs "{'FruiNect': 'Fruit/Nectar', 'PlantSeed': 'Plant/Seed', 'VertFishScav' : 'Carnivore/Scavenger', 'Invertebrate' : 'Invertebrate', 'Omnivore' : 'Omnivore'  }[datum.group]" "group" x)
                    (\x -> x)
                    (\x -> x)
                << withTrait
                    (\x -> x)
                    (\x -> x)
                    -- filter out Boreal Forest per for breeding biome
                    -- https://github.com/nc-minibbs/minibbs.us/issues/31
                    (filter (fiExpr "datum.group != 'Boreal Forest'"))
                -- Compute counts per species within each route/year
                -- This and the next sum could combined,
                -- but kept for clarity of the data summarizing steps.
                << aggregate
                    [ opAs opSum "count" "speciesCount" ]
                    [ "year"
                    , "group"
                    , "mbbs_county"
                    , "route"
                    , "common_name"
                    ]
                -- Compute counts of all species within each route/year.
                << aggregate
                    [ opAs opSum "speciesCount" "routeCount"
                    ]
                    [ "year"
                    , "group"
                    , "mbbs_county"
                    , "route"
                    ]
                -- Per year, compute both:
                -- * counts with a county
                -- * number of routes run within a county
                << aggregate
                    [ opAs opSum "routeCount" "countyCount"
                    , opAs opDistinct "route" "nRoutesRun"
                    ]
                    [ "year"
                    , "group"
                    , "mbbs_county"
                    ]
                -- Compute tallies per year (across counties)
                << aggregate
                    [ opAs opSum "countyCount" "yearCount"
                    , opAs opSum "nRoutesRun" "yearRoutes"
                    ]
                    [ "year"
                    , "group"
                    ]
                -- Compute yBar as
                --   total count in year
                -- / total routes run in year
                << calculateAs
                    """
                    datum.yearCount / datum.yearRoutes
                    """
                    "yBar"


    in
    toVegaLite
        [ countData
        , mbbsVizConfig []
        , enc []
        , layer
            [ -- The main line chart
              asSpec
                [ line []
                ]
            , -- Transparent layer to make it easier to select tooltip
              asSpec
                [ line [ maStrokeWidth 15, maOpacity 0 ]
                ]
            ]
        , trans []
        ]
