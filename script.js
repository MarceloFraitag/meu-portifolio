// Botao de interacao simples (Muda a fala baseada no tema ativo: TMNT vs GOJO)
const botaoOk = document.getElementById('btnOk');
const mensagem = document.getElementById('mensagemNotificacao');
let clicado = false;

if (botaoOk) {
    botaoOk.addEventListener('click', function() {
        clicado = !clicado;
        const isJujutsu = document.body.classList.contains('tema-jujutsu');

        if (clicado) {
            if (idiomaAtual === 'en') {
                mensagem.textContent = isJujutsu ? "Domain Expansion: Infinite Void 🤞👁️" : "COWABUNGA! Pizza time! 🐢";
            } else {
                mensagem.textContent = isJujutsu ? "Expansão de Domínio: Vazio Incomensurável 🤞👁️" : "COWABUNGA! Hora da pizza! 🐢";
            }
            mensagem.classList.add('mensagem-visivel');
            mensagem.classList.remove('mensagem-oculta');
        } else {
            mensagem.classList.add('mensagem-oculta');
            mensagem.classList.remove('mensagem-visivel');
        }
    });
}

// Controle de tema e troca dinamica de textos (Sem alterar a foto de perfil)
const btnTema = document.getElementById('btnTema');
let temaJujutsuAtivo = false;

function aplicarTema(ativo) {
    // Seleciona apenas os nomes no rodape
    const nomeLeo = document.querySelector('.turtle-leo .turtle-name');
    const nomeDon = document.querySelector('.turtle-don .turtle-name');
    const nomeRaph = document.querySelector('.turtle-raph .turtle-name');
    const nomeMikey = document.querySelector('.turtle-mikey .turtle-name');

    if (ativo) {
        document.body.classList.add('tema-jujutsu');
        btnTema.textContent = "Expansão de Domínio 🤞";
        
        // Ativa os Feiticeiros (Modo JJK)
        if(nomeLeo) nomeLeo.textContent = "Megumi";
        if(nomeDon) nomeDon.textContent = "Gojo";
        if(nomeRaph) nomeRaph.textContent = "Yuji";
        if(nomeMikey) nomeMikey.textContent = "Nanami";
    } else {
        document.body.classList.remove('tema-jujutsu');
        btnTema.textContent = "Modo Esgoto 🟢";
        
        // Volta para as Tartarugas (Modo TMNT)
        if(nomeLeo) nomeLeo.textContent = "Leo";
        if(nomeDon) nomeDon.textContent = "Don";
        if(nomeRaph) nomeRaph.textContent = "Raph";
        if(nomeMikey) nomeMikey.textContent = "Mikey";
    }
}

// Verifica no load da pagina se o usuario ja tinha salvo o tema
window.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('temaPreferidoTMNT');
    if (temaSalvo === 'jujutsu') {
        temaJujutsuAtivo = true;
        aplicarTema(true);
    }
});

btnTema.addEventListener('click', function() {
    temaJujutsuAtivo = !temaJujutsuAtivo;
    aplicarTema(temaJujutsuAtivo);
    localStorage.setItem('temaPreferidoTMNT', temaJujutsuAtivo ? 'jujutsu' : 'ninja');
});

// Controle de idioma dinamico (PT/EN)
const btnIdioma = document.getElementById('btnIdioma');
let idiomaAtual = 'pt';

function alternarIdioma(idioma) {
    idiomaAtual = idioma;
    const elementosTraduziveis = document.querySelectorAll('[data-pt][data-en]');

    elementosTraduziveis.forEach(elemento => {
        elemento.textContent = idioma === 'en' ? elemento.getAttribute('data-en') : elemento.getAttribute('data-pt');
    });

    btnIdioma.textContent = idioma === 'en' ? "PT 🇧🇷" : "EN 🇺🇸";

    if (clicado) {
        const isJujutsu = document.body.classList.contains('tema-jujutsu');
        if (idioma === 'en') {
            mensagem.textContent = isJujutsu ? "Domain Expansion: Infinite Void 🤞👁️" : "COWABUNGA! Pizza time! 🐢";
        } else {
            mensagem.textContent = isJujutsu ? "Expansão de Domínio: Vazio Incomensurável 🤞👁️" : "COWABUNGA! Hora da pizza! 🐢";
        }
    }

    localStorage.setItem('idiomaPreferidoTMNT', idioma);
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('idiomaPreferidoTMNT') === 'en') {
        alternarIdioma('en');
    }
});

