import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
    __animarCurva?: (caminho: SVGPathElement, d: string) => void;
    __rolarPara?: (alvo: number) => void;
  }
}

type Estado = 'fantasma' | 'traco' | 'cheio';

const raiz = document.documentElement;
const SAIDA = 'expo.out';

const ESTADOS: Record<number, [Estado, Estado, Estado]> = {
  0: ['fantasma', 'fantasma', 'fantasma'],
  1: ['cheio', 'fantasma', 'fantasma'],
  2: ['cheio', 'traco', 'traco'],
  3: ['cheio', 'cheio', 'traco'],
  4: ['cheio', 'cheio', 'cheio'],
  5: ['cheio', 'cheio', 'cheio'],
  6: ['cheio', 'cheio', 'cheio'],
};

if (raiz.classList.contains('tem-movimento')) {
  gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin, DrawSVGPlugin);
  iniciar();
}

function iniciar() {
  const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tempo) => lenis.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);

  const deslocamento = () => (document.querySelector<HTMLElement>('[data-barra]')?.offsetHeight ?? 64) + 8;
  window.__rolarPara = (alvo) => lenis.scrollTo(alvo, { offset: -deslocamento(), duration: 1.2 });

  document.addEventListener('click', (evento) => {
    if (evento.defaultPrevented) return;
    const link = (evento.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href')!.slice(1);
    const alvo = id === 'topo' ? 0 : document.getElementById(id);
    if (alvo === null) return;
    evento.preventDefault();
    lenis.scrollTo(alvo === 0 ? 0 : (alvo as HTMLElement), { offset: alvo === 0 ? 0 : -deslocamento(), duration: 1.4 });
    history.replaceState(null, '', `#${id}`);
  });

  window.__animarCurva = (caminho, d) => {
    gsap.to(caminho, { morphSVG: d, duration: 0.9, ease: SAIDA });
  };

  document.fonts.ready.then(() => {
    entradaDaAbertura();
    ScrollTrigger.refresh();
  });
  pecasDaCarta();
  nomesDosAplicativos();
  obraEmEtapas();
  diasDoCiclo();
  tempoDoGrafico();
  versiculoFinal();
  botoesMagneticos();
}

const estreita = () => window.matchMedia('(max-width: 860px)').matches;

function entradaDaAbertura() {
  const pecas = (nome: string) => `.abertura .simbolo [data-peca="${nome}"]`;
  const linhas = gsap.utils.toArray<HTMLElement>('.abertura .linha-texto');
  const linha = gsap.timeline({
    defaults: { ease: SAIDA },
    onStart: () => raiz.classList.remove('entrada-pendente'),
  });
  linha
    .set([linhas, '.abertura .apoio', '.abertura .cta', '.abertura .simbolo [data-peca]'], { opacity: 1 })
    .from(linhas, estreita() ? { opacity: 0, y: 24, duration: 1.1, stagger: 0.08 } : { yPercent: 108, duration: 1.25, stagger: 0.1 }, 0)
    .from(pecas('coracao'), { y: 90, opacity: 0, duration: 1.5 }, estreita() ? 0.5 : 0.1)
    .from(pecas('chevron'), { y: -150, opacity: 0, duration: 1.35 }, 0.32)
    .from(pecas('losango'), { y: -260, opacity: 0, duration: 1.25 }, 0.52)
    .from('.abertura .apoio', { y: 18, opacity: 0, duration: 1 }, 0.62)
    .from('.abertura .cta', { y: 18, opacity: 0, duration: 1 }, 0.74);
}

