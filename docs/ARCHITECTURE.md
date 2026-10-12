# Architecture

```
 Browser (PWA)                          Cloudflare                         Upstream
 ┌────────────────────┐   /api/*      ┌─────────────────────┐   fetch   ┌───────────────────────┐
 │ index.html         │──────────────▶│ Worker (index.js)   │──────────▶│ NOAA CO-OPS, NDBC, NWS │
 │ style.css          │               │  - static files     │           │ CDIP, PacIOOS          │
 │ data.js map.js     │◀──────────────│  - API proxy+cache  │◀──────────│ Open-Meteo (+ensemble) │
 │ charts.js app.js   │   JSON        │  - docs and source  │           │ data.ca.gov            │
 │ sw.js (offline)    │               │  - hourly cron      │           │ OpenStreetMap (facing) │
 └─────────┬──────────┘               └──────────┬──────────┘           └───────────────────────┘
           │ direct (no key)                      │ KV namespace "SITE"
           ▼                                      ▼
   Open-Meteo, map tiles,                 site files, cached station lists,
   RainViewer, NASA GIBS                  share and push records
```

## Front end

The page is one HTML document. `build.sh` joins these files in order:

| File | Responsibility |
|---|---|
| `10-head.html`, `20-body.html` | Markup and all CSS (themes, layout, components). |
| `05-log.js` | On-device problem log (errors, failed requests, recent taps). |
| `30-data.js` | Units, scoring model, model requests, synthetic demo data. There is no spot catalogue: every spot is a pin the person adds. |
| `35-coast.js` | Coastline-based beach facing. |
| `37-services.js` | `apiGet` (tries each host in `API_HOSTS`), tide prediction helpers. |
| `38-me.js` | Surf size estimate, gear hints, tide and size preferences, calendar export, share links. |
| `39-tides.js` | Tide curve model: NOAA hi/lo interpolation or hourly model sea level. |
| `40-map.js` | `SurfMap`: custom Web Mercator slippy map (tiles, canvas grid, flow field, markers). |
| `50-charts.js` | SVG chart builders. |
| `60-app.js` | State (`S`), the map and spot list, the spot page, the settings menu, export and import, layout editing, help and accessibility. |

`split.py` cuts the built page into the files the Worker serves, so the browser can cache `data.js`, `map.js`, `charts.js` and `app.js` separately. It checks that the split matches the original script.

### Screens

There are two views. `home` is the search box, the map with **Drop pin** and **Map layers**, and the **Your spots** list. `spot` is one page for the selected spot, built from four section containers: `#tab-now` and `#tab-forecast` hold the essentials, and `#tab-xnow` and `#tab-xfc` hold the extra sections, which are only built (and only fetch their data) after **Show more detail** is opened. On a phone the two views take turns and the back button returns to the map; on a computer they sit side by side. Settings live in a menu sheet (`#menu`).

### Modes

On load, the app opens the selected spot. With no spots, it makes one small open-ocean request. `S.mode` is `live`, `offline` (saved forecasts) or `demo` (synthetic numbers, labelled). Features that need the network (radar, satellite layers) say so when not live.

### Scoring

Each hour gets a score from 0 to 100. It’s based on swell size, period and direction, compared with the spot’s facing and swell windows, plus wind speed and direction (offshore is best) and the tide and size preferences you set for the spot. Daylight windows come from NOAA solar equations, worked out on the device.

### Tides

`tideModelFor(D)` picks NOAA hilo predictions (half-cosine between extremes) when a CO-OPS station is near, otherwise Open-Meteo `sea_level_height_msl` with Hermite interpolation and parabola extrema. The same model feeds the spot page tide graph, Tides ahead and the score strip.

## Worker

`worker/index.js` is a single ES module with `fetch` and `scheduled` handlers.

- **Static files**: an allowlist `FILES` is served from KV with a `TYPES` map.
- **API**: each route fetches, normalises and caches upstream data (`cacheTtl`, `cache-control` per route). CORS is open for GET.
- **Legacy endpoints**: shares (`sh:`) and Web Push (`vapid:keys`, hourly `pushTick`) are still served for older copies of the app. The account, sync and crew endpoints were removed in 0.1.14. The current app uses the push routes only for the algae bloom alert, and `stopOldPush` still switches off any subscription that is not a bloom subscription.

## Offline

`sw.js` precaches the shell and serves it cache-first with network refresh. A push (only the algae bloom alert is sent) is answered by fetching `/api/sccoos/alert` and showing that text; the cache name is `dp-shell-v3`. The app also saves the latest forecast per spot (`offlineSave`) so Offline mode can show it.

## Why KV and not Pages

The site and API share one Worker, one domain and one deploy path. Static files are small key/value reads, and a deploy is a handful of KV writes plus, now and then, a Worker upload.

## Extra weather sources (0.1.15)

`GET /api/xsrc?lat&lon` in the Worker asks WeatherAPI.com (marine, 3 days) and Visual Crossing (timeline, today plus 2 days, hourly) and returns one normalised object: UTC-epoch `t` arrays with wave height, swell height, period and direction (WeatherAPI.com) and wind speed (km/h), gusts and direction (both). The point is rounded to a 0.05 degree cell and cached in KV for 6 hours (15 minutes if only one vendor answered). Budgets are counted in KV: Visual Crossing 80 records per fetch against 900 a day, WeatherAPI.com 3000 calls a day, and 24 uncached lookups per address per hour. The keys are Worker secrets (`VISUALCROSSING_KEY`, `WEATHERAPI_KEY`); keys never leave the Worker.

In the app (`30-data.js`): `loadDetail` fetches `/api/xsrc` in parallel with Open-Meteo, then `blendXsrc` edits the aligned hourly set in place (wind 50/25/25 weighted mean with vector-mean direction; swell 65/35 only where direction is within 40 degrees and period within 3 s). If Open-Meteo fails, `xsrcWxOM` and `xsrcMarineOM` build Open-Meteo-shaped stand-ins so the rest of the app is unchanged, and `scanBackup` does the same for the ranking, for up to 8 spots per half hour. The Menu switch is the local-storage key `xsrc` (default on). `mountModels` adds the extra lines to the model comparison.
