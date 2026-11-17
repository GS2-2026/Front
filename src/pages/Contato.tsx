import { useState } from 'react';

interface Formulario {
  nome: string;
  email: string;
  mensagem: string;
}

export function Contato() {
  const [form, setForm] = useState<Formulario>({ nome: '', email: '', mensagem: '' });
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  const validar = () => {
    const novosErros: Record<string, string> = {};
    if (form.nome.trim().length < 3) {
      novosErros.nome = 'Informe seu nome completo, com pelo menos 3 caracteres.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novosErros.email = 'Informe um e-mail válido, no formato nome@dominio.com.';
    }
    if (form.mensagem.trim().length < 10) {
      novosErros.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.';
    }
    return novosErros;
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;
    setEnviado(true);
    setForm({ nome: '', email: '', mensagem: '' });
  };

  return (
    <section className="secao">
      <div className="container">
        <span className="eyebrow">Fale com a equipe</span>
        <h1 className="titulo-secao">Contato</h1>
        <p className="subtitulo-secao" style={{ marginBottom: '32px' }}>
          Dúvidas sobre o projeto, sugestões de melhoria ou interesse em aplicar
          a solução na sua comunidade.
        </p>

        <div style={{ maxWidth: '560px' }}>
          {enviado && (
            <div className="alerta alerta-sucesso">
              <span>✓</span>
              <div>
                <strong>Mensagem registrada.</strong> Obrigado pelo contato, a
                equipe responderá em breve.
              </div>
            </div>
          )}

          <form onSubmit={enviar} noValidate>
            <div className="campo">
              <label htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                type="text"
                value={form.nome}
                className={erros.nome ? 'erro' : ''}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                placeholder="Como devemos te chamar"
              />
              {erros.nome && <span className="campo-erro">{erros.nome}</span>}
            </div>

            <div className="campo">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={form.email}
                className={erros.email ? 'erro' : ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nome@dominio.com"
              />
              {erros.email && <span className="campo-erro">{erros.email}</span>}
            </div>

            <div className="campo">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                rows={5}
                value={form.mensagem}
                className={erros.mensagem ? 'erro' : ''}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                placeholder="Escreva sua mensagem"
              />
              {erros.mensagem && <span className="campo-erro">{erros.mensagem}</span>}
            </div>

            <button type="submit" className="btn btn-primario">
              Enviar mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}