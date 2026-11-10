const corpo = document.querySelector<HTMLElement>('.questionario-corpo');
const CHAVE_PARTE = 'missionaria-hub:parte:v1';

if (corpo) {
  const secoes = [...corpo.querySelectorAll<HTMLElement>('[data-parte]')];
  const ids = secoes.map((s) => s.dataset.parte ?? '');
  const links = [...corpo.querySelectorAll<HTMLAnchorElement>('[data-indice]')];

  const inicial = () => {
    const hash = location.hash.replace('#parte-', '');
    if (ids.includes(hash)) return hash;
    const salva = localStorage.getItem(CHAVE_PARTE) ?? '';
    return ids.includes(salva) ? salva : ids[0];
  };

  const rolarParaOTopo = () => {
    const alvo = corpo.getBoundingClientRect().top + window.scrollY;
    if (window.__rolarPara) window.__rolarPara(alvo);
    else window.scrollTo({ top: alvo - 72 });
  };

  const ativar = (id: string, rolar: boolean) => {
    secoes.forEach((secao) => {
      const ativa = secao.dataset.parte === id;
      secao.classList.toggle('ativa', ativa);
      secao.toggleAttribute('hidden', !ativa);
    });
    links.forEach((link) => link.setAttribute('aria-current', String(link.dataset.indice === id)));
    try {
      localStorage.setItem(CHAVE_PARTE, id);
    } catch {
      /* sem armazenamento local, a parte ativa só não é lembrada */
    }
    if (rolar) {
      rolarParaOTopo();
      const primeiro = corpo.querySelector<HTMLElement>(`[data-parte="${id}"] .parte-titulo`);
      primeiro?.setAttribute('tabindex', '-1');
      primeiro?.focus({ preventScroll: true });
    }
    window.dispatchEvent(new Event('resize'));
  };

  corpo.classList.add('passo-a-passo');
  ativar(inicial(), false);

  links.forEach((link) =>
    link.addEventListener('click', (evento) => {
      evento.preventDefault();
      ativar(link.dataset.indice ?? ids[0], true);
    }),
  );

  corpo.addEventListener('click', (evento) => {
    const botao = (evento.target as Element).closest<HTMLButtonElement>('[data-ir-parte]');
    if (!botao) return;
    ativar(botao.dataset.irParte ?? ids[0], true);
  });

  document.addEventListener(
    'click',
    (evento) => {
      const link = (evento.target as Element).closest<HTMLAnchorElement>('a[href^="#parte-"]');
      if (!link || link.hasAttribute('data-indice')) return;
      const id = link.getAttribute('href')!.replace('#parte-', '');
      if (!ids.includes(id)) return;
      evento.preventDefault();
      ativar(id, true);
    },
    true,
  );

  window.addEventListener('hashchange', () => {
    const id = location.hash.replace('#parte-', '');
    if (ids.includes(id)) ativar(id, true);
  });
}

export {};
