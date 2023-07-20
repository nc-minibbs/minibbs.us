port module DisplayRouteDashboard exposing (..)

import Browser
import Data.County exposing (CountyAggregation(..), countyToString)
import Data.Mbbs exposing (mbbsData)
import Data.Route exposing (..)
import Data.Species exposing (..)
import Element exposing (..)
import Html exposing (..)
import Html.Attributes as Attr
import Html.Styled as Styled
import Json.Encode as E
import Select exposing (..)
import Specs.RouteDashboard exposing (..)
import String exposing (fromInt)
import VegaLite exposing (..)
import String exposing (fromFloat)


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
        , label = routeToString route
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
    }


init : Model
init =
    { selectState =
        Select.initState (Select.selectIdentifier "RouteSelector")
    , items = routeMenuItems
    , selectedRoute = Nothing
    , selectedItem = Nothing
    }


type Msg
    = SelectRoute (Select.Msg String)


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update toPort msg model =
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

routeToMapURL : Route -> String
routeToMapURL r = 
    "https://www.google.com/maps/d/embed?mid=" 
    ++ r.mapid 
    ++ "&ll="
    ++ fromFloat r.maplat
    ++ "%2C" 
    ++ fromFloat r.maplon
    ++ "&z=10" 

displayRoute : Model -> Element Msg
displayRoute m =
    case m.selectedRoute of
        Just r ->
            Element.column []
                [ el [] <| Element.text (countyToString r.county ++ "  " ++ fromInt r.number)
                , el [] <| Element.text r.name
                , el [] <| Element.text ("Total years surveyed: " ++ fromInt r.total_years_surveyed)
                , el [] <| Element.html 
                    <| Html.iframe
                        [ Attr.src (routeToMapURL r)
                        , Attr.width 500 
                        , Attr.height 500 ] 
                        []
                ]

        Nothing ->
            el [] none


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
    layout [] <|
        Element.column
            [ Element.spacing 10
            ]
            [ el
                [ Element.width (Element.fill |> Element.minimum 250) -- Element.fill
                ]
              <|
                Element.html <|
                    Styled.toUnstyled <|
                        Styled.map SelectRoute <|
                            Select.view
                                (Select.single selectedItem
                                    |> Select.state m.selectState
                                    |> Select.menuItems m.items
                                    |> Select.placeholder "Select route"
                                    |> Select.searchable True
                                    |> Select.clearable True
                                )
            , displayRoute m
            , el [ htmlAttribute (Attr.id "vegaViz") ] none
            ]


port vegaPort : Spec -> Cmd msg
