import { useEffect, useState } from 'react';
import { api, ApiError } from '../services/api';
import type { Residencia, Medidor, Leitura } from '../types';
import { formatarDataInstalacao } from '../utils/leitura';

export function Dashboard() {
  const [residencias, setResidencias] = useState<Residencia[]>([]);
  const [medidores, setMedidores] = useState<Medidor[]>([]);
  const [leituras, setLeituras] = useState<Leitura[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<'TODOS' | Medidor['status']>(
    'TODOS'
  );

  const carregar = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const [r, m, l] = await Promise.all([
        api.listarResidencias(),
        api.listarMedidores(),
        api.listarLeituras(),
      ]);
      setResidencias(r);
      setMedidores(m);
      setLeituras(l);
    } catch (e) {
      const err = e as ApiError;
      setErro(err.message || 'Falha ao carregar os dados.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const medidoresFiltrados =
    filtroStatus === 'TODOS'
      ? medidores
      : medidores.filter((m) => m.status === filtroStatus);

  const consumoTotal = leituras.reduce((soma, l) => soma + l.consumoLitros, 0);
  const consumoMedio =
    leituras.length > 0 ? Math.round(consumoTotal / leituras.length) : 0;
  const medidoresAtivos = medidores.filter((m) => m.status === 'ATIVO').length;
  const totalMoradores = residencias.reduce(
    (soma, r) => soma + r.qtdMoradores,
    0
  );

  const formatarNumero = (n: number) =>
    new Intl.NumberFormat('pt-BR').format(n);

  const classeBadge = (status: Medidor['status']) => {
    if (status === 'ATIVO') return 'bg-emerald-100 text-emerald-800';
    if (status === 'MANUTENCAO') return 'bg-amber-100 text-amber-800';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Visão consolidada
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Indicadores de consumo calculados a partir das leituras registradas
              na API.
            </p>
          </div>

          <button
            onClick={carregar}
            disabled={carregando}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? 'Carregando...' : 'Atualizar dados'}
          </button>
        </div>

        {erro && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-red-600 text-xs font-bold text-white">
              !
            </span>
            <div className="text-sm text-red-800">
              <strong className="block font-semibold">
                Não foi possível carregar os dados.
              </strong>
              <div className="mt-1">{erro}</div>
            </div>
          </div>
        )}

        {carregando ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 h-3 w-3/5 animate-pulse rounded bg-slate-200" />
                <div className="h-7 w-2/5 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Residências
              </span>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                {formatarNumero(residencias.length)}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Medidores ativos
              </span>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                {formatarNumero(medidoresAtivos)}
                <span className="ml-1 text-sm font-medium text-slate-500">
                  de {medidores.length}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Consumo total
              </span>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                {formatarNumero(consumoTotal)}
                <span className="ml-1 text-sm font-medium text-slate-500">L</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Consumo médio
              </span>
              <div className="mt-2 text-2xl font-bold text-slate-900">
                {formatarNumero(consumoMedio)}
                <span className="ml-1 text-sm font-medium text-slate-500">L</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <label
              htmlFor="filtro-status"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Status do medidor
            </label>
            <select
              id="filtro-status"
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(e.target.value as 'TODOS' | Medidor['status'])
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="TODOS">Todos os status</option>
              <option value="ATIVO">Apenas ativos</option>
              <option value="INATIVO">Apenas inativos</option>
              <option value="MANUTENCAO">Em manutenção</option>
            </select>
          </div>

          <p className="text-sm text-slate-500">
            {formatarNumero(totalMoradores)} moradores monitorados
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                    Nº de série
                  </th>
                  <th className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                    Residência
                  </th>
                  <th className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                    Instalação
                  </th>
                  <th className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                    Status
                  </th>
                  <th className="whitespace-nowrap border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600">
                    Leituras
                  </th>
                </tr>
              </thead>
              <tbody>
                {medidoresFiltrados.map((medidor) => {
                  const residencia = residencias.find(
                    (r) => r.id === medidor.idResidencia
                  );
                  const qtdLeituras = leituras.filter(
                    (l) => l.idMedidor === medidor.id
                  ).length;

                  return (
                    <tr
                      key={medidor.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {medidor.numeroSerie}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {residencia
                          ? `${residencia.codigoResidencia} - ${residencia.endereco}`
                          : `ID ${medidor.idResidencia}`}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {formatarDataInstalacao(medidor.dataInstalacao)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${classeBadge(
                            medidor.status
                          )}`}
                        >
                          {medidor.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{qtdLeituras}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {medidoresFiltrados.length === 0 && !carregando && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-slate-100 text-2xl">
                📟
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Nenhum medidor encontrado
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Ajuste o filtro de status para ver outros resultados.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}