const TYPES = { html: "text/html; charset=utf-8", css: "text/css; charset=utf-8", js: "text/javascript; charset=utf-8", webmanifest: "application/manifest+json", png: "image/png", ps1: "text/plain; charset=utf-8" };
const FILES = new Set(["index.html", "style.css", "data.js", "map.js", "charts.js", "app.js", "sw.js", "manifest.webmanifest", "windows/DawnPatrol.ps1", "windows/index.html"]);
const ICONS = { "icon-192.png": "icon-192.png", "icon-512.png": "icon-512.png", "icon-maskable-512.png": "icon-512.png", "apple-touch-icon.png": "icon-192.png" };
const CORS = { "access-control-allow-origin": "*", "access-control-allow-methods": "GET, HEAD, POST, PUT, OPTIONS", "access-control-allow-headers": "authorization, content-type" };
const NDBC = "https://www.ndbc.noaa.gov";
const UA = { "user-agent": "DawnPatrol/1.0 (personal surf forecast app)" };
const COMPASS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

const json = (obj, status = 200, ttl = 300) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=" + ttl, ...CORS } });
const num = s => (s == null || s === "" || s === "MM" || !isFinite(+s) ? null : +s);
const cdeg = s => { const i = COMPASS.indexOf(s); return i < 0 ? null : i * 22.5; };
const unesc = s => String(s || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (m, c) => String.fromCharCode(+c));
const rad = d => d * Math.PI / 180;
const hav = (a, b, c, d) => { const x = Math.sin(rad(c - a) / 2) ** 2 + Math.cos(rad(a)) * Math.cos(rad(c)) * Math.sin(rad(d - b) / 2) ** 2; return 12742 * Math.asin(Math.min(1, Math.sqrt(x))); };

export function parseStations(xml) {
  const out = [];
  for (const m of xml.matchAll(/<station\s+([^>]*?)\/?>/g)) {
    const a = {};
    for (const kv of m[1].matchAll(/(\w+)="([^"]*)"/g)) a[kv[1]] = kv[2];
    if (!a.id || a.type === "dart" || !isFinite(+a.lat) || !isFinite(+a.lon)) continue;
    out.push({ id: a.id, name: unesc(a.name) || a.id, lat: +a.lat, lon: +a.lon, type: a.type || "", owner: unesc(a.owner), met: a.met === "y" });
  }
  return out;
}

export function parseTable(txt, days, mapper) {
  let cols = null; const rows = []; let newest = null;
  for (const ln of txt.split("\n")) {
    if (!ln.trim()) continue;
    if (ln[0] === "#") { if (!cols && /YY/.test(ln)) cols = ln.slice(1).trim().split(/\s+/); continue; }
    if (!cols) continue;
    const f = ln.trim().split(/\s+/); if (f.length < 6) continue;
    const r = {}; cols.forEach((c, i) => { r[c] = f[i]; });
    let yy = +r.YY; if (yy < 100) yy += 2000;
    const t = Date.UTC(yy, +r.MM - 1, +r.DD, +r.hh, +r.mm) / 1000; if (!isFinite(t)) continue;
    if (newest == null) newest = t;
    if (t < newest - days * 86400) break;
    rows.push([t, mapper(r)]);
  }
  rows.reverse();
  return rows;
}

const STD = { wdir: "WDIR", wspd: "WSPD", gst: "GST", wvht: "WVHT", dpd: "DPD", apd: "APD", mwd: "MWD", pres: "PRES", atmp: "ATMP", wtmp: "WTMP", dewp: "DEWP", vis: "VIS", ptdy: "PTDY", tide: "TIDE" };
export function columnsStd(txt, days) {
  const rows = parseTable(txt, days, r => { const o = {}; for (const k in STD) o[k] = num(r[STD[k]]); return o; });
  const out = { t: rows.map(x => x[0]) }; for (const k in STD) out[k] = rows.map(x => x[1][k]);
  return out;
}
export function columnsSpec(txt, days) {
  const rows = parseTable(txt, days, r => ({ swh: num(r.SwH), swp: num(r.SwP), swd: cdeg(r.SwD), wwh: num(r.WWH), wwp: num(r.WWP), wwd: cdeg(r.WWD), steep: r.STEEPNESS && r.STEEPNESS !== "MM" ? r.STEEPNESS : null }));
  const out = { t: rows.map(x => x[0]) }; for (const k of ["swh", "swp", "swd", "wwh", "wwp", "wwd", "steep"]) out[k] = rows.map(x => x[1][k]);
  return out;
}

async function getText(url, ttl) {
  const r = await fetch(url, { headers: UA, cf: { cacheTtl: ttl, cacheEverything: true } });
  if (!r.ok) { const e = new Error("NDBC " + r.status); e.status = r.status; throw e; }
  return r.text();
}


const rad2 = d => d * Math.PI / 180;
const deg = r => r * 180 / Math.PI;
const NWS = "https://api.weather.gov";
const NWS_UA = { "user-agent": "DawnPatrol/0.1.25 (https://dawnpatrol.casadelfuego.org)", "accept": "application/geo+json" };
const OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
const COOPS = "https://api.tidesandcurrents.noaa.gov";

async function getJson(url, ttl, headers, timeoutMs) {
  const r = await fetch(url, { headers: headers || UA, cf: { cacheTtl: ttl, cacheEverything: true }, signal: AbortSignal.timeout(timeoutMs || 15000) });
  if (!r.ok) { const e = new Error(new URL(url).host + " " + r.status); e.status = r.status; throw e; }
  return r.json();
}
async function overpass(query, ttl) {
  let err = null;
  for (const base of OVERPASS) {
    try { return await getJson(base + "?data=" + encodeURIComponent(query), ttl, UA, 12000); } catch (e) { err = e; }
  }
  throw err || new Error("Overpass unavailable");
}

/* ---------- beach direction from the OSM coastline (water is on the right of the way) ---------- */
export function facingFromWays(lat, lon, ways) {
  const kx = 111320 * Math.cos(rad2(lat)), ky = 110540, segs = [];
  for (const w of ways || []) {
    const g = w.geometry; if (!g || g.length < 2) continue;
    for (let i = 0; i < g.length - 1; i++) {
      const ax = (g[i].lon - lon) * kx, ay = (g[i].lat - lat) * ky, bx = (g[i + 1].lon - lon) * kx, by = (g[i + 1].lat - lat) * ky;
      const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy; if (L2 < 1) continue;
      const t = Math.max(0, Math.min(1, -(ax * dx + ay * dy) / L2)), px = ax + t * dx, py = ay + t * dy;
      segs.push({ d: Math.hypot(px, py), brg: (deg(Math.atan2(dx, dy)) + 360) % 360, len: Math.sqrt(L2) });
    }
  }
  if (!segs.length) return null;
  segs.sort((a, b) => a.d - b.d);
  const dmin = segs[0].d, use = segs.filter(s => s.d <= dmin + 400).slice(0, 60);
  let sx = 0, sy = 0;
  for (const s of use) { const wgt = Math.min(s.len, 400) / (1 + s.d / 150), nb = rad2((s.brg + 90) % 360); sx += Math.sin(nb) * wgt; sy += Math.cos(nb) * wgt; }
  const face = (deg(Math.atan2(sx, sy)) + 360) % 360, spread = Math.hypot(sx, sy) / use.reduce((a, s) => a + Math.min(s.len, 400) / (1 + s.d / 150), 0);
  return { face: Math.round(face / 5) * 5 % 360, distM: Math.round(dmin), segments: use.length, confidence: Math.round(spread * 100) / 100 };
}

/* ---------- NWS surf zone forecast (SRF) ---------- */
export function expandZones(header) {
  const ids = new Set(); let pre = null;
  for (const tok of header.replace(/\s+/g, "").split("-")) {
    let m = tok.match(/^([A-Z]{2}[ZC])(\d{3})(?:>(\d{3}))?$/);
    if (m) { pre = m[1]; for (let n = +m[2]; n <= +(m[3] || m[2]); n++) ids.add(pre + String(n).padStart(3, "0")); continue; }
    m = tok.match(/^(\d{3})(?:>(\d{3}))?$/);
    if (m && pre) for (let n = +m[1]; n <= +(m[2] || m[1]); n++) ids.add(pre + String(n).padStart(3, "0"));
  }
  return ids;
}
export function srfPeriods(body) {
  const out = [], parts = String(body).split(/^\s*\.([A-Z][A-Z0-9 \/]{1,24}?)\.{3}/m);
  for (let i = 1; i + 1 < parts.length && out.length < 6; i += 2) {
    const label = parts[i].trim(), txt = parts[i + 1], rip = (txt.match(/Rip Current Risk[\s.*:]*([^\n]+)/i) || [])[1], surf = (txt.match(/Surf Height[\s.*:]*([^\n]+)/i) || [])[1];
    if (rip || surf) out.push({ label: label.charAt(0) + label.slice(1).toLowerCase(), rip: rip ? rip.replace(/\.+$/, "").trim() : null, surf: surf ? surf.replace(/\.+$/, "").trim() : null });
  }
  return out;
}
export function parseSrf(text, wanted) {
  const parts = String(text || "").split(/\n\s*\$\$\s*\n?/);
  for (const part of parts) {
    const a = part.search(/[A-Z]{2}[ZC]\d{3}/); if (a < 0) continue;
    const rest = part.slice(a), b = rest.search(/-\d{6}-/); if (b < 0) continue;
    const ids = expandZones(rest.slice(0, b + 1));
    if (![...wanted].some(z => ids.has(z))) continue;
    const body = rest.slice(b + 8).trim();
    const pick = re => { const m = body.match(re); return m ? m[1].replace(/\.+$/, "").trim() : null; };
    return {
      zones: [...ids].slice(0, 12),
      rip: pick(/Rip Current Risk[\s.:]*([^\n]+)/i), surf: pick(/Surf Height[\s.:]*([^\n]+)/i), waterTemp: pick(/Water Temperature[\s.:]*([^\n]+)/i), uv: pick(/UV Index[\s.:]*([^\n]+)/i),
      periods: srfPeriods(body),
      text: body.slice(0, 3000),
    };
  }
  return null;
}

