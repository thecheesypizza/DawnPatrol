"""Click-everything crawler. Usage: python3 crawl.py <persona> ; writes crawl_<persona>.json and screenshots."""
import json, sys, re, time, os
src = open('tests/harness.py', encoding='utf-8').read()
src = src.replace("def run(label, buoy_mode='ok', fn=None, vw=(390,800), nws_mode='ok', ls=None, hash=None, offline=False):",
                  "def run(label, buoy_mode='ok', fn=None, vw=(390,800), nws_mode='ok', ls=None, hash=None, offline=False, meteo='ok', init=None, copts=None):")
assert "meteo='ok', init=None" in src
src = src.replace("ctx=b.new_context(viewport={'width':vw[0],'height':vw[1]})", "ctx=b.new_context(viewport={'width':vw[0],'height':vw[1]}, **(copts or {}))")
src = src.replace("page.on('pageerror'", "[ctx.add_init_script(x) for x in (init or [])]; page.on('pageerror'", 1)
m_old = "lambda r: r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(synth('m',r.request.url)))"
w_old = "lambda r: r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(synth('w',r.request.url)))"
assert m_old in src and w_old in src
src = src.replace(m_old, "lambda r: (r.abort() if meteo=='down' else r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(synth('m',r.request.url))))")
src = src.replace(w_old, "lambda r: (r.abort() if meteo=='down' else r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(synth('w',r.request.url))))")
a = "            if '/api/pacioos' in u:"
assert a in src
src = src.replace(a, "            if '/api/auth' in u or '/api/sync' in u or '/api/crew' in u or '/api/push' in u: return r.fulfill(status=401,content_type='application/json',headers=hdr,body=json.dumps({'error':'Not signed in'}))\n" + a, 1)
src = src.replace("print(label,'| errs:',errs,'|',out)", "pass")
exec(src)
_syn = synth; _cache = {}
def synth(k, u):
    key = (k, u)
    if key not in _cache: _cache[key] = _syn(k, u)
    return _cache[key]

INTER = 'button, a[href], select, input, textarea, summary, [role=button], [role=switch], [role=tab], [data-tile], [tabindex="0"]'
SKIP = re.compile(r'‹ Your spots|Remove spot|^Close$|delete account|sign out|log out|reset all|erase|clear (all|log|data)|remove all|forget|open the glance page', re.I)
CUR = [None]
REPORT = {'persona': None, 'actions': 0, 'issues': [], 'links': {}, 'downloads': [], 'popups': [], 'views': {}}

def issue(kind, where, detail):
    REPORT['issues'].append({'kind': kind, 'where': where, 'detail': str(detail)[:400]})
    save_partial()
_last = [0]
def save_partial(force=False):
    if force or time.time() - _last[0] > 5:
        _last[0] = time.time()
        try: json.dump(REPORT, open('crawl_%s.json' % REPORT['persona'], 'w'), indent=1)
        except Exception: pass

STAMP = """(scope) => {
  const root = scope ? document.querySelector(scope) : document;
  if (!root) return [];
  const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[hidden]') && !el.closest('[inert]'); };
  const out = []; let k = 0;
  document.querySelectorAll('[data-cx]').forEach(e => e.removeAttribute('data-cx'));
  root.querySelectorAll(%s).forEach(el => {
    if (!vis(el)) return;
    if (el.disabled) return;
    const tag = el.tagName.toLowerCase(), type = (el.type || '').toLowerCase();
    el.setAttribute('data-cx', String(k));
    const lab = (el.getAttribute('aria-label') || el.title || (tag === 'input' || tag === 'textarea' || tag === 'select' ? el.id || el.name : el.textContent) || '').replace(/\\s+/g, ' ').trim().slice(0, 40);
    out.push({ k, tag, type, id: el.id || '', text: lab, href: el.getAttribute('href') || '', target: el.getAttribute('target') || '', rel: el.getAttribute('rel') || '', ro: !!el.readOnly, opts: tag === 'select' ? Array.from(el.options).map(o => o.value) : null, min: el.min, max: el.max, step: el.step });
    k++;
  });
  return out;
}""" % json.dumps(INTER)

