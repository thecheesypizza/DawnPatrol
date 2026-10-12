/* test14: Source menu (right click, press and hold, and the Source button) and its links.
   Run: node test14.mjs   (reads ../src/60-app.js, ../src/50-charts.js and ../src/10-head.html and checks their structure; it does not open a browser) */
import { readFileSync } from 'node:fs';
export function run(app, charts, css) {
    const res = [], ok = (n, c) => res.push([n, !!c]);
    const i0 = app.indexOf('const SRCM ='), i1 = app.indexOf('/* Keeps Tab and Shift+Tab'), blk = i0 >= 0 && i1 > i0 ? app.slice(i0, i1) : '';
    ok('source menu block exists', blk.length > 3000);
    ok('every forecast chart has its own raw-data link', ['Swell height', 'Swell period', 'Wind', 'Sea surface temperature', 'Ocean current', 'Barometric pressure', 'Cloud cover', 'Visibility', 'Rain amount', 'Air temperature', 'Chance of rain'].every(t => blk.indexOf("'" + t + "': [") > 0));
    ok('tide charts, buoy, alerts, surf zone and water sections are covered', ['tide-now', 'tides-fc', 'buoy-now', 'buoy-sec', "case 'haz'", "case 'srf'", 'water-adv', 'comfort', 'mc-sec', 'acc-sec'].every(k => blk.indexOf(k) > 0));
    ok('charts remember their English title for the menu', /box\.dataset\.chart = title/.test(charts));
    ok('links open in a new tab without a referrer', /target="_blank" rel="noopener noreferrer"/.test(blk));
    const hosts = (blk.match(/https?:\/\/([a-z0-9.-]+)/g) || []).map(x => x.replace(/^https?:\/\//, ''));
    const allowed = /^(marine-api\.open-meteo\.com|api\.open-meteo\.com|air-quality-api\.open-meteo\.com|ensemble-api\.open-meteo\.com|open-meteo\.com|tidesandcurrents\.noaa\.gov|www\.ndbc\.noaa\.gov|www\.weather\.gov|forecast\.weather\.gov|api\.weather\.gov|watersgeo\.epa\.gov|gml\.noaa\.gov|www\.openstreetmap\.org|mywaterquality\.ca\.gov|www\.weatherapi\.com|www\.visualcrossing\.com|erddap\.sccoos\.org|calhabmap\.org)$/;
    ok('only free, documented providers are linked', hosts.length > 10 && hosts.every(h => allowed.test(h)));
    ok('no paid provider is mentioned', !/accuweather|surfline|stormglass/i.test(blk));
    ok('the menu makes no network calls of its own', !/\bfetch\(|XMLHttpRequest/.test(blk));
    ok('right click is replaced everywhere', /document\.addEventListener\('contextmenu'/.test(blk) && /e\.preventDefault\(\);\s*if \(touch\)/.test(blk));
    ok('text boxes keep the browser menu', /input, textarea, select, \[contenteditable\]/.test(blk));
    ok('Shift plus right click gives the browser menu', /e\.shiftKey && e\.button === 2/.test(blk));
    ok('long press is about half a second and cancels on movement', /550\)/.test(blk) && /> 10\)/.test(blk));
    ok('the click after a long press is swallowed', /SRCM\.swallow = Date\.now\(\) \+ 500/.test(blk) && /SRCM\.swallow > Date\.now\(\)/.test(blk));
    ok('the touch menu avoids sitting under the finger', /T = y - r\.height - 18/.test(blk));
    ok('a visible Source button is added to headings', /className = 'srcb'/.test(blk) && /aria-haspopup/.test(blk));
    ok('menu supports keyboard: arrows, Home, End, Escape', ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape'].every(k => blk.indexOf("'" + k + "'") > 0));
    ok('the Source button does not change layout names', (app.match(/small, \.srcb/g) || []).length >= 2);
    ok('Help explains the Source menu', /Can I see where a number comes from\?/.test(app));
    ok('menu styles, touch targets and forced colors exist', /\.srcm \{/.test(css) && /\.srcb \{/.test(css) && /pointer: coarse\) \{ \.srcb/.test(css) && /forced-colors: active\) \{ \.srcm/.test(css));
    return res;
  }

if (process.argv[1] && process.argv[1].endsWith('test14.mjs')) {
  const d = u => readFileSync(new URL(u, import.meta.url), 'utf8');
  const r = run(d('../src/60-app.js'), d('../src/50-charts.js'), d('../src/10-head.html'));
  r.forEach(([n, c]) => console.log((c ? 'ok   ' : 'FAIL ') + n));
  const bad = r.filter(x => !x[1]).length; console.log(r.length - bad + '/' + r.length + ' passed'); process.exit(bad ? 1 : 0);
}
