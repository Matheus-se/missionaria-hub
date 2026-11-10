interface Pergunta {
  id: string;
  texto: string;
  tipo?: 'inventario' | 'agenda' | 'escolha';
  opcoes?: string[];
  linhas?: string[];
}

interface Parte {
  id: string;
  letra: string;
  titulo: string;
  perguntas: Pergunta[];
}

interface Dados {
  partes: Parte[];
  contato: { whatsapp: string; email: string; nome: string };
}

interface LinhaInventario {
  uso: string[];
  importancia: string;
}

interface Resposta {
  texto?: string;
  selecao?: string[];
  inventario?: Record<string, LinhaInventario>;
  dias?: string[];
  periodos?: string[];
}

type Respostas = Record<string, Resposta>;

const CHAVE = 'missionaria-hub:respostas:v1';
const dadosEl = document.getElementById('dados-perguntas');
const formulario = document.querySelector<HTMLFormElement>('[data-formulario]');

if (dadosEl && formulario) iniciar(JSON.parse(dadosEl.textContent ?? '{}') as Dados, formulario);

function iniciar(dados: Dados, form: HTMLFormElement) {
  const perguntas = dados.partes.flatMap((parte) => parte.perguntas.map((q) => ({ ...q, parte })));
  let respostas: Respostas = carregar();
  let salvarTimer = 0;

  const salvoEl = document.querySelector<HTMLElement>('[data-salvo]');
  const retornoEl = document.querySelector<HTMLElement>('[data-retorno]');

  function carregar(): Respostas {
    try {
      return JSON.parse(localStorage.getItem(CHAVE) ?? '{}') as Respostas;
    } catch {
      return {};
    }
  }

  function gravar() {
    window.clearTimeout(salvarTimer);
    salvarTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(CHAVE, JSON.stringify(respostas));
        const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        if (salvoEl) salvoEl.textContent = `Salvo às ${hora}.`;
      } catch {
        if (salvoEl) salvoEl.textContent = 'Não deu para salvar. Copie as respostas antes de fechar.';
      }
    }, 350);
  }

  function resposta(id: string): Resposta {
    respostas[id] ??= {};
    return respostas[id];
  }

  function respondida(id: string): boolean {
    const r = respostas[id];
    if (!r) return false;
    if (r.texto && r.texto.trim()) return true;
    if (r.selecao && r.selecao.length) return true;
    if (r.dias && r.dias.length) return true;
    if (r.periodos && r.periodos.length) return true;
    if (r.inventario && Object.values(r.inventario).some((l) => l.uso.length || l.importancia)) return true;
    return false;
  }

  function atualizarContagens() {
    let total = 0;
    for (const parte of dados.partes) {
      const feitas = parte.perguntas.filter((q) => respondida(q.id)).length;
      total += feitas;
      const conta = document.querySelector(`[data-conta="${parte.id}"]`);
      if (conta) conta.textContent = `${feitas}/${parte.perguntas.length}`;
    }
    document.querySelectorAll('[data-respondidas]').forEach((el) => (el.textContent = String(total)));
    for (const q of perguntas) {
      form.querySelector(`[data-pergunta="${q.id}"]`)?.setAttribute('data-respondida', String(respondida(q.id)));
    }
    document.documentElement.style.setProperty('--progresso', String(total / perguntas.length));
  }

  function alternar(botao: HTMLButtonElement, lista: string[], valor: string): string[] {
    const ligado = botao.getAttribute('aria-pressed') === 'true';
    botao.setAttribute('aria-pressed', String(!ligado));
    return ligado ? lista.filter((v) => v !== valor) : [...lista, valor];
  }

  function escolherUnica(grupo: Element, botao: HTMLButtonElement) {
    const jaMarcado = botao.getAttribute('aria-checked') === 'true';
    grupo.querySelectorAll<HTMLButtonElement>('[role="radio"]').forEach((b) => {
      b.setAttribute('aria-checked', 'false');
      b.tabIndex = -1;
    });
    if (!jaMarcado) botao.setAttribute('aria-checked', 'true');
    botao.tabIndex = 0;
    return jaMarcado ? '' : botao.dataset.valor ?? botao.dataset.importancia ?? '';
  }

  function aplicarEstado() {
    for (const q of perguntas) {
      const r = respostas[q.id] ?? {};
      const bloco = form.querySelector(`[data-pergunta="${q.id}"]`);
      if (!bloco) continue;
      const area = bloco.querySelector<HTMLTextAreaElement>('textarea');
      if (area) area.value = r.texto ?? '';
      bloco.querySelectorAll<HTMLButtonElement>('[data-multipla] .opcao').forEach((b) => {
        b.setAttribute('aria-pressed', String((r.selecao ?? []).includes(b.dataset.valor ?? '')));
      });
      bloco.querySelectorAll<HTMLButtonElement>('[data-unica] .opcao').forEach((b) => {
        b.setAttribute('aria-checked', String((r.selecao ?? [])[0] === b.dataset.valor));
      });
      bloco.querySelectorAll<HTMLButtonElement>('[data-dias] .opcao').forEach((b) => {
        b.setAttribute('aria-pressed', String((r.dias ?? []).includes(b.dataset.valor ?? '')));
      });
      bloco.querySelectorAll<HTMLButtonElement>('[data-periodos] .opcao').forEach((b) => {
        b.setAttribute('aria-pressed', String((r.periodos ?? []).includes(b.dataset.valor ?? '')));
      });
      bloco.querySelectorAll<HTMLElement>('[data-linha]').forEach((linhaEl) => {
        const l = r.inventario?.[linhaEl.dataset.linha ?? ''];
        linhaEl.querySelectorAll<HTMLButtonElement>('[data-uso]').forEach((b) => {
          b.setAttribute('aria-pressed', String((l?.uso ?? []).includes(b.dataset.uso ?? '')));
        });
        linhaEl.querySelectorAll<HTMLButtonElement>('[data-importancia]').forEach((b) => {
          b.setAttribute('aria-checked', String(l?.importancia === b.dataset.importancia));
        });
      });
    }
    if (Object.keys(respostas).some(respondida) && salvoEl) {
      salvoEl.textContent = 'Respostas anteriores recuperadas.';
    }
    atualizarContagens();
  }

  form.addEventListener('input', (evento) => {
    const area = evento.target;
    if (!(area instanceof HTMLTextAreaElement)) return;
    resposta(area.name).texto = area.value;
    gravar();
    atualizarContagens();
  });

  form.addEventListener('click', (evento) => {
    const botao = (evento.target as Element).closest<HTMLButtonElement>('button.opcao');
    if (!botao) return;
    const bloco = botao.closest<HTMLElement>('[data-pergunta]');
    const id = bloco?.dataset.pergunta;
    if (!id) return;
    const r = resposta(id);

    const linhaEl = botao.closest<HTMLElement>('[data-linha]');
    if (linhaEl) {
      const nome = linhaEl.dataset.linha ?? '';
      r.inventario ??= {};
      const l = (r.inventario[nome] ??= { uso: [], importancia: '' });
      if (botao.dataset.uso) {
        let uso = alternar(botao, l.uso, botao.dataset.uso);
        if (botao.dataset.uso === 'Nenhum' && uso.includes('Nenhum')) uso = ['Nenhum'];
        else if (botao.dataset.uso !== 'Nenhum') uso = uso.filter((u) => u !== 'Nenhum');
        l.uso = uso;
        linhaEl.querySelectorAll<HTMLButtonElement>('[data-uso]').forEach((b) => {
          b.setAttribute('aria-pressed', String(uso.includes(b.dataset.uso ?? '')));
        });
      } else if (botao.dataset.importancia) {
        l.importancia = escolherUnica(botao.closest('[role="radiogroup"]')!, botao);
      }
    } else if (botao.closest('[data-unica]')) {
      const valor = escolherUnica(botao.closest('[data-unica]')!, botao);
      r.selecao = valor ? [valor] : [];
    } else if (botao.closest('[data-dias]')) {
      r.dias = alternar(botao, r.dias ?? [], botao.dataset.valor ?? '');
    } else if (botao.closest('[data-periodos]')) {
      r.periodos = alternar(botao, r.periodos ?? [], botao.dataset.valor ?? '');
    } else if (botao.closest('[data-multipla]')) {
      r.selecao = alternar(botao, r.selecao ?? [], botao.dataset.valor ?? '');
    }
    gravar();
    atualizarContagens();
  });

  form.addEventListener('keydown', (evento) => {
    const alvo = evento.target as HTMLElement;
    if (alvo.getAttribute('role') !== 'radio') return;
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(evento.key)) return;
    const grupo = [...(alvo.closest('[role="radiogroup"]')?.querySelectorAll<HTMLButtonElement>('[role="radio"]') ?? [])];
    const atual = grupo.indexOf(alvo as HTMLButtonElement);
    const passo = evento.key === 'ArrowRight' || evento.key === 'ArrowDown' ? 1 : -1;
    const proximo = grupo[(atual + passo + grupo.length) % grupo.length];
    evento.preventDefault();
    proximo.focus();
    proximo.click();
  });

  /* ---------- Texto das respostas ---------- */

  function descrever(q: Pergunta): string {
    const r = respostas[q.id] ?? {};
    const partes: string[] = [];
    if (q.tipo === 'inventario' && r.inventario) {
      for (const linha of q.linhas ?? []) {
        const l = r.inventario[linha];
        if (!l || (!l.uso.length && !l.importancia)) continue;
        const uso = l.uso.length ? `usa hoje: ${l.uso.join(' e ')}` : '';
        partes.push(`• ${linha}: ${[uso, l.importancia].filter(Boolean).join('; ')}`);
      }
    }
    if (r.dias?.length) partes.push(`Dias: ${r.dias.join(', ')}`);
    if (r.periodos?.length) partes.push(`Período: ${r.periodos.join(', ')}`);
    if (r.selecao?.length) partes.push(r.selecao.join(', '));
    if (r.texto?.trim()) partes.push(r.texto.trim());
    return partes.join('\n');
  }

  function textoCompleto(): string {
    const cabeca = 'MISSIONÁRIA HUB\nRespostas do Pr. Jacó Junior';
    const corpo = dados.partes
      .map((parte) => {
        const itens = parte.perguntas.map((q) => {
          const r = descrever(q);
          return `${q.id.toUpperCase()}. ${q.texto}\n${r || '(sem resposta)'}`;
        });
        return `${parte.letra}. ${parte.titulo.toUpperCase()}\n\n${itens.join('\n\n')}`;
      })
      .join('\n\n\n');
    return `${cabeca}\n\n${corpo}\n`;
  }

  function avisar(mensagem: string) {
    if (retornoEl) retornoEl.textContent = mensagem;
  }

  async function copiar(): Promise<boolean> {
    const texto = textoCompleto();
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      const apoio = document.createElement('textarea');
      apoio.value = texto;
      apoio.setAttribute('readonly', '');
      apoio.style.position = 'fixed';
      apoio.style.opacity = '0';
      document.body.append(apoio);
      apoio.select();
      const ok = document.execCommand('copy');
      apoio.remove();
      return ok;
    }
  }

  function preencherRelatorio() {
    const relatorio = document.querySelector<HTMLElement>('[data-relatorio]');
    if (!relatorio) return;
    const data = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    relatorio.replaceChildren();
    const h1 = document.createElement('h1');
    h1.textContent = 'Missionária HUB · Respostas do Pr. Jacó Junior';
    const quando = document.createElement('p');
    quando.className = 'relatorio-data';
    quando.textContent = `Salvo em ${data}`;
    relatorio.append(h1, quando);
    for (const parte of dados.partes) {
      const h2 = document.createElement('h2');
      h2.textContent = `${parte.letra}. ${parte.titulo}`;
      relatorio.append(h2);
      for (const q of parte.perguntas) {
        const item = document.createElement('div');
        item.className = 'item';
        const pergunta = document.createElement('p');
        pergunta.className = 'item-pergunta';
        pergunta.textContent = `${q.id.toUpperCase()}. ${q.texto}`;
        const texto = descrever(q);
        const resp = document.createElement('p');
        resp.className = texto ? 'item-resposta' : 'item-vazia';
        resp.textContent = texto || 'Sem resposta.';
        item.append(pergunta, resp);
        relatorio.append(item);
      }
    }
  }

  window.addEventListener('beforeprint', preencherRelatorio);

  document.querySelectorAll<HTMLButtonElement>('[data-enviar]').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const acao = botao.dataset.enviar;
      const texto = textoCompleto();
      if (acao === 'whatsapp') {
        const numero = dados.contato.whatsapp.replace(/\D/g, '');
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank', 'noopener');
        avisar('Abri o WhatsApp com as respostas. É só escolher a conversa e enviar.');
      } else if (acao === 'copiar') {
        avisar((await copiar()) ? 'Copiado. Agora é só colar na conversa.' : 'Não consegui copiar. Tente pelo WhatsApp ou pelo PDF.');
      } else if (acao === 'pdf') {
        preencherRelatorio();
        avisar('Na janela que abrir, escolha "Salvar como PDF".');
        window.print();
      } else if (acao === 'email') {
        const assunto = encodeURIComponent('Missionária HUB · Respostas do Pr. Jacó Junior');
        window.location.href = `mailto:${dados.contato.email}?subject=${assunto}&body=${encodeURIComponent(texto)}`;
        avisar('Abri o e-mail com as respostas. Se ficar cortado, use "Copiar as respostas".');
      }
    });
  });

  aplicarEstado();
}
