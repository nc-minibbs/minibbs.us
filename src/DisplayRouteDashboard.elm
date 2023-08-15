port module DisplayRouteDashboard exposing (..)

import Browser
import Csv.Decode exposing (errorToString)
import Data.County exposing (CountyAggregation(..), countyToTitle)
import Data.Mbbs exposing (..)
import Data.Route exposing (..)
import Data.Species exposing (..)
import Dict exposing (Dict)
import Dict.Extra exposing (..)
import Html exposing (..)
import Html.Attributes as Attr
import Html.Events exposing (onInput)
import Html.Styled as Styled
import Json.Encode as E
import Select exposing (..)
import Set
import Specs.RouteDashboard exposing (..)
import String exposing (fromFloat, fromInt)
import Table exposing (..)
import VegaLite exposing (..)


main : Program () Model Msg
main =
    Browser.element
        { init =
            always
                ( init
                , Cmd.none
                )
        , view = view
        , update = update vegaPort
        , subscriptions = \_ -> Sub.none
        }


mkSpecs : Route -> Spec
mkSpecs =
    mkRouteDashboardSpec mbbsData


routeToMenuItem : Route -> Select.MenuItem String
routeToMenuItem route =
    basicMenuItem
        { item = routeToString route
        , label = routeToTitle route
        }


routeMenuItems : List (Select.MenuItem String)
routeMenuItems =
    List.map
        routeToMenuItem
        allRoutes


type alias Model =
    { selectState : Select.State
    , items : List (Select.MenuItem String)
    , selectedRoute : Maybe Route
    , selectedItem : Maybe String
    , tableData : List SpeciesRouteSummary
    , tableState : Table.State
    , query : String
    }


init : Model
init =
    { selectState =
        Select.initState (Select.selectIdentifier "RouteSelector")
    , items = routeMenuItems
    , selectedRoute = Nothing
    , selectedItem = Nothing
    , tableData = []
    , tableState = Table.initialSort "Year"
    , query = ""
    }


type Msg
    = SelectRoute (Select.Msg String)
    | SetQuery String
    | SetTableState Table.State


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update toPort msg model =
    -- let
    --     filterSpeciesByQuery query =
    --             List.filter
    --                 (\z -> String.contains (String.toLower query) z.commonName)
    --                 allSpeciesRec
    --     filterSpeciesByState m =
    --             List.filter
    --                 (\z -> List.member z.commonName (List.map .species m.species))
    --                 allSpeciesRec
    -- in
    case msg of
        SelectRoute sm ->
            let
                ( maybeAction, selectState, cmds ) =
                    Select.update sm model.selectState

                updateSelectedItem =
                    case maybeAction of
                        Just (Select.Select i) ->
                            Just i

                        Just (Select.InputChange s) ->
                            Just s

                        Just Select.Clear ->
                            Nothing

                        _ ->
                            model.selectedItem

                updateSelectedRoute =
                    case maybeAction of
                        Just (Select.Select i) ->
                            stringToRoute i

                        Just Select.Clear ->
                            Nothing

                        _ ->
                            model.selectedRoute

                specMsg =
                    case maybeAction of
                        Just (Select.Select i) ->
                            case stringToRoute i of
                                Nothing ->
                                    Cmd.none

                                Just s ->
                                    toPort (mkSpecs s)

                        -- Clear visualization by sending an empty Spec
                        -- when selection is cleared
                        Just Select.Clear ->
                            toPort (E.object [])

                        _ ->
                            Cmd.none
            in
            ( { model
                | selectState = selectState
                , selectedItem = updateSelectedItem
                , selectedRoute = updateSelectedRoute
              }
            , Cmd.batch [ specMsg, Cmd.map SelectRoute cmds ]
            )

        SetQuery newQuery ->
            ( { model | query = newQuery }
            , Cmd.none
            )

        SetTableState newState ->
            ( { model | tableState = newState }
            , Cmd.none
            )


