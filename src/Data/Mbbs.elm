module Data.Mbbs exposing (..)

{-| Exposes the MBBS data as a
[VegaLite Data object](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#2-specifying-the-data-to-visualize).
-}

import Csv.Decode as Decode exposing (Decoder)
import Data.County exposing (County, stringToCounty)
import Data.MbbsCsv exposing (mbbsCsv)
import Data.Species exposing (..)
import VegaLite exposing (..)



-- Parse MBBS Count data


mbbsParse : String -> Data
mbbsParse file =
    dataFromUrl file
        [ parse
            [ ( "year", foDate "%Y" )
            , ( "count", foNum )
            ]
        ]


mbbsData : Data
mbbsData =
    mbbsParse "../data/mbbs.csv"


type alias Count =
    { species : Species
    , year : Int
    , county : County
    , route_num : Int
    , count : Int
    }


decodeSpecies : Decoder Species
decodeSpecies =
    Decode.andThen (\x -> Decode.fromMaybe "expected a species" (stringToSpecies x)) Decode.string


decodeCounty : Decoder County
decodeCounty =
    Decode.andThen (\x -> Decode.fromMaybe "expected a county" (stringToCounty x)) Decode.string


decoder : Decoder Count
decoder =
    Decode.into Count
        |> Decode.pipeline (Decode.field "common_name" decodeSpecies)
        |> Decode.pipeline (Decode.field "year" Decode.int)
        |> Decode.pipeline (Decode.field "county" decodeCounty)
        |> Decode.pipeline (Decode.field "route_num" Decode.int)
        |> Decode.pipeline (Decode.field "count" Decode.int)


mbbsCounts : Result Decode.Error (List Count)
mbbsCounts =
    Decode.decodeCsv Decode.FieldNamesFromFirstRow decoder mbbsCsv
