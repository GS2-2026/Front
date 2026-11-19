# EcoComunidade

Interface web para monitoramento comunitário de consumo de água. Permite acompanhar residências, medidores e leituras em um dashboard consolidado, identificar padrões de consumo e registrar novas medições.

Global Solution 2026/2 - CitizenTech - FIAP

---

## Objetivo

O desperdício de água é um dos problemas urbanos mais graves e menos visíveis. Em comunidades onde o consumo não é monitorado, vazamentos passam meses sem ser detectados e não há base de dados para orientar políticas de uso consciente.

O EcoComunidade resolve isso ao digitalizar a leitura de medidores: cada residência registra seu consumo, e a plataforma consolida os dados em indicadores que permitem identificar picos anômalos, comparar consumo entre unidades e acompanhar a evolução ao longo do tempo.

A aplicação atende o ODS 6 (Água Potável e Saneamento) e o ODS 11 (Cidades e Comunidades Sustentáveis) da Agenda 2030 da ONU.

---

## Integrantes

| Nome | RM | Turma |
| --- | --- | --- |
| Lucas Fortunato Brandão de Pinho | 572860 | 1TDSPI |
| Lucas Costa | 571016 | 1TDSPI |
| Henrique Soares Serra | 573618 | 1TDSPI |
| Arthur Chang Skolimoski | 572510 | 1TDSPK |

Turma: 1TDS
Semestre: 2026/2

---

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 | Biblioteca de interface e componentização |
| TypeScript | Tipagem estática de props, estados e respostas da API |
| Vite | Build e servidor de desenvolvimento |
| Tailwind CSS 4 | Estilização por classes utilitárias, com CSS customizado em index.css para os estilos de base |
| Fetch API | Requisições HTTP para a API REST Java |

Nenhuma biblioteca externa de requisição é utilizada. Todas as chamadas HTTP são feitas com a Fetch API nativa do navegador.

---

## Estrutura de pastas

```
src/
  components/
    Cabecalho.tsx      Menu de navegação principal
    Rodape.tsx         Rodapé institucional
    FAQ.tsx            Seção de perguntas frequentes
  pages/
    Home.tsx           Página inicial com apresentação do projeto
    Dashboard.tsx      Painel com KPIs e tabela de medidores
    Leituras.tsx       Listagem, criação e exclusão de leituras
    Sobre.tsx          Informações do projeto, ODS e equipe
    Contato.tsx        Formulário de contato com validação
  services/
    api.ts             Cliente HTTP centralizado
  types/
    index.ts           Interfaces e tipagens do domínio
  utils/
    leitura.ts         Funções auxiliares de formatação e cálculo
  App.tsx              Composição da aplicação e navegação
  App.css              Estilos globais herdados dos componentes
  index.css            Importação do Tailwind e estilos de base
  main.tsx             Ponto de entrada
tests/
  leitura.test.mjs     Testes das funções auxiliares
public/                Arquivos estáticos
index.html             Documento base da aplicação
package.json           Dependências e scripts
vite.config.ts         Configuração do Vite e do plugin Tailwind
```

---

## Como executar

Pré-requisitos: Node.js 18 ou superior e npm.

```bash
git clone https://github.com/GS2-2026/Front.git
cd Front
npm install
npm run dev
```

A aplicação abre em http://localhost:5173.

```bash
npm run build
npm run preview
```

---

## Páginas

| Página | Descrição |
| --- | --- |
| Home | Apresentação do projeto, proposta de valor e resumo do sistema |
| Dashboard | Indicadores consolidados e tabela de medidores com filtro por status |
| Leituras | Listagem, registro e exclusão de leituras |
| Sobre | Contexto do problema, ODS atendidos e integrantes da equipe |
| Contato | Formulário de contato com validação de campos |

---

## Integração com a API

A aplicação consome a API REST Java publicada no Render. As requisições estão centralizadas em src/services/api.ts e utilizam exclusivamente a Fetch API, conforme exigido pela disciplina.

URL base da API: https://ecocomunidade-api.onrender.com/api/

| Método | Endpoint | Uso na interface |
| --- | --- | --- |
| GET | /residencias | Listagem no Dashboard e nas Leituras |
| GET | /medidores | Filtro por status no Dashboard |
| GET | /leituras | Cálculo dos indicadores e listagem |
| POST | /leituras | Registro de nova leitura |
| DELETE | /leituras/{id} | Exclusão de leitura |

A interface trata os três estados exigidos: carregamento, erro de requisição e ausência de dados.

Observação: a API está hospedada no plano gratuito do Render e pode levar alguns segundos para responder na primeira requisição após um período de inatividade.

---

## Responsividade

O layout foi validado nas três resoluções exigidas, sem rolagem horizontal, cortes ou sobreposições.

| Dispositivo | Resolução |
| --- | --- |
| Mobile | 390 x 844 px |
| Tablet | 768 x 1024 px |
| Desktop | 1440 x 900 px |

---

## Links

| Recurso | URL |
| --- | --- |
| Repositório GitHub | https://github.com/GS2-2026/Front |
| Aplicação publicada | https://front-two-self.vercel.app |
| API REST | https://ecocomunidade-api.onrender.com/api/ |
| Vídeo de demonstração | https://youtu.be/YdVftR3J1bs |

---

## Uso de Inteligência Artificial

Ferramentas de IA generativa foram utilizadas como apoio na revisão de código, na depuração de erros de configuração do Tailwind CSS e na padronização da documentação. Todo o conteúdo foi revisado, testado e validado pela equipe antes da entrega.

---

## Licença

Projeto acadêmico sem fins comerciais, desenvolvido para o Global Solution 2026/2 da FIAP.
