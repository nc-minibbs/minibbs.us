module Route exposing (..)

import Data.Species exposing (Species, speciesSlug, slugToSpecies)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, top)

type Route
    = Home
    | SpeciesTable
    | SpeciesDetail Species
    | SpeciesTraits
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
        [ Parser.map Home top
        , Parser.map SpeciesTable (s "species")
        , Parser.map SpeciesDetail (s "species" </> speciesParser)
        , Parser.map SpeciesTraits (s "traits")
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
        Home -> 
            "/"
        
        SpeciesTable ->
            "/species"

        SpeciesDetail species ->
            "/species/" ++ speciesSlug species

        SpeciesTraits ->
            "/traits"

        NotFound ->
            "/not-found"