/* test12: break-depth default (CDIP) and the Home depth/location helpers in src/60-app.js.
   Run: node test12.mjs   (reads ../src/60-app.js, pulls out the small pure helpers and checks them) */
import { readFileSync } from 'node:fs';
export function run(src) {
  const res = [], ok = (n, c) => res.push([n, !!c]);
  const grab = re => { const m = src.match(re); if (!m) throw new Error('missing: ' + re); return m[0]; };
  const effLine = grab(/const effDepth = [^\n]+/), inCA = grab(/const adInCA = [^\n]+/), needs = grab(/const adNeeds = [^\n]+/);
  const f = new Function('S', 'AD_FAIL', effLine + ';' + inCA + ';' + needs + ';return { effDepth, adInCA, adNeeds };');
  const S = {}, AD_FAIL = new Map(), h = f(S, AD_FAIL);
  ok('own depth wins', h.effDepth({ depth: 3, adepth: 9.4 }) === 3);
  ok('auto depth used when none set', h.effDepth({ adepth: 9.4 }) === 9.4);
  ok('deep water choice beats auto', h.effDepth({ nodepth: 1, adepth: 9.4 }) === undefined);
  ok('nothing set means deep water', h.effDepth({}) === undefined);
  const ca = { id: 'a', lat: 33.4, lon: -117.6 };
  ok('California spot needs a lookup', h.adNeeds(ca) === true);
  ok('Texas spot does not', h.adNeeds({ id: 'b', lat: 29.3, lon: -94.7 }) === false);
  ok('Hawaii spot does not', h.adNeeds({ id: 'c', lat: 21.3, lon: -157.8 }) === false);
  ok('already tried is not repeated', h.adNeeds({ ...ca, adtried: 1 }) === false);
  ok('own depth skips the lookup', h.adNeeds({ ...ca, depth: 2 }) === false);
  ok('deep water choice skips the lookup', h.adNeeds({ ...ca, nodepth: 1 }) === false);
  AD_FAIL.set('a', Date.now());
  ok('a failed lookup waits 10 minutes', h.adNeeds(ca) === false);
  ok('lookup only once per spot is saved', /pin\.adtried = 1/.test(src));
  ok('lookup ignores far-away model cells', /c\.distM <= 2000/.test(src));
  ok('location lookup rounds to 0.01 degrees', /lat\.toFixed\(2\) \+ '&lon=' \+ lon\.toFixed\(2\)/.test(src));
  ok('Use my location button is wired', /data-menu="home-gps"/.test(src) && /a === 'home-gps'/.test(src));
  return res;
}
if (process.argv[1] && process.argv[1].endsWith('test12.mjs')) {
  const r = run(readFileSync(new URL('../src/60-app.js', import.meta.url), 'utf8'));
  r.forEach(([n, c]) => console.log((c ? 'ok   ' : 'FAIL ') + n));
  const bad = r.filter(x => !x[1]).length; console.log(r.length - bad + '/' + r.length + ' passed'); process.exit(bad ? 1 : 0);
}
