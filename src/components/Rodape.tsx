import type { Pagina } from '../App';

interface Props {
  aoNavegar: (pagina: Pagina) => void;
}

export function Rodape({ aoNavegar }: Props) {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape-grid">
          <div>
            <h4>💧 EcoComunidade</h4>
            <p>
              Plataforma de monitoramento de consumo de água para comunidades
              em situação de vulnerabilidade hídrica. Projeto acadêmico
              desenvolvido para o Challenge FIAP 2026.
            </p>
          </div>

          <div>
            <h4>Navegação</h4>
            <button onClick={() => aoNavegar('home')} style={{ display: 'block', color: 'var(--cinza-300)', fontSize: '0.88rem', padding: '4px 0' }}>Início</button>
            <button onClick={() => aoNavegar('dashboard')} style={{ display: 'block', color: 'var(--cinza-300)', fontSize: '0.88rem', padding: '4px 0' }}>Dashboard</button>
            <button onClick={() => aoNavegar('leituras')} style={{ display: 'block', color: 'var(--cinza-300)', fontSize: '0.88rem', padding: '4px 0' }}>Leituras</button>
            <button onClick={() => aoNavegar('sobre')} style={{ display: 'block', color: 'var(--cinza-300)', fontSize: '0.88rem', padding: '4px 0' }}>Sobre</button>
            <button onClick={() => aoNavegar('contato')} style={{ display: 'block', color: 'var(--cinza-300)', fontSize: '0.88rem', padding: '4px 0' }}>Contato</button>
          </div>

          <div>
            <h4>Projeto</h4>
            <p style={{ fontSize: '0.88rem' }}>Challenge FIAP 2026</p>
            <p style={{ fontSize: '0.88rem' }}>Turma 1TDSPI</p>
            <p style={{ fontSize: '0.88rem' }}>Sprint 2</p>
          </div>
        </div>

        <div className="rodape-base">
          © 2026 EcoComunidade. Projeto acadêmico FIAP.
        </div>
      </div>
    </footer>
  );
}