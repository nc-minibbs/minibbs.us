port module Species exposing
    ( main
    , vegaLiteSpec
    )

import Browser
import Css
import Debug exposing (toString)
import Html exposing (Html)
import Html.Styled as Styled exposing (Html, div, text)
import Html.Styled.Attributes as StyledAttribs
import Select exposing (..)
import Specs.SpeciesTrend exposing (mbbsSpecs)
import VegaLite exposing (Spec)


type Species
    = NorthernCardinal
    | AmericanCrow
    | CarolinaWren


allSpecies : List Species
allSpecies =
    [ NorthernCardinal
    , AmericanCrow
    , CarolinaWren
    ]


speciesToString : Species -> String
speciesToString species =
    case species of
        NorthernCardinal ->
            "Northern Cardinal"

        AmericanCrow ->
            "American Crow"

        CarolinaWren ->
            "Carolina Wren"


speciesToMenuItem : Species -> Select.MenuItem Species
speciesToMenuItem species =
    basicMenuItem { item = species, label = speciesToString species }


speciesMenuItems : List (Select.MenuItem Species)
speciesMenuItems =
    List.map speciesToMenuItem allSpecies


type alias Model =
    { selectState : Select.State
    , items : List (Select.MenuItem Species)
    , selectedSpecies : Maybe Species
    }


init : Model
init =
    { selectState =
        Select.initState (Select.selectIdentifier "SpeciesSelector")
    , items = speciesMenuItems
    , selectedSpecies = Nothing
    }


type Msg
    = SelectMsg (Select.Msg Species)



-- your other Msg's


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SelectMsg sm ->
            let
                ( maybeAction, selectState, _ ) =
                    Select.update sm model.selectState

                updatedSelectedItem =
                    case maybeAction of
                        Just (Select.Select i) ->
                            Just i
                                |> Debug.log "Selected"

                        Just Select.Clear ->
                            Nothing

                        _ ->
                            model.selectedSpecies

                specMsg =
                    case maybeAction of
                        Just (Select.Select i) ->
                            vegaLiteSpec (mbbsSpecs (speciesToString i))

                        _ ->
                            Cmd.none
            in
            ( { model
                | selectState = selectState
                , selectedSpecies = updatedSelectedItem

                -- , currentSpec = updatedSpec
              }
            , Cmd.map SelectMsg specMsg
            )


view : Model -> Html Msg
view m =
    let
        selectedItem =
            case m.selectedSpecies of
                Just i ->
                    Just (speciesToMenuItem i)

                _ ->
                    Nothing
    in
    div
        [ StyledAttribs.css
            [ Css.marginTop (Css.px 20)
            , Css.width (Css.pct 50)
            , Css.marginLeft Css.auto
            , Css.marginRight Css.auto
            ]
        ]
        [ Styled.map SelectMsg <|
            Select.view
                (Select.single selectedItem
                    |> Select.state m.selectState
                    |> Select.menuItems m.items
                    |> Select.placeholder "Select a species"
                    |> Select.searchable True
                    |> Select.clearable True
                )
        , div
            []
            [ text (toString m.selectedSpecies) ]
        , div
            [ StyledAttribs.id "speciesTrend" ]
            []
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = always ( init, Cmd.none ) -- vegaLiteSpec (mbbsSpecs "Northern Cardinal") )
        , view = view >> Styled.toUnstyled
        , update = update
        , subscriptions = \_ -> Sub.none
        }


port vegaLiteSpec : Spec -> Cmd msg
