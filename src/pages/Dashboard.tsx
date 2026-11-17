import { useEffect, useState } from 'react';
import { api, ApiError } from '../services/api';
import type { Residencia, Medidor, Leitura } from '../types';

export function Dashboard() {
  const [residencias, setResidencias] = useState<Residencia[]>([]);
  const [medidores, setMedidores] = useState<Medidor[]>([]);
  const [leituras, setLeituras] = useState<Leitura[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<'TODOS' | 'ATIVO' | 'INATIVO'>('TODOS');

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
  const totalMoradores = residencias.reduce((soma, r) => soma + r.qtdMoradores, 0);

  const formatarNumero = (n: number) =>
    new Intl.NumberFormat('pt-BR').format(n);

  const formatarData = (iso: string) =>
    new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <section className="secao">
      <div className="container">
        <div className="flex-entre">
          <div>
            <span className="eyebrow">Visão consolidada</span>
            <h1 className="titulo-secao">Dashboard</h1>
            <p className="subtitulo-secao">
              Indicadores de consumo calculados a partir das leituras
              registradas na API.
            </p>
          </div>
          <button
            className="btn btn-secundario"
            onClick={carregar}
            disabled={carregando}
          >
            {carregando ? 'Carregando...' : 'Atualizar dados'}
          </button>
        </div>

        {erro && (
          <div className="alerta alerta-erro">
            <span>!</span>
            <div>
              <strong>Não foi possível carregar os dados.</strong>
              <div style={{ marginTop: '4px' }}>{erro}</div>
            </div>
          </div>
        )}

        {carregando ? (
          <div className="grid-kpi">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="kpi">
                <div className="skeleton" style={{ height: '12px', width: '60%', marginBottom: '12px' }} />
                <div className="skeleton" style={{ height: '26px', width: '45%' }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid-kpi">
            <div className="kpi">
              <span className="kpi-rotulo">Residências</span>
              <div className="kpi-valor">{formatarNumero(residencias.length)}</div>
            </div>
            <div className="kpi">
              <span className="kpi-rotulo">Medidores ativos</span>
              <div className="kpi-valor">
                {formatarNumero(medidoresAtivos)}
                <span className="kpi-valor unidade">de {medidores.length}</span>
              </div>
            </div>
            <div className="kpi">
              <span className="kpi-rotulo">Consumo total</span>
              <div className="kpi-valor">
                {formatarNumero(consumoTotal)}
                <span className="kpi-valor unidade">L</span>
              </div>
            </div>
            <div className="kpi">
              <span className="kpi-rotulo">Consumo médio</span>
              <div className="kpi-valor">
                {formatarNumero(consumoMedio)}
                <span className="kpi-valor unidade">L</span>
              </div>
            </div>
          </div>
        )}

        <div className="linha-filtros">
          <div className="campo">
            <label htmlFor="filtro-status">Status do medidor</label>
            <select
              id="filtro-status"
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(e.target.value as 'TODOS' | 'ATIVO' | 'INATIVO')
              }
            >
              <option value="TODOS">Todos os status</option>
              <option value="ATIVO">Apenas ativos</option>
              <option value="INATIVO">Apenas inativos</option>
            </select>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '0.88rem', color: 'var(--cinza-500)' }}>
            {formatarNumero(totalMoradores)} moradores monitorados
          </div>
        </div>

        <div className="tabela-wrap">
          <div className="tabela-scroll">
            <table>
              <thead>
                <tr>
                  <th>Nº de série</th>
                  <th>Residência</th>
                  <th>Instalação</th>
                  <th>Status</th>
                  <th>Leituras</th>
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
                    <tr key={medidor.id}>
                      <td><strong>{medidor.numeroSerie}</strong></td>
                      <td>
                        {residencia
                          ? `${residencia.codigoResidencia} - ${residencia.endereco}`
                          : `ID ${medidor.idResidencia}`}
                      </td>
                      <td>{formatarData(medidor.dataInstalacao)}</td>
                      <td>
                        <span
                          className={`badge ${medidor.status === 'ATIVO' ? 'badge-verde' : 'badge-cinza'}`}
                        >
                          {medidor.status}
                        </span>
                      </td>
                      <td>{qtdLeituras}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {medidoresFiltrados.length === 0 && !carregando && (
            <div className="estado">
              <div className="estado-icone">📟</div>
              <h3>Nenhum medidor encontrado</h3>
              <p>Ajuste o filtro de status para ver outros resultados.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}