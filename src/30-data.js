/* ============================================================
   DATA LAYER  (no DOM access in this file, so it can be unit-tested in Node)
   ============================================================ */
const DIRS16 = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rad = d => d * Math.PI / 180;
const norm360 = d => ((d % 360) + 360) % 360;
const angDiff = (a, b) => { const d = Math.abs(norm360(a) - norm360(b)); return d > 180 ? 360 - d : d; };
const dirName = d => (d == null ? '–' : DIRS16[Math.round(norm360(d) / 22.5) % 16]);
const interp = (pts, x) => {
  if (x <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (x <= pts[i][0]) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0); }
  }
  return pts[pts.length - 1][1];
};

/* ---------- time helpers: API times are local wall-clock strings "YYYY-MM-DDTHH:MM" ---------- */
const WD = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const parseT = s => {
  const m = /^(\d{4})-(\d\d)-(\d\d)(?:T(\d\d):(\d\d))?/.exec(s);
  return { y: +m[1], mo: +m[2], d: +m[3], h: +(m[4] || 0), mi: +(m[5] || 0) };
};
const epochOf = (s, off) => { const t = parseT(s); return Date.UTC(t.y, t.mo - 1, t.d, t.h, t.mi) / 1000 - (off || 0); };
const localStr = (ms, off) => new Date(ms + off * 1000).toISOString().slice(0, 16);
const dow = s => { const t = parseT(s); return new Date(Date.UTC(t.y, t.mo - 1, t.d)).getUTCDay(); };
const fmtHr = s => { const h = parseT(s).h; return (h % 12 || 12) + (h < 12 ? ' AM' : ' PM'); };
const fmtClock = s => { const t = parseT(s); return (t.h % 12 || 12) + ':' + String(t.mi).padStart(2, '0') + (t.h < 12 ? ' AM' : ' PM'); };
const dayLabel = s => WD[dow(s)] + ' ' + parseT(s).d;
const MONS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const dayLong = s => WD[dow(s)] + ' ' + MONS[parseT(s).mo - 1] + ' ' + parseT(s).d;
const addDays = (dateStr, n) => { const t = parseT(dateStr); return new Date(Date.UTC(t.y, t.mo - 1, t.d + n)).toISOString().slice(0, 10); };

/* ---------- units (API data is fetched metric, converted on display) ---------- */
const cvLen = (m, u) => (m == null ? null : u === 'imperial' ? m * 3.28084 : m);
const cvSpd = (k, u) => (k == null ? null : u === 'imperial' ? k * 0.621371 : k);
const cvTmp = (c, u) => (c == null ? null : u === 'imperial' ? c * 9 / 5 + 32 : c);
const UNIT = { imperial: { len: 'ft', spd: 'mph', tmp: '°F' }, metric: { len: 'm', spd: 'km/h', tmp: '°C' } };
const f1 = v => (v == null || isNaN(v) ? '–' : (Math.round(v * 10) / 10).toFixed(1));
const f0 = v => (v == null || isNaN(v) ? '–' : String(Math.round(v)));

/* ============================================================
   SCORING: transparent heuristic, not a substitute for looking at the water
   ============================================================ */
const PERIOD_PTS = [[4,0],[6,4],[8,10],[10,16],[12,24],[14,31],[18,35]];
const BANDS = [{ max: 25, name: 'Poor' }, { max: 50, name: 'Fair' }, { max: 70, name: 'Good' }, { max: 85, name: 'Great' }, { max: 101, name: 'Epic' }];
const bandOf = s => { for (let i = 0; i < BANDS.length; i++) if (s < BANDS[i].max) return i; return BANDS.length - 1; };

/* a beach facing plus an optional list of swell directions (compass bearings) the spot works from.
   The result still behaves like the facing number, so wind maths is unchanged. */
function mkFace(face, win, depth) {
  const hasWin = Array.isArray(win) && win.length > 0, hasDepth = depth != null && isFinite(depth) && depth > 0;
  if (face == null || (!hasWin && !hasDepth)) return face;
  const n = new Number(face); if (hasWin) n.win = win.slice(); if (hasDepth) n.depth = +depth; return n;
}
/* break depth (m) at a spot, from the surfer's own entry. Waves shoal as they reach shallow water (linear wave
   theory, no refraction) and cannot break in water shallower than about 0.78 times their height (McCowan). */
