# 🐢 Marcelo | Dev Portfolio (TMNT Clean & Firm Edition)

Portfólio web responsivo, acessível e funcional com o tema das Tartarugas Ninja, desenvolvido para o módulo de Front-End da **EBAC** utilizando HTML5 semântico, CSS3 moderno, JavaScript puro (Vanilla JS ES6+) e **jQuery**.

---

## 📌 Funcionalidades, Integrações e Ajustes Visuais

- **Simulador de Help Desk (Lab jQuery):** Um mini-aplicativo de triagem de chamados interativo utilizando jQuery para manipulação do DOM e animações.
- **Dashboard Assíncrono (GitHub API):** Consumo em tempo real da API pública do GitHub utilizando `fetch` e `async/await` para exibir o status atualizado do perfil e repositórios.
- **Task Manager de Performance:** Monitor nativo construído com a API `window.performance` para calcular uso estimado de RAM e o tempo de carregamento do DOM.
- **Sistema de Conquistas (Gamificação RPG):** Notificações no estilo "Achievement Unlocked" que mapeiam a interação do usuário e salvam o progresso de forma persistente no `localStorage`.
- **Layout Firme & Sem Deslocamentos:** Removidos efeitos de rotação 3D bruscos, garantindo uma navegação estável focada em acessibilidade e trocas sutis de cores.
- **Filtro Dinâmico de Projetos:** Botões que filtram os trabalhos em tempo real por categoria (*Todos*, *Front-End*, *Cloud & Infra*).
- **Modal Expansível de Detalhes:** Janela *pop-up* ativada ao clicar nos cards para leitura descritiva completa.
- **Easter Egg via Teclado (Konami Code):** Digitar a sequência `↑ ↑ ↓ ↓ ← → ← →` ativa uma chuva de fatias de pizza na tela 🍕.
- **Alternador de Temas & Idiomas:** Troca dinâmica de paleta de cores (Modo Ninja/Esgoto) e tradução de texto (PT/EN) com salvamento no armazenamento do navegador.

---

## 📝 Laboratório jQuery (Avaliação do Módulo EBAC)

Neste portfólio, foi incluída a seção **"Simulador de Help Desk"** (logo acima da área de contato) para demonstrar o domínio dos requisitos práticos e teóricos do módulo de jQuery:

1. **A importância do jQuery na simplificação do DOM:** O jQuery simplifica drasticamente a manipulação da árvore DOM e a captura de eventos multiplataforma. Enquanto no JavaScript puro (`Vanilla`) precisaríamos de estruturas verbosas e métodos extensos como `document.querySelectorAll()` e `document.createElement()`, o jQuery permite selecionar, iterar e injetar elementos de forma extremamente concisa usando a sintaxe `$()`. Isso garante altíssima produtividade e legibilidade, essenciais para o tratamento de chamados do nosso simulador.
2. **Uso de Seletores e Eventos:** Foram aplicados na captura da submissão do formulário (`$('#form-chamado-jquery').on('submit')`) e, principalmente, na **delegação de eventos** de clique dinâmicos (`$('#fila-chamados').on('click', '.btn-resolver-ticket')`). A delegação é crucial aqui para capturar ações em elementos (os cards de tickets) que ainda não existiam na carga inicial da página.
3. **Técnicas de CSS (Flexbox e Grid):** O container principal do laboratório utiliza `display: grid` para dividir responsivamente a tela entre a área de input (formulário) e a área de output (fila de chamados). Internamente, os cards dos tickets gerados utilizam `display: flex` com `justify-content: space-between` para alinhar de forma perfeitamente fluida o título do problema relatado à esquerda e o botão de ação à direita.
4. **Eficácia das Animações e Interações:** Foram implementados os métodos `.slideDown()` para a entrada cadenciada do card recém-gerado e `.fadeOut()` acompanhado de manipulação de CSS (mudança da borda para verde) para o encerramento do chamado. A eficácia dessas animações em projetos web se dá pelo forte **feedback visual (UX)** gerado; o usuário não fica em dúvida se o formulário foi enviado ou se a exclusão foi processada, pois o movimento suave da interface confirma o êxito da ação em tempo real, sem saltos bruscos ou quebras de layout.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**
- **CSS3 Moderno** (Flexbox, CSS Grid, Variáveis `:root`, Backdrop-filter)
- **JavaScript (ES6+)** (APIs Assíncronas, IntersectionObserver, Clipboard API, Performance API, LocalStorage)
- **jQuery (3.7.1)**
- **Git & GitHub / GitHub Pages**

---

> *Mestre Splinter aprova este código!* 🍕