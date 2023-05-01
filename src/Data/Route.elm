module Data.Route exposing (..)

import Data.County exposing (..)
import String exposing (..)


type alias Route =
    { county : County
    , number : Int
    }


routeToString : Route -> String
routeToString x =
    countyToString x.county ++ " " ++ fromInt x.number


stringToRoute : String -> Maybe Route
stringToRoute x =
    let
        res =
            split " " x

        cnty =
            List.head res |> Maybe.andThen stringToCounty

        num =
            List.head (List.reverse res) |> Maybe.andThen toInt
    in
    case ( cnty, num ) of
        ( Just c, Just i ) ->
            Just { county = c, number = i }

        _ ->
            Nothing


allRoutes : List Route
allRoutes =
    List.map (\x -> { county = Chatham, number = x }) (List.range 1 14)
        ++ List.map (\x -> { county = Durham, number = x }) (List.range 1 8)
        ++ List.map (\x -> { county = Orange, number = x }) (List.range 1 12)
