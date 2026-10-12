# Dawn Patrol: how to use it, and FAQ

The same text is in the app: open **Menu**, then **Help and FAQ**.

Dawn Patrol forecasts the spots you add yourself. There is no built-in spot list.

## Getting started

### What is Dawn Patrol?

Dawn Patrol is a surf forecast for the spots you pick. It reads the marine models, buoys, tides and weather, scores each spot from 0 to 100 for every hour, and finds the best daylight windows.

### How do I add a spot?

There are two ways. Type a beach or town into **Search a beach or town** and pick a result, and a pin drops there. Or tap **Show map**, then **Map tools**, then **Drop pin**, and tap the water where you surf. Name the pin and the app works out which way the beach faces from the coastline. You can keep up to 24 spots.

### How is the app laid out?

The map and **Your spots** come first. Tap a spot to open its page, which shows the score, conditions right now, the tide, the next few days and an hour-by-hour planner. On a computer the map is on the left and the spot page on the right. On a phone, tap **‹ Your spots** to go back to the map.

### What are the tabs on a spot page?

Each spot page has three tabs. **Now** has the score, Right now and the tide. **Forecast** has the next days, the hour-by-hour planner, and swell and wind (as charts or a table of every hour). **More** has the compass, swell arrival, water and rain, the crowd estimate, forecast confidence, your notes, a timelapse, a day replay, tides ahead, forecast accuracy, model comparison and buoy charts. Tap any section title to open or close it. Opening another spot always starts you on Now.

### What do the colors and numbers mean?

The score runs from 0 to 100. **Poor** (under 25) is brown. **Fair** (25 to 49) sits between brown and **Good** (50 to 69). **Great** (70 to 84) and **Epic** (85 and up) have their own colors. Great and Epic hours glow in the hour-by-hour grid and Next days. Turn off motion under Accessibility if the glow bothers you. The score combines every swell reaching the beach, estimates the breaking wave size from swell height and period, checks how well the swell lines up with the beach, and weighs wind (offshore is best) and the tide or size you prefer. Your surfing level changes it too.

### Where are the settings?

Tap **Menu** at the top right. It has units (feet or metres), dark mode, your surfing level, alerts, export and import, offline saving, accessibility, install, help and problem reports.

### What does my surfing level do?

It tailors the forecast to you. **Beginner** favors small, gentle surf up to about 4 ft and scores bigger hours lower. **Intermediate** favors medium surf and scores lower above about 8 ft. **Advanced** keeps the full-size score. On Beginner, any hour where the surf could top 4 ft gets a caution: a banner on the Now tab, a ! on the hour grid and day cards, a warning on the spot list, and a ! on the map pin. The caution is a reminder to respect the ocean and know your limits. It does not mean smaller surf is safe. Change your level any time in **Menu**, under **Your surfing level**. The first time you open the site, a window asks you to pick one.

### Can Dawn Patrol alert me when a spot is good?

Yes. In **Menu**, under **Alerts**, pick a score (70 is a good start for Great surf), paste one or more webhook addresses that start with https://, one per line, and turn on **Send alerts**. Dawn Patrol checks every spot up to 14 days ahead and sends one message per spot and day, or one summary a day if you prefer. A webhook is a link that passes a message to another app, such as an IFTTT applet or a chat channel. Alerts only run while this page is open, and Dawn Patrol cannot tell whether a message arrived. Try **Send a test** first.

## Your spots

### How do I rename, move or remove a spot?

Open the spot and tap **Edit spot** under the picture. From there you can rename it, set the direction the beach faces, detect that direction from the coastline, or remove it. You can also tap **Remove** on any spot in **Your spots**; the app asks you to confirm first. Removing gives you an **Undo** button for a few seconds. To move a spot, drop a new pin where you want it and remove the old one.

### How do I merge spots that are the same place?

Tap **Select spots to merge** above Your spots. A checkbox appears on each spot. Tick two or more, then tap **Merge**. In the window, pick the name, location, beach direction and break depth to keep. Each one can come from any of the ticked spots, or the location can be their average. Notes from all of them are combined, and the other spots are removed. An **Undo** button appears for a few seconds.