const MARINE = /^(AM|AN|GM|LC|LE|LH|LM|LO|LS|PH|PK|PM|PS|PZ|SL)Z/;
/* a point on the water resolves to a marine zone; the surf zone forecast is issued for land zones, so step inland */
async function landPoint(lat, lon, face) {
  const pts = [[lat, lon]], dirs = face != null && isFinite(face) ? [face + 180, face + 120, face + 240] : [0, 90, 180, 270];
  for (const km of [1.5, 3]) for (const b of dirs) pts.push([lat + Math.cos(rad2(b)) * km / 110.54, lon + Math.sin(rad2(b)) * km / (111.32 * Math.cos(rad2(lat)))]);
  let first = null;
  for (const [la, lo] of pts.slice(0, 7)) {
    let pt; try { pt = await getJson(NWS + "/points/" + la.toFixed(4) + "," + lo.toFixed(4), 86400, NWS_UA); } catch (e) { if (e.status === 404 || e.status === 400) { if (!first) return null; continue; } throw e; }
    const p = pt.properties || {}, zone = (p.forecastZone || "").split("/").pop();
    if (!first) first = p;
    if (zone && !MARINE.test(zone)) return p;
  }
  return first;
}
async function nws(lat, lon, face, debug) {
  const p = await landPoint(lat, lon, face); if (!p) return { supported: false };
  const cwa = p.cwa || p.gridId, zone = (p.forecastZone || "").split("/").pop(), county = (p.county || "").split("/").pop();
  const city = p.relativeLocation && p.relativeLocation.properties ? p.relativeLocation.properties.city + ", " + p.relativeLocation.properties.state : "";
  const [al, srf] = await Promise.allSettled([
    getJson(NWS + "/alerts/active?point=" + lat.toFixed(4) + "," + lon.toFixed(4), 300, NWS_UA),
    (async () => {
      const list = await getJson(NWS + "/products/types/SRF/locations/" + cwa, 900, NWS_UA);
      const first = list["@graph"] && list["@graph"][0]; if (!first) return null;
      const prod = await getJson(NWS + "/products/" + first.id, 900, NWS_UA);
      const seg = parseSrf(prod.productText, new Set([zone, county].filter(Boolean)));
      const heads = debug ? String(prod.productText).split(/\n\s*\$\$\s*\n?/).map(x => x.slice(0, 140)) : undefined;
      return { office: cwa, issued: prod.issuanceTime, id: first.id, segment: seg, heads };
    })(),
  ]);
  const alerts = al.status === "fulfilled" ? (al.value.features || []).map(f => f.properties).map(a => ({ event: a.event, severity: a.severity, urgency: a.urgency, headline: a.headline, description: String(a.description || "").slice(0, 1500), instruction: String(a.instruction || "").slice(0, 700), effective: a.effective, expires: a.expires || a.ends, sender: a.senderName })) : null;
  const sf = srf.status === "fulfilled" ? srf.value : null;
  return { supported: true, office: cwa, place: city, zone, county, alerts, srf: sf, srfUrl: "https://forecast.weather.gov/product.php?site=" + cwa + "&product=SRF&issuedby=" + cwa, alertsError: al.status === "rejected" ? String(al.reason && al.reason.message) : null, srfError: srf.status === "rejected" ? String(srf.reason && srf.reason.message) : null };
}

/* ---------- NOAA CO-OPS tides ---------- */
const ymd = d => d.toISOString().slice(0, 10).replace(/-/g, "");
const gmtEpoch = s => { const m = String(s).match(/^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)/); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) / 1000 : null; };
async function tides(lat, lon) {
  const j = await getJson(COOPS + "/mdapi/prod/webapi/stations.json?type=tidepredictions&units=metric", 86400, UA);
  const list = (j.stations || []).filter(s => isFinite(+s.lat) && isFinite(+s.lng)).map(s => ({ id: s.id, name: s.name, state: s.state, lat: +s.lat, lon: +s.lng, type: s.type, km: Math.round(hav(lat, lon, +s.lat, +s.lng)) })).sort((a, b) => a.km - b.km);
  const st = list[0]; if (!st || st.km > 250) return { supported: false, nearest: st || null };
  const now = new Date(), begin = new Date(now.getTime() - 86400000), q = "&application=DawnPatrol&station=" + st.id + "&time_zone=gmt&units=metric&format=json";
  const [hi, tp, lv] = await Promise.allSettled([
    getJson(COOPS + "/api/prod/datagetter?product=predictions&datum=MLLW&interval=hilo&begin_date=" + ymd(begin) + "&range=360" + q, 1800, UA),
    getJson(COOPS + "/api/prod/datagetter?product=water_temperature&range=72" + q, 600, UA),
    getJson(COOPS + "/api/prod/datagetter?product=water_level&datum=MLLW&range=72" + q, 600, UA),
  ]);
  if (hi.status !== "fulfilled" || !hi.value.predictions) return { supported: false, station: st, error: hi.status === "rejected" ? String(hi.reason && hi.reason.message) : (hi.value.error && hi.value.error.message) || "no predictions" };
  const thin = (arr, every) => (arr || []).filter((x, i) => i % every === 0 && x.v !== "" && isFinite(+x.v)).map(x => [gmtEpoch(x.t), +x.v]);
  return {
    supported: true, station: st, datum: "MLLW", units: "metric",
    hilo: hi.value.predictions.map(p => ({ t: gmtEpoch(p.t), v: +p.v, type: p.type })),
    temp: tp.status === "fulfilled" && tp.value.data ? thin(tp.value.data, 5) : null,
    level: lv.status === "fulfilled" && lv.value.data ? thin(lv.value.data, 5) : null,
    source: "NOAA CO-OPS",
  };
}

/* ---------- forecast model comparison (Open-Meteo, one request per model so one bad model name cannot sink the rest) ---------- */
const OM_MARINE = "https://marine-api.open-meteo.com/v1/marine", OM_WX = "https://api.open-meteo.com/v1/forecast";
const WAVE_MODELS = { ecmwf_wam025: "ECMWF WAM", ncep_gfswave025: "NOAA GFS Wave", meteofrance_wave: "Meteo-France MFWAM", gwam: "DWD GWAM" };
const WIND_MODELS = { gfs_seamless: "NOAA GFS", ecmwf_ifs025: "ECMWF IFS", icon_seamless: "DWD ICON", gem_seamless: "Canada GEM" };
const r2 = a => (a || []).map(v => (v == null || !isFinite(v) ? null : Math.round(v * 100) / 100));
async function modelRun(base, vars, id, q) {
  try {
    const j = await getJson(base + "?hourly=" + vars.join(",") + "&models=" + id + q, 1800, UA, 12000), H = j.hourly; if (!H || !H.time) return null;
    const get = v => H[v + "_" + id] || H[v] || null, out = { id, time: H.time, off: j.utc_offset_seconds };
    for (const v of vars) out[v] = r2(get(v));
    return out;
  } catch (e) { return null; }
}
async function models(lat, lon) {
  const q = "&latitude=" + lat.toFixed(3) + "&longitude=" + lon.toFixed(3) + "&timezone=auto&forecast_days=14";
  const wv = ["wave_height", "wave_period", "wave_direction"], wd = ["wind_speed_10m", "wind_direction_10m"];
  const [wr, nr] = await Promise.all([
    Promise.all(Object.keys(WAVE_MODELS).map(id => modelRun(OM_MARINE, wv, id, q))),
    Promise.all(Object.keys(WIND_MODELS).map(id => modelRun(OM_WX, wd, id, q))),
  ]);
  const pack = (runs, names, vars, rename) => {
    const ok = runs.filter(r => r && vars.some(v => r[v].some(x => x != null))); if (!ok.length) return null;
    const t = ok[0].time, same = ok.filter(r => r.time.length === t.length && r.time[0] === t[0]);
    return { t, off: same[0].off, models: same.map(r => { const o = { id: r.id, name: names[r.id] }; vars.forEach(v => { o[rename[v]] = r[v]; }); return o; }) };
  };
  return { marine: pack(wr, WAVE_MODELS, wv, { wave_height: "h", wave_period: "p", wave_direction: "d" }), wind: pack(nr, WIND_MODELS, wd, { wind_speed_10m: "s", wind_direction_10m: "d" }), source: "Open-Meteo" };
}

