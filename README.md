# Dawn Patrol

A surf forecast web app (PWA) for the spots you choose. It reads open marine and weather models, buoys and tides, then scores each of your spots from 0 to 100 for every hour and picks the best daylight windows.

Live site: <https://dawnpatrol.casadelfuego.org>
Docs and source, read online: <https://dawnpatrol.casadelfuego.org/docs/> and <https://dawnpatrol.casadelfuego.org/source/>

Dawn Patrol is a static front end plus one Cloudflare Worker. It has no build framework and no runtime dependencies. The app is plain HTML, CSS and JavaScript, put together by a small shell script.

## Features

- **Your spots only**: there is no built-in spot list. Search for a beach or town, or tap **Drop pin** and tap the water. The app reads which way the beach faces from the coastline. Up to 24 spots, kept on the device.
- **Map and list**: your pins on a map with a live score on each one, and a list sorted by score. **Map layers** holds map styles, seamarks, rain radar, satellite and sea-temperature layers, and a forecast playback for your pins.
- **One page per spot**: score and summary, alerts and the NWS surf zone forecast, conditions right now with an estimated surf size, the tide graph, the next days, an hour-by-hour planner and swell and wind charts.
- **Show more detail**: compass and swell directions, nearest buoy, swell arrival, water quality and rain, crowd estimate, forecast confidence, your notes, timelapse and day replay, every hourly chart or a table, forecast accuracy, model comparison and buoy spectra.
- **Settings menu**: units, dark mode, surfing level, export and import, offline saving, accessibility, page layout (on a computer), install, help and problem reports.
- **Offline and install**: service worker, web manifest, "Add to Home Screen", saved forecasts when offline.
- **Windows**: PowerShell launcher and an Electron wrapper (see [docs/WINDOWS.md](docs/WINDOWS.md)).

User-facing help is in [docs/USER_GUIDE.md](docs/USER_GUIDE.md) and inside the app (Menu, then Help and FAQ).

## Repository layout

| Path | What it is |
|---|---|
| `src/` | App source: numbered JS modules, HTML head and body, service worker. Concatenated by `build.sh`. |
| `build.sh` | Builds the single-file app into `dist/dawn-patrol.html`. |
| `split.py` | Splits the built page into the files the Worker serves (`cf/`), and prints each file's hash. |
| `worker/index.js` | The Cloudflare Worker: static file server, API proxy and cache, hourly cron, public docs and source pages. It still answers the share-link and Web Push endpoints that older versions of the app used. The account, sync and crew endpoints were removed in 0.1.14. |
| `pwa/` | Icons and web manifest. |
| `windows/` | PowerShell launcher, landing page and Electron desktop wrapper. |
| `tests/` | Browser test suites (Python and Playwright). |
| `worker/test*.mjs` | Worker unit tests (Node, no dependencies). |
| `tools/` | Patch builders used for deploys, and the page crawler. |
| `docs/` | Architecture, deployment, API, data sources, testing, user guide. |

## Quick start

Requirements: bash, Python 3.10+, Node 18+ (Node 20 recommended).

```bash
bash build.sh          # writes dist/dawn-patrol.html
open dist/dawn-patrol.html   # or just open the file in a browser
```

The built file opens straight from disk. If no Worker can be reached, it falls back to clearly labelled **demo data**, so you can try every screen offline.

To run everything locally against the real API, deploy the Worker (below) and point `API_HOSTS` in `src/37-services.js` at it.

## Deploy to Cloudflare

Short version (full steps in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)):

1. Create a KV namespace and bind it to the Worker as `SITE`.
2. Upload `worker/index.js` as a module Worker with that binding and an hourly cron (`0 * * * *`).
3. `bash build.sh && python3 split.py`, then write each file in `cf/` into KV under its file name (`index.html`, `app.js`, `data.js`, `map.js`, `charts.js`, `style.css`, `sw.js`, `manifest.webmanifest`), plus `windows/DawnPatrol.ps1` and `windows/index.html`.
4. Secret: `WINDY_KEY` (the Windy API key for extra model data). The mail secrets used by the removed account endpoints are no longer read.

## Tests

```bash
node worker/test7.mjs && node worker/test8.mjs && node worker/test9.mjs && node worker/test_docs.mjs
pip install playwright && playwright install chromium
bash build.sh && python3 tests/test_app.py
bash tests/run_all.sh        # everything, about 10 minutes
```

See [docs/TESTING.md](docs/TESTING.md).

## Data sources

Every source is open or on a free tier. The app does not scrape commercial forecast sites. The list, with licences and rate-limit notes, is in [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md). In short: Open-Meteo (marine, weather, ensemble, air quality), WeatherAPI.com and Visual Crossing (extra 3-day wind and swell, free plans only), NOAA (CO-OPS tides, NDBC buoys, NWS grids and surf zone forecast), CDIP, PacIOOS, NASA GIBS, RainViewer and OpenStreetMap-based tiles.

## Safety

Forecasts are a guide, not a safety guarantee. Rips, hazards, closures and your own ability matter more than any number.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Deployment](docs/DEPLOYMENT.md)
- [API reference](docs/API.md)
- [Data sources](docs/DATA_SOURCES.md)
- [Testing](docs/TESTING.md)
- [User guide and FAQ](docs/USER_GUIDE.md)
- [Windows apps](docs/WINDOWS.md)
- [Contributing](CONTRIBUTING.md), [Security](SECURITY.md), [Changelog](CHANGELOG.md)

## License

MIT. See [LICENSE](LICENSE). Third-party data keeps its own terms; see the data sources doc.