### What is break depth?

Break depth is how deep the water is where the waves break. A wave cannot stand much taller than about 0.78 times the water depth, so on a reef or sandbar the app caps the size it shows. Open **Edit spot** and pick a depth from the list. For California spots, the app reads the water depth from the nearest CDIP model point and uses it by default, shown as **Automatic**. That point is a model grid cell, not a survey of your reef, so set your own depth if you know it. **Deep water (no limit)** turns the cap off. Anywhere else, deep water is the default and the forecast is unchanged.

### How do I see drive times?

Open **Menu**, find **Home**, then either search for a town and pick it, or tap **Use my location** and allow the permission your browser asks for. Each spot then shows its drive time from home, on the spot list and on its page. Your home position is saved only on this device. Routes come from OpenStreetMap roads through a public routing service, which assumes no traffic, so treat the times as a rough guide. Your home position and your spots’ positions are sent to that service, and Dawn Patrol does not store them. If you use your location, the app looks up the nearest town name from OpenStreetMap, using your position rounded to about 1 km.

### What is Best spot today?

The top of **Your spots** names the spot with the best surf you can still get today, with the next two below it. For each spot the app finds the best three-hour stretch of daylight from now until dusk (a shorter one if less daylight is left), using the same score as the spot list. Tap a spot to open it. If there is no daylight left, the card says so. **Best spot tomorrow** does the same for tomorrow, from first to last light.

### The beach direction looks wrong

Pins get their direction from the coastline, and that can be off at points and in bays. Open **Edit spot** and set it by hand. The wind and swell scoring follow it.

### What do the nearest five buoys show?

The Buoys section lists the five NOAA stations closest to the spot, nearest first, with distance, waves, period, swell direction, wind and water temperature. Tap a station to see its charts. Below the table, the app compares the five together: whether wave height and direction agree, whether the periods get longer further out, and whether the wind at the nearest station is offshore, onshore or cross-shore for this beach. It is a reading of five separate sensors, not a forecast.

### What do the numbers at the top and bottom mean?

The version number and the time are shown at the top right and bottom left. The app is still pre-1.0, so the first number is 0. The middle number goes up with each feature release, and the last number goes up with each fix or small change. A change that breaks saved spots or shared links will bring in version 1.0. The time is when this copy of the site was last updated, in your local time.

### How do I tell the app whether a forecast was right?

Open a spot and tap **Was the forecast right?** under the score, then tap what the surf is really like. The app adjusts that spot’s scores on this device. Your reports never leave it. **Reset** clears them.

### Can a spot work on more than one swell direction?

Yes. Open the spot, then **Edit spot**, and under **Best swell directions** tap every direction the swell can come from. For example, W and NW, or S, SW and W. The score, compass and map all use your picks, and the spot header lists them. **Use the beach direction instead** goes back to a single facing. You can also change these picks under the compass on the **More** tab.

### Can I add notes or a preferred tide?

Yes. On the **More** tab, **Your notes and gear** lets you pick the tide and size you like at that spot, and write notes. A match nudges the score up, and a mismatch nudges it down.

### How do I share a spot?

Open the spot, tap **Share**, then **Copy link** or **Share…**. Whoever opens the link gets the spot added to their own list, with its beach direction, break depth and any swell directions you picked. Your notes and score reports stay private.

### Can I share all my spots at once?

Yes. Open **Menu** and tap **Share all as a link** under Your spots. The person who opens it sees the list and picks which spots to add. Spots they already have are skipped.

### The score looks wrong for my spot

Start with the beach direction under **Edit spot**. If it says **guessed**, set it yourself, because the swell and wind scoring both depend on it. Next, check your surfing level in the Menu. Beginner and Intermediate scores are lower for big surf on purpose. Then use **Was the forecast right?** under the score to tell the app what the surf is really like. Each report shifts that spot’s scores, more with every report, by up to 35 points either way. **Reset** clears them.

### How do I move my spots to another device?

