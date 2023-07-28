module Data.Mbbs exposing (..)

{-| Exposes the MBBS data as a
[VegaLite Data object](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#2-specifying-the-data-to-visualize).
-}

import Csv.Decode as Decode exposing (Decoder)
import Data.County exposing (County, stringToCounty)
import Data.MbbsCsv exposing (mbbsCsv)
import Result exposing (withDefault)
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
    { common_name : String
    , sci_name : String
    , year : Int
    , mbbs_county : County
    , route : Int
    , route_num : Int
    , count : Int
    , time : Int
    }


decodeCounty : Decoder County
decodeCounty =
    Decode.andThen (\x -> Decode.fromMaybe "expected a county" (stringToCounty x)) Decode.string


decoder : Decoder Count
decoder =
    Decode.into Count
        |> Decode.pipeline (Decode.field "common_name" Decode.string)
        |> Decode.pipeline (Decode.field "sci_name" Decode.string)
        |> Decode.pipeline (Decode.field "year" Decode.int)
        |> Decode.pipeline (Decode.field "mbbs_county" decodeCounty)
        |> Decode.pipeline (Decode.field "route" Decode.int)
        |> Decode.pipeline (Decode.field "route_num" Decode.int)
        |> Decode.pipeline (Decode.field "count" Decode.int)
        |> Decode.pipeline (Decode.field "time" Decode.int)


mbbsCounts : Result Decode.Error (List Count)
mbbsCounts =
    Decode.decodeCsv Decode.FieldNamesFromFirstRow decoder mbbsCsv


testCounts : String
testCounts =
    case mbbsCounts of
        Ok _ ->
            "OK!"

        Err e ->
            Decode.errorToString e
