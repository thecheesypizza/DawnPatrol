# Changelog

Dates are 2026. The app is pre-1.0 and ships continuously to one site. Version numbers read 0.minor.patch: a feature release raises the middle number, a fix raises the last one. Earlier entries were renamed from 1.x to match.

## Oct 12 (0.1.31)
- **Scripps Pier algae report.** For spots within about 60 km of Scripps Pier (roughly Oceanside to Imperial Beach), **Water and rain** now shows the weekly CalHABMAP sample from the pier, read from the SCCOOS ERDDAP server: water temperature, chlorophyll, counts of harmful algae (Pseudo-nitzschia, Alexandrium, red tide alga, Akashiwo, Dinophysis) and particulate domoic acid. Each line shows its own sample date, because lab results arrive a week or more after the water temperature.
  - A bloom is flagged when Pseudo-nitzschia passes 10,000 cells/L or domoic acid passes 0.5 ng/mL (SCCOOS HAB Bulletin levels), or when red tide algae or Akashiwo pass 100,000 cells/L (the app's own guide). A flagged bloom also shows a banner with the weather alerts. Samples older than 28 days are never used for a flag.
  - The **Water** tile detail shows the pier's measured water temperature and how far it is from the ocean model.
  - It also helps fill the gap left by the state beach records, which lag by months.
- **Algae bloom alerts (optional).** Menu, **Algae bloom alerts** turns on a phone notification when a bloom is newly flagged. This brings Web Push back, for this one alert only. The push carries no text; the service worker fetches the wording from `/api/sccoos/alert`. The hourly job checks the pier data (cached 3 hours), sends once per new bloom, and deletes push subscriptions left from the retired surf alerts.
- New routes `/api/sccoos` and `/api/sccoos/alert`; `/api/push/subscribe` accepts `bloom: true`. Service worker cache renamed `dp-shell-v3`.
- Tried and removed: Vaisala Xweather. Its API answered every request, with a 15,000-a-month free key, with an internal error (HTTP 500) and no data, so nothing from it ships. The two Worker secrets were deleted.

## Oct 12 (0.1.30)
- **Source menu.** Right-click any section, chart or the picture at the top (or press and hold on a phone) to open a menu with a link to the data behind it, in a new tab. A small **Source** button on each section and chart heading opens the same menu for people who do not right-click.
  - Links go to the actual record for that spot where there is one: the NOAA tide station, the NDBC buoy page, the National Weather Service surf zone product and alerts, and the raw Open-Meteo numbers for that chart (in your units). Each menu also links to the provider and to the full list of sources, and shows the provider's credit.
  - Sections worked out on your device (crowd estimate, your notes) say so instead of linking out.
  - Right-click now opens this menu everywhere in the app. Text boxes keep the normal browser menu, links and selected text get Open and Copy items, and Shift plus right-click gives the browser's own menu.
- Privacy policy: the "Links to other sites" row now mentions Source links, and the "Page fonts" row mentions the optional easier-to-read font from Google Fonts. Effective date updated.

## Oct 12 (0.1.29)
- Accessibility pass. New Accessibility settings: **Color vision** (color-blind-safe score colors, each level also drawn with a pattern so color is never the only cue), **Font** (an easier-to-read typeface, Atkinson Hyperlegible, loaded only when chosen), and **Text spacing** now also adds space between paragraphs.
- **Read aloud** button on each spot's Now tab. It speaks the current conditions, rip current and weather alerts, the beginner caution, and the next few days. The text is built from the same numbers shown on screen, with no AI writing, and spoken by your device's voice. Pause, stop and four speeds.
- **♪ Hear it** on each chart and **♪ Hear the tide curve**: the values play as a rising and falling pitch, with a higher ping at now, and the lowest and highest values are announced.
- New [Accessibility statement](/docs/ACCESSIBILITY) page, three new Help entries, and `worker/test13.mjs`.

## Oct 12 (0.1.28)
- Now page: the best upcoming window sits on its own line under the sentence about right now.

## Oct 12 (0.1.27)
- Now page: each line in the summary has its own emoji for what it says. Wave height gets a wave, wind gets a leaf, breeze, gust or tornado by strength, the best window a clock, the tide an up, down or sideways arrow, water a cold face, thermometer or sunglasses by temperature, and the contamination note a red X. Before, they all showed the same hand sign, which only belongs to the score word.

## Oct 12 (0.1.26)
- Round graphs added next to the existing charts (nothing was replaced), each with its numbers and units printed on it:
  - Radar polygons: score shape under Why this score, week shape under Next days, and one for wave height and one for wind speed across the forecast models.
  - Ring gauges under Right now: score, surf size, swell period, wind, water and tide.
  - 24-hour dials under Hour by hour: surf score for every hour of the next three days, with daylight marked.
  - Roses: wind and swell direction for the next three days, the nearest buoys' swell directions, and the direction of the swell energy in a buoy's spectrum.
- Fixed: the Wind bar under Why this score showed its points out of 30. It is out of 15, like the score itself.

## Oct 11 (0.1.25)
- Privacy Policy brought up to date: it now lists Google Fonts, BigDataCloud (naming a new pin), Overpass (beach direction) and links to other sites, names Open-Meteo for place search, and no longer mentions the removed spot photos. The effective date is October 11, 2026.
- API reference now covers `/api/drive`, `/terms` and `/privacy`.
- Worker: the NWS User-Agent reports the current version.
- Removed five old staging copies from storage. No change to how the app behaves.

## Oct 11 (0.1.24)
- Emoji accents across the app: the Now, Forecast and More tabs, section headings, the summary sentence, the weather line, empty states, status messages and the "Was the forecast right?" question.
- Small motion: the logo and summary icon bob gently, weather icons spin, sway or pulse with the conditions, the Epic badge pulses, and a confetti burst follows adding a spot, saving a forecast for offline, or sending a report.
- All motion stops when the phone has reduced motion turned on.

## Oct 11 (0.1.23)
- The Now summary adds four lines: tide height with whether it is rising or falling, water temperature with its NOAA station and distance, wind speed with the direction it blows from, and a contamination note after 0.1 inch (2.5 mm) or more of rain in the last 72 hours.
- The contamination note comes from rainfall, not a lab test. The rain section under More says the same.

## Oct 11 (0.1.22)
- Help and the user guide cover removing and merging spots.
- The new labels and messages from 0.1.20 and 0.1.21 are translated in Spanish, French, German, Portuguese (Brazil) and Italian. Help and the guide stay in English, as before.
- The remove confirmation shows the spot name on its own line.

## Oct 11 (0.1.21)
- Your spots: each spot row has a Remove button. It asks before it removes the spot, and the Undo message still appears.
- Your spots: Select spots to merge turns on a checkbox for each spot. Tick two or more, then Merge. The merge window lets you pick the name, location, beach direction and break depth from any of the ticked spots, or the average of their locations. Notes from all of them are combined, and Undo restores the spots.

## Oct 11 (0.1.20)
- Donations: a Donate link in the header (a heart only on narrow phones), in the Menu under Support Dawn Patrol, and in the footer of the spot list and the spot page. All three go to the same Venmo page.
- Dialogs no longer blur the page. The dim layer stays, but the header and the version text sit above it and stay sharp while a menu or a first-visit question is open.

## Oct 11 (0.1.19)
- **Plainer in-app text.** Several notes and labels are shorter and more direct, including the score and buoy notes, the Water and rain advice, the Help answer about the language picker, and the first-visit level choices. Facts, numbers and safety wording keep their meaning. Terms and Privacy are not changed.
- **Language answer back in Help.** The Help and FAQ and the user guide describe the language picker again. It was missing from the 0.1.18 rewrite.
- **US spelling.** color, favor, harbor and gray replace the British forms in the app and the guide.
- Translations stay with their labels when the English text changes.

## Oct 11 (0.1.18)
- **Plainer Help and FAQ.** The Help answers are rewritten in shorter, more direct language. Facts, safety wording and links are unchanged. Terms and Privacy are not changed.
- **Version numbers.** The app is pre-1.0, so releases now read 0.minor.patch. The earlier 1.x numbers were renamed to match (1.17.0 is now 0.1.17). Saved-data backups in the store keep their original names so older rollbacks still point to the right files.

## Oct 11 (0.1.17)
- **Break depth fills itself in for California spots.** The first time the app sees a California spot, it asks the nearest CDIP model point for its water depth, saves it on the spot and uses it for the surf estimate. In **Edit spot** the Break depth list shows it as "Automatic (CDIP model: about X)". Pick your own depth, or the new **Deep water (no limit)**, and yours wins. The lookup happens once per spot, ignores model points more than 2 km away, and does nothing outside California. Share links carry only a depth you picked yourself.
- **Use my location for Home.** Menu, Home now has a **Use my location** button. Your browser asks permission, and the app saves your position on the device and names the nearest town through OpenStreetMap Nominatim (the lookup uses your position rounded to about 1 km). If the name lookup fails, Home is called "Current location". Drive times work as before.
- New check: `worker/test12.mjs` (15 checks).

## Oct 11 (0.1.16)
- **Your surfing level now tailors the forecast.** Beginner, Intermediate and Advanced each get their own size curve in the surf score. Beginner favours small, gentle surf (best around 2 to 3 ft) and scores bigger hours lower. Intermediate favours medium surf and scores lower above about 8 ft. Advanced keeps the original score exactly (checked against 0.1.15.1 on 225 combinations).
- **Beginner safety cautions.** When the top of the estimated surf size is above 4 ft, Beginner gets a "Respect the ocean and your limits" banner on the Now tab, a ! on the hour grid and a note when you tap the hour, a "Caution: up to X" tag on the day cards, a warning line on the spot list and a ! on the map pin. Intermediate and Advanced show none.
- **First-visit level picker.** A window asks for your level before the site shows, and it cannot be dismissed. People who used an older version see it once, with their earlier choice preselected. New default if none is chosen: Intermediate (it was Advanced). The units question, when needed, follows it.
- The level note on the Surf size tile now flips at the same sizes (Beginner above 4 ft at the top of the range, Intermediate above 8 ft).

## Oct 11 (0.1.15.1)
- **Spot photos removed.** The Unsplash photo under each spot name, its server route (`/api/photo`), its Help entry and every mention in the Terms, Privacy and guide are gone. No spot name is sent anywhere for photos any more.
- NWS requests now identify the app with the site address in the User-Agent header, as NWS asks (there is no API key for api.weather.gov).

## Oct 11 (0.1.15)
- **Two more free forecast sources**, [WeatherAPI.com](https://www.weatherapi.com/) (swell and wind) and [Visual Crossing](https://www.visualcrossing.com/) (wind), both for the next 3 days. They only ever supplement Open-Meteo; free plans only, no paid APIs.
- **Score blend:** wind is averaged (Open-Meteo 50%, the other two 25% each, direction by vector mean). WeatherAPI.com swell takes 35% only where it agrees with Open-Meteo on direction (within 40°) and period (within 3 s). Day 4 onward, and the all-spots ranking while Open-Meteo is up, still use Open-Meteo alone.
- **Backup:** if Open-Meteo does not answer, the spot page and the spot ranking (up to 8 spots per half hour) are built from the two new sources for 3 days instead of dropping to demo data. The page says so.
- **Model comparison** gains WeatherAPI.com lines on wave height, wave period and wind, and a Visual Crossing line on wind. They count in the agreement and confidence wording.
- New Menu switch: **Check wind and swell against WeatherAPI.com and Visual Crossing** (on by default). Off means Open-Meteo only.
- Server: new `GET /api/xsrc`. Answers are cached 6 hours per 0.05° cell, with daily call budgets (Visual Crossing 900 records, WeatherAPI.com 3000 calls) and 24 uncached lookups per address per hour. The keys are Worker secrets. Attribution links are in Help, the model comparison and the docs.
- New Worker test: `worker/test10.mjs`.

## Oct 11 (0.1.14.1)
- Fixed a phone layout bug: the **Next days** row pushed the Forecast tab wider than the screen, so the whole page could be dragged sideways. The row now scrolls inside its own box and the page stays put. The Buoys section on the More tab had the same problem and is fixed too.

## Oct 11 (0.1.14)
- Share links now carry **break depth**, for one spot and for Share all. Older links still open.
- **Best spot tomorrow** appears under Best spot today, using first to last light.
- First visit: the app asks for **units** (feet or metres) with your device language as the suggestion. It is skipped if you already have spots or a saved choice.
- Server: the unused account, sync and crew endpoints were removed from the Worker. Share links, push, data routes and docs are unchanged.

## Oct 9
- Score colors: **Poor** (under 25) is brown and **Fair** (25 to 49) is a muted green halfway between that brown and **Good**, so the scale runs brown to green. Good now starts at 50 (it was 45).
- Smoldering effect on **Great** hours and days and flames on **Epic** ones, in the hour-by-hour grid and Next days. Motion settings turn them off.
- Compass: **Play** steps through the forecast hours, and each arrow is labelled with its compass heading as it moves.

## Oct 8
- Best swell directions per spot: **Edit spot** now has the 16-direction picker, so a spot can work on several directions (W and NW, or S, SW and W) instead of one. The spot header lists them, and the score, compass, map and share links use them.
- Sharing: **Share** on a spot opens a dialog with a link to copy or send; links always point at the public site and carry the beach direction and picked swell directions. **Menu, Share all as a link** shares every spot at once; the person opening it picks which to add.
- Score: swell trains are combined by energy and the size points now come from the estimated breaking height, so long-period and mixed swells get their due. Wind points scale with how much surf there is. **Is it right?** under the score lets you report what it is really like; reports shift that spot's scores. Unconfirmed beach directions are flagged.
- Map layers panel sits under the map; the NOAA chart layer uses NOAA's current Chart Display service; layers that fail to load say so.
- Streamlined app. No built-in spot list: you add your own spots with the place search or by dropping a pin. The map and **Your spots** list come first, and each spot opens one scrolling page. Rarely used sections sit under **Show more detail**, and settings moved to a **Menu**.
- Removed: ships (AIS) and aircraft (ADS-B) layers, compare, trip planner, webcams and cam links, session log and fit-for-you, favorites and home break, watchlist, morning summaries and surf alerts (old subscriptions switch themselves off), account sign-in and sync, crews, the best-window strip, the welcome tour and phone sub-tabs. The Worker no longer serves `/api/aircraft`, `/api/ships` or `/api/cams`.
- Removing a spot can be undone. Shared spot links add the spot and then clear themselves.

## Oct 5
- Ships (AIS) and aircraft (ADS-B) map layers: toggles, tap-for-details card, nearby list, legend, dead-reckoned motion between updates. Aircraft read from adsb.lol, with a direct browser fallback when the Worker is rate-limited. Ships need an aisstream.io key (`AISSTREAM_KEY`).
- Removed a legacy `workers.dev` fallback host from the client.
- Documentation and source published on the site at /docs/ and /source/. Help has a link.
- Repository prepared with documentation, tests and CI.

## Oct 2
- Tide graphs for every location, now and up to 14 days ahead (NOAA predictions or model sea level).
- Windows PowerShell launcher and Electron desktop wrapper.

## Oct 1
- Phone sub-tabs, multiple swell directions per spot, Report-a-problem log, smoke test and crawler.
- Marine and weather requests extended to 14 days; PacIOOS, CDIP, NWS grid, ensemble confidence, beach water quality, wave spectra, rip-risk periods.
- Accounts, encrypted sync and backup, crews, push alerts, offline mode.
