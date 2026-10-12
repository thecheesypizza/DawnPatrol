"""The streamlined app: your own spots only, a map with search and pin drop, one page per spot, settings in a menu."""
import os, json, time
exec(open('tests/harness.py').read())
fails = []
def ok(c, m):
    print(('PASS ' if c else 'FAIL ') + m)
    if not c: fails.append(m)

PINS = [{'id': 'pin-aaa111', 'name': 'North Jetty', 'lat': 33.65, 'lon': -118.0, 'face': 225, 'custom': True},
        {'id': 'pin-bbb222', 'name': 'The Point', 'lat': 33.47, 'lon': -117.72, 'face': 240, 'custom': True}]
noflow = lambda page: page.evaluate("document.documentElement.scrollWidth<=innerWidth")
vis = lambda page, sel: page.locator(sel).count() > 0 and page.locator(sel).first.is_visible()

def tap_map(page, fx=0.5, fy=0.7):
    b = page.locator('#map').bounding_box(); page.mouse.click(b['x'] + b['width'] * fx, b['y'] + b['height'] * fy)

def empty_mobile(page):
    ok(page.get_attribute('#app', 'data-view') == 'home', 'starts on the home view')
    ok(vis(page, '#q') and vis(page, '#pin-btn') and vis(page, '#layers-btn'), 'search, Drop pin and Map layers are on screen')
    ok(page.locator('.sm-marks .mk').count() == 0, 'no preset spots on the map (%d markers)' % page.locator('.sm-marks .mk').count())
    ok('Add your first spot' in page.locator('#rank').inner_text(), 'empty state invites the first spot')
    for sel in ['#nav', '#region', '#when', '#find-btn', '#cmp-btn', '#trip-btn', '#ov-ais', '#ov-adsb', '#traffic', '#acct-btn', '#logger', '#tripm', '#cmpm', '#finder', '#glance', '#tab-me', '#tab-cams']:
        ok(page.locator(sel).count() == 0, 'removed: %s' % sel)
    body = page.locator('body').inner_text()
    ok('Aircraft' not in body and 'AIS' not in body and 'ADS-B' not in body, 'no ships or aircraft anywhere on the page')
    ok(page.evaluate("typeof SPOTS==='undefined' && typeof REGIONS==='undefined'"), 'no preset spot list in the code')
    ok(page.evaluate("typeof trLoad==='undefined' && typeof openCompare==='undefined' && typeof tripRender==='undefined' && typeof saveLog==='undefined' && typeof syncNow==='undefined' && typeof pushAction==='undefined'"), 'traffic, compare, trips, log, sync and alerts code is gone')
    ok(noflow(page), 'no horizontal overflow on the empty home view')
    # drop a pin by tapping the water
    page.click('#pin-btn'); page.wait_for_timeout(200)
    ok(page.get_attribute('#pin-btn', 'aria-pressed') == 'true' and 'Tap the water' in page.locator('.sm-hint').inner_text(), 'Drop pin arms the map with a hint')
    page.keyboard.press('Escape'); page.wait_for_timeout(150)
    ok(page.get_attribute('#pin-btn', 'aria-pressed') == 'false', 'Escape cancels pin mode')
    page.click('#rank [data-act=startpin]'); page.wait_for_timeout(200)
    ok(page.get_attribute('#pin-btn', 'aria-pressed') == 'true', 'the empty-state button arms pin mode too')
    tap_map(page, 0.35, 0.75); page.wait_for_timeout(900)
    ok(page.locator('#namer').is_visible(), 'tapping the water asks for a name')
    page.fill('#namer-in', 'Test Reef'); page.click('#namer-form button[type=submit]'); page.wait_for_timeout(2500)
    ok(page.evaluate("S.pins.length") == 1 and page.evaluate("S.pins[0].name") == 'Test Reef', 'the pin is saved with its name')
    ok(page.evaluate("JSON.parse(localStorage.getItem('dp.pins')).length") == 1, 'and stored on the device')
    ok(page.get_attribute('#app', 'data-view') == 'spot', 'the new spot opens straight away')
    ok(page.locator('#dhead h1').inner_text() == 'Test Reef', 'spot page is titled with the name')
    ok(page.evaluate("S.pins[0].face") == 220 and page.evaluate("S.pins[0].faceAuto===true"), 'beach direction detected from the coastline')
    ok(page.locator('#rightnow .card').count() >= 6, 'Right now tiles are drawn (%d)' % page.locator('#rightnow .card').count())
    page.click('[data-act=back]'); page.wait_for_timeout(500)
    ok(page.get_attribute('#app', 'data-view') == 'home', 'back returns to the map')
    ok(page.locator('#rank .row').count() == 1 and page.locator('.sm-marks .mk').count() == 1, 'one row and one marker')
    # search adds a spot
    page.fill('#q', 'Huntington'); page.press('#q', 'Enter'); page.wait_for_timeout(800)
    ok(page.locator('#results button[data-k]').count() == 2, 'search lists the places it found')
    page.click('#results button[data-k="0"]'); page.wait_for_timeout(2500)
    ok(page.evaluate("S.pins.length") == 2 and page.evaluate("S.pins[1].name") == 'Huntington Beach', 'picking a result adds it as a spot')
    ok(page.get_attribute('#app', 'data-view') == 'spot', 'and opens it')
    page.go_back(); page.wait_for_timeout(500)
    ok(page.get_attribute('#app', 'data-view') == 'home', 'the browser back button returns to the map')
    page.fill('#q', 'Huntington'); page.press('#q', 'Enter'); page.wait_for_timeout(800); page.click('#results button[data-k="0"]'); page.wait_for_timeout(1200)
    ok(page.evaluate("S.pins.length") == 2, 'picking a place that is already a spot does not add it twice')
    return None
