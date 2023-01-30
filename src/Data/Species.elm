module Data.Species exposing (..)


type Species
    = AcadianFlycatcher
    | AmericanCrow
    | AmericanGoldfinch
    | AmericanRedstart
    | AmericanRobin
    | BaldEagle
    | BaltimoreOriole
    | BarnSwallow
    | BarredOwl
    | BeltedKingfisher
    | BlackVulture
    | BlackandwhiteWarbler
    | BlueGrosbeak
    | BlueJay
    | BluegrayGnatcatcher
    | BlueheadedVireo
    | BroadwingedHawk
    | BrownThrasher
    | BrownheadedCowbird
    | BrownheadedNuthatch
    | CanadaGoose
    | CarolinaChickadee
    | CarolinaWren
    | CedarWaxwing
    | ChimneySwift
    | Chuckwillswidow
    | CliffSwallow
    | CommonGrackle
    | CommonYellowthroat
    | CoopersHawk
    | Dickcissel
    | DoublecrestedCormorant
    | DownyWoodpecker
    | EasternBluebird
    | EasternKingbird
    | EasternMeadowlark
    | EasternPhoebe
    | EasternScreechOwl
    | EasternTowhee
    | EasternWhippoorwill
    | EasternWoodPewee
    | EuropeanStarling
    | FieldSparrow
    | FishCrow
    | GrasshopperSparrow
    | GrayCatbird
    | GreatBlueHeron
    | GreatCrestedFlycatcher
    | GreatEgret
    | GreatHornedOwl
    | GreenHeron
    | HairyWoodpecker
    | HoodedWarbler
    | HornedLark
    | HouseFinch
    | HouseSparrow
    | HouseWren
    | IndigoBunting
    | KentuckyWarbler
    | Killdeer
    | LoggerheadShrike
    | LouisianaWaterthrush
    | Mallard
    | MourningDove
    | NorthernBobwhite
    | NorthernCardinal
    | NorthernFlicker
    | NorthernMockingbird
    | NorthernParula
    | NorthernRoughwingedSwallow
    | OrchardOriole
    | Osprey
    | Ovenbird
    | PileatedWoodpecker
    | PrairieWarbler
    | ProthonotaryWarbler
    | PurpleMartin
    | RedbelliedWoodpecker
    | RedeyedVireo
    | RedheadedWoodpecker
    | RedshoulderedHawk
    | RedtailedHawk
    | RedwingedBlackbird
    | RockPigeon
    | RubythroatedHummingbird
    | ScarletTanager
    | SharpshinnedHawk
    | SongSparrow
    | SummerTanager
    | TreeSwallow
    | TuftedTitmouse
    | TurkeyVulture
    | WarblingVireo
    | WhitebreastedNuthatch
    | WhiteeyedVireo
    | WildTurkey
    | WoodDuck
    | WoodThrush
    | YellowWarbler
    | YellowbilledCuckoo
    | YellowbreastedChat
    | YellowthroatedVireo
    | YellowthroatedWarbler 


