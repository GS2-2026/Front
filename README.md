# EcoComunidade

Interface web para monitoramento comunitário de consumo de água. Permite acompanhar residências, medidores e leituras em um dashboard consolidado, identificar padrões de consumo e registrar novas medições.

**Global Solution 2026/2 - CitizenTech - FIAP**

---

## Objetivo

O desperdício de água é um dos problemas urbanos mais graves e menos visíveis. Em comunidades onde o consumo não é monitorado, vazamentos passam meses sem ser detectados e não há base de dados para orientar políticas de uso consciente.

O EcoComunidade resolve isso ao digitalizar a leitura de medidores: cada residência registra seu consumo, e a plataforma consolida os dados em indicadores que permitem identificar picos anômalos, comparar consumo entre unidades e acompanhar a evolução ao longo do tempo.

A aplicação atende o ODS 6 (Água Potável e Saneamento) e o ODS 11 (Cidades e Comunidades Sustentáveis) da Agenda 2030 da ONU.

---

## Integrantes

| Nome | RM | Turma |
|---|---|---|
| Lucas Fortunato Brandão de Pinho | 572860 | 1TDSPI |
| Lucas Costa | 571016 | 1TDSPI |
| Henrique Soares Serra | 573618 | 1TDSPI |
| Arthur Chang Skolimoski | 572510 | 1TDSPK |

**Turma:** 1TDS
**Semestre:** 2026/2

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Biblioteca de interface e componentização |
| TypeScript | Tipagem estática de props, estados e respostas da API |
| Vite | Build e servidor de desenvolvimento |
| Fetch API | Requisições HTTP para a API REST Java |
| CSS3 | Estilização, layout responsivo com Flexbox e Grid |

Nenhuma biblioteca externa de requisição é utilizada. Todas as chamadas HTTP são feitas com a Fetch API nativa do navegador.

---

## Estrutura de pastas

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
      App.tsx              Composição da aplicação e navegação
      App.css              Estilos globais e dos componentes
      main.tsx             Ponto de entrada
