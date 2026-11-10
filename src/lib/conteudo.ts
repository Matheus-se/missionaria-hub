import perguntasJson from '../../conteudo/perguntas.json';
import textosBrutos from '../../conteudo/textos.md?raw';

export type Bloco =
  | { tipo: 'p'; linhas: string[] }
  | { tipo: 'ul'; itens: string[] }
  | { tipo: 'ol'; itens: string[] }
  | { tipo: 'h3'; texto: string };

export interface Secao {
  titulo: string;
  blocos: Bloco[];
}

export interface Pergunta {
  id: string;
  texto: string;
  porque: string;
  tipo?: 'inventario' | 'agenda' | 'escolha';
  opcoes?: string[];
  linhas?: string[];
  usoHoje?: string[];
  importancia?: string[];
  dias?: string[];
  periodos?: string[];
}

export interface Parte {
  id: string;
  letra: string;
  titulo: string;
  subtitulo: string;
  perguntas: Pergunta[];
}

export const partes: Parte[] = perguntasJson.partes as Parte[];
export const totalPerguntas = partes.reduce((soma, parte) => soma + parte.perguntas.length, 0);

function lerSecoes(): Map<string, Secao> {
  const secoes = new Map<string, Secao>();
  let atual: Secao | null = null;
  let paragrafo: string[] = [];
  let lista: { tipo: 'ul' | 'ol'; itens: string[] } | null = null;

  const fecharParagrafo = () => {
    if (atual && paragrafo.length) atual.blocos.push({ tipo: 'p', linhas: paragrafo });
    paragrafo = [];
  };
  const fecharLista = () => {
    if (atual && lista) atual.blocos.push({ tipo: lista.tipo, itens: lista.itens });
    lista = null;
  };

  for (const bruta of textosBrutos.split('\n')) {
    const linha = bruta.trimEnd();
    if (linha.startsWith('## ')) {
      fecharParagrafo();
      fecharLista();
      atual = { titulo: linha.slice(3).trim(), blocos: [] };
      secoes.set(atual.titulo, atual);
      continue;
    }
    if (!atual) continue;
    if (linha.startsWith('### ')) {
      fecharParagrafo();
      fecharLista();
      atual.blocos.push({ tipo: 'h3', texto: linha.slice(4).trim() });
      continue;
    }
    const marcador = linha.match(/^(-|\d+\.)\s+(.*)$/);
    if (marcador) {
      fecharParagrafo();
      const tipo = marcador[1] === '-' ? 'ul' : 'ol';
      if (!lista || lista.tipo !== tipo) {
        fecharLista();
        lista = { tipo, itens: [] };
      }
      lista.itens.push(marcador[2]);
      continue;
    }
    if (linha.trim() === '') {
      fecharParagrafo();
      continue;
    }
    if (lista && /^\s/.test(bruta)) {
      lista.itens[lista.itens.length - 1] += ' ' + linha.trim();
      continue;
    }
    fecharLista();
    paragrafo.push(linha.trim());
  }
  fecharParagrafo();
  fecharLista();
  return secoes;
}

const secoes = lerSecoes();

export function secao(titulo: string): Secao {
  const encontrada = secoes.get(titulo);
  if (!encontrada) {
    throw new Error(`conteudo/textos.md não tem a seção "## ${titulo}"`);
  }
  return encontrada;
}

export function preencher(texto: string, extras: Record<string, string | number> = {}): string {
  const valores: Record<string, string | number> = { total: totalPerguntas, ...extras };
  return texto.replace(/\{(\w+)\}/g, (inteiro, chave) => (chave in valores ? String(valores[chave]) : inteiro));
}

/** Itens no formato "Chave: valor" de uma lista, como na seção Abertura. */
export function campos(titulo: string): Record<string, string> {
  const resultado: Record<string, string> = {};
  for (const bloco of secao(titulo).blocos) {
    if (bloco.tipo !== 'ul') continue;
    for (const item of bloco.itens) {
      const separador = item.indexOf(':');
      if (separador > 0) resultado[item.slice(0, separador).trim()] = item.slice(separador + 1).trim();
    }
  }
  return resultado;
}

/** Divide os blocos de uma seção pelos subtítulos ###. */
export function subsecoes(titulo: string): { titulo: string | null; blocos: Bloco[] }[] {
  const grupos: { titulo: string | null; blocos: Bloco[] }[] = [{ titulo: null, blocos: [] }];
  for (const bloco of secao(titulo).blocos) {
    if (bloco.tipo === 'h3') grupos.push({ titulo: bloco.texto, blocos: [] });
    else grupos[grupos.length - 1].blocos.push(bloco);
  }
  return grupos;
}

export function paragrafos(blocos: Bloco[]): string[][] {
  return blocos.filter((b): b is Extract<Bloco, { tipo: 'p' }> => b.tipo === 'p').map((b) => b.linhas);
}

export function lista(blocos: Bloco[], tipo: 'ul' | 'ol'): string[] {
  const encontrado = blocos.find((b) => b.tipo === tipo) as Extract<Bloco, { tipo: 'ul' | 'ol' }> | undefined;
  return encontrado ? encontrado.itens : [];
}

/** "Ouvir. Antes de..." vira { titulo: "Ouvir", texto: "Antes de..." }. */
export function tituloETexto(item: string): { titulo: string; texto: string } {
  const ponto = item.indexOf('. ');
  return ponto > 0 ? { titulo: item.slice(0, ponto), texto: item.slice(ponto + 2) } : { titulo: item, texto: '' };
}