btnIdioma.addEventListener('click', () => {
    alternarIdioma(idiomaAtual === 'pt' ? 'en' : 'pt');
});

// Scrollspy (marca no menu onde o usuario esta lendo)
const secoes = document.querySelectorAll('section.card');
const linksNav = document.querySelectorAll('nav ul li a');
const btnBackToTop = document.getElementById('btnBackToTop');

window.addEventListener('scroll', () => {
    let secaoAtualId = '';
    secoes.forEach(secao => {
        const topoSecao = secao.offsetTop - 120;
        if (window.scrollY >= topoSecao && window.scrollY < topoSecao + secao.offsetHeight) {
            secaoAtualId = secao.getAttribute('id');
        }
    });

    linksNav.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${secaoAtualId}`) link.classList.add('active');
    });

    // Barra de progresso de leitura
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) progressBar.style.width = (winScroll / height) * 100 + '%';

    // Mostra/oculta botao de voltar pro topo
    winScroll > 350 ? btnBackToTop.classList.add('visivel') : btnBackToTop.classList.remove('visivel');
});

btnBackToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll Reveal (mostra as sessoes suavemente ao rolar pra baixo)
const elementosRevelar = document.querySelectorAll('.card, .project-card, .cert-card');
elementosRevelar.forEach(el => el.classList.add('revelar'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visivel');
    });
}, { threshold: 0.1 });

elementosRevelar.forEach(el => observer.observe(el));

// Filtro da aba de projetos
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

// Modal de detalhes dos projetos
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        document.getElementById('modalTitle').textContent = card.getAttribute('data-title');
        document.getElementById('modalBadge').textContent = card.getAttribute('data-badge');
        document.getElementById('modalDetailsText').textContent = card.getAttribute('data-details');
        document.getElementById('modalLink').setAttribute('href', card.getAttribute('data-link'));

        modal.classList.add('ativo');
        modal.setAttribute('aria-hidden', 'false');
    });
});

const fecharModal = () => {
    modal.classList.remove('ativo');
    modal.setAttribute('aria-hidden', 'true');
};

modalClose.addEventListener('click', fecharModal);
modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });

// Copiar email e mostrar notificacao toast
const btnCopyEmail = document.getElementById('btnCopyEmail');
const toast = document.getElementById('toast');

function mostrarToast(texto) {
    toast.textContent = texto;
    toast.classList.add('visivel');
    setTimeout(() => toast.classList.remove('visivel'), 3000);
}

if(btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
        navigator.clipboard.writeText("mussulan@gmail.com").then(() => {
            mostrarToast(idiomaAtual === 'en' ? "✅ Email copied!" : "✅ E-mail copiado!");
        }).catch(() => {
            mostrarToast("❌ Erro ao copiar.");
        });
    });
}

// Konami Code: Joga pizza ou Hollow Purple se digitar a sequencia
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;
const pizzaContainer = document.getElementById('pizzaRainContainer');

window.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            iniciarChuvaCrossover();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function iniciarChuvaCrossover() {
    const isJujutsu = document.body.classList.contains('tema-jujutsu');
    const icone = isJujutsu ? '🟣' : '🍕';
    
    let msgToast = idiomaAtual === 'en' 
        ? (isJujutsu ? "🟣 Imaginary Technique: Purple!" : "🍕 COWABUNGA! Pizza Time!") 
        : (isJujutsu ? "🟣 Técnica Imaginária: Vazio Roxo!" : "🍕 COWABUNGA! Hora da Pizza!");
    
    mostrarToast(msgToast);

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const item = document.createElement('div');
            item.classList.add('pizza-item');
            item.textContent = icone;
            item.style.left = Math.random() * 100 + 'vw';
            item.style.animationDuration = (Math.random() * 2 + 2) + 's';
            pizzaContainer.appendChild(item);
            setTimeout(() => item.remove(), 4000);
        }, i * 150);
    }
}

// Validacao do form de contato
const formContato = document.getElementById('formContato');
const statusForm = document.getElementById('statusForm');
const btnEnviar = document.getElementById('btnEnviar');

if(formContato){
    formContato.addEventListener('submit', async function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            statusForm.textContent = "E-mail inválido.";
            statusForm.style.color = "#ef4444";
            statusForm.classList.remove('mensagem-oculta');
            return;
        }

        btnEnviar.textContent = "Enviando...";
        btnEnviar.disabled = true;

        try {
            const res = await fetch(formContato.action, { method: 'POST', body: new FormData(formContato), headers: { 'Accept': 'application/json' } });
            statusForm.textContent = `Valeu, ${nome}! Mensagem enviada.`;
            statusForm.style.color = "var(--accent-green)";
            formContato.reset();
        } catch {
            statusForm.textContent = `Erro ao enviar. Tente pelo e-mail direto.`;
            statusForm.style.color = "#ef4444";
        } finally {
            statusForm.classList.remove('mensagem-oculta');
            btnEnviar.textContent = "Enviar Mensagem";
            btnEnviar.disabled = false;
        }
    });
}

// Consumo da API do GitHub no dashboard
async function carregarGitHub() {
    const ghContainer = document.getElementById('gh-stats-container');
    if (!ghContainer) return;
    try {
        const res = await fetch('https://api.github.com/users/MarceloFraitag');
        const data = await res.json();
        ghContainer.innerHTML = `
            <img src="${data.avatar_url}" style="width: 80px; border-radius: 50%; border: 2px solid var(--accent-green);">
            <div>
                <p><strong>Usuário:</strong> ${data.login}</p>
                <p><strong>Repositórios:</strong> ${data.public_repos}</p>
                <a href="${data.html_url}" target="_blank" class="btn-cv" style="padding: 5px 15px;">Ver Perfil</a>
            </div>`;
    } catch {
        ghContainer.innerHTML = `<p style="color: #ef4444;">Erro ao carregar dados do GitHub.</p>`;
    }
}
carregarGitHub();

// Gerenciador de tarefas simulado (Memoria e DOM load)
function atualizarTaskManager() {
    const tmLoad = document.getElementById('tm-load');
    const tmRam = document.getElementById('tm-ram');
    if (tmLoad && tmRam) {
        tmLoad.textContent = `${window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart} ms`;
        tmRam.textContent = performance.memory ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB` : `~24 MB`;
    }
}
window.addEventListener('load', () => { atualizarTaskManager(); setInterval(atualizarTaskManager, 5000); });

