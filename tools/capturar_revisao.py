"""Capturas oficiais para o gate responsivo e para a revisão final.

Gera .impeccable/review/desktop.png (1440, página inteira) e mobile.png (390, página inteira),
com movimento de entrada desligado. Páginas acima de 16384 px são costuradas em faixas,
com a barra fixa e o índice grudado soltos só durante a captura.
"""
import asyncio

from PIL import Image
from playwright.async_api import async_playwright

URL = 'http://127.0.0.1:4321/'
LIMITE = 16000
SOLTAR = '[data-barra]{display:none!important}.indice{position:static!important}'


async def capturar(browser, largura: int, altura: int, saida: str) -> None:
    page = await browser.new_page(viewport={'width': largura, 'height': altura}, reduced_motion='reduce')
    await page.goto(URL, wait_until='networkidle')
    await page.evaluate('document.fonts.ready')
    await page.wait_for_timeout(600)
    total = await page.evaluate('document.documentElement.scrollHeight')
    if total <= LIMITE:
        await page.screenshot(path=saida, full_page=True)
    else:
        await page.add_style_tag(content=SOLTAR)
        await page.wait_for_timeout(200)
        total = await page.evaluate('document.documentElement.scrollHeight')
        folha = Image.new('RGB', (largura, total), 'white')
        y = 0
        while y < total:
            await page.evaluate(f'window.scrollTo(0, {y})')
            await page.wait_for_timeout(200)
            await page.screenshot(path='/tmp/_faixa.png')
            faixa = Image.open('/tmp/_faixa.png').convert('RGB')
            real = await page.evaluate('window.scrollY')
            folha.paste(faixa, (0, int(real)))
            y += altura
        folha.save(saida)
    print(saida, largura, total)
    await page.close()


async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome')
        await capturar(browser, 1440, 900, '.impeccable/review/desktop.png')
        await capturar(browser, 390, 844, '.impeccable/review/mobile.png')
        await browser.close()


asyncio.run(main())
