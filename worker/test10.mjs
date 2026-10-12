import w from './index.js';
let ok = true; const t = (c, m) => { if (!c) { ok = false; console.log('FAIL', m); } else console.log('ok', m); };
const mem = new Map(), ttls = new Map();
const SITE = { async get(k, type) { const v = mem.get(k); if (v == null) return null; return type === 'json' ? JSON.parse(v) : v; }, async put(k, v, o) { mem.set(k, v); if (o && o.expirationTtl) ttls.set(k, o.expirationTtl); }, async delete(k) { mem.delete(k); }, async list(o) { return { keys: [...mem.keys()].filter(k => k.startsWith((o && o.prefix) || '')).map(name => ({ name })), list_complete: true }; } };
const env = { SITE, WEATHERAPI_KEY: 'wa-secret-123', VISUALCROSSING_KEY: 'vc-secret-456' };
const calls = { wa: 0, vc: 0, urls: [] }; let waFail = false;
const base = Date.UTC(2026, 9, 11, 21, 0) / 1000;   // 14:00 local at UTC-7
globalThis.fetch = async (u) => {
  u = String(u); calls.urls.push(u);
  if (u.includes('api.weatherapi.com')) {
    calls.wa++; if (waFail) return new Response('{"error":{"code":2008}}', { status: 403 });
    const hour = i => ({ time_epoch: base + i * 3600, time: '2026-10-11 ' + (14 + i) + ':00', sig_ht_mt: 1.5, swell_ht_mt: 1.2, swell_period_secs: 12.4, swell_dir: 285, wind_kph: 18.2, wind_degree: 300, gust_kph: 25.5, temp_c: 19, water_temp_c: 17.5 });
    return new Response(JSON.stringify({ location: { tz_id: 'America/Los_Angeles', lat: 34.05, lon: -118.8, localtime_epoch: base, localtime: '2026-10-11 14:00' }, forecast: { forecastday: [{ hour: [hour(0), hour(1), hour(2)] }] } }), { status: 200, headers: { 'content-type': 'application/json' } });
  }
  if (u.includes('visualcrossing.com')) {
    calls.vc++;
    const h = i => ({ datetimeEpoch: base + i * 3600, windspeed: 12.5, windgust: 22, winddir: 310, temp: 20, precipprob: 0, cloudcover: 10 });
    return new Response(JSON.stringify({ tzoffset: -7, timezone: 'America/Los_Angeles', days: [{ hours: [h(0), h(1), h(2)] }] }), { status: 200, headers: { 'content-type': 'application/json' } });
  }
  return new Response('no', { status: 404 });
};
const call = async (p, hdr, e) => { const r = await w.fetch(new Request('https://x.test' + p, { headers: hdr || {} }), e || env); let j = null; try { j = await r.clone().json(); } catch (x) {} return { s: r.status, j, r }; };

let r = await call('/api/xsrc'); t(r.s === 400, 'xsrc needs lat and lon');
r = await call('/api/xsrc?lat=95&lon=0'); t(r.s === 400, 'xsrc refuses a latitude out of range');
r = await call('/api/xsrc?lat=34.03&lon=-118.8', { 'cf-connecting-ip': '1.1.1.1' });
t(r.s === 200 && r.j.supported === true && r.j.wa.ok && r.j.vc.ok, 'both sources answer');
t(r.j.wa.t.length === 3 && r.j.wa.off === -25200 && r.j.wa.swH[0] === 1.2 && r.j.wa.swT[0] === 12.4 && r.j.wa.swD[0] === 285 && r.j.wa.sigH[0] === 1.5 && r.j.wa.wsp[0] === 18.2, 'WeatherAPI hours are normalised (metres, seconds, km/h, UTC-7 offset)');
t(r.j.vc.t.length === 3 && r.j.vc.off === -25200 && r.j.vc.wsp[0] === 12.5 && r.j.vc.gust[0] === 22 && r.j.vc.wdir[0] === 310, 'Visual Crossing hours are normalised');
t(r.j.wa.t[1] - r.j.wa.t[0] === 3600 && r.j.wa.t[0] === base, 'times are UTC epoch seconds');
t(r.j.credit && r.j.credit.vc.url === 'https://www.visualcrossing.com/' && r.j.credit.wa.url === 'https://www.weatherapi.com/', 'attribution links are returned');
const text = JSON.stringify(r.j);
t(!text.includes('wa-secret-123') && !text.includes('vc-secret-456') && !/key=/.test(text), 'no key or vendor address in the answer');
t(calls.urls.some(u => u.includes('key=wa-secret-123')) && calls.urls.some(u => u.includes('next2days')), 'keys go to the vendors only; Visual Crossing asks for 3 calendar days');
t(calls.wa === 1 && calls.vc === 1, 'one call per vendor');
r = await call('/api/xsrc?lat=34.04&lon=-118.81', { 'cf-connecting-ip': '1.1.1.1' });
t(r.j.supported && calls.wa === 1 && calls.vc === 1, 'a nearby point in the same 0.05 degree cell is served from the cache');
r = await call('/api/xsrc?lat=34.2&lon=-118.8', { 'cf-connecting-ip': '1.1.1.1' });
t(r.j.supported && calls.wa === 2 && calls.vc === 2, 'a different cell calls the vendors again');

// Missing keys: nothing is fetched, the answer says unsupported
const before = calls.urls.length;
r = await call('/api/xsrc?lat=12&lon=12', { 'cf-connecting-ip': '2.2.2.2' }, { SITE });
t(r.j.supported === false && calls.urls.length === before, 'without keys it is unsupported and calls nothing');

// One vendor failing: the other still answers, cached only briefly
waFail = true;
r = await call('/api/xsrc?lat=40&lon=-70', { 'cf-connecting-ip': '3.3.3.3' });
t(r.j.supported === true && r.j.wa.ok === false && r.j.wa.reason === 'HTTP 403' && r.j.vc.ok === true, 'one vendor failing still gives the other');
t(ttls.get('xs:40.00:-70.00') === 900, 'a partial answer is cached for 15 minutes, not 6 hours');
waFail = false;

// Visual Crossing daily budget: 900 records at 80 per fetch is 11 fetches, then it is skipped but WeatherAPI continues
const vc0 = calls.vc; let lastVc = null;
for (let i = 0; i < 14; i++) { r = await call('/api/xsrc?lat=' + (50 + i * 0.1) + '&lon=-10', { 'cf-connecting-ip': '4.4.4.' + i }); lastVc = r.j.vc; }
t(lastVc && lastVc.ok === false && lastVc.reason === 'daily budget used' && r.j.wa.ok === true && r.j.supported === true, 'Visual Crossing stops at its daily budget while WeatherAPI continues');
t(calls.vc - vc0 <= 11, 'no more than 11 Visual Crossing fetches fit the daily budget');

// Per-address limit on uncached lookups
let last = null; for (let i = 0; i < 26; i++) last = await call('/api/xsrc?lat=' + (-30 + i * 0.1) + '&lon=100', { 'cf-connecting-ip': '5.5.5.5' });
t(last.j.supported === false && last.j.reason === 'busy', 'one address cannot make more than 24 uncached lookups an hour');

console.log(ok ? 'ALL OK' : 'SOME FAILED');
