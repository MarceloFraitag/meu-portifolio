// ==========================================================================
// 1. BOTÃO DE INTERAÇÃO SIMPLES (Frase do Michelangelo + Emoji de Tartaruga 🐢)
// ==========================================================================
const botaoOk = document.getElementById('btnOk');
const mensagem = document.getElementById('mensagemNotificacao');

let clicado = false;

if (botaoOk) {
    botaoOk.addEventListener('click', function() {
        clicado = !clicado;

        if (clicado === true) {
            mensagem.textContent = idiomaAtual === 'en'
                ? "COWABUNGA! Pizza time! 🐢"
                : "COWABUNGA! Hora da pizza! 🐢";
            mensagem.classList.add('mensagem-visivel');
            mensagem.classList.remove('mensagem-oculta');
        } else {
            mensagem.classList.add('mensagem-oculta');
            mensagem.classList.remove('mensagem-visivel');
        }
    });
}

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

    // Atualiza a mensagem da tartaruga caso esteja visível durante a troca de idioma
    if (clicado) {
        mensagem.textContent = idioma === 'en'
            ? "COWABUNGA! Pizza time! 🐢"
            : "COWABUNGA! Hora da pizza! 🐢";
    }

    localStorage.setItem('idiomaPreferidoTMNT', idioma);
}

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
// 4. SCROLLSPY & BARRA DE PROGRESSO DE LEITURA
// ==========================================================================
const secoes = document.querySelectorAll('section.card');
const linksNav = document.querySelectorAll('nav ul li a');
const btnBackToTop = document.getElementById('btnBackToTop');

window.addEventListener('scroll', () => {
    // Scrollspy
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

    // Barra de Progresso
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) progressBar.style.width = scrolled + '%';

    // Botão Voltar ao Topo
    if (winScroll > 350) {
        btnBackToTop.classList.add('visivel');
    } else {
        btnBackToTop.classList.remove('visivel');
    }
});

btnBackToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================================
// 5. SCROLL REVEAL (Animação de Aparição Suave na Entrada)
// ==========================================================================
const elementosRevelar = document.querySelectorAll('.card, .project-card, .cert-card');

elementosRevelar.forEach(el => el.classList.add('revelar'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

elementosRevelar.forEach(el => observer.observe(el));

// ==========================================================================
// 6. FILTRO DINÂMICO DE PROJETOS
// ==========================================================================
const botoesFiltro = document.querySelectorAll('.btn-filter');
const cardsProjeto = document.querySelectorAll('.project-card');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('active'));
        botao.classList.add('active');

        const categoria = botao.getAttribute('data-filter');

        cardsProjeto.forEach(card => {
            if (categoria === 'all' || card.getAttribute('data-category') === categoria) {
                card.classList.remove('ocultado');
            } else {
                card.classList.add('ocultado');
            }
        });
    });
});

// ==========================================================================
// 7. MODAL EXPANSÍVEL PARA DETALHES DOS PROJETOS
// ==========================================================================
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalBadge = document.getElementById('modalBadge');
const modalDetailsText = document.getElementById('modalDetailsText');
const modalLink = document.getElementById('modalLink');

document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        modalTitle.textContent = card.getAttribute('data-title');
        modalBadge.textContent = card.getAttribute('data-badge');
        modalDetailsText.textContent = card.getAttribute('data-details');
        modalLink.setAttribute('href', card.getAttribute('data-link'));

        modal.classList.add('ativo');
        modal.setAttribute('aria-hidden', 'false');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('ativo');
        modal.setAttribute('aria-hidden', 'true');
    }
});

// ==========================================================================
// 8. NOTIFICAÇÃO TOAST AO COPIAR E-MAIL
// ==========================================================================
const btnCopyEmail = document.getElementById('btnCopyEmail');
const toast = document.getElementById('toast');

function mostrarToast(mensagemTexto) {
    toast.textContent = mensagemTexto;
    toast.classList.add('visivel');
    setTimeout(() => {
        toast.classList.remove('visivel');
    }, 3000);
}

btnCopyEmail.addEventListener('click', () => {
    const emailContato = "mussulan@gmail.com";
    navigator.clipboard.writeText(emailContato).then(() => {
        const msg = idiomaAtual === 'en' ? "✅ Email copied to clipboard!" : "✅ E-mail copiado para a área de transferência!";
        mostrarToast(msg);
    }).catch(() => {
        const msg = idiomaAtual === 'en' ? "❌ Error copying email." : "❌ Erro ao copiar e-mail.";
        mostrarToast(msg);
    });
});

// ==========================================================================
// 9. EASTER EGG VIA TECLADO (Apenas Setas - Chuva de Pizza 🍕)
// Sequência: ↑ ↑ ↓ ↓ ← → ← →
// ==========================================================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;
const pizzaContainer = document.getElementById('pizzaRainContainer');

window.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            iniciarChuvaDePizza();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function iniciarChuvaDePizza() {
    mostrarToast(idiomaAtual === 'en' ? "🍕 COWABUNGA! Pizza Time!" : "🍕 COWABUNGA! Hora da Pizza!");
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const pizza = document.createElement('div');
            pizza.classList.add('pizza-item');
            pizza.textContent = '🍕';
            pizza.style.left = Math.random() * 100 + 'vw';
            pizza.style.animationDuration = (Math.random() * 2 + 2) + 's';
            pizzaContainer.appendChild(pizza);

            setTimeout(() => pizza.remove(), 4000);
        }, i * 150);
    }
}

// ==========================================================================
// 10. VALIDAÇÃO AVANÇADA DE E-MAIL COM REGEX E ENVIO DO FORMULÁRIO
// ==========================================================================
const formContato = document.getElementById('formContato');
const statusForm = document.getElementById('statusForm');
const btnEnviar = document.getElementById('btnEnviar');

formContato.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagemTexto = document.getElementById('mensagem').value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nome === "" || mensagemTexto === "") {
        statusForm.textContent = "Por favor, preencha todos os campos do formulário.";
        statusForm.style.color = "#ef4444";
        statusForm.classList.remove('mensagem-oculta');
        statusForm.classList.add('mensagem-visivel');
        return;
    }

    if (!regexEmail.test(email)) {
        statusForm.textContent = "Por favor, insira um e-mail válido (ex: nome@dominio.com).";
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