import type { Residencia, Medidor, Leitura, ErroApi } from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://ecocomunidade-api.onrender.com/api';

export class ApiError extends Error {
  status: number;
  detalhes: string[];

  constructor(status: number, mensagem: string, detalhes: string[] = []) {
    super(mensagem);
    this.status = status;
    this.detalhes = detalhes;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    const resposta = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (resposta.status === 204) {
      return undefined as T;
    }

    const texto = await resposta.text();
    const dados = texto ? JSON.parse(texto) : null;

    if (!resposta.ok) {
      if (resposta.status === 503) {
        throw new ApiError(
          503,
          'API acordando, aguarde alguns segundos e tente novamente.'
        );
      }
      const erro = dados as ErroApi;
      throw new ApiError(
        resposta.status,
        erro?.mensagem || `Erro ${resposta.status}`,
        erro?.detalhes || []
      );
    }

    return dados as T;
  } catch (erro) {
    if (erro instanceof ApiError) throw erro;
    if ((erro as Error).name === 'AbortError') {
      throw new ApiError(408, 'A API demorou para responder. Tente novamente.');
    }
    throw new ApiError(0, 'Não foi possível conectar à API.');
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  listarResidencias: () => request<Residencia[]>('/residencias'),
  buscarResidencia: (id: number) => request<Residencia>(`/residencias/${id}`),
  criarResidencia: (dados: Omit<Residencia, 'id'>) =>
    request<Residencia>('/residencias', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),
  atualizarResidencia: (id: number, dados: Omit<Residencia, 'id'>) =>
    request<Residencia>(`/residencias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),
  excluirResidencia: (id: number) =>
    request<void>(`/residencias/${id}`, { method: 'DELETE' }),

  listarMedidores: () => request<Medidor[]>('/medidores'),
  buscarMedidor: (id: number) => request<Medidor>(`/medidores/${id}`),
  listarMedidoresDaResidencia: (idResidencia: number) =>
    request<Medidor[]>(`/residencias/${idResidencia}/medidores`),
  criarMedidor: (dados: Omit<Medidor, 'id'>) =>
    request<Medidor>('/medidores', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),
  atualizarMedidor: (id: number, dados: Omit<Medidor, 'id'>) =>
    request<Medidor>(`/medidores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),
  excluirMedidor: (id: number) =>
    request<void>(`/medidores/${id}`, { method: 'DELETE' }),

  listarLeituras: () => request<Leitura[]>('/leituras'),
  listarLeiturasDoMedidor: (idMedidor: number) =>
    request<Leitura[]>(`/medidores/${idMedidor}/leituras`),
  criarLeitura: (dados: Omit<Leitura, 'id'>) =>
    request<Leitura>('/leituras', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),
  excluirLeitura: (id: number) =>
    request<void>(`/leituras/${id}`, { method: 'DELETE' }),
};