def open_modal(page):
    return page.evaluate("(() => { const m = Array.from(document.querySelectorAll('.modal')).find(x => !x.hidden && getComputedStyle(x).display !== 'none'); return m ? m.id : null; })()")

def close_modal(page, mid, where):
    for attempt in range(3):
        if not open_modal(page): return True
        if attempt == 0: page.keyboard.press('Escape')
        elif attempt == 1:
            b = page.locator('#' + mid + ' button:visible', has_text=re.compile(r'close|cancel|done|×|back', re.I))
            if b.count():
                try: b.first.click(timeout=1500)
                except Exception: pass
        else:
            page.evaluate("id => { const m = document.getElementById(id); if (m) m.hidden = true; }", mid)
            issue('modal-not-closable', where, mid); return False
        page.wait_for_timeout(200)
    return True

def act(page, d, where, depth=0):
    """Perform the natural actions on one stamped element."""
    sel = '[data-cx="%d"]' % d['k']; loc = page.locator(sel)
    if depth == 0 and open_modal(page): close_modal(page, open_modal(page), where + ' (stray)'); page.wait_for_timeout(150)
    if loc.count() == 0: return 'stale'
    label = '%s%s "%s"' % (d['tag'], '#' + d['id'] if d['id'] else '', d['text'])
    where2 = where + ' > ' + label
    REPORT['actions'] += 1; save_partial()
    try:
        if d['tag'] == 'a' and d['href']:
            h = d['href']
            REPORT['links'][h] = REPORT['links'].get(h, 0) + 1
            if h.startswith('http') and d['target'] == '_blank' and 'noopener' not in d['rel']: issue('link-no-noopener', where2, h)
            if h.startswith('http') or h.startswith('mailto:') or h.startswith('tel:'):
                if d['target'] != '_blank' and not h.startswith('mailto:'): issue('external-link-same-tab', where2, h)
                with page.context.expect_page(timeout=3500) as pi:
                    loc.first.click(timeout=2500)
                pg = pi.value; REPORT['popups'].append(pg.url); pg.close(); return 'ok'
        if d['tag'] == 'select':
            for v in (d['opts'] or [])[:14]:
                if SKIP.search(v or ''): continue
                loc.first.select_option(v, timeout=2000); page.wait_for_timeout(120)
                after_check(page, where2 + ' = ' + str(v), depth)
            return 'ok'
        if d['type'] in ('checkbox', 'radio'):
            loc.first.click(timeout=2500, force=False); page.wait_for_timeout(100)
            after_check(page, where2, depth)
            if d['type'] == 'checkbox': loc.first.click(timeout=2500); page.wait_for_timeout(100)
            return 'ok'
        if d['type'] == 'range':
            for v in (d['min'] or '0', d['max'] or '100'):
                page.evaluate("([s,v]) => { const e = document.querySelector(s); e.value = v; e.dispatchEvent(new Event('input', {bubbles:true})); e.dispatchEvent(new Event('change', {bubbles:true})); }", [sel, v]); page.wait_for_timeout(100)
            after_check(page, where2, depth); return 'ok'
        if d.get('ro'): return 'skip'
        if d['tag'] == 'textarea' or (d['tag'] == 'input' and d['type'] in ('text', 'search', 'email', 'password', 'url', 'number', 'tel', '')):
            if d['tag'] == 'input' and d['type'] == 'number': tests = ['3', '-1', '99999', '']
            elif d['type'] == 'email': tests = ['test@example.com', 'not an email']
            else: tests = ['Rincon', '<img src=x onerror=alert(1)>', 'a' * 300, '日本 🌊 ‮', '']
            for t in tests:
                loc.first.fill(t, timeout=2000)
                if d['tag'] == 'input': loc.first.press('Enter', timeout=1500)
                page.wait_for_timeout(150)
                after_check(page, where2 + ' fill ' + repr(t[:20]), depth)
            loc.first.fill('', timeout=1500)
            return 'ok'
        if d['type'] in ('file', 'date', 'datetime-local', 'time', 'color', 'hidden'): return 'skip'
        # buttons, summaries, tiles, switches
        try: loc.first.scroll_into_view_if_needed(timeout=1500)
        except Exception: pass
        try:
            loc.first.click(timeout=2500)
        except Exception as e:
            msg = str(e).split('\n')[0]
            if loc.count() == 0 or not loc.first.is_visible(): return 'stale'
            if 'intercepts pointer events' in str(e): issue('click-obscured', where2, [l.strip() for l in str(e).split('\n') if 'intercepts pointer' in l][0][:260])
            else:
                try: loc.first.click(timeout=1500, force=True)
                except Exception as e2: issue('click-failed', where2, (str(e) + ' || FORCE: ' + str(e2)).replace('\n', ' ')[:700])
        page.wait_for_timeout(180)
        after_check(page, where2, depth)
        return 'ok'
    except Exception as e:
        s = str(e).split('\n')[0]
        try:
            if loc.count() == 0 or not loc.first.is_visible(): return 'stale'
        except Exception: pass
        if 'Timeout' in s and 'expect_page' in s or 'expect_page' in s: return 'ok'
        issue('action-error', where2, s)
        return 'err'

