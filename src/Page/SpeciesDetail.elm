module Page.SpeciesDetail exposing (Model, Msg, init, toSpec, update, view)

import Data.County exposing (CountyAggregation(..))
import Data.Species exposing (Species, speciesToString)
import Html exposing (Html, div, h2, input, label, text)
import Html.Attributes exposing (checked, class, id, type_)
import Html.Events exposing (onCheck, onClick)
import Specs.SpeciesTrend exposing (RouteDetail(..), mkSpeciesTrendSpec)
import VegaLite exposing (Spec)


{-| Model for the species detail page
-}
type alias Model =
    { species : Species
    , countyAggregation : CountyAggregation
    , routeDetail : RouteDetail
    }


{-| Messages for updating the page
-}
type Msg
    = SelectCountyAggregation CountyAggregation
    | ToggleRouteDetail Bool


{-| Initialize the page with a species from the URL
-}
init : Species -> ( Model, Cmd Msg )
init species =
    let
        model =
            { species = species
            , countyAggregation = Combined
            , routeDetail = ShowRouteDetail
            }
    in
    ( model
    , Cmd.none
      -- Main will handle sending the spec
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
update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update sendToVega msg model =
    case msg of
        SelectCountyAggregation aggregation ->
            let
                newModel =
                    { model | countyAggregation = aggregation }
            in
            ( newModel
            , sendToVega (toSpec newModel)
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
        [ h2 [] [ text (speciesToString model.species) ]
        , viewControls model
        , div [ id "speciesDetail" ] []
        ]


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