Open **Menu** and tap **Export** under Your spots. Copy the text or download the file, then use **Import** on the other device. You choose whether to add to what is already there or replace it.

## Reading the forecast

### How do I read the spot page?

The big number is the score for this hour. The picture is drawn from the real numbers: wave size, wind, tide and time of day. **Right now** lists the estimated surf size, swell, wind, tide, water, air and sunrise. Tap any tile for its charts and details.

### Where can I see the tide?

Every spot has a tide graph for today, with a **Now** marker, the highs and lows, and a strip underneath that shows the surf score for each hour. Tap the arrows to step to tomorrow and later. Touch or hover the graph to read any time, or use the arrow keys. **Tides ahead** on the More tab shows the full range. In the US the tide times come from official NOAA predictions for the nearest station. Elsewhere they are estimated from the ocean model, so check a local tide table for anything that matters.

### What are Next days and Hour by hour?

**Next days** shows the best three-hour daylight window for each day. **Hour by hour** colors every daylight hour by its score. Tap an hour to see its swell, wind and tide. Use the tide and wind filters to gray out hours that do not suit you, and **Add best windows to calendar** to save them. On Beginner, hours with surf above 4 ft get a ! and a caution when you tap them, and a day with such hours says "Caution: up to" its largest size.

### Are the sizes the wave face height?

The tiles show swell height from the models and an estimated surf size for the spot. Sandbars, reefs and the tide change what you actually see, so treat the size as a guide.

### What do model comparison and forecast confidence mean?

Weather models often disagree. On the More tab, **Model comparison** puts them side by side, and **Forecast confidence** tells you whether they agree. If a day has low confidence, treat it as a maybe.

### What does Swell arrival tell me?

If a buoy sits upstream of your spot, the app checks what it is reading now and estimates when that swell will reach you, based on the swell period.

### What is the crowd estimate?

It is a rough guess based on the day of the week, the time of day, how good the surf is, the wave size, the water temperature and the chance of rain. It is not a headcount, and no live count is connected. Dawn Patrol does not use Google or Surfline crowd data, because neither has a public feed it can use. Use it as a hint.

It works like a stoplight. **Green** means quiet or light, **yellow** means moderate, and **red** means busy or packed. The hour bars and the words above them use the same colors.

## The map

### What is under Map layers?

Open **Show map**, then **Map tools**, then **Map layers**. You can switch between a street map, an ocean chart and satellite imagery. You can also add seamarks for reefs and hazards, rain radar, live clouds, a daily satellite image, sea temperature or the NOAA nautical chart. Some layers need a live connection.

### Why is the map hidden?

The map starts closed so your spots and the forecast come first. Tap **Show map** to open it and **Hide map** to close it. The buttons on the map (**Drop pin**, **Map layers** and the zoom buttons) sit behind **Map tools**. Tap it to show them, and tap again to hide them. Both start closed each time you open the site.

### Can I play the forecast on the map?

Yes. Open **Map layers** and tap **Play**. The scores on your pins step through the coming days. Drag the slider to pick a time, and turn on **Show swell flow** to see streaks for the swell or the wind.

## Settings and offline

### Metric or imperial? Light or dark?

Open **Menu**. Units switches between feet, mph and °F, or metres, km/h and °C. Dark mode switches the colors. Both are remembered. The first time you open Dawn Patrol with no spots saved, it asks which units you want.

### Will it work without a signal?

Partly. Each spot you open is saved on the device, up to 8 spots, and an installed copy opens offline. Offline, you see the last saved forecast and how old it is.

### How do I install it on my phone?

Open **Menu** and tap **Install**. On an iPhone, use the Share button in Safari and choose **Add to Home Screen**.

### Can I rearrange the spot page?

On a computer, open **Menu** and tap **Edit layout**. Drag sections into the order you want, use the arrows, or hide the ones you do not need. **Reset layout** puts everything back.

### Can I use Dawn Patrol in another language?

Yes. Open **Menu**, then choose a language under **Language** at the top of the Display section: English, Español, Français, Deutsch, Português (Brasil) or Italiano. The choice is saved on this device. Most labels and buttons change. Times, numbers and the compass letters stay in English for now. The Help text, the Terms and the Privacy Policy are in English.

