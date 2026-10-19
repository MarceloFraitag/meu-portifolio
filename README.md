**V4.4.1:** corrigido o carregamento de imagens no `npm run dev` e no GitHub Pages. Confira `src/lib/assetPath.ts` e `vite.config.ts`.

# Marcelo Fraitag — Portfolio V4.3 Professional

Versão de teste do portfólio para oportunidades de **desenvolvimento Front-end / Full Stack**, mantendo o cargo profissional correto de **Analista de Processos**. Feita com React, TypeScript e Vite.

> **IMPORTANTE:** esta pasta é um projeto novo. A V3 do repositório `MarceloFraitag/meu-portifolio` não foi modificada e continua publicada. Não substitua a branch `main` até validar e aprovar a V4.

## Testar em 30 segundos

Abra o arquivo **`preview.html`** no navegador. Ele é uma **prévia estática**, sem instalação, para avaliar layout, responsividade, tema, idioma, filtros e a aparência geral. O botão de estudo de caso nessa prévia abre uma visão resumida; na aplicação React existem páginas individuais mais detalhadas.

A prévia compartilha o arquivo de estilos da V4.3, mas não é o bundle React. Por isso, ela também não substitui o teste da aplicação principal descrito abaixo.

## Rodar a aplicação React + TypeScript

Requisitos: Node.js 20.19+ ou 22.12+ e npm (recomendado: Node 22 LTS).

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite, geralmente `http://localhost:5173`.

### Verificações

```bash
npm run typecheck
npm run test
npm run build
npm run preview
```

O build final é criado em `dist/`. O Vite usa `base: './'` para que recursos estáticos funcionem em subcaminhos como `/meu-portifolio/`. As páginas de estudos de caso usam hash (`#/project/nexus-dev`) para evitar erros de atualização no GitHub Pages.

**Nota de validação V4.3:** a prévia HTML foi verificada no Chromium usando conteúdo inline, pois o navegador bloqueia a abertura direta de arquivos e localhost neste ambiente. O build React ainda precisa ser executado no seu computador, onde as dependências npm poderão ser instaladas. Execute os comandos acima antes de publicar.

## Novidade da V4.3 — cursos com comprovantes

- **48 cursos** selecionados a partir de 48 documentos da pasta de certificados fornecida pelo autor no Google Drive.
- **10 destaques** mostrados inicialmente, priorizando desenvolvimento e backend; botão para exibir os 48.
- Filtros em **Desenvolvimento**, **IA e automação**, **Cloud e segurança**; links individuais para os arquivos originais.
- A formação acadêmica continua na linha do tempo, separada dos cursos complementares.
- Nomes dos cursos mantidos conforme os documentos, mesmo no idioma inglês; títulos, controles e textos de interface traduzidos.
- Instituição, horas e conclusão aparecem **somente onde foram confirmados no texto legível do certificado** (Escola Virtual, EBAC e Google/Coursera).
- **AI-900 e AZ-104 são cursos de preparação/introdução, não certificações oficiais Microsoft.** Não exibir como selo profissional da Microsoft.
- Nenhum PDF de terceiros foi embutido no ZIP. A pasta do Drive original continua sob controle do autor.

**Privacidade e acesso:** os botões abrem o comprovante no Google Drive e respeitam as permissões atuais. Antes de publicar, teste as URLs em aba anônima. Certificados podem conter nome completo, código de validação e outros dados pessoais. Avalie caso a caso se vale deixá-los públicos. Não alterei permissões de compartilhamento.

**Validação V4.3:** a prévia HTML foi testada no Chromium por conteúdo inline, em desktop (1440px) e celular (390px): filtros, expansão do catálogo, troca de idioma, troca de tema e ausência de rolagem horizontal passaram. A navegação direta do Chromium para arquivos/localhost é bloqueada neste ambiente. `node --check` da prévia e parsing TypeScript/TSX foram verificados; a instalação npm e o build React ainda exigem execução em máquina com acesso às dependências.

## O que existe na V4.3

- Linha do tempo cronológica atualizada: Analista de Processos (2026–atual), TI (2022–2026), Planejamento de Elétrica e Instrumentação (2020–2021), Almoxarife (2019) e Aprendiz na WestRock (2018).
- Formação exibida separadamente da experiência profissional, com graduação em ADS desde 2026 e cursos complementares.
- Conteúdo da linha do tempo traduzido para português e inglês, tanto no React quanto na prévia offline.
- Empresas e atividades não fornecidas pelo autor não foram inventadas.


- Foto real do Marcelo no hero, otimizada em `public/marcelo-fraitag.webp`. A foto foi fornecida pelo autor; não redistribua sem autorização.
- Hero revisado com o texto escolhido: **“Analista de Processos e desenvolvedor em formação.”**
- Marca `marcelo.dev` sem o monograma MF, incluindo o rodapé.
- Sobre, experiência, contato e principais títulos reescritos em português e inglês, com linguagem mais direta.
- Cargo **Analista de Processos** descrito como atual, sem mencionar uma transição para Analista de Projetos.
- Mantidas as funcionalidades aprovadas na V4: alternância de idioma, tema, filtros, estudos de caso e formulário.

- Design grafite e roxo, com modo claro e escuro.
- Conteúdo em português e inglês com preferência salva.
- Menu responsivo, seções de Projetos, Sobre, Trajetória e Contato.
- Projetos em destaque: Nexus Dev, HelpDesk Mobile e Barbearia Maas; The Odin Project como estudo.
- Filtros por categoria e estudos de caso individuais com detalhes e status do projeto.
- Integração opcional com a API pública do GitHub; estados de falha não inventam estatísticas.
- Formulário ligado ao mesmo endpoint Formspree da V3, exibindo sucesso **somente** após resposta HTTP de sucesso.
- SEO inicial, Open Graph, rotas por hash, foco visível, suporte a teclado e redução de movimento.
- CI com typecheck, testes e build (sem deploy automático).

