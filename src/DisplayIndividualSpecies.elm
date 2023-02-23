port module DisplayIndividualSpecies exposing (..)

import Browser
import Data.County exposing (County(..), CountyAggregation(..))
import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (..)
import Element
import Element.Input as Input
import Html
import Html.Styled as Styled
import Html.Styled.Attributes as StyledAttribs
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
        , view = view >> Styled.toUnstyled
        , update = update vegaPort
        , subscriptions = \_ -> Sub.none
        }


mkSpecs : RouteDetail -> CountyAggregation -> Species -> Spec
mkSpecs =
    mkSpeciesTrendSpec
        mbbsData



-- initSpec : Spec
-- initSpec =
--     mkSpecs (init.routeDetail) (init.countyAggregation) NorthernCardinal


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


countyRadio : Model -> Html.Html Msg
countyRadio model =
    Element.layout [] <|
        Element.column []
            [ Input.radioRow
                []
                { onChange = SelectCountyAggregation
                , selected = Just model.countyAggregation
                , label = Input.labelLeft [] <| Element.text "Counties:"
                , options =
                    [ Input.option Combined <| Element.text "Combined"
                    , Input.option Split <| Element.text "Split"
                    ]
                }
            ]


routeDetailCheckbox : Model -> Html.Html Msg
routeDetailCheckbox model =
    Element.layout [] <|
        Element.column []
            [ Input.checkbox
                []
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
                , label = Input.labelLeft [] <| Element.text "Show route detail: "
                }
            ]


view : Model -> Styled.Html Msg
view m =
    let
        selectedItem =
            case m.selectedItem of
                Just i ->
                    Just (Select.basicMenuItem { item = i, label = i })

                _ ->
                    Nothing
    in
    Styled.div
        []
        [ Styled.map SelectSpecies <|
            Select.view
                (Select.single selectedItem
                    |> Select.state m.selectState
                    |> Select.menuItems m.items
                    |> Select.placeholder "Select a species"
                    |> Select.searchable True
                    |> Select.clearable True
                )
        , Styled.div
            []
            [ Styled.fromUnstyled (countyRadio m) ]
        , Styled.div
            []
            [ Styled.fromUnstyled (routeDetailCheckbox m) ]
        , Styled.div
            [ StyledAttribs.id "vegaViz"
            ]
            []
        ]


port vegaPort : Spec -> Cmd msg
