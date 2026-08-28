// ==========================================================================
// 1. LÓGICA DO BOTÃO INTERATIVO DA SEÇÃO "SOBRE MIM"
// ==========================================================================

// Captura dos elementos do DOM pelo ID
const botaoOk = document.getElementById('btnOk');
const mensagem = document.getElementById('mensagemNotificacao');

// Variável booleana de controle para alternar o estado do clique
let clicado = false;

// Evento de escuta de clique no botão
botaoOk.addEventListener('click', function() {
    // Inverte o valor da variável de controle (toggle)
    clicado = !clicado;

    // Estrutura condicional (if / else) para alternar classes de exibição
    if (clicado === true) {
        mensagem.textContent = "Parabéns! Você interagiu com o portfólio da EBAC.";
        mensagem.classList.add('mensagem-visivel');
        mensagem.classList.remove('mensagem-oculta');
    } else {
        mensagem.classList.add('mensagem-oculta');
        mensagem.classList.remove('mensagem-visivel');
    }
});

// ==========================================================================
// 2. LÓGICA DO ALTERNADOR DE TEMA (MODO NINJA vs MODO ESGOTO)
// ==========================================================================

const btnTema = document.getElementById('btnTema');
let temaEsgotoAtivo = false;

// Evento que ativa/desativa a classe CSS 'tema-esgoto' no elemento <body>
btnTema.addEventListener('click', function() {
    temaEsgotoAtivo = !temaEsgotoAtivo;
    
    // Liga ou desliga a classe no body
    document.body.classList.toggle('tema-esgoto');

    // Atualiza o texto do botão conforme o tema ativo
    if (temaEsgotoAtivo) {
        btnTema.textContent = "Modo Ninja 🥷";
    } else {
        btnTema.textContent = "Modo Esgoto 🟢";
    }
});

// ==========================================================================
// 3. LÓGICA DE VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ==========================================================================

const formContato = document.getElementById('formContato');
const statusForm = document.getElementById('statusForm');

formContato.addEventListener('submit', function(event) {
    // Previne o comportamento padrão de recarregar a página ao enviar o formulário
    event.preventDefault(); 
    
    // Captura os valores inseridos pelo usuário e remove espaços em branco adicionais
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagemTexto = document.getElementById('mensagem').value.trim();

    // Valida se todos os campos foram preenchidos
    if (nome !== "" && email !== "" && mensagemTexto !== "") {
        statusForm.textContent = `Obrigado pelo contato, ${nome}! Sua mensagem foi simulada com sucesso.`;
        statusForm.style.color = "var(--accent-green)";
        statusForm.classList.remove('mensagem-oculta');
        statusForm.classList.add('mensagem-visivel');

        // Limpa os campos do formulário após envio bem-sucedido
        formContato.reset();
    } else {
        statusForm.textContent = "Por favor, preencha todos os campos do formulário.";
        statusForm.style.color = "#ef4444"; // Cor vermelha para alerta de erro
        statusForm.classList.remove('mensagem-oculta');
        statusForm.classList.add('mensagem-visivel');
    }
});