const BREAK_DEPTH_RATIO = 0.78;
function shoalFactor(T, h) {
  if (!(T > 0) || !(h > 0)) return 1;
  const w = 2 * Math.PI / T, g = 9.81;
  let k = w * w / g;
  for (let i = 0; i < 60; i++) { const kn = w * w / (g * Math.tanh(k * h)); if (!isFinite(kn)) return 1; if (Math.abs(kn - k) < 1e-9) { k = kn; break; } k = 0.5 * (k + kn); }
  const c = w / k, kh2 = 2 * k * h, n = 0.5 * (1 + kh2 / Math.sinh(kh2)), cg = n * c, cg0 = g / (2 * w);
  const f = Math.sqrt(cg0 / cg);
  /* only growth counts: linear theory dips slightly below 1 in intermediate water, and that is ignored */
  return isFinite(f) && f > 1 ? f : 1;
}
/* the breaking height Hb (m), after shoaling over the spot's depth and the depth limit. No depth means no change */
function depthLimit(Hb, T, h) {
  if (!(h > 0) || !(Hb > 0)) return Hb;
  return Math.min(Hb * shoalFactor(T, h), BREAK_DEPTH_RATIO * h);
}
/* the arcs (degrees) a swell window covers: full exposure, and the paler shoulder around it */
function swellArcs(face) {
  if (face == null) return { full: [], pale: [] };
  if (!face.win) return { full: [[face - 50, face + 50]], pale: [[face - 90, face + 90]] };
  const merge = half => {
    const c = face.win.map(norm360).sort((a, b) => a - b), arcs = c.map(x => [x - half, x + half]), out = [];
    arcs.forEach(a => { const l = out[out.length - 1]; if (l && a[0] <= l[1] + 0.01) l[1] = Math.max(l[1], a[1]); else out.push(a.slice()); });
    if (out.length > 1 && out[out.length - 1][1] - 360 >= out[0][0] - 0.01) { const l = out.pop(); out[0][1] = Math.max(out[0][1], l[1] - 360); out[0][0] = l[0] - 360; }
    return out;
  };
  return { full: merge(11.25), pale: merge(33.75) };
}
function exposure(swellDir, face) {
  if (swellDir == null || face == null) return 0.8;
  if (face.win) {
    let m = 360; face.win.forEach(c => { m = Math.min(m, angDiff(swellDir, c)); });
    if (m <= 11.25) return 1;
    if (m <= 33.75) return 1 - (m - 11.25) / 22.5 * 0.5;
    return Math.max(0.12, 0.5 - (m - 33.75) / 56.25 * 0.38);
  }
  const d = angDiff(swellDir, face);          // swell direction = where it comes FROM
  if (d <= 50) return 1;
  if (d <= 90) return 1 - (d - 50) / 40 * 0.6;
  return Math.max(0.12, 0.4 - (d - 90) / 90 * 0.28);
}
function windRel(kph, dirFrom, face) {
  if (kph == null || dirFrom == null || face == null) return { c: 0, kind: 'none', label: '–' };
  const c = Math.cos(rad(angDiff(dirFrom, face)));   // +1 = blowing in from the sea (onshore), -1 = offshore
  let label, kind;
  if (kph < 8) { kind = 'light'; label = 'Light'; }
  else if (c <= -0.7) { kind = 'off'; label = 'Offshore'; }
  else if (c <= -0.3) { kind = 'off'; label = 'Side-offshore'; }
  else if (c < 0.3) { kind = 'cross'; label = 'Cross-shore'; }
  else if (c < 0.7) { kind = 'on'; label = 'Side-onshore'; }
  else { kind = 'on'; label = 'Onshore'; }
  return { c, kind, label };
}
function windScore(kph, dirFrom, face) {
  if (kph == null || dirFrom == null) return 15;
  if (kph < 8) return 30;
  const { c } = windRel(kph, dirFrom, face);
  if (c <= -0.3) return clamp(30 - Math.max(0, kph - 22) * 0.6, 12, 30);
  if (c < 0.3) return clamp(22 - (kph - 8) * 0.5, 4, 22);
  return clamp(18 - (kph - 8) * 0.8 * (0.5 + c * 0.5), 0, 18);
}
/* v: {wH,wT,wD,wwH,sH,sT,sD,s2H,s2T,s2D,wsp,wdir} (metric, kph) */
/* breaking face height (m) -> size points. Uses the breaking-wave estimate, so long-period swell gets the size it really brings */
const SURF_PTS = [[0,0],[0.3,3],[0.6,8],[0.9,13],[1.2,18],[1.6,23],[2,25],[3.2,25],[4.5,20],[6,14],[9,8]];
/* Surfing level tailors the score. Advanced keeps the original size curve. Beginner and Intermediate peak at smaller waves, and are scored
   down further once the top of the estimated surf size passes their limit (Beginner 4 ft, Intermediate 8 ft). The app sets the level with setSurfLevel. */
const LEVEL_IDS = ['beginner', 'intermediate', 'advanced'];
const SURF_PTS_LEVEL = {
  beginner: [[0,0],[0.3,4],[0.5,12],[0.7,20],[0.9,25],[1.0,25],[1.2,20],[1.5,10],[2,4],[3,0]],
  intermediate: [[0,0],[0.3,3],[0.6,10],[0.9,17],[1.2,23],[1.5,25],[2.1,25],[2.7,20],[3.5,13],[5,7],[9,3]],
  advanced: SURF_PTS,
};
const LEVEL_LIMIT_FT = { beginner: 4, intermediate: 8 };
let SURF_LEVEL = 'advanced';
const setSurfLevel = l => { SURF_LEVEL = LEVEL_IDS.indexOf(l) >= 0 ? l : 'intermediate'; return SURF_LEVEL; };
/* 1 up to the limit, then Beginner loses 10% of the score per extra foot (down to a quarter) and Intermediate 6% (down to 40%) */
function levelFactor(faceM, level) {
  const lim = LEVEL_LIMIT_FT[level]; if (!lim || !(faceM > 0)) return 1;
  const over = faceM * 3.28084 * 1.25 - lim; if (over <= 0) return 1;
  return level === 'beginner' ? Math.max(0.25, 1 - over * 0.10) : Math.max(0.4, 1 - over * 0.06);
}
/* swell is the main driver: period (35) and size (25) make 60 of the 75 points; wind is secondary, so its 30-point scale is halved to 15 */
const WIND_SHARE = 0.5, SCORE_POINTS = 35 + 25 + 30 * WIND_SHARE;
const BREAK_K = 0.39 * Math.pow(9.81, 0.2), FACE_SHARE = 0.7;
/* Every swell train that reaches the beach adds energy, so the trains are combined by energy (height squared),
   each weighted by how squarely it hits this beach. The combined height and energy-weighted period then give
   a breaking height (Komar and Gaul), which drives the size points. */
function scoreHour(v, face) {
  let sw = [
    { H: v.sH, T: v.sT, D: v.sD, k: 0 },
    { H: v.s2H, T: v.s2T, D: v.s2D, k: 1 },
  ].filter(s => s.H != null && s.T != null && s.H > 0);
  if (!sw.length && v.wH != null && v.wT != null) sw = [{ H: v.wH, T: v.wT, D: v.wD, k: 0 }];
  if (!sw.length) return null;
  let E = 0, E0 = 0, ET = 0, best = null;
  for (const s of sw) {
    const ex = exposure(s.D, face), e = s.H * s.H * ex;
    E += e; E0 += s.H * s.H; ET += e * s.T;
    if (!best || e > best.e) best = { e, k: s.k };
  }
  const Heff = Math.sqrt(E), Teff = E > 0 ? ET / E : sw[0].T, ex = E0 > 0 ? E / E0 : 0;
  const dp = face && face.depth, Hb = Heff > 0 ? depthLimit(BREAK_K * Math.pow(Teff * Heff * Heff, 0.4), Teff, dp) : 0;
  const faceH = Hb * FACE_SHARE;
  const period = interp(PERIOD_PTS, Teff) * ex, size = interp(SURF_PTS_LEVEL[SURF_LEVEL] || SURF_PTS, faceH);
  /* clean wind only matters as much as there are waves to groom: flat and glassy is not a good surf */
  const wind = WIND_SHARE * windScore(v.wsp, v.wdir, face) * Math.min(1, (period + size) / 35);
  const ratio = v.wwH != null && v.wH > 0 ? clamp(v.wwH / v.wH, 0, 1) : 0;
  const chop = 10 * ratio * (v.wsp > 15 ? 1 : 0.5);
  const lf = levelFactor(faceH, SURF_LEVEL), score = clamp(Math.round(((period + size + wind) / SCORE_POINTS * 100 - chop) * lf), 0, 100);
  return { score, band: bandOf(score), swell: best.k, parts: { period, size, exposure: ex, wind, chop, faceH, lf } };
}

