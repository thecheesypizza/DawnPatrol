"""Shared test harness: serves the built page from dist/ with every network call answered by local fakes."""
import os
import json, math, time
from playwright.sync_api import sync_playwright
exec(open('tests/livetest.py').read().split('calls=[]')[0])
now=int(time.time()); T=[now-3600*h for h in range(72*2,-1,-1)]  # 30-min? use hourly*2 below
rows_t=[now-1800*k for k in range(240,-1,-1)]
def buoy(fail=False):
    n=len(rows_t)
    std={'t':rows_t,'wdir':[250+5*math.sin(i/9) for i in range(n)],'wspd':[4+2*math.sin(i/7) for i in range(n)],'gst':[6+2*math.sin(i/7) for i in range(n)],'wvht':[1.0+0.3*math.sin(i/20) for i in range(n)],'dpd':[12]*n,'apd':[7.5]*n,'mwd':[250]*n,'pres':[1015+math.sin(i/30) for i in range(n)],'atmp':[18]*n,'wtmp':[19]*n,'dewp':[None]*n,'vis':[None]*n,'ptdy':[-0.8]*n,'tide':[None]*n}
    spec={'t':rows_t,'swh':[0.9]*n,'swp':[12]*n,'swd':[202.5]*n,'wwh':[0.4]*n,'wwp':[5]*n,'wwd':[270]*n,'steep':['AVERAGE']*n}
    return {'id':'46253','std':std,'spec':spec}
STAT=[{'id':'46253','name':'San Pedro South, CA (213)','lat':33.57,'lon':-118.18,'type':'buoy','owner':'SCRIPPS','met':True,'km':19},{'id':'prjc1','name':'Los Angeles Pier J','lat':33.7,'lon':-118.18,'type':'fixed','owner':'NOAA','met':True,'km':20}]

import datetime
def tides_data():
    base=int(time.time())//21600*21600-86400; hl=[]
    for k in range(40):
        hl.append({'t':base+k*22350,'v':(1.6 if k%2==0 else 0.1)+0.05*(k%5),'type':'H' if k%2==0 else 'L'})
    return {'supported':True,'station':{'id':'9410680','name':'Huntington Beach','lat':33.65,'lon':-118.0,'km':3},'datum':'MLLW','units':'metric','hilo':hl,'temp':None,'level':None,'source':'NOAA CO-OPS'}
NWS_OK={'supported':True,'office':'SGX','place':'Huntington Beach','zone':'CAZ552','alerts':[{'event':'High Surf Advisory','severity':'Moderate','headline':'High Surf Advisory until 4 AM','description':'Large breaking waves 6 to 9 feet.','instruction':'Stay out of the water.','expires':'2026-10-02T11:00:00Z','sender':'NWS San Diego CA'}],'srf':{'office':'SGX','issued':'2026-09-30T14:00:00Z','id':'x','segment':{'zones':['CAZ552'],'rip':'Moderate','surf':'2 to 4 feet','waterTemp':'66 to 68','uv':'Very High','text':'Rip Current Risk...Moderate.\nSurf Height...2 to 4 feet.'}},'srfUrl':'https://forecast.weather.gov/product.php?site=SGX&product=SRF&issuedby=SGX'}
SPOTS_OK=[{'id':'n1','name':'Secret Cove','lat':33.61,'lon':-117.93,'km':3.2,'kind':''},{'id':'n2','name':'Huntington Beach Pier','lat':33.6554,'lon':-118.0033,'km':8.0,'kind':''}]
HASH=''
def _mt():
    t=[]; d=datetime.datetime.utcnow().replace(minute=0,second=0,microsecond=0)-datetime.timedelta(hours=26)
    return t
MODELS={'marine':None,'wind':None}
def build_models():
    import datetime as dt
    base=dt.datetime.now().replace(minute=0,second=0,microsecond=0)
    base=base.replace(hour=0)
    t=[(base+dt.timedelta(hours=k)).strftime('%Y-%m-%dT%H:%M') for k in range(168)]
    def mk(f): return [round(f(k),2) for k in range(168)]
    MODELS['marine']={'t':t,'off':0,'models':[{'id':'a','name':'ECMWF WAM','h':mk(lambda k:1.2+0.3*math.sin(k/12)),'p':mk(lambda k:12+math.sin(k/9)),'d':mk(lambda k:270)},{'id':'b','name':'NOAA GFS Wave','h':mk(lambda k:0.8+0.3*math.sin(k/12)),'p':mk(lambda k:11),'d':mk(lambda k:270)},{'id':'c','name':'DWD GWAM','h':mk(lambda k:1.6+0.3*math.sin(k/12)),'p':mk(lambda k:13),'d':mk(lambda k:270)}]}
    MODELS['wind']={'t':t,'off':0,'models':[{'id':'g','name':'NOAA GFS','s':mk(lambda k:8+3*math.sin(k/6)),'d':mk(lambda k:200)},{'id':'e','name':'ECMWF IFS','s':mk(lambda k:9+3*math.sin(k/6)),'d':mk(lambda k:200)}]}