/* ---------- CDIP nearshore wave forecast (MOP model grids, Scripps) ---------- */
const CDIP = "https://thredds.cdip.ucsd.edu/thredds/dodsC/cdip/model/MOP_grids/";
const CDIP_GRIDS = ["B_0.001", "CA_0.01", "DN_0.002", "D_0.001", "HU_0.002", "L_0.001", "MA_0.002", "MO_0.002", "M_0.002", "OC_0.001", "SC_0.002", "SF_0.002", "SL_0.002", "SM_0.002", "SN_0.002", "VE_0.001"];
/* numbers in an OPeNDAP .ascii reply: skip the header, drop [index] prefixes and variable names */
export function parseDapNums(txt) {
  const parts = String(txt).split(/^-{10,}\s*$/m), body = parts.length > 1 ? parts[parts.length - 1] : String(txt);
  const out = [];
  for (const tok of body.replace(/\[[^\]]*\]/g, " ").split(/[\s,]+/)) {
    if (!tok) continue;
    if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(tok)) out.push(+tok); else if (/^-?nan$/i.test(tok)) out.push(NaN);
  }
  return out;
}
async function dapText(url, ttl) {
  const r = await fetch(url, { headers: UA, cf: { cacheTtl: ttl, cacheEverything: true }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) { const e = new Error("CDIP " + r.status); e.status = r.status; throw e; }
  return r.text();
}
let cdipRegCache = null;
async function cdipRegions(env) {
  if (cdipRegCache) return cdipRegCache;
  const kv = env && env.SITE ? await env.SITE.get("cdip:regions", "json") : null;
  if (kv && kv.v === 1 && kv.list && kv.list.length) { cdipRegCache = kv.list; return kv.list; }
  const list = (await Promise.all(CDIP_GRIDS.map(async g => {
    try {
      const f = CDIP + g + "_forecast.nc", dds = await dapText(f + ".dds", 86400), nLat = +(dds.match(/metaLatitude\[metaLatitude = (\d+)\]/) || [])[1], nLon = +(dds.match(/metaLongitude\[metaLongitude = (\d+)\]/) || [])[1], T = +(dds.match(/waveTime\[waveTime = (\d+)\]/) || [])[1];
      if (!(nLat > 1 && nLon > 1)) return null;
      const n = parseDapNums(await dapText(f + ".ascii?metaLatitude[0:1:1],metaLongitude[0:1:1]", 86400));
      if (n.length < 4 || n.some(x => !isFinite(x))) return null;
      const dLat = n[1] - n[0], dLon = n[3] - n[2], la1 = n[0] + dLat * (nLat - 1), lo1 = n[2] + dLon * (nLon - 1);
      return { g, lat0: n[0], dLat, nLat, lon0: n[2], dLon, nLon, T, latMin: Math.min(n[0], la1), latMax: Math.max(n[0], la1), lonMin: Math.min(n[2], lo1), lonMax: Math.max(n[2], lo1) };
    } catch (e) { return null; }
  }))).filter(Boolean);
  if (list.length && env && env.SITE) await env.SITE.put("cdip:regions", JSON.stringify({ v: 1, list }));
  if (list.length) cdipRegCache = list;
  return list;
}
const angDiff = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
/* hourly resample of (epoch seconds, value) pairs; circular = degrees */
export function resample(ts, vs, t0, t1, circular) {
  const out = []; let j = 0;
  for (let t = t0; t <= t1; t += 3600) {
    while (j + 1 < ts.length && ts[j + 1] < t) j++;
    const a = ts[j], b = ts[j + 1], va = vs[j], vb = vs[j + 1];
    if (t < ts[0] || t > ts[ts.length - 1]) { out.push(null); continue; }
    if (b == null || b === a || va == null || vb == null || t === a) { out.push(va == null ? null : circular ? Math.round(va) : Math.round(va * 100) / 100); continue; }
    const f = (t - a) / (b - a);
    if (circular) { const x = (1 - f) * Math.cos(rad(va)) + f * Math.cos(rad(vb)), y = (1 - f) * Math.sin(rad(va)) + f * Math.sin(rad(vb)); out.push(Math.round((deg(Math.atan2(y, x)) + 360) % 360)); }
    else out.push(Math.round((va + (vb - va) * f) * 100) / 100);
  }
  return out;
}
async function cdipForecast(lat, lon, env, debug) {
  const regs = (await cdipRegions(env)).filter(r => lat >= r.latMin && lat <= r.latMax && lon >= r.lonMin && lon <= r.lonMax).sort((a, b) => Math.abs(a.dLat) - Math.abs(b.dLat));
  if (!regs.length) return { supported: false, reason: "outside the CDIP nearshore model grids" };
  for (const R of regs) {
    const f = CDIP + R.g + "_forecast.nc", i0 = Math.round((lat - R.lat0) / R.dLat), j0 = Math.round((lon - R.lon0) / R.dLon), w = Math.max(2, Math.round(0.012 / Math.abs(R.dLat)));
    const ia = Math.max(0, i0 - w), ib = Math.min(R.nLat - 1, i0 + w), ja = Math.max(0, j0 - w), jb = Math.min(R.nLon - 1, j0 + w), nI = ib - ia + 1, nJ = jb - ja + 1, T = R.T;
    const [timeTxt, hsTxt] = await Promise.all([dapText(f + ".ascii?waveTime", 900), dapText(f + ".ascii?waveHs.waveHs[0:" + (T - 1) + "][" + ia + ":" + ib + "][" + ja + ":" + jb + "]", 900)]);
    const times = parseDapNums(timeTxt), hs = parseDapNums(hsTxt);
    if (debug) return { regs: regs.map(r => r.g), R, ia, ib, ja, jb, times: times.slice(0, 20), hsN: hs.length, want: T * nI * nJ, hsHead: hsTxt.slice(0, 400) };
    if (times.length !== T || hs.length !== T * nI * nJ) continue;
    let best = null;
    for (let i = 0; i < nI; i++) for (let j = 0; j < nJ; j++) {
      let ok = 0; for (let t = 0; t < T; t++) { const v = hs[(t * nI + i) * nJ + j]; if (isFinite(v) && v >= 0 && v < 30) ok++; }
      if (ok < T * 0.6) continue;
      const clat = R.lat0 + R.dLat * (ia + i), clon = R.lon0 + R.dLon * (ja + j), d = hav(lat, lon, clat, clon);
      if (!best || d < best.d) best = { i, j, d, clat, clon };
    }
    if (!best) continue;
    const ci = ia + best.i, cj = ja + best.j, sel = "[0:" + (T - 1) + "][" + ci + "][" + cj + "]";
    const [tpTxt, dpTxt, dpthTxt] = await Promise.all([dapText(f + ".ascii?waveTp.waveTp" + sel, 900), dapText(f + ".ascii?waveDp.waveDp" + sel, 900), dapText(f + ".ascii?metaWaterDepth.metaWaterDepth[" + ci + "][" + cj + "]", 86400).catch(() => "")]);
    const tp = parseDapNums(tpTxt), dp = parseDapNums(dpTxt), depth = parseDapNums(dpthTxt)[0];
    const hh = []; for (let t = 0; t < T; t++) hh.push(hs[(t * nI + best.i) * nJ + best.j]);
    const good = (a, lo, hi) => a.map(x => (isFinite(x) && x > lo && x < hi ? x : null));
    const H = good(hh, -0.001, 30), P = good(tp, 0, 40), D = good(dp, -0.001, 361);
    const t0 = Math.ceil(times[0] / 3600) * 3600, t1 = Math.floor(times[T - 1] / 3600) * 3600;
    return { supported: true, grid: R.g, cell: { lat: +best.clat.toFixed(4), lon: +best.clon.toFixed(4), distM: Math.round(best.d * 1000), depth: isFinite(depth) && depth > -1e5 && depth < 1e5 ? Math.round(depth * 10) / 10 : null },
      t: Array.from({ length: Math.floor((t1 - t0) / 3600) + 1 }, (_, k) => t0 + k * 3600), hs: resample(times, H, t0, t1), tp: resample(times, P, t0, t1), dp: resample(times, D, t0, t1, true), stepH: T > 1 ? Math.round((times[1] - times[0]) / 360) / 10 : null, source: "CDIP (Scripps) MOP nearshore wave model" };
  }
  return { supported: false, reason: "no water cell with a forecast near this point" };
}

/* ---------- NWS forecast-office grids: waves (from the nearshore wave model and forecasters) and wind ---------- */
const isoHours = d => { const m = String(d).match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?)?$/); return m ? (+(m[1] || 0)) * 24 + (+(m[2] || 0)) + (+(m[3] || 0)) / 60 : 1; };
export function expandGrid(series, t0, n) {
  const out = new Array(n).fill(null); if (!series || !series.values) return out;
  for (const v of series.values) {
    const [a, d] = String(v.validTime).split("/"), s = Math.floor(Date.parse(a) / 1000), h = isoHours(d); if (!isFinite(s) || v.value == null) continue;
    const i0 = Math.max(0, Math.ceil((s - t0) / 3600)), i1 = Math.min(n - 1, Math.ceil((s + h * 3600 - t0) / 3600) - 1);
    for (let i = i0; i <= i1; i++) out[i] = v.value;
  }
  return out;
}
const dest = (lat, lon, brg, km) => { const R = 6371, d = km / R, b = rad(brg), p1 = rad(lat), l1 = rad(lon), p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(b)), l2 = l1 + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2)); return [deg(p2), ((deg(l2) + 540) % 360) - 180]; };
async function nwsGridAt(lat, lon) {
  const pt = await getJson(NWS + "/points/" + lat.toFixed(4) + "," + lon.toFixed(4), 86400, NWS_UA, 12000), P = pt.properties || {};
  if (!P.gridId) return null;
  const g = await getJson(NWS + "/gridpoints/" + P.gridId + "/" + P.gridX + "," + P.gridY, 1800, NWS_UA, 15000), G = g.properties || {};
  const t0 = Math.floor(Date.now() / 3600000) * 3600 - 24 * 3600, n = 8 * 24 + 24, r1 = a => a.map(x => (x == null ? null : Math.round(x * 100) / 100)), per = a => a.map(x => (x ? x : null));
  const has = a => a.some(x => x != null);
  const o = { supported: true, office: P.gridId, grid: P.gridX + "," + P.gridY, updated: G.updateTime, t: Array.from({ length: n }, (_, k) => t0 + k * 3600),
    wh: r1(expandGrid(G.waveHeight, t0, n)), wp: per(r1(expandGrid(G.wavePeriod, t0, n))), sh: r1(expandGrid(G.primarySwellHeight, t0, n)), sd: r1(expandGrid(G.primarySwellDirection, t0, n)), s2h: r1(expandGrid(G.secondarySwellHeight, t0, n)), s2d: r1(expandGrid(G.secondarySwellDirection, t0, n)),
    ws: r1(expandGrid(G.windSpeed, t0, n)), wd: r1(expandGrid(G.windDirection, t0, n)), gust: r1(expandGrid(G.windGust, t0, n)), source: "NOAA National Weather Service forecast grids" };
  o.hasWaves = o.wh.some(x => x > 0) || o.sh.some(x => x > 0); o.hasWind = has(o.ws);
  return o;
}
/* beach points sit on land grid cells that have no wave data, so step out to sea along the beach direction until a cell with waves is found */
async function nwsGrid(lat, lon, face) {
  let first = null;
  for (const km of [0, 4, 10, 20]) {
    const [la, lo] = km ? dest(lat, lon, isFinite(face) ? face : 270, km) : [lat, lon];
    let o; try { o = await nwsGridAt(la, lo); } catch (e) { if (!km) throw e; continue; }
    if (!o) continue; if (!first) first = o;
    if (o.hasWaves) { o.offshoreKm = km; return o; }
  }
  return first ? Object.assign(first, { offshoreKm: null }) : { supported: false, reason: "no forecast grid here" };
}

