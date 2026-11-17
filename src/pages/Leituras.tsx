import { useEffect, useState } from 'react';
import { api, ApiError } from '../services/api';
import type { Leitura, Medidor } from '../types';

export function Leituras() {
  const [leituras, setLeituras] = useState<Leitura[]>([]);
  const [medidores, setMedidores] = useState<Medidor[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [idMedidor, setIdMedidor] = useState('');
  const [consumoLitros, setConsumoLitros] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [errosCampos, setErrosCampos] = useState<Record<string, string>>({});

  const carregar = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const [l, m] = await Promise.all([
        api.listarLeituras(),
        api.listarMedidores(),
      ]);
      setLeituras(l);
      setMedidores(m);
    } catch (e) {
      const err = e as ApiError;
      setErro(err.message || 'Falha ao carregar as leituras.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const abrirModal = () => {
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
    setDataHora(agora.toISOString().slice(0, 16));
    setIdMedidor('');
    setConsumoLitros('');
    setErrosCampos({});
    setSucesso(null);
    setModalAberto(true);
  };

  const validar = () => {
    const erros: Record<string, string> = {};
    if (!idMedidor) {
      erros.idMedidor = 'Selecione o medidor que gerou a leitura.';
    }
    const consumo = Number(consumoLitros);
    if (!consumoLitros || Number.isNaN(consumo) || consumo <= 0) {
      erros.consumoLitros = 'Informe um consumo em litros maior que zero.';
    }
    if (!dataHora) {
      erros.dataHora = 'Informe a data e hora da leitura.';
    } else if (new Date(dataHora) > new Date()) {
      erros.dataHora = 'A data da leitura não pode ser posterior a agora.';
    }
    return erros;
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const erros = validar();
    setErrosCampos(erros);
    if (Object.keys(erros).length > 0) return;

    setSalvando(true);
    try {
      const nova = await api.criarLeitura({
        idMedidor: Number(idMedidor),
        consumoLitros: Number(consumoLitros),
        dataHoraLeitura: new Date(dataHora).toISOString(),
      });
      setLeituras((atuais) => [nova, ...atuais]);
      setModalAberto(false);
      setSucesso('Leitura registrada com sucesso.');
    } catch (err) {
      const apiErr = err as ApiError;
      setErrosCampos({
        geral: `${apiErr.message}${
          apiErr.detalhes?.length ? ' ' + apiErr.detalhes.join(' ') : ''
        }`,
      });
    } finally {
      setSalvando(false);
    }
  };

  const excluir = async (id: number) => {
    if (!window.confirm('Confirmar a exclusão desta leitura?')) return;
    try {
      await api.excluirLeitura(id);
      setLeituras((atuais) => atuais.filter((l) => l.id !== id));
      setSucesso('Leitura excluída.');
    } catch (err) {
      const apiErr = err as ApiError;
      setErro(apiErr.message);
    }
  };

  const formatarData = (iso: string) =>
    new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const medidorPorId = (id: number) => medidores.find((m) => m.id === id);

  return (
    <section className="secao">
      <div className="container">
        <div className="flex-entre">
          <div>
            <span className="eyebrow">Registro e histórico</span>
            <h1 className="titulo-secao">Leituras</h1>
            <p className="subtitulo-secao">
              Registre o consumo em litros e consulte o histórico completo de
              medições.
            </p>
          </div>
          <button className="btn btn-primario" onClick={abrirModal}>
            + Nova leitura
          </button>
        </div>

        {sucesso && (
          <div className="alerta alerta-sucesso">
            <span>✓</span>
            <div>{sucesso}</div>
          </div>
        )}

        {erro && (
          <div className="alerta alerta-erro">
            <span>!</span>
            <div>
              <strong>Erro ao carregar.</strong>
              <div style={{ marginTop: '4px' }}>{erro}</div>
            </div>
          </div>
        )}

        <div className="tabela-wrap">
          <div className="tabela-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Medidor</th>
                  <th>Data e hora</th>
                  <th>Consumo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="skeleton" style={{ height: '20px' }} />
                    </td>
                  </tr>
                ) : (
                  leituras.map((leitura) => {
                    const medidor = medidorPorId(leitura.idMedidor);
                    return (
                      <tr key={leitura.id}>
                        <td>{leitura.id}</td>
                        <td>
                          {medidor ? (
                            <strong>{medidor.numeroSerie}</strong>
                          ) : (
                            `ID ${leitura.idMedidor}`
                          )}
                        </td>
                        <td>{formatarData(leitura.dataHoraLeitura)}</td>
                        <td>
                          <span className="badge badge-azul">
                            {new Intl.NumberFormat('pt-BR').format(
                              leitura.consumoLitros
                            )}{' '}
                            L
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-perigo btn-pequeno"
                            onClick={() => excluir(leitura.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {!carregando && leituras.length === 0 && (
            <div className="estado">
              <div className="estado-icone">📊</div>
              <h3>Nenhuma leitura registrada</h3>
              <p>Clique em "Nova leitura" para registrar o primeiro consumo.</p>
            </div>
          )}
        </div>
      </div>

      {modalAberto && (
        <div className="modal-fundo" onClick={() => setModalAberto(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Nova leitura</h2>

            {errosCampos.geral && (
              <div className="alerta alerta-erro">
                <span>!</span>
                <div>{errosCampos.geral}</div>
              </div>
            )}

            <form onSubmit={salvar} noValidate>
              <div className="campo">
                <label htmlFor="medidor">Medidor</label>
                <select
                  id="medidor"
                  value={idMedidor}
                  className={errosCampos.idMedidor ? 'erro' : ''}
                  onChange={(e) => setIdMedidor(e.target.value)}
                >
                  <option value="">Selecione um medidor</option>
                  {medidores.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.numeroSerie} (residência {m.idResidencia})
                    </option>
                  ))}
                </select>
                {errosCampos.idMedidor && (
                  <span className="campo-erro">{errosCampos.idMedidor}</span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="consumo">Consumo em litros</label>
                <input
                  id="consumo"
                  type="number"
                  min="1"
                  step="1"
                  value={consumoLitros}
                  className={errosCampos.consumoLitros ? 'erro' : ''}
                  onChange={(e) => setConsumoLitros(e.target.value)}
                  placeholder="Ex.: 1200"
                />
                {errosCampos.consumoLitros ? (
                  <span className="campo-erro">{errosCampos.consumoLitros}</span>
                ) : (
                  <span className="campo-dica">
                    Informe o consumo em litros medido no período.
                  </span>
                )}
              </div>

              <div className="campo">
                <label htmlFor="dataHora">Data e hora da leitura</label>
                <input
                  id="dataHora"
                  type="datetime-local"
                  value={dataHora}
                  className={errosCampos.dataHora ? 'erro' : ''}
                  onChange={(e) => setDataHora(e.target.value)}
                />
                {errosCampos.dataHora && (
                  <span className="campo-erro">{errosCampos.dataHora}</span>
                )}
              </div>

              <div className="modal-acoes">
                <button
                  type="button"
                  className="btn btn-secundario"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primario"
                  disabled={salvando}
                >
                  {salvando ? 'Salvando...' : 'Registrar leitura'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}