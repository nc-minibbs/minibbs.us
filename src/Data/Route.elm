module Data.Route exposing (..)

import Data.County exposing (..)
import String exposing (..)

type alias Route =
    { county : County
    , number : Int
    , start : String
    , name : String
    , route : String
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
           List.head (List.filter (\r -> r.county == c && r.number == i) allRoutes)
            -- Just { county = c, number = i }

        _ ->
            Nothing


-- allRoutes : List Route
-- allRoutes =
--     List.map (\x -> { county = Chatham, number = x }) (List.range 1 14)
--         ++ List.map (\x -> { county = Durham, number = x }) (List.range 1 8)
--         ++ List.map (\x -> { county = Orange, number = x }) (List.range 1 12)

allRoutes : List Route 
allRoutes = 
 [ { county = Chatham 
   , number = 1
   , name = "Russell Chapel Road (north-central Chatham County)"
   , start = 
   """
   Russell Chapel Road (County Road 1520) 1.4 miles west of US 15-50
   (turn left 3.1 miles north of Pittsboro center).
   """
   , route = 
    """
    go east on Russell Chapel Road 1.4 miles to US 15-501
    turn left on US 15-501,
    cross the Haw River and turn left on Moore Mountain Road (CR 1524),
    proceed 1.9 miles to River Road (CR1525),
    turn left on River Road and go 0.6 miles,
    turn right on Manns Chapel Road (CR 1532),
    and continue until your have completed 20 stops (near US 15-501).
    """
  }
 , { county = Chatham 
   , number = 2
   , name = "Mason Neck (northeastern Chatham County)"
   , start =
     """
     Old Hope Valley Farm Road (CR 1728)
     on Mason Neck at gate 1.0 miles south of Farrington Mill Road
     near the county line (as far south as you can go)
     """
    , route = 
    """
    go north on Old Hope Valley Farm Road to Farrington Mill Road,
    turn left on Farrington Mill Road (CR 1109)
    and continue 1.9 miles to Mount Carmel Church Road (CR 1008),
    turn left and proceed southward about 2.3 miles,
    turn right on Lystra Road
    and after 1.0 miles turn left on Jack Bennett Road (CR 1717),
    continue all the way to US 15-501,
    turn left on US 15-501 for about 0.7 miles,
    turn right on Andrews Store Road (CR 1528)
    and continue until you have completed 20 stops.
    """
  }
 ]