build_models()
import time
_e0=int(time.time())//3600*3600-48*3600
CDIP={'supported':True,'grid':'OC_0.001','cell':{'lat':33.6,'lon':-117.95,'distM':420,'depth':9.5},'t':[_e0+k*3600 for k in range(240)],'hs':[round(1.0+0.3*math.sin(k/12),2) for k in range(240)],'tp':[13]*240,'dp':[255+k%10 for k in range(240)],'stepH':6,'source':'CDIP'}
NWSG={'supported':True,'office':'SGX','grid':'1,2','offshoreKm':4,'t':[_e0+k*3600 for k in range(240)],'wh':[round(1.1+0.2*math.sin(k/10),2) for k in range(240)],'wp':[12]*240,'ws':[10]*240,'wd':[250]*240,'hasWaves':True,'hasWind':True}

NWS_OK['srf']['segment']['periods']=[{'label':'Today','rip':'Moderate','surf':'2 to 4 feet'},{'label':'Tonight','rip':'High','surf':None},{'label':'Thu','rip':'Low','surf':'1 to 2 feet'}]
_e1=int(time.time())//3600*3600-24*3600
PAC={'supported':True,'models':[
 {'id':'swan_oahu','name':'PacIOOS SWAN Oahu','kind':'nearshore','cell':{'lat':21.64,'lon':-158.07,'distM':380},'t':[_e1+k*3600 for k in range(150)],'hs':[round(2.0+0.5*math.sin(k/10),2) for k in range(150)],'tp':[14]*150,'dp':[300]*150},
 {'id':'ww3_hawaii','name':'PacIOOS WaveWatch III Hawaii','kind':'regional','cell':{'lat':21.65,'lon':-158.1,'distM':3100},'t':[_e1+k*3600 for k in range(150)],'hs':[round(1.8+0.5*math.sin(k/10),2) for k in range(150)],'tp':[13]*150,'dp':[310]*150}]}
def _ens():
    import datetime as dt
    base=dt.datetime.now().replace(minute=0,second=0,microsecond=0,hour=0)
    t=[(base+dt.timedelta(hours=k)).strftime('%Y-%m-%dT%H:%M') for k in range(336)]
    p50=[round(10+4*math.sin(k/18),1) for k in range(336)]
    return {'supported':True,'t':t,'off':0,'wind':{'p10':[round(v-1-k/60,1) for k,v in enumerate(p50)],'p50':p50,'p90':[round(v+1+k/40,1) for k,v in enumerate(p50)]},'rainProb':[(70 if 40<k<48 else 0) for k in range(336)],'members':82,'models':['ecmwf_ifs025','gfs025']}
ENS=_ens()
_today=datetime.date.today().isoformat()
WQ={'supported':True,'beach':{'name':'Huntington State Beach','city':'Huntington Beach','county':'Orange','epa':'CA857004','km':0.4},'notices':[{'type':'Posting','cause':'Bacterial Standards Violation','date':(datetime.date.today()-datetime.timedelta(days=4)).isoformat(),'reopened':None,'where':'Santa Ana River mouth','source':None},{'type':'Closure','cause':'Sewage spill','date':'2026-03-06','reopened':'2026-03-09','where':None,'source':None}],'dataThrough':'2026-03-06','source':'x','link':'https://mywaterquality.ca.gov/safe-to-swim/safe-to-swim-maps.html'}
def _spec():
    fr=[round(0.0325+0.005*k,4) for k in range(60)]
    def row(shift): return [round(max(0,2.5*math.exp(-((f-(0.07+shift))/0.012)**2)+0.3*math.exp(-((f-0.16)/0.03)**2)),3) for f in fr]
    hist=[row(0.04-0.04*k/47) for k in range(48)]
    return {'id':'46253','freqs':fr,'latest':{'t':now,'e':hist[-1],'dir':[285]*60},'history':{'t':[now-1800*(47-k) for k in range(48)],'e':hist},'source':'x'}
SPEC=_spec()

