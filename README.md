# 🐢 Marcelo | Dev Portfolio V3 — Professional + Geek Edition

Esta versão mantém a identidade TMNT/Jujutsu do portfólio, mas coloca a apresentação profissional em primeiro plano.

## Principais melhorias da V3

- Hero em duas colunas com resumo técnico em formato de terminal.
- Navegação responsiva com menu mobile acessível.
- Busca de projetos por nome/tecnologia e filtros combináveis.
- Tags de tecnologias em cada projeto e também no modal.
- Modal com foco por teclado, `Escape` e focus trap.
- GitHub API com cache de sessão, timeout e fallback.
- Formulário com validação nativa, timeout e campo honeypot anti-spam.
- Help Desk em jQuery mantido, com inserção segura de texto.
- Melhorias de contraste, `:focus-visible` e `prefers-reduced-motion`.
- Monitor de página recolhível.
- Fallback para imagens ausentes.
- Ano do rodapé atualizado automaticamente.
- SEO ampliado com canonical, Open Graph, Twitter Card e JSON-LD.
- CSS de impressão para uma versão limpa do portfólio.
- Layout reorganizado para desktop, tablet e celular.

## Tecnologias

- HTML5 semântico
- CSS3 moderno (Grid, Flexbox, Custom Properties, responsividade)
- JavaScript ES6+
- jQuery 3.7.1 no laboratório de Help Desk
- GitHub API
- Formspree
- LocalStorage / SessionStorage
- IntersectionObserver / Performance API / Clipboard API

## Arquivos

- `index.html`
- `style.css`
- `script.js`
- `README.md`
- `CHANGELOG.md`

## Assets esperados

Mantenha junto do projeto, se quiser usar os visuais originais:

- `mikey-avatar.jpeg`
- `mikey.gif`
- `capa-portfolio.jpg`

Se `mikey-avatar.jpeg` ou `mikey.gif` não estiverem presentes, a V3 possui fallback para evitar quebra visual.

## Execução local

Basta abrir `index.html` no navegador. Para um teste mais próximo do GitHub Pages, use um servidor local simples, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.
