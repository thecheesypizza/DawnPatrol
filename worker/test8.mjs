import w from './index.js';
let ok = true; const t = (c, m) => { if (!c) { ok = false; console.log('FAIL', m); } else console.log('ok', m); };
const mem = new Map([['index.html', '<!doctype html><title>x</title>']]);
const SITE = { async get(k, type) { const v = mem.get(k); if (v == null) return null; return type === 'json' ? JSON.parse(v) : v; }, async put(k, v) { mem.set(k, v); }, async delete(k) { mem.delete(k); }, async list() { return { keys: [], list_complete: true }; } };
const env = { SITE };
const call = async (m, p, body) => { const r = await w.fetch(new Request('https://x.test' + p, { method: m, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }), env); let j = null; try { j = await r.clone().json(); } catch (e) {} return { s: r.status, j, r }; };

// Routing basics. Crews were removed in 0.1.14, so this file no longer tests them.
let r = await call('OPTIONS', '/api/buoys'); t(r.s === 204 && r.r.headers.get('access-control-allow-origin') === '*', 'CORS preflight answers 204 with an open origin');
r = await call('POST', '/api/buoys', {}); t(r.s === 405, 'POST to a data route is refused (405)');
r = await call('DELETE', '/index.html'); t(r.s === 405, 'DELETE on a file is refused (405)');
r = await call('GET', '/api/nope'); t(r.s === 404 && r.j && r.j.error === 'Unknown endpoint', 'unknown data route is a JSON 404');
r = await call('GET', '/api/crew'); t(r.s === 404, 'crew route is gone');
r = await call('GET', '/nope.txt'); t(r.s === 404, 'a file outside the allowlist is a 404');
r = await call('GET', '/'); t(r.s === 200 && /^text\/html/.test(r.r.headers.get('content-type')) && /max-age=300/.test(r.r.headers.get('cache-control')), 'the home page is served as HTML, cached for 5 minutes');
r = await call('GET', '/sw.js'); t(r.s === 404, 'a listed file missing from storage is a 404 (sw.js not seeded)');
mem.set('sw.js', 'self.x=1'); r = await call('GET', '/sw.js'); t(r.s === 200 && r.r.headers.get('cache-control') === 'no-cache', 'the service worker is never cached');
r = await call('GET', '/api/share/zzzzzz'); t(r.s === 404, 'share route still works');
console.log(ok ? 'ALL OK' : 'FAILURES');
