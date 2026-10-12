/* test15: Scripps Pier algae report (CalHABMAP via SCCOOS ERDDAP) and the bloom push.
   Run: node test15.mjs   (imports ./index.js; reads ../src/60-app.js and ../sw.js-source in ../src; no network, no browser) */
import { readFileSync } from 'node:fs';
import { habParse, habSummary, habAlertText } from './index.js';
let bad = 0; const ok = (c, m) => { console.log((c ? 'ok ' : 'FAIL ') + m); if (!c) bad++; };
const cols = 'time,Temp,Salinity,Avg_Chloro,Akashiwo_sanguinea,Alexandrium_spp,Dinophysis_spp,Lingulodinium_polyedra,Prorocentrum_spp,Pseudo_nitzschia_delicatissima_group,Pseudo_nitzschia_seriata_group,pDA,Total_Phytoplankton';
const units = 'UTC,degree_C,,mg/m3,cells/L,cells/L,cells/L,cells/L,cells/L,cells/L,cells/L,ng/mL,cells/L';
const mk = rows => [cols, units, ...rows].join('\n');
const now = Date.parse('2026-10-12T12:00:00Z') / 1000;
const rows = habParse(mk(['2026-08-31T18:14:00Z,23.8,33.2,1.4,0.0,0.0,0.0,410.0,0.0,0.0,821.0,NaN,70563.0', '2026-09-08T18:18:00Z,19.7,,1.01,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN', '2026-10-05T18:52:00Z,23.3,,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN']));
ok(rows.length === 3 && rows[2].Temp === 23.3 && rows[2].Avg_Chloro === null && rows[1].Salinity === null, 'parses the ERDDAP CSV; NaN and blanks become null');
let s = habSummary(rows, now);
ok(s.status === 'ok' && s.water.temp === 23.3 && s.counts.t === rows[0].t && s.chl.v === 1.01 && s.alertKey === '' && s.flags.length === 0, 'each value keeps its own newest sample (temperature Oct 5, counts Aug 31)');
ok(/No algae bloom flagged/.test(habAlertText(s).body), 'quiet wording when nothing is flagged');
s = habSummary(habParse(mk(['2026-08-31T18:14:00Z,23.8,33.2,1.4,0,0,0,0,0,0,50000,0,70563', '2026-10-05T18:52:00Z,23.3,,,,,,,,,,,'])), now);
ok(s.flags.length === 0, 'counts older than 28 days never raise a flag');
s = habSummary(habParse(mk(['2026-10-05T18:52:00Z,22.9,33.1,8.2,0,0,0,250000,0,2000,24000,0.8,900000'])), now);
ok(s.status === 'bloom' && s.alertKey.split('+').sort().join() === 'ling,pda,pn', 'Pseudo-nitzschia over 10,000, domoic acid over 0.5 and red tide alga over 100,000 are all flagged');
const a = habAlertText(s); ok(a.status === 'bloom' && /Pseudo-nitzschia 24,000 cells\/L\./.test(a.body) && /0\.8 ng\/mL/.test(a.body) && /Oct 5/.test(a.body) && /county advisories/.test(a.body), 'bloom wording names the values, the sample date and tells people to check advisories');
ok(habSummary(habParse(mk(['2026-10-05T18:52:00Z,22.9,,,0,0,0,0,0,10000,10000,0.5,1'])), now).status === 'ok', 'exactly at the bloom levels is not a bloom (must exceed)');
s = habSummary(habParse(mk(['2026-08-01T18:52:00Z,22.9,,,0,0,0,0,0,0,99999,0,1'])), now);
ok(s.status === 'stale' && habAlertText(s).status === 'stale' && s.alertKey === '', 'a sample set older than 21 days is stale and never alerts');
ok(habParse('').length === 0 && habSummary([], now).status === 'stale' && habParse(mk(['garbage'])).length === 0, 'bad input gives no rows and a stale summary');
const w = readFileSync(new URL('./index.js', import.meta.url), 'utf8'), app = readFileSync(new URL('../src/60-app.js', import.meta.url), 'utf8');
let sw = ''; try { sw = readFileSync(new URL('../cf/sw.js', import.meta.url), 'utf8'); } catch (e) { try { sw = readFileSync(new URL('../src/sw.js', import.meta.url), 'utf8'); } catch (e2) { sw = ''; } }
ok(/p === "\/api\/sccoos"/.test(w) && /p === "\/api\/sccoos\/alert"/.test(w) && /km > HAB\.km/.test(w), 'Worker has both routes and refuses points more than 60 km from the pier');
ok(/rec\.bloom/.test(w) && /hab:alerted/.test(w) && /if \(!rec\.bloom\) \{ await env\.SITE\.delete/.test(w), 'hourly job only pushes to bloom subscribers, once per new flag set, and drops retired subscriptions');
ok(!/XWEATHER|xweather/i.test(w + app), 'Xweather is not in the Worker or the app');
ok(/function fillHab/.test(app) && /id="hab-body"/.test(app) && /fillHab\(D, spot\)/.test(app) && /habFacts\(spot, v\.sst\)/.test(app), 'app draws the algae card and adds the pier temperature to the Water tile');
ok(/id="bl-on"/.test(app) && /bloomToggle\(t\)/.test(app) && /if \(!store\.get\('bloom', false\)\) stopOldPush\(reg\)/.test(app), 'menu switch exists and the old-push cleanup leaves a bloom subscription alone');
ok(/userVisibleOnly: true/.test(app) && /bloom: true/.test(app), 'subscribing asks for visible notifications and flags the subscription as bloom');
ok(!sw || (/\/api\/sccoos\/alert/.test(sw) && !/unsubscribe/.test(sw)), 'service worker shows the fetched wording and no longer unsubscribes');
process.exit(bad ? 1 : 0);