function pecasDaCarta() {
  const carta = document.querySelector('.carta');
  if (!carta) return;
  const ritmo: Record<string, number> = { losango: -170, chevron: -85, coracao: 0 };
  for (const [peca, y] of Object.entries(ritmo)) {
    gsap.fromTo(
      `.carta .carta-simbolo [data-peca="${peca}"]`,
      { y: -y * 0.35 },
      { y, ease: 'none', scrollTrigger: { trigger: carta, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
    );
  }
}

function nomesDosAplicativos() {
  const apps = document.querySelector('.estudo-apps');
  if (!apps) return;
  gsap.from('.app-nome', {
    clipPath: 'inset(0% 100% -20% 0%)',
    duration: 1.4,
    ease: 'expo.inOut',
    stagger: 0.16,
    scrollTrigger: { trigger: apps, start: 'top 80%', once: true },
  });

  const ideia = document.querySelector<HTMLElement>('.estudo-ideia');
  if (ideia) {
    const partes = SplitText.create(ideia, { type: 'lines', mask: 'lines', linesClass: 'linha-revelada' });
    gsap.from(partes.lines, {
      yPercent: 105,
      duration: 1.1,
      ease: SAIDA,
      stagger: 0.08,
      scrollTrigger: { trigger: ideia, start: 'top 82%', once: true },
    });
  }
}

function obraEmEtapas() {
  const palco = document.querySelector<HTMLElement>('[data-palco]');
  const trilho = palco?.querySelector<HTMLElement>('[data-trilho]');
  const janela = palco?.querySelector<HTMLElement>('[data-janela]');
  const obra = palco?.querySelector<HTMLElement>('.processo-obra');
  if (!palco || !trilho || !janela || !obra) return;

  const pecas = [...obra.querySelectorAll<SVGPathElement>('[data-peca]')];
  const legenda = palco.querySelector<HTMLElement>('[data-legenda]');
  const progresso = palco.querySelector<HTMLElement>('[data-progresso]');
  const etapas = [...trilho.querySelectorAll<HTMLElement>('.etapa')];
  const nomes = etapas.map((el) => el.querySelector('.etapa-palavra')?.textContent?.trim() ?? '');
  let atual = -1;

  const definirEtapa = (n: number) => {
    if (n === atual) return;
    const anterior = ESTADOS[atual] ?? ESTADOS[0];
    atual = n;
    ESTADOS[n].forEach((estado, i) => {
      const peca = pecas[i];
      if (!peca || peca.classList.contains(estado)) return;
      peca.classList.remove('fantasma', 'traco', 'cheio');
      peca.classList.add(estado);
      if (estado === 'traco' && anterior[i] === 'fantasma') {
        gsap.fromTo(peca, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' });
      }
      if (estado === 'cheio') {
        gsap.fromTo(peca, { scale: 0.94, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.8, ease: SAIDA });
      }
    });
    if (legenda) legenda.textContent = n === 0 ? 'Antes de começar' : `${n} de ${etapas.length} · ${nomes[n - 1]}`;
  };

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (min-height: 620px)', () => {
    palco.classList.add('horizontal');
    const visivel = () => janela.clientWidth;
    const distancia = () => Math.max(0, trilho.scrollWidth - visivel());

    const etapaNoCentro = () => {
      const caixaJanela = janela.getBoundingClientRect();
      const centro = caixaJanela.left + caixaJanela.width / 2;
      let maisPerto = 0;
      let menor = Infinity;
      etapas.forEach((el, i) => {
        const caixa = el.getBoundingClientRect();
        const distanciaAoCentro = Math.abs(caixa.left + caixa.width / 2 - centro);
        if (distanciaAoCentro < menor) {
          menor = distanciaAoCentro;
          maisPerto = i;
        }
      });
      return maisPerto + 1;
    };

    const paradaMaisPerta = (andamento: number) => {
      const total = distancia();
      if (!total) return andamento;
      const paradas = etapas.map((el) => Math.min(1, (el.offsetLeft - etapas[0].offsetLeft) / total));
      paradas.push(1);
      return paradas.reduce((melhor, p) => (Math.abs(p - andamento) < Math.abs(melhor - andamento) ? p : melhor));
    };

    let tween: gsap.core.Tween | undefined;
    tween = gsap.to(trilho, {
      x: () => -distancia(),
      ease: 'none',
      onUpdate: () => {
        const andamento = distancia() ? -Number(gsap.getProperty(trilho, 'x')) / distancia() : 0;
        if (progresso) progresso.style.scale = `${andamento} 1`;
        const gatilho = tween?.scrollTrigger;
        definirEtapa(gatilho && gatilho.progress < 0.015 && andamento < 0.01 ? 0 : etapaNoCentro());
      },
      scrollTrigger: {
        trigger: palco,
        start: () => `top top+=${document.querySelector<HTMLElement>('[data-barra]')?.offsetHeight ?? 64}`,
        end: () => `+=${distancia() * 1.15}`,
        pin: true,
        scrub: 0.7,
        snap: { snapTo: paradaMaisPerta, duration: { min: 0.3, max: 0.8 }, delay: 0.12, ease: 'power2.inOut' },
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeaveBack: () => definirEtapa(0),
      },
    });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gsap.set(trilho, { clearProps: 'transform' });
      palco.classList.remove('horizontal');
      atual = -1;
    };
  });

  definirEtapa(0);
}

