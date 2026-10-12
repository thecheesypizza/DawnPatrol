
/* ============================================================
   SPOT HELPERS: surf size estimate, gear hints, tide and size preferences,
   calendar export, share links (no DOM, testable in node)
   ============================================================ */
const KOMAR_K = 0.39 * Math.pow(9.81, 0.2);
const SIZE_BASE = 0.7;           /* default share of the breaking Hs that surfers call the "face" */
/* offshore swell height H (m), period T (s), direction it comes from, beach facing -> estimate in metres */
function surfEstimate(H, T, dir, face, k) {
  if (H == null || T == null || !(H > 0) || !(T > 0)) return null;
  const Hb = depthLimit(KOMAR_K * Math.pow(T * Math.pow(H * Math.sqrt(exposure(dir, face)), 2), 0.4), T, face && face.depth), raw = Hb * SIZE_BASE, mid = raw * (k || 1);
  return { raw, mid, lo: mid * 0.8, hi: mid * 1.25 };
}
/* per-spot correction from observed sizes: median of observed / raw estimate (no observations means no correction) */
function calibFactor(log, spotId) {
  const r = (log || []).filter(e => e.spotId === spotId && e.obsH > 0 && e.snap && e.snap.raw > 0).map(e => e.obsH / e.snap.raw).sort((a, b) => a - b);
  if (r.length < 2) return { k: 1, n: r.length };
  const m = r.length % 2 ? r[(r.length - 1) / 2] : (r[r.length / 2 - 1] + r[r.length / 2]) / 2;
  return { k: Math.min(2, Math.max(0.5, m)), n: r.length };
}
/* wax by water temperature (published wax-guide bands) */
function waxFor(sstC) {
  if (sstC == null) return null;
  if (sstC >= 24) return 'Tropical wax'; if (sstC >= 20) return 'Warm water wax'; if (sstC >= 14) return 'Cool water wax'; if (sstC >= 9) return 'Cold water wax'; return 'Extra cold water wax';
}
const M2FT = 3.28084;
function boardHint(midM, T, level) {
  if (midM == null) return null; const ft = midM * M2FT; let s;
  if (level === 'beginner') s = ft < 1 ? 'Too small to catch much; a foam board will still get you rides' : ft <= 3 ? 'Foam board or longboard' : 'Large for a beginner; a foam board in the whitewater is safer';
  else if (level === 'advanced') s = ft < 2 ? 'Longboard, fish or a floaty shortboard' : ft <= 6 ? 'Your regular shortboard' : ft <= 10 ? 'Step-up with extra length' : 'Gun or tow-in territory';
  else s = ft < 2 ? 'Longboard or funboard' : ft <= 4 ? 'Funboard, mid-length or a fuller shortboard' : ft <= 7 ? 'Shortboard or fish' : 'Step-up';
  if (T != null && T < 8 && ft >= 1) s += '. Short period: expect a weak, mushy wave, so go for more volume';
  else if (T != null && T >= 14 && ft >= 3) s += '. Long period: it will pack power and push you back on the take-off';
  return s;
}
function levelNote(midM, level) {
  if (midM == null) return null; const ft = midM * M2FT, cap = level === 'beginner' ? 3.2 : level === 'intermediate' ? 6.4 : 99;
  if (ft > cap * 1.5) return { tone: 'bad', text: 'Well above a comfortable size for your level' };
  if (ft > cap) return { tone: 'warn', text: 'A bit above your comfort range' };
  return { tone: 'ok', text: 'Within your comfort range' };
}
/* Beginner safety caution: the top of the estimated surf size (e is a surfEstimate result) is above 4 ft */
const CAUTION_FT = 4;
function cautionFor(e, level) {
  if (!e || level !== 'beginner') return null;
  const hiFt = e.hi * M2FT; if (!(hiFt > CAUTION_FT)) return null;
  return { hiFt, hiM: e.hi, loM: e.lo };
}
/* tide position at hour i from an hourly height series: 0 is the lowest and 1 the highest of the surrounding day */
function tidePhase(series, i) {
  const a = Math.max(0, i - 12), b = Math.min(series.length - 1, i + 12), seg = series.slice(a, b + 1).filter(v => v != null), h = series[i];
  if (h == null || seg.length < 6) return null; const lo = Math.min(...seg), hi = Math.max(...seg); if (hi - lo < 0.05) return null;
  const p = series[i + 1] != null ? series[i + 1] : series[i], q = series[i - 1] != null ? series[i - 1] : series[i];
  return { pct: (h - lo) / (hi - lo), rising: p > q };
}
const TIDE_PREFS = [['any', 'No preference'], ['low', 'Low tide'], ['mid', 'Mid tide'], ['high', 'High tide'], ['rising', 'Rising tide'], ['falling', 'Falling tide']];
function tideMatch(pref, ph) {
  if (!pref || pref === 'any' || !ph) return null;
  if (pref === 'low') return ph.pct < 0.33; if (pref === 'high') return ph.pct > 0.67; if (pref === 'mid') return ph.pct >= 0.25 && ph.pct <= 0.75;
  return pref === 'rising' ? ph.rising : !ph.rising;
}
/* per-spot tweaks: a preferred tide and a preferred size nudge the score up or down */
/* size picks: id and the range in feet (the score compares feet); labels follow the Menu units */
const SIZE_PREFS = [['any', null], ['small', [0, 2]], ['mid', [2, 4]], ['head', [4, 6]], ['big', [6, 99]]];
function sizePrefName(id, units) {
  const r = (SIZE_PREFS.find(x => x[0] === id) || [])[1];
  if (!r) return 'Any size';
  const metric = units === 'metric', num = ft => (metric ? +(ft / M2FT).toFixed(1) : ft), unit = metric ? ' m' : ' ft';
  if (id === 'small') return 'Small, up to ' + num(r[1]) + unit;
  if (id === 'big') return num(r[0]) + unit + ' and bigger';
  return num(r[0]) + ' to ' + num(r[1]) + unit;
}
const prefActive = n => !!n && ((n.tide && n.tide !== 'any') || (n.size && n.size !== 'any'));
function applyPrefs(H, sc, note, tideArr, face, k) {
  if (!prefActive(note)) return sc;
  const range = (SIZE_PREFS.find(x => x[0] === note.size) || [])[1];
  return sc.map((r, i) => {
    if (!r) return r; let d = 0;
    if (note.tide && note.tide !== 'any' && tideArr) { const m = tideMatch(note.tide, tidePhase(tideArr, i)); if (m === true) d += 5; else if (m === false) d -= 8; }
    if (range) {
      const v = valAt(H, i), sw = r.swell === 1 ? { H: v.s2H, T: v.s2T, D: v.s2D } : { H: v.sH != null ? v.sH : v.wH, T: v.sT != null ? v.sT : v.wT, D: v.sD != null ? v.sD : v.wD };
      const e = surfEstimate(sw.H, sw.T, sw.D, face, k);
      if (e) { const ft = e.mid * M2FT, out = ft < range[0] ? range[0] - ft : ft > range[1] ? ft - range[1] : 0; d += out === 0 ? 4 : -Math.min(14, Math.round(out * 4)); }
    }
    if (!d) return r; const score = clamp(r.score + d, 0, 100);
    return Object.assign({}, r, { score, band: bandOf(score), adj: d });
  });
}
/* ---------- calendar (ICS) ---------- */
const icsEsc = s => String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
const icsStamp = ms => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
function icsText(events) {
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dawn Patrol//Surf windows//EN', 'CALSCALE:GREGORIAN'];
  events.forEach(e => { L.push('BEGIN:VEVENT', 'UID:' + e.uid + '@dawn-patrol', 'DTSTAMP:' + icsStamp(Date.now()), 'DTSTART:' + icsStamp(e.start), 'DTEND:' + icsStamp(e.end), 'SUMMARY:' + icsEsc(e.title), 'DESCRIPTION:' + icsEsc(e.desc || ''), e.loc ? 'LOCATION:' + icsEsc(e.loc) : null, 'END:VEVENT'); });
  L.push('END:VCALENDAR'); return L.filter(x => x != null).join('\r\n') + '\r\n';
}
/* ---------- share links ---------- */
/* share links: one spot (#pin=lat,lon,face&name=..&w=swell directions&d=break depth in metres) or a set of spots (#spots=name~lat~lon~face~w~depth|...) */
const winTxt = w => (Array.isArray(w) && w.length ? w.map(x => +(+x).toFixed(1)).join(',') : '');
const depthTxt = d => (d > 0 ? String(+(+d).toFixed(2)) : '');
function shareHash(spot, win) {
  const w = winTxt(win);
  return '#pin=' + [(+spot.lat).toFixed(4), (+spot.lon).toFixed(4), spot.face == null ? 270 : spot.face].join(',') + '&name=' + encodeURIComponent(spot.name) + (w ? '&w=' + w : '') + (spot.depth > 0 ? '&d=' + depthTxt(spot.depth) : '');
}
function shareListHash(spots, wins) {
  return '#spots=' + encodeURIComponent(spots.map(s => [String(s.name).replace(/[~|]/g, ' '), (+s.lat).toFixed(4), (+s.lon).toFixed(4), s.face == null ? 270 : s.face, winTxt(wins && wins[s.id]), depthTxt(s.depth)].join('~')).join('|'));
}
const parseWin = t => { const w = String(t || '').split(',').filter(x => x.trim() !== '').map(Number).filter(x => isFinite(x) && x >= 0 && x < 360).slice(0, 16); return w.length ? [...new Set(w)] : null; };
const parsePinParts = (la, lo, f, name, w, d) => {
  const num = x => (x == null || String(x).trim() === '' ? NaN : +x); /* a blank field is missing, not 0 */
  la = num(la); lo = num(lo); f = num(f);
  if (!isFinite(la) || !isFinite(lo) || Math.abs(la) > 90 || Math.abs(lo) > 180) return null;
  const pin = { lat: la, lon: lo, face: isFinite(f) ? ((f % 360) + 360) % 360 : 270, name: String(name || '').trim().slice(0, 40), win: parseWin(w) };
  const dp = num(d); if (isFinite(dp) && dp >= 0.3 && dp <= 30) pin.depth = Math.round(dp * 100) / 100;
  return pin;
};
function parseShare(hash) {
  const h = String(hash || '').replace(/^#/, ''); if (!h) return null;
  if (h === 'help') return { help: true };
  const q = {}; h.split('&').forEach(p => { const k = p.indexOf('='); if (k > 0) { try { q[p.slice(0, k)] = decodeURIComponent(p.slice(k + 1)); } catch (e) { /* bad escape: ignore this part */ } } });
  if (q.spot) return { spot: q.spot };
  if (q.pin) { const [la, lo, f] = q.pin.split(','); const pin = parsePinParts(la, lo, f, q.name, q.w, q.d); if (pin) return { pin }; }
  if (q.spots) { const list = q.spots.split('|').slice(0, 24).map(r => { const a = r.split('~'); return parsePinParts(a[1], a[2], a[3], a[0], a[4], a[5]); }).filter(Boolean); if (list.length) return { list }; }
  return null;
}