def after_check(page, where, depth):
    # leave the app?  fix
    if not page.url.startswith('file://'):
        issue('left-app', where, page.url); page.go_back(); page.wait_for_timeout(1500)
    mid = open_modal(page)
    if mid and depth == 0 and not where.startswith('MODAL'):
        explore(page, '#' + mid + ' ', 'MODAL ' + mid + ' (from ' + where[-50:] + ')', 1)
        close_modal(page, mid, where)

def explore(page, scope, where, depth=0):
    scopesel = scope.strip() or None
    els = page.evaluate(STAMP, scopesel)
    seen_text = {}
    for d in els:
        if SKIP.search(d['text']) and d['tag'] in ('button', 'a'):
            continue
        key = (d['tag'], d['id'], d['text'], d['href'])
        seen_text[key] = seen_text.get(key, 0) + 1
        if seen_text[key] > 2 and d['tag'] in ('button', 'a'): continue  # repeated rows: first two are enough
        r = act(page, d, where, depth)
        if r == 'stale':
            # DOM re-rendered; restamp and continue with remaining by text match
            els2 = page.evaluate(STAMP, scopesel)
            m = [e for e in els2 if (e['tag'], e['id'], e['text'], e['href']) == key]
            if m: act(page, m[0], where, depth)
        if depth == 0 and not open_modal(page) and scopesel and not page.locator(scopesel).first.is_visible():
            REPORT.setdefault('scope_switches', []).append(where + ' after ' + d['text'])
            v = CUR[0]
            if v:
                try: nav_to(page, v)
                except Exception: break
                els2 = page.evaluate(STAMP, scopesel)
                # continue with elements after the current index
                rest = els2[els.index(d) + 1:] if len(els2) > els.index(d) + 1 else []
                for d2 in rest:
                    if SKIP.search(d2['text']) and d2['tag'] in ('button', 'a'): continue
                    act(page, d2, where, depth)
            break

def health(page, where):
    r = page.evaluate("({ow: document.documentElement.scrollWidth > innerWidth + 1, sw: document.documentElement.scrollWidth, iw: innerWidth, imgs: Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0 && i.src && !i.src.startsWith('data:')).length, empty: document.querySelectorAll('.skel').length, undef: /undefined|NaN|\\[object/.test(document.body.innerText) ? (document.body.innerText.match(/.{0,30}(undefined|NaN|\\[object).{0,30}/) || [''])[0] : ''})")
    if r['ow']: issue('horizontal-overflow', where, '%d > %d' % (r['sw'], r['iw']))
    if r['undef']: issue('text-undefined-nan', where, r['undef'])
    return r

NAV = {'home': "setView('home')", 'spot': "(()=>{if(S.pins.length){select(S.selId||S.pins[0].id,{go:true})}})()", 'menu': "openMenu()"}
SCOPE = {'home': '#scout', 'spot': '#detail', 'menu': '#menu'}
def nav_to(page, view):
    page.keyboard.press('Escape'); page.evaluate("()=>{document.querySelectorAll('.modal').forEach(m=>{if(m.id!=='menu')m.hidden=true})}")
    page.evaluate(NAV[view]); page.wait_for_timeout(1500)

