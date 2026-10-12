
/* ============================================================
   SERVICES: Worker API client, tide maths, hazard helpers (no DOM, testable in node)
   ============================================================ */
const API_HOSTS = ['https://dawnpatrol.casadelfuego.org'];
const API_WORKER = API_HOSTS[0];
/* try the main address first and the older one if the first cannot be reached */
async function hostFetch(path, init) { let err; for (const h of API_HOSTS) { try { return await fetch(h + path, init); } catch (e) { err = e; if (e && e.name === 'AbortError') throw e; } } throw err; }
async function apiGet(path, timeoutMs) {
  const bases = (typeof location !== 'undefined' && /^https?:$/.test(location.protocol) ? [''] : []).concat(API_HOSTS);
  let err = null;
  for (const b of bases) {
    let r;
    try { const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), timeoutMs || 15000); r = await fetch(b + path, { signal: ctl.signal }); clearTimeout(to); }
    catch (e) { err = e; continue; }
    if (!/json/i.test(r.headers.get('content-type') || '')) { err = new Error('Service not reachable from here'); continue; }
    const j = await r.json().catch(() => null);
    if (!r.ok || !j) { const e = new Error((j && j.error) || 'HTTP ' + r.status); e.status = r.status; throw e; }
    return j;
  }
  throw err || new Error('Service not reachable');
}
const SVC = { nws: new Map(), tides: new Map() };
const cellKey = s => s.lat.toFixed(2) + ',' + s.lon.toFixed(2);
async function cached(map, key, ttlMs, load) {
  const hit = map.get(key); if (hit && Date.now() - hit.at < ttlMs) return hit.v;
  const v = await load(); map.set(key, { at: Date.now(), v }); return v;
}
const getHazards = spot => cached(SVC.nws, cellKey(spot) + '|' + (spot.face == null ? '' : spot.face), 10 * 60000, () => apiGet('/api/nws?lat=' + spot.lat + '&lon=' + spot.lon + (spot.face != null ? '&face=' + spot.face : '')));
const getTides = spot => cached(SVC.tides, cellKey(spot), 30 * 60000, () => apiGet('/api/tides?lat=' + spot.lat + '&lon=' + spot.lon));
const detectFacing = (lat, lon) => apiGet('/api/facing?lat=' + lat.toFixed(4) + '&lon=' + lon.toFixed(4), 20000);

/* ---------- tides: half-cosine between predicted highs and lows ---------- */
function tideAt(hilo, t) {
  if (!hilo || hilo.length < 2 || t < hilo[0].t || t > hilo[hilo.length - 1].t) return null;
  let i = 0; while (i < hilo.length - 2 && hilo[i + 1].t < t) i++;
  const a = hilo[i], b = hilo[i + 1], f = (t - a.t) / Math.max(1, b.t - a.t);
  return (a.v + b.v) / 2 + (a.v - b.v) / 2 * Math.cos(Math.PI * f);
}
const tideSeries = (hilo, epochs) => epochs.map(t => tideAt(hilo, t));
function tideNowInfo(hilo, nowSec) {
  const h = tideAt(hilo, nowSec); if (h == null) return null;
  const next = hilo.filter(e => e.t > nowSec).slice(0, 3), prev = hilo.filter(e => e.t <= nowSec).pop();
  const nx = next[0];
  const trend = nx ? (nx.type === 'H' ? 'Rising' : 'Falling') : '';
  return { h, trend, next: next.slice(0, 2), prev };
}
/* ---------- hazards ---------- */
const SURF_ALERT = /surf|rip|beach|small craft|gale|storm|hurricane|tropical|tsunami|coastal flood|marine|hazardous seas|dense fog|thunder|waterspout|lightning|special marine/i;
const SEV_RANK = { Extreme: 0, Severe: 1, Moderate: 2, Minor: 3, Unknown: 4 };
const alertTone = a => (a.severity === 'Extreme' || a.severity === 'Severe' || /warning/i.test(a.event || '') ? 'bad' : a.severity === 'Moderate' || /advisory|watch/i.test(a.event || '') ? 'warn' : 'info');
function sortAlerts(list) {
  return (list || []).slice().sort((a, b) => (SURF_ALERT.test(b.event || '') - SURF_ALERT.test(a.event || '')) || ((SEV_RANK[a.severity] == null ? 4 : SEV_RANK[a.severity]) - (SEV_RANK[b.severity] == null ? 4 : SEV_RANK[b.severity])));
}
const ripTone = s => (/high|extreme/i.test(s || '') ? 'bad' : /moderate/i.test(s || '') ? 'warn' : s ? 'ok' : 'info');
/* first hour index in [i0, i0+hours) with a thunderstorm weather code (95 to 99) */
function lightningRisk(H, i0, hours) {
  for (let i = Math.max(0, i0); i < Math.min(H.t.length, i0 + hours); i++) if (H.code[i] != null && H.code[i] >= 95) return i;
  return null;
}
