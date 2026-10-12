/* Surfing level scoring (run from the repository root: node worker/test11.mjs). Reads src/ and evaluates it, no browser. */
import { readFileSync } from 'node:fs';
const src = ['05-log.js', '30-data.js', '35-coast.js', '37-services.js', '38-me.js', '39-tides.js'].map(f => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8')).join('');
const L = new Function('module', src + '\n;return { scoreHour, mkFace, setSurfLevel, levelFactor, surfEstimate, cautionFor, levelNote };')({ exports: {} });
let ok = true; const t = (c, m) => { if (!c) { ok = false; console.log('FAIL', m); } else console.log('ok', m); };
const face = L.mkFace(270, null, undefined), mk = (sH, sT, wsp, wdir) => ({ sH, sT, sD: 270, s2H: null, s2T: null, s2D: null, wH: sH, wT: sT, wD: 270, wwH: 0.1, wsp, wdir, gust: wsp + 5 });
const sc = (lv, sH) => { L.setSurfLevel(lv); return L.scoreHour(mk(sH, 12, 10, 90), face).score; };
// reference scores (12 s swell, 10 km/h offshore wind) measured on the 0.1.16 build; Advanced equals 0.1.15.1
const ref = { 0.4: [70, 62, 58], 0.7: [84, 73, 68], 1: [73, 81, 75], 1.4: [49, 85, 81], 1.8: [36, 85, 84], 2.4: [22, 74, 85], 3: [12, 61, 85], 4: [11, 42, 84] };
for (const h of Object.keys(ref)) { const r = ref[h], g = ['beginner', 'intermediate', 'advanced'].map(l => sc(l, +h)); t(g.every((v, i) => v === r[i]), 'swell ' + h + ' m scores ' + g.join('/') + ' (expected ' + r.join('/') + ')'); }
t(sc('beginner', 0.7) > sc('advanced', 0.7), 'a small clean day scores higher for a Beginner than for an Advanced surfer');
t(sc('beginner', 3) < 20 && sc('advanced', 3) > 80, 'a big day scores low for a Beginner and high for an Advanced surfer');
L.setSurfLevel('nonsense'); t(L.scoreHour(mk(1.4, 12, 10, 90), face).score === 85, 'an unknown level falls back to Intermediate');
t(L.levelFactor(1, 'advanced') === 1 && L.levelFactor(1, 'beginner') < 1 && L.levelFactor(0.5, 'beginner') === 1, 'Beginner is scored down only above its limit');
const ft = f => f / 3.28084;
t(L.cautionFor({ hi: ft(3.95), lo: ft(3) }, 'beginner') === null, 'no caution when the top of the range is just under 4 ft');
t(L.cautionFor({ hi: ft(4.2), lo: ft(3.4) }, 'beginner') !== null, 'caution when the top of the range is above 4 ft');
t(L.cautionFor({ hi: ft(12), lo: ft(9) }, 'intermediate') === null && L.cautionFor({ hi: ft(12), lo: ft(9) }, 'advanced') === null, 'only Beginner gets the caution');
console.log(ok ? 'ALL OK' : 'SOME FAILED'); process.exit(ok ? 0 : 1);
