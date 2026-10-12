import w, { parseErddapCsv, parseSpecFile, srfPeriods, parseSrf, ensembleStats } from './index.js';
let ok = true; const t = (c, m) => { if (!c) { ok = false; console.log('FAIL', m); } else console.log('ok', m); };
const mem = new Map();
const SITE = { async get(k, type) { const v = mem.get(k); if (v == null) return null; return type === 'json' ? JSON.parse(v) : v; }, async put(k, v) { mem.set(k, v); }, async delete(k) { mem.delete(k); }, async list() { return { keys: [] }; } };
const env = { SITE };
const calls = [];
const now = Date.now(), iso = ms => new Date(ms).toISOString().slice(0, 19) + 'Z';
globalThis.fetch = async (url) => {
  url = String(url); calls.push(url);
  const R = (body, type = 'text/plain') => new Response(typeof body === 'string' ? body : JSON.stringify(body), { status: 200, headers: { 'content-type': type } });
  if (url.includes('/erddap/griddap/')) {
    const id = url.match(/griddap\/([a-z0-9_]+)\.csv/)[1], q = decodeURIComponent(url.split('?')[1]), isSwan = id.startsWith('swan');
    const hv = isSwan ? 'shgt' : 'Thgt';
    if (q.includes('[(last)]')) { // window search: land cell NaN, water cell ok
      const rows = ['time,depth,latitude,longitude,' + hv, 'UTC,m,degrees_north,degrees_east,m'];
      const mm = q.match(/\[\(last\)\]\[0\]\[\(([\d.]+)\):1:\(([\d.]+)\)\]\[\(([\d.]+)\):1:\(([\d.]+)\)\]/), cl = (+mm[1] + +mm[2]) / 2, co = (+mm[3] + +mm[4]) / 2; globalThis.__c = [cl, co];
      for (const [la, lo, h] of [[cl + 0.01, co, 'NaN'], [cl, co, '1.4'], [cl - 0.02, co + 0.01, '1.2']]) rows.push(iso(now) + 'Z,0.0,' + la + ',' + lo + ',' + h);
      return R(rows.join('\n').replace('ZZ', 'Z'));
    }
    const vars = q.split(',').map(s => s.split('[')[0]), names = ['time', 'depth', 'latitude', 'longitude', ...vars];
    const rows = [names.join(','), 'UTC,m,degrees_north,degrees_east,' + vars.map(() => 'x').join(',')];
    for (let k = 0; k < 6; k++) rows.push(iso(now - 3600e3 + k * 3600e3 + 53e3) + ',0.0,' + globalThis.__c[0] + ',' + globalThis.__c[1] + ',' + vars.map((v, i) => /dir|pdir|Tdir|sdir|wdir|mdir/.test(v) ? '300.0' : (1 + k * 0.1 + i * 0.01).toFixed(2)).join(','));
    return R(rows.join('\n'));
  }
  if (url.includes('data.ca.gov')) {
    if (url.includes('98e628ff')) return R({ success: true, result: { records: [{ BeachName_id: 7, Beach_Name: 'Rincon Beach', NearestCityName: 'Carpinteria', CountyName: 'Ventura', USEPAID: 'CA527007', Station_UpperLat: 34.3733, Station_UpperLon: -119.476, Status: 'Active' }, { BeachName_id: 9, Beach_Name: 'Far Beach', NearestCityName: 'X', CountyName: 'Y', USEPAID: 'Z', Station_UpperLat: 36, Station_UpperLon: -121.9, Status: 'Active' }] } });
    if (url.includes('BeachName_id')) return R({ success: true, result: { records: [{ _id: 5, DateofAdvisory: '2026-03-01T00:00:00', DateOpened: null, AdvisoryType: 'Posting', AdvisoryCause: 'Bacterial Standards Violation', Station_Description: 'Rincon Beach at creek', Source: 'Unknown' }, { _id: 9, DateofAdvisory: '2026-03-06T00:00:00', DateOpened: '2026-03-09T00:00:00', AdvisoryType: 'Closure', AdvisoryCause: 'Sewage spill', DescriptionofArea: 'Rincon', Source: 'Sewer' }] } });
    return R({ success: true, result: { records: [{ DateofAdvisory: '2026-03-06T00:00:00' }] } });
  }
  if (url.includes('.data_spec')) return R('#YY MM DD hh mm Sep_Freq spec (freq)\n2026 10 01 12 30 0.0275 0.0 (0.033) 0.1 (0.038) 0.9 (0.043) 2.2 (0.048) 3.0 (0.053) 1.0 (0.058) 0.5 (0.063) 0.2 (0.068)\n2026 10 01 12 00 0.0275 0.0 (0.033) 0.1 (0.038) 0.8 (0.043) 2.0 (0.048) 2.9 (0.053) 1.0 (0.058) 0.5 (0.063) 0.2 (0.068)\n');
  if (url.includes('.swdir')) return R('#YY MM DD hh mm alpha1 (freq)\n2026 10 01 12 30 280.0 (0.033) 281.0 (0.038) 282.0 (0.043) 283.0 (0.048) 284.0 (0.053) 285.0 (0.058) 286.0 (0.063) MM (0.068)\n');
  if (url.includes('ensemble-api')) {
    const m = url.includes('ecmwf') ? 3 : 2, h = { time: ['2026-10-01T00:00', '2026-10-01T01:00'] };
    for (let i = 0; i < m; i++) { h['wind_speed_10m_member0' + i] = [10 + i * 5, 12 + i * 5]; h['precipitation_member0' + i] = [i === 0 ? 0 : 0.5, 0]; }
    return R({ utc_offset_seconds: -25200, hourly: h });
  }
  return new Response('nope', { status: 404 });
};
const get = async p => { const r = await w.fetch(new Request('https://x.test' + p), env, {}); return { status: r.status, j: await r.json() }; };

