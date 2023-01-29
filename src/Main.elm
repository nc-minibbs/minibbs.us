port module Main exposing (main, vegaPort)

--, vegaLite)

import Browser
import Css
import Data.County exposing (County(..), CountyAggregation(..))
import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (..)
import Data.Traits exposing (Trait(..), traitsData)
import Displays.IndividualSpeciesDisplay as ISD
import Displays.TraitLineDisplay as TraitDisplay
import Element
import Element.Input as Input
import Html
import Html.Styled as Styled
import Html.Styled.Attributes as StyledAttribs
import Select exposing (..)
import Specs.ExampleTrends exposing (mkExampleTrendsSpec)
import Specs.SpeciesTrend exposing (mkSpeciesTrendSpec)
import Specs.TrendByTrait exposing (mkTrendByTraitSpec)
import VegaLite exposing (..)



-- exampleTrendsSpec : Spec
-- exampleTrendsSpec =
--     mkExampleTrendsSpec
--         mbbsData
--         [ WoodThrush
--         , NorthernBobwhite
--         , EasternBluebird
--         , SummerTanager
--         ]
-- specs : Trait -> CountyAggregation -> Species -> Spec
-- specs trait x species =
--     combineSpecs
--         [ ( "exampleTrends", exampleTrendsSpec )
--         , ( "trendByTrait", trendByTraitSpec trait)
--         , ( "speciesTrend", speciesTrendSpec x species )
--         ]
{- -}


type Display
    = ByTraitDisplay TraitDisplay.Model
    | IndividualDisplay ISD.Model


type alias Model =
    { selectedDisplay : Display
    }


init : Model



-- init = { selectedDisplay = IndividualDisplay (ISD.init) }


init =
    { selectedDisplay = ByTraitDisplay TraitDisplay.init }


type Msg
    = ChangeDisplay Display
    | GotTraitMsg TraitDisplay.Msg
    | GotISDMsg ISD.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        display =
            model.selectedDisplay
    in
    case ( msg, display ) of
        ( GotTraitMsg submsg, ByTraitDisplay submodel ) ->
            TraitDisplay.update vegaPort submsg submodel
                |> updateWith (\x -> { selectedDisplay = ByTraitDisplay x }) GotTraitMsg

        ( GotISDMsg submsg, IndividualDisplay submodel ) ->
            ISD.update vegaPort submsg submodel
                |> updateWith (\x -> { selectedDisplay = IndividualDisplay x }) GotISDMsg

        ( ChangeDisplay d, _ ) ->
            -- case d of
            --     IndividualDisplay isd -> update (Go)
            --     ByTraitDisplay x ->
            ( { model | selectedDisplay = d }
            , Cmd.none
              --  Cmd.
            )

        ( _, _ ) ->
            ( model, Cmd.none )


updateWith :
    (subModel -> Model)
    -> (subMsg -> Msg)
    -> ( subModel, Cmd subMsg )
    -> ( Model, Cmd Msg )
updateWith toModel toMsg ( subModel, subCmd ) =
    ( toModel subModel
    , Cmd.map toMsg subCmd
    )


displayRadio : Model -> Html.Html Msg
displayRadio model =
    Element.layout [] <|
        Element.column []
            [ Input.radioRow
                []
                { onChange = ChangeDisplay
                , selected = Just model.selectedDisplay
                , label = Input.labelLeft [] <| Element.text "Select a display:"
                , options =
                    [ Input.option (IndividualDisplay ISD.init) <| Element.text "Individual Species"
                    , Input.option (ByTraitDisplay TraitDisplay.init) <| Element.text "Traits"
                    ]
                }
            ]


view : Model -> Styled.Html Msg
view m =
    let
        displayedViz =
            case m.selectedDisplay of
                ByTraitDisplay submodel ->
                    Styled.map GotTraitMsg (TraitDisplay.view submodel)

                IndividualDisplay submodel ->
                    Styled.map GotISDMsg (ISD.view submodel)
    in
    Styled.div
        []
        [ Styled.div
            []
            [ Styled.fromUnstyled (displayRadio m) ]
        , displayedViz
        ]



{- -}


main : Program () Model Msg
main =
    Browser.element
        { init = always ( init, Cmd.none )
        , view = view >> Styled.toUnstyled
        , update = update
        , subscriptions = \_ -> Sub.none
        }


port vegaPort : Spec -> Cmd msg
