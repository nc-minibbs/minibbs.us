module Page.Home exposing (Model, Msg, init, toSpec, update, view)

import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (Species(..))
import Html exposing (..)
import Html.Attributes exposing (class, id, style)
import Markdown.Parser as Markdown
import Markdown.Renderer
import Specs.ExampleTrends exposing (mkExampleTrendsSpec)
import VegaLite exposing (Spec)


{-| Home page content in markdown
-}
homeContentTop : String
homeContentTop =
    """
# Mini Breeding Bird Survey

A *Mini Breeding Bird Survey* (MBBS) is a small-scale version of the full
[Breeding Bird Survey](https://www.pwrc.usgs.gov/bbs/)
organized each year by the U.S. Fish and Wildlife Service
throughout North America.
An MBBS focuses on one county.
Volunteers count birds seen or heard
along randomly chosen routes on secondary roads.
The objective is to determine the distribution of breeding birds in the county
and to assess any year-to-year changes in their numbers.

## Importance

The following visualization shows trends
for 4 of the 100+ species observed in over twenty years of our survey.
As you can see,

* species such as [Wood Thrush](species/wood-thrush) and [Northern Bobwhite](species/northern-bobwhite) have declined;
* species such as [Eastern Bluebird](species/eastern-bluebird) have no obvious trend;
* species such as [Summer Tanager](species/summer-tanager) appear to be increasing in abundance.
"""


homeContentBottom : String
homeContentBottom =
    """
[View more detailed results and analysis here](/species).

## Qualifications

You need not be an expert birder to participate in the MBBS!
We just ask that you can:

* identify [common breeding birds](/species)
by song or calls as well as by sight
* get up early one morning in May/June
to drive (or have someone drive you) a survey route
* participate (or plan to) for multiple years
* submit observations by [eBird](https://ebird.org)

If you have questions,
please contact
[Allen Hurlbert](mailto:hurlbert@bio.unc.edu)
or
[Bradley Saul](mailto:bradleysaul@fastmail.com).
"""


type alias Model =
    {}


type Msg
    = NoOp


init : ( Model, Cmd Msg )
init =
    ( {}, Cmd.none )


toSpec : Model -> Spec
toSpec _ =
    mkExampleTrendsSpec
        mbbsData
        [ WoodThrush
        , NorthernBobwhite
        , EasternBluebird
        , SummerTanager
        ]


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update _ msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )


{-| Render markdown to HTML
-}
renderMarkdown : String -> Html Msg
renderMarkdown markdown =
    case
        markdown
            |> Markdown.parse
            |> Result.mapError (\deadEnds -> deadEnds |> List.map Markdown.deadEndToString |> String.join "\n")
            |> Result.andThen (\ast -> Markdown.Renderer.render Markdown.Renderer.defaultHtmlRenderer ast)
    of
        Ok rendered ->
            div [] rendered

        Err _ ->
            -- Fallback if markdown parsing fails
            text markdown


view : Model -> Html Msg
view _ =
    div [ class "home" ]
        [ renderMarkdown homeContentTop
        , div [ id "exampleTrends", style "margin" "auto" ] []
        , renderMarkdown homeContentBottom
        ]