urls=[]
ERRS=[]
def run(label, buoy_mode='ok', fn=None, vw=(390,800), nws_mode='ok', ls=None, hash=None, offline=False):
    with sync_playwright() as p:
        b=p.chromium.launch(); ctx=b.new_context(viewport={'width':vw[0],'height':vw[1]}); page=ctx.new_page(); errs=[]
        import os
        ctx.add_init_script("(()=>{try{if(!sessionStorage.getItem('lvl')){sessionStorage.setItem('lvl','1');if(localStorage.getItem('dp.lvlask')===null)localStorage.setItem('dp.lvlask','1');}}catch(e){}})()")
        if ls: ctx.add_init_script("(()=>{const s=%s;if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','1');for(const k in s)localStorage.setItem('dp.'+k,JSON.stringify(s[k]));}})()" % json.dumps(ls))
        if os.environ.get('DBGLS'): ctx.add_init_script("(()=>{const o=Storage.prototype.removeItem,c=Storage.prototype.clear;Storage.prototype.removeItem=function(k){if(String(k)=='dp.layout')console.log('LSDBG remove '+new Error().stack.split('\\n').slice(1,5).join('|'));return o.apply(this,arguments)};Storage.prototype.clear=function(){console.log('LSDBG clear '+new Error().stack.split('\\n').slice(1,5).join('|'));return c.apply(this,arguments)};const sI=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(String(k)=='dp.layout')console.log('LSDBG set '+String(v).slice(0,60));return sI.apply(this,arguments)}})()")
        page.on('console', lambda m: print(m.text) if m.text.startswith('LSDBG') else None)
        page.on('pageerror', lambda e: errs.append(str(e)))
        hdr={'access-control-allow-origin':'*'}
        page.route('**/marine-api.open-meteo.com/**', lambda r: r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(synth('m',r.request.url))))
        page.route('**/api.open-meteo.com/**', lambda r: r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(synth('w',r.request.url))))
        page.route('**/air-quality-api.open-meteo.com/**', lambda r: r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps({'hourly':{'time':[(datetime.datetime.now().replace(minute=0,second=0,microsecond=0,hour=0)+datetime.timedelta(hours=k)).strftime('%Y-%m-%dT%H:%M') for k in range(72)],'us_aqi':[42+ (80 if 30<k<40 else 0) for k in range(72)]}})))
        page.route('**/api.bigdatacloud.net/**', lambda r: r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps({'locality':'Huntington Beach','city':'Huntington Beach'})))
        page.route('**/server.arcgisonline.com/**', lambda r: r.abort()); page.route('**/gibs.earthdata.nasa.gov/**', lambda r: (urls.append(r.request.url), r.abort())); page.route('**/gis.charttools.noaa.gov/**', lambda r: (urls.append(r.request.url), r.abort()));  page.route('**/tile.openstreetmap.org/**', lambda r: r.abort()); page.route('**/*.opentopomap.org/**', lambda r: r.abort())
        def bh(r):
            u=r.request.url
            if buoy_mode=='down': return r.abort()
            if buoy_mode=='500': return r.fulfill(status=502,content_type='application/json',headers=hdr,body=json.dumps({'error':'NDBC 503'}))
            if '/api/pacioos' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(PAC))
            if '/api/ensemble' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(ENS))
            if '/api/beachwq' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(WQ))
            if '/api/spectra/' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(SPEC))
            if '/api/cdip' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(CDIP))
            if '/api/nwsgrid' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(NWSG))
            if '/api/nws' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(NWS_OK if nws_mode=='ok' else {'supported':False}))
            if '/api/tides' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(tides_data()))
            if '/api/facing' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps({'ok':True,'face':220,'distM':40,'segments':2,'confidence':0.9}))
            if '/api/spots' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps({'spots':SPOTS_OK}))
            if '/api/models' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(MODELS))
            if '/api/buoys' in u: return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps({'stations':STAT}))
            if '/api/buoy/prjc1' in u: return r.fulfill(status=404,content_type='application/json',headers=hdr,body=json.dumps({'error':'No recent observations for station PRJC1'}))
            return r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps(buoy()))
        page.route('**/geocoding-api.open-meteo.com/**', lambda r: r.fulfill(status=200,content_type='application/json',headers=hdr,body=json.dumps({'results':[{'name':'Huntington Beach','admin1':'California','country':'United States','latitude':33.66,'longitude':-118.0},{'name':'Huntington','admin1':'New York','country':'United States','latitude':40.87,'longitude':-73.43}]})))
        page.route('**/dawnpatrol.casadelfuego.org/api/**', bh)
        if offline:
            for pat in ['**/marine-api.open-meteo.com/**','**/api.open-meteo.com/**','**/dawnpatrol.casadelfuego.org/api/**']: page.unroute(pat)
            page.route('**/*open-meteo.com/**', lambda r: r.abort()); page.route('**/dawnpatrol.casadelfuego.org/**', lambda r: r.abort())
        page.goto(('file://'+os.getcwd()+'/dist/dawn-patrol.html') + (hash if hash is not None else HASH)); page.wait_for_timeout(3500)
        out=fn(page) if fn else None
        print(label,'| errs:',errs,'|',out)
        ERRS.extend(errs)
        b.close(); return out
