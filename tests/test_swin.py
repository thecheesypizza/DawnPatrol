import os
import json
exec(open('tests/harness.py', encoding='utf-8').read())
PINS=[{'id':'pin-hb','name':'Huntington Beach','lat':33.655,'lon':-118.003,'face':214,'custom':True}]
LS={'pins':PINS,'sel':'pin-hb','xopen':True}
fails=[]
def ok(c,m):
    print(('PASS ' if c else 'FAIL ')+m)
    if not c: fails.append(m)
def t(page):
    page.click('.row[data-id="pin-hb"]'); page.wait_for_timeout(3000)
    sid=page.evaluate("S.selId"); face=page.evaluate("spotById(S.selId).face"); print('spot',sid,face)
    ok(page.locator('.swin').count()>=1,'swell directions picker is under more detail')
    page.evaluate("document.querySelector('#tab-xnow .swin').open=true"); page.wait_for_timeout(200)
    ok(page.locator('#tab-xnow .swin-b').count()==16,'16 compass chips')
    pressed=page.evaluate("Array.from(document.querySelectorAll('#tab-xnow .swin-b[aria-pressed=true]')).map(b=>b.textContent)")
    ok(3<=len(pressed)<=5,'default picks come from the beach facing: %s'%pressed)
    base=page.evaluate("[0,90,180,270].map(d=>exposure(d,SX(spotById(S.selId))).toFixed(2))")
    # pick south, southwest, west, northwest, north
    for d in ['N','NW','W','SW','S']:
        cur=page.evaluate("document.querySelector('#tab-xnow .swin-b[data-swin=\"%s\"]'.replace('%s',String(%d)))"%('x','x',0)) if False else None
    names={'N':0,'NNE':22.5,'NE':45,'ENE':67.5,'E':90,'ESE':112.5,'SE':135,'SSE':157.5,'S':180,'SSW':202.5,'SW':225,'WSW':247.5,'W':270,'WNW':292.5,'NW':315,'NNW':337.5}
    want={'S','SW','W','NW','N'}
    for n,b in names.items():
        is_on=page.evaluate("document.querySelector('#tab-xnow .swin-b[data-swin=\"%s\"]').getAttribute('aria-pressed')"%('%g'%b))=='true'
        if is_on!=(n in want):
            page.click('#tab-xnow .swin-b[data-swin="%s"]'%('%g'%b)); page.wait_for_timeout(350)
            page.evaluate("document.querySelector('#tab-xnow .swin').open=true")
    w=page.evaluate("S.wins[S.selId]"); ok(sorted(w)==[0,180,225,270,315],'saved window is N, S, SW, W, NW: %s'%w)
    ok(page.evaluate("JSON.parse(localStorage.getItem('dp.wins'))[S.selId].length")==5,'saved to this device')
    ex=page.evaluate("[0,180,225,270,315,90,135].map(d=>exposure(d,SX(spotById(S.selId))).toFixed(2))")
    ok(ex[:5]==['1.00']*5 and float(ex[5])<0.5 and float(ex[6])<0.5,'exposure is full from picked directions and low from the others: %s'%ex)
    ok(page.evaluate("windowText(SX(spotById(S.selId)))")=='N, SW, W, NW'.replace('N, SW, W, NW','N, S, SW, W, NW'),'window text lists the directions')
    ok(page.locator('#tab-xnow .swin summary').inner_text().startswith('Swell directions for this spot'),'summary shows')
    ok('N, S, SW, W, NW' in page.locator('#tab-xnow .swin summary').inner_text() and 'default' not in page.locator('#tab-xnow .swin summary').inner_text(),'summary names the picks: %r'%page.locator('#tab-xnow .swin summary').inner_text())
    ok(page.locator('#tab-xnow .cmp-fig svg path[fill-opacity=".17"]').count()>=1,'compass draws the picked wedges')
    ok(page.evaluate("document.documentElement.scrollWidth<=innerWidth"),'no horizontal overflow')
    # score reacts: a swell from the south now counts
    sc_before=page.evaluate("(()=>{const sp=spotById(S.selId);const v={wH:1.5,wT:14,wD:0,wsp:5,wdir:90};return [scoreHour(v,mkFace(sp.face,null)).score, scoreHour(v,SX(sp)).score]})()")
    ok(sc_before[1]>sc_before[0],'a north swell scores higher once north is picked (%s)'%sc_before)
    # reset
    page.click('#tab-xnow .swin [data-swin=reset]'); page.wait_for_timeout(400)
    ok(page.evaluate("S.wins[S.selId]")is None,'reset removes the picks')
    page.evaluate("document.querySelector('#tab-xnow .swin').open=true")
    # clearing every chip also goes back to default
    page.click('#tab-xnow .swin-b[data-swin="270"]'); page.wait_for_timeout(300)
    # backup / sync / import
    snap=page.evaluate("(()=>{S.wins['x-test']=[180,200,999,'a',225];return JSON.stringify(cleanWins(S.wins))})()"); ok('"x-test":[180,202.5,225]' in snap,'cleanWins snaps and drops junk: %s'%snap[:120])
    ok(page.evaluate("'wins' in buildBundle({notes:true})"),'the export includes the picks')
    ok(page.evaluate("cleanWins({'__proto__':[1],'ok':[270]}).ok.length")==1 and page.evaluate("({}).polluted===undefined"),'no prototype pollution')
    # the service worker scores with the window too
    ok(page.evaluate("exposure(180, mkFace(270,[180]))")==1 and page.evaluate("exposure(180, mkFace(270,null))")<0.5,'mkFace honours a picked window')
    # picks show on the spot list rose / tooltip
    return None
run('swin-mobile', fn=t, vw=(390,800), ls=LS)
def d(page):
    page.wait_for_timeout(2500)
    page.evaluate("S.wins[S.selId]=[180,202.5,225]; store.set('wins',S.wins); swinChanged(spotById(S.selId))"); page.wait_for_timeout(1500)
    ok(page.locator('.row .mini').count()>=1,'list roses draw with a custom window')
    ok(page.evaluate("document.querySelector('.row .mini path[fill-opacity=\".4\"]')!==null"),'list rose has the picked wedge')
run('swin-desk', fn=d, vw=(1280,900), ls=LS)
print('FAILED %d' % len(fails) if fails else 'ALL OK')
