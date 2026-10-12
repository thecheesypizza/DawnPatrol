import os
import json, subprocess, urllib.parse
from playwright.sync_api import sync_playwright
D = None
def synth(kind, url):
    q = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)
    lats = [float(x) for x in q['latitude'][0].split(',')]; lons = [float(x) for x in q['longitude'][0].split(',')]
    days = int(q['forecast_days'][0]); hourly = q.get('hourly',[''])[0].split(',')
    js = """
const D=require('./src/30-data.js'); const pts=%s.map((a,i)=>({lat:a[0],lon:a[1],face:270}));
let out = %s==='m' ? D.synthMarine(pts,%d,%s) : D.synthWeather(pts,%d,{});
if(%s==='m') out=out; console.log(JSON.stringify(out));""" % (json.dumps(list(zip(lats,lons))), json.dumps(kind), days, json.dumps(hourly), days, json.dumps(kind))
    out = subprocess.run(['node','-e',js],capture_output=True,text=True,cwd=os.getcwd()).stdout
    arr = json.loads(out)
    if kind=='w':
        keep = set(hourly)|{'time'}
        for r in arr:
            r['hourly']={k:v for k,v in r['hourly'].items() if k in keep}
            if 'current' not in q: r.pop('current',None)
            if 'daily' not in q: r.pop('daily',None)
    return arr if len(arr)>1 else arr[0]
calls=[]
with sync_playwright() as p:
    b=p.chromium.launch(); page=b.new_context(viewport={'width':1280,'height':860}).new_page(); errs=[]
    page.on('pageerror', lambda e: errs.append(str(e)))
    def marine(route): calls.append(('marine',route.request.url[:110])); route.fulfill(status=200, content_type='application/json', headers={'access-control-allow-origin':'*'}, body=json.dumps(synth('m',route.request.url)))
    def wx(route): calls.append(('wx',route.request.url[:110])); route.fulfill(status=200, content_type='application/json', headers={'access-control-allow-origin':'*'}, body=json.dumps(synth('w',route.request.url)))
    page.route('**/marine-api.open-meteo.com/**', marine); page.route('**/api.open-meteo.com/**', wx)
    page.route('**/embed.windy.com/**', lambda r: r.fulfill(status=200, body='<html>windy</html>', content_type='text/html'))
    page.goto(('file://'+os.getcwd()+'/dist/dawn-patrol.html')); page.wait_for_timeout(3500)
    print('status:', page.locator('#status-t').inner_text(), '| rank rows:', page.locator('#rank .row').count(), '| first:', page.locator('#rank .row .n').first.inner_text())
    page.click('#nav button[data-go="cams"]'); page.wait_for_timeout(300); print('windy iframe:', page.locator('.embed iframe').count())
    print('calls:', len(calls)); [print(' ',c) for c in calls[:4]]
    print('errors:', errs); b.close()
