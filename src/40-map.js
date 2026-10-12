/* ============================================================
   MAP ENGINE: small slippy map (Web Mercator), no external library
   Tiles load only where the page may reach image hosts; the graticule always draws.
   ============================================================ */
const TILE = 256;
const mx = (lon) => (lon + 180) / 360;
const my = (lat) => { const s = Math.sin(rad(clamp(lat, -85.05, 85.05))); return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI); };
const lonOf = (x) => x * 360 - 180;
const latOf = (y) => { const n = Math.PI - 2 * Math.PI * y; return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))); };

/* Web Mercator (EPSG:3857) extent of one z/x/y tile, for map services that render an image per bounding box */
const bbox3857 = (z, x, y) => { const E = 20037508.342789244, t = 2 * E / Math.pow(2, z); return [-E + x * t, E - (y + 1) * t, -E + (x + 1) * t, E - y * t].map(v => v.toFixed(1)).join(','); };
class SurfMap {
  constructor(root, opts) {
    this.root = root; this.opts = opts || {};
    this.v = { x: mx(-118), y: my(33.6), z: 8 };
    this.layers = [];            // {id, url, opacity, subs, tiles:Map, el}
    this.markers = new Map();    // id -> {lat, lon, el}
    this.pointers = new Map(); this.drag = null; this.pinMode = false;
    root.classList.add('sm');
    root.innerHTML = '<canvas class="sm-grid"></canvas><div class="sm-tiles"></div><canvas class="sm-flow" aria-hidden="true"></canvas><div class="sm-marks"></div>' +
      '<div class="sm-ctl"><button type="button" data-z="1" aria-label="Zoom in">+</button><button type="button" data-z="-1" aria-label="Zoom out">−</button></div>' +
      '<div class="sm-attr" hidden></div><div class="sm-hint" hidden></div><div class="sm-note" hidden></div>';
    this.cv = root.querySelector('canvas.sm-grid'); this.flow = root.querySelector('canvas.sm-flow'); this.tilesEl = root.querySelector('.sm-tiles'); this.marksEl = root.querySelector('.sm-marks');
    this.attrEl = root.querySelector('.sm-attr'); this.hintEl = root.querySelector('.sm-hint'); this.noteEl = root.querySelector('.sm-note'); this.ticks = []; this.errs = 0; this.oks = 0;
    root.querySelectorAll('.sm-ctl button').forEach(b => b.addEventListener('click', () => this.zoomBy(+b.dataset.z)));
    root.addEventListener('pointerdown', e => this.down(e));
    root.addEventListener('pointermove', e => this.move(e));
    root.addEventListener('pointerup', e => this.up(e));
    root.addEventListener('pointercancel', e => this.up(e, true));
    root.addEventListener('wheel', e => { e.preventDefault(); this.zoomAt(e.offsetX, e.offsetY, -e.deltaY * 0.0016); }, { passive: false });
    root.addEventListener('dblclick', e => { if (e.target.closest('.sm-ctl,.mk')) return; this.zoomAt(e.offsetX, e.offsetY, 1); });
    new ResizeObserver(() => this.resize()).observe(root);
    this.resize();
  }
  resize() {
    const r = this.root.getBoundingClientRect(); this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
    const dpr = window.devicePixelRatio || 1; this.cv.width = this.w * dpr; this.cv.height = this.h * dpr;
    this.cv.style.width = this.w + 'px'; this.cv.style.height = this.h + 'px'; this.dpr = dpr;
    this.render();
  }
  get ws() { return TILE * Math.pow(2, this.v.z); }
  toPx(lat, lon) { const ws = this.ws; return [this.w / 2 + (mx(lon) - this.v.x) * ws, this.h / 2 + (my(lat) - this.v.y) * ws]; }
  fromPx(px, py) { const ws = this.ws; return { lat: latOf(this.v.y + (py - this.h / 2) / ws), lon: lonOf(this.v.x + (px - this.w / 2) / ws) }; }
  setView(lat, lon, z) { if (lat != null) { this.v.x = mx(lon); this.v.y = my(lat); } if (z != null) this.v.z = clamp(z, 2, 17); this.v.x = ((this.v.x % 1) + 1) % 1; this.v.y = clamp(this.v.y, 0.001, 0.999); this.render(); }
  zoomBy(dz) { this.setView(null, null, Math.round(this.v.z + dz)); }
  zoomAt(px, py, dz) {
    const before = this.fromPx(px, py); const nz = clamp(this.v.z + dz, 2, 17); if (nz === this.v.z) return;
    this.v.z = nz; const ws = this.ws; this.v.x = mx(before.lon) - (px - this.w / 2) / ws; this.v.y = my(before.lat) - (py - this.h / 2) / ws; this.setView();
  }
  fit(points, pad) {
    if (!points.length) return;
    const xs = points.map(p => mx(p.lon)), ys = points.map(p => my(p.lat));
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const dx = Math.max(x1 - x0, 1e-4), dy = Math.max(y1 - y0, 1e-4), p = pad || 50;
    const zx = Math.log2((this.w - 2 * p) / (TILE * dx)), zy = Math.log2((this.h - 2 * p) / (TILE * dy));
    this.v.x = (x0 + x1) / 2; this.v.y = (y0 + y1) / 2; this.setView(null, null, clamp(Math.min(zx, zy, 11), 2, 11));
  }
  /* --- gestures --- */
  down(e) {
    if (e.target.closest('.sm-ctl,.mk')) return;
    this.root.setPointerCapture(e.pointerId); this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
    this.drag = { sx: e.clientX, sy: e.clientY, vx: this.v.x, vy: this.v.y, moved: false, pinch: this.pointers.size > 1 ? this.pinchDist() : null, z0: this.v.z };
  }
  pinchDist() { const a = [...this.pointers.values()]; return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y); }
  move(e) {
    if (!this.pointers.has(e.pointerId) || !this.drag) return;
    const rect = this.root.getBoundingClientRect(); this.pointers.set(e.pointerId, { x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (this.pointers.size > 1) {
      const d = this.pinchDist(); if (!this.drag.pinch) { this.drag.pinch = d; this.drag.z0 = this.v.z; }
      const a = [...this.pointers.values()]; this.drag.moved = true;
      this.zoomAt((a[0].x + a[1].x) / 2, (a[0].y + a[1].y) / 2, (this.drag.z0 + Math.log2(d / this.drag.pinch)) - this.v.z); return;
    }
    const dx = e.clientX - this.drag.sx, dy = e.clientY - this.drag.sy;
    if (!this.drag.moved && Math.hypot(dx, dy) < 5) return;
    this.drag.moved = true; const ws = this.ws; this.v.x = this.drag.vx - dx / ws; this.v.y = this.drag.vy - dy / ws; this.setView();
  }
  up(e, cancel) {
    const wasDrag = this.drag; this.pointers.delete(e.pointerId);
    if (!wasDrag) return;
    if (this.pointers.size === 0) {
      const tap = !wasDrag.moved && !cancel; this.drag = null;
      if (tap && this.opts.onTap) { const rect = this.root.getBoundingClientRect(); const p = this.fromPx(e.clientX - rect.left, e.clientY - rect.top); this.opts.onTap(p.lat, p.lon); }
    }
  }
  /* --- layers --- */
  setLayers(list) {
    this.layers.forEach(l => { l.el && l.el.remove(); });
    this.errs = 0; this.oks = 0; this.failed = false;
    this.layers = list.map(l => ({ ...l, errs: 0, tiles: new Map(), el: Object.assign(document.createElement('div'), { className: 'sm-layer' }) }));
    this.layers.forEach(l => { l.el.style.opacity = l.opacity == null ? 1 : l.opacity; this.tilesEl.appendChild(l.el); });
    this.updateAttr(); this.render();
  }
  updateAttr() { const att = [...new Set(this.layers.filter(l => l.loaded).map(l => l.attr).filter(Boolean))].join(' \u00b7 '); this.attrEl.hidden = !att; this.attrEl.textContent = att; }
  drawTiles() {
    for (const L of this.layers) {
      const zi = clamp(Math.round(this.v.z), 1, L.maxZ || 18), scale = Math.pow(2, this.v.z - zi), n = Math.pow(2, zi), ts = TILE * scale;
      const cx = this.v.x * n, cy = this.v.y * n;
      const x0 = Math.floor(cx - this.w / 2 / ts), x1 = Math.floor(cx + this.w / 2 / ts), y0 = Math.max(0, Math.floor(cy - this.h / 2 / ts)), y1 = Math.min(n - 1, Math.floor(cy + this.h / 2 / ts));
      const need = new Set();
      for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) {
        const wx = ((x % n) + n) % n, key = zi + '/' + x + '/' + y; need.add(key);
        let img = L.tiles.get(key);
        if (!img) {
          img = new Image(); img.className = 'sm-tile'; img.alt = ''; img.draggable = false; img.decoding = 'async';
          img.onerror = () => { img.style.display = 'none'; if (!L.base && this.layers.includes(L) && !L.loaded && ++L.errs === 3 && this.opts.onLayerFail) this.opts.onLayerFail(L.id); if (L.base && this.layers.includes(L)) { this.errs++; if (this.errs >= Math.max(2, Math.min(6, L.tiles.size)) && !this.oks && !this.failed) { this.failed = true; if (this.opts.onTilesFail) this.opts.onTilesFail(); } } };
          img.onload = () => { if (!L.loaded) { L.loaded = true; this.updateAttr(); } if (L.base && this.layers.includes(L)) { this.oks++; this.setNote(false); this.render(true); } };
          const sub = L.subs ? L.subs[(wx + y) % L.subs.length] : '';
          img.src = L.url.replace('{s}', sub).replace('{z}', zi).replace('{x}', wx).replace('{y}', y).replace('{ver}', L.ver || '').replace('{bbox}', () => bbox3857(zi, wx, y));
          L.el.appendChild(img); L.tiles.set(key, img);
        }
        img.style.width = img.style.height = ts + 'px';
        img.style.transform = 'translate(' + ((x - cx) * ts + this.w / 2) + 'px,' + ((y - cy) * ts + this.h / 2) + 'px)';
      }
      for (const [k, img] of L.tiles) if (!need.has(k)) { img.remove(); L.tiles.delete(k); }
    }
  }
  drawGrid() {
    const c = this.cv.getContext('2d'), cs = getComputedStyle(this.root); c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.fillStyle = cs.getPropertyValue('--ocean').trim() || '#cfe3e6'; c.fillRect(0, 0, this.w, this.h);
    const tl = this.fromPx(0, 0), br = this.fromPx(this.w, this.h);
    if (!this.baseLoaded()) this.drawLand(c, cs);
    const span = Math.max(Math.abs(br.lon - tl.lon), Math.abs(tl.lat - br.lat));
    const steps = [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 30], step = steps.find(s => span / s < 9) || 30;
    c.strokeStyle = cs.getPropertyValue('--grid').trim() || '#a9c6cb'; c.fillStyle = cs.getPropertyValue('--grid-text').trim() || '#5d7b82'; c.lineWidth = 1; c.font = '10px ' + (cs.getPropertyValue('--f-mono') || 'monospace');
    c.beginPath();
    const lon0 = Math.ceil(tl.lon / step) * step, lat0 = Math.floor(tl.lat / step) * step;
    for (let lon = lon0; lon <= br.lon + 1e-9; lon += step) { const [x] = this.toPx(0, lon); c.moveTo(Math.round(x) + 0.5, 0); c.lineTo(Math.round(x) + 0.5, this.h); }
    for (let lat = lat0; lat >= br.lat - 1e-9; lat -= step) { const [, y] = this.toPx(lat, 0); c.moveTo(0, Math.round(y) + 0.5); c.lineTo(this.w, Math.round(y) + 0.5); }
    c.stroke();
    const dec = step < 0.1 ? 2 : step < 1 ? 1 : 0;
    for (let lon = lon0; lon <= br.lon + 1e-9; lon += step) { const [x] = this.toPx(0, lon); c.fillText(Math.abs(lon).toFixed(dec) + '°' + (lon < 0 ? 'W' : 'E'), x + 3, this.h - 6); }
    for (let lat = lat0; lat >= br.lat - 1e-9; lat -= step) { const [, y] = this.toPx(lat, 0); c.fillText(Math.abs(lat).toFixed(dec) + '°' + (lat < 0 ? 'S' : 'N'), 4, y - 3); }
  }
  drawLand(c, cs) {
    c.fillStyle = cs.getPropertyValue('--land').trim() || '#f1f4ec'; c.strokeStyle = cs.getPropertyValue('--coast').trim() || '#8fb0b6'; c.lineWidth = 1.2; c.lineJoin = 'round';
    for (const poly of LAND) {
      for (const off of [-360, 0, 360]) {
        c.beginPath();
        for (let i = 0; i < poly.length; i++) { const [x, y] = this.toPx(poly[i][0], poly[i][1] + off); i ? c.lineTo(x, y) : c.moveTo(x, y); }
        c.closePath(); c.fill(); c.stroke();
      }
    }
    // short beach lines showing which way each spot faces
    c.strokeStyle = cs.getPropertyValue('--ink-2').trim() || '#445'; c.lineWidth = 2; c.lineCap = 'round';
    for (const t of this.ticks) {
      const [x, y] = this.toPx(t.lat, t.lon), a = rad(t.face), nx = Math.sin(a), ny = -Math.cos(a), px = -ny, py = nx;
      c.beginPath(); c.moveTo(x - px * 12, y - py * 12); c.lineTo(x + px * 12, y + py * 12); c.moveTo(x + nx * 4, y + ny * 4); c.lineTo(x + nx * 12, y + ny * 12); c.stroke();
    }
  }
  /* --- markers --- */
  setMarkers(list) {
    const keep = new Set(list.map(m => m.id));
    for (const [id, m] of this.markers) if (!keep.has(id)) { m.el.remove(); this.markers.delete(id); }
    for (const m of list) {
      let cur = this.markers.get(m.id);
      if (!cur) { const el = document.createElement('button'); el.type = 'button'; el.addEventListener('click', ev => { ev.stopPropagation(); if (this.opts.onMarker) this.opts.onMarker(m.id); }); this.marksEl.appendChild(el); cur = { el }; this.markers.set(m.id, cur); }
      Object.assign(cur, { lat: m.lat, lon: m.lon });
      cur.el.className = 'mk ' + (m.cls || ''); cur.el.innerHTML = m.html; cur.el.title = m.title || ''; cur.el.setAttribute('aria-label', m.title || '');
      cur.el.style.zIndex = m.z || 1;
    }
    this.placeMarkers();
  }
  placeMarkers() {
    for (const m of this.markers.values()) {
      const [x, y] = this.toPx(m.lat, m.lon), vis = x > -40 && y > -40 && x < this.w + 40 && y < this.h + 40;
      m.el.style.display = vis ? '' : 'none'; if (vis) m.el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
    }
  }
  setNote(t) { if (t) { this.noteEl.textContent = t; this.noteEl.hidden = false; } else this.noteEl.hidden = true; }
  setTicks(list) { this.ticks = list; this.render(true); }
  baseLoaded() { return this.layers.some(l => l.base && l.loaded); }
  setHint(t) { this.hintEl.hidden = !t; this.hintEl.textContent = t || ''; this.root.classList.toggle('pinning', !!t); }
  render(soft) { if (!this.w) return; this.drawGrid(); this.drawTiles(); this.placeMarkers(); if (!soft && this.opts.onMove) this.opts.onMove(); }
}
