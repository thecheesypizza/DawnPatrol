/* =====================================================================
   TIDES: one tide curve for any spot (no DOM, testable in node)
   Source 1: NOAA predicted highs and lows (US stations), smoothed with a half cosine.
   Source 2: the ocean model's hourly sea level (worldwide), refined to true highs and lows.
   Both give the same object: { kind, hilo:[{t,v,type}], at(t), t0, t1, ... } with t in epoch seconds and v in metres.
   ===================================================================== */
/* sea level at epoch t from hourly samples (ts ascending, v metres or null): cubic Hermite through the hours */
function tideHourlyAt(ts, v, t) {
  const n = ts.length; if (n < 2 || t < ts[0] || t > ts[n - 1]) return null;
  let lo = 0, hi = n - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (ts[m] <= t) lo = m; else hi = m; }
  const y0 = v[lo], y1 = v[lo + 1]; if (y0 == null || y1 == null) return null;
  const h = ts[lo + 1] - ts[lo], u = (t - ts[lo]) / h;
  const m0 = (lo > 0 && v[lo - 1] != null ? (y1 - v[lo - 1]) / 2 : y1 - y0), m1 = (lo + 2 < n && v[lo + 2] != null ? (v[lo + 2] - y0) / 2 : y1 - y0);
  const u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * y0 + (u3 - 2 * u2 + u) * m0 + (-2 * u3 + 3 * u2) * y1 + (u3 - u2) * m1;
}
/* true highs and lows from hourly samples: parabola through the three hours around each turning point */
function tideHourlyExtrema(ts, v, minRange) {
  const raw = [];
  for (let i = 1; i < v.length - 1; i++) {
    const a = v[i - 1], b = v[i], c = v[i + 1]; if (a == null || b == null || c == null) continue;
    const hi = b >= a && b > c, lo = b <= a && b < c; if (!hi && !lo) continue;
    const den = a - 2 * b + c, d = Math.abs(den) < 1e-9 ? 0 : 0.5 * (a - c) / den;
    raw.push({ t: Math.round(ts[i] + Math.max(-1, Math.min(1, d)) * (ts[i + 1] - ts[i])), v: b - 0.25 * (a - c) * d, type: hi ? 'H' : 'L' });
  }
  // keep only turning points that matter (drop tiny wiggles) and make sure highs and lows alternate
  const out = []; const mr = minRange == null ? 0.06 : minRange;
  for (const e of raw) {
    const p = out[out.length - 1];
    if (p && p.type === e.type) { if ((e.type === 'H' && e.v > p.v) || (e.type === 'L' && e.v < p.v)) out[out.length - 1] = e; continue; }
    if (p && Math.abs(p.v - e.v) < mr) { out.pop(); const q = out[out.length - 1]; if (q && q.type === e.type) { if ((e.type === 'H' && e.v > q.v) || (e.type === 'L' && e.v < q.v)) out[out.length - 1] = e; } else out.push(e); continue; }
    out.push(e);
  }
  return out;
}
/* build the unified tide object for a loaded spot, or null when there is nothing to draw.
   D.tideN: the NOAA answer from the Worker; D.H.tide and D.H.t, D.off: the ocean model hourly series. */
function tideModelFor(D) {
  const N = D && D.tideN;
  if (N && N.supported && N.hilo && N.hilo.length >= 3) {
    const hilo = N.hilo.map(e => ({ t: e.t, v: e.v, type: e.type })), obs = (N.level || []).filter(p => p && p[1] != null);
    return { kind: 'noaa', label: 'NOAA tide predictions', datum: 'above lowest tide (MLLW)', station: N.station || null, hilo, obs, t0: hilo[0].t, t1: hilo[hilo.length - 1].t, at: t => tideAtHilo(hilo, t) };
  }
  const H = D && D.H;
  if (H && H.tide && H.t && D.marineOk !== false && H.tide.some(x => x != null)) {
    const ts = H.t.map(x => epochOf(x, D.off)), v = H.tide.slice();
    const hilo = tideHourlyExtrema(ts, v);
    let a = 0; while (a < v.length && v[a] == null) a++; let b = v.length - 1; while (b > a && v[b] == null) b--;
    if (b - a < 6) return null;
    // a nearly flat sea level means the model cannot see a tide here
    let mn = Infinity, mx = -Infinity; for (let i = a; i <= b; i++) if (v[i] != null) { if (v[i] < mn) mn = v[i]; if (v[i] > mx) mx = v[i]; }
    if (mx - mn < 0.08) return null;
    return { kind: 'model', label: 'Ocean model sea level (estimate)', datum: 'relative to average sea level', station: null, hilo, obs: [], t0: ts[a], t1: ts[b], at: t => tideHourlyAt(ts, v, t) };
  }
  return null;
}
const tideAtHilo = (hilo, t) => (typeof tideAt === 'function' ? tideAt(hilo, t) : null);
/* sampled curve between two epochs, as [[t, v], ...] (gaps skipped) */
function tideCurve(TM, t0, t1, stepSec) {
  const out = [], st = stepSec || 900; if (!TM) return out;
  for (let t = Math.ceil(t0 / st) * st; t <= t1; t += st) { const v = TM.at(t); if (v != null) out.push([t, v]); }
  return out;
}
const tideEventsIn = (TM, t0, t1) => (TM ? TM.hilo.filter(e => e.t >= t0 && e.t <= t1) : []);
/* 'rising' | 'falling' | 'slack' at epoch t */
function tideTrendAt(TM, t) {
  if (!TM) return null; const a = TM.at(t - 900), b = TM.at(t + 900); if (a == null || b == null) return null;
  return b - a > 0.004 ? 'rising' : b - a < -0.004 ? 'falling' : 'slack';
}
/* next high and next low after t */
function tideNextAfter(TM, t) {
  const nx = TM ? TM.hilo.filter(e => e.t > t) : [];
  return { high: nx.find(e => e.type === 'H') || null, low: nx.find(e => e.type === 'L') || null, first: nx[0] || null };
}
/* "in 2 h 10 min" */
function tideIn(sec) { const m = Math.max(0, Math.round(sec / 60)); return m < 60 ? m + ' min' : Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : ''); }
/* tidal range of the day and a plain label for it, from the events inside [t0, t1] */
function tideDayRange(TM, t0, t1) {
  const ev = tideEventsIn(TM, t0, t1); if (!ev.length) return null;
  let hi = -Infinity, lo = Infinity; ev.forEach(e => { if (e.v > hi) hi = e.v; if (e.v < lo) lo = e.v; });
  return { hi, lo, range: hi - lo, n: ev.length };
}
if (typeof module !== 'undefined') module.exports = { tideHourlyAt, tideHourlyExtrema, tideModelFor, tideCurve, tideEventsIn, tideTrendAt, tideNextAfter, tideIn, tideDayRange };