/* ============================================================
   Hourly series alignment (marine and weather models can use different time zones)
   ============================================================ */
const MARINE_KEYS = { wH:'wave_height', wT:'wave_period', wD:'wave_direction', wwH:'wind_wave_height', wwT:'wind_wave_period', wwD:'wind_wave_direction',
  sH:'swell_wave_height', sT:'swell_wave_period', sD:'swell_wave_direction', s2H:'secondary_swell_wave_height', s2T:'secondary_swell_wave_period', s2D:'secondary_swell_wave_direction',
  sst:'sea_surface_temperature', curV:'ocean_current_velocity', curD:'ocean_current_direction', tide:'sea_level_height_msl' };
const WX_KEYS = { temp:'temperature_2m', feels:'apparent_temperature', hum:'relative_humidity_2m', cloud:'cloud_cover', press:'pressure_msl', wsp:'wind_speed_10m', wdir:'wind_direction_10m',
  gust:'wind_gusts_10m', code:'weather_code', pop:'precipitation_probability', prcp:'precipitation', uv:'uv_index', vis:'visibility' };

function alignHourly(wxH, wxOff, mH, mOff) {
  const n = wxH.time.length, out = { t: wxH.time.slice(), n };
  const idx = new Map();
  if (mH && mH.time) mH.time.forEach((s, j) => idx.set(epochOf(s, mOff), j));
  const map = new Array(n);
  for (let i = 0; i < n; i++) { const j = idx.get(epochOf(wxH.time[i], wxOff)); map[i] = j == null ? -1 : j; }
  for (const k in MARINE_KEYS) {
    const src = mH && mH[MARINE_KEYS[k]];
    out[k] = new Array(n).fill(null);
    if (src) for (let i = 0; i < n; i++) if (map[i] >= 0) { const v = src[map[i]]; out[k][i] = v == null ? null : v; }
  }
  for (const k in WX_KEYS) {
    const src = wxH[WX_KEYS[k]];
    out[k] = src ? src.map(v => (v == null ? null : v)) : new Array(n).fill(null);
  }
  return out;
}
const valAt = (H, i) => { const o = { t: H.t[i] }; for (const k in MARINE_KEYS) o[k] = H[k][i]; for (const k in WX_KEYS) o[k] = H[k][i]; return o; };
const hasMarine = H => !!H && H.wH.some(v => v != null) || !!H && H.sH.some(v => v != null);
const scoresFor = (H, face) => H.t.map((_, i) => scoreHour(valAt(H, i), face));
const hourIndexNow = (H, off, nowMs) => {
  const want = localStr(nowMs == null ? Date.now() : nowMs, off).slice(0, 13) + ':00';
  const i = H.t.indexOf(want);
  return i >= 0 ? i : 0;
};

/* ---------- tides from model sea level ---------- */
function tideExtrema(t, v) {
  const out = [];
  for (let i = 1; i < v.length - 1; i++) {
    const a = v[i - 1], b = v[i], c = v[i + 1];
    if (a == null || b == null || c == null) continue;
    if (b >= a && b > c) out.push({ i, t: t[i], h: b, type: 'high' });
    else if (b <= a && b < c) out.push({ i, t: t[i], h: b, type: 'low' });
  }
  return out;
}
function tideSummary(H, i) {
  const v = H.tide;
  if (v[i] == null) return null;
  const ex = tideExtrema(H.t, v);
  const next = ex.filter(e => e.i > i);
  const prev = i > 0 && i < v.length - 1 && v[i + 1] != null && v[i - 1] != null ? v[i + 1] - v[i - 1] : 0;
  return { h: v[i], trend: prev > 0.002 ? 'rising' : prev < -0.002 ? 'falling' : 'slack', nextHigh: next.find(e => e.type === 'high') || null, nextLow: next.find(e => e.type === 'low') || null, all: ex };
}

/* ---------- best 3-hour window of a day (daylight only) ---------- */
function lightRange(sunrise, sunset) {
  const sr = sunrise ? parseT(sunrise) : { h: 6, mi: 0 }, ss = sunset ? parseT(sunset) : { h: 19, mi: 0 };
  return [Math.floor(sr.h + sr.mi / 60 - 0.5), Math.floor(ss.h + ss.mi / 60)];
}
function bestWindow(H, scores, day, sunrise, sunset, len) {
  len = len || 3;
  const [h0, h1] = lightRange(sunrise, sunset);
  const idx = [];
  for (let i = 0; i < H.t.length; i++) if (H.t[i].startsWith(day)) { const h = parseT(H.t[i]).h; if (h >= h0 && h <= h1) idx.push(i); }
  let best = null;
  for (let a = 0; a + len <= idx.length; a++) {
    const seg = idx.slice(a, a + len), vals = seg.map(i => scores[i] ? scores[i].score : null);
    if (vals.some(v => v == null)) continue;
    const avg = vals.reduce((s, v) => s + v, 0) / len;
    if (!best || avg > best.avg) best = { i0: seg[0], i1: seg[len - 1], avg, peak: Math.max(...vals) };
  }
  return best;
}

/* like bestWindow, but only windows whose hours pass ok(indexes) are considered */
function bestWindowIf(H, scores, day, sunrise, sunset, len, ok) {
  len = len || 3;
  const [h0, h1] = lightRange(sunrise, sunset), idx = [];
  for (let i = 0; i < H.t.length; i++) if (H.t[i].startsWith(day)) { const h = parseT(H.t[i]).h; if (h >= h0 && h <= h1) idx.push(i); }
  let best = null;
  for (let a = 0; a + len <= idx.length; a++) {
    const seg = idx.slice(a, a + len), vals = seg.map(i => (scores[i] ? scores[i].score : null));
    if (vals.some(v => v == null) || (ok && !ok(seg))) continue;
    const avg = vals.reduce((s, v) => s + v, 0) / len;
    if (!best || avg > best.avg) best = { i0: seg[0], i1: seg[len - 1], avg, peak: Math.max(...vals) };
  }
  return best;
}