run('empty-mobile', fn=empty_mobile)

def spot_mobile(page):
    page.click('.row[data-id="pin-aaa111"]'); page.wait_for_timeout(2500)
    ok(page.get_attribute('#app', 'data-view') == 'spot', 'tapping a spot opens its page')
    for sel, name in [('#dhead .badge[data-b]', 'score badge'), ('.verdict', 'summary sentence'), ('#haz', 'alerts'), ('#rightnow', 'Right now'), ('#tide-now svg[role=img]', 'tide graph'), ('#best-days .day', 'day cards'), ('#planner .pl-cell', 'hour planner'), ('#charts .chartbox', 'swell and wind charts')]:
        ok(page.locator(sel).count() > 0, 'spot page has the %s' % name)
    ok(page.locator('#charts .chartbox').count() == 3, 'three core charts (%d)' % page.locator('#charts .chartbox').count())
    ok(page.locator('#tab-xnow').inner_html().strip() == '' and page.locator('#tab-xfc').inner_html().strip() == '', 'extra detail is closed by default')
    ok('Show more detail' in page.locator('#morebar').inner_text(), 'Show more detail button')
    ok(page.locator('#rightnow [data-tile=size]').count() == 1, 'estimated surf size leads the tiles')
    ok(noflow(page), 'no horizontal overflow on the spot page')
    page.click('#rightnow [data-tile=wind]'); page.wait_for_timeout(500)
    ok(page.locator('#tile').is_visible() and 'Wind' in page.locator('#tile-h').inner_text(), 'tapping a tile opens its details')
    page.keyboard.press('Escape'); page.wait_for_timeout(200)
    # more detail
    page.click('#morebar .morebtn'); page.wait_for_timeout(3500)
    want = ['cmp-fig', 'swell-arr', 'more-cond', 'buoy-now', 'lineup-now', 'water-adv', 'comfort', 'crowd-now', 'sources-now', 'me-now', 'why-score', 'an-sec', 'replay-sec', 'tides-fc', 'fbody-x', 'acc-sec', 'mc-sec', 'buoy-sec']
    miss = [w for w in want if page.locator('#' + w).count() == 0]
    ok(not miss, 'more detail adds every extra section (missing %s)' % miss)
    ok(page.locator('#charts-x .chartbox').count() >= 6, 'all hourly charts are under more detail (%d)' % page.locator('#charts-x .chartbox').count())
    ok(page.locator('#bcharts .chartbox').count() >= 2, 'buoy charts load')
    ok(page.evaluate("localStorage.getItem('dp.xopen')") == 'true', 'the open state is remembered')
    page.click('#mc-body [data-act=mc-load]'); page.wait_for_timeout(2500)
    ok(page.locator('#mc-charts .chartbox').count() >= 2, 'model comparison loads')
    page.click('#fview button[data-f=table]'); page.wait_for_timeout(500)
    ok(page.locator('#fbody-x table.t tr').count() > 20, 'hourly table view')
    page.click('#fview button[data-f=chart]'); page.wait_for_timeout(500)
    page.click('#range button[data-r="14"]'); page.wait_for_timeout(1500)
    ok(page.locator('#best-days .day').count() >= 13 and page.evaluate("S.range") == 14, '14-day range')
    ok(page.locator('#tides-fc .tg-day').count() >= 13, 'and the tides ahead follow it')
    page.click('#range button[data-r="7"]'); page.wait_for_timeout(1200)
    ok(noflow(page), 'no horizontal overflow with more detail open')
    page.click('#morebar .morebtn'); page.wait_for_timeout(500)
    ok(page.locator('#tab-xnow').inner_html().strip() == '', 'hiding the extra detail removes it')
    # planner filter tucked away
    ok(page.locator('#planner-sec details.plf').count() == 1 and page.locator('#planner-sec details.plf[open]').count() == 0, 'hour filters are tucked into a closed panel')
    # edit spot
    page.click('#dhead .spotedit > summary'); page.wait_for_timeout(200)
    page.select_option('#pin-face', '270'); page.wait_for_timeout(1500)
    ok(page.evaluate("S.pins.find(p=>p.id==='pin-aaa111').face") == 270 and 'faces W' in page.locator('#dhead .meta').inner_text(), 'changing the beach direction updates the spot')
    ok(page.locator('#dhead .spotedit[open]').count() == 1, 'Edit spot stays open after the redraw')
    page.click('[data-act=renamepin]'); page.wait_for_timeout(300); page.fill('#namer-in', 'Jetty North'); page.click('#namer-form button[type=submit]'); page.wait_for_timeout(500)
    ok(page.locator('#dhead h1').inner_text() == 'Jetty North', 'rename works')
    page.click('[data-act=delpin]'); page.wait_for_timeout(800)
    ok(page.evaluate("S.pins.length") == 1 and page.get_attribute('#app', 'data-view') == 'home', 'remove takes you back to the map')
    ok(page.locator('#toast button').count() == 1 and 'Undo' in page.locator('#toast').inner_text(), 'remove offers Undo')
    page.click('#toast button'); page.wait_for_timeout(1500)
    ok(page.evaluate("S.pins.length") == 2 and page.evaluate("S.pins[0].id") == 'pin-aaa111', 'Undo restores the spot in its place')
    # the planner filter has its own open state
    page.evaluate("document.querySelector('#planner-sec details.plf').open=true"); page.wait_for_timeout(150)
    ok(page.evaluate("S.plfOpen===true") and page.evaluate("S.editOpen") == page.evaluate("!!document.querySelector('#dhead .spotedit[open]')"), 'opening the hour filter does not change Edit spot')
    # closing help keeps the phone back button working
    page.click('.row[data-id="pin-aaa111"]'); page.wait_for_timeout(1500)
    page.click('#menu-btn'); page.wait_for_timeout(300); page.click('[data-menu=help]'); page.wait_for_timeout(300); page.click('#help-close'); page.wait_for_timeout(200)
    ok(page.evaluate("history.state && history.state.dp") == 'spot', 'closing help keeps the history entry for the spot page')
    page.go_back(); page.wait_for_timeout(400)
    ok(page.get_attribute('#app', 'data-view') == 'home', 'and Back still returns to the map')
    # share link adds a pin
    url = page.evaluate("location.origin+location.pathname+shareHash(S.pins[1])")
    ok('#pin=' in url, 'share links carry the pin')
    return None