/* ---------- Hawaii wave models from PacIOOS (SWAN nearshore grids and regional WaveWatch III), through ERDDAP ---------- */
const PAC_HOSTS = ["https://pae-paha.pacioos.hawaii.edu/erddap/griddap/", "https://upwell.pfeg.noaa.gov/erddap/griddap/"];
const SWAN_V = { hs: "shgt", tp: "pper", dp: "pdir", mp: "mper", md: "mdir" };
const PAC_GRIDS = [
  { id: "swan_oahu", name: "PacIOOS SWAN Oahu", la0: 21.2, la1: 21.75, lo0: 201.65, lo1: 202.4, d: 0.005, win: 8, maxKm: 5, vars: SWAN_V },
  { id: "swan_maui", name: "PacIOOS SWAN Maui County", la0: 20.4, la1: 21.3, lo0: 202.6, lo1: 204.1, d: 0.005, win: 8, maxKm: 5, vars: SWAN_V },
  { id: "swan_kauai", name: "PacIOOS SWAN Kauai", la0: 21.7, la1: 22.35, lo0: 199.65, lo1: 200.8, d: 0.005, win: 8, maxKm: 5, vars: SWAN_V },
  { id: "swan_bigi", name: "PacIOOS SWAN Big Island", la0: 18.85, la1: 20.35, lo0: 203.8, lo1: 205.3, d: 0.005, win: 8, maxKm: 5, vars: SWAN_V },
  { id: "ww3_hawaii", name: "PacIOOS WaveWatch III Hawaii", la0: 18, la1: 23, lo0: 199, lo1: 206, d: 0.05, win: 3, maxKm: 25, vars: { hs: "Thgt", tp: "Tper", dp: "Tdir", shs: "shgt", stp: "sper", sdp: "sdir", whs: "whgt", wtp: "wper", wdp: "wdir" } },
];
export function parseErddapCsv(txt) {
  const lines = String(txt).trim().split("\n"); if (lines.length < 3) return { names: [], rows: [] };
  return { names: lines[0].split(",").map(s => s.trim()), rows: lines.slice(2).map(l => l.split(",")) };
}
async function erddapCsv(id, q, ttl) {
  let err = null;
  for (const h of PAC_HOSTS) {
    try {
      const r = await fetch(h + id + ".csv?" + q, { headers: UA, cf: { cacheTtl: ttl, cacheEverything: true }, signal: AbortSignal.timeout(20000) });
      if (!r.ok) { err = new Error("PacIOOS " + r.status); continue; }
      return parseErddapCsv(await r.text());
    } catch (e) { err = e; }
  }
  throw err || new Error("PacIOOS unavailable");
}
const fin = v => { const x = parseFloat(v); return isFinite(x) ? x : null; };
const gridHas = (g, la, lo) => la >= g.la0 && la <= g.la1 && lo >= g.lo0 && lo <= g.lo1;
async function pacGrid(g, lat, lon360) {
  const w = g.d * g.win, a0 = Math.max(g.la0, lat - w), a1 = Math.min(g.la1, lat + w), o0 = Math.max(g.lo0, lon360 - w), o1 = Math.min(g.lo1, lon360 + w);
  const hv = g.vars.hs;
  const win = await erddapCsv(g.id, hv + "[(last)][0][(" + a0.toFixed(4) + "):1:(" + a1.toFixed(4) + ")][(" + o0.toFixed(4) + "):1:(" + o1.toFixed(4) + ")]", 3600);
  const ci = { la: win.names.indexOf("latitude"), lo: win.names.indexOf("longitude"), h: win.names.indexOf(hv), t: win.names.indexOf("time") };
  if (ci.la < 0 || ci.lo < 0 || ci.h < 0) return null;
  let best = null;
  for (const r of win.rows) {
    const h = fin(r[ci.h]), la = fin(r[ci.la]), lo = fin(r[ci.lo]); if (h == null || h < 0 || la == null || lo == null) continue;
    const d = hav(lat, lon360 - 360, la, lo - 360); if (!best || d < best.d) best = { la, lo, d };
  }
  if (!best || best.d > g.maxKm) return null;
  const t0 = new Date(Date.now() - 24 * 3600e3).toISOString().slice(0, 13) + ":00:00Z", sel = "[(" + t0 + "):1:(last)][0][(" + best.la + ")][(" + best.lo + ")]";
  const keys = Object.keys(g.vars), ser = await erddapCsv(g.id, keys.map(k => g.vars[k] + sel).join(","), 900);
  const ti = ser.names.indexOf("time"), idx = {}; keys.forEach(k => { idx[k] = ser.names.indexOf(g.vars[k]); });
  const ts = ser.rows.map(r => Math.floor(Date.parse(r[ti]) / 1000)); if (!ts.length || ts.some(x => !isFinite(x))) return null;
  const tA = Math.ceil(ts[0] / 3600) * 3600, tB = Math.floor(ts[ts.length - 1] / 3600) * 3600; if (tB < tA) return null;
  const out = { id: g.id, name: g.name, cell: { lat: +best.la.toFixed(4), lon: +(best.lo - 360).toFixed(4), distM: Math.round(best.d * 1000) }, t: Array.from({ length: Math.floor((tB - tA) / 3600) + 1 }, (_, k) => tA + k * 3600), kind: g.id.startsWith("swan") ? "nearshore" : "regional" };
  for (const k of keys) {
    const vs = ser.rows.map(r => { const x = fin(r[idx[k]]); return x == null || x < -900 ? null : x; });
    out[k] = resample(ts, vs, tA, tB, /^(dp|md|sdp|wdp)$/.test(k));
  }
  if (!out.hs.some(v => v != null)) return null;
  return out;
}
async function pacioos(lat, lon) {
  const lo360 = lon < 0 ? lon + 360 : lon;
  const gs = PAC_GRIDS.filter(g => gridHas(g, lat, lo360));
  if (!gs.length) return { supported: false, reason: "outside the PacIOOS Hawaii model grids" };
  const res = await Promise.allSettled(gs.map(g => pacGrid(g, lat, lo360)));
  const models = res.filter(r => r.status === "fulfilled" && r.value).map(r => r.value);
  if (!models.length) return { supported: false, reason: res.some(r => r.status === "rejected") ? "PacIOOS did not answer" : "no water cell with a forecast near this point" };
  return { supported: true, models, source: "PacIOOS (University of Hawaii) wave models" };
}

/* ---------- California beach water quality: state postings and closures (data.ca.gov) ---------- */
const CKAN = "https://data.ca.gov/api/3/action/datastore_search";
const WQ_ST = "98e628ff-d012-4982-ad32-b9f9ad8ab524", WQ_ADV = "d5cd6a23-829c-426d-a63e-689a55a3db9c";
const inCalifornia = (la, lo) => la >= 32.3 && la <= 42.1 && lo >= -124.7 && lo <= -114.0;
async function ckan(params, ttl) {
  const j = await getJson(CKAN + "?" + params, ttl, UA, 20000);
  if (!j || !j.success) throw new Error("data.ca.gov error");
  return j.result.records || [];
}
async function wqStations(env) {
  const kv = env && env.SITE ? await env.SITE.get("wq:stations", "json") : null;
  if (kv && kv.v === 1 && kv.list && kv.list.length && Date.now() - kv.at < 7 * 86400e3) return kv.list;
  const recs = await ckan("resource_id=" + WQ_ST + "&limit=3000&fields=" + encodeURIComponent("BeachName_id,Beach_Name,NearestCityName,CountyName,USEPAID,Station_UpperLat,Station_UpperLon,Status"), 3600);
  const list = recs.map(r => ({ id: r.BeachName_id, beach: r.Beach_Name, city: r.NearestCityName, county: r.CountyName, epa: r.USEPAID, lat: +r.Station_UpperLat, lon: +r.Station_UpperLon, active: r.Status === "Active" })).filter(r => r.id != null && isFinite(r.lat) && isFinite(r.lon) && r.lat !== 0);
  if (list.length && env && env.SITE) await env.SITE.put("wq:stations", JSON.stringify({ v: 1, at: Date.now(), list }));
  return list;
}
const isoDay = s => (s ? String(s).slice(0, 10) : null);
async function beachWq(lat, lon, env) {
  if (!inCalifornia(lat, lon)) return { supported: false, reason: "California state records only" };
  const st = await wqStations(env);
  let best = null; for (const s of st) { const d = hav(lat, lon, s.lat, s.lon); if (!best || d < best.d) best = { ...s, d }; }
  if (!best || best.d > 6) return { supported: true, beach: null, reason: "no monitored beach within 6 km" };
  const f = encodeURIComponent(JSON.stringify({ BeachName_id: best.id })), flds = encodeURIComponent("_id,DateofAdvisory,DateOpened,AdvisoryType,AdvisoryCause,Station_Description,DescriptionofArea,Source,Enterococcus");
  const [adv, last] = await Promise.all([ckan("resource_id=" + WQ_ADV + "&filters=" + f + "&sort=" + encodeURIComponent("_id desc") + "&limit=8&fields=" + flds, 1800), ckan("resource_id=" + WQ_ADV + "&sort=" + encodeURIComponent("_id desc") + "&limit=1&fields=DateofAdvisory", 21600).catch(() => [])]);
  const notices = adv.map(r => ({ type: r.AdvisoryType, cause: r.AdvisoryCause, date: isoDay(r.DateofAdvisory), reopened: isoDay(r.DateOpened), where: r.DescriptionofArea || r.Station_Description || null, source: r.Source && r.Source !== "Unknown" ? r.Source : null })).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return { supported: true, beach: { name: best.beach, city: best.city, county: best.county, epa: best.epa, km: Math.round(best.d * 10) / 10 }, notices, dataThrough: last[0] ? isoDay(last[0].DateofAdvisory) : null, source: "California State Water Resources Control Board, Beach Watch (data.ca.gov)", link: "https://mywaterquality.ca.gov/safe-to-swim/safe-to-swim-maps.html" };
}