routeToMapURL : Route -> String
routeToMapURL r =
    "https://www.google.com/maps/d/embed?mid="
        ++ r.mapid
        ++ "&ll="
        ++ fromFloat r.maplat
        ++ "%2C"
        ++ fromFloat r.maplon
        ++ "&z=13"


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


type alias SpeciesRouteSummary =
    { species : String
    , avgCount : Float
    , nYearsObserved : Int
    , avgYearsObserved : Float
    }


summarizeRoute : Route -> List Count -> List SpeciesRouteSummary
summarizeRoute r cnts =
    let
        routeData : List Count
        routeData =
            removeZeroCounts <| filterRoute r cnts

        nYearsOfSurvey : Int
        nYearsOfSurvey =
            (Set.size << Set.fromList << List.map .year) routeData

        totalCount : List Count -> Int
        totalCount =
            List.foldr (\x acc -> x.count + acc) 0

        avgCount : List Count -> Float
        avgCount x =
            toFloat (totalCount x) / toFloat nYearsOfSurvey

        nYearsObserved : List Count -> Int
        nYearsObserved =
            Set.size << Set.fromList << List.map .year

        avgYearsObserved : List Count -> Float
        avgYearsObserved x =
            toFloat (nYearsObserved x) / toFloat nYearsOfSurvey

        dict : Dict String ( Float, Int, Float )
        dict =
            Dict.map
                (\_ v -> ( avgCount v, nYearsObserved v, avgYearsObserved v ))
                (groupBySpecies routeData)
    in
    List.map
        (\( s, ( a, b, c ) ) ->
            { species = s
            , avgCount = a
            , nYearsObserved = b
            , avgYearsObserved = c
            }
        )
        (Dict.toList dict)


displayRouteSpeciesTable : Table.State -> String -> Route -> Html Msg
displayRouteSpeciesTable state query r =
    case mbbsCounts of
        Ok counts ->
            let
                lowerQuery =
                    String.toLower query

                tableData =
                    List.filter
                        (String.contains lowerQuery << String.toLower << .species)
                        (summarizeRoute r counts)

                config =
                    Table.config
                        { toId = .species
                        , toMsg = SetTableState
                        , columns =
                            [ Table.stringColumn "Name" .species
                            , Table.floatColumn "Avg. Count/Year" (\x -> toFloat (round (x.avgCount * 100)) / 100)
                            , Table.intColumn "% Years Observed" (\x -> round (x.avgYearsObserved * 100))
                            ]
                        }
            in
            div
                []
                [ input [ Attr.placeholder "Search by Name", onInput SetQuery ] []
                , Table.view config state tableData
                ]

        Err e ->
            div [] [ Html.text <| errorToString e ]


viewTable : Model -> Html Msg
viewTable m =
    case m.selectedRoute of
        Just r ->
            displayRouteSpeciesTable m.tableState m.query r

        Nothing ->
            div [] []


displayRouteInfo : Model -> Html Msg
displayRouteInfo m =
    case m.selectedRoute of
        Just r ->
            div []
                [ Html.h2 [] [ Html.text (countyToTitle r.county ++ "  " ++ fromInt r.number) ]
                , Html.p [] [ Html.text r.name ]
                , Html.p [] [ Html.text ("Total years surveyed: " ++ fromInt r.total_years_surveyed) ]
                ]

        Nothing ->
            div [] []


view : Model -> Html Msg
view m =
    let
        selectedItem =
            case m.selectedItem of
                Just i ->
                    Just (Select.basicMenuItem { item = i, label = i })

                _ ->
                    Nothing
    in
    div []
        [ Styled.toUnstyled <|
            Styled.map SelectRoute <|
                Select.view
                    (Select.single selectedItem
                        |> Select.state m.selectState
                        |> Select.menuItems m.items
                        |> Select.placeholder "Select route"
                        |> Select.searchable True
                        |> Select.clearable True
                    )
        , displayRouteInfo m
        , div [ Attr.id "vegaViz" ] []
        , viewTable m
        ]


port vegaPort : Spec -> Cmd msg
