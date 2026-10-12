import w from './index.js';
let ok = true; const t = (c, m) => { if (!c) { ok = false; console.log('FAIL', m); } else console.log('ok', m); };
const mem = new Map();
const SITE = { async get(k, type) { const v = mem.get(k); if (v == null) return null; return type === 'json' ? JSON.parse(v) : v; }, async put(k, v) { mem.set(k, v); }, async delete(k) { mem.delete(k); }, async list(o) { return { keys: [...mem.keys()].filter(k => k.startsWith((o && o.prefix) || '')).map(name => ({ name })), list_complete: true }; } };
const env = { SITE };
const call = async (m, p, body, hdr) => { const r = await w.fetch(new Request('https://x.test' + p, { method: m, headers: Object.assign({ 'content-type': 'application/json' }, hdr || {}), body: body ? JSON.stringify(body) : undefined }), env); let j = null; try { j = await r.clone().json(); } catch (e) {} return { s: r.status, j, r }; };

// Accounts, sync and crews were removed from the Worker in 0.1.14: the routes must not answer any more.
let r = await call('POST', '/api/auth/register', { email: 'a@b.co', password: 'password1' }); t(r.s === 405, 'register route is gone (405)');
r = await call('POST', '/api/auth/login', { email: 'a@b.co', password: 'password1' }); t(r.s === 405, 'login route is gone (405)');
r = await call('POST', '/api/auth/forgot', { email: 'a@b.co' }); t(r.s === 405, 'forgot route is gone (405)');
r = await call('PUT', '/api/sync', { rev: 0, data: { v: 1 } }); t(r.s === 405, 'sync write is gone (405)');
r = await call('GET', '/api/sync'); t(r.s === 404 && r.j && r.j.error === 'Unknown endpoint', 'sync read is gone (404)');
r = await call('GET', '/api/sync/backup'); t(r.s === 404, 'sync backup is gone (404)');
r = await call('GET', '/api/crew'); t(r.s === 404, 'crew list is gone (404)');
r = await call('POST', '/api/crew', { name: 'x' }); t(r.s === 405, 'crew create is gone (405)');
t(mem.size === 0, 'the removed routes wrote nothing to storage');

// Share links still work.
const bundle = { app: 'dawn-patrol', v: 1, kind: 'spots', spots: [{ name: 'Test', lat: 1, lon: 2, face: 270, depth: 1.5 }], secret: 'must not be stored' };
r = await call('POST', '/api/share', bundle); t(r.s === 201 && r.j.ok && /^[A-Za-z0-9_-]{6,16}$/.test(r.j.id) && r.j.days === 90, 'share link created'); const id = r.j.id;
r = await call('GET', '/api/share/' + id); t(r.s === 200 && r.j.spots && r.j.spots[0].depth === 1.5, 'share link returns the spots, with break depth');
t(r.j && r.j.secret === undefined, 'share keeps only the allowed fields');
r = await call('GET', '/api/share/zzzzzz'); t(r.s === 404, 'unknown share link is a 404');
r = await call('POST', '/api/share', { app: 'other', v: 1 }); t(r.s === 400, 'share refuses a non-Dawn-Patrol bundle');
r = await call('POST', '/api/share', { app: 'dawn-patrol', v: 1, notes: 'x'.repeat(61000) }); t(r.s === 413, 'share refuses an oversize bundle');
for (let i = 0; i < 21; i++) r = await call('POST', '/api/share', bundle, { 'cf-connecting-ip': '7.7.7.7' }); t(r.s === 429, 'share creation is rate limited per address');

// Web Push: only what the current app uses, plus the key route.
r = await call('GET', '/api/push/key'); t(r.s === 200 && typeof r.j.key === 'string' && r.j.key.length > 60, 'push key is served');
r = await call('POST', '/api/push/subscribe', { endpoint: 'http://example.com/x', hour: 7 }); t(r.s === 400, 'push refuses a non-https or unknown endpoint');
const ep = 'https://fcm.googleapis.com/fcm/send/abc123';
r = await call('POST', '/api/push/subscribe', { endpoint: ep, hour: 99 }); t(r.s === 400, 'push refuses a bad hour');
r = await call('POST', '/api/push/subscribe', { endpoint: ep, hour: 7 }); t(r.s === 200 && r.j.hour === 7 && [...mem.keys()].some(k => k.startsWith('sub:')), 'push subscription stored');
r = await call('POST', '/api/push/unsubscribe', { endpoint: ep }); t(r.s === 200 && ![...mem.keys()].some(k => k.startsWith('sub:')), 'push unsubscribe clears it');

console.log(ok ? 'ALL OK' : 'SOME FAILED');