/* ---------- moon ---------- */
function moonInfo(ms) {
  const syn = 29.530588853, ref = Date.UTC(2000, 0, 6, 18, 14) / 1000;
  const days = (ms / 1000 - ref) / 86400, p = ((days % syn) + syn) % syn;
  const names = ['New moon','Waxing crescent','First quarter','Waxing gibbous','Full moon','Waning gibbous','Last quarter','Waning crescent'];
  const name = names[Math.floor(((p / syn) * 8 + 0.5)) % 8];
  const illum = (1 - Math.cos(2 * Math.PI * p / syn)) / 2;
  const toSpring = Math.min(p, Math.abs(p - syn / 2), syn - p);
  return { name, illum, age: p, springs: toSpring < 2 };
}

/* ---------- weather codes, wetsuit ---------- */
const WMO = { 0:'Clear',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Rime fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',56:'Freezing drizzle',57:'Freezing drizzle',
  61:'Light rain',63:'Rain',65:'Heavy rain',66:'Freezing rain',67:'Freezing rain',71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow grains',80:'Showers',81:'Showers',82:'Heavy showers',
  85:'Snow showers',86:'Snow showers',95:'Thunderstorm',96:'Thunderstorm, hail',99:'Thunderstorm, hail' };
const wxText = c => (c == null ? '–' : WMO[c] || 'Weather code ' + c);
function wetsuit(sstC) {
  if (sstC == null) return null;
  if (sstC >= 24) return 'Trunks or bikini';
  if (sstC >= 21) return 'Shorty or spring suit';
  if (sstC >= 18) return '3/2 mm full suit';
  if (sstC >= 15) return '4/3 mm full suit';
  if (sstC >= 11) return '5/4 mm, boots';
  return '5/4 mm, boots, hood, gloves';
}