run('spot-mobile', fn=spot_mobile, ls={'pins': PINS, 'sel': 'pin-aaa111'})

def menu(page):
    page.click('#menu-btn'); page.wait_for_timeout(400)
    ok(page.locator('#menu').is_visible(), 'Menu opens settings')
    txt = page.locator('#menu').inner_text()
    for w in ['Units', 'Dark mode', 'Your surfing level', 'Your spots', 'Offline', 'Accessibility', 'Install', 'Help']:
        ok(w in txt, 'settings has %s' % w)
    for w in ['Account', 'Sign in', 'alert', 'Alert', 'morning summary', 'crew', 'Crew', 'Session log', 'Watchlist', 'Favorites']:
        ok(w not in txt, 'settings has no %s' % w)
    m0 = page.locator('#rank .row .m').first.inner_text()
    page.click('#units button[data-u=metric]'); page.wait_for_timeout(500)
    m1 = page.locator('#rank .row .m').first.inner_text()
    ok(' m at ' in m1 and m0 != m1, 'units switch to metres: %r' % m1)
    ok(page.get_attribute('#units button[data-u=metric]', 'aria-pressed') == 'true', 'units button shows the choice')
    page.click('#units button[data-u=imperial]'); page.wait_for_timeout(300)
    t0 = page.evaluate("document.documentElement.dataset.theme"); page.click('#themer'); page.wait_for_timeout(300)
    ok(page.evaluate("document.documentElement.dataset.theme") != t0 and page.get_attribute('#themer', 'aria-checked') == 'true', 'dark mode switch')
    page.click('#themer'); page.wait_for_timeout(200)
    page.select_option('#pf-level', 'beginner'); page.wait_for_timeout(300)
    ok(page.evaluate("S.prof.level") == 'beginner', 'level is saved')
    page.select_option('#a11y-text', 'large'); page.wait_for_timeout(200)
    ok(page.evaluate("document.documentElement.dataset.text") == 'large', 'text size')
    page.select_option('#a11y-text', 'normal')
    page.click('[data-menu=report]'); page.wait_for_timeout(300)
    ok(page.locator('#report-sec').count() == 1, 'Report a problem opens inside settings')
    # export then import into a fresh state
    page.click('[data-menu=export]'); page.wait_for_timeout(300)
    ok(page.locator('#xport').is_visible() and not page.locator('#menu').is_visible(), 'export opens and settings closes')
    ok(page.locator('#x-list input[data-xc=spots]').is_checked(), 'spots are ticked')
    ok(page.locator('#x-link').count() == 0, 'no server share link')
    txt = page.locator('#x-text').input_value(); page.click('#x-close')
    page.evaluate("S.pins.splice(1,1); store.set('pins',S.pins); renderRank()")
    page.click('#menu-btn'); page.wait_for_timeout(300); page.click('[data-menu=import]'); page.wait_for_timeout(300)
    page.fill('#i-text', txt); page.wait_for_timeout(300)
    ok('Spots (2)' in page.locator('#i-prev').inner_text(), 'import preview counts the spots')
    page.click('#i-go'); page.wait_for_timeout(1500)
    ok(page.evaluate("S.pins.length") == 2, 'import adds the missing spot and skips the one already there')
    page.click('#menu-btn'); page.wait_for_timeout(300); page.click('[data-menu=help]'); page.wait_for_timeout(300)
    ok(page.locator('#helpm').is_visible() and page.locator('#help-body details').count() >= 25, 'help opens with answers (%d)' % page.locator('#help-body details').count())
    ht = page.locator('#help-body').inner_text().lower()
    ok('ship' not in ht and 'aircraft' not in ht and 'crew' not in ht and 'favorite' not in ht and 'session log' not in ht, 'help no longer mentions removed features')
    page.fill('#help-q', 'tide'); page.wait_for_timeout(200)
    ok(page.locator('#help-body details').count() >= 2, 'help search')
    page.keyboard.press('Escape'); page.wait_for_timeout(200)
    # map layers and forecast playback
    page.click('#layers-btn'); page.wait_for_timeout(300)
    ok(page.locator('#layers').is_visible() and page.locator('#layers #base').count() == 1 and page.locator('#layers #mapplay').count() == 1, 'map layers panel holds styles, overlays and playback')
    page.click('#base button[data-b=sat]'); page.wait_for_timeout(200)
    ok(page.evaluate("S.base") == 'sat', 'satellite base')
    page.fill('#mp-i', '24'); page.dispatch_event('#mp-i', 'input'); page.wait_for_timeout(300)
    ok(page.evaluate("S.when.kind") == 'ahead' and 'Scores for' in page.locator('#rank .rank-h').inner_text(), 'scrubbing the forecast changes the list scores')
    page.fill('#mp-i', '0'); page.dispatch_event('#mp-i', 'input'); page.wait_for_timeout(200)
    page.fill('#mp-i', '30'); page.dispatch_event('#mp-i', 'input'); page.wait_for_timeout(200)
    page.click('#layers-close'); page.wait_for_timeout(200)
    ok(not page.locator('#layers').is_visible(), 'Done closes the panel')
    ok(page.evaluate("S.when.kind") == 'now' and 'Scores right now' in page.locator('#rank .rank-h').inner_text(), 'closing the panel puts the scores back to now')
    return noflow(page)