def crawl(page):
    errs = []
    page.on('pageerror', lambda e: issue('pageerror', 'runtime', e))
    page.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and issue('console-error', 'runtime', m.text[:200]))
    page.on('dialog', lambda d: (REPORT.setdefault('dialogs', []).append(d.message[:80]), d.accept()))
    page.on('download', lambda d: REPORT['downloads'].append(d.suggested_filename))
    # popups opened by links/windows
    for pass_n, view in enumerate((os.environ.get('VIEWS') or 'home,spot,menu').split(',')):
        try: nav_to(page, view)
        except Exception as e: issue('nav-failed', view, str(e).split('\n')[0])
        CUR[0] = view; scope = SCOPE[view]
        h = health(page, view + ' (pass %d)' % pass_n); REPORT['views'].setdefault(view, []).append(h)
        explore(page, scope, view + '#%d' % pass_n)
        health(page, view + ' after')
        page.screenshot(path='crawl_%s_%s.png' % (REPORT['persona'], view))
    # header controls
    explore(page, '.top, header', 'header', 0)
    # keyboard walk
    for i in range(60):
        page.keyboard.press('Tab')
    page.wait_for_timeout(200)
    return None

SEED = "try{if(!sessionStorage.getItem('cs')){sessionStorage.setItem('cs','1');localStorage.setItem('dp.pins',JSON.stringify([{id:'pin-c1',name:'North Jetty',lat:33.65,lon:-118.0,face:225,custom:true},{id:'pin-c2',name:'Reef Left',lat:21.66,lon:-158.05,face:315,custom:true}]));localStorage.setItem('dp.sel',JSON.stringify('pin-c1'));localStorage.setItem('dp.xopen','true')}}catch(e){}"
PERSONAS = {
    'mobile': dict(vw=(390, 800), kw={'init': [SEED]}),
    'mobile-empty': dict(vw=(390, 800), kw={}),
    'desktop-metric-dark': dict(vw=(1280, 900), kw={'init': [SEED, "try{localStorage.setItem('dp.units',JSON.stringify('metric'));localStorage.setItem('dp.theme',JSON.stringify('dark'))}catch(e){}"]}),
    'mobile-xl': dict(vw=(360, 640), kw={'init': [SEED, "try{localStorage.setItem('dp.a11y',JSON.stringify({text:'xl',contrast:false,motion:'auto'}))}catch(e){}"]}),
    'offline-demo': dict(vw=(390, 800), kw={'init': [SEED], 'meteo': 'down', 'buoy_mode': 'down'}),
    'api-errors': dict(vw=(412, 900), kw={'init': [SEED], 'buoy_mode': '500', 'nws_mode': 'off'}),
    'tablet-hawaii': dict(vw=(820, 1100), kw={'init': [SEED, "try{localStorage.setItem('dp.sel',JSON.stringify('pin-c2'))}catch(e){}"]}),
}

if __name__ == '__main__':
    name = sys.argv[1]; P = PERSONAS[name]; REPORT['persona'] = name + os.environ.get('TAG', '')
    t0 = time.time()
    def fn(page):
        crawl(page)
        try:
            log = page.evaluate("window.DPLOG ? DPLOG.entries().filter(e => ['error','rejection','net','assert'].includes(e.k)).map(e => e.k + ': ' + e.m).slice(-60) : null")
        except Exception as e: log = ['could not read log: ' + str(e)]
        REPORT['dplog'] = log
        return None
    run('crawl-' + name, fn=fn, vw=P['vw'], **P['kw'])
    REPORT['seconds'] = round(time.time() - t0)
    # summarize
    seen = {}
    for i in REPORT['issues']:
        k = (i['kind'], i['where'].split('>')[-1][:60], i['detail'][:80]); seen[k] = seen.get(k, 0) + 1
    REPORT['unique_issue_count'] = len(seen)
    json.dump(REPORT, open('crawl_%s.json' % name, 'w'), indent=1)
    print(name, 'actions', REPORT['actions'], 'issues', len(REPORT['issues']), 'unique', len(seen), 'seconds', REPORT['seconds'], 'links', len(REPORT['links']), 'downloads', len(REPORT['downloads']))
