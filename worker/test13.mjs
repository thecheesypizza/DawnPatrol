/* test13: accessibility options (color-blind colors, easier font, spacing), Read aloud and chart sound.
   Run: node test13.mjs   (reads ../src/60-app.js, ../src/50-charts.js and ../src/10-head.html and checks their structure; it does not play audio) */
import { readFileSync } from 'node:fs';
export function run(app, charts, css) {
    const res = [], ok = (n, c) => res.push([n, !!c]);
    const seg = (s, a, n) => { const i = s.indexOf(a); return i < 0 ? '' : s.slice(i, i + n); };
    const ra = app.slice(app.indexOf('function raScript'), app.indexOf('function raUi'));
    const cs = seg(app, 'function cleanA11y', 1200);
    ok('settings clean cvd, font and read-aloud speed', /\bcvd\b/.test(cs) && /\bfont\b/.test(cs) && /\brate\b/.test(cs));
    ok('applyA11y sets the cvd and font attributes', /r\.dataset\.cvd/.test(app) && /r\.dataset\.font/.test(app));
    ok('three new selects exist', ['a11y-cvd', 'a11y-font', 'a11y-rate'].every(id => app.indexOf(id) > 0));
    ok('read aloud script exists and ends with the estimates line', ra.length > 500 && /These are model estimates\. Check the surf and local advice before you go in\./.test(ra));
    ok('read aloud script is built from numbers only: no network, no AI', !/fetch\(|XMLHttpRequest|https?:/.test(ra));
    ok('read aloud mentions the beginner caution and alerts', /cautionFor/.test(ra) && /Weather alert/.test(ra));
    ok('read aloud prefers an on-device voice', /localService/.test(app));
    ok('read aloud can pause and stop', /function raPause/.test(app) && /function raEnd/.test(app));
    ok('read aloud bar only appears on the Now tab', /if \(raOK\(\)\) h \+= raBar\(\);/.test(app));
    ok('read aloud stops when the page is hidden', /pagehide/.test(app));
    ok('chart sound exists and is capped at 40 notes', /function sndPlay/.test(charts) && /40/.test(seg(charts, 'function sndPlay', 700)));
    ok('chart sound uses a 220 Hz base and a 1760 Hz now marker', /220/.test(charts) && /1760/.test(charts));
    ok('chart sound button only shows when audio is supported', /sndOK\(\)/.test(seg(charts, 'function makeChart', 9000)));
    ok('tide curve has a sound button', /data-snd="tide"/.test(app));
    ok('color-blind tokens exist', /:root\[data-cvd="on"\]\s*\{/.test(css));
    const m = css.match(/:root\[data-cvd="on"\]\s*\{([^}]*)\}/), hex = m ? (m[1].match(/--q\d:\s*(#[0-9A-Fa-f]{6})/g) || []).map(x => x.slice(-7).toUpperCase()) : [];
    ok('five distinct color-blind score colors', hex.length === 5 && new Set(hex).size === 5);
    ok('patterns back up the colors at every level', [1, 2, 3, 4].every(n => css.indexOf('[data-b="' + n + '"]') > 0));
    ok('easier font option and wide paragraph spacing exist', /:root\[data-font="easy"\]/.test(css) && /html\[data-spacing="wide"\] \.app :is\(/.test(css));
    ok('Atkinson is not in the default page load', css.indexOf('Atkinson') > 0 && !/Atkinson/.test(css.slice(0, css.indexOf('<style>'))));
    ok('forced colors are handled', /forced-colors/.test(css));
    ok('Help explains Read aloud', /What does Read aloud do\?/.test(app));
    return res;
  }

if (process.argv[1] && process.argv[1].endsWith('test13.mjs')) {
  const d = u => readFileSync(new URL(u, import.meta.url), 'utf8');
  const r = run(d('../src/60-app.js'), d('../src/50-charts.js'), d('../src/10-head.html'));
  r.forEach(([n, c]) => console.log((c ? 'ok   ' : 'FAIL ') + n));
  const bad = r.filter(x => !x[1]).length; console.log(r.length - bad + '/' + r.length + ' passed'); process.exit(bad ? 1 : 0);
}
