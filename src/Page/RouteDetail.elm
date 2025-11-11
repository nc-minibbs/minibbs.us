module Page.RouteDetail exposing (Model, Msg, init, update, view, toSpec)

import Data.County exposing (countyToTitle, countyToString)
import Data.Mbbs exposing (mbbsData, mbbsCounts, Count)
import Data.Route exposing (Route)
import Data.Species exposing (speciesToString)
import Dict exposing (Dict)
import Dict.Extra exposing (groupBy)
import Html exposing (..)
import Html.Attributes exposing (id, class, src, width, height, placeholder)
import Html.Events exposing (onInput)
import Set
import Specs.RouteDashboard exposing (mkRouteDashboardSpec)
import String exposing (fromFloat, fromInt)
import Table
import VegaLite exposing (Spec)


type alias Model =
    { route : Route
    , tableState : Table.State
    , searchQuery : String
    }


type Msg
    = SetQuery String
    | SetTableState Table.State


init : Route -> ( Model, Cmd Msg )
init route =
    ( { route = route
      , tableState = Table.initialSort "Avg Count/Year"
      , searchQuery = ""
      }
    , Cmd.none
    )


toSpec : Model -> Spec
toSpec model =
    mkRouteDashboardSpec mbbsData model.route


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update _ msg model =
    case msg of
        SetQuery newQuery ->
            ( { model | searchQuery = newQuery }
            , Cmd.none
            )

        SetTableState newState ->
            ( { model | tableState = newState }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    div [ class "route-detail" ]
        [ viewRouteInfo model.route
        , div [ id "routeViz" ] []
        , viewRouteMap model.route
        , viewSpeciesTable model
        ]


viewRouteInfo : Route -> Html Msg
viewRouteInfo route =
    div [ class "route-info" ]
        [ h2 [] [ text (countyToTitle route.county ++ " " ++ fromInt route.number) ]
        , p [] [ text route.name ]
        ]


viewRouteMap : Route -> Html Msg
viewRouteMap route =
    iframe
        [ src (routeToMapURL route)
        , width 400
        , height 400
        ]
        []


routeToMapURL : Route -> String
routeToMapURL r =
    "https://www.google.com/maps/d/embed?mid="
        ++ r.mapid
        ++ "&ll="
        ++ fromFloat r.maplat
        ++ "%2C"
        ++ fromFloat r.maplon
        ++ "&z=13"


viewSpeciesTable : Model -> Html Msg
viewSpeciesTable model =
    case mbbsCounts of
        Ok counts ->
            let
                lowerQuery =
                    String.toLower model.searchQuery

                tableData =
                    summarizeRoute model.route counts
                        |> List.filter
                            (\summary -> 
                                String.contains lowerQuery 
                                    (String.toLower summary.species)
                            )
            in
            div []
                [ input 
                    [ placeholder "Search by Name"
                    , onInput SetQuery 
                    ] 
                    []
                , Table.view tableConfig model.tableState tableData
                ]

        Err _ ->
            div [] [ text "Error loading species data" ]


type alias SpeciesRouteSummary =
    { species : String
    , avgCount : Float
    , nYearsObserved : Int
    , avgYearsObserved : Float
    , pctRoutesEverObserved : Float
    }


tableConfig : Table.Config SpeciesRouteSummary Msg
tableConfig =
    Table.config
        { toId = .species
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn "Species" .species
            , Table.floatColumn "Avg Count/Year" .avgCount
            , Table.intColumn "% Years Observed" 
                (\x -> round (x.avgYearsObserved * 100))
            , Table.floatColumn "% Routes Observed (any year)" 
                (\x -> toFloat (round (x.pctRoutesEverObserved * 100)))
            ]
        }


-- Helper functions from DisplayRouteDashboard

removeZeroCounts : List Count -> List Count
removeZeroCounts =
    List.filter (\x -> x.count /= 0)


filterRoute : Route -> List Count -> List Count
filterRoute r =
    List.filter
        (\x -> x.county == r.county && x.route_num == r.number)


groupBySpecies : List Count -> Dict String (List Count)
groupBySpecies =
    groupBy (speciesToString << .species)


groupByRoute : List Count -> Dict String (List Count)
groupByRoute =
    groupBy (\x -> countyToString x.county ++ fromInt x.route_num)


summarizeRoute : Route -> List Count -> List SpeciesRouteSummary
summarizeRoute r cnts =
    let
        nYearsObserved : List Count -> Int
        nYearsObserved =
            Set.size << Set.fromList << List.map .year

        everObserved : List Count -> Bool
        everObserved =
            (>) 0 << nYearsObserved << removeZeroCounts

        totalRoutes : Float
        totalRoutes =
            34.0

        allSpeciesData : List Count
        allSpeciesData =
            removeZeroCounts cnts

        allSpeciesGrouped : Dict String (Dict String Bool)
        allSpeciesGrouped =
            Dict.map
                (\_ x -> Dict.map (\_ -> everObserved) (groupByRoute x))
                (groupBySpecies allSpeciesData)

        speciesPropRoutesEverObserved : Dict String Float
        speciesPropRoutesEverObserved =
            Dict.map
                (\_ x -> toFloat (Dict.size x) / totalRoutes)
                allSpeciesGrouped

        routeData : List Count
        routeData =
            filterRoute r allSpeciesData

        nYearsOfSurvey : Int
        nYearsOfSurvey =
            nYearsObserved routeData

        totalCount : List Count -> Int
        totalCount =
            List.foldr (\x acc -> x.count + acc) 0

        avgCount : List Count -> Float
        avgCount x =
            toFloat (totalCount x) / toFloat nYearsOfSurvey

        avgYearsObserved : List Count -> Float
        avgYearsObserved x =
            toFloat (nYearsObserved x) / toFloat nYearsOfSurvey

        dict : Dict String ( Float, Int, Float )
        dict =
            Dict.map
                (\_ v -> ( avgCount v, nYearsObserved v, avgYearsObserved v ))
                (groupBySpecies routeData)

        merged =
            Dict.merge
                (\key a -> Dict.insert key ( a, 0.0 ))
                (\key a b -> Dict.insert key ( a, b ))
                (\_ _ -> identity)
                dict
                speciesPropRoutesEverObserved
                Dict.empty
    in
    List.map
        (\( s, ( ( a, b, c ), d ) ) ->
            { species = s
            , avgCount = a
            , nYearsObserved = b
            , avgYearsObserved = c
            , pctRoutesEverObserved = d
            }
        )
        (Dict.toList merged)