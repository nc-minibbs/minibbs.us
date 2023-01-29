module Main exposing (main ) 

--, vegaLite)

import Browser
import Css
import Data.County exposing (County(..), CountyAggregation(..))
import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (..)
import Data.Traits exposing (Trait(..), traitsData)
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

import Displays.ByTrait as ByTrait 

exampleTrendsSpec : Spec
exampleTrendsSpec =
    mkExampleTrendsSpec
        mbbsData
        [ WoodThrush
        , NorthernBobwhite
        , EasternBluebird
        , SummerTanager
        ]


trendByTraitSpec : Trait -> Spec
trendByTraitSpec =
    mkTrendByTraitSpec
        mbbsData
        traitsData


speciesTrendSpec : CountyAggregation -> Species -> Spec
speciesTrendSpec =
    mkSpeciesTrendSpec
        mbbsData


-- specs : Trait -> CountyAggregation -> Species -> Spec
-- specs trait x species =
--     combineSpecs
--         [ ( "exampleTrends", exampleTrendsSpec )
--         , ( "trendByTrait", trendByTraitSpec trait)
--         , ( "speciesTrend", speciesTrendSpec x species )
--         ]



{-  -}


-- speciesToMenuItem : Species -> Select.MenuItem String
-- speciesToMenuItem species =
--     basicMenuItem
--         { item = speciesToString species
--         , label = speciesToString species
--         }


-- speciesMenuItems : List (Select.MenuItem String)
-- speciesMenuItems =
--     List.map
--         speciesToMenuItem
--         allSpecies

type Model =
      ByTraitDisplay ByTrait.Model 

init : Model 
init = ByTraitDisplay (ByTrait.init)


type Msg = 
    GotByTraitMsg ByTrait.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =  
    case (msg, model) of 
        (GotByTraitMsg submsg, ByTraitDisplay submodel) -> 
            ByTrait.update submsg submodel
            |> updateWith ByTraitDisplay GotByTraitMsg

updateWith : (subModel -> Model) 
    -> (subMsg -> Msg) 
    -> ( subModel, Cmd subMsg ) 
    -> ( Model, Cmd Msg )
updateWith toModel toMsg ( subModel, subCmd ) =
    ( toModel subModel
    , Cmd.map toMsg subCmd
    )

view : Model -> Styled.Html Msg
view m = 
    case m of 
    ByTrait submodel -> 
        Styled.map GotByTraitMsg (ByTrait.view submodel)

{-  -}


-- type alias Model =
--     { selectedDisplay : Maybe Display
--     , selectState : Select.State
--     , items : List (Select.MenuItem String)
--     , selectedSpecies : Maybe Species
--     , selectedItem : Maybe String
--     , countyAggregation : CountyAggregation
--     }


-- init : Model
-- init =
--     { selectedDisplay = Nothing
--     , selectState =
--         Select.initState (Select.selectIdentifier "SpeciesSelector")
--     , items = speciesMenuItems
--     , selectedSpecies = Nothing
--     , selectedItem = Nothing
--     , countyAggregation = Combined
--     }


-- type Msg
--     = SelectDisplay Display
--     | SelectSpecies (Select.Msg String)
--     | CountySwitch CountyAggregation


-- update : Msg -> Model -> ( Model, Cmd Msg )
-- update msg model =
--     case msg of
--         SelectSpecies sm ->
--             let
--                 ( maybeAction, selectState, cmds ) =
--                     Select.update sm model.selectState

--                 updateSelectedItem =
--                     case maybeAction of
--                         Just (Select.Select i) ->
--                             Just i

--                         Just (Select.InputChange s) ->
--                             Just s

--                         Just Select.Clear ->
--                             Nothing

--                         _ ->
--                             model.selectedItem

--                 updateSelectedSpecies =
--                     case maybeAction of
--                         Just (Select.Select i) ->
--                             stringToSpecies i

--                         Just Select.Clear ->
--                             Nothing

--                         _ ->
--                             model.selectedSpecies

