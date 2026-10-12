# Deployment

Dawn Patrol runs as one Cloudflare Worker and one KV namespace. You need a Cloudflare account, plus a zone on it if you want your own domain.

## 1. One-time setup

1. **KV namespace.** Create a namespace (for example `dawn-patrol-site`).
2. **Worker.** Create a Worker named `dawn-patrol` from `worker/index.js` (module format, entry `index.js`).
   - Binding: KV namespace → variable name `SITE`.
   - Cron trigger: `0 * * * *` (hourly: sends the algae bloom push when a new bloom is flagged).
3. **Domain.** Add a custom domain or route (for example `dawnpatrol.example.org`) and disable the `workers.dev` address if you do not want it public.
4. **Client host.** Set `API_HOSTS` in `src/37-services.js` to your domain.
5. **Report-a-problem address.** Set `REPORT_TO` in `src/60-app.js` to the email that should receive problem reports (and update the matching assertion in `tests/test_report.py`).
6. **Secrets (all optional).**

| Secret | Used for | How to get it |
|---|---|---|
| `MAIL_API_KEY`, `MAIL_FROM` | Password-reset email | Your email API provider |

Without a key, that feature stays off. Everything else still works.

## 2. Build and publish the site files

```bash
bash build.sh        # dist/dawn-patrol.html
python3 split.py     # cf/*.js, cf/index.html, cf/style.css, cf/sw.js, cf/manifest.webmanifest + hashes
```

Write each file into KV under its name:

| KV key | Source |
|---|---|
| `index.html`, `style.css`, `data.js`, `map.js`, `charts.js`, `app.js`, `sw.js`, `manifest.webmanifest` | `cf/` |
| `windows/DawnPatrol.ps1`, `windows/index.html` | `windows/` |

Icons are stored in KV as **base64 text** under `icon-192.png` and `icon-512.png` (the Worker decodes them; the maskable and Apple icons reuse those two). Create them from `pwa/`:

```bash
base64 -w0 pwa/icon-192.png > /tmp/i192 && curl -X PUT ".../values/icon-192.png" -H "Authorization: Bearer $TOKEN" -H "Content-Type: text/plain" --data-binary @/tmp/i192
```

Using the Cloudflare API:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/storage/kv/namespaces/$NS/values/app.js" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: text/plain" --data-binary @cf/app.js
```

## 3. Updating

Small changes can ship as **line patches** instead of whole files:

```bash
python3 tools/mkpatch2.py cf_base cf app.js map.js    # writes patch3.json
```

`cf_base/` is a copy of what is currently deployed. Each patch entry is `{"o": [[start, end, text]], "p": preHash, "s": postHash}`: replace lines `start..end` with `text`. A deploy script should (a) read the live KV value, (b) check its hash equals `p`, (c) splice, (d) check the result equals `s`, and only then (e) write. A hash mismatch means the live file changed since you last looked, so stop and check. After a successful deploy copy `cf/*` to `cf_base/`.

Worker updates work the same way with `tools/mkwpatch.py old.js new.js`. When you upload a Worker, keep existing secrets (`keep_bindings: ["secret_text"]`) and re-check that the `SITE` binding and cron survived.

## 4. Publish the docs and source (optional)

The Worker serves `/docs/` and `/source/` from KV keys under `repo/`. Write every repository file to `repo/<path>` (for example `repo/README.md`, `repo/docs/API.md`, `repo/src/60-app.js`). Skip `dist/`, `cf/` and binary files. Remove the route in `worker/index.js` (the `docs`/`source` branch before the `FILES` check) if you do not want them public.

## 5. Verify

- `/docs/` and `/source/` load (if published).
- Open the site; the status chip should read LIVE.
- `GET /api/buoys?lat=33.65&lon=-118`, `/api/tides?lat=33.65&lon=-118` and `/api/facing?lat=33.65&lon=-118` return JSON.
- Compare `python3 split.py` hashes with `sha256sum` of the live files (first 16 hex characters).

## Rollback

Keep the previous `cf/` folder (or `cf_base/`). Re-PUT the old files. Service workers refresh on the next load.

## Extra weather source keys

`VISUALCROSSING_KEY` and `WEATHERAPI_KEY` are Worker secrets (Workers > dawn-patrol > Settings > Variables and Secrets, or the Workers secrets API). Use free-plan keys only. Without a key the matching source is skipped and `/api/xsrc` reports it as not configured; the app carries on with Open-Meteo. Never write the keys into a file in this repository.
