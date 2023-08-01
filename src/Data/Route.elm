{-
   Elm code generated by Route-build.R
   This file should not be modified except by code formatters.
-}


module Data.Route exposing (..)

import Data.County exposing (..)
import String exposing (..)


type alias Route =
    { county : County
    , number : Int
    , start : String
    , name : String
    , directions : String
    , years_surveyed : List Int
    , total_years_surveyed : Int
    , mapid : String
    , maplat : Float
    , maplon : Float
    }


routeToString : Route -> String
routeToString x =
    countyToString x.county ++ " " ++ fromInt x.number


routeToTitle : Route -> String
routeToTitle x =
    countyToTitle x.county ++ " " ++ fromInt x.number


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

        _ ->
            Nothing



-- All Routes


allRoutes : List Route
allRoutes =
    [ { county = Chatham
      , number = 1
      , start = "Russell Chapel Road (County Road 1520) 1.4 miles west of US 15-50 (turn left 3.1 miles north of Pittsboro center).\n"
      , name = "Russell Chapel Road (north-central Chatham County)"
      , directions = "go east on Russell Chapel Road 1.4 miles to US 15-501 turn left on US 15-501, cross the Haw River and turn left on Moore Mountain Road (CR 1524), proceed 1.9 miles to River Road (CR1525), turn left on River Road and go 0.6 miles, turn right on Manns Chapel Road (CR 1532), and continue until your have completed 20 stops (near US 15-501)."
      , years_surveyed = [ 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023 ]
      , total_years_surveyed = 24
      , mapid = "1NRAImHBzXvdQGpsUzcCPb6tqxUkxMx0"
      , maplat = 35.8797466882081
      , maplon = -78.9570607975023
      }
    , { county = Chatham
      , number = 2
      , start = "Old Hope Valley Farm Road (CR 1728) on Mason Neck at gate 1.0 miles south of Farrington Mill Road near the county line (as far south as you can go)\n"
      , name = "Mason Neck (northeastern Chatham County)"
      , directions = "go north on Old Hope Valley Farm Road to Farrington Mill Road, turn left on Farrington Mill Road (CR 1109) and continue 1.9 miles to Mount Carmel Church Road (CR 1008), turn left and proceed southward about 2.3 miles, turn right on Lystra Road and after 1.0 miles turn left on Jack Bennett Road (CR 1717), continue all the way to US 15-501, turn left on US 15-501 for about 0.7 miles, turn right on Andrews Store Road (CR 1528) and continue until you have completed 20 stops."
      , years_surveyed = [ 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023 ]
      , total_years_surveyed = 24
      , mapid = "1NRAImHBzXvdQGpsUzcCPb6tqxUkxMx0"
      , maplat = 35.8797466882081
      , maplon = -78.9570607975023
      }
    ]