--                 specMsg =
--                     case maybeAction of
--                         Just (Select.Select i) ->
--                             case stringToSpecies i of
--                                 Nothing ->
--                                     Cmd.none

--                                 Just s ->
--                                     vegaLite (specs model.selectedTrait model.countyAggregation s)

--                         _ ->
--                             Cmd.none
--             in
--             ( { model
--                 | selectState = selectState
--                 , selectedItem = updateSelectedItem
--                 , selectedSpecies = updateSelectedSpecies
--               }
--             , Cmd.map SelectSpecies (Cmd.batch [ specMsg, cmds ])
--             )

--         CountySwitch opt ->
--             ( { model | countyAggregation = opt }
--             , case model.selectedSpecies of
--                 Nothing ->
--                     Cmd.none

--                 Just s ->
--                     vegaLite (specs opt s)
--             )
        
--         SelectDisplay d -> 
--           ( { model | selectedDisplay = Just d }
--            , Cmd.none
--         --    case model.selectedSpecies of
--         --         Nothing ->
--         --             Cmd.none

--         --         Just s ->
--         --             vegaLite (specs model. model.countyAggregation s)
--             )
        

-- displayRadio : Model -> Html.Html Msg
-- displayRadio model =
--     Element.layout [] <|
--         Element.column []
--             [ Input.radioRow
--                 []
--                 { onChange = SelectDisplay
--                 , selected = model.selectedDisplay
--                 , label = Input.labelLeft [] <| Element.text "Select a display:"
--                 , options =
--                     [ Input.option IndividualSpecies <| Element.text "Individual Species"
--                     , Input.option ByTrait <| Element.text "By Trait"
--                     ]
--                 }
--             ]


-- countyRadio : Model -> Html.Html Msg
-- countyRadio model =
--     Element.layout [] <|
--         Element.column []
--             [ Input.radioRow
--                 []
--                 { onChange = CountySwitch
--                 , selected = Just model.countyAggregation
--                 , label = Input.labelLeft [] <| Element.text "Counties:"
--                 , options =
--                     [ Input.option Combined <| Element.text "Combined"
--                     , Input.option Split <| Element.text "Split"
--                     ]
--                 }
--             ]



-- view : Model -> Styled.Html Msg
-- view m = 
--     let 
--         start x = 
--             Styled.div 
--                 [] 
--                 [ Styled.fromUnstyled (displayRadio m )
--                 , x
--                 ]
--     in
--         case m.selectedDisplay of 
--             Just d -> start (viewDisplay d m)
--             Nothing -> start (Styled.div [] [])

-- viewDisplay : Display -> Model -> Styled.Html Msg
-- viewDisplay d = case d of 
--     IndividualSpecies -> viewIndividualSpecies
--     ByTrait -> viewByTrait

-- viewIndividualSpecies : Model -> Styled.Html Msg
-- viewIndividualSpecies m =
--     let
--         selectedItem =
--             case m.selectedItem of
--                 Just i ->
--                     Just (Select.basicMenuItem { item = i, label = i })

--                 _ ->
--                     Nothing
--     in
--     Styled.div
--         [ StyledAttribs.css
--             [ Css.marginTop (Css.px 20)
--             , Css.width (Css.pct 50)
--             , Css.marginLeft Css.auto
--             , Css.marginRight Css.auto
--             ]
--         ]
--         [ Styled.map SelectSpecies <|
--             Select.view
--                 (Select.single selectedItem
--                     |> Select.state m.selectState
--                     |> Select.menuItems m.items
--                     |> Select.placeholder "Select a species"
--                     |> Select.searchable True
--                     |> Select.clearable True
--                 )
--         , Styled.div
--             []
--             [ Styled.fromUnstyled (countyRadio m) ]
--         , Styled.div
--             [ StyledAttribs.id "speciesTrend" ]
--             []
--         ]



main : Program () Model Msg
main =
    Browser.element
        { init = always ( init, Cmd.none )
        , view = view >> Styled.toUnstyled
        , update = update
        , subscriptions = \_ -> Sub.none
        }


-- port vegaLite : Spec -> Cmd msg
