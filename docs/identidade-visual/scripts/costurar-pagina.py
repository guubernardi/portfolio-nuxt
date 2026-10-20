"""Junta as fatias do capturar-pagina.mjs numa imagem só, por aparelho.

Uso:
    python costurar-pagina.py <pasta-das-fatias>

Gera, na mesma pasta:
- desktop.png (1280 de largura) e mobile.png (360): vão para a galeria do case
- desktop@2x.png e mobile@3x.png: resolução cheia, para recortar telas dos
  mockups e as fatias do carrossel

Na galeria, o celular costuma passar de 16383 px de altura, o limite do WebP.
Nesse caso salve em JPG (qualidade perto de 68).
Precisa de: pip install pillow
"""
import glob
import json
import os
import re
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
pasta = sys.argv[1]
for rotulo in ('desktop', 'mobile'):
    info = os.path.join(pasta, f'{rotulo}.json')
    if not os.path.exists(info):
        continue
    m = json.load(open(info))
    dpr, total, largura = m['dpr'], m['total'], m['largura']
    tela = Image.new('RGB', (largura * dpr, total * dpr), 'white')
    for f in sorted(glob.glob(os.path.join(pasta, f'{rotulo}-*.png'))):
        y = int(re.search(r'-(\d+)\.png$', f).group(1))
        tela.paste(Image.open(f).convert('RGB'), (0, y * dpr))
    tela.save(os.path.join(pasta, f'{rotulo}@{dpr}x.png'))
    tela.resize((largura, total), Image.LANCZOS).save(os.path.join(pasta, f'{rotulo}.png'))
    print(f'{rotulo}: {largura}x{total}')
