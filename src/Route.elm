module Route exposing (..)

import Data.Species exposing (Species, speciesSlug, slugToSpecies)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, top)

type Route
    = SpeciesTable
    | SpeciesDetail Species
    | NotFound

{-| Parse a URL into a Route
-}
fromUrl : Url -> Route
fromUrl url =
    Parser.parse parser url
        |> Maybe.withDefault NotFound

parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map SpeciesTable (s "species")
        , Parser.map SpeciesDetail (s "species" </> speciesParser)
        ]

{-| Custom parser that only accepts valid species slugs
-}
speciesParser : Parser (Species -> a) a
speciesParser =
    Parser.custom "SPECIES" <|
        \segment ->
            slugToSpecies segment



{-| Convert a Route to an href string for use in links
-}
toHref : Route -> String
toHref route =
    case route of
        SpeciesTable ->
            "/species"

        SpeciesDetail species ->
            "/species/" ++ speciesSlug species

        NotFound ->
            "/not-found"