run('menu', fn=menu, ls={'pins': PINS, 'sel': 'pin-aaa111'})

def desk(page):
    ok(vis(page, '#scout') and vis(page, '#detail'), 'desktop shows the map and the spot page side by side')
    ok(not vis(page, '[data-act=back]'), 'no back button on desktop')
    ok(page.locator('#dhead h1').inner_text() == 'North Jetty', 'selected spot is open')
    page.click('.row[data-id="pin-bbb222"]'); page.wait_for_timeout(2500)
    ok(page.locator('#dhead h1').inner_text() == 'The Point' and vis(page, '#scout'), 'picking another spot keeps the map in view')
    page.click('#menu-btn'); page.wait_for_timeout(300); page.click('[data-menu=layout]'); page.wait_for_timeout(500)
    ok(vis(page, '#lay-banner') and page.locator('.lay-bar').count() >= 4, 'Edit layout decorates the spot page sections (%d)' % page.locator('.lay-bar').count())
    page.locator('#rightnow .lay-bar button[data-lay=hide]').click(); page.wait_for_timeout(200)
    page.click('#lay-done'); page.wait_for_timeout(300)
    ok(not vis(page, '#rightnow'), 'a hidden section stays hidden after editing')
    page.reload(); page.wait_for_timeout(3500)
    ok(not vis(page, '#rightnow'), 'and after a reload')
    page.click('#menu-btn'); page.wait_for_timeout(300); page.click('[data-menu=layout-reset]'); page.wait_for_timeout(400)
    ok(vis(page, '#rightnow'), 'Reset layout brings it back')
    page.keyboard.press('Escape')
    return noflow(page)