allSpecies : List Species
allSpecies =
    [ AcadianFlycatcher
    , AmericanCrow
    , AmericanGoldfinch
    , AmericanRedstart
    , AmericanRobin
    , BaldEagle
    , BaltimoreOriole
    , BarnSwallow
    , BarredOwl
    , BeltedKingfisher
    , BlackVulture
    , BlackandwhiteWarbler
    , BlueGrosbeak
    , BlueJay
    , BluegrayGnatcatcher
    , BlueheadedVireo
    , BroadwingedHawk
    , BrownThrasher
    , BrownheadedCowbird
    , BrownheadedNuthatch
    , CanadaGoose
    , CarolinaChickadee
    , CarolinaWren
    , CedarWaxwing
    , ChimneySwift
    , Chuckwillswidow
    , CliffSwallow
    , CommonGrackle
    , CommonYellowthroat
    , CoopersHawk
    , Dickcissel
    , DoublecrestedCormorant
    , DownyWoodpecker
    , EasternBluebird
    , EasternKingbird
    , EasternMeadowlark
    , EasternPhoebe
    , EasternScreechOwl
    , EasternTowhee
    , EasternWhippoorwill
    , EasternWoodPewee
    , EuropeanStarling
    , FieldSparrow
    , FishCrow
    , GrasshopperSparrow
    , GrayCatbird
    , GreatBlueHeron
    , GreatCrestedFlycatcher
    , GreatEgret
    , GreatHornedOwl
    , GreenHeron
    , HairyWoodpecker
    , HoodedWarbler
    , HornedLark
    , HouseFinch
    , HouseSparrow
    , HouseWren
    , IndigoBunting
    , KentuckyWarbler
    , Killdeer
    , LoggerheadShrike
    , LouisianaWaterthrush
    , Mallard
    , MourningDove
    , NorthernBobwhite
    , NorthernCardinal
    , NorthernFlicker
    , NorthernMockingbird
    , NorthernParula
    , NorthernRoughwingedSwallow
    , OrchardOriole
    , Osprey
    , Ovenbird
    , PileatedWoodpecker
    , PrairieWarbler
    , ProthonotaryWarbler
    , PurpleMartin
    , RedbelliedWoodpecker
    , RedeyedVireo
    , RedheadedWoodpecker
    , RedshoulderedHawk
    , RedtailedHawk
    , RedwingedBlackbird
    , RockPigeon
    , RubythroatedHummingbird
    , ScarletTanager
    , SharpshinnedHawk
    , SongSparrow
    , SummerTanager
    , TreeSwallow
    , TuftedTitmouse
    , TurkeyVulture
    , WarblingVireo
    , WhitebreastedNuthatch
    , WhiteeyedVireo
    , WildTurkey
    , WoodDuck
    , WoodThrush
    , YellowWarbler
    , YellowbilledCuckoo
    , YellowbreastedChat
    , YellowthroatedVireo
    , YellowthroatedWarbler ] 


