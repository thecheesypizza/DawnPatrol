/* Dawn Patrol service worker: keeps the app shell on the device so it opens with no signal */
const SHELL = 'dp-shell-v3';
const ASSETS = ['/index.html', '/style.css', '/data.js', '/map.js', '/charts.js', '/app.js', '/manifest.webmanifest'];
self.addEventListener('install', e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  const key = u.pathname === '/' ? '/index.html' : u.pathname;
  if (!ASSETS.includes(key)) return;
  e.respondWith(caches.open(SHELL).then(async c => {
    const hit = await c.match(key), net = fetch(r).then(res => { if (res.ok) c.put(key, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || new Response('You are offline and this page was not saved yet.', { status: 503, headers: { 'content-type': 'text/plain' } });
  }));
});

/* the only push Dawn Patrol sends is the algae bloom alert; the push carries no text, so the wording is fetched when it arrives */
self.addEventListener('push', e => {
  e.waitUntil((async () => {
    let title = 'Dawn Patrol', body = 'Open the app for the latest Scripps Pier algae report.';
    try { const r = await fetch('/api/sccoos/alert', { cache: 'no-store' }); if (r.ok) { const j = await r.json(); if (j && j.title) title = j.title; if (j && j.body) body = j.body; } } catch (err) { /* offline: show the plain wording */ }
    await self.registration.showNotification(title, { body, tag: 'dp-bloom', icon: '/icon-192.png' });
  })());
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => { const c = cs.find(x => new URL(x.url).origin === location.origin); return c ? c.focus() : self.clients.openWindow('/'); }));
});
