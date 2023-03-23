port module DisplayIndividualSpecies exposing (..)

import Browser
import Data.County exposing (CountyAggregation(..))
import Data.Species exposing (..)
import Element exposing (..)
import Element.Input as Input
import Html exposing (..)
import Html.Attributes as Attr
import Html.Styled as Styled
import Json.Encode as E
import Select exposing (..)
import Specs.SpeciesTrend exposing (..)
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


mkSpecs : RouteDetail -> CountyAggregation -> Species -> Spec
mkSpecs =
    mkSpeciesTrendSpec


speciesToMenuItem : Species -> Select.MenuItem String
speciesToMenuItem species =
    basicMenuItem
        { item = speciesToString species
        , label = speciesToString species
        }


speciesMenuItems : List (Select.MenuItem String)
speciesMenuItems =
    List.map
        speciesToMenuItem
        allSpecies


type alias Model =
    { selectState : Select.State
    , items : List (Select.MenuItem String)
    , selectedSpecies : Maybe Species
    , selectedItem : Maybe String
    , countyAggregation : CountyAggregation
    , routeDetail : RouteDetail
    }


init : Model
init =
    { selectState =
        Select.initState (Select.selectIdentifier "SpeciesSelector")
    , items = speciesMenuItems
    , selectedSpecies = Nothing
    , selectedItem = Nothing
    , countyAggregation = Combined
    , routeDetail = ShowRouteDetail
    }


type Msg
    = SelectSpecies (Select.Msg String)
    | SelectCountyAggregation CountyAggregation
    | ToggleRouteDetail RouteDetail


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update toPort msg model =
    case msg of
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

                updateSelectedSpecies =
                    case maybeAction of
                        Just (Select.Select i) ->
                            stringToSpecies i

                        Just Select.Clear ->
                            Nothing

                        _ ->
                            model.selectedSpecies

                specMsg =
                    case maybeAction of
                        Just (Select.Select i) ->
                            case stringToSpecies i of
                                Nothing ->
                                    Cmd.none

                                Just s ->
                                    toPort (mkSpecs model.routeDetail model.countyAggregation s)

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
                , selectedSpecies = updateSelectedSpecies
              }
            , Cmd.batch [ specMsg, Cmd.map SelectSpecies cmds ]
            )

        SelectCountyAggregation opt ->
            ( { model | countyAggregation = opt }
            , case model.selectedSpecies of
                Nothing ->
                    Cmd.none

                Just s ->
                    toPort (mkSpecs model.routeDetail opt s)
            )

        ToggleRouteDetail opt ->
            ( { model | routeDetail = opt }
            , case model.selectedSpecies of
                Nothing ->
                    Cmd.none

                Just s ->
                    toPort (mkSpecs opt model.countyAggregation s)
            )


countyRadio : Model -> Element Msg
countyRadio model =
    Input.radioRow
        [ Element.spacing 10 ]
        { onChange = SelectCountyAggregation
        , selected = Just model.countyAggregation
        , label = Input.labelLeft [] <| none
        , options =
            [ Input.option Combined <| Element.text "All counties combined"
            , Input.option Split <| Element.text "By county"
            ]
        }


routeDetailCheckbox : Model -> Element Msg
routeDetailCheckbox model =
    Input.checkbox
        [ Element.spacing 10 ]
        { onChange =
            \x ->
                if x == True then
                    ToggleRouteDetail ShowRouteDetail

                else
                    ToggleRouteDetail HideRouteDetail
        , icon = Input.defaultCheckbox
        , checked =
            case model.routeDetail of
                ShowRouteDetail ->
                    True

                HideRouteDetail ->
                    False
        , label = Input.labelLeft [] <| Element.text "Show individual routes"
        }


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
                [ Element.width Element.fill
                ]
              <|
                Element.html <|
                    Styled.toUnstyled <|
                        Styled.map SelectSpecies <|
                            Select.view
                                (Select.single selectedItem
                                    |> Select.state m.selectState
                                    |> Select.menuItems m.items
                                    |> Select.placeholder "Select species"
                                    |> Select.searchable True
                                    |> Select.clearable True
                                )
            , el [] <| countyRadio m
            , el [] <| routeDetailCheckbox m
            , el [ htmlAttribute (Attr.id "vegaViz") ] none
            ]


port vegaPort : Spec -> Cmd msg
