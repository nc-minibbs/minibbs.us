module Page.SpeciesTable exposing (Model, Msg, init, toSpecs, update, view)

import Data.Species exposing (SpeciesRec, allSpeciesRec)
import Html exposing (Html, a, div, input, text,th)
import Html.Attributes as Attr exposing (href, id, placeholder, style)
import Html.Events exposing (onInput)
import Round
import Route
import Specs.SparklineSpec exposing (mkSparklineSpec)
import Table
import VegaLite exposing (Spec, combineSpecs)


{-| Model for the species table page
-}
type alias Model =
    { tableState : Table.State
    , searchQuery : String
    }


{-| Messages for updating the page
-}
type Msg
    = SetQuery String
    | SetTableState Table.State


{-| Initialize the page
-}
init : ( Model, Cmd Msg )
init =
    ( { tableState = Table.initialSort "Name"
      , searchQuery = ""
      }
    , Cmd.none
    )


{-| Get filtered species based on search query
-}
filteredSpecies : Model -> List SpeciesRec
filteredSpecies model =
    let
        lowerQuery =
            String.toLower model.searchQuery
    in
    if String.isEmpty lowerQuery then
        allSpeciesRec

    else
        List.filter
            (\rec -> String.contains lowerQuery (String.toLower rec.commonName))
            allSpeciesRec


{-| Generate sparkline specs for filtered species
Main will call this to send to vegaPort
-}
toSpecs : Model -> Spec
toSpecs model =
    combineSpecs <|
        List.map
            (\rec -> ( sparklineVegaID rec, mkSparklineSpec rec ))
            (filteredSpecies model)


{-| Generate sparkline div ID for a species
-}
sparklineVegaID : SpeciesRec -> String
sparklineVegaID rec =
    rec.id ++ "-sparkline"


{-| Update the page state
-}
update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update sendToVega msg model =
    case msg of
        SetQuery newQuery ->
            let
                newModel =
                    { model | searchQuery = newQuery }
            in
            ( newModel
            , sendToVega (toSpecs newModel)
              -- Regenerate sparklines for new filter
            )

        SetTableState newState ->
            ( { model | tableState = newState }
            , Cmd.none
              -- Just reorder, don't regenerate sparklines
            )


{-| Render the page
-}
view : Model -> Html Msg
view model =
    div []
        [ input
            [ placeholder "Search by Name"
            , Attr.value model.searchQuery
            , onInput SetQuery
            ]
            []
        , Table.view tableConfig model.tableState (filteredSpecies model)
        ]


{-| Table configuration
-}
tableConfig : Table.Config SpeciesRec Msg
tableConfig =
    Table.customConfig
        { toId = .id
        , toMsg = SetTableState
        , columns =
            [ speciesLinkColumn
            , sparklineColumn
            , rateColumn
            ]
        , customizations = 
            { tableAttrs = []
            , caption = Nothing
            , thead = customThead
            , tfoot = Nothing
            , tbodyAttrs = []
            , rowAttrs = \_ -> []
            }
        }


customThead : List (String, Table.Status, Html.Attribute Msg) -> Table.HtmlDetails Msg
customThead headers =
    Table.HtmlDetails [] (List.map customTh headers)


customTh : (String, Table.Status, Html.Attribute Msg) -> Html Msg
customTh (name, status, onClickAttr) =
    let
        styleAttr =
            if name == "Trend" then
                [ Attr.style "text-align" "center" ]
            else
                []
        
        content =
            case status of
                Table.Unsortable ->
                    [ text name ]
                
                Table.Sortable selected ->
                    [ text name
                    , if selected then
                        text " ▼"
                      else
                        text ""
                    ]
                
                Table.Reversible Nothing ->
                    [ text name
                    , text " ▼"
                    ]
                
                Table.Reversible (Just isReversed) ->
                    [ text name
                    , text (if isReversed then " ▲" else " ▼")
                    ]
    in
    th (onClickAttr :: styleAttr) content


{-| Column showing species name as a link to detail page
-}
speciesLinkColumn : Table.Column SpeciesRec Msg
speciesLinkColumn =
    Table.veryCustomColumn
        { name = "Name"
        , viewData =
            \rec ->
                Table.HtmlDetails []
                    [ a [ href (Route.toHref (Route.SpeciesDetail rec.species)) ]
                        [ text rec.commonName ]
                    ]
        , sorter = Table.increasingOrDecreasingBy .commonName
        }


{-| Column showing rate of change with color coding
-}
rateColumn : Table.Column SpeciesRec Msg
rateColumn =
    Table.veryCustomColumn
        { name = "% Change per Year"
        , viewData = \rec -> viewRate rec.rate rec.pvalue
        , sorter = Table.decreasingOrIncreasingBy .rate
        }


{-| Render rate with color coding based on significance
-}
viewRate : Float -> Float -> Table.HtmlDetails msg
viewRate rate pvalue =
    let
        color =
            if rate <= 0 && pvalue < 0.01 then
                "red"

            else if rate <= 0 && pvalue >= 0.01 && pvalue <= 0.05 then
                "lightcoral"

            else if rate > 0 && pvalue < 0.01 then
                "blue"

            else if rate > 0 && pvalue >= 0.01 && pvalue <= 0.05 then
                "lightblue"

            else
                "gray"
    in
    Table.HtmlDetails
        [ style "color" color
        , style "text-align" "right"
        ]
        [ text (Round.round 2 (rate * 100)) ]


{-| Column showing sparkline trend visualization
-}
sparklineColumn : Table.Column SpeciesRec Msg
sparklineColumn =
    Table.veryCustomColumn
        { name = "Trend"
        , viewData =
            \rec ->
                Table.HtmlDetails []
                    [ div [ id (sparklineVegaID rec) ] [] ]
        , sorter = Table.unsortable
        }