speciesToString : Species -> String
speciesToString species =
    case species of
        AcadianFlycatcher -> "Acadian Flycatcher"
        AmericanCrow -> "American Crow"
        AmericanGoldfinch -> "American Goldfinch"
        AmericanRedstart -> "American Redstart"
        AmericanRobin -> "American Robin"
        BaldEagle -> "Bald Eagle"
        BaltimoreOriole -> "Baltimore Oriole"
        BarnSwallow -> "Barn Swallow"
        BarredOwl -> "Barred Owl"
        BeltedKingfisher -> "Belted Kingfisher"
        BlackVulture -> "Black Vulture"
        BlackandwhiteWarbler -> "Black-and-white Warbler"
        BlueGrosbeak -> "Blue Grosbeak"
        BlueJay -> "Blue Jay"
        BluegrayGnatcatcher -> "Blue-gray Gnatcatcher"
        BlueheadedVireo -> "Blue-headed Vireo"
        BroadwingedHawk -> "Broad-winged Hawk"
        BrownThrasher -> "Brown Thrasher"
        BrownheadedCowbird -> "Brown-headed Cowbird"
        BrownheadedNuthatch -> "Brown-headed Nuthatch"
        CanadaGoose -> "Canada Goose"
        CarolinaChickadee -> "Carolina Chickadee"
        CarolinaWren -> "Carolina Wren"
        CedarWaxwing -> "Cedar Waxwing"
        ChimneySwift -> "Chimney Swift"
        Chuckwillswidow -> "Chuck-will's-widow"
        CliffSwallow -> "Cliff Swallow"
        CommonGrackle -> "Common Grackle"
        CommonYellowthroat -> "Common Yellowthroat"
        CoopersHawk -> "Cooper's Hawk"
        Dickcissel -> "Dickcissel"
        DoublecrestedCormorant -> "Double-crested Cormorant"
        DownyWoodpecker -> "Downy Woodpecker"
        EasternBluebird -> "Eastern Bluebird"
        EasternKingbird -> "Eastern Kingbird"
        EasternMeadowlark -> "Eastern Meadowlark"
        EasternPhoebe -> "Eastern Phoebe"
        EasternScreechOwl -> "Eastern Screech-Owl"
        EasternTowhee -> "Eastern Towhee"
        EasternWhippoorwill -> "Eastern Whip-poor-will"
        EasternWoodPewee -> "Eastern Wood-Pewee"
        EuropeanStarling -> "European Starling"
        FieldSparrow -> "Field Sparrow"
        FishCrow -> "Fish Crow"
        GrasshopperSparrow -> "Grasshopper Sparrow"
        GrayCatbird -> "Gray Catbird"
        GreatBlueHeron -> "Great Blue Heron"
        GreatCrestedFlycatcher -> "Great Crested Flycatcher"
        GreatEgret -> "Great Egret"
        GreatHornedOwl -> "Great Horned Owl"
        GreenHeron -> "Green Heron"
        HairyWoodpecker -> "Hairy Woodpecker"
        HoodedWarbler -> "Hooded Warbler"
        HornedLark -> "Horned Lark"
        HouseFinch -> "House Finch"
        HouseSparrow -> "House Sparrow"
        HouseWren -> "House Wren"
        IndigoBunting -> "Indigo Bunting"
        KentuckyWarbler -> "Kentucky Warbler"
        Killdeer -> "Killdeer"
        LoggerheadShrike -> "Loggerhead Shrike"
        LouisianaWaterthrush -> "Louisiana Waterthrush"
        Mallard -> "Mallard"
        MourningDove -> "Mourning Dove"
        NorthernBobwhite -> "Northern Bobwhite"
        NorthernCardinal -> "Northern Cardinal"
        NorthernFlicker -> "Northern Flicker"
        NorthernMockingbird -> "Northern Mockingbird"
        NorthernParula -> "Northern Parula"
        NorthernRoughwingedSwallow -> "Northern Rough-winged Swallow"
        OrchardOriole -> "Orchard Oriole"
        Osprey -> "Osprey"
        Ovenbird -> "Ovenbird"
        PileatedWoodpecker -> "Pileated Woodpecker"
        PrairieWarbler -> "Prairie Warbler"
        ProthonotaryWarbler -> "Prothonotary Warbler"
        PurpleMartin -> "Purple Martin"
        RedbelliedWoodpecker -> "Red-bellied Woodpecker"
        RedeyedVireo -> "Red-eyed Vireo"
        RedheadedWoodpecker -> "Red-headed Woodpecker"
        RedshoulderedHawk -> "Red-shouldered Hawk"
        RedtailedHawk -> "Red-tailed Hawk"
        RedwingedBlackbird -> "Red-winged Blackbird"
        RockPigeon -> "Rock Pigeon"
        RubythroatedHummingbird -> "Ruby-throated Hummingbird"
        ScarletTanager -> "Scarlet Tanager"
        SharpshinnedHawk -> "Sharp-shinned Hawk"
        SongSparrow -> "Song Sparrow"
        SummerTanager -> "Summer Tanager"
        TreeSwallow -> "Tree Swallow"
        TuftedTitmouse -> "Tufted Titmouse"
        TurkeyVulture -> "Turkey Vulture"
        WarblingVireo -> "Warbling Vireo"
        WhitebreastedNuthatch -> "White-breasted Nuthatch"
        WhiteeyedVireo -> "White-eyed Vireo"
        WildTurkey -> "Wild Turkey"
        WoodDuck -> "Wood Duck"
        WoodThrush -> "Wood Thrush"
        YellowWarbler -> "Yellow Warbler"
        YellowbilledCuckoo -> "Yellow-billed Cuckoo"
        YellowbreastedChat -> "Yellow-breasted Chat"
        YellowthroatedVireo -> "Yellow-throated Vireo"
        YellowthroatedWarbler -> "Yellow-throated Warbler" 


stringToSpecies : String -> Maybe Species
stringToSpecies s =
    List.map (\x -> ( x, speciesToString x )) allSpecies
        |> List.filterMap
            (\( x, y ) ->
                if y == s then
                    Just x

                else
                    Nothing
            )
        |> List.head
