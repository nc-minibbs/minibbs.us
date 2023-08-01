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

countyToTitle : County -> String
countyToTitle county =
    case county of
        Chatham ->
            "Chatham"

        Durham ->
            "Durham"

        Orange ->
            "Orange"


stringToCounty : String -> Maybe County
stringToCounty x =
    case x of
        "chatham" ->
            Just Chatham

        "durham" ->
            Just Durham

        "orange" ->
            Just Orange

        _ ->
            Nothing


type CountyAggregation
    = Combined
    | Split



-- Colors for counties that can be used with (e.g.)
-- [categoricalDomainMap](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#categoricalDomainMap)


countyColorMap : List ( String, String )
countyColorMap =
    List.map
        (Tuple.mapFirst countyToString)
        [ ( Orange, "#ec5900" )
        , ( Chatham, "#11c385" )
        , ( Durham, "#7b0905" )
        ]
