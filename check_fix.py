import os,re,json
miss=[]
base=r'C:/Users/sarth/OneDrive/Desktop/campus-sync/src'
for root,dirs,files in os.walk(base):
    dirs[:] = [d for d in dirs if d not in ('node_modules','dist','.git')]
    for f in files:
        if f.endswith(('.js','.jsx')):
            p=os.path.join(root,f)
            try:
                with open(p,encoding='utf-8',errors='ignore') as fh:
                    txt=fh.read()
            except: continue
            for m in re.findall(r\"from ['\"]([^'\"]+)['\"]\", txt):
                if m.startswith('.'):
                    bp=os.path.dirname(p)
                    t=os.path.normpath(os.path.join(bp,m))
                    cands=[t,t+'.js',t+'.jsx',t+'.ts',t+'.tsx',os.path.join(t,'index.js'),os.path.join(t,'index.jsx')]
                    if not any(os.path.exists(x) for x in cands):
                        miss.append({'f':p.replace('\\\\','/'),'im':m})
print('NONE' if not miss else json.dumps(miss, indent=2))
