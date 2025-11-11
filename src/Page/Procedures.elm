module Page.Procedures exposing (Model, Msg, init, update, view)

import Html exposing (..)
import Html.Attributes exposing (alt, class, src, width)
import Markdown.Parser as Markdown
import Markdown.Renderer


proceduresContent : String
proceduresContent =
    """
# Procedures

## Basics

* Pick a day for your count between **May 15 and June 30**; a Sunday morning is a good time because there is little traffic then.
* Arrive at the starting point in time to start your first count exactly 30 minutes before sunrise (about 5:30 EDT for our area in early June).
* Drive exactly 0.5 miles between counts by the odometer in your car.
* If it is unsafe to stop at the 0.5-mile mark (or the 0.5-mile mark falls on a numbered highway) continue to the first place on your route where it is safe to stop (for the next count, proceed 0.5 miles from this adjusted position).
* Continue until you have made 20 stops (9.5 miles if all intervals are 0.5 miles).

### Performing a count

Watch a video demonstration to see a checklist in action:

* For iPhone: [link](https://www.youtube.com/watch?v=KgemDVmoSYU)
* For Android: [link](https://www.youtube.com/watch?v=D92U3FuaVxg)

1. For each stop along your survey route, submit an eBird checklist of birds seen or heard during your 3 minute period using the eBird mobile app.

2. **For Stop 1 only**, enter information about **observers** and **weather** (and optionally, overall survey **notes**) for the survey as a whole. Also enter information about **vehicles** and **habitat**, as in the following example:
   * "observers=Allen Hurlbert, Sarah Pollack; weather=55 F, clear; notes=big thunderstorm last night, everything wet; used Merlin Sound ID for confirmation; vehicles=3; habitat=B,H"

3. **These comments must be formatted in this very specific way** in order for us to easily extract this information later. Please make sure you use these conventions:
    * Separate the different types of information (**observers; weather; vehicles;** etc.) with a **semi-colon**, and only use a semi-colon for this purpose.
    * The key to allowable **habitat** codes can be found [below](#habitat). The convention is to specify habitat on the left side of the road first, followed by a comma, and then habitat on the right side of the road.
    * Instructions for counting **vehicles** can be found [here](#vehicle-count-procedure).

4. **For Stops 2-20**, enter information about only **vehicles** and **habitat** (in particular, if habitat has never been entered before, or if it has changed since the previous year) in the checklist comments field. Two examples, including an acceptable shorthand:
    * "vehicles=3; habitat=B,H"
    * "v=3; h=B,H"

5. Some notes about using **Merlin Sound ID**, which some people find helpful as a means of alerting them to birds singing, or of confirming songs or calls they are on the fence on. If you use **Merlin Sound ID** to assist you during your point counts:
    * Do not add birds identified by Merlin to your point count list unless you can personally verify the presence of the bird by sight or sound. Merlin is not perfect and occasionally has false positives.
    * Please mention in the **notes** section of Stop 1 that you used Merlin Sound ID for confirmation (see example above).

6. The **Location** for each of the 20 checklists must follow a **specific naming convention**: `[County] [Route Number] Stop [Stop Number]`. Examples:
    * `Orange 3 Stop 1`
    * `Chatham 7 Stop 15`
    * `Durham 4 Stop 8`

7. **If you have previously submitted individual stop-based eBird checklists from your survey route**, then you may be able to rename these existing locations according to our new convention in advance using the Manage My Locations feature of the eBird website.
    * **NOTE**: If you previously specified "Orange Co" or "Orange County" in the stop location names on eBird, that's fine and you may continue to use those names.
    * **Next year it will be even easier!** After you have entered these location names once for your survey route, in the future, you will simply be able to select the stop location from the list of locations that automatically pops up in the mobile app.

8. **Connectivity issues**. If you have no connectivity at a survey stop, it may not let you choose the location or submit the checklist. That's ok!
    * Once you've finished recording birds from the 3-minute survey, simply 'X' out of the checklist in the top right. The checklist will now be listed in the **Not Submitted** section of the app.
    * When you get home (or elsewhere with a signal), you can then tap the checklist which will open where you left off. Tap the green **Review** button in the lower right.
    * Tap **Choose a location…**. Your phone's GPS should have accurately recorded your location, and you should now be able to select the named location, or if this is your first time at the stop, follow the instructions above to name it.
    * You should now be able to tap **Submit**.

### After the survey

1. **Review the Comments** fields of your checklists, and edit or update them as necessary. This may be easier to do on a computer back at home than on your phone.

2. **Make sure that the Comments for Stop 1 has observer and weather info!**

3. **Share ALL 20 checklists** from your survey route with the appropriate MBBS account (`mbbsorangenc`, `mbbsdurhamnc`, or `mbbschathamn`). This is an **extremely important step**, and without it, it is as if the surveys were never conducted as far as the project is concerned. We need the observations centralized in these accounts.

To share an eBird checklist, log in to the eBird website, go to Manage My Checklists, and click on the checklist you want to share. You will see a **Share** button next to your name.

Unfortunately, there's no easy way at the moment to share all 20 checklists in one go.

## Habitat

Use the following codes to characterize the habitat on each side of the road at the count location:

* **B** = Building
* **H** = Hardwood forest
* **P** = Pine forest
* **M** = Mixed pine-hardwood forest
* **F** = Field or pasture
* **R** = Recently clear-cut or burned
* **W** = Wetland

Notes:

* If more than one code applies to one place, list the appropriate codes in order from the most to the least predominant (three codes maximum, please!).
* If there is a building (not permanently abandoned) within 50 meters (yards), record code B first, regardless of what surrounds the building.

## Vehicle Count Procedure

The objective in counting vehicles at each stop is to produce information about the overall level of human activity along a route and any changes in this level from year to year.

* Count the number of vehicles during a three-minute period at each stop. Usually you can count vehicles during the same three minutes you count birds. Any contraption moving on the ground with a motor counts as a vehicle!
* If you extend the three minutes for counting birds to compensate for heavy traffic, do not make an extension for the traffic. Instead just count vehicles during the first three minutes -- whether or not the traffic is heavy!
* If things are happening fast (lots of birds, lots of traffic), then the birds come first! Count the birds the best you can -- and estimate (guess) the number of vehicles the best you can.

## Routes

View all routes and their locations on our [Routes page](/routes).
"""


type alias Model =
    {}


type Msg
    = NoOp


init : ( Model, Cmd Msg )
init =
    ( {}, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )


renderMarkdown : String -> Html Msg
renderMarkdown markdown =
    case
        markdown
            |> Markdown.parse
            |> Result.mapError (\_ -> "Parse error")
            |> Result.andThen (\ast -> Markdown.Renderer.render Markdown.Renderer.defaultHtmlRenderer ast)
    of
        Ok rendered ->
            div [] rendered

        Err _ ->
            text markdown


view : Model -> Html Msg
view _ =
    div [ class "procedures" ]
        [ renderMarkdown proceduresContent
        , div [ class "sharing-images" ]
            [ img [ src "/img/sharing_ebird_checklist1.png", alt "Sharing eBird checklist part 1", width 700 ] []
            , img [ src "/img/sharing_ebird_checklist2.png", alt "Sharing eBird checklist part 2", width 700 ] []
            ]
        ]
