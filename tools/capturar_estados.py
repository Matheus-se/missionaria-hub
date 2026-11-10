"""Estados interativos para a revisão final: respostas, opções, inventário, envio e a passagem das etapas."""
import asyncio

from playwright.async_api import async_playwright

URL = 'http://127.0.0.1:4321/'
PASTA = '.impeccable/review'


async def rolar(page, seletor: str, extra: int = 0, espera: int = 900) -> None:
    await page.evaluate(
        """([s, extra]) => {
            const el = document.querySelector(s);
            const y = el.getBoundingClientRect().top + window.scrollY + extra;
            if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
        }""",
        [seletor, extra],
    )
    await page.wait_for_timeout(espera)


async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome')
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto(URL, wait_until='networkidle')
        await page.evaluate('localStorage.clear()')
        await page.reload(wait_until='networkidle')
        await page.wait_for_timeout(2600)

        await rolar(page, '[data-palco]', 0, 1200)
        await rolar(page, '.processo-topo', 2600, 1600)
        await page.screenshot(path=f'{PASTA}/estado-etapas.png')

        await rolar(page, '#perguntas', 300)
        await page.fill('#r-a1', 'Avisar a igreja inteira de um culto especial com um toque, e ver quem confirmou presença.')
        await page.click('[data-pergunta="a3"] [data-valor="Membros"]')
        await page.click('[data-pergunta="a3"] [data-valor="Líderes de célula"]')
        await page.wait_for_timeout(500)
        await rolar(page, '[data-pergunta="a1"]', -120, 700)
        await page.screenshot(path=f'{PASTA}/estado-respostas.png')

        await page.click('[data-indice="inventario"]')
        await page.wait_for_timeout(1600)
        await page.click('[data-linha="Culto ao vivo"] [data-uso="InPeace"]')
        await page.click('[data-linha="Culto ao vivo"] [data-importancia="Essencial"]')
        await page.click('[data-linha="Agenda de cultos e eventos"] [data-uso="Eklesia"]')
        await page.click('[data-linha="Agenda de cultos e eventos"] [data-uso="InPeace"]')
        await page.click('[data-linha="Agenda de cultos e eventos"] [data-importancia="Essencial"]')
        await page.wait_for_timeout(500)
        await rolar(page, '[data-inventario]', -160, 700)
        await page.screenshot(path=f'{PASTA}/estado-inventario.png')

        await page.click('[data-indice="conversa"]')
        await page.wait_for_timeout(1600)
        await page.click('[data-dias] [data-valor="Terça"]')
        await page.click('[data-periodos] [data-valor="Noite"]')
        await page.click('[data-unica] [data-valor="Sim, podem gravar"]')
        await page.wait_for_timeout(500)
        await rolar(page, '[data-agenda]', -260, 700)
        await page.screenshot(path=f'{PASTA}/estado-agenda.png')

        await rolar(page, '#enviar', 0, 1200)
        await page.screenshot(path=f'{PASTA}/estado-envio.png')

        await page.reload(wait_until='networkidle')
        await page.wait_for_timeout(1500)
        restaurado = await page.evaluate("document.querySelector('[data-salvo]').textContent")
        contagem = await page.evaluate("document.querySelector('.indice [data-respondidas]').textContent")
        print('após recarregar:', restaurado, '| respondidas:', contagem)

        celular = await browser.new_page(viewport={'width': 390, 'height': 844})
        await celular.goto(URL, wait_until='networkidle')
        await celular.wait_for_timeout(1500)
        await rolar(celular, '#perguntas', 700)
        await celular.screenshot(path=f'{PASTA}/estado-perguntas-celular.png')
        await browser.close()


asyncio.run(main())