/* ---------- SCCOOS CalHABMAP, Scripps Pier: weekly algae and water samples (ERDDAP tabledap) ---------- */
const HAB = { name: "Scripps Pier", lat: 32.867, lon: -117.257, km: 60, link: "https://calhabmap.org/scripps-pier", page: "https://erddap.sccoos.org/erddap/tabledap/HABs-ScrippsPier.html", base: "https://erddap.sccoos.org/erddap/tabledap/HABs-ScrippsPier.csv" };
const HAB_COLS = ["time", "Temp", "Salinity", "Avg_Chloro", "Akashiwo_sanguinea", "Alexandrium_spp", "Dinophysis_spp", "Lingulodinium_polyedra", "Prorocentrum_spp", "Pseudo_nitzschia_delicatissima_group", "Pseudo_nitzschia_seriata_group", "pDA", "Total_Phytoplankton"];
const HAB_COUNTS = HAB_COLS.slice(4, 11).concat(["Total_Phytoplankton"]);
/* 10,000 cells/L Pseudo-nitzschia and 0.5 ng/mL (500 ng/L) particulate domoic acid are the SCCOOS HAB Bulletin bloom levels; 100,000 cells/L for the two discolouring algae is this app's own guide */
const HAB_PN = 10000, HAB_DA = 0.5, HAB_DISCOLOR = 100000, HAB_FRESH = 28 * 86400, HAB_STALE = 21 * 86400;
const habFmt = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export function habParse(csv) {
  const L = String(csv).split(/\r?\n/).filter(x => x.trim()); if (L.length < 3) return [];
  const cols = L[0].split(",").map(s => s.trim()), rows = [];
  for (let i = 2; i < L.length; i++) {
    const f = L[i].split(","); if (f.length !== cols.length) continue;
    const t = Date.parse(f[0]); if (!isFinite(t)) continue;
    const o = { t: Math.floor(t / 1000) };
    for (let k = 1; k < cols.length; k++) { const v = f[k].trim(); o[cols[k]] = v === "" || v === "NaN" || !isFinite(+v) ? null : +v; }
    rows.push(o);
  }
  return rows.sort((a, b) => a.t - b.t);
}
export function habSummary(rows, nowSec) {
  if (!rows || !rows.length) return { supported: true, status: "stale", sampleT: null, flags: [], history: [], alertKey: "", site: { name: HAB.name, lat: HAB.lat, lon: HAB.lon }, link: HAB.link };
  const last = ok => { for (let i = rows.length - 1; i >= 0; i--) if (ok(rows[i])) return rows[i]; return null; };
  const wr = last(r => r.Temp != null), cr = last(r => HAB_COUNTS.some(k => r[k] != null)), dr = last(r => r.pDA != null), ch = last(r => r.Avg_Chloro != null), top = rows[rows.length - 1];
  const fresh = r => !!r && nowSec - r.t <= HAB_FRESH, flags = [];
  if (fresh(cr)) {
    const pn = Math.max(cr.Pseudo_nitzschia_seriata_group || 0, cr.Pseudo_nitzschia_delicatissima_group || 0);
    if (pn > HAB_PN) flags.push({ k: "pn", t: cr.t, label: "Pseudo-nitzschia", value: Math.round(pn), unit: "cells/L", short: "Pseudo-nitzschia " + habFmt(pn) + " cells/L.", text: "Pseudo-nitzschia is above the 10,000 cells/L bloom level. Some kinds make domoic acid." });
    const li = cr.Lingulodinium_polyedra || 0;
    if (li >= HAB_DISCOLOR) flags.push({ k: "ling", t: cr.t, label: "Red tide alga (Lingulodinium)", value: Math.round(li), unit: "cells/L", short: "Red tide alga " + habFmt(li) + " cells/L.", text: "The red tide alga Lingulodinium is dense. Water can look red-brown and glow blue at night." });
    const ak = cr.Akashiwo_sanguinea || 0;
    if (ak >= HAB_DISCOLOR) flags.push({ k: "aka", t: cr.t, label: "Akashiwo", value: Math.round(ak), unit: "cells/L", short: "Akashiwo " + habFmt(ak) + " cells/L.", text: "Akashiwo is dense. It can colour the water brown and leave foam." });
  }
  if (fresh(dr) && dr.pDA > HAB_DA) flags.push({ k: "pda", t: dr.t, label: "Domoic acid", value: Math.round(dr.pDA * 100) / 100, unit: "ng/mL", short: "Particulate domoic acid " + (Math.round(dr.pDA * 100) / 100) + " ng/mL.", text: "Particulate domoic acid is above 0.5 ng/mL (500 ng/L), the level the HAB Bulletin counts as harmful." });
  const status = nowSec - top.t > HAB_STALE ? "stale" : flags.length ? "bloom" : "ok";
  const ri = (x, d) => (x == null ? null : Math.round(x * d) / d), c = cr;
  const hist = rows.filter(r => nowSec - r.t <= 84 * 86400).map(r => ({ t: r.t, temp: r.Temp, chl: r.Avg_Chloro, pn: r.Pseudo_nitzschia_seriata_group == null && r.Pseudo_nitzschia_delicatissima_group == null ? null : Math.max(r.Pseudo_nitzschia_seriata_group || 0, r.Pseudo_nitzschia_delicatissima_group || 0), pda: r.pDA }));
  return {
    supported: true, status, sampleT: top.t, site: { name: HAB.name, lat: HAB.lat, lon: HAB.lon },
    water: wr ? { t: wr.t, temp: wr.Temp, sal: ri(wr.Salinity, 10) } : null,
    chl: ch ? { t: ch.t, v: ri(ch.Avg_Chloro, 100) } : null,
    counts: c ? { t: c.t, pnSeriata: ri(c.Pseudo_nitzschia_seriata_group, 1), pnDelicatissima: ri(c.Pseudo_nitzschia_delicatissima_group, 1), alexandrium: ri(c.Alexandrium_spp, 1), dinophysis: ri(c.Dinophysis_spp, 1), lingulodinium: ri(c.Lingulodinium_polyedra, 1), akashiwo: ri(c.Akashiwo_sanguinea, 1), prorocentrum: ri(c.Prorocentrum_spp, 1), total: ri(c.Total_Phytoplankton, 1) } : null,
    da: dr ? { t: dr.t, pda: ri(dr.pDA, 100) } : null,
    flags, alertKey: status === "bloom" ? flags.map(f => f.k).sort().join("+") : "", history: hist,
    link: HAB.link, source: "CalHABMAP and SCCOOS (Scripps Institution of Oceanography, UC San Diego), ERDDAP",
  };
}
export function habAlertText(s) {
  const day = t => new Date(t * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  if (!s || s.status === "stale" || !s.sampleT) return { status: "stale", title: "Dawn Patrol", body: "The Scripps Pier algae samples are out of date right now." };
  if (s.status === "bloom") return { status: "bloom", title: "Algae bloom flagged at Scripps Pier", body: s.flags.map(f => f.short).join(" ") + " Sampled " + day(Math.max.apply(null, s.flags.map(f => f.t))) + ". Check county advisories before swimming or eating shellfish." };
  return { status: "ok", title: "Dawn Patrol", body: "No algae bloom flagged at Scripps Pier. Latest sample " + day(s.sampleT) + "." };
}
/* the raw weekly rows (about 15) are cached in KV for 3 hours; the summary is worked out on each read so its age is always right */
async function habGet(env) {
  const hit = await env.SITE.get("hab:v1", "json");
  if (hit && hit.rows && Date.now() - hit.at < 3 * 3600000) return habSummary(hit.rows, Math.floor(Date.now() / 1000));
  try {
    const since = new Date(Date.now() - 100 * 86400000).toISOString().slice(0, 10);
    const r = await fetch(HAB.base + "?" + HAB_COLS.join(",") + "&time%3E=" + since + "T00:00:00Z&orderBy(%22time%22)", { headers: UA, signal: AbortSignal.timeout(12000) });
    if (!r.ok) throw new Error("SCCOOS answered " + r.status);
    const rows = habParse(await r.text()); if (!rows.length) throw new Error("SCCOOS sent no rows");
    await env.SITE.put("hab:v1", JSON.stringify({ at: Date.now(), rows }), { expirationTtl: 14 * 86400 });
    return habSummary(rows, Math.floor(Date.now() / 1000));
  } catch (e) {
    if (hit && hit.rows) return { ...habSummary(hit.rows, Math.floor(Date.now() / 1000)), late: true };
    throw e;
  }
}

/* ---------- wave spectra from NDBC buoys (includes the Scripps CDIP buoys NDBC relays) ---------- */
export function parseSpecFile(txt, keepRows) {
  const rows = [];
  for (const ln of String(txt).split("\n")) {
    if (!ln.trim() || ln[0] === "#") continue;
    const m = ln.trim().match(/^(\d{4})\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)$/); if (!m) continue;
    const t = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) / 1000, vals = [], fr = [];
    for (const p of m[6].matchAll(/(\S+)\s+\(([\d.]+)\)/g)) { vals.push(p[1] === "MM" ? null : fin(p[1])); fr.push(+p[2]); }
    if (vals.length >= 8) rows.push({ t, vals, fr });
    if (rows.length >= keepRows) break;
  }
  return rows;
}
async function spectra(id) {
  const [a, b] = await Promise.allSettled([getText(NDBC + "/data/realtime2/" + id + ".data_spec", 600), getText(NDBC + "/data/realtime2/" + id + ".swdir", 600)]);
  if (a.status !== "fulfilled") return null;
  const sp = parseSpecFile(a.value, 48); if (!sp.length) return null;
  const dr = b.status === "fulfilled" ? parseSpecFile(b.value, 48) : [], fr = sp[0].fr, newest = sp[0].t;
  const rnd3 = x => (x == null ? null : Math.round(x * 1000) / 1000);
  const dirAt = dr.length && dr[0].t === newest && dr[0].fr.length === fr.length ? dr[0].vals.map(x => (x == null || x > 360 ? null : Math.round(x))) : null;
  return { id, freqs: fr, latest: { t: newest, e: sp[0].vals.map(rnd3), dir: dirAt }, history: { t: sp.map(r => r.t).reverse(), e: sp.filter(r => r.fr.length === fr.length).map(r => r.vals.map(rnd3)).reverse() }, source: "NOAA National Data Buoy Center spectral wave data" };
}

/* ---------- Open-Meteo ensembles: how sure are the wind and rain forecasts out to 14 days ---------- */
const ENS_MODELS = ["ecmwf_ifs025", "gfs025"];
const pct = (sorted, p) => { if (!sorted.length) return null; const k = (sorted.length - 1) * p, f = Math.floor(k), c = Math.min(sorted.length - 1, f + 1); return sorted[f] + (sorted[c] - sorted[f]) * (k - f); };
export function ensembleStats(hourly, key) {
  const names = Object.keys(hourly).filter(k => k === key || k.startsWith(key + "_member")), n = (hourly.time || []).length;
  return { members: names.map(k => hourly[k]), n };
}
async function ensemble(lat, lon) {
  const base = "https://ensemble-api.open-meteo.com/v1/ensemble?latitude=" + lat.toFixed(3) + "&longitude=" + lon.toFixed(3) + "&hourly=wind_speed_10m,precipitation&forecast_days=14&timezone=auto&models=";
  const runs = await Promise.all(ENS_MODELS.map(async m => { try { return { m, j: await getJson(base + m, 1800, UA, 20000) }; } catch (e) { return null; } }));
  const ok = runs.filter(r => r && r.j && r.j.hourly && r.j.hourly.time); if (!ok.length) return { supported: false, reason: "ensemble forecast unavailable" };
  const time = ok[0].j.hourly.time, n = time.length, wind = [], rain = [], used = [];
  for (const r of ok) { if (r.j.hourly.time.length !== n) continue; const w = ensembleStats(r.j.hourly, "wind_speed_10m").members, p = ensembleStats(r.j.hourly, "precipitation").members; wind.push(...w); rain.push(...p); used.push(r.m); }
  if (!wind.length) return { supported: false, reason: "no ensemble members returned" };
  const p10 = [], p50 = [], p90 = [], prob = [];
  for (let i = 0; i < n; i++) {
    const w = wind.map(a => a[i]).filter(x => x != null && isFinite(x)).sort((a, b) => a - b), q = rain.map(a => a[i]).filter(x => x != null && isFinite(x));
    p10.push(w.length ? Math.round(pct(w, 0.1) * 10) / 10 : null); p50.push(w.length ? Math.round(pct(w, 0.5) * 10) / 10 : null); p90.push(w.length ? Math.round(pct(w, 0.9) * 10) / 10 : null);
    prob.push(q.length ? Math.round(100 * q.filter(x => x >= 0.1).length / q.length) : null);
  }
  return { supported: true, t: time, off: ok[0].j.utc_offset_seconds, wind: { p10, p50, p90 }, rainProb: prob, members: wind.length, models: used, source: "Open-Meteo ensemble forecasts (ECMWF IFS, NOAA GFS)" };
}