// Gamificacao basica (Conquistas no rodape)
function dispararConquista(nome, id) {
    if (localStorage.getItem('conquista_' + id)) return;
    localStorage.setItem('conquista_' + id, 'true');
    const achievDesc = document.getElementById('achiev-desc');
    const achievementToast = document.getElementById('achievement-toast');
    if(achievDesc && achievementToast){
        achievDesc.textContent = nome;
        achievementToast.classList.add('show');
        setTimeout(() => achievementToast.classList.remove('show'), 4000);
    }
}

if(btnIdioma) {
    btnIdioma.addEventListener('click', () => dispararConquista("Mr. Worldwide 🌍", "idioma"));
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) dispararConquista("Explorador 🐢", "rodape");
});

// Laboratorio de jQuery (Help Desk)
$(document).ready(function() {$('#form-chamado-jquery').on('submit', function(e) {
        e.preventDefault();
        const titulo = $('#input-chamado').val().trim();
        if (titulo !== "") {
            $('#msg-fila-vazia').slideUp('fast');
            const novoTicket = $(`
                <div class="ticket-card" style="display: none;">
                    <span class="ticket-titulo">${titulo}</span>
                    <button class="btn-resolver-ticket">Resolver ✔</button>
                </div>
            `);
            $('#fila-chamados').append(novoTicket);
            novoTicket.slideDown('normal');
            $('#input-chamado').val('');
        }
    });

    $('#fila-chamados').on('click', '.btn-resolver-ticket', function() {
        const ticket = $(this).closest('.ticket-card');
        ticket.css('border-left-color', 'var(--accent-green)');
        $(this).text('Fechando...');
        ticket.fadeOut(600, function() {
            $(this).remove();
            if ($('.ticket-card').length === 0)$('#msg-fila-vazia').slideDown('fast');
        });
    });
});