run('desktop', fn=desk, vw=(1280, 860), ls={'pins': PINS, 'sel': 'pin-aaa111'})

def desk_empty(page):
    ok('Add your first spot' in page.locator('#tab-now').inner_text(), 'desktop with no spots shows the start card on the right')
    ok(not vis(page, '#morebar'), 'no more-detail button without a spot')
    page.click('#tab-now [data-act=startpin]'); page.wait_for_timeout(200)
    ok(page.get_attribute('#pin-btn', 'aria-pressed') == 'true', 'start card arms pin mode')
    return None
run('desktop-empty', fn=desk_empty, vw=(1280, 860))

def legacy(page):
    ok(page.evaluate("S.pins.length") == 1 and page.locator('#dhead h1').inner_text() == 'Old Pin', 'an old pin survives the update and opens')
    ok(page.locator('.sm-marks .mk').count() == 1, 'old favorites of preset spots do not come back as markers')
    return None
run('legacy-storage', fn=legacy, ls={'pins': [{'id': 'pin-old1', 'name': 'Old Pin', 'lat': 33.6, 'lon': -117.9, 'face': 220, 'custom': True, 'region': 'Your pins'}], 'fav': ['hbpier', 'pin-old1'], 'home': 'hbpier', 'sel': 'hbpier', 'region': 'Hawaii', 'traffic': {'ships': True, 'air': True}, 'layout': {'cams': {'o': ['x'], 'h': []}}})

def shared(page):
    page.wait_for_timeout(1500)
    ok(page.evaluate("S.pins.length") == 1 and page.evaluate("S.pins[0].name") == 'Shared Break', 'a shared link adds the spot')
    ok(page.evaluate("location.hash") == '', 'and clears the link so a reload does not add it again')
    return None
run('shared-link', fn=shared, hash='#pin=33.6,-117.9,230&name=Shared%20Break')

def limit(page):
    many = [{'id': 'pin-l%02d' % k, 'name': 'Spot %d' % k, 'lat': 33 + k * 0.05, 'lon': -118 + k * 0.02, 'face': 240, 'custom': True} for k in range(24)]
    page.evaluate("p=>{S.pins.length=0;p.forEach(x=>S.pins.push(x));store.set('pins',S.pins);renderRank()}", many)
    page.evaluate("dropPin(33.2,-117.4,'One more')"); page.wait_for_timeout(300)
    ok(page.evaluate("S.pins.length") == 24 and 'up to 24' in page.locator('#toast').inner_text(), 'the 24-spot limit holds')
    page.evaluate("location.hash='#pin=34.1,-119.2,200&name=Too%20Many'"); page.wait_for_timeout(600)
    ok(page.evaluate("S.pins.length") == 24 and 'up to 24' in page.locator('#toast').inner_text(), 'a shared link at the limit says so instead of claiming success')
    page.evaluate("location.hash='#spot=hbpier'"); page.wait_for_timeout(400)
    ok('no longer built in' in page.locator('#toast').inner_text(), 'old preset-spot links explain themselves')
    page.evaluate("S.pins.pop(); dropPin(10,190.5,'Over the line')"); page.wait_for_timeout(300)
    ok(abs(page.evaluate("S.pins[S.pins.length-1].lon") + 169.5) < 0.01, 'a tap past the date line is saved as a valid longitude')
    return None
run('limit', fn=limit)

ok(not ERRS, 'no page errors: %s' % ERRS[:3])
print('FAILED %d' % len(fails) if fails else 'ALL OK')
