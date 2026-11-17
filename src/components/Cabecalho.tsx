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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            onClick={() => irPara('home')}
            className="flex items-center gap-2 text-lg font-bold text-slate-900 transition-colors hover:text-emerald-700"
          >
            <span className="text-xl leading-none">💧</span>
            EcoComunidade
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {itens.map((item) => (
              <button
                key={item.id}
                onClick={() => irPara(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-800 ${
                  paginaAtual === item.id
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600'
                }`}
              >
                {item.rotulo}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            className="grid size-10 place-items-center rounded-lg border border-slate-300 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
          >
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>

        <nav
          className={`${
            menuAberto ? 'flex' : 'hidden'
          } flex-col gap-1 border-t border-slate-200 py-3 md:hidden`}
        >
          {itens.map((item) => (
            <button
              key={item.id}
              onClick={() => irPara(item.id)}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-emerald-50 ${
                paginaAtual === item.id
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600'
              }`}
            >
              {item.rotulo}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}