module Page.RouteList exposing (Model, Msg, init, update, view)

import Data.County exposing (countyToTitle)
import Data.Route exposing (Route, allRoutes)
import Html exposing (..)
import Html.Attributes exposing (class, href)
import Route
import Table


type alias Model =
    { tableState : Table.State
    }


type Msg
    = SetTableState Table.State


init : ( Model, Cmd Msg )
init =
    ( { tableState = Table.initialSort "County" }
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetTableState newState ->
            ( { model | tableState = newState }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    div [ class "route-list" ]
        [ h2 [] [ text "Survey Routes" ]
        , Table.view tableConfig model.tableState allRoutes
        ]


tableConfig : Table.Config Route Msg
tableConfig =
    Table.config
        { toId = \route -> String.fromInt route.number ++ countyToTitle route.county
        , toMsg = SetTableState
        , columns =
            [ routeColumn
            , nameColumn
            ]
        }


routeColumn : Table.Column Route Msg
routeColumn =
    Table.veryCustomColumn
        { name = "Route"
        , viewData =
            \route ->
                Table.HtmlDetails []
                    [ a [ href (Route.toHref (Route.RouteDetail route)) ]
                        [ text (countyToTitle route.county ++ " " ++ String.fromInt route.number) ]
                    ]
        , sorter =
            Table.increasingOrDecreasingBy
                (\route -> countyToTitle route.county ++ " " ++ String.fromInt route.number)
        }


nameColumn : Table.Column Route Msg
nameColumn =
    Table.stringColumn "Name" .name