### Text is too small or animations bother me

Open **Menu**, then **Accessibility**. You can choose larger text, higher contrast, wider spacing (including more space between paragraphs), color-blind-safe colors with patterns, an easier-to-read font, or turn off all animation. The app also follows your device’s contrast and reduce-motion settings.

### Does it work with a screen reader or keyboard?

Yes. Charts read out a summary of their range and peak. Focus a chart and use the left and right arrow keys to move hour by hour. Page Up and Page Down jump six hours, and Home and End go to the ends. A **Skip to the forecast** link appears on your first Tab press. Each chart has a **♪ Hear it** button, and **Read aloud** on a spot's Now tab speaks the conditions. The full list is in the [Accessibility statement](/docs/ACCESSIBILITY).

### What does Read aloud do?

On a spot's **Now** tab, tap **Read aloud**. It speaks the conditions right now, any rip current risk or weather alert, a caution if the surf could be big for a beginner, and the next few days. It is built from the same numbers you see on screen, with no AI writing, so it never says anything the page does not show. Your device's own voice does the speaking. Use **Pause** and **Stop**, and change the speed under Menu, Accessibility. It speaks English only for now.

### What do the color-blind and font options do?

Under Menu, Accessibility, **Color vision** swaps the score colors for a set that stays distinct for the common kinds of color blindness, and adds a pattern to each level so you never have to tell colors apart. **Font** switches to Atkinson Hyperlegible, which has clearer letter shapes. It is downloaded from Google Fonts only when you choose it, and falls back to Verdana if you are offline.

### Can I hear a chart?

Yes. Tap **♪ Hear it** on a chart, or **♪ Hear the tide curve** under the tide. The values play as a pitch that rises and falls with the line, and a higher ping marks right now. Your screen reader is told the lowest and highest values.

### Can I see where a number comes from?

Yes. Right-click on any section, chart or the picture at the top. On a phone, press and hold for half a second. You can also tap the small **Source** button on a heading. A menu opens with a link to the data behind it: the NOAA tide station, the buoy page, the National Weather Service text, or the raw forecast numbers for that chart. Links open in a new tab. Each menu also links to the provider and to the full list of sources. Sections that are worked out on your device, like the crowd estimate, say so.

Text boxes keep the normal browser menu, and on a computer you can hold Shift while right-clicking to get the browser's own menu. With a keyboard, Tab to a **Source** button and press Enter.

### Where is my data kept?

On your device only. Your spots, notes and settings are stored in this browser. Use Export to keep a copy or move them to another device.

### Something is broken. How do I report it?

Open **Menu** and tap **Report a problem**. The app keeps a short list of errors and your last few taps, on this device only. Save the log and email it if you want to. Nothing is sent unless you send it.

### Where are the docs and the source code?

Both are public on this site. The [Documentation](/docs/) covers how it works, the API, data sources, testing and deployment. The [Source files](/source/) page lists every file as plain text.

## Data and trust

### Where does the data come from?