function diasDoCiclo() {
  const ciclo = document.querySelector('.ciclo');
  if (!ciclo) return;
  gsap.from('.ciclo-marca', {
    scale: 0,
    duration: 0.6,
    ease: SAIDA,
    stagger: (_i, alvo) => {
      const el = alvo as HTMLElement;
      const dia = Number(el.dataset.dia ?? 0);
      const encontro = Number(el.closest<HTMLElement>('[data-encontro]')?.dataset.encontro ?? 0);
      return dia * 0.07 + encontro * 0.03;
    },
    scrollTrigger: { trigger: ciclo, start: 'top 75%', once: true },
  });
}

function tempoDoGrafico() {
  const grafico = document.querySelector<HTMLElement>('[data-grafico]');
  const tempo = grafico?.querySelector<SVGRectElement>('[data-tempo]');
  if (!grafico || !tempo) return;
  const rotulos = [...grafico.querySelectorAll<SVGTextElement>('[data-revelar-em]')];
  const mostrarRotulos = () => {
    const largura = Number(tempo.getAttribute('width'));
    rotulos.forEach((rotulo) => {
      rotulo.style.opacity = largura >= Number(rotulo.dataset.revelarEm) ? '1' : '0';
    });
  };
  const revelar = gsap.fromTo(
    tempo,
    { attr: { width: 92 } },
    {
      attr: { width: 1000 },
      ease: 'none',
      onUpdate: mostrarRotulos,
      scrollTrigger: { trigger: grafico, start: 'top 80%', end: 'center 55%', scrub: 0.6 },
    },
  );
  mostrarRotulos();
  grafico.addEventListener('curva:mudou', () => {
    if (!revelar.scrollTrigger) return;
    revelar.scrollTrigger.kill();
    gsap.to(tempo, { attr: { width: 1000 }, duration: 0.8, ease: SAIDA, onUpdate: mostrarRotulos });
  });
}

function versiculoFinal() {
  const versiculo = document.querySelector<HTMLElement>('.fecho-versiculo p');
  if (!versiculo) return;
  const partes = SplitText.create(versiculo, { type: 'lines', mask: 'lines', linesClass: 'linha-revelada' });
  gsap.from(partes.lines, {
    yPercent: 110,
    duration: 1.4,
    ease: SAIDA,
    stagger: 0.12,
    scrollTrigger: { trigger: versiculo, start: 'top 85%', once: true },
  });
}

function botoesMagneticos() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.cta, .envio-botoes .botao, .grafico-botoes .botao').forEach((botao) => {
    const irX = gsap.quickTo(botao, 'x', { duration: 0.6, ease: SAIDA });
    const irY = gsap.quickTo(botao, 'y', { duration: 0.6, ease: SAIDA });
    botao.addEventListener('pointermove', (evento) => {
      const caixa = botao.getBoundingClientRect();
      irX(((evento.clientX - caixa.left) / caixa.width - 0.5) * 12);
      irY(((evento.clientY - caixa.top) / caixa.height - 0.5) * 10);
    });
    botao.addEventListener('pointerleave', () => {
      irX(0);
      irY(0);
    });
  });
}
