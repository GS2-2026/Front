import type { Pagina } from '../App';

interface Props {
  aoNavegar: (pagina: Pagina) => void;
}

export function Home({ aoNavegar }: Props) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Monitoramento hídrico comunitário</span>
              <h1>
                Cada gota <span>conta</span> quando a comunidade mede junto
              </h1>
              <p>
                A EcoComunidade conecta moradores, medidores e leituras em uma
                única plataforma para identificar desperdício, acompanhar o
                consumo real e agir antes que a água falte.
              </p>
              <div className="hero-acoes">
                <button className="btn btn-primario" onClick={() => aoNavegar('dashboard')}>
                  Ver dashboard
                </button>
                <button className="btn btn-secundario" onClick={() => aoNavegar('leituras')}>
                  Registrar leitura
                </button>
              </div>
            </div>

            <div className="hero-painel">
              <div className="hero-painel-titulo">Resumo do sistema</div>
              <div className="hero-linhas">
                <div className="hero-linha">
                  <span>Residências monitoradas</span>
                  <strong>24</strong>
                </div>
                <div className="hero-linha">
                  <span>Medidores ativos</span>
                  <strong>26</strong>
                </div>
                <div className="hero-linha">
                  <span>Leituras no período</span>
                  <strong>312</strong>
                </div>
                <div className="hero-linha">
                  <span>Redução média</span>
                  <strong style={{ color: '#047857' }}>8%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <span className="eyebrow">Como funciona</span>
          <h2 className="titulo-secao">Três passos para o controle hídrico</h2>
          <p className="subtitulo-secao" style={{ marginBottom: '36px' }}>
            A plataforma organiza o ciclo completo de medição, do cadastro da
            residência até a análise do consumo.
          </p>

          <div className="grid-cards">
            <div className="card">
              <div className="card-icone">🏠</div>
              <h3>Cadastro da residência</h3>
              <p>
                Cada casa recebe um código único e é associada a uma comunidade,
                permitindo comparar consumo entre regiões.
              </p>
            </div>
            <div className="card">
              <div className="card-icone">📟</div>
              <h3>Instalação do medidor</h3>
              <p>
                O medidor ganha número de série e data de instalação, formando
                o vínculo entre a residência e as leituras.
              </p>
            </div>
            <div className="card">
              <div className="card-icone">📊</div>
              <h3>Leitura e análise</h3>
              <p>
                Cada leitura registra consumo em litros e horário, gerando
                indicadores de desperdício e tendência.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="secao" style={{ background: '#ecfdf5', borderRadius: '24px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="titulo-secao">Pronto para começar?</h2>
          <p className="subtitulo-secao" style={{ margin: '0 auto 28px' }}>
            Acesse o dashboard para ver os dados consolidados ou registre uma
            nova leitura agora.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primario" onClick={() => aoNavegar('dashboard')}>
              Abrir dashboard
            </button>
            <button className="btn btn-secundario" onClick={() => aoNavegar('leituras')}>
              Nova leitura
            </button>
          </div>
        </div>
      </section>
    </>
  );
}