# Testing

There are two kinds of tests. Run both from the repository root.

## Worker unit tests (Node, no install)

```bash
node worker/test7.mjs   # removed account, sync and crew routes stay gone; share links; push key and subscribe
node worker/test8.mjs   # routing basics: CORS preflight, refused methods, unknown routes, file allowlist and cache headers
node worker/test15.mjs  # Scripps Pier algae report: CSV parsing, bloom levels, stale data, alert wording, and the wiring in the Worker, app and service worker (reads src/ from the repo folder)
node worker/test14.mjs  # Source menu: right-click and long-press wiring, links per section and chart, free providers only, no network calls of its own (reads src/ from the repo folder; does not open a browser)
node worker/test13.mjs  # accessibility: color-blind palette and patterns, easier font, spacing, Read aloud (numbers only, no network), chart sound (reads src/ from the repo folder; does not play audio)
node worker/test12.mjs  # break depth default (CDIP) and Use my location: who wins between own, deep-water and automatic depth, California-only lookups, once per spot (reads src/ from the repo folder)
node worker/test11.mjs  # surfing level: Advanced keeps the original scores, Beginner and Intermediate fall as the surf grows, the 4 ft Beginner limit (reads src/ from the repo folder)
node worker/test10.mjs  # extra weather sources (/api/xsrc): normalising, 6-hour cache, daily budgets, address limit, missing keys
node worker/test9.mjs   # PacIOOS, CDIP, ensemble, spectra, SRF, water quality
node worker/test_docs.mjs      # /docs and /source routes, path safety (reads files from the repo folder)
```

They import `worker/index.js`, mock `fetch`, `caches` and KV, and print `ALL OK` when everything passes.

## Browser suites (Python and Playwright)

```bash
pip install playwright
playwright install chromium
bash build.sh          # tests load dist/dawn-patrol.html from disk
python3 tests/test_app.py
```

`tests/harness.py` marks the surfing-level picker as answered (`dp.lvlask`), so the first-visit window does not cover the page. `tests/harness.py` is the shared harness: it mocks Open-Meteo (marine, weather, geocoding, air quality), NOAA, the Worker routes and tile servers, so suites run offline and deterministically. `run(label, fn=..., vw=(w, h), ls={...}, hash=...)` opens the built page; `ls` seeds local storage (for example saved pins) before the app starts. Suites import the harness with `exec`, so run them from the repository root.

| Suite | Covers |
|---|---|
| `test_app` | The whole streamlined app: empty start, dropping a pin, place search, the spot list, the spot page and Show more detail, Edit spot with Undo, the settings menu (units, dark mode, level, accessibility, export and import, help, problem reports), map layers and playback, desktop layout editing, old saved data, shared links and the 24-spot limit. Also checks that removed features (preset spots, ships, aircraft, compare, trips, log, sync, alerts) are gone. |
| `test_tide` | Tide graphs today and ahead, NOAA and model sources, keyboard reading |
| `test_swin` | Swell directions per spot and how they change the score |
| `test_report` | Report-a-problem log, download and email |

A suite prints `PASS`/`FAIL` lines. **The exit code is always 0**, so check for failures with:

```bash
grep "^FAIL " suite_*.out
```

### Everything

```bash
bash tests/run_all.sh     # about 10 minutes on 2 CPUs; writes suite_*.out and suites.log
```

Run suites one at a time. They use a lot of CPU, and running them in parallel causes timing flakes.

### Known flakes

Tests that reload the page (“persists after reload”) can fail under load, because the app takes a few seconds to reach LIVE mode. Run the suite again on its own before you treat it as a regression.

### Crawler

`tools/crawl.py <persona>` clicks through the map, the spot page (with more detail open) and the settings menu as one of several personas (phone, empty phone, desktop dark and metric, large text, offline, API errors, tablet) and records errors, overflow and layout problems to `crawl_<persona>.json`.

## Adding a test

Copy the shape of `tests/test_tide.py`: `exec` the harness, define `ok(cond, message)`, write `t(page)` that drives the UI, and finish with `run('name', fn=t)`. Add mock branches for new `/api/...` routes in the `bh` handler in `tests/harness.py`.
