import { useState } from 'react';
import type { Pagina } from '../App';

interface Props {
  paginaAtual: Pagina;
  aoNavegar: (pagina: Pagina) => void;
}

const itens: { id: Pagina; rotulo: string }[] = [
  { id: 'home', rotulo: 'Início' },
  { id: 'dashboard', rotulo: 'Dashboard' },
  { id: 'leituras', rotulo: 'Leituras' },
  { id: 'sobre', rotulo: 'Sobre' },
  { id: 'contato', rotulo: 'Contato' },
];

export function Cabecalho({ paginaAtual, aoNavegar }: Props) {
  const [menuAberto, setMenuAberto] = useState(false);

  const irPara = (pagina: Pagina) => {
    aoNavegar(pagina);
    setMenuAberto(false);
  };

  return (
    <header className="cabecalho">
      <div className="container">
        <div className="cabecalho-inner">
          <button className="logo" onClick={() => irPara('home')}>
            <span className="logo-marca">💧</span>
            EcoComunidade
          </button>

          <nav className="nav-desktop">
            {itens.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${paginaAtual === item.id ? 'ativo' : ''}`}
                onClick={() => irPara(item.id)}
              >
                {item.rotulo}
              </button>
            ))}
          </nav>

          <button
            className="menu-botao"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>

        <nav className={`nav-mobile ${menuAberto ? 'aberto' : ''}`}>
          {itens.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${paginaAtual === item.id ? 'ativo' : ''}`}
              onClick={() => irPara(item.id)}
              style={{ textAlign: 'left' }}
            >
              {item.rotulo}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}