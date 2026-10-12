import os
import json, re
exec(open('tests/harness.py', encoding='utf-8').read())
PINS=[{'id':'pin-hb','name':'Huntington Beach','lat':33.655,'lon':-118.003,'face':214,'custom':True}]
def open_report(page):
    page.click('#menu-btn'); page.wait_for_timeout(400)
    if page.locator('#report-sec').count() == 0: page.click('[data-menu=report]'); page.wait_for_timeout(300)
fails = []
def ok(c, m):
    print(('PASS ' if c else 'FAIL ') + m)
    if not c: fails.append(m)

def t(page):
    page.on('dialog', lambda d: d.accept())
    page.evaluate("setTimeout(() => { throw new Error('boom-test-error') }, 10)")
    page.evaluate("setTimeout(() => { Promise.reject(new Error('rejected-test')) }, 20)")
    page.evaluate("console.error('console-test', {a: 1})")
    page.evaluate("fetch('https://dawnpatrol.casadelfuego.org/api/buoy/prjc1?lat=33.65432&lon=-117.98765').catch(() => {})")
    page.wait_for_timeout(1200)
    toast = page.locator('#toast').inner_text() if page.locator('#toast').is_visible() else ''
    ok('Report a problem' in toast or 'went wrong' in toast, 'first error shows a toast pointing to Report a problem: %r' % toast[:80])
    page.wait_for_timeout(4500); open_report(page)
    ok(page.locator('#report-sec').count() == 1, 'settings has the Report a problem section')
    head = page.locator('#report-sec h2').inner_text()
    ok('recorded' in head, 'section header shows counts: %r' % head)
    page.fill('#rp-note', 'The forecast was blank after picking 14 days')
    with page.expect_download() as dl:
        page.click('[data-rp=save]')
    d = dl.value; path = d.path(); txt = open(path, encoding='utf-8').read()
    ok(d.suggested_filename.startswith('dawn-patrol-log-') and d.suggested_filename.endswith('.txt'), 'download named %s' % d.suggested_filename)
    ok('DAWN PATROL PROBLEM REPORT' in txt, 'log has header')
    ok('boom-test-error' in txt, 'log has the thrown error')
    ok('rejected-test' in txt, 'log has the rejected promise')
    ok('console-test' in txt, 'log has console.error')
    ok('HTTP' in txt or 'failed' in txt, 'log has the failed request')
    ok('33.65432' not in txt and '-117.98765' not in txt, 'coordinates are rounded in the log')
    ok('The forecast was blank after picking 14 days' in txt, 'person note is included')
    ok('RECENT ACTIVITY' in txt and 'tap' in txt, 'log has recent taps')
    ok(re.search(r'Browser: .*Chrome', txt) is not None, 'log has the browser')
    ok('Units:' in txt and 'Screen:' in txt, 'log has settings and screen')
    ok('dp.auth' not in txt and 'password' not in txt.lower(), 'no secrets in log')
    page.fill('#rp-note', 'hello & goodbye')
    url = page.evaluate("reportMailUrl(reportText())")
    ok(url.startswith('mailto:dawnpatrol.reports@example.com?subject=Dawn%20Patrol%20problem%20report&body='), 'mailto url is addressed to the developer')
    ok(len(url) < 2400, 'mailto url short enough (%d)' % len(url))
    ok('hello%20%26%20goodbye' in url, 'mailto body carries the note')
    page.click('[data-rp=view]'); page.wait_for_timeout(200)
    ok(page.locator('#rp-pre').is_visible() and 'boom-test-error' in page.locator('#rp-pre').inner_text(), 'preview shows the log')
    page.click('[data-rp=copy]'); page.wait_for_timeout(300)
    ok(page.locator('#rp-msg').inner_text() != '', 'copy gives feedback: %r' % page.locator('#rp-msg').inner_text()[:60])
    # persistence across reload
    page.reload(); page.wait_for_timeout(2500)
    n = page.evaluate("DPLOG.entries().filter(e => e.m.includes('boom-test-error')).length")
    ok(n >= 1, 'log survives a reload (%d)' % n)
    open_report(page)
    page.click('[data-rp=clear]'); page.wait_for_timeout(500)
    n2 = page.evaluate("DPLOG.entries().filter(e => e.m.includes('boom-test-error')).length")
    ok(n2 == 0, 'clear removes the old entries')
    # log size stays bounded
    cnt = page.evaluate("(() => { for (let i = 0; i < 1500; i++) DPLOG.add('tap', 'x' + i); return DPLOG.entries().length; })()")
    ok(cnt <= 400, 'ring buffer bounded (%d)' % cnt)
    # the app still works when localStorage throws
    return None
run('report', fn=t, vw=(390, 800), ls={'pins': PINS, 'sel': 'pin-hb'})
print('FAILED %d' % len(fails) if fails else 'ALL OK')
