export function Sobre() {
  return (
    <section className="secao">
      <div className="container">
        <span className="eyebrow">Sobre o projeto</span>
        <h1 className="titulo-secao">O que é a EcoComunidade</h1>
        <p className="subtitulo-secao" style={{ marginBottom: '40px' }}>
          Uma solução de monitoramento de consumo de água construída para
          comunidades com abastecimento irregular e histórico de desperdício
          não identificado.
        </p>

        <div className="grid-cards" style={{ marginBottom: '48px' }}>
          <div className="card">
            <div className="card-icone">🎯</div>
            <h3>Objetivo</h3>
            <p>
              Dar visibilidade ao consumo real de água por residência,
              permitindo que a comunidade identifique vazamentos e excessos
              antes que se tornem crises.
            </p>
          </div>
          <div className="card">
            <div className="card-icone">⚙️</div>
            <h3>Tecnologia</h3>
            <p>
              API REST em Java com Spring Boot, persistência em banco relacional
              e interface em React com TypeScript consumindo os dados em tempo real.
            </p>
          </div>
          <div className="card">
            <div className="card-icone">🤝</div>
            <h3>Impacto social</h3>
            <p>
              Transparência nos dados de consumo e base para políticas de
              racionamento justo e manutenção preventiva da rede.
            </p>
          </div>
        </div>

        <h2 className="titulo-secao" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
          ODS relacionados
        </h2>
        <div className="tabela-wrap" style={{ marginBottom: '48px' }}>
          <div className="tabela-scroll">
            <table>
              <thead>
                <tr>
                  <th>ODS</th>
                  <th>Descrição</th>
                  <th>Como o projeto contribui</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="badge badge-azul">ODS 6</span></td>
                  <td>Água potável e saneamento</td>
                  <td>Monitoramento do consumo e identificação de desperdício</td>
                </tr>
                <tr>
                  <td><span className="badge badge-azul">ODS 11</span></td>
                  <td>Cidades e comunidades sustentáveis</td>
                  <td>Gestão comunitária de recursos hídricos</td>
                </tr>
                <tr>
                  <td><span className="badge badge-azul">ODS 12</span></td>
                  <td>Consumo e produção responsáveis</td>
                  <td>Conscientização sobre uso eficiente da água</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="titulo-secao" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
          Equipe
        </h2>
        <div className="tabela-wrap">
          <div className="tabela-scroll">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>RM</th>
                  <th>Turma</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Lucas Fortunato Brandão de Pinho</td><td>572860</td><td>1TDSPI</td></tr>
                <tr><td>Lucas Costa</td><td>571016</td><td>1TDSPI</td></tr>
                <tr><td>Henrique Soares Serra</td><td>573618</td><td>1TDSPI</td></tr>
                <tr><td>Arthur Chang Skolimoski</td><td>572510</td><td>1TDSPK</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}