/* ============================================================
   SYNTHETIC DEMO DATA, shaped exactly like the Open-Meteo responses.
   Only used when the live APIs cannot be reached; always labelled as demo in the UI.
   ============================================================ */
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const seedOf = (lat, lon, q) => Math.round(lat / q) * 7919 + Math.round(lon / q) * 104729 + 17;
function timeAxis(p, days, nowMs) {
  const off = Math.round(p.lon / 15) * 3600;
  const start = Math.floor((nowMs + off * 1000) / 86400000) * 86400000;
  const time = [], th = [];
  for (let i = 0; i < days * 24; i++) { time.push(new Date(start + i * 3600000).toISOString().slice(0, 16)); th.push((start - off * 1000) / 3600000 + i); }
  return { off, time, th, nowLocal: localStr(nowMs, off) };
}
function synthMarine(points, days, vars, nowMs) {
  nowMs = nowMs || Date.now();
  return points.map(p => {
    const ax = timeAxis(p, days, nowMs), reg = mulberry32(seedOf(p.lat, p.lon, 6)), loc = mulberry32(seedOf(p.lat, p.lon, 0.2));
    const ph = [reg(), reg(), reg(), reg(), reg()].map(x => x * 6.283), base = 0.8 + reg() * 0.6, scale = 0.8 + loc() * 0.45, dir0 = 200 + reg() * 100, tphase = loc() * 6.283;
    const H = { time: ax.time };
    const arr = n => new Array(n).fill(0);
    const n = ax.time.length;
    const sH = arr(n), sT = arr(n), sD = arr(n), s2H = arr(n), s2T = arr(n), s2D = arr(n), wwH = arr(n), wwT = arr(n), wwD = arr(n), wH = arr(n), wT = arr(n), wD = arr(n), tide = arr(n), sst = arr(n), cv = arr(n), cd = arr(n);
    for (let i = 0; i < n; i++) {
      const t = ax.th[i], h = parseT(ax.time[i]).h;
      sH[i] = clamp(base + 0.65 * Math.sin(6.283 * t / (24 * 5.3) + ph[0]) + 0.2 * Math.sin(6.283 * t / (24 * 1.9) + ph[1]), 0.25, 5) * scale;
      sT[i] = clamp(11.5 + 3 * Math.sin(6.283 * t / (24 * 7.1) + ph[2]), 7, 17);
      sD[i] = norm360(dir0 + 18 * Math.sin(6.283 * t / (24 * 6) + ph[3]));
      s2H[i] = 0.25 + 0.2 * Math.abs(Math.sin(6.283 * t / (24 * 3.4) + ph[4])); s2T[i] = 8 + 1.5 * Math.sin(6.283 * t / (24 * 4) + ph[1]); s2D[i] = norm360(dir0 + 55);
      wwH[i] = 0.15 + 0.25 * Math.abs(Math.sin(6.283 * t / (24 * 2.3) + ph[2])) + (h >= 12 && h <= 19 ? 0.15 : 0); wwT[i] = 4.5; wwD[i] = norm360(dir0 + 40);
      wH[i] = Math.sqrt(sH[i] ** 2 + s2H[i] ** 2 + wwH[i] ** 2); wT[i] = sT[i] - 0.8; wD[i] = sD[i];
      tide[i] = 0.85 * Math.sin(6.283 * t / 12.4206 + tphase) + 0.2 * Math.sin(6.283 * t / 12.0 + ph[0]) ;
      sst[i] = clamp(27 - Math.abs(p.lat) * 0.32 + 0.6 * Math.sin(6.283 * t / 24 - 2), 4, 31);
      cv[i] = 0.4 + 0.3 * Math.abs(Math.sin(6.283 * t / 12.4206 + tphase)); cd[i] = norm360(dir0 + 90 + 80 * Math.sin(6.283 * t / 12.4206));
    }
    const all = { wave_height: wH, wave_period: wT, wave_direction: wD, wind_wave_height: wwH, wind_wave_period: wwT, wind_wave_direction: wwD,
      swell_wave_height: sH, swell_wave_period: sT, swell_wave_direction: sD, secondary_swell_wave_height: s2H, secondary_swell_wave_period: s2T, secondary_swell_wave_direction: s2D,
      sea_surface_temperature: sst, ocean_current_velocity: cv, ocean_current_direction: cd, sea_level_height_msl: tide };
    (vars || Object.keys(all)).forEach(k => { if (all[k]) H[k] = all[k].map(v => Math.round(v * 100) / 100); });
    return { latitude: p.lat, longitude: p.lon, utc_offset_seconds: ax.off, timezone: 'demo', hourly: H };
  });
}
function synthWeather(points, days, opts, nowMs) {
  nowMs = nowMs || Date.now();
  return points.map(p => {
    const ax = timeAxis(p, days, nowMs), r = mulberry32(seedOf(p.lat, p.lon, 3)), ph = r() * 6.283, face = p.face == null ? 270 : p.face;
    const n = ax.time.length, H = { time: ax.time };
    const keys = ['temperature_2m','apparent_temperature','relative_humidity_2m','cloud_cover','pressure_msl','wind_speed_10m','wind_direction_10m','wind_gusts_10m','weather_code','precipitation_probability','precipitation','uv_index','visibility'];
    keys.forEach(k => (H[k] = new Array(n).fill(0)));
    for (let i = 0; i < n; i++) {
      const t = ax.th[i], h = parseT(ax.time[i]).h + parseT(ax.time[i]).mi / 60;
      const sea = Math.max(0, Math.sin(Math.PI * (h - 9) / 11)), day = Math.floor(i / 24);
      const sp = 5 + 15 * sea + 3 * Math.sin(6.283 * t / (24 * 2.7) + ph) + (day % 4 === 2 ? 5 : 0);
      H.wind_speed_10m[i] = Math.max(1, sp);
      H.wind_gusts_10m[i] = H.wind_speed_10m[i] * 1.35 + 2;
      H.wind_direction_10m[i] = norm360(sea > 0.15 ? face + 15 * Math.sin(ph + day) : face + 180 + 25 * Math.sin(ph + day));
      H.temperature_2m[i] = 24 - Math.abs(p.lat) * 0.28 + 4.5 * Math.sin(Math.PI * (h - 9) / 12) + 1.5 * Math.sin(6.283 * t / (24 * 5) + ph);
      H.apparent_temperature[i] = H.temperature_2m[i] - H.wind_speed_10m[i] * 0.05;
      H.relative_humidity_2m[i] = clamp(70 - 12 * Math.sin(Math.PI * (h - 8) / 12), 35, 95);
      H.cloud_cover[i] = clamp(65 - 55 * sea + 20 * Math.sin(6.283 * t / (24 * 4) + ph), 0, 100);
      H.pressure_msl[i] = 1015 + 4 * Math.sin(6.283 * t / (24 * 4.3) + ph);
      H.weather_code[i] = H.cloud_cover[i] > 75 ? 3 : H.cloud_cover[i] > 45 ? 2 : H.cloud_cover[i] > 20 ? 1 : 0;
      H.precipitation_probability[i] = Math.round(clamp(8 + 12 * Math.sin(6.283 * t / (24 * 6) + ph), 0, 100)); H.precipitation[i] = 0;
      H.uv_index[i] = Math.max(0, (9 - Math.abs(p.lat) / 10) * Math.sin(Math.PI * (h - 6) / 13)) * (1 - H.cloud_cover[i] / 200);
      H.visibility[i] = 24000;
    }
    Object.keys(H).forEach(k => { if (k !== 'time') H[k] = H[k].map(v => Math.round(v * 10) / 10); });
    const D = { time: [], sunrise: [], sunset: [], uv_index_max: [], temperature_2m_max: [], temperature_2m_min: [], precipitation_sum: [], weather_code: [] };
    for (let d = 0; d < days; d++) {
      const date = ax.time[d * 24].slice(0, 10), doy = Math.floor((Date.UTC(parseT(date).y, parseT(date).mo - 1, parseT(date).d) - Date.UTC(parseT(date).y, 0, 0)) / 86400000);
      const decl = 23.44 * Math.sin(2 * Math.PI * (doy - 81) / 365), latR = rad(p.lat);
      const x = clamp(-Math.tan(latR) * Math.tan(rad(decl)), -1, 1), half = Math.acos(x) * 180 / Math.PI / 15;
      const noon = 12 - (p.lon - Math.round(p.lon / 15) * 15) / 15;
      const fmt = hh => { const m = Math.round(hh * 60); return date + 'T' + String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
      D.time.push(date); D.sunrise.push(fmt(noon - half)); D.sunset.push(fmt(noon + half));
      const seg = i => H.temperature_2m.slice(d * 24, d * 24 + 24);
      D.temperature_2m_max.push(Math.max(...seg())); D.temperature_2m_min.push(Math.min(...seg()));
      D.uv_index_max.push(Math.max(...H.uv_index.slice(d * 24, d * 24 + 24))); D.precipitation_sum.push(0); D.weather_code.push(H.weather_code[d * 24 + 13]);
    }
    const ci = ax.time.indexOf(ax.nowLocal.slice(0, 13) + ':00');
    const cur = { time: ax.nowLocal, is_day: 1 };
    ['temperature_2m','apparent_temperature','relative_humidity_2m','cloud_cover','pressure_msl','wind_speed_10m','wind_direction_10m','wind_gusts_10m','weather_code','precipitation'].forEach(k => (cur[k] = H[k][Math.max(0, ci)]));
    const sr = parseT(D.sunrise[0]), ss = parseT(D.sunset[0]), nl = parseT(ax.nowLocal);
    cur.is_day = (nl.h + nl.mi / 60 >= sr.h + sr.mi / 60 && nl.h + nl.mi / 60 <= ss.h + ss.mi / 60) ? 1 : 0;
    return { latitude: p.lat, longitude: p.lon, utc_offset_seconds: ax.off, timezone: 'demo', hourly: H, daily: D, current: cur };
  });
}

/* ============================================================
   LIVE API (Open-Meteo: free, no key, CORS-enabled)
   ============================================================ */
const MARINE_FULL = Object.values(MARINE_KEYS);
const MARINE_CORE = ['wave_height','wave_direction','wave_period','wind_wave_height','wind_wave_direction','wind_wave_period','swell_wave_height','swell_wave_direction','swell_wave_period','sea_surface_temperature'];
const MARINE_BASIC = ['wave_height','wave_direction','wave_period'];
const WX_HOURLY = Object.values(WX_KEYS);
const WX_CURRENT = ['temperature_2m','apparent_temperature','relative_humidity_2m','precipitation','weather_code','cloud_cover','pressure_msl','wind_speed_10m','wind_direction_10m','wind_gusts_10m','is_day'];
const WX_DAILY = ['sunrise','sunset','uv_index_max','temperature_2m_max','temperature_2m_min','precipitation_sum','weather_code'];

async function jget(url, ms) {
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), ms || 15000);
  try {
    const r = await fetch(url, { signal: ctl.signal });
    if (!r.ok) {
      const e = new Error('HTTP ' + r.status); e.status = r.status;
      try { const j = await r.json(); if (j && j.reason) { e.reason = String(j.reason); e.message = 'HTTP ' + r.status + ': ' + e.reason; } } catch (x) { /* body was not JSON */ }
      throw e;
    }
    return await r.json();
  } finally { clearTimeout(timer); }
}
const asArray = j => (Array.isArray(j) ? j : [j]);
const coordQS = pts => 'latitude=' + pts.map(p => p.lat.toFixed(4)).join(',') + '&longitude=' + pts.map(p => p.lon.toFixed(4)).join(',');
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* One Open-Meteo request. If the API rejects a variable name (HTTP 400 naming it), drop that variable and retry,
   so one renamed or unavailable variable never takes the whole forecast down. Retries 429 and 5xx twice. */
