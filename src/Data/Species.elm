{- 
Elm code generated by prepare_results.R
This file should not be modified except by code formatters.
-}
module Data.Species exposing (..) 


-- A record containing information and data about an individual species
type alias SpeciesRec =
    { species : Species
    , id : String
    , commonName : String
    , sciName : String
    , rate : Float
    , pvalue : Float
    } 


-- Enumeration of all species observed in MBBS.
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


-- All Species in a single list
allSpecies : List Species
allSpecies 
   = [ AcadianFlycatcher
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


-- All Species records in a single list
allSpeciesRec : List SpeciesRec
allSpeciesRec 
   = [   { species = AcadianFlycatcher
    , id = "AcadianFlycatcher" 
    , commonName = "Acadian Flycatcher"
    , sciName = "Empidonax virescens"
    , rate = 0.059874251675
    , pvalue =  0.000000013175
    }
  ,   { species = AmericanCrow
    , id = "AmericanCrow" 
    , commonName = "American Crow"
    , sciName = "Corvus brachyrhynchos"
    , rate = -0.004130116522
    , pvalue =  0.363350420572
    }
  ,   { species = AmericanGoldfinch
    , id = "AmericanGoldfinch" 
    , commonName = "American Goldfinch"
    , sciName = "Spinus tristis"
    , rate = -0.026896762873
    , pvalue =  0.000019453329
    }
  ,   { species = AmericanRedstart
    , id = "AmericanRedstart" 
    , commonName = "American Redstart"
    , sciName = "Setophaga ruticilla"
    , rate = -0.048924876181
    , pvalue =  0.213917738871
    }
  ,   { species = AmericanRobin
    , id = "AmericanRobin" 
    , commonName = "American Robin"
    , sciName = "Turdus migratorius"
    , rate = 7.131958185995
    , pvalue =  0.000000000000
    }
  ,   { species = BaldEagle
    , id = "BaldEagle" 
    , commonName = "Bald Eagle"
    , sciName = "Haliaeetus leucocephalus"
    , rate = 0.080459233615
    , pvalue =  0.251979761271
    }
  ,   { species = BaltimoreOriole
    , id = "BaltimoreOriole" 
    , commonName = "Baltimore Oriole"
    , sciName = "Icterus galbula"
    , rate = 0.028410781500
    , pvalue =  0.809173391538
    }
  ,   { species = BarnSwallow
    , id = "BarnSwallow" 
    , commonName = "Barn Swallow"
    , sciName = "Hirundo rustica"
    , rate = -0.011745414434
    , pvalue =  0.602387745369
    }
  ,   { species = BarredOwl
    , id = "BarredOwl" 
    , commonName = "Barred Owl"
    , sciName = "Strix varia"
    , rate = 0.026127616025
    , pvalue =  0.077963270667
    }
  ,   { species = BeltedKingfisher
    , id = "BeltedKingfisher" 
    , commonName = "Belted Kingfisher"
    , sciName = "Megaceryle alcyon"
    , rate = -0.047374570578
    , pvalue =  0.144966679717
    }
  ,   { species = BlackVulture
    , id = "BlackVulture" 
    , commonName = "Black Vulture"
    , sciName = "Coragyps atratus"
    , rate = 0.076180737197
    , pvalue =  0.001039637221
    }
  ,   { species = BlackandwhiteWarbler
    , id = "BlackandwhiteWarbler" 
    , commonName = "Black-and-white Warbler"
    , sciName = "Mniotilta varia"
    , rate = 0.037826946174
    , pvalue =  0.076724923417
    }
  ,   { species = BlueGrosbeak
    , id = "BlueGrosbeak" 
    , commonName = "Blue Grosbeak"
    , sciName = "Passerina caerulea"
    , rate = 0.003652344129
    , pvalue =  0.848976330473
    }
  ,   { species = BlueJay
    , id = "BlueJay" 
    , commonName = "Blue Jay"
    , sciName = "Cyanocitta cristata"
    , rate = -0.012058842896
    , pvalue =  0.104656347407
    }
  ,   { species = BluegrayGnatcatcher
    , id = "BluegrayGnatcatcher" 
    , commonName = "Blue-gray Gnatcatcher"
    , sciName = "Polioptila caerulea"
    , rate = -0.002704390100
    , pvalue =  0.671070018986
    }
  ,   { species = BlueheadedVireo
    , id = "BlueheadedVireo" 
    , commonName = "Blue-headed Vireo"
    , sciName = "Vireo solitarius"
    , rate = -0.031892523779
    , pvalue =  0.011096641240
    }
  ,   { species = BroadwingedHawk
    , id = "BroadwingedHawk" 
    , commonName = "Broad-winged Hawk"
    , sciName = "Buteo platypterus"
    , rate = -0.092217218353
    , pvalue =  0.000000152588
    }
  ,   { species = BrownThrasher
    , id = "BrownThrasher" 
    , commonName = "Brown Thrasher"
    , sciName = "Toxostoma rufum"
    , rate = 0.004965193291
    , pvalue =  0.483606260420
    }
  ,   { species = BrownheadedCowbird
    , id = "BrownheadedCowbird" 
    , commonName = "Brown-headed Cowbird"
    , sciName = "Molothrus ater"
    , rate = 0.014629900540
    , pvalue =  0.050758198966
    }
  ,   { species = BrownheadedNuthatch
    , id = "BrownheadedNuthatch" 
    , commonName = "Brown-headed Nuthatch"
    , sciName = "Sitta pusilla"
    , rate = 0.020642369533
    , pvalue =  0.236516519563
    }
  ,   { species = CanadaGoose
    , id = "CanadaGoose" 
    , commonName = "Canada Goose"
    , sciName = "Branta canadensis"
    , rate = -0.031497306305
    , pvalue =  0.110889830087
    }
  ,   { species = CarolinaChickadee
    , id = "CarolinaChickadee" 
    , commonName = "Carolina Chickadee"
    , sciName = "Poecile carolinensis"
    , rate = -0.003397901917
    , pvalue =  0.624701247786
    }
  ,   { species = CarolinaWren
    , id = "CarolinaWren" 
    , commonName = "Carolina Wren"
    , sciName = "Thryothorus ludovicianus"
    , rate = 0.004936604507
    , pvalue =  0.428344127800
    }
  ,   { species = CedarWaxwing
    , id = "CedarWaxwing" 
    , commonName = "Cedar Waxwing"
    , sciName = "Bombycilla cedrorum"
    , rate = -0.022633824025
    , pvalue =  0.256626389196
    }
  ,   { species = ChimneySwift
    , id = "ChimneySwift" 
    , commonName = "Chimney Swift"
    , sciName = "Chaetura pelagica"
    , rate = -0.053956042793
    , pvalue =  0.000042298962
    }
  ,   { species = Chuckwillswidow
    , id = "Chuckwillswidow" 
    , commonName = "Chuck-will's-widow"
    , sciName = "Antrostomus carolinensis"
    , rate = 0.014028519966
    , pvalue =  0.560305134261
    }
  ,   { species = CliffSwallow
    , id = "CliffSwallow" 
    , commonName = "Cliff Swallow"
    , sciName = "Petrochelidon pyrrhonota"
    , rate = 0.119821475439
    , pvalue =  0.000000000000
    }
  ,   { species = CommonGrackle
    , id = "CommonGrackle" 
    , commonName = "Common Grackle"
    , sciName = "Quiscalus quiscula"
    , rate = -0.059939361996
    , pvalue =  0.000000012932
    }
  ,   { species = CommonYellowthroat
    , id = "CommonYellowthroat" 
    , commonName = "Common Yellowthroat"
    , sciName = "Geothlypis trichas"
    , rate = -0.022606120942
    , pvalue =  0.031722926573
    }
  ,   { species = CoopersHawk
    , id = "CoopersHawk" 
    , commonName = "Cooper's Hawk"
    , sciName = "Accipiter cooperii"
    , rate = -0.003322267490
    , pvalue =  0.889458339501
    }
  ,   { species = Dickcissel
    , id = "Dickcissel" 
    , commonName = "Dickcissel"
    , sciName = "Spiza americana"
    , rate = 0.127053506018
    , pvalue =  0.375901560734
    }
  ,   { species = DoublecrestedCormorant
    , id = "DoublecrestedCormorant" 
    , commonName = "Double-crested Cormorant"
    , sciName = "Nannopterum auritum"
    , rate = 0.057232617269
    , pvalue =  0.058260799796
    }
  ,   { species = DownyWoodpecker
    , id = "DownyWoodpecker" 
    , commonName = "Downy Woodpecker"
    , sciName = "Dryobates pubescens"
    , rate = -0.004441195951
    , pvalue =  0.597178995912
    }
  ,   { species = EasternBluebird
    , id = "EasternBluebird" 
    , commonName = "Eastern Bluebird"
    , sciName = "Sialia sialis"
    , rate = -0.000020171909
    , pvalue =  0.997300045228
    }
  ,   { species = EasternKingbird
    , id = "EasternKingbird" 
    , commonName = "Eastern Kingbird"
    , sciName = "Tyrannus tyrannus"
    , rate = -0.032978031174
    , pvalue =  0.016376253088
    }
  ,   { species = EasternMeadowlark
    , id = "EasternMeadowlark" 
    , commonName = "Eastern Meadowlark"
    , sciName = "Sturnella magna"
    , rate = -0.051342961407
    , pvalue =  0.022128854104
    }
  ,   { species = EasternPhoebe
    , id = "EasternPhoebe" 
    , commonName = "Eastern Phoebe"
    , sciName = "Sayornis phoebe"
    , rate = 0.004362892998
    , pvalue =  0.545087418219
    }
  ,   { species = EasternScreechOwl
    , id = "EasternScreechOwl" 
    , commonName = "Eastern Screech-Owl"
    , sciName = "Megascops asio"
    , rate = 0.017046723031
    , pvalue =  0.764716080755
    }
  ,   { species = EasternTowhee
    , id = "EasternTowhee" 
    , commonName = "Eastern Towhee"
    , sciName = "Pipilo erythrophthalmus"
    , rate = -0.019534451438
    , pvalue =  0.001005035062
    }
  ,   { species = EasternWhippoorwill
    , id = "EasternWhippoorwill" 
    , commonName = "Eastern Whip-poor-will"
    , sciName = "Antrostomus vociferus"
    , rate = -0.068711852734
    , pvalue =  0.016266273926
    }
  ,   { species = EasternWoodPewee
    , id = "EasternWoodPewee" 
    , commonName = "Eastern Wood-Pewee"
    , sciName = "Contopus virens"
    , rate = -0.009757716829
    , pvalue =  0.640961299172
    }
  ,   { species = EuropeanStarling
    , id = "EuropeanStarling" 
    , commonName = "European Starling"
    , sciName = "Sturnus vulgaris"
    , rate = -0.027350009354
    , pvalue =  0.046625355747
    }
  ,   { species = FieldSparrow
    , id = "FieldSparrow" 
    , commonName = "Field Sparrow"
    , sciName = "Spizella pusilla"
    , rate = -0.024784025435
    , pvalue =  0.184697033556
    }
  ,   { species = FishCrow
    , id = "FishCrow" 
    , commonName = "Fish Crow"
    , sciName = "Corvus ossifragus"
    , rate = 0.071789382784
    , pvalue =  0.000000000001
    }
  ,   { species = GrasshopperSparrow
    , id = "GrasshopperSparrow" 
    , commonName = "Grasshopper Sparrow"
    , sciName = "Ammodramus savannarum"
    , rate = 0.022286319034
    , pvalue =  0.547805426031
    }
  ,   { species = GrayCatbird
    , id = "GrayCatbird" 
    , commonName = "Gray Catbird"
    , sciName = "Dumetella carolinensis"
    , rate = -0.000951757503
    , pvalue =  0.961620370506
    }
  ,   { species = GreatBlueHeron
    , id = "GreatBlueHeron" 
    , commonName = "Great Blue Heron"
    , sciName = "Ardea herodias"
    , rate = 0.004397004159
    , pvalue =  0.794425734377
    }
  ,   { species = GreatCrestedFlycatcher
    , id = "GreatCrestedFlycatcher" 
    , commonName = "Great Crested Flycatcher"
    , sciName = "Myiarchus crinitus"
    , rate = 0.034438753250
    , pvalue =  0.003252657588
    }
  ,   { species = GreatEgret
    , id = "GreatEgret" 
    , commonName = "Great Egret"
    , sciName = "Ardea alba"
    , rate = -0.008263116833
    , pvalue =  0.832960889849
    }
  ,   { species = GreatHornedOwl
    , id = "GreatHornedOwl" 
    , commonName = "Great Horned Owl"
    , sciName = "Bubo virginianus"
    , rate = -0.006874410994
    , pvalue =  0.841469765146
    }
  ,   { species = GreenHeron
    , id = "GreenHeron" 
    , commonName = "Green Heron"
    , sciName = "Butorides virescens"
    , rate = -0.055397921015
    , pvalue =  0.005802746129
    }
  ,   { species = HairyWoodpecker
    , id = "HairyWoodpecker" 
    , commonName = "Hairy Woodpecker"
    , sciName = "Dryobates villosus"
    , rate = -0.017051109135
    , pvalue =  0.452859419641
    }
  ,   { species = HoodedWarbler
    , id = "HoodedWarbler" 
    , commonName = "Hooded Warbler"
    , sciName = "Setophaga citrina"
    , rate = 0.026302913387
    , pvalue =  0.101505992106
    }
  ,   { species = HornedLark
    , id = "HornedLark" 
    , commonName = "Horned Lark"
    , sciName = "Eremophila alpestris"
    , rate = 0.039498661095
    , pvalue =  0.043557150091
    }
  ,   { species = HouseFinch
    , id = "HouseFinch" 
    , commonName = "House Finch"
    , sciName = "Haemorhous mexicanus"
    , rate = -0.006467521486
    , pvalue =  0.487238570280
    }
  ,   { species = HouseSparrow
    , id = "HouseSparrow" 
    , commonName = "House Sparrow"
    , sciName = "Passer domesticus"
    , rate = -0.086394309807
    , pvalue =  0.000000124248
    }
  ,   { species = HouseWren
    , id = "HouseWren" 
    , commonName = "House Wren"
    , sciName = "Troglodytes aedon"
    , rate = -0.017495764585
    , pvalue =  0.560384615625
    }
  ,   { species = IndigoBunting
    , id = "IndigoBunting" 
    , commonName = "Indigo Bunting"
    , sciName = "Passerina cyanea"
    , rate = -0.018914674400
    , pvalue =  0.003204941318
    }
  ,   { species = KentuckyWarbler
    , id = "KentuckyWarbler" 
    , commonName = "Kentucky Warbler"
    , sciName = "Geothlypis formosa"
    , rate = 0.039612811650
    , pvalue =  0.232875410506
    }
  ,   { species = Killdeer
    , id = "Killdeer" 
    , commonName = "Killdeer"
    , sciName = "Charadrius vociferus"
    , rate = -0.023884897861
    , pvalue =  0.116940561241
    }
  ,   { species = LoggerheadShrike
    , id = "LoggerheadShrike" 
    , commonName = "Loggerhead Shrike"
    , sciName = "Lanius ludovicianus"
    , rate = -0.002751686979
    , pvalue =  0.971655824395
    }
  ,   { species = LouisianaWaterthrush
    , id = "LouisianaWaterthrush" 
    , commonName = "Louisiana Waterthrush"
    , sciName = "Parkesia motacilla"
    , rate = 0.009798910727
    , pvalue =  0.649013998220
    }
  ,   { species = Mallard
    , id = "Mallard" 
    , commonName = "Mallard"
    , sciName = "Anas platyrhynchos"
    , rate = -0.032243794091
    , pvalue =  0.078591718844
    }
  ,   { species = MourningDove
    , id = "MourningDove" 
    , commonName = "Mourning Dove"
    , sciName = "Zenaida macroura"
    , rate = -0.023864072088
    , pvalue =  0.000468350275
    }
  ,   { species = NorthernBobwhite
    , id = "NorthernBobwhite" 
    , commonName = "Northern Bobwhite"
    , sciName = "Colinus virginianus"
    , rate = -0.104348863785
    , pvalue =  0.000000006994
    }
  ,   { species = NorthernCardinal
    , id = "NorthernCardinal" 
    , commonName = "Northern Cardinal"
    , sciName = "Cardinalis cardinalis"
    , rate = -0.007560672148
    , pvalue =  0.343322512704
    }
  ,   { species = NorthernFlicker
    , id = "NorthernFlicker" 
    , commonName = "Northern Flicker"
    , sciName = "Colaptes auratus"
    , rate = -0.036687148635
    , pvalue =  0.028527398977
    }
  ,   { species = NorthernMockingbird
    , id = "NorthernMockingbird" 
    , commonName = "Northern Mockingbird"
    , sciName = "Mimus polyglottos"
    , rate = -0.027782349694
    , pvalue =  0.152018477967
    }
  ,   { species = NorthernParula
    , id = "NorthernParula" 
    , commonName = "Northern Parula"
    , sciName = "Setophaga americana"
    , rate = 0.043217735758
    , pvalue =  0.003241876022
    }
  ,   { species = NorthernRoughwingedSwallow
    , id = "NorthernRoughwingedSwallow" 
    , commonName = "Northern Rough-winged Swallow"
    , sciName = "Stelgidopteryx serripennis"
    , rate = 0.014352258629
    , pvalue =  0.667549805157
    }
  ,   { species = OrchardOriole
    , id = "OrchardOriole" 
    , commonName = "Orchard Oriole"
    , sciName = "Icterus spurius"
    , rate = -0.023235858154
    , pvalue =  0.176178099811
    }
  ,   { species = Osprey
    , id = "Osprey" 
    , commonName = "Osprey"
    , sciName = "Pandion haliaetus"
    , rate = 0.052299244949
    , pvalue =  0.110952561228
    }
  ,   { species = Ovenbird
    , id = "Ovenbird" 
    , commonName = "Ovenbird"
    , sciName = "Seiurus aurocapilla"
    , rate = 0.002248787097
    , pvalue =  0.816461440524
    }
  ,   { species = PileatedWoodpecker
    , id = "PileatedWoodpecker" 
    , commonName = "Pileated Woodpecker"
    , sciName = "Dryocopus pileatus"
    , rate = 0.053493667934
    , pvalue =  0.002716393162
    }
  ,   { species = PrairieWarbler
    , id = "PrairieWarbler" 
    , commonName = "Prairie Warbler"
    , sciName = "Setophaga discolor"
    , rate = -0.026185966865
    , pvalue =  0.001268762967
    }
  ,   { species = ProthonotaryWarbler
    , id = "ProthonotaryWarbler" 
    , commonName = "Prothonotary Warbler"
    , sciName = "Protonotaria citrea"
    , rate = 0.049971591923
    , pvalue =  0.065251367200
    }
  ,   { species = PurpleMartin
    , id = "PurpleMartin" 
    , commonName = "Purple Martin"
    , sciName = "Progne subis"
    , rate = 0.026161236958
    , pvalue =  0.329327255952
    }
  ,   { species = RedbelliedWoodpecker
    , id = "RedbelliedWoodpecker" 
    , commonName = "Red-bellied Woodpecker"
    , sciName = "Melanerpes carolinus"
    , rate = 0.006212432849
    , pvalue =  0.138140346642
    }
  ,   { species = RedeyedVireo
    , id = "RedeyedVireo" 
    , commonName = "Red-eyed Vireo"
    , sciName = "Vireo olivaceus"
    , rate = -0.008666577954
    , pvalue =  0.234905467114
    }
  ,   { species = RedheadedWoodpecker
    , id = "RedheadedWoodpecker" 
    , commonName = "Red-headed Woodpecker"
    , sciName = "Melanerpes erythrocephalus"
    , rate = 0.027072713063
    , pvalue =  0.128642187460
    }
  ,   { species = RedshoulderedHawk
    , id = "RedshoulderedHawk" 
    , commonName = "Red-shouldered Hawk"
    , sciName = "Buteo lineatus"
    , rate = 0.056454469923
    , pvalue =  0.000000100687
    }
  ,   { species = RedtailedHawk
    , id = "RedtailedHawk" 
    , commonName = "Red-tailed Hawk"
    , sciName = "Buteo jamaicensis"
    , rate = 0.013862119481
    , pvalue =  0.446092797884
    }
  ,   { species = RedwingedBlackbird
    , id = "RedwingedBlackbird" 
    , commonName = "Red-winged Blackbird"
    , sciName = "Agelaius phoeniceus"
    , rate = -0.037699828172
    , pvalue =  0.003792912397
    }
  ,   { species = RockPigeon
    , id = "RockPigeon" 
    , commonName = "Rock Pigeon"
    , sciName = "Columba livia"
    , rate = -0.019898732025
    , pvalue =  0.194955122731
    }
  ,   { species = RubythroatedHummingbird
    , id = "RubythroatedHummingbird" 
    , commonName = "Ruby-throated Hummingbird"
    , sciName = "Archilochus colubris"
    , rate = -0.028625039633
    , pvalue =  0.003101178303
    }
  ,   { species = ScarletTanager
    , id = "ScarletTanager" 
    , commonName = "Scarlet Tanager"
    , sciName = "Piranga olivacea"
    , rate = -0.047114056461
    , pvalue =  0.001005357394
    }
  ,   { species = SharpshinnedHawk
    , id = "SharpshinnedHawk" 
    , commonName = "Sharp-shinned Hawk"
    , sciName = "Accipiter striatus"
    , rate = -0.042824862431
    , pvalue =  0.295349439307
    }
  ,   { species = SongSparrow
    , id = "SongSparrow" 
    , commonName = "Song Sparrow"
    , sciName = "Melospiza melodia"
    , rate = 0.004584986899
    , pvalue =  0.815935016029
    }
  ,   { species = SummerTanager
    , id = "SummerTanager" 
    , commonName = "Summer Tanager"
    , sciName = "Piranga rubra"
    , rate = 0.036265396082
    , pvalue =  0.000163982545
    }
  ,   { species = TreeSwallow
    , id = "TreeSwallow" 
    , commonName = "Tree Swallow"
    , sciName = "Tachycineta bicolor"
    , rate = 0.094210892075
    , pvalue =  0.006111669342
    }
  ,   { species = TuftedTitmouse
    , id = "TuftedTitmouse" 
    , commonName = "Tufted Titmouse"
    , sciName = "Baeolophus bicolor"
    , rate = 0.002913980062
    , pvalue =  0.486702965341
    }
  ,   { species = TurkeyVulture
    , id = "TurkeyVulture" 
    , commonName = "Turkey Vulture"
    , sciName = "Cathartes aura"
    , rate = 0.007779846694
    , pvalue =  0.683025035350
    }
  ,   { species = WarblingVireo
    , id = "WarblingVireo" 
    , commonName = "Warbling Vireo"
    , sciName = "Vireo gilvus"
    , rate = -0.167119401395
    , pvalue =  0.045970110775
    }
  ,   { species = WhitebreastedNuthatch
    , id = "WhitebreastedNuthatch" 
    , commonName = "White-breasted Nuthatch"
    , sciName = "Sitta carolinensis"
    , rate = 0.010350807863
    , pvalue =  0.311056831758
    }
  ,   { species = WhiteeyedVireo
    , id = "WhiteeyedVireo" 
    , commonName = "White-eyed Vireo"
    , sciName = "Vireo griseus"
    , rate = 0.075576025182
    , pvalue =  0.000000003064
    }
  ,   { species = WildTurkey
    , id = "WildTurkey" 
    , commonName = "Wild Turkey"
    , sciName = "Meleagris gallopavo"
    , rate = 0.084218178213
    , pvalue =  0.000283454866
    }
  ,   { species = WoodDuck
    , id = "WoodDuck" 
    , commonName = "Wood Duck"
    , sciName = "Aix sponsa"
    , rate = 0.028399867805
    , pvalue =  0.414470734194
    }
  ,   { species = WoodThrush
    , id = "WoodThrush" 
    , commonName = "Wood Thrush"
    , sciName = "Hylocichla mustelina"
    , rate = -0.063374186887
    , pvalue =  0.000000000000
    }
  ,   { species = YellowWarbler
    , id = "YellowWarbler" 
    , commonName = "Yellow Warbler"
    , sciName = "Setophaga petechia"
    , rate = 0.053320056416
    , pvalue =  0.246168571268
    }
  ,   { species = YellowbilledCuckoo
    , id = "YellowbilledCuckoo" 
    , commonName = "Yellow-billed Cuckoo"
    , sciName = "Coccyzus americanus"
    , rate = 0.015384808489
    , pvalue =  0.032050037452
    }
  ,   { species = YellowbreastedChat
    , id = "YellowbreastedChat" 
    , commonName = "Yellow-breasted Chat"
    , sciName = "Icteria virens"
    , rate = -0.031528137381
    , pvalue =  0.011204161162
    }
  ,   { species = YellowthroatedVireo
    , id = "YellowthroatedVireo" 
    , commonName = "Yellow-throated Vireo"
    , sciName = "Vireo flavifrons"
    , rate = -0.007972255775
    , pvalue =  0.613291491512
    }
  ,   { species = YellowthroatedWarbler
    , id = "YellowthroatedWarbler" 
    , commonName = "Yellow-throated Warbler"
    , sciName = "Setophaga dominica"
    , rate = 0.073724307412
    , pvalue =  0.000005713922
    } ] 


-- Convert species to its common name as a String.
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


-- Identify a Species by a string, maybe
stringToSpecies : String -> Maybe Species
stringToSpecies s =
    List.map (\x -> ( x, speciesToString x )) allSpecies
   |> List.filterMap
      (\( x, y ) -> if y == s then Just x else Nothing )
    |> List.head 


-- Get the SpeciesRec for a Species
lookupSpecies : Species -> Maybe SpeciesRec
lookupSpecies x = 
  List.filter (\r -> x == r.species) allSpeciesRec 
    |> List.head