Waves, swell, sea temperature and tide height come from the Open-Meteo marine models. Wind, air, sun and rain come from the Open-Meteo weather models. Where they are available, the app also uses NOAA National Weather Service forecasts, NOAA tide predictions, NDBC and CDIP wave buoys, the CDIP nearshore model for California, the PacIOOS wave models for Hawaii, Open-Meteo ensemble runs, California state beach advisories, the weekly Scripps Pier algae sample (CalHABMAP and SCCOOS) and Open-Meteo air quality. For the next 3 days it also checks wind and swell against [WeatherAPI.com](https://www.weatherapi.com/) and [Visual Crossing](https://www.visualcrossing.com/) ([Weather data by Visual Crossing](https://www.visualcrossing.com/)). It blends them into the score and falls back to them if Open-Meteo is down. First and last light are worked out on your device from the spot’s position.

### What does the extra weather sources setting do?

For the next 3 days, Dawn Patrol asks two more free forecast services, WeatherAPI.com and Visual Crossing, for wind, and WeatherAPI.com for swell. Wind is averaged, with Open-Meteo counting for half and the other two for a quarter each. Swell moves toward WeatherAPI.com only when the two agree on direction and period. Otherwise Open-Meteo is used alone. From day 4 on, and in the ranking of all your spots, only Open-Meteo is used. If Open-Meteo does not answer, these two sources keep a real 3-day forecast on screen. Turn the setting off in the Menu to use Open-Meteo only.

### It says "Demo data". What does that mean?

The app could not reach the live services, so the numbers are made up to show you the screens. Do not use them to decide where to surf. Check the status chip at the top and reload once you are back online.

### How accurate is it?

Models are a guide. Small, short-period surf and local wind are the hardest to predict. Check a buoy and local reports before you drive. **Forecast accuracy** on the More tab shows how the models have done at your spot.

### How far ahead can I trust it?

Pick 3, 5, 7, 10 or 14 days above Next days. The first three or four days are the most reliable. Past about a week, treat the forecast as a trend.

### What are the shaded bands on the model charts?

On the wave chart, the band runs from the lowest model to the highest each hour, so a narrow band means the models agree. On the wind chart it covers the range where 8 in 10 ensemble runs fall. A band that spreads out means the forecast is unsure.

### What is the swell spectrum?

Under **Buoys**, pick a buoy to see how its wave energy is split by period. A tall peak at 14 seconds or more is groundswell. Energy at 6 to 8 seconds is local wind chop. Not every station publishes a spectrum.

### Why do some spots show extra wave models?

Some regions have local wave models that are finer than the global ones. In model comparison, California spots get the CDIP nearshore model, and spots in the Hawaiian islands get the University of Hawaii PacIOOS models, including a 500 m nearshore model for the main islands. Everywhere else you see the global models only. The local models pick up how islands and headlands shadow and bend the swell.

### Where do the beach advisories come from?

For California spots, **Water and rain** shows postings and closures from the State Water Board Beach Watch records for the nearest monitored beach. The state updates these in batches, so check the Safe to Swim map or your county health department for today. Outside California, Dawn Patrol links to EPA BEACON.

### What is the algae report?

For spots within about 60 km of Scripps Pier in La Jolla, **Water and rain** shows the weekly CalHABMAP sample from the pier: water temperature, chlorophyll, counts of harmful algae and domoic acid. Each line has its own date, because lab counts and toxin tests arrive a week or more after the water temperature. A bloom is flagged when Pseudo-nitzschia passes 10,000 cells/L or particulate domoic acid passes 0.5 ng/mL (the SCCOOS HAB Bulletin levels), or when red tide algae or Akashiwo pass 100,000 cells/L (this app’s own guide). One pier does not describe every beach, so use it as a heads-up and check county advisories before swimming or eating shellfish. When the pier water temperature differs from the ocean model, the water tile says so.

### Can Dawn Patrol alert me to algae blooms?

Yes. Open the Menu and turn on **Algae bloom alerts**, then allow notifications. Dawn Patrol checks the Scripps Pier sample every hour and sends one notification when a bloom is newly flagged. It sends nothing else. Samples are weekly and lab results lag, so an alert can come days after the water was sampled. On iPhone and iPad, add Dawn Patrol to your Home Screen first. Turn the switch off any time to remove your device from the list.

### What is the rip current risk?

In the US, the National Weather Service surf zone forecast gives a rip current risk for each period. Low does not mean no rips. If you get caught in one, stay calm, do not fight it, and swim parallel to the shore.

### What does first light mean?

First light is when it is bright enough to see the lineup, about when the sun is 6 degrees below the horizon. Last light is the same in the evening.

### Is it safe to rely on?

No forecast can tell you the surf is safe. Rips, hazards, closures and your own ability matter more. Hazard hints are advice only. Never surf beyond your limits.

### Where are the Terms of Service and Privacy Policy?

Read the [Terms of Service](/terms) and the [Privacy Policy](/privacy). By using Dawn Patrol you agree to the Terms.

