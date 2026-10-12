# Contributing

Thanks for helping. This is a small project with a deliberately simple toolchain.

## Setup

```bash
bash build.sh                 # build dist/dawn-patrol.html
python3 split.py              # (optional) write the served files to cf/ and print hashes
```

Node 18+ and Python 3.10+ are enough for the build. Tests need Playwright (`pip install playwright && playwright install chromium`).

## Ground rules

- **No frameworks and no runtime dependencies.** Source is plain JS in `src/`, concatenated in the order listed in `build.sh`. A new module needs a number prefix and entries in both `build.sh` and `split.py`. `split.py` asserts the split files add up to the built script.
- **Open data only.** Do not add scrapers or undocumented endpoints of commercial forecast services. Check each source's terms and add it to `docs/DATA_SOURCES.md`.
- **Do not add donations or tips.** The project owner has ruled this out.
- **Plain language in the UI.** Sentence case, active voice, errors that say what to do. Respect units (imperial and metric), dark mode, reduced motion and keyboard use. Touch targets at least 36 px.
- **Every feature needs a test** and a Help/FAQ entry in `src/60-app.js`, plus a section in `docs/USER_GUIDE.md`.
- **Never commit secrets.** Keys live in Worker secrets, not in source.

## Workflow

1. Edit `src/` (and `worker/index.js` for API changes).
2. `bash build.sh` and open `dist/dawn-patrol.html`.
3. Run the relevant suites (see `docs/TESTING.md`). Run the full set before a release.
4. Update `CHANGELOG.md` and docs.
5. Open a pull request describing what changed and how you tested it.

## Element ids

The page is one document, so ids are global. Search `src/` for an id before adding one (a past collision between two `tr-list` ids broke the Trips tests).