async function omGet(base, points, days, lists, extra) {
  const L = {}; for (const k in lists) L[k] = lists[k].slice();
  let busy = 0, err;
  for (let attempt = 0; attempt < 14; attempt++) {
    let url = base + '?' + coordQS(points) + '&forecast_days=' + days + '&timezone=auto' + (extra || '');
    for (const k in L) if (L[k].length) url += '&' + k + '=' + L[k].join(',');
    try { return asArray(await jget(url)); }
    catch (e) {
      err = e;
      if ((e.status === 429 || e.status >= 500) && busy < 2) { busy++; await sleep(1200 * busy); continue; }
      if (e.status === 400 && e.reason) {
        let dropped = false;
        for (const k in L) { const keep = L[k].filter(v => !new RegExp('(^|[^a-z0-9_])' + v + '($|[^a-z0-9_])').test(e.reason)); if (keep.length !== L[k].length) { L[k] = keep; dropped = true; } }
        if (dropped && L.hourly.length) continue;
      }
      throw e;
    }
  }
  throw err;
}
async function fetchMarine(points, days, vars, mode) {
  if (mode === 'demo') return synthMarine(points, days, vars);
  return omGet('https://marine-api.open-meteo.com/v1/marine', points, days, { hourly: vars }, '&cell_selection=sea');
}
async function fetchWx(points, days, o, mode) {
  if (mode === 'demo') return synthWeather(points, days, o);
  const lists = { hourly: o.hourly }; if (o.current) lists.current = o.current; if (o.daily) lists.daily = o.daily;
  return omGet('https://api.open-meteo.com/v1/forecast', points, days, lists, '');
}
async function geocode(q, mode) {
  if (mode === 'demo') throw new Error('Place search needs the live connection.');
  const j = await jget('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(q) + '&count=6&language=en&format=json');
  return (j.results || []).map(r => ({ name: r.name, sub: [r.admin1, r.country].filter(Boolean).join(', '), lat: r.latitude, lon: r.longitude }));
}

/* Full detail for one spot */
async function loadDetail(spot, mode) {
  const useX = mode === 'live' && xsrcOn();
  const xp = useX ? xsrcGet(spot) : Promise.resolve(null);
  let merr = null, werr = null;
  const [mar, wx] = await Promise.all([
    fetchMarine([spot], 14, MARINE_FULL, mode).catch(e => { merr = e; return null; }),
    fetchWx([spot], 14, { hourly: WX_HOURLY, current: WX_CURRENT, daily: WX_DAILY }, mode).catch(e => { werr = e; return null; }),
  ]);
  const X = await xp;
  let m = mar && mar[0], w = wx && wx[0], noWind = false, bw = false, bm = false;
  /* Backup: if Open-Meteo did not answer, WeatherAPI.com and Visual Crossing stand in for the next 3 days */
  if (!w) { const alt = X && xsrcWxOM(X, spot); if (!alt) throw werr || merr || new Error('No forecast'); w = alt; noWind = true; bw = true; }
  if (!m && merr) { const alt = X && xsrcMarineOM(X); if (!alt) throw merr; m = alt; bm = true; }
  const H = alignHourly(w.hourly, w.utc_offset_seconds, m && m.hourly, m ? m.utc_offset_seconds : 0);
  const xs = X ? blendXsrc(H, w.utc_offset_seconds, X, { noWind }) : null;
  if (xs) {
    if (bw) { if (X.vc && X.vc.ok) xs.vc = true; else xs.wa = true; }
    if (bm) xs.wa = true;
    xs.backup = bw || bm;
  }
  return { spot, H, off: w.utc_offset_seconds, daily: w.daily, current: w.current, loadedAt: Date.now(), marineOk: hasMarine(H), tz: w.timezone, ocean: m ? { lat: m.latitude, lon: m.longitude } : null, xs: xs && (xs.wa || xs.vc) ? xs : null };
}
/* Compact 5-day data for ranking many spots */
const SCAN_MARINE = ['wave_height','wave_period','wave_direction','wind_wave_height','swell_wave_height','swell_wave_period','swell_wave_direction','secondary_swell_wave_height','secondary_swell_wave_period','secondary_swell_wave_direction'];
const SCAN_WX = ['wind_speed_10m','wind_direction_10m','wind_gusts_10m'];
/* If Open-Meteo did not answer, rank up to 8 spots (per half hour) from the extra sources so the list is not empty. Three days only. */
let xsScanLeft = { n: 8, at: 0 };
async function scanBackup(spots) {
  const now = Date.now(); if (now - xsScanLeft.at > 30 * 60000) xsScanLeft = { n: 8, at: now };
  const take = spots.slice(0, Math.max(0, xsScanLeft.n)); xsScanLeft.n -= take.length;
  const Xs = await Promise.all(take.map(s => xsrcGet(s)));
  let any = false;
  const out = spots.map((s, i) => {
    const X = Xs[i], w = X && xsrcWxOM(X, s), m = X && xsrcMarineOM(X);
    if (!w) return { id: s.id, H: alignHourly({ time: [localStr(Date.now(), 0)] }, 0, null, 0), off: 0, ok: false };
    any = true;
    const H = alignHourly(w.hourly, w.utc_offset_seconds, m && m.hourly, m ? m.utc_offset_seconds : 0);
    return { id: s.id, H, off: w.utc_offset_seconds, ok: hasMarine(H) };
  });
  return any ? out : null;
}
async function scanBatch(spots, mode) {
  let mar, wx;
  try { [mar, wx] = await Promise.all([fetchMarine(spots, 5, SCAN_MARINE, mode), fetchWx(spots, 5, { hourly: SCAN_WX }, mode)]); }
  catch (e) { const alt = mode === 'live' && xsrcOn() ? await scanBackup(spots) : null; if (!alt) throw e; return alt; }
  return spots.map((s, i) => {
    const H = alignHourly(wx[i].hourly, wx[i].utc_offset_seconds, mar[i] && mar[i].hourly, mar[i] ? mar[i].utc_offset_seconds : 0);
    return { id: s.id, H, off: wx[i].utc_offset_seconds, ok: hasMarine(H) };
  });
}
const chunk = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };

