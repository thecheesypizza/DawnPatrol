# Data sources

Everything here is open or free-tier. Please follow each provider’s terms and rate limits. The Worker caches responses so we don’t lean on anyone too hard.

| Data | Source | Used for | Notes |
|---|---|---|---|
| Waves, swell, sea temperature, sea level | [Open-Meteo Marine](https://open-meteo.com) | Core forecast, tide model fallback | Free for non-commercial use. |
| Wind, air, rain, UV, cloud | Open-Meteo Forecast | Core forecast | Called from the browser. |
| Wind and swell, next 3 days | [WeatherAPI.com](https://www.weatherapi.com/) marine | Score blend, backup, model comparison | Free plan, called through the Worker (`/api/xsrc`), cached 6 hours. Attribution required. The free plan’s marine data may be smaller than the trial the key started on, so the app works with missing fields. |
| Wind, next 3 days | [Visual Crossing](https://www.visualcrossing.com/) Timeline | Score blend, backup, model comparison | Free plan: 1,000 records a day, so the Worker budgets 900 and caches 6 hours. The free terms require attribution and don’t allow sharing the data outside the app. The app shows a link and uses the data only for your own forecast. |
| Wind and rain confidence | Open-Meteo Ensemble (ECMWF IFS 0.25, GFS 0.25) | Confidence band | No wave variables, so wave confidence comes from the wave models instead. |
| Air quality | Open-Meteo Air Quality | Comfort and air card | |
| Tide predictions | NOAA CO-OPS | Tide graph, tide scoring | US stations. Elsewhere the model sea level is used. |
| Buoys and spectra | NOAA NDBC (incl. CDIP buoys) | Nearest buoy, spectra | |
| Marine and surf zone forecast, grids | NOAA NWS (api.weather.gov) | Forecast lines, rip risk by period | US only. No API key. NWS asks for a User-Agent that names the app, which the Worker sends as `DawnPatrol/1.15 (https://dawnpatrol.casadelfuego.org)`. |
| Nearshore forecast and water depth | CDIP MOP (THREDDS OPeNDAP) | Model comparison; default break depth for California spots | California and other CDIP grids. The depth is the water depth at the model point, read once per spot. |
| Hawaii wave models | PacIOOS SWAN and WaveWatch III via ERDDAP | Model comparison | University of Hawaii. |
| Beach water quality | California Beach Watch via data.ca.gov | Water quality card | Batch dataset. The app shows a “data through” date. |
| Algae and water samples | CalHABMAP weekly pier samples via SCCOOS ERDDAP, Scripps Pier | Water and rain card, Water tile detail, bloom banner and alert | Free, no key. Credit: CalHABMAP and SCCOOS (Scripps Institution of Oceanography). Spots within 60 km of the pier only. Lab counts lag the temperature by a week or more. |
| Coastline | OpenStreetMap via Overpass | Beach facing for each pin | Attribution: OpenStreetMap contributors. |
| Map tiles | OpenStreetMap-based and Esri / CARTO basemaps, NOAA nautical charts, OpenSeaMap | Map | Tile usage policies apply. |
| Place search | Open-Meteo Geocoding | Search a beach or town | Called from the browser. |
| Town name for your location | OpenStreetMap Nominatim (reverse) | Names Home when you tap Use my location | Called from the browser, one request, with your position rounded to about 1 km. Attribution: OpenStreetMap contributors. |
| Satellite and clouds | NASA GIBS, GOES imagery | Map layers | |
| Radar | RainViewer | Map layer | |
| Sun | NOAA solar equations, computed on your device | Dawn to dusk, twilight | |

## Not used, on purpose

**Surfline.** Their terms ban robots, scrapers and automated extraction, and their forecast endpoints aren’t documented. Dawn Patrol doesn’t use them. The open sources above cover the same ground.

**AccuWeather and other paid weather APIs.** Dawn Patrol uses free sources only, by decision. Paid tiers are out of scope.

**Vaisala Xweather.** Tried in 0.1.31 with the free 15,000-a-month key. Every request, including the plainest one, came back as an internal error (HTTP 500) with no data, so it was removed. It can be revisited if the key starts to work.

## Ideas not built

- Fresher California water quality outside San Diego, from county feeds or Safe to Swim. The Scripps Pier algae report covers San Diego County.
- Stormglass or Copernicus Marine, if a paid or registered source is acceptable.
