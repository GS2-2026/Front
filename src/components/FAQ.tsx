import { useState } from 'react';

type Pergunta = {
  id: string;
  pergunta: string;
  resposta: string;
};

const PERGUNTAS: Pergunta[] = [
  {
    id: 'registrar',
    pergunta: 'Como registro uma nova leitura?',
    resposta:
      'Acesse a página Leituras e clique no botão "Nova leitura". Escolha o medidor, informe a data e a hora da medição e o consumo em litros. O sistema valida os campos antes de salvar, então não é possível registrar um consumo negativo ou uma data futura.',
  },
  {
    id: 'consumo-medio',
    pergunta: 'O que significa o consumo médio exibido no Dashboard?',
    resposta:
      'É a média do consumo por leitura registrada, calculada a partir de todas as medições válidas da comunidade. Ele ajuda a identificar residências com consumo muito acima ou muito abaixo do padrão, o que pode indicar desperdício ou vazamento.',
  },
  {
    id: 'medidor-inativo',
    pergunta: 'Por que meu medidor aparece como inativo?',
    resposta:
      'O status é definido pelo cadastro do medidor na API. Medidores inativos não recebem novas leituras até serem reativados. Se o seu medidor está inativo e deveria estar ativo, entre em contato com a administração da comunidade.',
  },
  {
    id: 'frequencia',
    pergunta: 'Com que frequência devo registrar uma leitura?',
    resposta:
      'A recomendação é registrar uma leitura por dia, sempre no mesmo horário. Isso gera uma série histórica consistente, que permite comparar dias da semana e identificar picos de consumo com mais precisão.',
  },
  {
    id: 'excluir',
    pergunta: 'Posso excluir uma leitura registrada por engano?',
    resposta:
      'Sim. Na página Leituras, cada registro tem um botão "Excluir". O sistema pede confirmação antes de remover, para evitar exclusões acidentais. A ação não pode ser desfeita, então confira o registro antes de confirmar.',
  },
  {
    id: 'unidade',
    pergunta: 'Em que unidade o consumo é medido?',
    resposta:
      'O consumo é sempre registrado em litros (L) consumidos no período, e não o valor acumulado que aparece no visor do hidrômetro. O Dashboard converte automaticamente para a mesma unidade e exibe os totais com separador de milhar.',
  },
  {
    id: 'dados',
    pergunta: 'Com que frequência os dados do Dashboard são atualizados?',
    resposta:
      'Os dados são carregados ao abrir a página. O botão "Atualizar dados" força uma nova consulta à API, útil quando uma leitura acabou de ser registrada em outro dispositivo.',
  },
  {
    id: 'contato',
    pergunta: 'Como reportar um problema ou sugerir uma melhoria?',
    resposta:
      'Use o formulário da página Contato. Descreva o que aconteceu com o máximo de detalhes, como a tela em que o problema ocorreu e o horário. As mensagens são encaminhadas para a equipe responsável pelo projeto.',
  },
];

export function FAQ() {
  const [aberta, setAberta] = useState<string | null>(null);

  function alternar(id: string) {
    setAberta((atual) => (atual === id ? null : id));
  }

  return (
    <section
      aria-labelledby="faq-titulo"
      className="mx-auto w-full max-w-4xl px-6 py-16"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700">
        Dúvidas
      </p>

      <h2
        id="faq-titulo"
        className="mb-2 text-3xl font-bold text-slate-900"
      >
        Perguntas frequentes
      </h2>

      <p className="mb-8 text-slate-600">
        Respostas para as dúvidas mais comuns sobre o uso da plataforma.
      </p>

      <div className="flex flex-col gap-3">
        {PERGUNTAS.map((item) => {
          const estaAberta = aberta === item.id;

          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                estaAberta
                  ? 'border-emerald-500 shadow-sm'
                  : 'border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => alternar(item.id)}
                aria-expanded={estaAberta}
                aria-controls={`faq-resposta-${item.id}`}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-[1.125rem] text-left font-semibold text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:-outline-offset-2"
              >
                <span>{item.pergunta}</span>

                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-xl leading-none text-emerald-700"
                >
                  {estaAberta ? '−' : '+'}
                </span>
              </button>

              <div
                id={`faq-resposta-${item.id}`}
                className="px-5 pb-5 leading-relaxed text-slate-700"
                role="region"
                hidden={!estaAberta}
              >
                <p>{item.resposta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}