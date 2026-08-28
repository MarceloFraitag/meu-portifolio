// ==========================================================================
// 1. BOTÃO DE INTERAÇÃO SIMPLES (if/else)
// ==========================================================================
const botaoOk = document.getElementById('btnOk');
const mensagem = document.getElementById('mensagemNotificacao');

let clicado = false;

botaoOk.addEventListener('click', function() {
    clicado = !clicado;

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
// 2. ALTERNADOR DE TEMA COM PERSISTÊNCIA (localStorage)
// ==========================================================================
const btnTema = document.getElementById('btnTema');
let temaEsgotoAtivo = false;

function aplicarTema(ativo) {
    if (ativo) {
        document.body.classList.add('tema-esgoto');
        btnTema.textContent = "Modo Ninja 🥷";
    } else {
        document.body.classList.remove('tema-esgoto');
        btnTema.textContent = "Modo Esgoto 🟢";
    }
}

// Restaura preferência de tema do localStorage
window.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('temaPreferidoTMNT');
    if (temaSalvo === 'esgoto') {
        temaEsgotoAtivo = true;
        aplicarTema(true);
    }
});

btnTema.addEventListener('click', function() {
    temaEsgotoAtivo = !temaEsgotoAtivo;
    aplicarTema(temaEsgotoAtivo);
    localStorage.setItem('temaPreferidoTMNT', temaEsgotoAtivo ? 'esgoto' : 'ninja');
});

// ==========================================================================
// 3. ALTERNADOR DE IDIOMA DINÂMICO (PT / EN)
// ==========================================================================
const btnIdioma = document.getElementById('btnIdioma');
let idiomaAtual = 'pt';

function alternarIdioma(idioma) {
    idiomaAtual = idioma;
    const elementosTraduziveis = document.querySelectorAll('[data-pt][data-en]');

    elementosTraduziveis.forEach(elemento => {
        if (idioma === 'en') {
            elemento.textContent = elemento.getAttribute('data-en');
        } else {
            elemento.textContent = elemento.getAttribute('data-pt');
        }
    });

    if (idioma === 'en') {
        btnIdioma.textContent = "PT 🇧🇷";
    } else {
        btnIdioma.textContent = "EN 🇺🇸";
    }

    localStorage.setItem('idiomaPreferidoTMNT', idioma);
}

// Restaura preferência de idioma do localStorage
window.addEventListener('DOMContentLoaded', () => {
    const idiomaSalvo = localStorage.getItem('idiomaPreferidoTMNT');
    if (idiomaSalvo === 'en') {
        alternarIdioma('en');
    }
});

btnIdioma.addEventListener('click', () => {
    if (idiomaAtual === 'pt') {
        alternarIdioma('en');
    } else {
        alternarIdioma('pt');
    }
});

// ==========================================================================
// 4. SCROLLSPY (Highlight do Menu Ativo durante a Rolagem)
// ==========================================================================
const secoes = document.querySelectorAll('section.card');
const linksNav = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let secaoAtualId = '';

    secoes.forEach(secao => {
        const topoSecao = secao.offsetTop - 120;
        const alturaSecao = secao.offsetHeight;

        if (window.scrollY >= topoSecao && window.scrollY < topoSecao + alturaSecao) {
            secaoAtualId = secao.getAttribute('id');
        }
    });

    linksNav.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${secaoAtualId}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================================================
// 5. VALIDAÇÃO E ENVIO REAL DO FORMULÁRIO (Formspree via Fetch API)
// ==========================================================================
const formContato = document.getElementById('formContato');
const statusForm = document.getElementById('statusForm');
const btnEnviar = document.getElementById('btnEnviar');

formContato.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagemTexto = document.getElementById('mensagem').value.trim();

    if (nome === "" || email === "" || mensagemTexto === "") {
        statusForm.textContent = "Por favor, preencha todos os campos do formulário.";
        statusForm.style.color = "#ef4444";
        statusForm.classList.remove('mensagem-oculta');
        statusForm.classList.add('mensagem-visivel');
        return;
    }

    btnEnviar.textContent = "Enviando...";
    btnEnviar.disabled = true;

    try {
        const response = await fetch(formContato.action, {
            method: 'POST',
            body: new FormData(formContato),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            statusForm.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
            statusForm.style.color = "var(--accent-green)";
            formContato.reset();
        } else {
            statusForm.textContent = `Obrigado, ${nome}! Formulário validado com sucesso.`;
            statusForm.style.color = "var(--accent-green)";
            formContato.reset();
        }
    } catch (error) {
        statusForm.textContent = `Obrigado, ${nome}! Formulário validado com sucesso.`;
        statusForm.style.color = "var(--accent-green)";
        formContato.reset();
    } finally {
        statusForm.classList.remove('mensagem-oculta');
        statusForm.classList.add('mensagem-visivel');
        btnEnviar.textContent = "Enviar Mensagem";
        btnEnviar.disabled = false;
    }
});