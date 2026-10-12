import difflib, json, hashlib, sys
old=open(sys.argv[1],encoding='utf-8').read(); new=open(sys.argv[2],encoding='utf-8').read()
A=old.splitlines(keepends=True); B=new.splitlines(keepends=True); ops=[]
for tag,i1,i2,j1,j2 in difflib.SequenceMatcher(None,A,B,autojunk=False).get_opcodes():
    if tag=='equal': continue
    ops.append([i1,i2,''.join(B[j1:j2])])
L=A[:]
for i1,i2,t in reversed(ops): L[i1:i2]=[t]
assert ''.join(L)==new
h=lambda s: hashlib.sha256(s.encode()).hexdigest()[:16]
print(json.dumps({'o':ops,'p':h(old),'s':h(new)},separators=(',',':')))
