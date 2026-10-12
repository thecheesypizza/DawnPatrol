/* ============================================================
   PROBLEM LOG: keeps a short, private record of errors and recent taps on this device.
   Nothing is sent anywhere. The person can export it as a .txt file and email it.
   ============================================================ */
const DPLOG = (() => {
  const KEY = 'dp.errlog', MAX = 400, ERR_KINDS = { error: 1, rejection: 1, net: 1, warn: 1, assert: 1 };
  let buf = [], seq = 0, saveT = null, hook = null; const t0 = Date.now(), seen = {};
  const hasWin = typeof window !== 'undefined' && typeof document !== 'undefined';
  try { const raw = hasWin ? localStorage.getItem(KEY) : null; if (raw) { const o = JSON.parse(raw); if (Array.isArray(o)) buf = o.slice(-MAX); } } catch (e) { buf = []; }
  const clip = (s, n) => { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
  /* round coordinates in URLs so a shared log does not pin a home address */
  const scrub = s => String(s).replace(/([?&](?:lat|lon|latitude|longitude)=)(-?\d+\.?\d*)/gi, (m, a, b) => a + (Math.round(parseFloat(b) * 10) / 10));
  const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(buf.slice(-MAX))); } catch (e) { /* storage full or blocked */ } }, 400); };
  function add(k, m, extra) {
    m = clip(scrub(m), 600);
    const sig = k + '|' + m, last = buf[buf.length - 1];
    if (last && last.s === sig) { last.n = (last.n || 1) + 1; last.t2 = Date.now(); save(); return last; }
    const e = { i: ++seq, t: Date.now(), k, m, s: sig }; if (extra) e.x = clip(scrub(extra), 1500);
    buf.push(e); if (buf.length > MAX) buf.splice(0, buf.length - MAX); save();
    if (hook && ERR_KINDS[k] && k !== 'warn') { try { hook(e); } catch (er) { /* ignore */ } }
    return e;
  }
  const describe = el => {
    if (!el || !el.tagName) return '';
    let d = el.tagName.toLowerCase(); if (el.id) d += '#' + el.id;
    const ds = el.dataset || {}, keys = ['go', 'act', 'x', 'ac', 'tile', 'm', 'id', 'tab'].filter(k => ds[k] != null);
    keys.slice(0, 2).forEach(k => { d += '[' + k + '=' + clip(ds[k], 24) + ']'; });
    const lab = el.getAttribute && (el.getAttribute('aria-label') || el.getAttribute('title')), tx = (lab || (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? '' : el.textContent) || '').replace(/\s+/g, ' ').trim();
    return tx ? d + ' "' + clip(tx, 32) + '"' : d;
  };
  function screen() { try { const a = document.getElementById('app'); return a && a.dataset.view || ''; } catch (e) { return ''; } }
  if (hasWin) {
    window.addEventListener('error', ev => {
      const tg = ev.target;
      if (tg && tg !== window && tg.tagName) {
        const src = tg.currentSrc || tg.src || tg.href || '', host = (src.match(/^https?:\/\/([^/]+)/) || [])[1] || src.slice(0, 24), key = tg.tagName + host;
        if (seen[key] && Date.now() - seen[key] < 60000) return; seen[key] = Date.now();
        add('net', 'Could not load ' + tg.tagName.toLowerCase() + ' from ' + host); return;
      }
      add('error', (ev.message || 'Script error') + (ev.filename ? ' (' + String(ev.filename).split('/').pop() + ':' + ev.lineno + ':' + ev.colno + ')' : ''), ev.error && ev.error.stack);
    }, true);
    window.addEventListener('unhandledrejection', ev => { const r = ev.reason; add('rejection', 'Unhandled promise rejection: ' + (r && r.message ? r.message : String(r)), r && r.stack); });
    ['error', 'warn'].forEach(lv => {
      const orig = console[lv]; if (typeof orig !== 'function') return;
      console[lv] = function () { try { add(lv === 'error' ? 'error' : 'warn', 'console.' + lv + ': ' + Array.prototype.map.call(arguments, a => (a && a.message) || (typeof a === 'object' ? (() => { try { return JSON.stringify(a); } catch (e) { return String(a); } })() : String(a))).join(' '), arguments[0] && arguments[0].stack); } catch (e) { /* ignore */ } return orig.apply(this, arguments); };
    });
    if (typeof window.fetch === 'function') {
      const of = window.fetch.bind(window);
      window.fetch = function (input, init) {
        const url = typeof input === 'string' ? input : (input && input.url) || '', method = (init && init.method) || (input && input.method) || 'GET', st = Date.now();
        return of(input, init).then(r => { if (!r.ok && !/^(data|blob):/.test(url)) add('net', method + ' ' + url + ' → HTTP ' + r.status + ' (' + (Date.now() - st) + ' ms)'); else if (Date.now() - st > 8000) add('warn', 'Slow response ' + (Date.now() - st) + ' ms: ' + url); return r; },
          e => { if (!(e && e.name === 'AbortError')) add('net', method + ' ' + url + ' → failed: ' + (e && e.message || e)); throw e; });
      };
    }
    document.addEventListener('click', ev => { const el = ev.target && ev.target.closest ? ev.target.closest('button,a,summary,[role=button],[data-tile],[data-act],[data-go],select,input,label,.chip') : null; if (el) add('tap', '[' + screen() + '] ' + describe(el)); }, true);
    document.addEventListener('change', ev => { const el = ev.target; if (el && el.tagName) add('tap', '[' + screen() + '] changed ' + describe(el) + (el.tagName === 'SELECT' ? ' → ' + clip(el.value, 24) : el.type === 'checkbox' || el.type === 'radio' ? ' → ' + el.checked : '')); }, true);
    window.addEventListener('online', () => add('info', 'Device came online')); window.addEventListener('offline', () => add('info', 'Device went offline'));
    document.addEventListener('securitypolicyviolation', ev => add('error', 'Blocked by security policy: ' + ev.violatedDirective + ' ' + clip(ev.blockedURI, 80)));
    const flush = () => { try { clearTimeout(saveT); localStorage.setItem(KEY, JSON.stringify(buf.slice(-MAX))); } catch (e) { /* ignore */ } };
    window.addEventListener('pagehide', flush); document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
    add('info', 'Session start');
  }
  const when = t => { const d = new Date(t); return isNaN(d) ? '' : d.toISOString().replace('T', ' ').slice(0, 19) + 'Z'; };
  function report(ctx) {
    ctx = ctx || {}; const L = [], errs = buf.filter(e => ERR_KINDS[e.k]), n0 = errs.filter(e => e.k !== 'warn').length;
    L.push('DAWN PATROL PROBLEM REPORT', '==========================', '');
    L.push('Created: ' + when(Date.now()), 'App: ' + (ctx.app || 'Dawn Patrol'), 'Page: ' + (hasWin ? location.href.replace(/[?#].*$/, '') + (location.hash ? ' (hash set)' : '') : ''), 'Screen: ' + (ctx.screen || screen()), 'Data mode: ' + (ctx.mode || ''));
    if (hasWin) {
      L.push('Browser: ' + navigator.userAgent, 'Language: ' + navigator.language + '   Time zone: ' + (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return ''; } })(), 'Screen size: ' + innerWidth + 'x' + innerHeight + ' @' + (window.devicePixelRatio || 1) + 'x', 'Online: ' + navigator.onLine, 'Standalone (installed): ' + (matchMedia('(display-mode: standalone)').matches), 'Service worker: ' + (navigator.serviceWorker && navigator.serviceWorker.controller ? 'active' : 'none'), 'Time open: ' + Math.round((Date.now() - t0) / 1000) + ' s');
    }
    (ctx.settings ? Object.keys(ctx.settings) : []).forEach(k => L.push(k + ': ' + ctx.settings[k]));
    L.push('', 'Problems recorded: ' + n0 + ' error' + (n0 === 1 ? '' : 's') + ', ' + (errs.length - n0) + ' warning' + (errs.length - n0 === 1 ? '' : 's') + ' (stored on this device only)');
    if (ctx.note) L.push('', 'WHAT THE PERSON SAID WENT WRONG', '-------------------------------', clip(ctx.note, 2000));
    L.push('', 'PROBLEMS (oldest first)', '-----------------------'); if (!errs.length) L.push('(none recorded)');
    errs.slice(-60).forEach(e => { L.push(when(e.t) + '  ' + e.k.toUpperCase() + (e.n > 1 ? ' x' + e.n : '') + '  ' + e.m); if (e.x) L.push('    ' + e.x.split('\n').slice(0, 6).join('\n    ')); });
    L.push('', 'RECENT ACTIVITY (last 80 taps and events)', '-----------------------------------------');
    buf.filter(e => e.k !== 'warn').slice(-80).forEach(e => L.push(when(e.t).slice(11) + '  ' + e.k + '  ' + e.m + (e.n > 1 ? ' x' + e.n : '')));
    L.push('', '--- end of report ---'); return L.join('\r\n');
  }
  return {
    add, report, onError(f) { hook = f; },
    counts() { const e = buf.filter(x => x.k === 'error' || x.k === 'rejection' || x.k === 'net' || x.k === 'assert'); return { errors: e.length, all: buf.length, last: e.length ? e[e.length - 1] : null }; },
    clear() { buf = []; try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } add('info', 'Log cleared'); },
    entries() { return buf.slice(); }, stamp() { return when(Date.now()).replace(/[: ]/g, '-').replace(/Z$/, ''); },
  };
})();
if (typeof window !== 'undefined') window.DPLOG = DPLOG;