/* Which hour of a scanned spot is the "target"? */
function scanIndex(sc, target, nowMs) {
  nowMs = nowMs || Date.now();
  if (!target || target.kind === 'now') return hourIndexNow(sc.H, sc.off, nowMs);
  if (target.kind === 'ahead') { const i = hourIndexNow(sc.H, sc.off, nowMs) + Math.max(0, Math.round(target.h || 0)); return i < sc.H.t.length ? i : -1; }
  const today = localStr(nowMs, sc.off).slice(0, 10);
  const want = addDays(today, target.day) + 'T' + String(target.hour).padStart(2, '0') + ':00';
  const i = sc.H.t.indexOf(want);
  return i;
}

/* ============================================================
   External links for a spot / location
   ============================================================ */

/* sun and twilight times from the NOAA solar equations: no network needed. alt is the sun's height in degrees:
   -0.833 sunrise/sunset, -6 civil (first and last light), -12 nautical, -18 astronomical. Returns local 'YYYY-MM-DDTHH:MM' strings. */
function sunEvents(lat, lon, dateStr, off) {
  try {
    const p = parseT(dateStr.slice(0, 10) + 'T12:00'), rd = Math.PI / 180, jdn = Date.UTC(p.y, p.mo - 1, p.d, 12) / 86400000 + 2440587.5;
    const n = Math.round(jdn - 2451545.0 + 0.0008), Js = n - lon / 360, M = (357.5291 + 0.98560028 * Js) % 360, Mr = M * rd;
    const C = 1.9148 * Math.sin(Mr) + 0.02 * Math.sin(2 * Mr) + 0.0003 * Math.sin(3 * Mr), lam = ((M + C + 180 + 102.9372) % 360) * rd;
    const Jt = 2451545.0 + Js + 0.0053 * Math.sin(Mr) - 0.0069 * Math.sin(2 * lam), sd = Math.sin(lam) * Math.sin(23.4397 * rd), dec = Math.asin(sd);
    const loc = J => new Date((J - 2440587.5) * 86400000 + off * 1000).toISOString().slice(0, 16);
    const ev = alt => { const c = (Math.sin(alt * rd) - Math.sin(lat * rd) * sd) / (Math.cos(lat * rd) * Math.cos(dec)); if (!(c >= -1 && c <= 1)) return [null, null]; const w = Math.acos(c) / (2 * Math.PI); return [loc(Jt - w), loc(Jt + w)]; };
    const sun = ev(-0.833), civ = ev(-6), nau = ev(-12), ast = ev(-18);
    return { dawn: civ[0], sunrise: sun[0], sunset: sun[1], dusk: civ[1], nauticalDawn: nau[0], nauticalDusk: nau[1], astroDawn: ast[0], astroDusk: ast[1], noon: loc(Jt) };
  } catch (e) { return null; }
}

/* ============================================================
   Extra sources: WeatherAPI.com (swell and wind) and Visual Crossing (wind), through /api/xsrc. Free plans only.
   They cover the next 3 days. Uses: a backup when Open-Meteo is down, a blend into wind and swell for the score,
   and extra lines on the model comparison. The Menu switch "xsrc" turns the blend and backup off.
   ============================================================ */
