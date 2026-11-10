"""Capturas com movimento na largura do notebook do usuário (1512x860).

Salva em .impeccable/review/user-1512-*.png os trechos que ele apontou:
vão entre seções, passagem horizontal, gráfico e versículo final.

Uso: python tools/capturar_1512.py [url]
"""
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4321/'
SAIDA = Path(__file__).resolve().parent.parent / '.impeccable' / 'review'

ROLAR = """([seletor, ajuste, ancora]) => {
  const el = document.querySelector(seletor);
  const r = el.getBoundingClientRect();
  const base = ancora === 'centro' ? r.top + r.height / 2 - innerHeight * 0.5 : r.top;
  const y = base + scrollY + ajuste;
  if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
  else scrollTo(0, y);
}"""


async def ir(pg, seletor, ajuste=0, ancora='topo', espera=1400):
    await pg.evaluate(ROLAR, [seletor, ajuste, ancora])
    await pg.wait_for_timeout(espera)


async def main():
    async with async_playwright() as p:
        navegador = await p.chromium.launch(channel='chrome')
        pg = await navegador.new_page(viewport={'width': 1512, 'height': 860})
        await pg.goto(URL, wait_until='networkidle')
        await pg.wait_for_timeout(2600)
        passos = [
            ('vao-carta-estudo', '#o-que-vimos', -430, 'topo'),
            ('vao-estudo-processo', '.estudo-fonte', -500, 'topo'),
            ('passagem-entrada', '[data-palco]', -200, 'topo'),
            ('passagem-meio', '.processo-topo', 1900, 'topo'),
            ('grafico', '[data-grafico]', 120, 'centro'),
            ('vao-grafico-perguntas', '.curva-conclusao', -300, 'topo'),
            ('fecho', '.fecho', 0, 'topo'),
        ]
        for nome, seletor, ajuste, ancora in passos:
            await ir(pg, seletor, ajuste, ancora, 2200 if nome in ('grafico', 'fecho') else 1400)
            await pg.screenshot(path=str(SAIDA / f'user-1512-{nome}.png'))
            print(f'user-1512-{nome}.png')
        await navegador.close()


asyncio.run(main())
