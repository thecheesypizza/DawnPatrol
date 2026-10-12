import re,hashlib,json
s=open('dist/dawn-patrol.html',encoding='utf-8').read()
m=re.search(r'<style>\n(.*?)</style>\n<div class="app"',s,flags=re.S)
css=m.group(1)
s=s.replace(m.group(0),'<link rel="stylesheet" href="/style.css">\n<div class="app"')
s=s.replace('<title>Dawn Patrol</title>\n','',1)
s=s.replace('</style></head><body>','</style><title>Dawn Patrol</title><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/apple-touch-icon.png"></head><body>',1)
src={n:open('src/'+n,encoding='utf-8').read() for n in ['05-log.js','30-data.js','35-coast.js','37-services.js','38-me.js','39-tides.js','40-map.js','50-charts.js','60-app.js']}
big=re.search(r'<script>\n.*?</script>',s,flags=re.S)
orig=big.group(0)[len('<script>\n'):-len('</script>')]
assert orig==''.join(src[n] for n in src)
s=s.replace(big.group(0),'<script src="/data.js"></script>\n<script src="/map.js"></script>\n<script src="/charts.js"></script>\n<script src="/app.js"></script>')
files={'sw.js':open('src/sw.js',encoding='utf-8').read(),'manifest.webmanifest':open('pwa/manifest.webmanifest',encoding='utf-8').read(),'index.html':s,'style.css':css,'data.js':src['05-log.js']+src['30-data.js']+src['35-coast.js']+src['37-services.js']+src['38-me.js']+src['39-tides.js'],'map.js':src['40-map.js'],'charts.js':src['50-charts.js'],'app.js':src['60-app.js']}
for n,c in files.items():
    open('cf/'+n,'w',encoding='utf-8',newline='').write(c)
    print(n,len(c.encode()),hashlib.sha256(c.encode()).hexdigest()[:16])
