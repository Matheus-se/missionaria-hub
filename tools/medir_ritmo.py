"""Mede o ritmo vertical: distância entre o fim do conteúdo de uma seção e o começo da seguinte."""
import asyncio
import sys

from playwright.async_api import async_playwright

LARGURA = int(sys.argv[1]) if len(sys.argv) > 1 else 1512
ALTURA = int(sys.argv[2]) if len(sys.argv) > 2 else 860


async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome')
        page = await browser.new_page(viewport={'width': LARGURA, 'height': ALTURA}, reduced_motion='reduce')
        await page.goto('http://127.0.0.1:4321/', wait_until='networkidle')
        await page.evaluate('document.fonts.ready')
        dados = await page.evaluate(
            """() => {
              const secoes = [...document.querySelectorAll('main > section, body > footer.secao')];
              const tinta = (el) => {
                let topo = Infinity, base = -Infinity;
                el.querySelectorAll('h1,h2,h3,p,li,dd,dt,svg,button,a,figure,textarea,ol,ul,.grade,.estudo-apps,.questionario-corpo').forEach((n) => {
                  if (n.closest('[hidden]') || n.closest('.cantos')) return;
                  const c = n.getBoundingClientRect();
                  if (!c.height || getComputedStyle(n).visibility === 'hidden') return;
                  topo = Math.min(topo, c.top + scrollY); base = Math.max(base, c.bottom + scrollY);
                });
                return [topo, base];
              };
              return secoes.map((s) => {
                const c = s.getBoundingClientRect();
                const [t, b] = tinta(s);
                return { id: s.id || s.className.split(' ')[0], preta: s.classList.contains('secao--preta'), topo: Math.round(c.top + scrollY), base: Math.round(c.bottom + scrollY), tintaTopo: Math.round(t), tintaBase: Math.round(b) };
              });
            }"""
        )
        for a, b in zip(dados, dados[1:]):
            if a['preta'] == b['preta']:
                print(f"{a['id']:>14} → {b['id']:<14} mesma cor: vão de conteúdo {b['tintaTopo'] - a['tintaBase']}px")
            else:
                print(f"{a['id']:>14} → {b['id']:<14} troca de cor: respiro antes {a['base'] - a['tintaBase']}px, depois {b['tintaTopo'] - b['topo']}px")
        await browser.close()


asyncio.run(main())
