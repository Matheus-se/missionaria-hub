import sys
from PIL import Image
import numpy as np
def boxes(path):
    im=np.array(Image.open(path).convert('L')).astype(int)
    out={}
    def bb(x0,y0,x1,y1,dark=True,th=128):
        sub=im[y0:y1,x0:x1]; m=(sub<th) if dark else (sub>th); ys,xs=np.where(m)
        return None if len(xs)==0 else (int(xs.min()+x0),int(ys.min()+y0),int(xs.max()+x0+1),int(ys.max()+y0+1))
    out['mark']=bb(40,10,108,80); out['name']=bb(110,28,320,64); out['nav']=bb(360,30,840,66)
    out['l1']=bb(40,190,800,279); out['l2']=bb(40,279,800,352); out['l3']=bb(40,352,800,432)
    out['sub']=bb(40,436,800,486); out['cta']=bb(40,495,400,590); out['ctaLabel']=bb(75,515,320,565,dark=False,th=150)
    out['P']=bb(40,190,120,279)
    out['sym']=bb(830,20,1280,652); out['band']=[y for y in range(600,720) if (im[y,20:1260]<60).mean()>0.95][:1]
    return out
a=boxes(sys.argv[1]); b=boxes(sys.argv[2])
for k in a: print(f"{k:9s} comp {a[k]}  build {b[k]}")
