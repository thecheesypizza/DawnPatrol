import os
import json
exec(open('tests/harness.py', encoding='utf-8').read())
PINS=[{'id':'pin-hb','name':'Huntington Beach','lat':33.655,'lon':-118.003,'face':214,'custom':True}]
def subtab(page, name): pass
fails=[]
def ok(c,m):
    print(('PASS ' if c else 'FAIL ')+m)
    if not c: fails.append(m)
def t(page):
    page.click('.row[data-id="pin-hb"]'); page.wait_for_timeout(2500)
    ok(page.locator('#tide-now').count()==1,'Now tab has a tide section')
    ok(page.locator('#tide-now svg[role=img]').count()==1,'tide graph is drawn')
    txt=page.locator('#tide-now').inner_text()
    ok('Today' in txt and ('Rising' in txt or 'Falling' in txt or 'Slack' in txt),'shows today and the trend: %r'%txt[:90])
    ok(page.locator('#tide-now .tg-ev').count()>=2,'lists the highs and lows for the day (%d)'%page.locator('#tide-now .tg-ev').count())
    ok('NOAA' in txt,'names the NOAA source')
    ok(page.locator('#tide-now svg text:text-is("Now")').count()==1,'draws a Now marker')
    ok(page.locator('#tide-now svg circle').count()>=3,'marks highs, lows and now')
    ok(page.locator('#tide-now [data-tg=prev]').is_disabled(),'cannot step before today')
    page.click('#tide-now [data-tg=next]'); page.wait_for_timeout(300)
    ok('Tomorrow' in page.locator('#tide-now').inner_text(),'next arrow shows tomorrow')
    ok(page.locator('#tide-now .tg-ev').count()>=2,'tomorrow has predictions')
    ok(page.locator('#tide-now svg text:text-is("Now")').count()==0,'no Now marker on another day')
    for i in range(3): page.click('#tide-now [data-tg=next]'); page.wait_for_timeout(120)
    ok(page.locator('#tide-now svg[role=img]').count()==1,'still draws 4 days ahead')
    page.click('#tide-now [data-tg=today]'); page.wait_for_timeout(300)
    ok('Today' in page.locator('#tide-now').inner_text(),'Back to today works')
    # hover reading
    box=page.locator('#tide-now svg .hit').bounding_box()
    page.mouse.move(box['x']+box['width']*0.5, box['y']+40); page.wait_for_timeout(250)
    tip=page.locator('#tide-now .tip')
    ok(tip.is_visible() and 'Tide' in tip.inner_text(),'hover shows a tide reading: %r'%tip.inner_text()[:60])
    page.mouse.move(5,5)
    # keyboard
    page.focus('#tide-now svg'); page.keyboard.press('ArrowRight'); page.wait_for_timeout(200)
    ok(page.locator('#tide-now .sr-live').inner_text().strip()!='','keyboard arrow reads the tide aloud: %r'%page.locator('#tide-now .sr-live').inner_text()[:60])
    # units
    a=page.locator('#tide-now .tg-big').inner_text()
    page.evaluate("S.units=S.units==='imperial'?'metric':'imperial'; fillTides(S.detail.get(S.selId), spotById(S.selId))"); page.wait_for_timeout(300)
    b=page.locator('#tide-now .tg-big').inner_text()
    ok(a!=b,'units switch changes the numbers: %r vs %r'%(a.replace('\n',' '),b.replace('\n',' ')))
    page.evaluate("S.units=S.units==='imperial'?'metric':'imperial'; fillTides(S.detail.get(S.selId), spotById(S.selId))")
    ok(page.evaluate("document.documentElement.scrollWidth<=innerWidth"),'no horizontal overflow on Now')
    pass
    # forecast: the multi-day tide graph sits under "Show more detail"
    page.click('#morebar .morebtn'); page.wait_for_timeout(2500)
    subtab(page,'Tides')
    ok(page.locator('#tides-fc svg[role=img]').count()==1,'Forecast tab has the multi-day tide graph')
    n=page.locator('#tides-fc .tg-day').count(); rg=page.evaluate("S.range")
    ok(n==rg,'one row per day in the range (%d of %d)'%(n,rg))
    ok(page.locator('#tides-fc .tg-day .tg-ev').count()>=n,'each row lists highs and lows')
    page.click('#range button[data-r="14"]'); page.wait_for_timeout(1200); subtab(page,'Tides')
    ok(page.locator('#tides-fc .tg-day').count()>=13,'14 day range gives %d rows'%page.locator('#tides-fc .tg-day').count())
    ok(page.locator('#tides-fc button[data-r]').first.is_visible(),'range chips sit on the tide section itself')
    page.click('#tides-fc button[data-r="3"]'); page.wait_for_timeout(900); subtab(page,'Tides')
    ok(page.evaluate("S.range")==3,'tide range chips drive the forecast range')
    ok(page.locator('#tides-fc .tg-day').count()==3,'3 day range gives 3 rows')
    ok(page.locator('#tides-fc svg text tspan').count()>=4,'short ranges label highs and lows on the graph')
    ok(page.evaluate("document.documentElement.scrollWidth<=innerWidth"),'no horizontal overflow on Forecast')
    pass
    # model fallback
    page.evaluate("(()=>{const D=S.detail.get(S.selId); D.tideN={supported:false}; fillTides(D, spotById(S.selId));})()"); page.wait_for_timeout(400)
    page.wait_for_timeout(300)
    tx=page.locator('#tide-now').inner_text()
    ok('Ocean model' in tx or 'ocean model' in tx,'falls back to the ocean model when NOAA has no station: %r'%tx[-140:])
    ok(page.locator('#tide-now svg[role=img]').count()==1 and page.locator('#tide-now .tg-ev').count()>=2,'model graph has highs and lows (%d)'%page.locator('#tide-now .tg-ev').count())
    # nothing available
    page.evaluate("(()=>{const D=S.detail.get(S.selId); D.tideN=null; D.H.tide=D.H.tide.map(()=>null); fillTides(D, spotById(S.selId));})()"); page.wait_for_timeout(300)
    ok('No tide data' in page.locator('#tide-now').inner_text() and page.locator('#tide-now a').count()==2,'friendly message and links when there is no tide data')
    return None
run('tide-mobile', fn=t, vw=(390,800), ls={'pins':PINS,'sel':'pin-hb'})
def d(page):
    page.wait_for_timeout(2500)
    ok(page.locator('#tide-now svg[role=img]').is_visible(),'desktop shows the Now tide graph')
    page.click('#morebar .morebtn'); page.wait_for_timeout(2500)
    ok(page.locator('#tides-fc svg[role=img]').count()==1,'desktop shows the Forecast tide graph')
run('tide-desk', fn=d, vw=(1280,900), ls={'pins':PINS,'sel':'pin-hb'})
print('FAILED %d' % len(fails) if fails else 'ALL OK')
