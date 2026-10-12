# API reference

Every route is served by the Worker on the same origin as the site. Responses are JSON with `access-control-allow-origin: *`. Errors return `{ "error": "..." }` with an HTTP status. When a feature needs a key or doesn’t cover a place, the response is `200` with `{ "supported": false, "reason": "..." }`.

“Cache” is the `cache-control` max-age the Worker sends. It also keeps upstream calls low.

## Conditions and data

| Route | Query | Returns | Cache |
|---|---|---|---|
| `GET /api/buoys` | `lat`, `lon`, `n` (1-12, default 8) | Nearest NDBC stations within 600 km, with distance. | 10 min |
| `GET /api/buoy/<id>` | `days` (1-5) | Standard and spectral observations for one NDBC station. 404 if there’s no recent data. | 5 min |
| `GET /api/spectra/<id>` | | Wave energy by frequency and direction, with 24 h of history (NDBC `.data_spec`, `.swdir`). | |
| `GET /api/nws` | `lat`, `lon`, `face`, `debug` | NWS marine forecast and surf zone forecast, with rip risk by period. | 5 min |
| `GET /api/nwsgrid` | `lat`, `lon`, `face` | NWS gridpoint wave forecast (steps offshore to a wave cell). | |
| `GET /api/cdip` | `lat`, `lon` | CDIP MOP nearshore forecast (Hs, Tp, Dp) from the finest grid, plus the model point’s water depth. | |
| `GET /api/pacioos` | `lat`, `lon` | Hawaii SWAN and WaveWatch III grids via ERDDAP. `supported:false` outside Hawaii. | 15 min |
| `GET /api/ensemble` | `lat`, `lon` | ECMWF IFS and GFS ensemble wind p10/p50/p90 and rain probability out to 14 days. | |
| `GET /api/beachwq` | `lat`, `lon` | Nearest California Beach Watch station and its latest postings. | 30 min |
| `GET /api/sccoos` | `lat`, `lon` | Latest weekly Scripps Pier sample (CalHABMAP, from SCCOOS ERDDAP): water temperature, salinity, chlorophyll, algae counts, domoic acid, bloom flags and 12 weeks of history. `supported:false` farther than 60 km from the pier. | 30 min; source rows cached 3 h |
| `GET /api/sccoos/alert` | none | Title and body text for the algae bloom push (status `bloom`, `ok` or `stale`). | 5 min |
| `GET /api/xsrc` | `lat`, `lon` (both required) | WeatherAPI.com swell, wave and wind, and Visual Crossing wind, for 3 days, as UTC-epoch hourly arrays (metres, seconds, km/h, degrees), plus attribution links. Rounded to a 0.05 degree cell. A vendor that is missing, over its daily budget or down returns `{ ok: false, reason }`. `supported:false` if neither answers. | 15 min (server cache 6 h) |
| `GET /api/models` | `lat`, `lon` | Multi-model wave comparison. | 15 min |
| `GET /api/tides` | `lat`, `lon` | NOAA CO-OPS station and high/low predictions (about 15 days). | 10 min |
| `GET /api/drive` | `from` (`lat,lon`), `to` (up to 24 `lat,lon` pairs joined with a vertical bar) | Driving minutes and kilometres from one origin to each spot, from the public OSRM routing server. Nothing is stored. | 15 min |
| `GET /api/facing` | `lat`, `lon` | Beach facing in degrees, from the nearest OpenStreetMap coastline within 2.5 km. | 1 h |
| `GET /api/spots` | `lat`, `lon`, `r` (5-80 km) | Named surf spots from OpenStreetMap. The current app doesn’t use this, since it keeps its own spot list. | 1 h |

## Legacy: shares and alerts

The current app no longer syncs or sends alerts from the server. These routes stay so older installed copies keep working. The account (`/api/auth/*`), sync (`/api/sync`) and crew (`/api/crew`) routes were removed in 0.1.14 and now answer 404 or 405. The current app calls `/api/push/key`, `/subscribe`, `/unsubscribe` and `/ping` for the algae bloom alert only (`subscribe` takes `{ endpoint, bloom: true }`; a subscription without `bloom` is deleted by the hourly job). `/api/push/alerts` is unused.

| Route | Method | Purpose |
|---|---|---|
| `/api/share`, `/api/share/...` | | Share links for a spot or a list. |
| `/api/push/key`, `/subscribe`, `/unsubscribe`, `/alerts`, `/ping` | | Web Push subscriptions. Used for algae bloom alerts. `ping` sends a test push. |

## Docs and source (public)

| Route | Returns |
|---|---|
| `GET /docs/` | The docs index, rendered as a page. |
| `GET /docs/<NAME>` | One document, rendered: `ARCHITECTURE`, `DEPLOYMENT`, `API`, `DATA_SOURCES`, `TESTING`, `USER_GUIDE`, `WINDOWS`, `CONTRIBUTING`, `SECURITY`, `CHANGELOG`, `TERMS`, `PRIVACY`. |
| `GET /terms`, `GET /privacy` | The Terms of Service and the Privacy Policy, the same pages as `/docs/TERMS` and `/docs/PRIVACY`. |
| `GET /source/` | An index of every source file. |
| `GET /source/<path>` | One file as plain text, for example `/source/src/60-app.js`. |

The files are KV values under the prefix `repo/`. The page renderer is a small Markdown converter that runs in the browser, inside the Worker (`docPage`).

## Static files

`GET /`, `/index.html`, `/style.css`, `/data.js`, `/map.js`, `/charts.js`, `/app.js`, `/sw.js`, `/manifest.webmanifest`, `/icon-192.png`, `/icon-512.png`, `/windows/DawnPatrol.ps1`, `/windows/index.html`.

## Scheduled

The hourly cron (`0 * * * *`) runs `pushTick`. It reads the Scripps Pier summary (KV `hab:v1`, refreshed at most every 3 hours). When the summary shows a bloom whose flag set differs from KV `hab:alerted`, it sends one empty push to every `sub:` record with `bloom: true`, removes subscriptions the push service reports gone (404 or 410), and stores the new flag set. When the bloom clears, `hab:alerted` is deleted so the next bloom alerts again. Any `sub:` record without `bloom` (left from the retired surf alerts) is deleted.

Removed on Oct 8: `/api/aircraft`, `/api/ships` and `/api/cams`.
