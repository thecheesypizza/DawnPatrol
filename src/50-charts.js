/* ============================================================
   CHARTS: hand-built SVG, one y-axis each, hover readout
   ============================================================ */
const SVGNS = 'http://www.w3.org/2000/svg';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function niceTicks(lo, hi, n) {
  if (!(hi > lo)) hi = lo + 1;
  const raw = (hi - lo) / n, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p;
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
  const a = Math.floor(lo / step + 1e-9) * step, out = [];
  for (let v = a; v <= hi + step * 0.999; v += step) out.push(+v.toFixed(6));
  return out;
}
function arrowSvg(deg, size, title) {
  return '<svg class="compass" width="' + size + '" height="' + size + '" viewBox="0 0 20 20" style="transform:rotate(' + Math.round(deg) + 'deg)" role="img" aria-label="' + esc(title || '') + '"><path d="M10 2l5.2 13.6L10 12.6 4.8 15.6z" fill="currentColor"/></svg>';
}

/* cfg: { t:[local times], i0, i1, nowIdx, series:[{label,color,data,dash,w}], unit, min, max, type:'line'|'area'|'bars', fmt, arrows:{dirs,every}, marks:[{i,text,pos}], height } */
let CHART_UID = 0;
/* a spoken summary of a chart: what it shows and where it peaks (screen readers read this) */
function chartSummary(cfg) {
  try {
    const strip = t => String(t == null ? '' : t).replace(/<[^>]*>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
    const fm = (v, s, i) => strip(cfg.fmt ? cfg.fmt(v, s, i) : f1(v) + (cfg.unit ? ' ' + cfg.unit : ''));
    const when = i => dayLabel(cfg.t[i]) + (cfg.daily ? '' : ' at ' + fmtHr(cfg.t[i]));
    const parts = [];
    cfg.series.slice(0, 3).forEach(s => {
      let lo = -1, hi = -1;
      for (let i = cfg.i0; i <= cfg.i1; i++) { const v = s.data[i]; if (v == null) continue; if (lo < 0 || v < s.data[lo]) lo = i; if (hi < 0 || v > s.data[hi]) hi = i; }
      if (hi >= 0) parts.push((s.label || cfg.title || 'Value') + ' ranges from ' + fm(s.data[lo], s, lo) + ' to ' + fm(s.data[hi], s, hi) + ', highest ' + when(hi));
    });
    const span = cfg.t[cfg.i0] != null ? ' From ' + when(cfg.i0) + ' to ' + when(cfg.i1) + '.' : '';
    return (cfg.aria || cfg.title || 'Chart') + '.' + span + (parts.length ? ' ' + parts.join('. ') + '.' : '') + ' Use the left and right arrow keys to step through the hours.';
  } catch (e) { return cfg.aria || cfg.title || 'chart'; }
}
function drawChart(box, cfg) {
  box._cfg = cfg;
  const W = Math.max(260, box.clientWidth - 20), Ht = cfg.height || 170, m = { l: 40, r: 8, t: cfg.arrows ? 26 : 10, b: 22 };
  const pw = W - m.l - m.r, ph = Ht - m.t - m.b, n = cfg.i1 - cfg.i0;
  const X = i => m.l + (i - cfg.i0) / Math.max(1, n) * pw;
  let lo = cfg.min != null ? cfg.min : Infinity, hi = cfg.max != null ? cfg.max : -Infinity;
  for (const s of cfg.series) for (let i = cfg.i0; i <= cfg.i1; i++) { const v = s.data[i]; if (v != null) { if (cfg.min == null) lo = Math.min(lo, v); if (cfg.max == null) hi = Math.max(hi, v); } }
  for (const b of cfg.bands || []) for (let i = cfg.i0; i <= cfg.i1; i++) { const a = b.lo[i], c = b.hi[i]; if (a != null && cfg.min == null) lo = Math.min(lo, a); if (c != null && cfg.max == null) hi = Math.max(hi, c); }
  if (!isFinite(lo)) { lo = 0; hi = 1; }
  if (cfg.min == null) lo = Math.min(lo, 0) === 0 && lo > 0 && lo < (hi * 0.5) ? 0 : lo;
  const ticks = niceTicks(lo, hi, 4); lo = Math.min(lo, ticks[0]); hi = Math.max(hi, ticks[ticks.length - 1]);
  const Y = v => m.t + ph - (v - lo) / (hi - lo || 1) * ph;
  let g = '';
  for (const tk of ticks) g += '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + Y(tk).toFixed(1) + '" y2="' + Y(tk).toFixed(1) + '" stroke="var(--line)" stroke-width="1" ' + (tk === 0 ? '' : 'stroke-dasharray="2 4"') + '/><text x="' + (m.l - 6) + '" y="' + (Y(tk) + 3.5).toFixed(1) + '" text-anchor="end" font-size="10" font-family="var(--f-mono)" fill="var(--ink-3)">' + (cfg.tickFmt ? cfg.tickFmt(tk) : +tk.toFixed(2)) + '</text>';
  // day boundaries and labels
  const dayW = 24 / Math.max(1, n) * pw;
  if (cfg.daily) { const st = Math.max(1, Math.ceil(54 / (pw / Math.max(1, n)))); for (let i = cfg.i0; i <= cfg.i1; i += st) g += '<text x="' + X(i).toFixed(1) + '" y="' + (Ht - 6) + '" text-anchor="middle" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + dayLabel(cfg.t[i]) + '</text>'; }
  else for (let i = cfg.i0; i <= cfg.i1; i++) {
    const hh = parseT(cfg.t[i]).h;
    if (hh === 0 && i > cfg.i0) g += '<line x1="' + X(i).toFixed(1) + '" x2="' + X(i).toFixed(1) + '" y1="' + m.t + '" y2="' + (m.t + ph) + '" stroke="var(--line)" stroke-width="1"/>';
    if (hh === 12 || (i === cfg.i0 && dayW > 70)) {
      const lab = dayW > 46 ? dayLabel(cfg.t[i]) : WD[dow(cfg.t[i])].slice(0, 2);
      if (hh === 12) g += '<text x="' + X(i).toFixed(1) + '" y="' + (Ht - 6) + '" text-anchor="middle" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + lab + '</text>';
    }
  }
  if (cfg.nowIdx != null && cfg.nowIdx >= cfg.i0 && cfg.nowIdx <= cfg.i1)
    g += '<line x1="' + X(cfg.nowIdx).toFixed(1) + '" x2="' + X(cfg.nowIdx).toFixed(1) + '" y1="' + m.t + '" y2="' + (m.t + ph) + '" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3 3"/><text x="' + (X(cfg.nowIdx) + 4).toFixed(1) + '" y="' + (m.t + 10) + '" font-size="10" font-family="var(--f-mono)" fill="var(--accent)">now</text>';
  (cfg.bands || []).forEach(b => {
    let top = '', bot = [];
    for (let i = cfg.i0; i <= cfg.i1; i++) { const a = b.lo[i], c = b.hi[i]; if (a == null || c == null) continue; top += (top ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(c).toFixed(1); bot.push('L' + X(i).toFixed(1) + ' ' + Y(a).toFixed(1)); }
    if (top) g += '<path d="' + top + bot.reverse().join('') + 'Z" fill="' + (b.color || 'var(--s1)') + '" fill-opacity="' + (b.op || 0.16) + '" stroke="none"/>';
  });
  // marks
  cfg.series.forEach((s, si) => {
    const col = s.color || 'var(--s1)', gid = 'cg' + (++CHART_UID);
    if (cfg.type === 'area' && si === 0) g += '<defs><linearGradient id="' + gid + '-' + si + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + col + '" stop-opacity=".42"/><stop offset="1" stop-color="' + col + '" stop-opacity=".02"/></linearGradient></defs>';
    if (cfg.type === 'bars') {
      const bw = Math.max(1, pw / Math.max(1, n) * 0.8);
      for (let i = cfg.i0; i <= cfg.i1; i++) { const v = s.data[i]; if (v == null || v <= lo) continue; g += '<rect x="' + (X(i) - bw / 2).toFixed(1) + '" y="' + Y(v).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (Y(lo) - Y(v)).toFixed(1) + '" fill="' + col + '" rx="2"/>'; }
      return;
    }
    let d = '', run = false;
    for (let i = cfg.i0; i <= cfg.i1; i++) { const v = s.data[i]; if (v == null) { run = false; continue; } d += (run ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1); run = true; }
    if (cfg.type === 'area' && si === 0 && d) {
      let a = ''; let start = null, last = null;
      for (let i = cfg.i0; i <= cfg.i1; i++) { const v = s.data[i]; if (v == null) continue; if (start == null) start = i; last = i; }
      if (start != null) g += '<path d="' + d + 'L' + X(last).toFixed(1) + ' ' + Y(lo).toFixed(1) + 'L' + X(start).toFixed(1) + ' ' + Y(lo).toFixed(1) + 'Z" fill="url(#' + gid + '-' + si + ')"/>';
    }
    g += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + (s.w || 2.600) + '" stroke-linejoin="round" stroke-linecap="round"' + (s.dash ? ' stroke-dasharray="' + s.dash + '"' : '') + '/>';
  });
  if (cfg.arrows) {
    const ev = cfg.arrows.every || 3;
    for (let i = cfg.i0; i <= cfg.i1; i += ev) { const dd = cfg.arrows.dirs[i]; if (dd == null) continue; g += '<g transform="translate(' + X(i).toFixed(1) + ' 11) rotate(' + Math.round(norm360(dd + 180)) + ')"><path d="M0 -6l4 10-4-2.4-4 2.4z" fill="var(--ink-2)"/></g>'; }
  }
  (cfg.marks || []).forEach(k => {
    if (k.i < cfg.i0 || k.i > cfg.i1) return;
    const yy = Y(cfg.series[0].data[k.i]), up = k.pos === 'up';
    g += '<circle cx="' + X(k.i).toFixed(1) + '" cy="' + yy.toFixed(1) + '" r="3.5" fill="var(--surface)" stroke="' + (cfg.series[0].color || 'var(--s1)') + '" stroke-width="2"/><text x="' + X(k.i).toFixed(1) + '" y="' + (yy + (up ? -8 : 15)).toFixed(1) + '" text-anchor="middle" font-size="10" font-family="var(--f-mono)" fill="var(--ink)">' + esc(k.text) + '</text>';
  });
  const svg = '<svg viewBox="0 0 ' + W + ' ' + Ht + '" width="' + W + '" height="' + Ht + '" role="img" tabindex="0" aria-label="' + esc(chartSummary(cfg)) + '">' + g +
    '<line class="xh" x1="0" x2="0" y1="' + m.t + '" y2="' + (m.t + ph) + '" stroke="var(--ink)" stroke-width="1" visibility="hidden"/>' +
    '<rect class="hit" x="' + m.l + '" y="0" width="' + pw + '" height="' + Ht + '" fill="transparent"/></svg>';
  const svgHost = box.querySelector('.svgh'); svgHost.innerHTML = svg;
  const tip = box.querySelector('.tip'), xh = svgHost.querySelector('.xh'), hit = svgHost.querySelector('.hit'), svgEl = svgHost.querySelector('svg');
  const live = box.querySelector('.sr-live');
  let kb = cfg.nowIdx != null && cfg.nowIdx >= cfg.i0 && cfg.nowIdx <= cfg.i1 ? cfg.nowIdx : cfg.i0;
  const show = ev => {
    const r = svgEl.getBoundingClientRect(), px = (ev.clientX - r.left) * (W / r.width);
    at(clamp(Math.round(cfg.i0 + (px - m.l) / pw * n), cfg.i0, cfg.i1));
  };
  const at = i => {
    kb = i;
    xh.setAttribute('x1', X(i)); xh.setAttribute('x2', X(i)); xh.setAttribute('visibility', 'visible');
    tip.innerHTML = '<div>' + dayLabel(cfg.t[i]) + (cfg.daily ? '' : ' ' + fmtHr(cfg.t[i])) + '</div>' + cfg.series.map(s => s.data[i] == null ? '' : '<div><i style="background:' + (s.color || 'var(--s1)') + '"></i>' + esc(s.label) + ' ' + (cfg.fmt ? cfg.fmt(s.data[i], s, i) : f1(s.data[i]) + ' ' + (cfg.unit || '')) + '</div>').join('') + (cfg.bands || []).map(b => (b.lo[i] == null || b.hi[i] == null ? '' : '<div><i style="background:' + (b.color || 'var(--s1)') + ';opacity:.45"></i>' + esc(b.label) + ' ' + f1(b.lo[i]) + ' to ' + f1(b.hi[i]) + ' ' + (cfg.unit || '') + '</div>')).join('');
    tip.hidden = false;
    const bw = box.clientWidth, tw = tip.offsetWidth, left = clamp(X(i) + 10 + 10 - (X(i) > W * 0.6 ? tw + 20 : 0), 4, bw - tw - 4);
    tip.style.left = left + 'px'; tip.style.top = '34px';
    if (live && kbMode) live.textContent = Array.from(tip.children).map(c => c.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean).join('. ');
  };
  let kbMode = false;
  svgEl.addEventListener('keydown', e => {
    const k = e.key, step = k === 'ArrowRight' ? 1 : k === 'ArrowLeft' ? -1 : k === 'PageUp' ? 6 : k === 'PageDown' ? -6 : 0;
    if (!step && k !== 'Home' && k !== 'End') return; e.preventDefault(); kbMode = true;
    at(clamp(k === 'Home' ? cfg.i0 : k === 'End' ? cfg.i1 : kb + step, cfg.i0, cfg.i1));
  });
  svgEl.addEventListener('blur', () => { kbMode = false; tip.hidden = true; xh.setAttribute('visibility', 'hidden'); });
  hit.addEventListener('pointermove', show); hit.addEventListener('pointerdown', show);
  hit.addEventListener('pointerleave', () => { tip.hidden = true; xh.setAttribute('visibility', 'hidden'); });
}
const chartObserver = new ResizeObserver(entries => { for (const e of entries) { const b = e.target; if (b._cfg && Math.abs((b._w || 0) - b.clientWidth) > 2) { b._w = b.clientWidth; drawChart(b, b._cfg); } } });
const CHART_TILE = [[/^Swell (height|period)/, 'swell1'], [/^Wind$/, 'wind'], [/^Tide height/, 'tide'], [/^Sea surface/, 'water'], [/^Ocean current/, 'water'], [/^Barometric/, 'pressure'], [/^Cloud cover/, 'sky'], [/^Visibility/, 'sky'], [/^Air temperature/, 'air']];
const chartTile = title => { const m = CHART_TILE.find(x => x[0].test(title)); return m ? m[1] : ''; };
function makeChart(title, sub, cfg) {
  const box = document.createElement('div'); box.className = 'chartbox'; box.dataset.chart = title;
  const bandsL = (cfg.bands || []).map(b => ({ label: b.label, color: b.color })), multi = cfg.series.length + bandsL.length > 1;
  const tid = chartTile(title);
  box.innerHTML = '<h3><span>' + esc(title) + '</span>' + (tid ? '<button type="button" class="more" data-tile="' + tid + '" aria-label="' + esc(title) + ': more detail">Details \u203a</button>' : '') + '<small>' + esc(sub || '') + '</small>' + (tid && sndOK() && cfg.series && cfg.series.length ? '<button type="button" class="snd" aria-pressed="false" aria-label="Play ' + esc(title) + ' as sound">\u266a Hear it</button>' : '') + '</h3>' +
    (multi ? '<div class="legend">' + cfg.series.concat(bandsL).map(s => '<span><i style="background:' + (s.color || 'var(--s1)') + '"></i>' + esc(s.label) + '</span>').join('') + '</div>' : '') +
    '<div class="svgh"></div><div class="tip" hidden></div><div class="sr-only sr-live" role="status" aria-live="polite"></div>';
  cfg.title = title; box._cfg = cfg; return box;
}
function mountChart(box) { box._w = box.clientWidth; drawChart(box, box._cfg); chartObserver.observe(box); }

/* ============================================================
   COMPASS ROSE + BUOY CLIENT
   ============================================================ */
/* items: [{ dir (degrees it comes FROM), color, w, len, ring:'in'|'out' }]; face = direction the beach faces */
const exposureWord = (d, face) => { if (d == null || face == null) return ''; const e = exposure(d, face); return e >= 0.99 ? 'full exposure' : e >= 0.4 ? 'partial exposure' : 'shadowed'; };
const windowText = face => (face == null ? '' : face.win ? face.win.slice().sort((a, b) => norm360(a) - norm360(b)).map(dirName).join(', ') : dirName(face - 50) + ' to ' + dirName(face + 50));
function compassSvg(face, items, label) {
  const C = 160, R = 82, pt = (a, r) => [C + r * Math.sin(a * Math.PI / 180), C - r * Math.cos(a * Math.PI / 180)], f1_ = n => n.toFixed(1);
  const wedgeAB = (a, b) => { if (b - a >= 359.9) return 'M160 ' + (160 - R) + 'A' + R + ' ' + R + ' 0 1 1 160 ' + (160 + R) + 'A' + R + ' ' + R + ' 0 1 1 160 ' + (160 - R) + 'Z'; const p0 = pt(a, R), p1 = pt(b, R); return 'M160 160L' + f1_(p0[0]) + ' ' + f1_(p0[1]) + 'A' + R + ' ' + R + ' 0 ' + (b - a > 180 ? 1 : 0) + ' 1 ' + f1_(p1[0]) + ' ' + f1_(p1[1]) + 'Z'; };
  const arcs = swellArcs(face);
  const rim = (a, b, op) => { if (b - a >= 359.9) { a = 0; b = 359.9; } const p0 = pt(a, R), p1 = pt(b, R); return '<path d="M' + f1_(p0[0]) + ' ' + f1_(p0[1]) + 'A' + R + ' ' + R + ' 0 ' + (b - a > 180 ? 1 : 0) + ' 1 ' + f1_(p1[0]) + ' ' + f1_(p1[1]) + '" fill="none" stroke="var(--ok)" stroke-opacity="' + op + '" stroke-width="9" stroke-linecap="butt"/>'; };
  let g = '<circle cx="160" cy="160" r="' + R + '" fill="var(--bg)" stroke="var(--line)" stroke-width="1.5"/>';
  if (face != null) g += arcs.pale.map(a => '<path d="' + wedgeAB(a[0], a[1]) + '" fill="var(--ok)" fill-opacity=".09"/>').join('') + arcs.full.map(a => '<path d="' + wedgeAB(a[0], a[1]) + '" fill="var(--ok)" fill-opacity=".17"/>').join('');
  g += '<circle cx="160" cy="160" r="' + (R - 30) + '" fill="none" stroke="var(--line)" stroke-dasharray="2 4"/>';
  for (let a = 0; a < 360; a += 10) { const len = a % 90 === 0 ? 10 : a % 45 === 0 ? 8 : 4, p0 = pt(a, R), p1 = pt(a, R - len); g += '<line x1="' + f1_(p0[0]) + '" y1="' + f1_(p0[1]) + '" x2="' + f1_(p1[0]) + '" y2="' + f1_(p1[1]) + '" stroke="var(--ink-3)" stroke-width="1"/>'; }
  if (face != null) {
    g += arcs.pale.map(a => rim(a[0], a[1], 0.35)).join('') + arcs.full.map(a => rim(a[0], a[1], 0.9)).join('');
    const b0 = pt(face, R + 9), b1 = pt(face - 7, R + 20), b2 = pt(face + 7, R + 20);
    if (!face.win) g += '<path d="M' + f1_(b0[0]) + ' ' + f1_(b0[1]) + 'L' + f1_(b1[0]) + ' ' + f1_(b1[1]) + 'L' + f1_(b2[0]) + ' ' + f1_(b2[1]) + 'Z" fill="var(--ok)" stroke="var(--bg)" stroke-width="1.5"/>';
  }
  [['N', 0], ['NE', 45], ['E', 90], ['SE', 135], ['S', 180], ['SW', 225], ['W', 270], ['NW', 315]].forEach(c => {
    const card = c[1] % 90 === 0, p = pt(c[1], R + (card ? 14 : 13)), under = face != null && !face.win && angDiff(c[1], face) < 14;
    if (under) return;
    g += '<text x="' + f1_(p[0]) + '" y="' + f1_(p[1]) + '" text-anchor="middle" dominant-baseline="central" font-family="var(--f-mono)" font-size="' + (card ? 13 : 9) + '" font-weight="' + (card ? 700 : 500) + '" fill="' + (c[0] === 'N' ? 'var(--accent)' : card ? 'var(--ink)' : 'var(--ink-3)') + '">' + c[0] + '</text>';
  });
  // arrows travel toward the centre; the dot marks where the swell or wind comes FROM
  items.forEach(it => {
    if (it.dir == null || isNaN(it.dir)) return;
    const out = it.ring === 'out', r0 = out ? 152 : R - 6, ty = -(r0 - it.len), w = it.w, hw = w + 3, hl = w + 9;
    if (it.trail) it.trail.forEach((d, k) => { if (d != null) g += '<circle transform="translate(160 160) rotate(' + norm360(d).toFixed(1) + ')" cx="0" cy="' + (-r0) + '" r="' + (it.w * 0.6 + 0.5).toFixed(1) + '" fill="' + it.color + '" opacity="' + Math.max(0.08, 0.5 - k * 0.07).toFixed(2) + '"/>'; });
    g += '<g transform="translate(160 160) rotate(' + norm360(it.dir).toFixed(1) + ')"><line x1="0" y1="' + (-r0) + '" x2="0" y2="' + (ty - hl + 2) + '" stroke="' + it.color + '" stroke-width="' + w + '" stroke-linecap="round"/><path d="M0 ' + ty + 'L' + (-hw) + ' ' + (ty - hl) + 'L' + hw + ' ' + (ty - hl) + 'Z" fill="' + it.color + '"/><circle cx="0" cy="' + (-r0) + '" r="' + (w * 0.9 + 1) + '" fill="' + it.color + '" stroke="var(--bg)" stroke-width="1.5"/></g>';
  });
  // each arrow carries its compass heading next to its dot; swell labels that share a bearing step inward so they stay readable
  items.forEach((it, n) => {
    if (it.dir == null || isNaN(it.dir)) return;
    const out = it.ring === 'out', r0 = out ? 152 : R - 6;
    let lr = r0 - 13;
    if (!out) lr -= 11 * items.slice(0, n).filter(o => o.ring !== 'out' && o.dir != null && !isNaN(o.dir) && angDiff(o.dir, it.dir) < 12).length;
    const p = pt(norm360(it.dir), lr);
    g += '<text x="' + f1_(p[0]) + '" y="' + f1_(p[1]) + '" text-anchor="middle" dominant-baseline="central" font-family="var(--f-mono)" font-size="9.5" font-weight="700" fill="' + it.color + '" stroke="var(--bg)" stroke-width="3" paint-order="stroke" stroke-linejoin="round">' + esc(dirName(it.dir) + ' ' + Math.round(norm360(it.dir)) + '\u00b0') + '</text>';
  });
  g += '<circle cx="160" cy="160" r="3" fill="var(--ink-3)"/>';
  return '<svg viewBox="0 0 320 320" role="img" aria-label="' + esc(label || 'Compass rose of swell and wind directions') + '">' + g + '</svg>';
}
/* a small rose for the spot list: green is the swell window, blue dot is the swell now, dark dot is the wind */
function miniRose(face, swellDir, windDir) {
  if (face == null) return '';
  const c = 20, r = 16, pt = (a, q) => [c + q * Math.sin(a * Math.PI / 180), c - q * Math.cos(a * Math.PI / 180)], n1 = v => v.toFixed(1);
  const secAB = (a, b) => { if (b - a >= 359.9) return 'M20 4A16 16 0 1 1 20 36A16 16 0 1 1 20 4Z'; const p0 = pt(a, r), p1 = pt(b, r); return 'M20 20L' + n1(p0[0]) + ' ' + n1(p0[1]) + 'A16 16 0 ' + (b - a > 180 ? 1 : 0) + ' 1 ' + n1(p1[0]) + ' ' + n1(p1[1]) + 'Z'; };
  const arcs = swellArcs(face);
  let g = '<circle cx="20" cy="20" r="16" fill="var(--bg)" stroke="var(--line)"/>' + arcs.pale.map(a => '<path d="' + secAB(a[0], a[1]) + '" fill="var(--ok)" fill-opacity=".16"/>').join('') + arcs.full.map(a => '<path d="' + secAB(a[0], a[1]) + '" fill="var(--ok)" fill-opacity=".4"/>').join('') + '<path d="M20 2v4" stroke="var(--accent)" stroke-width="1.5"/>';
  if (windDir != null) { const q = pt(windDir, r); g += '<circle cx="' + n1(q[0]) + '" cy="' + n1(q[1]) + '" r="2.4" fill="var(--ink)" stroke="var(--bg)" stroke-width="1"/>'; }
  if (swellDir != null) { const q = pt(swellDir, r); g += '<circle cx="' + n1(q[0]) + '" cy="' + n1(q[1]) + '" r="3.4" fill="var(--s1)" stroke="var(--bg)" stroke-width="1.2"/>'; }
  return '<svg class="mini" viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">' + g + '</svg>';
}

/* ---------- buoys (NOAA NDBC, through the Worker proxy) ---------- */
const BUOY_WORKER = 'https://dawnpatrol.casadelfuego.org';
const BU = { near: new Map(), obs: new Map(), sel: new Map(), days: 3 };
const buoyGet = path => apiGet(path);
async function nearBuoys(spot) {
  const k = spot.lat.toFixed(2) + ',' + spot.lon.toFixed(2);
  if (!BU.near.has(k)) BU.near.set(k, (await buoyGet('/api/buoys?lat=' + spot.lat + '&lon=' + spot.lon + '&n=8')).stations || []);
  return BU.near.get(k);
}
async function buoyObs(id) {
  const hit = BU.obs.get(id); if (hit && Date.now() - hit.at < 10 * 60000) return hit.d;
  const d = await buoyGet('/api/buoy/' + encodeURIComponent(id)); BU.obs.set(id, { at: Date.now(), d }); return d;
}
/* nearest wave buoy first, then others; walks the list until one has data */
async function pickBuoy(spot) {
  const list = await nearBuoys(spot); if (!list.length) throw new Error('No NOAA buoys within 600 km of this spot.');
  const want = BU.sel.get(spot.id);
  const order = want ? list.filter(s => s.id === want).concat(list.filter(s => s.id !== want)) : list.filter(s => s.type === 'buoy' && s.km <= 250).concat(list.filter(s => !(s.type === 'buoy' && s.km <= 250)));
  let lastErr = null;
  for (const s of (want ? order.slice(0, 1) : order.slice(0, 4))) { try { const d = await buoyObs(s.id); if (d && ((d.std && d.std.t.length) || (d.spec && d.spec.t.length))) return { station: s, stations: list, data: d }; } catch (e) { lastErr = e; } }
  throw lastErr || new Error('The nearby buoys have no recent observations.');
}
/* last non-null value of a column, with the time it was observed */
function buoyLatest(d, key, maxAgeH) {
  const src = (d.std && d.std[key] ? d.std : d.spec && d.spec[key] ? d.spec : null); if (!src) return null;
  const newest = Math.max(...(d.std.t.concat(d.spec.t)));
  for (let i = src[key].length - 1; i >= 0; i--) if (src[key][i] != null) return (newest - src.t[i]) / 3600 <= (maxAgeH || 6) ? { v: src[key][i], t: src.t[i] } : null;
  return null;
}
/* resample to one value per hour (last reading in the hour wins) */
function buoyHourly(d, hours, off) {
  const all = d.std.t.concat(d.spec.t); if (!all.length) return null;
  const end = Math.floor(Math.max(...all) / 3600), n = Math.min(hours, end - Math.floor(Math.min(...all) / 3600) + 1), start = end - n + 1, out = { n, t: [] };
  for (let i = 0; i < n; i++) out.t.push(localStr((start + i) * 3600000, off));
  const fill = (src, keys) => keys.forEach(k => { const a = out[k] = new Array(n).fill(null), col = src[k]; if (!col) return; for (let r = 0; r < src.t.length; r++) { const b = Math.floor(src.t[r] / 3600) - start; if (b >= 0 && b < n && col[r] != null) a[b] = col[r]; } });
  fill(d.std, ['wdir', 'wspd', 'gst', 'wvht', 'dpd', 'apd', 'mwd', 'pres', 'atmp', 'wtmp', 'dewp', 'vis', 'ptdy', 'tide']);
  fill(d.spec, ['swh', 'swp', 'swd', 'wwh', 'wwp', 'wwd']);
  return out;
}

/* ============================================================
   ART: tile icons, sparklines, day-card waves and the live surf scene
   ============================================================ */
const TILE_ICON = {
  swell1: '<path d="M2 12c2.5-4 4.5-4 7 0s4.5 4 7 0 4-3.5 6-2.5"/><path d="M2 18c2.5-4 4.5-4 7 0s4.5 4 7 0 4-3.5 6-2.5"/>',
  swell2: '<path d="M2 10c2-3 4-3 6 0s4 3 6 0 3-2 5-1.5"/><path d="M5 17c2-2.500 3.500-2.500 5.500 0s3.500 2.500 5.500 0 2-1.500 3.500-1.200"/>',
  chop: '<path d="M3 8l3 3 3-3 3 3 3-3 3 3 3-3"/><path d="M3 15l3 3 3-3 3 3 3-3 3 3 3-3"/>',
  sea: '<path d="M3 7c3-3 6 3 9 0s6-3 9 0"/><path d="M3 12c3-3 6 3 9 0s6-3 9 0"/><path d="M3 17c3-3 6 3 9 0s6-3 9 0"/>',
  wind: '<path d="M9.600 4.600A2 2 0 1 1 11 8H2"/><path d="M12.600 19.400A2 2 0 1 0 14 16H2"/><path d="M17.700 7.700A2.500 2.500 0 1 1 19.500 12H2"/>',
  tide: '<path d="M7 20V6M3 10l4-4 4 4"/><path d="M17 4v14M13 14l4 4 4-4"/>',
  water: '<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',
  air: '<path d="M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0z"/>',
  sky: '<path d="M7 19a4 4 0 0 1 0-8 5 5 0 0 1 9.600-1A4.500 4.500 0 0 1 17 19z"/><path d="M8 5l1 1.500M3.500 8.500L5 9"/>',
  pressure: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/>',
  sun: '<path d="M3 19h18M7 19a5 5 0 0 1 10 0M12 5v4M5 11l1.500 1.500M19 11l-1.500 1.500"/>',
  moon: '<path d="M20 14.500A8 8 0 1 1 9.500 4a6.500 6.500 0 0 0 10.500 10.500z"/>',
  size: '<path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"/>',
  score: '<path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>'
};
const tileIcon = id => TILE_ICON[id] ? '<span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + TILE_ICON[id] + '</svg></span>' : '';
/* a tiny trend line for the next day: left edge is now */
function sparkSvg(arr) {
  const pts = arr.map((v, i) => [i, v]).filter(p => p[1] != null); if (pts.length < 3) return '';
  let lo = Math.min(...pts.map(p => p[1])), hi = Math.max(...pts.map(p => p[1])); if (hi - lo < 1e-6) { hi += 1; lo -= 1; }
  const W = 150, Hh = 38, X = i => 4 + i / Math.max(1, arr.length - 1) * (W - 8), Y = v => 5 + (1 - (v - lo) / (hi - lo)) * (Hh - 10);
  let d = ''; pts.forEach((p, k) => { d += (k ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); });
  const last = pts[pts.length - 1], first = pts[0];
  return '<svg class="spark" viewBox="0 0 ' + W + ' ' + Hh + '" aria-hidden="true"><path class="a" d="' + d + 'L' + X(last[0]).toFixed(1) + ' ' + Hh + 'L' + X(first[0]).toFixed(1) + ' ' + Hh + 'Z"/><path class="l" d="' + d + '"/><circle class="d" cx="' + X(first[0]).toFixed(1) + '" cy="' + Y(first[1]).toFixed(1) + '" r="3.600"/></svg>';
}
function sunArcSvg(f) {
  const x = 14 + clamp(f, 0, 1) * 122, y = 36 - Math.sin(clamp(f, 0, 1) * Math.PI) * 26;
  return '<svg class="spark" viewBox="0 0 150 44" aria-hidden="true"><path class="h" d="M14 36A61 38 0 0 1 136 36"/><path d="M4 36h142" stroke="var(--line)" stroke-width="2" stroke-linecap="round"/><circle class="s" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (f > 0 && f < 1 ? 6 : 4) + '" opacity="' + (f > 0 && f < 1 ? 1 : .45) + '"/></svg>';
}
/* a little wave for each forecast day card, sized by the day's surf and tinted by its score band */
function dayWaveSvg(ft, band, uid) {
  const a = clamp(3 + (ft || 0) * 3.2, 3, 21), W = 132, y0 = 30, bc = 'var(--q' + (band == null ? 0 : band) + ')';
  const wave = (off, am, op) => { let p = 'M' + (-40 + off) + ' ' + y0; for (let k = 0; k < 8; k++) p += ' q' + 16 + ' ' + (-am) + ' ' + 32 + ' 0 t32 0'; return '<path d="' + p + ' V46 H' + (-40 + off) + 'Z" fill="' + bc + '" opacity="' + op + '"/>'; };
  return '<svg class="art" viewBox="0 0 ' + W + ' 46" preserveAspectRatio="none" aria-hidden="true"><rect width="' + W + '" height="46" fill="' + bc + '" opacity=".14"/>' + wave(20, a * .55, .35) + wave(0, a, .75) + '</svg>';
}

/* ---- the surf scene: sea on the left, beach on the right, waves travel left to right ---- */
function scenePhase(D) {
  if (!D || !D.daily || !D.daily.sunrise || !D.daily.sunrise[0]) return { ph: 'day', f: 0.4, moon: 0 };
  const now = Date.now() / 1000, sr = epochOf(D.daily.sunrise[0], D.off), ss = epochOf(D.daily.sunset[0], D.off), night = 86400 - (ss - sr);
  let ph = 'day', f = (now - sr) / (ss - sr), moon = 0;
  if (now < sr || now > ss) { ph = 'night'; moon = now > ss ? (now - ss) / night : 1 - (sr - now) / night; f = clamp(moon, 0, 1); }
  if (Math.abs(now - sr) < 50 * 60) ph = 'dawn'; else if (Math.abs(now - ss) < 50 * 60) ph = 'dusk';
  return { ph, f: clamp(f, 0, 1), moon };
}
const SCENE_COL = {
  night: { sky: ['#0A1330', '#1C2C63', '#3B4C94'], far: '#1B3567', mid: '#234880', near: '#2E5B9A', sand: '#4A4F7A', cloud: '#7F8BC0', ink: '#0A1330', foam: '#CFE0FF' },
  dawn: { sky: ['#6F8FF0', '#FFB89A', '#FFE7A8'], far: '#69B4D4', mid: '#3E9FC4', near: '#1F86B0', sand: '#F6D9A8', cloud: '#FFF0E6', ink: '#12315A', foam: '#FFFFFF' },
  day: { sky: ['#43AEF0', '#8ED3F6', '#CDEEFB'], far: '#4DBAD6', mid: '#25A1C6', near: '#0F88B2', sand: '#F7E4AF', cloud: '#FFFFFF', ink: '#0C2D48', foam: '#FFFFFF' },
  dusk: { sky: ['#4E4390', '#E4627F', '#FFB36B'], far: '#4A6FB0', mid: '#385E9E', near: '#2A4E8C', sand: '#E8C39A', cloud: '#FFD6CC', ink: '#2A1B4E', foam: '#FFE8E0' }
};
function sceneSvg(D, spot) {
  const P = scenePhase(D), C = SCENE_COL[P.ph], night = P.ph === 'night';
  let H = 0.5, T = 9, wsp = 8, cloud = 20, c = -0.5, band = 1, score = null, tideN = 0, ok = false, i = 0, v = null;
  const labels = { swell: '', wind: '', tide: '' };
  if (D) {
    i = hourIndexNow(D.H, D.off); v = valAt(D.H, i); ok = !!D.marineOk;
    if (ok) { H = v.sH != null ? v.sH : (v.wH != null ? v.wH : 0.3); T = v.sT != null ? v.sT : (v.wT != null ? v.wT : 8); }
    else { H = 0.25; T = 6; }
    const cur = D.current || {};
    wsp = cur.wind_speed_10m != null ? cur.wind_speed_10m : (v.wsp || 0);
    const wdir = cur.wind_direction_10m != null ? cur.wind_direction_10m : v.wdir;
    c = windRel(wsp, wdir, spot.face).c; cloud = cur.cloud_cover != null ? cur.cloud_cover : (v.cloud || 0);
    const r = ok ? scoresOf(D, spot)[i] : null; if (r) { score = r.score; band = r.band; }
    const th = ok ? tideHourly(D) : null;
    if (th && th[i] != null) { const seg = th.slice(i, i + 26).filter(x => x != null); const lo = Math.min(...seg), hi = Math.max(...seg); if (hi - lo > 1e-6) tideN = clamp((th[i] - (hi + lo) / 2) / ((hi - lo) / 2), -1, 1); labels.tide = L(th[i]) + ' ' + lu(); }
    if (ok) labels.swell = L(H) + ' ' + lu() + ' · ' + f0(T) + ' s'; labels.wind = SP(wsp) + ' ' + su();
  }
  const base = 122 - tideN * 7, amp = clamp(1.8 + H * 3.2, 2, 14), WL = clamp(46 + T * 8, 84, 210), dur = clamp(30 - T, 9, 24);
  const wave = (off, a, y, fill, cls) => { let p = 'M' + (-900 + off) + ' ' + y; const n = Math.ceil(2200 / WL) + 2; for (let k = 0; k < n; k++) p += ' q' + (WL / 4) + ' ' + (-a * 2) + ' ' + (WL / 2) + ' 0 t' + (WL / 2) + ' 0'; return '<path class="sw ' + (cls || '') + '" style="--wl:' + WL + 'px;--dur:' + dur + 's" d="' + p + ' V260 H' + (-900 + off) + 'Z" fill="' + fill + '"/>'; };
  let s = '<svg class="scene" data-ph="' + P.ph + '" viewBox="0 0 400 210" preserveAspectRatio="xMidYMax meet" role="group" aria-label="Illustration of the conditions right now. Tap parts of it for details.">';
  s += '<defs><linearGradient id="scSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.sky[0] + '"/><stop offset=".55" stop-color="' + C.sky[1] + '"/><stop offset="1" stop-color="' + C.sky[2] + '"/></linearGradient>' +
    '<radialGradient id="scGlow"><stop offset="0" stop-color="#FFE27A" stop-opacity=".95"/><stop offset="1" stop-color="#FFE27A" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="scFace" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + C.mid + '"/><stop offset="1" stop-color="' + C.near + '"/></linearGradient></defs>';
  s += '<rect x="-900" y="-200" width="2200" height="520" fill="url(#scSky)"/>';
  if (night) for (let k = 0; k < 16; k++) s += '<circle class="tw" style="animation-delay:' + (k % 5) * .4 + 's" cx="' + (-60 + (k * 67) % 520) + '" cy="' + (14 + (k * 37) % 70) + '" r="' + (k % 3 ? 1 : 1.6) + '" fill="#fff" opacity=".85"/>';
  /* sun or moon on its real arc */
  const sx = 46 + P.f * 300, sy = 112 - Math.sin(P.f * Math.PI) * 56;
  if (night) {
    const mo = moonInfo(Date.now()), sh = (1 - mo.illum) * 15 * (mo.name.indexOf('Wan') === 0 || mo.name === 'Last quarter' ? 1 : -1);
    s += '<g data-tile="moon" tabindex="0" role="button" aria-label="Moon: show details"><circle cx="' + sx + '" cy="' + sy + '" r="26" fill="url(#scGlow)" opacity=".35"/><mask id="scMoon"><rect x="' + (sx - 20) + '" y="' + (sy - 20) + '" width="40" height="40" fill="#000"/><circle cx="' + sx + '" cy="' + sy + '" r="12" fill="#fff"/><circle cx="' + (sx + sh * 1.2) + '" cy="' + sy + '" r="12" fill="#000" opacity="' + (mo.illum > .97 ? 0 : 1) + '"/></mask><circle cx="' + sx + '" cy="' + sy + '" r="12" fill="#F4F1DE" mask="url(#scMoon)"/><circle cx="' + sx + '" cy="' + sy + '" r="14" fill="none" stroke="#F4F1DE" stroke-opacity=".25"/></g>';
  } else {
    s += '<g data-tile="sun" tabindex="0" role="button" aria-label="Sunrise and sunset: show details"><circle cx="' + sx + '" cy="' + sy + '" r="40" fill="url(#scGlow)"/><circle cx="' + sx + '" cy="' + sy + '" r="14" fill="#FFD23F"/><circle cx="' + sx + '" cy="' + sy + '" r="14" fill="none" stroke="#FFF2B0" stroke-width="3" opacity=".7"/></g>';
  }
  /* clouds: more of them as the sky fills */
  const nc = Math.round(clamp(cloud, 0, 100) / 100 * 4), cs = [[70, 54, 1], [250, 40, .9], [330, 78, .75], [150, 82, .8]];
  if (nc) { s += '<g data-tile="sky" tabindex="0" role="button" aria-label="Sky and sun: show details" opacity="' + (night ? .75 : .96) + '">'; cs.slice(0, nc).forEach((q, k) => { s += '<g class="cl"><g transform="translate(' + q[0] + ' ' + q[1] + ') scale(' + q[2] + ')" fill="' + C.cloud + '"><ellipse cx="0" cy="6" rx="26" ry="8"/><circle cx="-8" cy="0" r="9"/><circle cx="6" cy="-4" r="12"/><circle cx="17" cy="2" r="8"/></g></g>'; }); s += '</g>'; }
  /* far sea, mid sea, then the breaking wave */
  s += '<g' + (ok ? ' data-tile="swell1" tabindex="0" role="button" aria-label="Primary swell: show details"' : '') + '>';
  s += wave(0, amp * .5, base - 4, C.far, 'b') + wave(WL * .3, amp * .75, base + 2, C.mid);
  const h = clamp(8 + H * 22, 9, 66), w = 30 + h * 1.05, x0 = 196 - w * .1, B = base + 12;
  s += '<g transform="translate(0 0)"><path d="M' + x0 + ' ' + B + 'C' + (x0 + .3 * w) + ' ' + B + ' ' + (x0 + .42 * w) + ' ' + (B - .95 * h) + ' ' + (x0 + .62 * w) + ' ' + (B - h) + 'C' + (x0 + .82 * w) + ' ' + (B - 1.04 * h) + ' ' + (x0 + .97 * w) + ' ' + (B - .82 * h) + ' ' + (x0 + .93 * w) + ' ' + (B - .54 * h) + 'C' + (x0 + .87 * w) + ' ' + (B - .72 * h) + ' ' + (x0 + .74 * w) + ' ' + (B - .75 * h) + ' ' + (x0 + .67 * w) + ' ' + (B - .6 * h) + 'C' + (x0 + .6 * w) + ' ' + (B - .42 * h) + ' ' + (x0 + .66 * w) + ' ' + (B - .16 * h) + ' ' + (x0 + .8 * w) + ' ' + B + 'Z" fill="url(#scFace)"/>' +
    '<path d="M' + (x0 + .62 * w) + ' ' + (B - h) + 'C' + (x0 + .82 * w) + ' ' + (B - 1.04 * h) + ' ' + (x0 + .97 * w) + ' ' + (B - .82 * h) + ' ' + (x0 + .93 * w) + ' ' + (B - .54 * h) + '" fill="none" stroke="' + C.foam + '" stroke-width="3.200" stroke-linecap="round"/>' +
    '<g fill="' + C.foam + '" opacity=".9"><circle cx="' + (x0 + .96 * w) + '" cy="' + (B - .46 * h) + '" r="2.600"/><circle cx="' + (x0 + .86 * w) + '" cy="' + (B - .3 * h) + '" r="2"/><circle cx="' + (x0 + .99 * w) + '" cy="' + (B - .3 * h) + '" r="1.600"/></g></g>';
  s += wave(WL * .6, amp, base + 12, C.near, '');
  s += '<path d="M' + (x0 + w * .78) + ' ' + (B + 1) + 'q10 -5 20 -1t22 1" fill="none" stroke="' + C.foam + '" stroke-width="3" stroke-linecap="round" opacity=".85"/>';
  if (ok && score != null && score >= 45) { const sx2 = x0 + .36 * w, sy2 = B - .42 * h; s += '<g transform="translate(' + sx2.toFixed(1) + ' ' + sy2.toFixed(1) + ') rotate(-22)"><ellipse cx="0" cy="3" rx="10" ry="2.200" fill="#FFB02E"/><path d="M-1 1l2-9" stroke="' + C.ink + '" stroke-width="3" stroke-linecap="round"/><circle cx="1.600" cy="-12" r="2.800" fill="' + C.ink + '"/><path d="M0 -6l-6 -1M1 -6l6 -3" stroke="' + C.ink + '" stroke-width="2" stroke-linecap="round"/></g>'; }
  if (labels.swell) s += '<g><rect x="' + (x0 - 6) + '" y="' + (B - h - 30) + '" rx="10" width="' + (labels.swell.length * 6.2 + 22) + '" height="20" fill="#fff" opacity=".92"/><text x="' + (x0 + 3) + '" y="' + (B - h - 16) + '" font-size="11" fill="#0C2D48">' + esc(labels.swell) + ' ›</text></g>';
  s += '</g>';
  /* tide staff */
  s += '<g data-tile="tide" tabindex="0" role="button" aria-label="Tide: show details"><g class="bob"><rect x="48" y="' + (base - 36) + '" width="7" height="56" rx="2" fill="#fff" opacity=".95"/>' + [0, 1, 2, 3].map(k => '<rect x="48" y="' + (base - 36 + k * 14 + 3) + '" width="7" height="7" fill="#E5412F"/>').join('') + '<rect x="46" y="' + (base - 39) + '" width="11" height="4" rx="2" fill="' + C.ink + '"/></g>' + (labels.tide ? '<rect x="62" y="' + (base - 48) + '" rx="10" width="' + (labels.tide.length * 6.3 + 22) + '" height="20" fill="#fff" opacity=".92"/><text x="71" y="' + (base - 34) + '" font-size="11" fill="#0C2D48">' + esc(labels.tide) + ' ›</text>' : '') + '</g>';
  /* beach */
  s += '<path d="M1300 260V' + (base - 4) + 'H356Q316 ' + (base - 2) + ' 296 ' + (base + 26) + 'Q276 ' + (base + 54) + ' 252 260Z" fill="' + C.sand + '"/>';
  s += '<path d="M252 260Q276 ' + (base + 54) + ' 296 ' + (base + 26) + 'Q316 ' + (base - 2) + ' 356 ' + (base - 4) + '" fill="none" stroke="' + C.foam + '" stroke-width="3" opacity=".7"/>';
  s += '<path d="M330 ' + (base + 40) + 'q20 -6 50 -2M290 ' + (base + 58) + 'q30 -8 60 -3" stroke="#000" stroke-opacity=".07" stroke-width="2" fill="none" stroke-linecap="round"/>';
  /* windsock on the beach, streaming toward the land when wind is onshore */
  if (D) {
    const px = 352, py = base - 4, top = py - 42, dirn = c >= 0 ? 1 : -1, len = 16 + clamp(wsp * 0.621, 0, 30) * 0.95, tilt = clamp(70 - wsp * 0.621 * 3.2, 0, 70);
    s += '<g data-tile="wind" tabindex="0" role="button" aria-label="Wind: show details"><rect x="' + (px - 1.500) + '" y="' + top + '" width="3" height="42" rx="1.500" fill="' + C.ink + '" opacity=".75"/><circle cx="' + px + '" cy="' + top + '" r="3.200" fill="' + C.ink + '"/>' +
      '<g transform="translate(' + px + ' ' + top + ') scale(' + dirn + ' 1) rotate(' + tilt.toFixed(0) + ')"><g class="sock"><path d="M0 -5.500L' + len.toFixed(1) + ' -2.600V2.600L0 5.500Z" fill="#FF8A3D"/><path d="M' + (len * .3).toFixed(1) + ' -4.500V4.500M' + (len * .62).toFixed(1) + ' -3.500V3.500" stroke="#fff" stroke-width="3.400"/></g></g>' +
      '<rect x="' + (px - 36) + '" y="' + (top - 26) + '" rx="10" width="' + (labels.wind.length * 6.3 + 22) + '" height="20" fill="#fff" opacity=".92"/><text x="' + (px - 27) + '" y="' + (top - 12) + '" font-size="11" fill="#0C2D48">' + esc(labels.wind) + ' ›</text></g>';
  }
  return s + '</svg>';
}

/* ============================================================
   WAVE SPECTRUM: energy by wave period from a buoy, and how it changed over the last day
   ============================================================ */
const SPEC_F0 = 0.04, SPEC_F1 = 0.30;
function specStats(freqs, e) {
  let m0 = 0, best = -1, bi = -1;
  for (let i = 0; i < freqs.length; i++) {
    if (e[i] == null) continue;
    const df = i === 0 ? freqs[1] - freqs[0] : i === freqs.length - 1 ? freqs[i] - freqs[i - 1] : (freqs[i + 1] - freqs[i - 1]) / 2;
    m0 += e[i] * df; if (freqs[i] >= SPEC_F0 && e[i] > best) { best = e[i]; bi = i; }
  }
  return { hs: 4 * Math.sqrt(Math.max(0, m0)), peakI: bi, tp: bi >= 0 ? 1 / freqs[bi] : null };
}
function spectrumSvg(sp) {
  const fr = sp.freqs, e = sp.latest.e, W = 320, H = 156, m = { l: 8, r: 8, t: 16, b: 24 }, pw = W - m.l - m.r, ph = H - m.t - m.b;
  const idx = fr.map((f, i) => i).filter(i => fr[i] >= SPEC_F0 && fr[i] <= SPEC_F1 && e[i] != null);
  if (idx.length < 4) return '';
  const X = f => m.l + (f - SPEC_F0) / (SPEC_F1 - SPEC_F0) * pw, mx = Math.max(...idx.map(i => e[i]), 0.01), Y = v => m.t + ph - v / mx * ph, st = specStats(fr, e);
  let g = '';
  [[SPEC_F0, 1 / 13, 'long-period swell', 1], [1 / 13, 1 / 9, 'mid-period', 2], [1 / 9, SPEC_F1, 'wind swell', 3]].forEach(b => {
    g += '<rect x="' + X(b[0]).toFixed(1) + '" y="' + m.t + '" width="' + (X(b[1]) - X(b[0])).toFixed(1) + '" height="' + ph + '" fill="var(--s' + b[3] + ')" opacity=".08"/><text x="' + ((X(b[0]) + X(b[1])) / 2).toFixed(1) + '" y="' + (m.t - 4) + '" text-anchor="middle" font-size="9" font-family="var(--f-mono)" fill="var(--ink-3)">' + b[2] + '</text>';
  });
  [4, 6, 8, 10, 12, 16, 20, 25].forEach(pd => { const f = 1 / pd; if (f < SPEC_F0 || f > SPEC_F1) return; g += '<line x1="' + X(f).toFixed(1) + '" x2="' + X(f).toFixed(1) + '" y1="' + (m.t + ph) + '" y2="' + (m.t + ph + 3) + '" stroke="var(--ink-3)"/><text x="' + X(f).toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + pd + ' s</text>'; });
  let d = '', first = null, last = null;
  idx.forEach((i, k) => { d += (k ? 'L' : 'M') + X(fr[i]).toFixed(1) + ' ' + Y(e[i]).toFixed(1); if (first == null) first = i; last = i; });
  g += '<path d="' + d + 'L' + X(fr[last]).toFixed(1) + ' ' + (m.t + ph) + 'L' + X(fr[first]).toFixed(1) + ' ' + (m.t + ph) + 'Z" fill="var(--s1)" fill-opacity=".22"/><path d="' + d + '" fill="none" stroke="var(--s1)" stroke-width="2.2" stroke-linejoin="round"/>';
  g += '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + (m.t + ph) + '" y2="' + (m.t + ph) + '" stroke="var(--line)"/>';
  if (st.peakI >= 0) { const px = X(fr[st.peakI]), py = Y(e[st.peakI]); g += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="' + clamp(px, 26, W - 26).toFixed(1) + '" y="' + Math.max(m.t + 10, py - 8).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" font-family="var(--f-mono)" fill="var(--ink)">' + f1(st.tp) + ' s</text>'; }
  return '<svg class="specsvg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Wave energy by period. The biggest energy is at ' + (st.tp ? f1(st.tp) + ' seconds' : 'an unknown period') + '. Longer periods are to the left.">' + g + '</svg>';
}
function spectrogramSvg(sp) {
  const fr = sp.freqs, Hh = sp.history, idx = fr.map((f, i) => i).filter(i => fr[i] >= SPEC_F0 && fr[i] <= SPEC_F1), nT = Hh.t.length;
  if (nT < 3 || idx.length < 4) return '';
  const W = 320, Ht = 176, m = { l: 34, r: 6, t: 8, b: 20 }, pw = W - m.l - m.r, ph = Ht - m.t - m.b, cw = pw / nT, rh = ph / idx.length;
  let mx = 0.01; Hh.e.forEach(row => idx.forEach(i => { if (row[i] != null && row[i] > mx) mx = row[i]; }));
  let g = '';
  Hh.e.forEach((row, k) => idx.forEach((i, r) => {
    const v = row[i]; if (v == null || v <= 0) return; const a = Math.min(1, Math.sqrt(v / mx)); if (a < 0.05) return;
    g += '<rect x="' + (m.l + k * cw).toFixed(1) + '" y="' + (m.t + r * rh).toFixed(1) + '" width="' + (cw + 0.4).toFixed(1) + '" height="' + (rh + 0.4).toFixed(1) + '" fill="var(--s1)" fill-opacity="' + a.toFixed(2) + '"/>';
  }));
  [8, 10, 12, 16, 20].forEach(pd => { const r = idx.findIndex(i => fr[i] >= 1 / pd); if (r < 0) return; const y = m.t + r * rh; g += '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="var(--line)" stroke-dasharray="2 4"/><text x="' + (m.l - 4) + '" y="' + (y + 3.5).toFixed(1) + '" text-anchor="end" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + pd + ' s</text>'; });
  const hrs = Math.max(1, Math.round((Hh.t[nT - 1] - Hh.t[0]) / 3600));
  g += '<text x="' + m.l + '" y="' + (Ht - 5) + '" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">' + hrs + ' h ago</text><text x="' + (W - m.r) + '" y="' + (Ht - 5) + '" text-anchor="end" font-size="10" font-family="var(--f-mono)" fill="var(--ink-2)">now</text>';
  return '<svg class="specsvg" viewBox="0 0 ' + W + ' ' + Ht + '" role="img" aria-label="Wave energy by period over the last ' + hrs + ' hours. Darker means more energy. Long-period energy that appears first and slides to shorter periods over several hours is a new swell arriving.">' + g + '</svg>';
}
function spectraHtml(sp) {
  const st = specStats(sp.freqs, sp.latest.e), dir = st.peakI >= 0 && sp.latest.dir ? (sp.latest.dir[st.peakI] <= 360 ? sp.latest.dir[st.peakI] : null) : null, a = spectrumSvg(sp), b = spectrogramSvg(sp);
  if (!a && !b) return '<p class="bnote">This station reports no usable spectrum right now.</p>';
  return '<h3 class="spec-h">Swell spectrum <small>what the ocean is made of at this buoy</small></h3><div class="spec-wrap">' +
    (a ? '<div class="card spec-card"><div class="k"><span>Energy by wave period</span></div>' + a + '<div class="s">Biggest energy at <b>' + (st.tp ? f1(st.tp) + ' s' : '–') + '</b>' + (dir != null ? ' from <b>' + dirName(dir) + ' ' + dir + '°</b>' : '') + ', about ' + f1(cvLen(st.hs, S.units)) + ' ' + lu() + ' in total.<br>Tall peaks to the left are long-period groundswell. Peaks to the right are local wind chop.</div></div>' : '') +
    (b ? '<div class="card spec-card"><div class="k"><span>Last 24 hours</span></div>' + b + '<div class="s">Darker means more energy. A band that appears at long periods and slides toward shorter ones over several hours is a new swell arriving.</div></div>' : '') + specRoseHtml(sp) + '</div>';
}

/* ============================================================
   Radial graphs (0.1.26): radar polygons, ring gauges, polar-area roses, 24-hour dials.
   They sit next to the existing charts and tables; every value is printed on the graph in the chosen units.
   ============================================================ */
const RG_COL = ['#2a9d8f', '#e67e22', '#8e44ad', '#2980b9', '#c0392b'];
const rgPt = (cx, cy, r, deg) => { const a = deg * Math.PI / 180; return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; };
const rgN = n => String(Math.round(n * 10) / 10);
const rgT = (x, y, s, o) => { o = o || {}; return '<text x="' + rgN(x) + '" y="' + rgN(y) + '" text-anchor="' + (o.a || 'middle') + '" dominant-baseline="central" font-family="var(--f-mono)" font-size="' + (o.s || 10) + '" font-weight="' + (o.w || 500) + '" fill="' + (o.c || 'var(--ink)') + '"' + (o.halo ? ' stroke="var(--surface)" stroke-width="3" stroke-linejoin="round" paint-order="stroke"' : '') + '>' + esc(String(s)) + '</text>'; };
const rgAnch = (x, cx) => (x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle');
const rgCut = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
const rgSvg = (w, h, aria, body) => '<svg class="rgsvg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(aria) + '">' + body + '</svg>';

/* radar polygon: spokes = [{ name, f (0..1 of the outer ring), text, ref (0..1, optional dashed polygon), c (colour of the dot and value) }] */
function radarSvg(sp, o) {
  o = o || {};
  const n = sp.length; if (n < 3) return '';
  const W = 380, H = 300, cx = W / 2, cy = 152, R = o.r || 82, col = o.color || 'var(--brand)', compact = n > 8, ang = i => i * 360 / n;
  const ring = f => sp.map((_, i) => rgPt(cx, cy, R * f, ang(i)).map(rgN).join(',')).join(' ');
  let g = '';
  [0.25, 0.5, 0.75, 1].forEach(f => { g += '<polygon points="' + ring(f) + '" fill="' + (f === 1 ? 'var(--surface)' : 'none') + '" stroke="var(--line)" stroke-width="' + (f === 1 ? 1.4 : 1) + '"' + (f < 1 ? ' stroke-dasharray="2 3"' : '') + '/>'; });
  sp.forEach((s, i) => { const p = rgPt(cx, cy, R, ang(i)); g += '<line x1="' + cx + '" y1="' + cy + '" x2="' + rgN(p[0]) + '" y2="' + rgN(p[1]) + '" stroke="var(--line)" stroke-width="1"/>'; });
  if (sp.some(s => s.ref != null)) g += '<polygon points="' + sp.map((s, i) => rgPt(cx, cy, R * Math.max(0, Math.min(1, s.ref == null ? 0 : s.ref)), ang(i)).map(rgN).join(',')).join(' ') + '" fill="none" stroke="var(--ink-3)" stroke-width="1.5" stroke-dasharray="4 3"/>';
  const pts = sp.map((s, i) => rgPt(cx, cy, R * Math.max(0.02, Math.min(1, s.f || 0)), ang(i)));
  g += '<polygon points="' + pts.map(p => p.map(rgN).join(',')).join(' ') + '" fill="' + col + '" fill-opacity=".22" stroke="' + col + '" stroke-width="2.2" stroke-linejoin="round"/>';
  pts.forEach((p, i) => { g += '<circle cx="' + rgN(p[0]) + '" cy="' + rgN(p[1]) + '" r="3.6" fill="' + (sp[i].c || col) + '" stroke="var(--surface)" stroke-width="1.5"/>'; });
  sp.forEach((s, i) => {
    const p = rgPt(cx, cy, R + (compact ? 14 : 20), ang(i)), a = rgAnch(p[0], cx);
    if (compact) g += rgT(p[0], p[1], rgCut(s.name, 8) + ' ' + s.text, { a, s: 9, w: 600 });
    else {
      g += rgT(p[0], p[1] - 6, rgCut(s.name, 14), { a, s: 9.5, c: 'var(--ink-3)' });
      g += rgT(p[0], p[1] + 6, s.text, { a, s: 11, w: 700, c: s.tc || 'var(--ink)' });
    }
  });
  return rgSvg(W, H, (o.aria || 'Radar chart') + ': ' + sp.map(s => s.name + ' ' + s.text).join(', '), g);
}

/* ring gauge: f 0..1, value text in the middle, unit under it, label and sub-label under the ring */
function ringSvg(f, o) {
  o = o || {};
  const cx = 52, cy = 50, r = 38, col = o.color || 'var(--brand)', ff = Math.max(0, Math.min(1, f || 0));
  let g = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="9"/>';
  for (let k = 0; k < 4; k++) { const a = rgPt(cx, cy, r - 7, k * 90), b = rgPt(cx, cy, r + 7, k * 90); g += '<line x1="' + rgN(a[0]) + '" y1="' + rgN(a[1]) + '" x2="' + rgN(b[0]) + '" y2="' + rgN(b[1]) + '" stroke="var(--surface)" stroke-width="1.2"/>'; }
  if (ff >= 0.999) g += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="9"/>';
  else if (ff > 0.004) { const e = rgPt(cx, cy, r, ff * 360); g += '<path d="M' + cx + ' ' + (cy - r) + 'A' + r + ' ' + r + ' 0 ' + (ff > 0.5 ? 1 : 0) + ' 1 ' + rgN(e[0]) + ' ' + rgN(e[1]) + '" fill="none" stroke="' + col + '" stroke-width="9" stroke-linecap="round"/>'; }
  const v = String(o.value == null ? '–' : o.value);
  g += rgT(cx, cy - 4, v, { s: v.length > 5 ? 14 : v.length > 3 ? 17 : 21, w: 800 });
  g += rgT(cx, cy + 13, o.unit || '', { s: 9, c: 'var(--ink-3)' });
  g += rgT(cx, 104, o.label || '', { s: 10.5, w: 700, c: 'var(--ink-2)' });
  if (o.sub) g += rgT(cx, 117, o.sub, { s: 9, c: 'var(--ink-3)' });
  return rgSvg(104, o.sub ? 124 : 112, (o.label || 'Gauge') + ' ' + v + ' ' + (o.unit || '') + (o.sub ? ', ' + o.sub : ''), g);
}

/* polar-area rose: items = [{ deg, v, text, color, w }]; area is proportional to v. o = { max, fmt, center, aria } */
function roseSvg(items, o) {
  o = o || {};
  const W = 340, H = 304, cx = W / 2, cy = 152, R = 76, n = o.n || 16, wd = 360 / n, max = o.max || Math.max.apply(null, items.map(x => x.v).concat([1e-9]));
  const rad_ = v => R * Math.sqrt(Math.max(0, v) / max);
  let g = '';
  [0.25, 0.5, 1].forEach(f => { g += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rgN(rad_(max * f)) + '" fill="' + (f === 1 ? 'var(--surface)' : 'none') + '" stroke="var(--line)" stroke-width="1"' + (f < 1 ? ' stroke-dasharray="2 3"' : '') + '/>'; });
  for (let a = 0; a < 360; a += 45) { const p = rgPt(cx, cy, R, a); g += '<line x1="' + cx + '" y1="' + cy + '" x2="' + rgN(p[0]) + '" y2="' + rgN(p[1]) + '" stroke="var(--line)" stroke-width="1"/>'; }
  items.forEach(it => {
    if (!(it.v > 0)) return;
    const r = Math.max(3, rad_(it.v)), w = it.w || wd, a0 = it.deg - w / 2, a1 = it.deg + w / 2, p0 = rgPt(cx, cy, r, a0), p1 = rgPt(cx, cy, r, a1);
    g += '<path d="M' + cx + ' ' + cy + 'L' + rgN(p0[0]) + ' ' + rgN(p0[1]) + 'A' + rgN(r) + ' ' + rgN(r) + ' 0 0 1 ' + rgN(p1[0]) + ' ' + rgN(p1[1]) + 'Z" fill="' + it.color + '" fill-opacity=".8" stroke="var(--surface)" stroke-width="1"/>';
  });
  if (o.fmt) [0.5, 1].forEach(f => { g += rgT(cx + 3, cy - rad_(max * f) + (f === 1 ? 7 : 6), o.fmt(max * f), { a: 'start', s: 8, c: 'var(--ink-3)', halo: true }); });
  [['N', 0], ['NE', 45], ['E', 90], ['SE', 135], ['S', 180], ['SW', 225], ['W', 270], ['NW', 315]].forEach(c => {
    const card = c[1] % 90 === 0, p = rgPt(cx, cy, R + (card ? 20 : 17), c[1]);
    g += rgT(p[0], p[1], c[0], { s: card ? 12 : 8.5, w: card ? 700 : 500, c: c[0] === 'N' ? 'var(--accent)' : card ? 'var(--ink)' : 'var(--ink-3)' });
  });
  const top = items.filter(x => x.v > 0 && x.text && x.v / max >= (o.minLabel == null ? 0.18 : o.minLabel)).sort((p, q) => q.v - p.v).slice(0, o.maxLabels || 7);
  top.forEach(it => { const r = Math.max(3, rad_(it.v)), p = rgPt(cx, cy, r + 7, it.deg); g += rgT(p[0], p[1], it.text, { a: rgAnch(p[0], cx), s: 9, w: 700, halo: true }); });
  if (o.center) g += rgT(cx, cy, o.center, { s: 8.5, c: 'var(--ink-3)', halo: true });
  return rgSvg(W, H, (o.aria || 'Rose chart'), g);
}

/* 24-hour dial: hours = 24 x { f (0..1), color, text, label }. Midnight at the top, clockwise. o = { center: [big, small], sun: [riseHour, setHour], best: index, aria } */
function dialSvg(hours, o) {
  o = o || {};
  const W = 340, H = 304, cx = W / 2, cy = 152, Ri = 28, Ro = 80;
  let g = '';
  [0.5, 1].forEach(f => { g += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (Ri + (Ro - Ri) * f) + '" fill="' + (f === 1 ? 'var(--surface)' : 'none') + '" stroke="var(--line)" stroke-width="1"' + (f < 1 ? ' stroke-dasharray="2 3"' : '') + '/>'; });
  hours.forEach((h, k) => {
    const a0 = k * 15 + 0.6, a1 = (k + 1) * 15 - 0.6, f = h && h.f != null ? Math.max(0.03, Math.min(1, h.f)) : 0.03, r = Ri + (Ro - Ri) * f, p0 = rgPt(cx, cy, r, a0), p1 = rgPt(cx, cy, r, a1), q0 = rgPt(cx, cy, Ri, a0), q1 = rgPt(cx, cy, Ri, a1);
    g += '<path d="M' + rgN(q0[0]) + ' ' + rgN(q0[1]) + 'L' + rgN(p0[0]) + ' ' + rgN(p0[1]) + 'A' + rgN(r) + ' ' + rgN(r) + ' 0 0 1 ' + rgN(p1[0]) + ' ' + rgN(p1[1]) + 'L' + rgN(q1[0]) + ' ' + rgN(q1[1]) + 'A' + Ri + ' ' + Ri + ' 0 0 0 ' + rgN(q0[0]) + ' ' + rgN(q0[1]) + 'Z" fill="' + (h && h.color ? h.color : 'var(--line)') + '"' + (h && h.color ? '' : ' fill-opacity=".6"') + (k === o.best ? ' stroke="var(--ink)" stroke-width="1.6"' : ' stroke="var(--surface)" stroke-width=".6"') + '/>';
  });
  if (o.sun && o.sun[0] != null && o.sun[1] != null && o.sun[1] > o.sun[0]) { const a = rgPt(cx, cy, Ro + 14, o.sun[0] * 15), b = rgPt(cx, cy, Ro + 14, o.sun[1] * 15); g += '<path d="M' + rgN(a[0]) + ' ' + rgN(a[1]) + 'A' + (Ro + 14) + ' ' + (Ro + 14) + ' 0 ' + ((o.sun[1] - o.sun[0]) * 15 > 180 ? 1 : 0) + ' 1 ' + rgN(b[0]) + ' ' + rgN(b[1]) + '" fill="none" stroke="var(--h-sun)" stroke-width="4" stroke-linecap="round"/>'; }
  for (let k = 0; k < 24; k++) { const a = rgPt(cx, cy, Ro + 2, k * 15), b = rgPt(cx, cy, Ro + (k % 6 === 0 ? 7 : 4), k * 15); g += '<line x1="' + rgN(a[0]) + '" y1="' + rgN(a[1]) + '" x2="' + rgN(b[0]) + '" y2="' + rgN(b[1]) + '" stroke="var(--ink-3)" stroke-width="' + (k % 6 === 0 ? 1.4 : 0.8) + '"/>'; }
  [['12 AM', 0], ['6 AM', 90], ['12 PM', 180], ['6 PM', 270]].forEach(c => { const p = rgPt(cx, cy, Ro + 29, c[1]); g += rgT(p[0], p[1], c[0], { s: 9.5, w: 700, c: 'var(--ink-2)' }); });
  hours.forEach((h, k) => {
    if (!h || h.text == null || !(k % 3 === 0 || k === o.best)) return;
    const f = Math.max(0.03, Math.min(1, h.f || 0)), p = rgPt(cx, cy, Ri + (Ro - Ri) * f + 7, k * 15 + 7.5);
    g += rgT(p[0], p[1], h.text, { a: 'middle', s: k === o.best ? 10 : 8.5, w: k === o.best ? 800 : 600, halo: true });
  });
  if (o.center) { g += rgT(cx, cy - 6, o.center[0], { s: 15, w: 800 }); g += rgT(cx, cy + 8, o.center[1] || '', { s: 8, c: 'var(--ink-3)' }); }
  return rgSvg(W, H, (o.aria || '24-hour dial') + ': ' + hours.map((h, k) => (k % 12 || 12) + (k < 12 ? ' AM ' : ' PM ') + (h && h.label != null ? h.label : '–')).join(', '), g);
}

const rgCard = (title, sub, svg, note) => '<figure class="chartbox rgcard"><figcaption class="rgh"><b>' + title + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</figcaption>' + svg + (note ? '<div class="rgn">' + note + '</div>' : '') + '</figure>';
const rgKey = list => '<div class="rgkey">' + list.map(x => '<span><i style="background:' + x[0] + '"></i>' + x[1] + '</span>').join('') + '</div>';
const rgBin16 = d => Math.round((((d % 360) + 360) % 360) / 22.5) % 16;
const rgPerCol = t => (t >= 12 ? '#1f6fb2' : t >= 8 ? '#2a9d8f' : '#e67e22');
const rgWindCol = k => (k >= 25 ? '#c0392b' : k >= 12 ? '#e6a700' : '#2a9d8f');
const rgPerKey = () => rgKey([['#1f6fb2', 'long swell, 12 s or more'], ['#2a9d8f', 'mid period, 8 to 12 s'], ['#e67e22', 'short and choppy, under 8 s']]);
const rgTopDirs = (bins, tot, name) => bins.map((v, k) => ({ v, k })).filter(x => x.v > 0).sort((a, b) => b.v - a.v).slice(0, 3).map(x => name(x.k * 22.5) + ' ' + Math.round(100 * x.v / tot) + '%').join(', ');

/* direction rose of the swell energy a buoy spectrum is made of */
function specRoseHtml(sp) {
  try {
    const f = sp.freqs, e = sp.latest && sp.latest.e, dr = sp.latest && sp.latest.dir; if (!f || !e || !dr) return '';
    const bins = new Array(16).fill(0), tsum = new Array(16).fill(0); let tot = 0;
    for (let i = 0; i < f.length; i++) {
      if (e[i] == null || dr[i] == null || dr[i] > 360 || f[i] < SPEC_F0) continue;
      const df = i === 0 ? f[1] - f[0] : i === f.length - 1 ? f[i] - f[i - 1] : (f[i + 1] - f[i - 1]) / 2, w = e[i] * df, b = rgBin16(dr[i]);
      bins[b] += w; tsum[b] += w / f[i]; tot += w;
    }
    if (!(tot > 0)) return '';
    const items = bins.map((v, k) => v > 0 ? { deg: k * 22.5, v, text: Math.round(100 * v / tot) + '%', color: rgPerCol(tsum[k] / v) } : null).filter(Boolean);
    return rgCard('Where the energy comes from', 'share of swell energy by direction at this buoy', roseSvg(items, { max: Math.max.apply(null, bins), fmt: v => Math.round(100 * v / tot) + '%', aria: 'Swell energy by direction: ' + rgTopDirs(bins, tot, dirName) }), 'Most energy from <b>' + rgTopDirs(bins, tot, dirName) + '</b>.' + rgPerKey().replace('class="rgkey"', 'class="rgkey" style="padding:6px 0 0"'));
  } catch (err) { return ''; }
}

/* nearest buoys on one rose: each wedge points where that buoy's swell comes from, its size is the wave height */
function buoyRoseHtml(rows, spot) {
  try {
    const ok = rows.filter(r => r.ok && r.dir && r.wv && r.dir.v != null && r.wv.v > 0);
    if (ok.length < 2) return '';
    const max = Math.max.apply(null, ok.map(r => r.wv.v));
    const items = ok.map((r, k) => ({ deg: r.dir.v, v: r.wv.v, w: 24, color: RG_COL[k % 5], text: L(r.wv.v) + ' ' + lu() }));
    const key = ok.map((r, k) => [RG_COL[k % 5], '<b>' + esc(r.s.id.toUpperCase()) + '</b> ' + L(r.wv.v) + ' ' + lu() + (r.per ? ' at ' + f0(r.per.v) + ' s' : '') + ' from ' + dirName(r.dir.v)]);
    return rgCard('Buoy swell directions', 'wedge points where the swell comes from, size is wave height', roseSvg(items, { max, n: 16, fmt: v => L(v) + ' ' + lu(), minLabel: 0, maxLabels: 5, aria: 'Buoy swell directions: ' + ok.map(r => r.s.id + ' ' + L(r.wv.v) + ' ' + lu() + ' from ' + dirName(r.dir.v)).join(', ') }), rgKey(key));
  } catch (err) { return ''; }
}

/* Why this score: five spokes, outer ring is full marks */
function scoreRadarHtml(r) {
  try {
    const p = r.parts, wmax = 30 * WIND_SHARE, c = 'var(--q' + r.band + ')';
    const sp = [
      { name: 'Swell period', f: p.period / 35, text: Math.round(p.period) + '/35' },
      { name: 'Wave size', f: p.size / 25, text: Math.round(p.size) + '/25' },
      { name: 'Wind', f: p.wind / wmax, text: Math.round(p.wind) + '/' + Math.round(wmax) },
      { name: 'Beach exposure', f: p.exposure, text: Math.round(p.exposure * 100) + '%' },
      { name: 'Calm water', f: 1 - p.chop / 10, text: p.chop < 0.5 ? 'no chop' : '−' + Math.round(p.chop) + ' chop' }
    ];
    return rgCard('Score shape', 'the five things behind the score of ' + r.score + ', ' + BANDS[r.band].name, radarSvg(sp, { color: c, aria: 'Score ' + r.score + ' ' + BANDS[r.band].name }), 'The outer ring is full marks for each factor. A round, full shape is an all-round good day. A dent shows what is holding the score back.');
  } catch (err) { return ''; }
}

/* Right now: ring gauges */
function ringsHtml(D, spot, i, v, cur, e, r, td) {
  try {
    const out = [];
    if (r) out.push(ringSvg(r.score / 100, { color: 'var(--q' + r.band + ')', value: r.score, unit: 'of 100', label: 'Surf score', sub: BANDS[r.band].name }));
    if (e) out.push(ringSvg(Math.min(1, e.mid / 3), { color: 'var(--h-size)', value: rr(e.mid), unit: lu(), label: 'Surf size', sub: rr(e.lo) + '–' + rr(e.hi) + ' ' + lu() }));
    const pT = v.sT != null ? v.sT : v.wT;
    if (D.marineOk && pT != null) out.push(ringSvg(pT / 20, { color: 'var(--h-swell1)', value: f0(pT), unit: 'seconds', label: 'Swell period', sub: pT >= 12 ? 'long' : pT >= 8 ? 'mid' : 'short' }));
    const wsp = cur.wind_speed_10m != null ? cur.wind_speed_10m : v.wsp, wdir = cur.wind_direction_10m != null ? cur.wind_direction_10m : v.wdir;
    if (wsp != null) { const rel = windRel(wsp, wdir, spot.face); out.push(ringSvg(wsp / 50, { color: rel.kind === 'off' || rel.kind === 'light' ? 'var(--ok)' : rel.kind === 'cross' ? 'var(--warn)' : 'var(--bad)', value: SP(wsp), unit: su(), label: 'Wind', sub: rel.label + ' ' + dirName(wdir) })); }
    if (D.marineOk && v.sst != null) out.push(ringSvg(Math.max(0, v.sst) / 30, { color: 'var(--h-water)', value: TP(v.sst), unit: tu(), label: 'Water', sub: wetsuit(v.sst) ? rgCut(wetsuit(v.sst), 16) : '' }));
    if (td) {
      const a = D.H.tide.slice(i, i + 25).filter(x => x != null), lo = Math.min.apply(null, a), hi = Math.max.apply(null, a);
      if (hi > lo) out.push(ringSvg((td.h - lo) / (hi - lo), { color: 'var(--h-tide)', value: L(td.h), unit: lu(), label: 'Tide', sub: Math.round(100 * (td.h - lo) / (hi - lo)) + '% of today’s range' }));
    }
    return out.length ? '<div class="rings" role="group" aria-label="Right now as ring gauges">' + out.map(s => '<div class="rg">' + s + '</div>').join('') + '</div>' : '';
  } catch (err) { return ''; }
}

/* Next days: one spoke per day, length is the best 3-hour window score */
function dayRadarHtml(D, spot) {
  try {
    const sc = scoresOf(D, spot), n = Math.min(D.daily.time.length, Math.max(3, S.range), 14), sp = [];
    let sum = 0, cnt = 0;
    for (let d = 0; d < n; d++) {
      const date = D.daily.time[d], bw = bestWindow(D.H, sc, date, D.daily.sunrise[d], D.daily.sunset[d]), a = bw ? bw.avg : 0;
      if (bw) { sum += a; cnt++; }
      sp.push({ name: dayLabel(date), f: a / 100, text: bw ? String(Math.round(a)) : '–', c: bw ? 'var(--q' + bandOf(a) + ')' : 'var(--ink-3)' });
    }
    if (sp.length < 3 || !cnt) return '';
    const mean = sum / cnt;
    return rgCard('Week shape', 'best 3-hour window score for each day', radarSvg(sp, { color: 'var(--q' + bandOf(mean) + ')', aria: 'Best score per day' }), 'Outer ring is a score of 100. The wider the shape reaches toward a day, the better that day’s best window.');
  } catch (err) { return ''; }
}

/* Hour by hour: 24-hour score dials for the next three days, plus wind and swell roses */
function dialsHtml(D, spot) {
  try {
    const sc = scoresOf(D, spot), cards = [], nd = Math.min(3, D.daily.time.length);
    for (let d = 0; d < nd; d++) {
      const date = D.daily.time[d], hrs = new Array(24).fill(null);
      let best = -1, bs = -1;
      D.H.t.forEach((t, k) => { if (!t.startsWith(date)) return; const h = parseT(t).h, r = sc[k]; if (!r) return; hrs[h] = { f: r.score / 100, color: 'var(--q' + r.band + ')', text: String(r.score), label: r.score + ' ' + BANDS[r.band].name }; if (r.score > bs) { bs = r.score; best = h; } });
      if (best < 0) continue;
      const sr = D.daily.sunrise[d], ss = D.daily.sunset[d], rise = sr ? parseT(sr).h + parseT(sr).mi / 60 : null, set = ss ? parseT(ss).h + parseT(ss).mi / 60 : null;
      cards.push(rgCard(dayLabel(date), 'surf score for every hour', dialSvg(hrs, { best, sun: [rise, set], center: [String(bs), 'best ' + (best % 12 || 12) + (best < 12 ? ' AM' : ' PM')], aria: 'Surf score by hour on ' + dayLabel(date) }), 'Taller wedge is a higher score. The gold arc is daylight.'));
    }
    const i0 = hourIndexNow(D.H, D.off), i1 = Math.min(D.H.t.length, i0 + 72), wb = new Array(16).fill(0), ws = new Array(16).fill(0);
    let wn = 0;
    for (let k = i0; k < i1; k++) { const w = D.H.wsp[k], dd = D.H.wdir[k]; if (w == null || dd == null) continue; const b = rgBin16(dd); wb[b]++; ws[b] += w; wn++; }
    if (wn > 5) {
      const items = wb.map((c, k) => c ? { deg: k * 22.5, v: c, text: Math.round(100 * c / wn) + '%', color: rgWindCol(ws[k] / c) } : null).filter(Boolean);
      cards.push(rgCard('Wind rose', 'where the wind comes from, next 3 days', roseSvg(items, { max: Math.max.apply(null, wb), fmt: v => Math.round(100 * v / wn) + '%', aria: 'Wind direction share of hours: ' + rgTopDirs(wb, wn, dirName) }), 'Share of hours by direction: <b>' + rgTopDirs(wb, wn, dirName) + '</b>.' + rgKey([['#2a9d8f', 'light, under ' + SP(12) + ' ' + su()], ['#e6a700', SP(12) + ' to ' + SP(25) + ' ' + su()], ['#c0392b', SP(25) + ' ' + su() + ' or more']])));
    }
    if (D.marineOk) {
      const eb = new Array(16).fill(0), et = new Array(16).fill(0); let en = 0;
      for (let k = i0; k < i1; k++) [[D.H.sH[k], D.H.sT[k], D.H.sD[k]], [D.H.s2H[k], D.H.s2T[k], D.H.s2D[k]]].forEach(s => { if (s[0] == null || s[1] == null || s[2] == null || !(s[0] > 0)) return; const b = rgBin16(s[2]), w = s[0] * s[0]; eb[b] += w; et[b] += w * s[1]; en += w; });
      if (en > 0) {
        const items = eb.map((w, k) => w ? { deg: k * 22.5, v: w, text: Math.round(100 * w / en) + '%', color: rgPerCol(et[k] / w) } : null).filter(Boolean);
        cards.push(rgCard('Swell rose', 'where the swell energy comes from, next 3 days', roseSvg(items, { max: Math.max.apply(null, eb), fmt: v => Math.round(100 * v / en) + '%', aria: 'Swell energy by direction: ' + rgTopDirs(eb, en, dirName) }), 'Share of swell energy by direction: <b>' + rgTopDirs(eb, en, dirName) + '</b>.' + rgPerKey()));
      }
    }
    return cards.length ? '<h3 class="spec-h">Day dials and roses <small>round views of the same forecast</small></h3><div class="rgrid">' + cards.join('') + '</div>' : '';
  } catch (err) { return ''; }
}

/* Models: one spoke per source, length is its 3-day average, dashed ring is this app's own blend */
function modelRadarHtml(title, ser, unit, nowIdx, dec) {
  try {
    const i0 = nowIdx || 0, avg = s => { const a = (s.data || []).slice(i0, i0 + 72).filter(x => x != null); return a.length >= 12 ? a.reduce((p, q) => p + q, 0) / a.length : null; };
    const short = { 'NOAA NWS forecast': 'NWS', 'CDIP nearshore': 'CDIP', 'WeatherAPI.com': 'WeatherAPI', 'WeatherAPI.com (swell)': 'WeatherAPI', 'Visual Crossing': 'Vis. Crossing' };
    const app = ser.filter(s => /^This app/.test(s.label)).map(avg).filter(x => x != null)[0];
    const sp = ser.filter(s => !/^This app/.test(s.label)).map(s => ({ s, m: avg(s) })).filter(x => x.m != null);
    if (sp.length < 3) return '';
    const mx = Math.max.apply(null, sp.map(x => x.m).concat([app || 0])) * 1.15 || 1, fmt = x => (dec ? x.toFixed(dec) : String(Math.round(x))) + ' ' + unit;
    const spokes = sp.map(x => ({ name: short[x.s.label] || x.s.label, f: x.m / mx, ref: app != null ? app / mx : null, text: fmt(x.m), c: x.s.color }));
    const lo = Math.min.apply(null, sp.map(x => x.m)), hi = Math.max.apply(null, sp.map(x => x.m));
    return rgCard(title, 'average over the next 3 days, one spoke per forecast source', radarSvg(spokes, { color: 'var(--brand)', aria: title }), 'Sources range from ' + fmt(lo) + ' to ' + fmt(hi) + '.' + (app != null ? ' The dashed line is this app’s own blend at ' + fmt(app) + '.' : '') + ' The closer the shape is to a circle, the more the sources agree.');
  } catch (err) { return ''; }
}

/* ---- 0.1.29: chart sound. A higher value plays a higher pitch (two octaves), with a quick ping for now. Plays on the device only. ---- */
const SND = { ctx: null, on: null, timer: null, nodes: [] };
const sndOK = () => !!(window.AudioContext || window.webkitAudioContext);
function sndStop() {
  if (SND.timer) { clearTimeout(SND.timer); SND.timer = null; }
  SND.nodes.forEach(n => { try { n.stop(); } catch (e) { /* already stopped */ } });
  SND.nodes = [];
  if (SND.on) { SND.on.setAttribute('aria-pressed', 'false'); if (SND.on.dataset.lab) SND.on.textContent = SND.on.dataset.lab; }
  SND.on = null;
}
function sndPlay(btn, vals, nowIdx) {
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
  sndStop();
  const pts = []; vals.forEach((v, k) => { if (v != null && isFinite(v)) pts.push({ v, k }); });
  if (pts.length < 2) return false;
  let lo = Infinity, hi = -Infinity; pts.forEach(p => { if (p.v < lo) lo = p.v; if (p.v > hi) hi = p.v; });
  const step = Math.max(1, Math.ceil(pts.length / 40)), pick = pts.filter((p, j) => j % step === 0);
  if (!SND.ctx) SND.ctx = new AC(); const ctx = SND.ctx; if (ctx.state === 'suspended') ctx.resume();
  const dt = 0.14, t0 = ctx.currentTime + 0.08, span = hi - lo || 1;
  const tone = (f, at, len, type, vol) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(vol, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + len); o.connect(g); g.connect(ctx.destination); o.start(at); o.stop(at + len + 0.02); SND.nodes.push(o); };
  pick.forEach((p, j) => tone(220 * Math.pow(4, (p.v - lo) / span), t0 + j * dt, dt * 0.95, 'sine', 0.18));
  const nj = nowIdx == null ? -1 : pick.findIndex(p => p.k >= nowIdx);
  if (nj > 0) tone(1760, t0 + nj * dt, 0.08, 'triangle', 0.1);
  btn.dataset.lab = btn.dataset.lab || btn.textContent; btn.setAttribute('aria-pressed', 'true'); btn.textContent = '\u25a0 Stop'; SND.on = btn;
  SND.timer = setTimeout(sndStop, (pick.length * dt + 0.4) * 1000);
  return { lo, hi };
}
document.addEventListener('click', e => {
  const b = e.target && e.target.closest ? e.target.closest('.snd') : null; if (!b) return;
  if (SND.on === b) { sndStop(); return; }
  try {
    let vals, nowIdx, say, live;
    if (b.dataset.snd === 'tide') {
      const fig = document.getElementById(b.dataset.fig), c = fig && fig._tc; if (!c) return;
      const n = 48; vals = []; for (let k = 0; k < n; k++) vals.push(c.TM.at(c.t0 + (c.t1 - c.t0) * k / (n - 1)));
      nowIdx = c.nowS >= c.t0 && c.nowS <= c.t1 ? Math.round((c.nowS - c.t0) / (c.t1 - c.t0) * (n - 1)) : null;
      live = b.parentNode.querySelector('.snd-live');
      say = r => 'Tide curve as sound. A higher pitch means a higher tide. Lowest ' + L(r.lo) + ' ' + lu() + ', highest ' + L(r.hi) + ' ' + lu() + '.';
    } else {
      const box = b.closest('.chartbox'), cfg = box && box._cfg; if (!cfg || !cfg.series || !cfg.series[0]) return;
      const s = cfg.series[0]; vals = s.data.slice(cfg.i0, cfg.i1 + 1); nowIdx = cfg.nowIdx != null && cfg.nowIdx >= cfg.i0 && cfg.nowIdx <= cfg.i1 ? cfg.nowIdx - cfg.i0 : null;
      live = box.querySelector('.sr-live');
      const strip = t => String(t == null ? '' : t).replace(/<[^>]*>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
      const fm = v => strip(cfg.fmt ? cfg.fmt(v, s, cfg.i0) : f1(v) + (cfg.unit ? ' ' + cfg.unit : ''));
      say = r => (s.label || cfg.title || 'Chart') + ' as sound. A higher pitch means a higher value. Lowest ' + fm(r.lo) + ', highest ' + fm(r.hi) + '.';
    }
    const res = sndPlay(b, vals, nowIdx);
    if (res && live) live.textContent = say(res);
  } catch (err) { /* sound is optional */ }
});
window.addEventListener('pagehide', sndStop);