/* ---------- web push: a payload-less "wake up" signed with VAPID; the service worker builds the message itself ---------- */
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const PUSH_HOST = /^(fcm\.googleapis\.com|updates\.push\.services\.mozilla\.com|[a-z0-9.-]+\.push\.apple\.com|[a-z0-9.-]+\.notify\.windows\.com)$/;
async function sha24(t) { return [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))].slice(0, 12).map(b => b.toString(16).padStart(2, "0")).join(""); }
async function vapid(env) {
  let rec = await env.SITE.get("vapid:keys", "json");
  if (!rec) {
    const kp = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
    rec = { priv: await crypto.subtle.exportKey("jwk", kp.privateKey), pub: b64u(await crypto.subtle.exportKey("raw", kp.publicKey)) };
    await env.SITE.put("vapid:keys", JSON.stringify(rec));
  }
  return rec;
}
async function vapidHeader(env, endpoint) {
  const k = await vapid(env), key = await crypto.subtle.importKey("jwk", k.priv, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const enc = o => b64u(new TextEncoder().encode(JSON.stringify(o)));
  const unsigned = enc({ typ: "JWT", alg: "ES256" }) + "." + enc({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: "https://dawnpatrol.casadelfuego.org" });
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, new TextEncoder().encode(unsigned));
  return "vapid t=" + unsigned + "." + b64u(sig) + ", k=" + k.pub;
}
async function sendPush(env, endpoint) {
  const r = await fetch(endpoint, { method: "POST", headers: { TTL: "7200", Urgency: "normal", Authorization: await vapidHeader(env, endpoint) }, signal: AbortSignal.timeout(10000) });
  return r.status;
}
/* hourly: if the Scripps Pier report newly shows a bloom, send an empty push to everyone who asked for bloom alerts (the service worker then fetches the wording from /api/sccoos/alert). Subscriptions from the retired surf alerts carry no bloom flag and are removed here */
async function pushTick(env) {
  let cursor, sent = 0, dropped = 0, old = 0, hab = null;
  try { hab = await habGet(env); } catch (e) { hab = null; }
  const prev = (await env.SITE.get("hab:alerted")) || "", now = hab && hab.status === "bloom" ? hab.alertKey : "", fire = !!now && now !== prev;
  do {
    const l = await env.SITE.list({ prefix: "sub:", cursor }); cursor = l.list_complete ? null : l.cursor;
    for (const k of l.keys) {
      const rec = await env.SITE.get(k.name, "json"); if (!rec) continue;
      if (!rec.bloom) { await env.SITE.delete(k.name); old++; continue; }
      if (!fire) continue;
      try { const st = await sendPush(env, rec.endpoint); if (st === 404 || st === 410) { await env.SITE.delete(k.name); dropped++; } else sent++; } catch (e) { /* the next bloom alert tries again */ }
    }
  } while (cursor);
  if (hab && fire) await env.SITE.put("hab:alerted", now);
  else if (hab && !now && prev) await env.SITE.delete("hab:alerted");
  return { sent, dropped, old, fire };
}
async function pushApi(req, url, env) {
  const p = url.pathname;
  if (p === "/api/push/key") return json({ key: (await vapid(env)).pub }, 200, 3600);
  if (req.method !== "POST") return json({ error: "POST required" }, 405, 0);
  let b; try { b = await req.json(); } catch (e) { return json({ error: "JSON body required" }, 400, 0); }
  const ep = String(b && (b.endpoint || (b.sub && b.sub.endpoint)) || "");
  let host; try { const u = new URL(ep); host = u.protocol === "https:" ? u.hostname : null; } catch (e) { host = null; }
  if (!host || !PUSH_HOST.test(host) || ep.length > 600) return json({ error: "Unsupported push endpoint" }, 400, 0);
  const key = "sub:" + await sha24(ep);
  if (p === "/api/push/unsubscribe") { await env.SITE.delete(key); return json({ ok: true }, 200, 0); }
  if (p === "/api/push/subscribe") {
    const bloom = b.bloom === true, hour = bloom ? 0 : Math.round(+b.hour); if (!bloom && !(hour >= 0 && hour <= 23)) return json({ error: "hour 0-23 required" }, 400, 0);
    if (!(await env.SITE.get(key))) { const l = await env.SITE.list({ prefix: "sub:", limit: 400 }); if (l.keys.length >= 300) return json({ error: "Subscription limit reached" }, 429, 0); }
    await env.SITE.put(key, JSON.stringify({ endpoint: ep, hour, bloom, created: Date.now() }));
    return json({ ok: true, hour }, 200, 0);
  }
  if (p === "/api/push/alerts") {
    const rec = await env.SITE.get(key, "json"); if (!rec) return json({ error: "Not subscribed" }, 404, 0);
    const now = Date.now() / 1000, set = new Set();
    (Array.isArray(b.times) ? b.times : []).forEach(t => { t = Math.floor(+t / 3600) * 3600; if (isFinite(t) && t > now - 1800 && t < now + 8 * 86400) set.add(t); });
    rec.alerts = [...set].sort((a, c) => a - c).slice(0, 10); await env.SITE.put(key, JSON.stringify(rec));
    return json({ ok: true, n: rec.alerts.length }, 200, 0);
  }
  if (p === "/api/push/ping") {
    const rec = await env.SITE.get(key, "json"); if (!rec) return json({ error: "Not subscribed" }, 404, 0);
    if (rec.ping && Date.now() - rec.ping < 20000) return json({ error: "Wait a few seconds" }, 429, 0);
    rec.ping = Date.now(); await env.SITE.put(key, JSON.stringify(rec));
    const st = await sendPush(env, ep); if (st === 404 || st === 410) await env.SITE.delete(key);
    return json({ ok: st >= 200 && st < 300, status: st }, 200, 0);
  }
  return json({ error: "Unknown endpoint" }, 404, 60);
}

async function api(url, env) {
  const p = url.pathname;
  if (p === "/api/buoys") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon"), n = Math.min(12, Math.max(1, +url.searchParams.get("n") || 8));
    if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return json({ error: "lat and lon required" }, 400, 60);
    const list = parseStations(await getText(NDBC + "/activestations.xml", 43200));
    const st = list.map(s => ({ ...s, km: Math.round(hav(lat, lon, s.lat, s.lon)) })).filter(s => s.km <= 600).sort((a, b) => a.km - b.km).slice(0, n);
    return json({ stations: st, source: "NOAA National Data Buoy Center" }, 200, 600);
  }
  const m = p.match(/^\/api\/buoy\/([A-Za-z0-9]{3,8})$/);
  if (m) {
    const id = m[1].toUpperCase(), days = Math.min(5, Math.max(1, +url.searchParams.get("days") || 5));
    const [a, b] = await Promise.allSettled([getText(NDBC + "/data/realtime2/" + id + ".txt", 600), getText(NDBC + "/data/realtime2/" + id + ".spec", 600)]);
    const std = a.status === "fulfilled" ? columnsStd(a.value, days) : { t: [] }, spec = b.status === "fulfilled" ? columnsSpec(b.value, days) : { t: [] };
    if (!std.t.length && !spec.t.length) return json({ error: "No recent observations for station " + id }, 404, 120);
    return json({ id, std, spec, source: "NOAA National Data Buoy Center", fetched: Math.floor(Date.now() / 1000) }, 200, 300);
  }
  if (p === "/api/nws") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon");
    if (!isFinite(lat) || !isFinite(lon)) return json({ error: "lat and lon required" }, 400, 60);
    const face = url.searchParams.get("face") === null ? null : +url.searchParams.get("face");
    return json(await nws(lat, lon, face, url.searchParams.get("debug") === "1"), 200, url.searchParams.get("debug") === "1" ? 0 : 300);
  }
  if (p === "/api/tides") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon");
    if (!isFinite(lat) || !isFinite(lon)) return json({ error: "lat and lon required" }, 400, 60);
    return json(await tides(lat, lon), 200, 600);
  }
  if (p === "/api/facing") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon");
    if (!isFinite(lat) || !isFinite(lon)) return json({ error: "lat and lon required" }, 400, 60);
    const la = lat.toFixed(3), lo = lon.toFixed(3);
    let j; try { j = await overpass('[out:json][timeout:20];way(around:2500,' + la + ',' + lo + ')["natural"="coastline"];out geom;', 604800); } catch (e) { return json({ ok: false, error: String((e && e.message) || e) }, 200, 30); }
    const f = facingFromWays(+la, +lo, j.elements);
    return json(f && f.distM <= 2500 ? { ok: true, ...f } : { ok: false, reason: "No coastline within 2.5 km of this point" }, 200, 3600);
  }
  if (p === "/api/spots") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon"), r = Math.min(80, Math.max(5, +url.searchParams.get("r") || 40));
    if (!isFinite(lat) || !isFinite(lon)) return json({ error: "lat and lon required" }, 400, 60);
    const dla = r / 110.54, dlo = r / (111.32 * Math.cos(rad2(lat))), bb = [lat - dla, lon - dlo, lat + dla, lon + dlo].map(x => x.toFixed(3)).join(",");
    let j; try { j = await overpass('[out:json][timeout:25];(nwr["sport"="surfing"]["name"](' + bb + ');nwr["surfing"="yes"]["name"](' + bb + '););out center tags 120;', 86400); } catch (e) { return json({ spots: [], error: String((e && e.message) || e) }, 200, 30); }
    const seen = new Set(), spots = [];
    for (const e of j.elements || []) {
      const c = e.center || e, t = e.tags || {}, name = t.name; if (!name || !isFinite(c.lat) || t.shop || t.amenity || t.office || t.craft || t.tourism === "hotel" || seen.has(name.toLowerCase())) continue; seen.add(name.toLowerCase());
      spots.push({ id: e.type + e.id, name, lat: c.lat, lon: c.lon, km: Math.round(hav(lat, lon, c.lat, c.lon) * 10) / 10, kind: (e.tags.natural || e.tags.leisure || e.tags.sport || "") });
    }
    spots.sort((a, b) => a.km - b.km);
    return json({ spots: spots.slice(0, 40), source: "OpenStreetMap contributors" }, 200, 3600);
  }
  if (p === "/api/models") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon");
    if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return json({ error: "lat and lon required" }, 400, 60);
    return json(await models(lat, lon), 200, 900);
  }
  if (p === "/api/cdip" || p === "/api/nwsgrid") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon");
    if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return json({ error: "lat and lon required" }, 400, 60);
    try {
      if (p === "/api/nwsgrid") return json(await nwsGrid(lat, lon, url.searchParams.get("face") == null || url.searchParams.get("face") === "" ? NaN : +url.searchParams.get("face")), 200, 900);
      return json(await cdipForecast(lat, lon, env, url.searchParams.get("debug") === "1"), 200, url.searchParams.get("debug") === "1" ? 0 : 900);
    } catch (e) { return json({ supported: false, reason: String((e && e.message) || e) }, 200, 60); }
  }
  if (p === "/api/sccoos/alert") {
    try { return json(habAlertText(await habGet(env)), 200, 300); } catch (e) { return json({ status: "stale", title: "Dawn Patrol", body: "The Scripps Pier algae report is not available right now." }, 200, 60); }
  }
  if (p === "/api/sccoos") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon");
    if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return json({ error: "lat and lon required" }, 400, 60);
    const km = hav(lat, lon, HAB.lat, HAB.lon);
    if (km > HAB.km) return json({ supported: false, reason: "Scripps Pier is " + Math.round(km) + " km away (the report covers spots within " + HAB.km + " km)", km: Math.round(km) }, 200, 3600);
    try { return json({ ...(await habGet(env)), km: Math.round(km * 10) / 10 }, 200, 1800); } catch (e) { return json({ supported: false, reason: String((e && e.message) || e) }, 200, 60); }
  }
  if (p === "/api/pacioos" || p === "/api/beachwq" || p === "/api/ensemble") {
    const lat = +url.searchParams.get("lat"), lon = +url.searchParams.get("lon");
    if (!isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return json({ error: "lat and lon required" }, 400, 60);
    try {
      if (p === "/api/pacioos") return json(await pacioos(lat, lon), 200, 900);
      if (p === "/api/beachwq") return json(await beachWq(lat, lon, env), 200, 1800);
      return json(await ensemble(lat, lon), 200, 1800);
    } catch (e) { return json({ supported: false, reason: String((e && e.message) || e) }, 200, 60); }
  }
  if (p === "/api/drive") {
    // Driving time and distance from one origin to up to 24 spots, from the public OSRM routing server. Nothing is stored here.
    const ll = s => { const m = String(s || "").split(","); const lat = +m[0], lon = +m[1]; return m.length === 2 && isFinite(lat) && isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? { lat, lon } : null; };
    const from = ll(url.searchParams.get("from")), tos = String(url.searchParams.get("to") || "").split("|").filter(Boolean).slice(0, 24).map(s => ll(s));
    if (!from || !tos.length || tos.some(t => !t)) return json({ error: "from and to required" }, 400, 60);
    const coords = [from, ...tos].map(c => c.lon.toFixed(6) + "," + c.lat.toFixed(6)).join(";");
    const dest = tos.map((_, i) => i + 1).join(";");
    try {
      const r = await fetch("https://router.project-osrm.org/table/v1/driving/" + coords + "?sources=0&destinations=" + dest + "&annotations=duration,distance", { headers: UA, signal: AbortSignal.timeout(9000) });
      if (!r.ok) return json({ supported: false, reason: "Routing service returned " + r.status }, 200, 120);
      const j = await r.json();
      if (j.code !== "Ok" || !j.durations || !j.durations[0]) return json({ supported: false, reason: String(j.code || "no route") }, 200, 120);
      const rows = j.durations[0].map((s, i) => s == null ? null : { min: Math.round(s / 60), km: Math.round(((j.distances && j.distances[0][i]) || 0) / 100) / 10 });
      return json({ supported: true, rows, source: "OpenStreetMap routing (OSRM)" }, 200, 900);
    } catch (e) { return json({ supported: false, reason: String((e && e.message) || e) }, 200, 60); }
  }
  const sm = p.match(/^\/api\/spectra\/([A-Za-z0-9]{3,8})$/);
  if (sm) {
    try { const o = await spectra(sm[1].toUpperCase()); return o ? json(o, 200, 600) : json({ error: "No spectral data for station " + sm[1].toUpperCase() }, 404, 120); } catch (e) { return json({ error: String((e && e.message) || e) }, 502, 60); }
  }
  return null;
}

