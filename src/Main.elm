port module Main exposing (main, vegaPort)


import Browser
import Css
import Data.County exposing (County(..), CountyAggregation(..))
-- import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (..)
-- import Data.Traits exposing (Trait(..), traitsData)
import Displays.IndividualSpeciesDisplay as ISD
import Displays.TraitLineDisplay as TraitDisplay
import Element
import Element.Input as Input
import Html
import Html.Styled as Styled
-- import Html.Styled.Attributes as StyledAttribs
import Select exposing (..)
import VegaLite exposing (..)
import Css exposing (src_)
import Json.Encode exposing (..)


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


type Model
    = DisplayTrait TraitDisplay.Model
    | DisplayIndividualSpecies ISD.Model

type Display =
     DT
    | DI

type Msg
    = ChangeDisplay Display
    | GotTraitMsg TraitDisplay.Msg
    | GotISDMsg ISD.Msg

changeDisplayTo : Display -> Model -> (Model, Cmd Msg)
changeDisplayTo d m = 
    case d of 
        DT -> (DisplayTrait (TraitDisplay.init), vegaPort TraitDisplay.initSpec)
        -- TraitDisplay.update vegaPort submsg submodel
            -- |> updateWith DisplayTrait GotTraitMsg
        DI -> (DisplayIndividualSpecies (ISD.init), vegaPort (object []))
        -- ISD.update vegaPort (ISD.SelectCountyAggregation Combined) ISD.init
        --         |> updateWith DisplayIndividualSpecies GotISDMsg

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =

    case ( msg, model ) of
        ( GotTraitMsg submsg, DisplayTrait submodel ) ->
            TraitDisplay.update vegaPort submsg submodel
                |> updateWith DisplayTrait GotTraitMsg

        ( GotISDMsg submsg, DisplayIndividualSpecies submodel ) ->
            ISD.update vegaPort submsg submodel
                |> updateWith DisplayIndividualSpecies GotISDMsg

        ( ChangeDisplay d, x ) -> changeDisplayTo d x
            -- case d of 
            --     DisplayIndividualSpecies _ -> update (GotISDMsg ISD.Noop) x
            --     DisplayTrait _  -> update (GotISDMsg ISD.Noop) x
            -- -- )

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
                , selected = Nothing
                , label = Input.labelLeft [] <| Element.text "Select a display:"
                , options = 
                    [Input.option DI <| Element.text "Individual Species"
                    , Input.option DT <| Element.text "Traits"
                    ]
                    -- [ Input.option (DisplayIndividualSpecies ISD.init) <| Element.text "Individual Species"
                    -- , Input.option (DisplayTrait TraitDisplay.init) <| Element.text "Traits"
                    -- ]
                }
                -- { onChange = ChangeDisplay
                -- , selected = Just model --.selectedDisplay
                -- , label = Input.labelLeft [] <| Element.text "Select a display:"
                -- , options =
                --     [ Input.option (DisplayIndividualSpecies ISD.init) <| Element.text "Individual Species"
                --     , Input.option (DisplayTrait TraitDisplay.init) <| Element.text "Traits"
                --     ]
                -- }
            ]


view : Model -> Styled.Html Msg
view m =
    let 
        viewHtml x =
            Styled.div
            []
            [ Styled.div
                []
                [ Styled.fromUnstyled (displayRadio m) ]
            
            , x
            ]
    
    in
    case m of
        DisplayTrait submodel ->
            viewHtml (Styled.map GotTraitMsg (TraitDisplay.view submodel))

        DisplayIndividualSpecies submodel ->
            viewHtml (Styled.map GotISDMsg (ISD.view submodel))


{- -}


init : Model
-- init = { selectedDisplay = IndividualDisplay (ISD.init) }
init =
    DisplayTrait TraitDisplay.init
    -- { selectedDisplay = DisplayTrait TraitDisplay.init }

main : Program () Model Msg
main =
    Browser.element
        { -- init = always (update (ChangeDisplay (ByTraitDisplay TraitDisplay.init)) init) -- Cmd.none )
          init = always (init, vegaPort TraitDisplay.initSpec)
        , view = view >> Styled.toUnstyled
        , update = update
        , subscriptions = \_ -> Sub.none
        }


port vegaPort : Spec -> Cmd msg