**Removido por completo:** monitor de consumo / Task Manager, métricas estimadas de RAM, laboratório jQuery na página, tema TMNT/Jujutsu, easter eggs e interações não relevantes à apresentação profissional.

## Conteúdo que ainda precisa de validação

1. **Screenshots reais:** as ilustrações dos cards são visuais conceituais com indicação explícita. Substitua-as por capturas autorizadas dos projetos antes da publicação final. Não publique telas com dados internos do GLPI.
2. **Currículo:** o botão **Solicitar CV** abre um e-mail. Nenhum currículo desatualizado foi anexado. Para oferecer download direto, inclua um PDF atualizado em `public/cv/` e substitua o link do componente `Header`.
3. **Formspree:** `src/lib/links.ts` reutiliza o endpoint publicado na V3 (`https://formspree.io/f/xaeyylnj`). Faça um envio de teste real e valide o recebimento antes de disponibilizá-lo ao público. Erro HTTP, rede ou timeout mostra erro; não finge envio concluído.
4. **Projetos privados:** HelpDesk Mobile e Barbearia Maas não recebem links públicos fictícios. O status de aprovação e as datas precisam ser revisitados antes do lançamento.
5. **Experiência:** a linha do tempo utiliza as datas e cargos informados pelo autor. Nomes de empresas (além da WestRock) e atividades mais específicas ainda podem ser adicionados e validados antes da publicação.
6. **Links e demonstrações:** verifique a disponibilidade dos endereços publicados antes de colocar a V4 no ar.
7. **Domínio:** não incluso; podemos configurar depois.

## Estrutura

```text
portfolio-v4.3-professional/
├── index.html
├── preview.html                 # Abre diretamente no navegador
├── preview/preview.js          # Interações da prévia estática
├── public/
│   ├── marcelo-fraitag.webp     # Foto usada no hero
│   ├── favicon.svg
│   ├── og-cover.png
│   └── og-cover.svg
├── src/
│   ├── App.tsx                 # Layout e navegação por hash
│   ├── main.tsx
│   ├── components/             # Header, cards, estudos de caso, footer
│   ├── sections/               # Hero, projetos, sobre, trajetória, contato
│   ├── hooks/usePreferences.ts # Tema e idioma
│   ├── data/projects.ts        # Projetos e estudos de caso
│   ├── data/copy.ts            # Traduções PT/EN
│   ├── lib/links.ts            # Links e endpoint do contato
│   ├── lib/routing.ts          # Rotas por hash
│   └── styles/global.css
├── tests/
│   ├── routing.test.ts
│   └── branding.test.ts
├── .github/workflows/ci.yml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Links principais

- Portfólio V3 existente: https://marcelofraitag.github.io/meu-portifolio/
- Repositório V3: https://github.com/MarceloFraitag/meu-portifolio
- Nexus Dev: https://github.com/MarceloFraitag/nexus-dev
- Admin Dashboard: https://github.com/MarceloFraitag/projeto_odin_dashboard_nexus

## Créditos e notas

Fonte: DM Sans + Manrope (Google Fonts). Ícones na aplicação principal: Lucide React. Ilustrações dos projetos e capa social: composição própria, não screenshots das aplicações reais.

Comentários de código mantidos curtos e orientados a decisões relevantes. Não foram adicionadas métricas de performance sem medição nem promessas de resultados sem validação.

## Onde revisar as mudanças da V4.3

- `src/sections/Courses.tsx`: catálogo, filtros e links para comprovantes.
- `src/data/courses.json`: lista dos cursos e IDs de documentos conferidos no Drive.
- `tests/courses.test.ts`: validação dos cursos e URLs.
- `src/sections/Hero.tsx`: apresentação e foto real.
- `src/components/Logo.tsx`: marca `marcelo.dev` sem monograma.
- `src/data/copy.ts`: textos PT/EN, cargo e trajetória.
- `src/styles/global.css`: enquadramento da foto e ajustes responsivos.
- `public/marcelo-fraitag.webp`: imagem otimizada da foto enviada.
- `public/og-cover.png`: card social atualizado com a apresentação.
- `preview.html` e `preview/preview.js`: modo de teste sem React.
- `tests/branding.test.ts`: validação do cargo, da apresentação e da foto.

Nenhum arquivo foi publicado na V3. O ZIP é uma **cópia de teste**.

## Alterações da V4.2

- `src/sections/Experience.tsx`: linha do tempo com cinco etapas profissionais e separação para formação.
- `src/data/copy.ts`: datas, cargos e traduções PT/EN.
- `src/styles/global.css`: espaçamento e ajustes para celular.
- `preview.html`: mesmas informações para testar sem npm.
- `tests/experience.test.ts`: validação das etapas e da formação nos dois idiomas.

## Alterações da V4.3

- Seção de cursos inserida após a trajetória e antes de contato.
- Item Cursos no menu, com rótulos em português e inglês.
- Catálogo com 48 cursos, 10 destaques, filtros por área e botão para exibir todos.
- Links diretos para PDFs originais no Drive (ou imagem do curso Android), sujeitos às permissões do autor.
- Sem alteração da V3 publicada.


## V4.4 — Capturas de projetos

As capturas reais estão em `public/projects/`. O catálogo é definido em `src/data/projects.ts` (`screenshots`); a capa é a primeira imagem e as demais aparecem no estudo de caso. A prévia `preview.html` usa as mesmas capas.

**Privacidade:** imagens do HelpDesk receberam desfoque em regiões de chamados e formulários. Antes de publicar, revise novamente os arquivos para garantir que nenhum dado interno apareça.
