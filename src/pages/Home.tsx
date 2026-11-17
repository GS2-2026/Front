import type { Pagina } from '../App';

interface Props {
  aoNavegar: (pagina: Pagina) => void;
}

export function Home({ aoNavegar }: Props) {
  return (
    <>
      <section className="bg-emerald-50/50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Monitoramento hídrico comunitário
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
                Cada gota <span className="text-emerald-700">conta</span> quando a
                comunidade mede junto
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                A EcoComunidade conecta moradores, medidores e leituras em uma
                única plataforma para identificar desperdício, acompanhar o
                consumo real e agir antes que a água falte.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => aoNavegar('dashboard')}
                  className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  Ver dashboard
                </button>
                <button
                  onClick={() => aoNavegar('leituras')}
                  className="rounded-lg border border-emerald-700 px-5 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  Registrar leitura
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Resumo do sistema
              </div>

              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-slate-600">
                    Residências monitoradas
                  </span>
                  <strong className="text-lg font-bold text-slate-900">24</strong>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-slate-600">Medidores ativos</span>
                  <strong className="text-lg font-bold text-slate-900">26</strong>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-slate-600">
                    Leituras no período
                  </span>
                  <strong className="text-lg font-bold text-slate-900">312</strong>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <span className="text-sm text-slate-600">Redução média</span>
                  <strong className="text-lg font-bold text-emerald-700">
                    8%
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Como funciona
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Três passos para o controle hídrico
          </h2>
          <p className="mt-3 mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
            A plataforma organiza o ciclo completo de medição, do cadastro da
            residência até a análise do consumo.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-emerald-50 text-2xl">
                🏠
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Cadastro da residência
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Cada casa recebe um código único e é associada a uma comunidade,
                permitindo comparar consumo entre regiões.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-emerald-50 text-2xl">
                📟
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Instalação do medidor
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                O medidor ganha número de série e data de instalação, formando o
                vínculo entre a residência e as leituras.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-emerald-50 text-2xl">
                📊
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Leitura e análise
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Cada leitura registra consumo em litros e horário, gerando
                indicadores de desperdício e tendência.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="rounded-3xl bg-emerald-50 px-6 py-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-3 mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
            Acesse o dashboard para ver os dados consolidados ou registre uma nova
            leitura agora.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => aoNavegar('dashboard')}
              className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Abrir dashboard
            </button>
            <button
              onClick={() => aoNavegar('leituras')}
              className="rounded-lg border border-emerald-700 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Nova leitura
            </button>
          </div>
        </div>
      </section>
    </>
  );
}