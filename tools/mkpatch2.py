import difflib, json, hashlib, sys
src, dst = sys.argv[1], sys.argv[2]
out = {}
sh = lambda t: hashlib.sha256(t.encode()).hexdigest()[:16]
for f in sys.argv[3:]:
    a = open(f'{src}/{f}', encoding='utf-8').read(); b = open(f'{dst}/{f}', encoding='utf-8').read()
    A = a.splitlines(keepends=True); B = b.splitlines(keepends=True)
    ops = [[i1, i2, ''.join(B[j1:j2])] for t, i1, i2, j1, j2 in difflib.SequenceMatcher(None, A, B, autojunk=False).get_opcodes() if t != 'equal']
    L = A[:]
    for i1, i2, t in sorted(ops, key=lambda x: -x[0]): L[i1:i2] = [t] if t else []
    assert ''.join(L) == b
    out[f] = {'o': ops, 'p': sh(a), 's': sh(b)}
    print(f, len(ops), 'ops', sum(len(o[2]) for o in ops), 'chars', out[f]['p'], '->', out[f]['s'])
json.dump(out, open('patch3.json', 'w'), separators=(',', ':'))
print(len(open('patch3.json').read()), 'bytes')
