# EcoComunidade - Front-end

Interface web para monitoramento comunitário de consumo de água. Permite acompanhar residências, medidores e leituras em um dashboard consolidado, identificar padrões de consumo e registrar novas medições.

## Integrantes

| Nome | RM | Turma |
|---|---|---|
| Lucas Fortunato Brandão de Pinho | 572860 | 1TDSPI |
| Lucas Costa | 571016 | 1TDSPI |
| Henrique Soares Serra | 573618 | 1TDSPI |
| Arthur Chang Skolimoski | 572510 | 1TDSPK |

## Deploy

- Aplicação: ([cole aqui a URL do Vercel](https://front-two-self.vercel.app/))
- API: https://ecocomunidade-api.onrender.com/api

## Stack

- React 19
- TypeScript
- Vite
- React Router não utilizado, navegação por estado
- API REST consumida via fetch

## Funcionalidades

- Página inicial com apresentação do projeto e indicadores
- Dashboard com KPIs calculados a partir das leituras reais
- Listagem de medidores com filtro por status
- Registro de leituras com validação de formulário
- Exclusão de leituras com confirmação
- Página institucional com ODS relacionados e equipe
- Formulário de contato com validação de campos
- Layout responsivo, com menu adaptado para dispositivos móveis

## Acessibilidade e usabilidade

O projeto segue as heurísticas de Nielsen, com atenção especial a:

- Visibilidade do status do sistema (estados de carregamento, feedback de sucesso e erro)
- Prevenção de erros (validação de campos antes do envio)
- Controle e liberdade do usuário (mensagens claras, confirmação antes de excluir)
- Consistência e padrão (componentes reutilizáveis, paleta única)
- Reconhecimento em vez de memorização (rótulos descritivos, dicas de preenchimento)

## Como rodar localmente

Clone o repositório e instale as dependências:

    npm install

Crie um arquivo `.env` na raiz do projeto com a URL da API:

    VITE_API_BASE_URL=https://ecocomunidade-api.onrender.com/api

Inicie o servidor de desenvolvimento:

    npm run dev

A aplicação estará disponível em `http://localhost:5173`.

Para gerar a build de produção:

    npm run build

## Estrutura de pastas

    src/
      components/    Componentes reutilizáveis (Cabecalho, Rodape)
      pages/         Páginas da aplicação
      services/      Cliente HTTP da API
      types/         Tipagens TypeScript
