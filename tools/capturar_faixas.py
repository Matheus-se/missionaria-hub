"""Captura a página inteira em faixas (o Chrome não passa de 16384 px numa captura só).

Uso: python tools/capturar_faixas.py <url> <prefixo> <largura> <altura_faixa> [--reduce] [--rolar]
Gera <prefixo>-00.png, <prefixo>-01.png... e <prefixo>-inteira.png quando cabe.
"""
import asyncio
import sys

from PIL import Image
from playwright.async_api import async_playwright


async def main() -> None:
    url, prefixo, w, faixa = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
    reduce = '--reduce' in sys.argv
    rolar = '--rolar' in sys.argv
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome')
        page = await browser.new_page(
            viewport={'width': w, 'height': faixa},
            device_scale_factor=1,
            reduced_motion='reduce' if reduce else 'no-preference',
        )
        await page.goto(url, wait_until='networkidle')
        await page.evaluate('document.fonts.ready')
        await page.wait_for_timeout(500)
        altura = await page.evaluate('document.documentElement.scrollHeight')
        arquivos = []
        y = 0
        i = 0
        while y < altura:
            await page.evaluate(f'window.scrollTo(0, {y})')
            await page.wait_for_timeout(900 if rolar else 250)
            nome = f'{prefixo}-{i:02d}.png'
            await page.screenshot(path=nome)
            arquivos.append(nome)
            y += faixa
            i += 1
        await browser.close()
    print(f'altura {altura}px, {len(arquivos)} faixas')
    if altura <= 60000:
        inteira = Image.new('RGB', (w, altura), 'white')
        for n, nome in enumerate(arquivos):
            parte = Image.open(nome).convert('RGB')
            topo = n * faixa
            if topo + faixa > altura:
                corte = topo + faixa - altura
                parte = parte.crop((0, corte, w, faixa))
                topo = altura - parte.height
            inteira.paste(parte, (0, topo))
        inteira.save(f'{prefixo}-inteira.png')


asyncio.run(main())
