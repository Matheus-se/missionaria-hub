"""Captura a página construída para as revisões do Impeccable.

Uso: python tools/capturar.py <url> <saida.png> <largura> <altura> [--full] [--reduce]
"""
import asyncio
import sys

from playwright.async_api import async_playwright


async def main() -> None:
    url, out, w, h = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
    full = '--full' in sys.argv
    reduce = '--reduce' in sys.argv
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome')
        page = await browser.new_page(
            viewport={'width': w, 'height': h},
            device_scale_factor=1,
            reduced_motion='reduce' if reduce else 'no-preference',
        )
        await page.goto(url, wait_until='networkidle')
        await page.evaluate('document.fonts.ready')
        await page.wait_for_timeout(600)
        await page.screenshot(path=out, full_page=full)
        await browser.close()


asyncio.run(main())
