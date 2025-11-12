module Page.SpeciesDetail exposing (Model, Msg, init, toSpec, update, view)

import Browser.Navigation as Nav
import Data.County exposing (CountyAggregation(..))
import Data.Species exposing (Species, SpeciesRec, allSpeciesRec, speciesToString, stringToSpecies)
import Html exposing (Html, div, h2, input, label, text)
import Html.Attributes exposing (checked, class, id, style, type_)
import Html.Events exposing (onCheck, onClick)
import Html.Styled as Styled
import Route
import Select exposing (..)
import Specs.SpeciesTrend exposing (RouteDetail(..), mkSpeciesTrendSpec)
import VegaLite exposing (Spec)


{-| Model for the species detail page
-}
type alias Model =
    { species : Species
    , countyAggregation : CountyAggregation
    , routeDetail : RouteDetail
    , selectState : Select.State
    , selectedItem : Maybe String
    }


{-| Messages for updating the page
-}
type Msg
    = SelectCountyAggregation CountyAggregation
    | ToggleRouteDetail Bool
    | SelectSpecies (Select.Msg String)


{-| Initialize the page with a species from the URL
-}
init : Species -> Maybe CountyAggregation -> Maybe RouteDetail -> ( Model, Cmd Msg )
init species maybeCounty maybeRoute =
    ( { species = species
      , countyAggregation = Maybe.withDefault Combined maybeCounty
      , routeDetail = Maybe.withDefault ShowRouteDetail maybeRoute
      , selectState = Select.initState (Select.selectIdentifier "SpeciesSelector")
      , selectedItem = Just (speciesToString species)
      }
    , Cmd.none
    )


{-| Get the current spec for this page's state
Used by Main to send to vegaPort when needed
-}
toSpec : Model -> Spec
toSpec model =
    mkSpeciesTrendSpec model.routeDetail model.countyAggregation model.species


{-| Update the page state
Takes a function to send specs to vega (the port, owned by Main)
-}
update : (Spec -> Cmd Msg) -> Nav.Key -> Msg -> Model -> ( Model, Cmd Msg )
update sendToVega navKey msg model =
    case msg of
        SelectCountyAggregation aggregation ->
            let
                newModel =
                    { model | countyAggregation = aggregation }
            in
            ( newModel
            , sendToVega (toSpec newModel)
            )

        SelectSpecies sm ->
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

                navigationCmd =
                    case maybeAction of
                        Just (Select.Select i) ->
                            case stringToSpecies i of
                                Just newSpecies ->
                                    Nav.pushUrl navKey (Route.toHref (Route.SpeciesDetail newSpecies))

                                Nothing ->
                                    Cmd.none

                        _ ->
                            Cmd.none
            in
            ( { model
                | selectState = selectState
                , selectedItem = updateSelectedItem
              }
            , Cmd.batch [ navigationCmd, Cmd.map SelectSpecies cmds ]
            )

        ToggleRouteDetail showDetail ->
            let
                newRouteDetail =
                    if showDetail then
                        ShowRouteDetail

                    else
                        HideRouteDetail

                newModel =
                    { model | routeDetail = newRouteDetail }
            in
            ( newModel
            , sendToVega (toSpec newModel)
            )


{-| Render the page
-}
view : Model -> Html Msg
view model =
    div [ class "species-detail" ]
        [ viewSpeciesSelector model

        -- , h2 [] [ text (speciesToString model.species) ]
        , viewControls model
        , div [ id "speciesDetailViz" ] []
        ]


viewSpeciesSelector : Model -> Html Msg
viewSpeciesSelector model =
    let
        selectedItem =
            Maybe.map (\i -> Select.basicMenuItem { item = i, label = i }) model.selectedItem
    in
    div [ class "species-selector", style "margin-bottom" "20px", style "max-width" "400px" ]
        [ Styled.toUnstyled <|
            Styled.map SelectSpecies <|
                Select.view
                    (Select.single selectedItem
                        |> Select.state model.selectState
                        |> Select.menuItems speciesMenuItems
                        |> Select.placeholder "Select species"
                        |> Select.searchable True
                        |> Select.clearable True
                    )
        ]


speciesMenuItems : List (Select.MenuItem String)
speciesMenuItems =
    List.map speciesToMenuItem allSpeciesRec


speciesToMenuItem : SpeciesRec -> Select.MenuItem String
speciesToMenuItem rec =
    Select.basicMenuItem
        { item = speciesToString rec.species
        , label = rec.commonName
        }


{-| Render the control panel
-}
viewControls : Model -> Html Msg
viewControls model =
    div [ class "controls" ]
        [ viewCountyRadio model
        , viewRouteDetailCheckbox model
        ]


{-| Radio buttons for county aggregation
-}
viewCountyRadio : Model -> Html Msg
viewCountyRadio model =
    div [ class "control-group" ]
        [ label []
            [ input
                [ type_ "radio"
                , checked (model.countyAggregation == Combined)
                , onClick (SelectCountyAggregation Combined)
                ]
                []
            , text "All counties combined"
            ]
        , label []
            [ input
                [ type_ "radio"
                , checked (model.countyAggregation == Split)
                , onClick (SelectCountyAggregation Split)
                ]
                []
            , text "By county"
            ]
        ]


{-| Checkbox for route detail toggle
-}
viewRouteDetailCheckbox : Model -> Html Msg
viewRouteDetailCheckbox model =
    div [ class "control-group" ]
        [ label []
            [ input
                [ type_ "checkbox"
                , checked (model.routeDetail == ShowRouteDetail)
                , onCheck ToggleRouteDetail
                ]
                []
            , text "Show individual routes"
            ]
        ]
