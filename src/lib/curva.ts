/**
 * Curva de falhas do software (Pressman): a idealizada cai e se estabiliza;
 * a real dá um salto a cada mudança e o fundo sobe um pouco depois de cada uma.
 * Coordenadas no viewBox 0 0 1000 560.
 */
export const area = { x0: 92, x1: 960, y0: 36, y1: 492 };
export const momentosDeMudanca = [0.3, 0.45, 0.6, 0.72, 0.82, 0.9];
export const mudancasIniciais = 3;

const passos = 220;

function ponto(t: number, y: number): string {
  const x = area.x0 + t * (area.x1 - area.x0);
  const altura = area.y1 - y * (area.y1 - area.y0);
  return `${x.toFixed(1)} ${altura.toFixed(1)}`;
}

export function falhaIdeal(t: number): number {
  return 0.055 + 0.92 * Math.exp(-13 * t);
}

export function falhaReal(t: number, mudancas: number): number {
  let y = 0.085 + 0.9 * Math.exp(-12 * t);
  for (const momento of momentosDeMudanca.slice(0, mudancas)) {
    if (t >= momento) {
      y += 0.034 + 0.5 * Math.exp(-15 * (t - momento));
    }
  }
  return Math.min(y, 1);
}

export function caminhoIdeal(): string {
  const pontos: string[] = [];
  for (let i = 0; i <= passos; i++) pontos.push(ponto(i / passos, falhaIdeal(i / passos)));
  return `M${pontos.join('L')}`;
}

export function caminhoReal(mudancas: number): string {
  const ts = new Set<number>();
  for (let i = 0; i <= passos; i++) ts.add(i / passos);
  for (const momento of momentosDeMudanca.slice(0, mudancas)) {
    ts.add(momento - 0.0001);
    ts.add(momento);
  }
  const pontos = [...ts].sort((a, b) => a - b).map((t) => ponto(t, falhaReal(t, mudancas)));
  return `M${pontos.join('L')}`;
}

export function pontoDaMudanca(indice: number, mudancas: number): { x: number; y: number } {
  const t = momentosDeMudanca[indice] - 0.0001;
  const [x, y] = ponto(t, falhaReal(t, mudancas)).split(' ').map(Number);
  return { x, y };
}
