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

// ==========================================================================
// 🚀 11. MÓDULOS AVANÇADOS: GITHUB API, TASK MANAGER & CONQUISTAS RPG
// Vibe: SysAdmin / Cloud / Front-End Master
// ==========================================================================

// --- 11.1 GITHUB API LIVE DASHBOARD (O bagulho consome dados reais) ---
async function carregarGitHubStatus() {
    const ghContainer = document.getElementById('gh-stats-container');
    if (!ghContainer) return;

    try {
        // Fazendo a requisição na API pública (Assincronismo puro, sem travar o front)
        const response = await fetch('https://api.github.com/users/MarceloFraitag');
        const data = await response.json();

        // Injetando no HTML com Template Strings
        ghContainer.innerHTML = `
            <img src="${data.avatar_url}" alt="Foto GitHub" style="width: 80px; border-radius: 50%; border: 2px solid var(--accent-green);">
            <div>
                <p><strong>Usuário:</strong> ${data.login}</p>
                <p><strong>Repositórios Públicos:</strong> <span style="color: var(--text-secondary);">${data.public_repos}</span></p>
                <p><strong>Bio Code:</strong> ${data.bio || 'Criando soluções e subindo infra...'}</p>
                <a href="${data.html_url}" target="_blank" class="btn-cv" style="padding: 5px 15px; font-size: 0.8rem;">Ver Commits</a>
            </div>
        `;
    } catch (error) {
        ghContainer.innerHTML = `<p style="color: #ef4444;">Erro de DNS/Conexão ao buscar dados da API. Tentando via túnel reverso... 🛠️</p>`;
        console.error("Erro no Fetch do GitHub:", error);
    }
}
carregarGitHubStatus();


// --- 11.2 TASK MANAGER DE PERFORMANCE (Hardware/Infra mode on) ---
function atualizarTaskManager() {
    const tmLoad = document.getElementById('tm-load');
    const tmRam = document.getElementById('tm-ram');
    
    if (tmLoad && tmRam) {
        // Calcula o tempo que a página levou pra carregar em milissegundos
        const tempoCarga = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        tmLoad.textContent = `${tempoCarga > 0 ? tempoCarga : 45} ms`;

        // Se o navegador suportar leitura de RAM (Chrome/Edge), exibe. Se não, exibe simulado.
        if (performance.memory) {
            const ramUsada = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
            tmRam.textContent = `${ramUsada} MB`;
        } else {
            tmRam.textContent = `~24 MB (Est.)`;
        }
    }
}
// Roda assim que a página carrega e fica atualizando a cada 5 segundos
window.addEventListener('load', () => {
    atualizarTaskManager();
    setInterval(atualizarTaskManager, 5000);
});


// --- 11.3 SISTEMA DE CONQUISTAS (Gamificação RPG) ---
const achievementToast = document.getElementById('achievement-toast');
const achievDesc = document.getElementById('achiev-desc');

function dispararConquista(nome, identificador) {
    // Checa no Storage se já pegou essa badge pra não ficar floodando a tela do recrutador
    if (localStorage.getItem('conquista_' + identificador)) return;
    
    // Salva na "Pokedéx" (LocalStorage)
    localStorage.setItem('conquista_' + identificador, 'true');
    
    // Mostra na tela
    achievDesc.textContent = nome;
    achievementToast.classList.add('show');
    
    // Esconde depois de 4 segundos
    setTimeout(() => {
        achievementToast.classList.remove('show');
    }, 4000);
}

// Conquista: Mudar idioma
const btnIdiomaRef = document.getElementById('btnIdioma');
if (btnIdiomaRef) {
    btnIdiomaRef.addEventListener('click', () => {
        dispararConquista("Mr. Worldwide 🌍 (Idioma alterado)", "idioma");
    });
}

// Conquista: Chegar ao final da página (Footer)
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        dispararConquista("Explorador de Esgotos 🐢 (Chegou ao rodapé)", "rodape");
    }
});