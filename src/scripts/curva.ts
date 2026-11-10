import { area, caminhoReal, falhaReal, pontoDaMudanca } from '../lib/curva';

const grafico = document.querySelector<HTMLElement>('[data-grafico]');

if (grafico) {
  const real = grafico.querySelector<SVGPathElement>('[data-real]');
  const marca = grafico.querySelector<SVGCircleElement>('[data-marca]');
  const marcaTexto = grafico.querySelector<SVGTextElement>('[data-marca-texto]');
  const rotuloReal = grafico.querySelector<SVGTextElement>('[data-rotulo-real]');
  const contagem = grafico.querySelector<HTMLElement>('[data-contagem]');
  const rotulo = grafico.querySelector<HTMLElement>('[data-contagem-rotulo]');
  const mudar = grafico.querySelector<HTMLButtonElement>('[data-mudar]');
  const zerar = grafico.querySelector<HTMLButtonElement>('[data-zerar]');
  const maximo = Number(grafico.dataset.maximo ?? 6);
  let mudancas = Number(grafico.dataset.mudancas ?? 3);

  let primeiraVez = true;
  const desenhar = () => {
    const d = caminhoReal(mudancas);
    const inicial = primeiraVez;
    primeiraVez = false;
    if (real && window.__animarCurva && !inicial) window.__animarCurva(real, d);
    else real?.setAttribute('d', d);
    const fim = area.y1 - falhaReal(1, mudancas) * (area.y1 - area.y0);
    rotuloReal?.setAttribute('y', String(fim - 16));
    if (contagem) contagem.textContent = String(mudancas);
    if (rotulo) rotulo.textContent = mudancas === 1 ? 'mudança com o aplicativo pronto' : 'mudanças com o aplicativo pronto';
    const visivel = mudancas > 0;
    marca?.setAttribute('opacity', visivel ? '1' : '0');
    if (marcaTexto) marcaTexto.style.visibility = visivel ? '' : 'hidden';
    if (visivel && marca && marcaTexto) {
      const p = pontoDaMudanca(0, mudancas);
      marca.setAttribute('cx', String(p.x));
      marca.setAttribute('cy', String(p.y));
      marcaTexto.setAttribute('x', String(p.x - 16));
      marcaTexto.setAttribute('y', String(p.y - 46));
    }
    if (mudar) mudar.disabled = mudancas >= maximo;
    if (zerar) zerar.disabled = mudancas === 0;
    if (!inicial) grafico.dispatchEvent(new CustomEvent('curva:mudou', { detail: { mudancas } }));
  };

  mudar?.addEventListener('click', () => {
    mudancas = Math.min(maximo, mudancas + 1);
    desenhar();
  });

  zerar?.addEventListener('click', () => {
    mudancas = 0;
    desenhar();
  });

  desenhar();
}