let r = await get('/api/pacioos?lat=21.598&lon=-158.0');
t(r.j.supported && r.j.models.length === 2, 'oahu: SWAN + WW3 both answer');
const sw = r.j.models.find(m => m.id === 'swan_oahu');
t(sw && sw.kind === 'nearshore' && Math.abs(sw.cell.lat - 21.598) < 0.001 && Math.abs(sw.cell.lon + 158) < 0.001 && sw.cell.distM < 500, 'oahu: nearest water cell chosen, land NaN cell skipped');
t(sw.hs.length >= 5 && sw.hs.every(v => v != null) && sw.t[1] - sw.t[0] === 3600, 'oahu: hourly series resampled');
t(sw.dp.every(v => v === 300), 'oahu: direction kept as degrees');
const ww = r.j.models.find(m => m.id === 'ww3_hawaii');
t(ww && ww.shs && ww.stp && ww.whs && ww.sdp, 'oahu: WW3 includes swell and wind wave parts');
r = await get('/api/pacioos?lat=34&lon=-119');
t(r.j.supported === false, 'pacioos: outside Hawaii not supported');
r = await get('/api/pacioos?lat=19.6&lon=-155.4');
t(r.j.supported && r.j.models.some(m => m.id === 'swan_bigi'), 'big island grid used');
r = await get('/api/pacioos?lat=x&lon=1');
t(r.status === 400, 'pacioos: bad params 400');

r = await get('/api/beachwq?lat=34.374&lon=-119.477');
t(r.j.supported && r.j.beach.name === 'Rincon Beach' && r.j.beach.km < 1, 'wq: nearest beach found');
t(r.j.notices.length === 2 && r.j.notices[0].type === 'Closure' && r.j.notices[0].date === '2026-03-06' && r.j.notices[0].reopened === '2026-03-09', 'wq: notices sorted newest first with reopen date');
t(r.j.dataThrough === '2026-03-06', 'wq: data-through date present');
t(mem.has('wq:stations'), 'wq: station list cached in KV');
const n0 = calls.length; await get('/api/beachwq?lat=34.374&lon=-119.477'); t(!calls.slice(n0).some(u => u.includes('98e628ff')), 'wq: stations served from KV on second call');
r = await get('/api/beachwq?lat=40&lon=-70'); t(r.j.supported === false, 'wq: outside California not supported');
r = await get('/api/beachwq?lat=37&lon=-122.9'); t(r.j.supported && r.j.beach === null, 'wq: no beach within 6 km');

r = await get('/api/spectra/46025');
t(r.j.freqs.length === 8 && r.j.latest.t > r.j.history.t[0] && r.j.history.t.length === 2, 'spectra: latest + history (oldest first)');
t(r.j.latest.dir && r.j.latest.dir[0] === 280 && r.j.latest.dir[7] === null, 'spectra: direction joined, MM -> null');
t(r.j.latest.e[4] === 3, 'spectra: energy values');

r = await get('/api/ensemble?lat=34&lon=-119');
t(r.j.supported && r.j.members === 5 && r.j.models.length === 2, 'ensemble: pools members of both models');
t(r.j.wind.p10[0] <= r.j.wind.p50[0] && r.j.wind.p50[0] <= r.j.wind.p90[0], 'ensemble: percentiles ordered');
t(r.j.rainProb[0] === 60 && r.j.rainProb[1] === 0, 'ensemble: rain probability share of members');

const srf = parseSrf('CAZ040>043-011000-\nLos Angeles County Beaches-\n130 PM PDT Wed Sep 30 2026\n\n.TODAY...\nWeather....Sunny.\nRip Current Risk...........Moderate.\nSurf Height................3 to 5 feet.\n\n.TONIGHT...\nRip Current Risk...........High.\n\n.THU...\nRip Current Risk...........Low.\nSurf Height...1 to 2 feet.\n\n$$\n', new Set(['CAZ041']));
t(srf && srf.rip === 'Moderate' && srf.surf === '3 to 5 feet', 'srf: existing fields kept');
t(srf.periods.length === 3 && srf.periods[1].rip === 'High' && srf.periods[2].label === 'Thu', 'srf: per-period rip risk');
console.log(ok ? 'ALL OK' : 'SOME FAILED'); process.exit(ok ? 0 : 1);