/* ---------- helpers shared by the share links ---------- */
const NS = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...CORS } });
const rnd = n => b64u(crypto.getRandomValues(new Uint8Array(n)));
const shaHex = async t => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))].map(b => b.toString(16).padStart(2, "0")).join("");

/* ---------- short share links: a spots bundle kept for 90 days ---------- */
const SHARE_KEYS = ["app", "v", "kind", "created", "spots", "favs", "home", "notes", "cams", "prefs", "layout", "presets", "trips"];
async function shareApi(req, url, env) {
  if (!env || !env.SITE) return NS({ error: "Storage is not set up" }, 503);
  const m = /^\/api\/share\/([A-Za-z0-9_-]{6,16})$/.exec(url.pathname);
  if (m && req.method === "GET") { const d = await env.SITE.get("sh:" + m[1], "text"); return d ? new Response(d, { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300", ...CORS } }) : NS({ error: "This link has expired or does not exist." }, 404); }
  if (url.pathname !== "/api/share" || req.method !== "POST") return NS({ error: "Unknown endpoint" }, 404);
  const raw = await req.text(); if (raw.length > 60000) return NS({ error: "That is too much to share by link. Untick some items or use a file." }, 413);
  let b; try { b = JSON.parse(raw); } catch (e) { return NS({ error: "JSON body required" }, 400); }
  if (!b || typeof b !== "object" || Array.isArray(b) || b.app !== "dawn-patrol" || +b.v !== 1) return NS({ error: "Not a Dawn Patrol export" }, 400);
  const out = {}; SHARE_KEYS.forEach(k => { if (b[k] !== undefined) out[k] = b[k]; });
  const ip = req.headers.get("cf-connecting-ip") || "x", rl = "rl:sh:" + (await shaHex(ip)).slice(0, 24), n = +(await env.SITE.get(rl)) || 0;
  if (n >= 20) return NS({ error: "Too many links today. Try again tomorrow." }, 429);
  await env.SITE.put(rl, String(n + 1), { expirationTtl: 86400 });
  const id = rnd(6); await env.SITE.put("sh:" + id, JSON.stringify(out), { expirationTtl: 90 * 86400 });
  return NS({ ok: true, id, days: 90 }, 201);
}

/* ---------- public docs and source: /docs (rendered) and /source (raw files kept in KV under repo/) ---------- */
const DOC_NAV = [["README", "Overview"], ["ARCHITECTURE", "Architecture"], ["DEPLOYMENT", "Deployment"], ["API", "API"], ["DATA_SOURCES", "Data sources"], ["TESTING", "Testing"], ["USER_GUIDE", "User guide"], ["WINDOWS", "Windows"], ["CONTRIBUTING", "Contributing"], ["SECURITY", "Security"], ["CHANGELOG", "Changelog"], ["TERMS", "Terms"], ["PRIVACY", "Privacy"]];
const escH = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const DOC_CSS = ":root{color-scheme:light dark;--bg:#fbfaf7;--ink:#14232a;--mut:#5a6b73;--line:#d9dfe0;--code:#eef1f0;--acc:#0a6f8a}@media(prefers-color-scheme:dark){:root{--bg:#0a171c;--ink:#e6eef0;--mut:#9db0b6;--line:#243a42;--code:#12262d;--acc:#5cc4de}}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}a{color:var(--acc)}header{border-bottom:1px solid var(--line);padding:10px 16px;display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center}header b{margin-right:6px}header a{text-decoration:none;font-size:14px;padding:6px 2px}header a[aria-current]{font-weight:700;text-decoration:underline}main{max-width:52rem;margin:0 auto;padding:16px 16px 64px}h1,h2,h3,h4{line-height:1.25;margin:1.6em 0 .5em}h1{margin-top:.6em}pre{background:var(--code);padding:12px;border-radius:8px;overflow-x:auto;font-size:13px;line-height:1.45}code{background:var(--code);padding:1px 5px;border-radius:4px;font-size:.9em}pre code{background:none;padding:0}table{border-collapse:collapse;display:block;overflow-x:auto;max-width:100%;margin:1em 0;font-size:14px}th,td{border:1px solid var(--line);padding:6px 10px;text-align:left;vertical-align:top}blockquote{margin:1em 0;padding:0 14px;border-left:3px solid var(--line);color:var(--mut)}li{margin:.2em 0}code{overflow-wrap:anywhere}main{overflow-wrap:anywhere}table,th,td{overflow-wrap:normal}";
const DOC_JS = "var src=document.getElementById('md').textContent;function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}" +
  "function fix(h){if(/^(https?:|mailto:|#)/.test(h))return h;var m=h.match(/^(?:\\.\\/)?(?:docs\\/)?([A-Za-z0-9_-]+)\\.md$/);if(m)return '/docs/'+m[1];return '/source/'+h.replace(/^\\.\\//,'')}" +
  "function inl(s){var codes=[];s=s.replace(/\\x60([^\\x60]+)\\x60/g,function(m,c){codes.push(c);return '\\u0001'+(codes.length-1)+'\\u0002'});s=esc(s);" +
  "s=s.replace(/&lt;(https?:\\/\\/[^&\\s]+)&gt;/g,'<a href=\"$1\">$1</a>');s=s.replace(/\\*\\*([^*]+)\\*\\*/g,'<strong>$1</strong>');s=s.replace(/(^|[^*\\w])\\*([^*\\s][^*]*)\\*/g,'$1<em>$2</em>');" +
  "s=s.replace(/\\[([^\\]]+)\\]\\(([^)\\s]+)\\)/g,function(m,t,h){return '<a href=\"'+fix(h)+'\">'+t+'</a>'});" +
  "return s.replace(/\\u0001(\\d+)\\u0002/g,function(m,i){return '<code>'+esc(codes[+i])+'</code>'})}" +
  "function cells(l){return l.trim().replace(/^\\|/,'').replace(/\\|$/,'').replace(/\\\\\\|/g,'\\u0003').split('|').map(function(c){return c.replace(/\\u0003/g,'|').trim()})}" +
  "var L=src.split('\\n'),o=[],i=0,p=[];function flush(){if(p.length){o.push('<p>'+inl(p.join(' '))+'</p>');p=[]}}" +
  "while(i<L.length){var l=L[i],m;if(/^\\x60\\x60\\x60/.test(l)){flush();var b=[];i++;while(i<L.length&&!/^\\x60\\x60\\x60/.test(L[i])){b.push(L[i]);i++}i++;o.push('<pre><code>'+esc(b.join('\\n'))+'</code></pre>');continue}" +
  "if(m=l.match(/^(#{1,4})\\s+(.*)$/)){flush();o.push('<h'+m[1].length+'>'+inl(m[2])+'</h'+m[1].length+'>');i++;continue}" +
  "if(/^\\|/.test(l)&&i+1<L.length&&/^\\|?\\s*:?-{2,}/.test(L[i+1])){flush();var h=cells(l),t='<table><thead><tr>'+h.map(function(c){return '<th>'+inl(c)+'</th>'}).join('')+'</tr></thead><tbody>';i+=2;while(i<L.length&&/^\\|/.test(L[i])){t+='<tr>'+cells(L[i]).map(function(c){return '<td>'+inl(c)+'</td>'}).join('')+'</tr>';i++}o.push(t+'</tbody></table>');continue}" +
  "if(/^\\s*[-*]\\s+/.test(l)||/^\\s*\\d+\\.\\s+/.test(l)){flush();var ord=/^\\s*\\d+\\./.test(l),it=[];while(i<L.length&&(/^\\s*[-*]\\s+/.test(L[i])||/^\\s*\\d+\\.\\s+/.test(L[i])||(/^\\s+\\S/.test(L[i])&&it.length))){if(/^\\s*([-*]|\\d+\\.)\\s+/.test(L[i]))it.push(L[i].replace(/^\\s*([-*]|\\d+\\.)\\s+/,''));else it[it.length-1]+=' '+L[i].trim();i++}o.push((ord?'<ol>':'<ul>')+it.map(function(x){return '<li>'+inl(x)+'</li>'}).join('')+(ord?'</ol>':'</ul>'));continue}" +
  "if(/^>\\s?/.test(l)){flush();var q=[];while(i<L.length&&/^>\\s?/.test(L[i])){q.push(L[i].replace(/^>\\s?/,''));i++}o.push('<blockquote>'+inl(q.join(' '))+'</blockquote>');continue}" +
  "if(!l.trim()){flush();i++;continue}p.push(l.trim());i++}flush();document.getElementById('out').innerHTML=o.join('\\n');var h1=document.querySelector('h1');if(h1)document.title=h1.textContent+' | Dawn Patrol docs';";
function docPage(name, md) {
  const nav = DOC_NAV.map(([k, t]) => '<a href="/docs/' + (k === "README" ? "" : k) + '"' + (k === name ? ' aria-current="page"' : "") + ">" + t + "</a>").join("");
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dawn Patrol docs</title><style>' + DOC_CSS + "</style></head><body><header><b>Dawn Patrol</b>" + nav + '<a href="/source/">Source files</a><a href="/">Open the app</a></header><main id="out"></main><script type="text/plain" id="md">' + md.replace(/<\/(script)/gi, "<\\/$1") + "</script><script>" + DOC_JS.replace(/<\/script/gi, "<\\/script") + "</script></body></html>";
}
async function repoPages(req, url, env, key) {
  const H = { "x-content-type-options": "nosniff", "cache-control": "public, max-age=300" }, head = req.method === "HEAD";
  if (key === "docs" || key.startsWith("docs/")) {
    const name = key.replace(/^docs\/?/, "").replace(/\/$/, "") || "README";
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(name)) return new Response("Not found", { status: 404 });
    const md = name === "README" ? await env.SITE.get("repo/README.md", "text") : (await env.SITE.get("repo/docs/" + name + ".md", "text")) || (await env.SITE.get("repo/" + name + ".md", "text"));
    if (md == null) return new Response("Not found", { status: 404 });
    return new Response(head ? null : docPage(name, md), { headers: { ...H, "content-type": "text/html; charset=utf-8" } });
  }
  const path = key.replace(/^source\/?/, "");
  if (path === "" || path.endsWith("/")) {
    const keys = []; let cursor;
    do { const l = await env.SITE.list({ prefix: "repo/" + path, cursor }); keys.push(...l.keys.map(k => k.name.slice(5))); cursor = l.list_complete ? null : l.cursor; } while (cursor);
    keys.sort();
    const rows = keys.map(k => '<li><a href="/source/' + escH(k) + '">' + escH(k) + "</a></li>").join("");
    const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dawn Patrol source files</title><style>' + DOC_CSS + "li{font-family:ui-monospace,Menlo,monospace;font-size:14px}ul{padding-left:18px}</style></head><body><header><b>Dawn Patrol</b><a href=\"/docs/\">Docs</a><a href=\"/source/\" aria-current=\"page\">Source files</a><a href=\"/\">Open the app</a></header><main><h1>Source files</h1><p>Plain text, read-only. Start with <a href=\"/docs/\">the README</a> and <a href=\"/docs/ARCHITECTURE\">the architecture notes</a>. Icons are at <a href=\"/icon-512.png\">/icon-512.png</a>.</p><ul>" + (rows || "<li>No files here.</li>") + "</ul></main></body></html>";
    return new Response(head ? null : html, { headers: { ...H, "content-type": "text/html; charset=utf-8" } });
  }
  if (path.length > 120 || path.includes("..") || !/^[A-Za-z0-9_.\/-]+$/.test(path)) return new Response("Not found", { status: 404 });
  const body = await env.SITE.get("repo/" + path, "text");
  if (body == null) return new Response("Not found", { status: 404 });
  return new Response(head ? null : body, { headers: { ...H, "content-type": "text/plain; charset=utf-8" } });
}

/* ---- Extra weather sources: WeatherAPI.com (marine and wind) and Visual Crossing (wind), free plans only.
   The keys are Worker secrets. Answers are cached for six hours per 0.05 degree cell, and daily call budgets keep both
   vendors inside their free limits. Only normalised numbers leave this code, never a key or a vendor address. ---- */
const XS_TTL = 21600, XS_VC_COST = 80, XS_VC_DAY = 900, XS_WA_DAY = 3000, XS_IP_HOUR = 24;
const XS_CREDIT = { wa: { name: "WeatherAPI.com", url: "https://www.weatherapi.com/" }, vc: { name: "Visual Crossing", url: "https://www.visualcrossing.com/" } };
const xsRound = v => Math.round(v * 20) / 20;
const xsNum = v => { if (v == null || v === "") return null; const n = +v; return isFinite(n) ? Math.round(n * 10) / 10 : null; };
async function xsBudget(env, key, add, cap, ttl) {
  const cur = +(await env.SITE.get(key)) || 0;
  if (cur + add > cap) return false;
  await env.SITE.put(key, String(cur + add), { expirationTtl: ttl });
  return true;
}
async function xsWeatherApi(lat, lon, env) {
  if (!env.WEATHERAPI_KEY) return { ok: false, reason: "not configured" };
  if (!(await xsBudget(env, "xs:wa:" + new Date().toISOString().slice(0, 10), 1, XS_WA_DAY, 172800))) return { ok: false, reason: "daily budget used" };
  let r;
  try { r = await fetch("https://api.weatherapi.com/v1/marine.json?key=" + encodeURIComponent(env.WEATHERAPI_KEY) + "&q=" + lat.toFixed(3) + "," + lon.toFixed(3) + "&days=3", { headers: UA }); } catch (e) { return { ok: false, reason: "network" }; }
  if (!r.ok) return { ok: false, reason: "HTTP " + r.status };
  let j; try { j = await r.json(); } catch (e) { return { ok: false, reason: "bad answer" }; }
  const days = (j && j.forecast && j.forecast.forecastday) || [], L = (j && j.location) || {};
  const le = +L.localtime_epoch, lt = String(L.localtime || "");
  let off = 0;
  if (isFinite(le) && /^\d{4}-\d\d-\d\d \d{1,2}:\d\d$/.test(lt)) { const p = lt.split(/[- :]/).map(Number); off = Math.round((Date.UTC(p[0], p[1] - 1, p[2], p[3], p[4]) / 1000 - le) / 900) * 900; }
  const o = { ok: true, off, tz: typeof L.tz_id === "string" ? L.tz_id : null, lat: isFinite(+L.lat) ? +L.lat : lat, lon: isFinite(+L.lon) ? +L.lon : lon, t: [], sigH: [], swH: [], swT: [], swD: [], wsp: [], wdir: [], gust: [], temp: [], water: [] };
  for (const d of days) for (const h of (d.hour || [])) {
    let e = +h.time_epoch;
    if (!isFinite(e)) { const p = String(h.time || "").split(/[- :]/).map(Number); if (p.length < 5 || !isFinite(p[0])) continue; e = Date.UTC(p[0], p[1] - 1, p[2], p[3], p[4]) / 1000 - off; }
    o.t.push(e); o.sigH.push(xsNum(h.sig_ht_mt)); o.swH.push(xsNum(h.swell_ht_mt)); o.swT.push(xsNum(h.swell_period_secs)); o.swD.push(xsNum(h.swell_dir));
    o.wsp.push(xsNum(h.wind_kph)); o.wdir.push(xsNum(h.wind_degree)); o.gust.push(xsNum(h.gust_kph)); o.temp.push(xsNum(h.temp_c)); o.water.push(xsNum(h.water_temp_c));
  }
  if (!o.t.length) return { ok: false, reason: "no hours" };
  return o;
}
async function xsVisualCrossing(lat, lon, env) {
  if (!env.VISUALCROSSING_KEY) return { ok: false, reason: "not configured" };
  if (!(await xsBudget(env, "xs:vc:" + new Date().toISOString().slice(0, 10), XS_VC_COST, XS_VC_DAY, 172800))) return { ok: false, reason: "daily budget used" };
  let r;
  try { r = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + lat.toFixed(3) + "," + lon.toFixed(3) + "/next2days?unitGroup=metric&include=hours&elements=datetimeEpoch,temp,windspeed,windgust,winddir,precipprob,cloudcover&contentType=json&key=" + encodeURIComponent(env.VISUALCROSSING_KEY), { headers: UA }); } catch (e) { return { ok: false, reason: "network" }; }
  if (!r.ok) return { ok: false, reason: "HTTP " + r.status };
  let j; try { j = await r.json(); } catch (e) { return { ok: false, reason: "bad answer" }; }
  const o = { ok: true, off: Math.round((+j.tzoffset || 0) * 3600), tz: typeof j.timezone === "string" ? j.timezone : null, t: [], wsp: [], gust: [], wdir: [], temp: [], pop: [], cloud: [] };
  for (const d of (j.days || [])) for (const h of (d.hours || [])) {
    const e = +h.datetimeEpoch; if (!isFinite(e)) continue;
    o.t.push(e); o.wsp.push(xsNum(h.windspeed)); o.gust.push(xsNum(h.windgust)); o.wdir.push(xsNum(h.winddir)); o.temp.push(xsNum(h.temp)); o.pop.push(xsNum(h.precipprob)); o.cloud.push(xsNum(h.cloudcover));
  }
  if (!o.t.length) return { ok: false, reason: "no hours" };
  return o;
}
async function xsrc(lat, lon, env, ip) {
  lat = xsRound(lat); lon = xsRound(lon);
  const key = "xs:" + lat.toFixed(2) + ":" + lon.toFixed(2);
  const hit = await env.SITE.get(key, "json");
  if (hit && hit.exp > Date.now() && hit.out) return hit.out;
  if (!(await xsBudget(env, "xs:ip:" + ip + ":" + new Date().toISOString().slice(0, 13), 1, XS_IP_HOUR, 7200))) return { supported: false, reason: "busy" };
  const [wa, vc] = await Promise.all([xsWeatherApi(lat, lon, env), xsVisualCrossing(lat, lon, env)]);
  const good = (wa.ok ? 1 : 0) + (vc.ok ? 1 : 0);
  const out = { supported: good > 0, at: Date.now(), wa, vc, credit: XS_CREDIT };
  if (good) { const ttl = good === 2 ? XS_TTL : 900; await env.SITE.put(key, JSON.stringify({ exp: Date.now() + ttl * 1000, out }), { expirationTtl: ttl }); }
  return out;
}

export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(pushTick(env, new Date(event.scheduledTime || Date.now()))); },
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (url.pathname === "/api/share" || url.pathname.startsWith("/api/share/")) { try { return await shareApi(req, url, env); } catch (e) { return NS({ error: "Share service error" }, 502); } }
    if (url.pathname.startsWith("/api/push/")) { try { return await pushApi(req, url, env); } catch (e) { return json({ error: String((e && e.message) || e) }, 502, 0); } }
    if (req.method !== "GET" && req.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
    if (url.pathname === "/api/xsrc") {
      const la = url.searchParams.get("lat"), lo = url.searchParams.get("lon"), lat = +la, lon = +lo;
      if (!la || !lo || !isFinite(lat) || !isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return json({ error: "lat and lon required" }, 400, 60);
      try { return json(await xsrc(lat, lon, env, req.headers.get("cf-connecting-ip") || "-"), 200, 900); }
      catch (e) { return json({ supported: false, reason: "error" }, 200, 60); }
    }
    if (url.pathname.startsWith("/api/")) {
      try { const r = await api(url, env); return r || json({ error: "Unknown endpoint" }, 404, 60); }
      catch (e) { return json({ error: String((e && e.message) || e) }, 502, 30); }
    }
    let key = url.pathname.replace(/^\/+/, "");
    if (key === "") key = "index.html";
    if (key === "windows" || key === "windows/") key = "windows/index.html";
    if (ICONS[key]) {
      const b64 = await env.SITE.get(ICONS[key], "text"); if (b64 == null) return new Response("Not found", { status: 404 });
      return new Response(Uint8Array.from(atob(b64), c => c.charCodeAt(0)), { headers: { "content-type": "image/png", "cache-control": "public, max-age=86400" } });
    }
    if (/^(terms|privacy)\/?$/.test(key)) key = "docs/" + key.replace(/\/$/, "").toUpperCase();
    if (key === "docs" || key.startsWith("docs/") || key === "source" || key.startsWith("source/")) { try { return await repoPages(req, url, env, key); } catch (e) { return new Response("Docs unavailable", { status: 502 }); } }
    if (!FILES.has(key)) return new Response("Not found", { status: 404 });
    const body = await env.SITE.get(key, "text");
    if (body == null) return new Response("Not found", { status: 404 });
    return new Response(req.method === "HEAD" ? null : body, { headers: {
      "content-type": TYPES[key.split(".").pop()] || "text/plain; charset=utf-8",
      "cache-control": key === "sw.js" ? "no-cache" : "public, max-age=300",
      "x-content-type-options": "nosniff"
    } });
  }
};
