import { useState } from 'react';
import { Cabecalho } from './components/Cabecalho';
import { Rodape } from './components/Rodape';
import { FAQ } from './components/FAQ';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Leituras } from './pages/Leituras';
import { Sobre } from './pages/Sobre';
import { Contato } from './pages/Contato';
import './App.css';

export type Pagina = 'home' | 'dashboard' | 'leituras' | 'sobre' | 'contato';

function App() {
  const [pagina, setPagina] = useState<Pagina>('home');

  const navegar = (destino: Pagina) => {
    setPagina(destino);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Cabecalho paginaAtual={pagina} aoNavegar={navegar} />
      <main>
        {pagina === 'home' && <Home aoNavegar={navegar} />}
        {pagina === 'dashboard' && <Dashboard />}
        {pagina === 'leituras' && <Leituras />}
        {pagina === 'sobre' && (
          <>
            <Sobre />
            <FAQ />
          </>
        )}
        {pagina === 'contato' && <Contato />}
      </main>
      <Rodape aoNavegar={navegar} />
    </div>
  );
}

export default App;