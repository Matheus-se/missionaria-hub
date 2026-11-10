"""Abre a página com movimento, junta erros do console e captura pontos-chave."""
import asyncio
import sys

from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4321/'
TAG = sys.argv[2] if len(sys.argv) > 2 else 'a'


async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome')
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        erros: list[str] = []
        page.on('console', lambda m: erros.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
        page.on('pageerror', lambda e: erros.append(f'pageerror: {e}'))
        await page.goto(URL, wait_until='networkidle')
        await page.wait_for_timeout(2600)
        await page.screenshot(path=f'/tmp/mov-{TAG}-abertura.png')

        async def ir(seletor: str, extra: int = 0, espera: int = 1400) -> None:
            await page.evaluate(
                """([s, extra]) => {
                    const el = document.querySelector(s);
                    const y = el.getBoundingClientRect().top + window.scrollY + extra;
                    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
                }""",
                [seletor, extra],
            )
            await page.wait_for_timeout(espera)

        await ir('.carta', 200)
        await page.screenshot(path=f'/tmp/mov-{TAG}-carta.png')
        await ir('.estudo-apps', -300)
        await page.screenshot(path=f'/tmp/mov-{TAG}-estudo.png')
        await ir('[data-palco]', 0)
        await page.screenshot(path=f'/tmp/mov-{TAG}-palco-0.png')
        alcance = await page.evaluate(
            "(() => { const t = ScrollTriggerInfo = window.__lenis; return document.querySelector('[data-palco]').parentElement.offsetHeight })()"
        )
        for i, extra in enumerate([700, 1700, 2900]):
            await ir('.processo-topo', extra + 1200)
            await page.screenshot(path=f'/tmp/mov-{TAG}-palco-{i + 1}.png')
        await ir('.ciclo', -200, 2200)
        await page.screenshot(path=f'/tmp/mov-{TAG}-ciclo.png')
        await ir('[data-grafico]', -100, 1600)
        await page.screenshot(path=f'/tmp/mov-{TAG}-grafico.png')
        await page.click('[data-mudar]')
        await page.wait_for_timeout(1200)
        await page.screenshot(path=f'/tmp/mov-{TAG}-grafico-mudou.png')
        await ir('#perguntas', 400, 1200)
        await page.screenshot(path=f'/tmp/mov-{TAG}-perguntas.png')
        print('altura', await page.evaluate('document.documentElement.scrollHeight'), 'palco-pai', alcance)
        print('\n'.join(erros) or 'sem erros no console')
        await browser.close()


asyncio.run(main())
