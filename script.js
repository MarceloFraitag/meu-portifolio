// Selecionando os elementos do HTML
const botaoOk = document.getElementById('btnOk');
const mensagem = document.getElementById('mensagemNotificacao');

// Variável de controle para verificar o estado da condicional
let clicado = false;

// Evento de clique no botão OK
botaoOk.addEventListener('click', function() {
    // Alterna o estado da variável condicional
    clicado = !clicado;

    // Estrutura condicional (if / else)
    if (clicado === true) {
        mensagem.textContent = "Parabéns, você clicou no botão!";
        mensagem.classList.add('mensagem-visivel');
        mensagem.classList.remove('mensagem-oculta');
    } else {
        mensagem.classList.add('mensagem-oculta');
        mensagem.classList.remove('mensagem-visivel');
    }
});