const xsrcOn = () => { try { return typeof store !== 'undefined' && store.get('xsrc', true) !== false; } catch (e) { return false; } };
const XS_WIND = { om: 0.5, wa: 0.25, vc: 0.25 }, XS_SWELL_WA = 0.35;
async function xsrcGet(spot) {
  try { const j = await apiGet('/api/xsrc?lat=' + spot.lat.toFixed(3) + '&lon=' + spot.lon.toFixed(3), 9000); return j && j.supported ? j : null; }
  catch (e) { return null; }
}
const xsDiff = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
const xs1 = v => Math.round(v * 10) / 10;
function xsMeanDir(items) {
  let x = 0, y = 0;
  for (const it of items) { if (it.d == null || !isFinite(it.d)) continue; const r = it.d * Math.PI / 180; x += it.w * Math.sin(r); y += it.w * Math.cos(r); }
  if (!x && !y) return null;
  return (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;
}
/* Blend the extra sources into an aligned hourly set, in place. Wind: weighted mean (Open-Meteo 50%, the others 25% each), direction by
   vector mean. Swell: WeatherAPI.com takes 35% only where it agrees with Open-Meteo (direction within 40 degrees, period within 3 s);
   where the two disagree, Open-Meteo stands alone. Where Open-Meteo has no wave data, WeatherAPI.com fills in. */
function blendXsrc(H, off, X, o) {
  o = o || {};
  const wa = X && X.wa && X.wa.ok ? X.wa : null, vc = X && X.vc && X.vc.ok ? X.vc : null;
  const res = { wa: false, vc: false, wind: 0, swell: 0 };
  if (!wa && !vc) return res;
  const iw = new Map(), iv = new Map();
  if (wa) wa.t.forEach((e, i) => iw.set(e, i));
  if (vc) vc.t.forEach((e, i) => iv.set(e, i));
  for (let i = 0; i < H.t.length; i++) {
    const e = epochOf(H.t[i], off), a = iw.get(e), c = iv.get(e);
    if (a == null && c == null) continue;
    if (!o.noWind) {
      const s = [];
      if (H.wsp[i] != null) s.push({ k: 'om', w: XS_WIND.om, v: H.wsp[i], g: H.gust[i], d: H.wdir[i] });
      if (a != null && wa.wsp[a] != null) s.push({ k: 'wa', w: XS_WIND.wa, v: wa.wsp[a], g: wa.gust[a], d: wa.wdir[a] });
      if (c != null && vc.wsp[c] != null) s.push({ k: 'vc', w: XS_WIND.vc, v: vc.wsp[c], g: vc.gust[c], d: vc.wdir[c] });
      if (s.some(q => q.k !== 'om')) {
        const W = s.reduce((q, x) => q + x.w, 0);
        H.wsp[i] = xs1(s.reduce((q, x) => q + x.w * x.v, 0) / W);
        const gs = s.filter(x => x.g != null);
        if (gs.length) H.gust[i] = xs1(gs.reduce((q, x) => q + x.w * x.g, 0) / gs.reduce((q, x) => q + x.w, 0));
        const dir = xsMeanDir(s.map(x => ({ d: x.d, w: x.w * (x.v + 1) })));
        if (dir != null) H.wdir[i] = Math.round(dir);
        res.wind++; if (s.some(q => q.k === 'wa')) res.wa = true; if (s.some(q => q.k === 'vc')) res.vc = true;
      }
    }
    if (a != null && wa.swH[a] != null) {
      const omHas = H.sH[i] != null && H.sT[i] != null && H.sD[i] != null;
      if (!omHas && H.sH[i] == null && H.wH[i] == null) {
        H.sH[i] = wa.swH[a]; H.sT[i] = wa.swT[a]; H.sD[i] = wa.swD[a];
        H.wH[i] = wa.sigH[a] != null ? wa.sigH[a] : wa.swH[a]; H.wT[i] = wa.swT[a]; H.wD[i] = wa.swD[a];
        res.swell++; res.wa = true;
      } else if (omHas && wa.swT[a] != null && wa.swD[a] != null && xsDiff(H.sD[i], wa.swD[a]) <= 40 && Math.abs(H.sT[i] - wa.swT[a]) <= 3) {
        const q = XS_SWELL_WA, p = 1 - q;
        H.sH[i] = xs1(p * H.sH[i] + q * wa.swH[a]); H.sT[i] = xs1(p * H.sT[i] + q * wa.swT[a]);
        const dd = xsMeanDir([{ d: H.sD[i], w: p }, { d: wa.swD[a], w: q }]); if (dd != null) H.sD[i] = Math.round(dd);
        if (H.wH[i] != null && wa.sigH[a] != null) H.wH[i] = xs1(p * H.wH[i] + q * wa.sigH[a]);
        res.swell++; res.wa = true;
      }
    }
  }
  return res;
}
/* Open-Meteo shaped stand-ins, used only when Open-Meteo itself did not answer */
function xsrcMarineOM(X) {
  const wa = X && X.wa && X.wa.ok ? X.wa : null; if (!wa || !wa.t.length) return null;
  return { latitude: wa.lat, longitude: wa.lon, utc_offset_seconds: wa.off || 0, hourly: { time: wa.t.map(e => localStr(e * 1000, wa.off || 0)), wave_height: wa.sigH, wave_period: wa.swT, wave_direction: wa.swD, swell_wave_height: wa.swH, swell_wave_period: wa.swT, swell_wave_direction: wa.swD, sea_surface_temperature: wa.water } };
}
function xsrcWxOM(X, spot) {
  const v = X && X.vc && X.vc.ok ? X.vc : X && X.wa && X.wa.ok ? X.wa : null;
  if (!v || !v.t.length) return null;
  const off = v.off || 0, n = v.t.length, nul = () => new Array(n).fill(null);
  const time = v.t.map(e => localStr(e * 1000, off));
  const hourly = { time, temperature_2m: v.temp || nul(), wind_speed_10m: v.wsp, wind_direction_10m: v.wdir, wind_gusts_10m: v.gust, cloud_cover: v.cloud || nul(), precipitation_probability: v.pop || nul() };
  const days = [], dmax = [], dmin = [];
  time.forEach((s, i) => {
    const d = s.slice(0, 10); let k = days.indexOf(d);
    if (k < 0) { k = days.push(d) - 1; dmax[k] = null; dmin[k] = null; }
    const t = hourly.temperature_2m[i]; if (t != null) { dmax[k] = dmax[k] == null ? t : Math.max(dmax[k], t); dmin[k] = dmin[k] == null ? t : Math.min(dmin[k], t); }
  });
  const ev = days.map(d => sunEvents(spot.lat, spot.lon, d, off)), nul2 = () => days.map(() => null);
  const daily = { time: days, sunrise: ev.map(e => e && e.sunrise), sunset: ev.map(e => e && e.sunset), uv_index_max: nul2(), temperature_2m_max: dmax, temperature_2m_min: dmin, precipitation_sum: nul2(), weather_code: nul2() };
  const nowE = Date.now() / 1000; let k = 0;
  for (let i = 1; i < n; i++) if (Math.abs(v.t[i] - nowE) < Math.abs(v.t[k] - nowE)) k = i;
  const dk = days.indexOf(time[k].slice(0, 10)), e0 = ev[dk];
  const current = { time: time[k], temperature_2m: hourly.temperature_2m[k], apparent_temperature: null, relative_humidity_2m: null, precipitation: null, weather_code: null, cloud_cover: hourly.cloud_cover[k], pressure_msl: null, wind_speed_10m: v.wsp[k], wind_direction_10m: v.wdir[k], wind_gusts_10m: v.gust[k], is_day: e0 && e0.sunrise && e0.sunset ? (time[k] >= e0.sunrise && time[k] < e0.sunset ? 1 : 0) : 1 };
  return { latitude: spot.lat, longitude: spot.lon, utc_offset_seconds: off, timezone: v.tz || null, hourly, daily, current };
}

if (typeof module !== 'undefined') module.exports = { setSurfLevel, levelFactor, LEVEL_IDS, SURF_PTS_LEVEL, sunEvents, bestWindowIf, scoreHour, windRel, windScore, exposure, bandOf, BANDS, tideExtrema, tideSummary, bestWindow, moonInfo, alignHourly, synthMarine, synthWeather, valAt, hourIndexNow, scanIndex, dirName, angDiff, localStr, parseT, epochOf, wetsuit, scoresFor, MARINE_FULL, WX_HOURLY, WX_CURRENT, WX_DAILY, fetchMarine, fetchWx, loadDetail, scanBatch, hasMarine, blendXsrc, xsrcMarineOM, xsrcWxOM, xsrcOn };
