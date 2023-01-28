module Data.County exposing (..)


type County
    = Chatham
    | Durham
    | Orange


countyToString : County -> String
countyToString county =
    case county of
        Chatham ->
            "chatham"

        Durham ->
            "durham"

        Orange ->
            "orange"


type CountyAggregation
    = Combined
    | Split
