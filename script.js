// ==========================================================================
// 1. Interação do Michelangelo (Frase e Emoji)
// ==========================================================================
const botaoOk = document.getElementById('btnOk');
const mensagem = document.getElementById('mensagemNotificacao');

let clicado = false;

if (botaoOk) {
    botaoOk.addEventListener('click', function() {
        clicado = !clicado;
        const isJujutsu = document.body.classList.contains('tema-jujutsu');

        if (clicado === true) {
            if (idiomaAtual === 'en') {
                mensagem.textContent = isJujutsu ? "Ryōiki Tenkai: Muryōkūsho 🤞👁️" : "COWABUNGA! Pizza time! 🐢";
            } else {
                mensagem.textContent = isJujutsu ? "Ryōiki Tenkai: Muryōkūsho🤞👁️" : "COWABUNGA! Hora da pizza! 🐢";
            }
            mensagem.classList.add('mensagem-visivel');
            mensagem.classList.remove('mensagem-oculta');
        } else {
            mensagem.classList.add('mensagem-oculta');
            mensagem.classList.remove('mensagem-visivel');
        }
    });
}

// ==========================================================================
// 2. Alternador de Tema (TMNT vs Jujutsu) com localStorage
// ==========================================================================
const btnTema = document.getElementById('btnTema');
let temaJujutsuAtivo = false;

function aplicarTema(ativo) {
    const nomeLeo = document.querySelector('.turtle-leo .turtle-name');
    const nomeDon = document.querySelector('.turtle-don .turtle-name');
    const nomeRaph = document.querySelector('.turtle-raph .turtle-name');
    const nomeMikey = document.querySelector('.turtle-mikey .turtle-name');

    if (ativo) {
        document.body.classList.add('tema-jujutsu');
        btnTema.textContent = "Expansão de Domínio 🤞";
        
        if(nomeLeo) nomeLeo.textContent = "Megumi";
        if(nomeDon) nomeDon.textContent = "Gojo";
        if(nomeRaph) nomeRaph.textContent = "Yuji";
        if(nomeMikey) nomeMikey.textContent = "Nanami";
    } else {
        document.body.classList.remove('tema-jujutsu');
        btnTema.textContent = "Modo Esgoto 🟢";
        
        if(nomeLeo) nomeLeo.textContent = "Leo";
        if(nomeDon) nomeDon.textContent = "Don";
        if(nomeRaph) nomeRaph.textContent = "Raph";
        if(nomeMikey) nomeMikey.textContent = "Mikey";
    }
}

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

// ==========================================================================
// 3. Alternador de Idioma (PT / EN)
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

    if (clicado) {
        const isJujutsu = document.body.classList.contains('tema-jujutsu');
        if (idioma === 'en') {
            mensagem.textContent = isJujutsu ? "Domain Expansion: Infinite Void 🤞👁️" : "COWABUNGA! Pizza time! 🐢";
        } else {
            mensagem.textContent = isJujutsu ? "Ryōiki Tenkai: Muryōkūsho 🤞👁️" : "COWABUNGA! Hora da pizza! 🐢";
        }
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
// 4. Scrollspy e Barra de Progresso
// ==========================================================================
const secoes = document.querySelectorAll('section.card');
const linksNav = document.querySelectorAll('nav ul li a');
const btnBackToTop = document.getElementById('btnBackToTop');

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

    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) progressBar.style.width = scrolled + '%';

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
// 5. Scroll Reveal (Animação suave ao rolar)
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
// 6. Filtro Dinâmico de Projetos
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
// 7. Modal de Detalhes dos Projetos
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
// 8. Copiar E-mail (Toast)
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

if (btnCopyEmail) {
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
}

// ==========================================================================
// 9. Easter Egg (Konami Code: Chuva de Pizza ou Vazio Roxo)
// ==========================================================================
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
    
    let msgToast = "";
    if (idiomaAtual === 'en') {
        msgToast = isJujutsu ? "🟣 Imaginary Technique: Purple!" : "🍕 COWABUNGA! Pizza Time!";
    } else {
        msgToast = isJujutsu ? "🟣 Técnica Imaginária: Vazio Roxo!" : "🍕 COWABUNGA! Hora da Pizza!";
    }
    
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

// ==========================================================================
// 10. Validação e Envio do Formulário de Contato
// ==========================================================================
const formContato = document.getElementById('formContato');
const statusForm = document.getElementById('statusForm');
const btnEnviar = document.getElementById('btnEnviar');

if (formContato) {
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
}

// ==========================================================================
// 11. Integrações (GitHub API, Task Manager, Conquistas RPG)
// ==========================================================================
async function carregarGitHubStatus() {
    const ghContainer = document.getElementById('gh-stats-container');
    if (!ghContainer) return;

    try {
        const response = await fetch('https://api.github.com/users/MarceloFraitag');
        const data = await response.json();

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
        ghContainer.innerHTML = `<p style="color: #ef4444;">Erro ao carregar dados do GitHub.</p>`;
    }
}
carregarGitHubStatus();

function atualizarTaskManager() {
    const tmLoad = document.getElementById('tm-load');
    const tmRam = document.getElementById('tm-ram');
    
    if (tmLoad && tmRam) {
        const tempoCarga = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        tmLoad.textContent = `${tempoCarga > 0 ? tempoCarga : 45} ms`;

        if (performance.memory) {
            const ramUsada = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
            tmRam.textContent = `${ramUsada} MB`;
        } else {
            tmRam.textContent = `~24 MB (Est.)`;
        }
    }
}
window.addEventListener('load', () => {
    atualizarTaskManager();
    setInterval(atualizarTaskManager, 5000);
});

const achievementToast = document.getElementById('achievement-toast');
const achievDesc = document.getElementById('achiev-desc');

function dispararConquista(nome, identificador) {
    if (localStorage.getItem('conquista_' + identificador)) return;
    
    localStorage.setItem('conquista_' + identificador, 'true');
    if (achievDesc && achievementToast) {
        achievDesc.textContent = nome;
        achievementToast.classList.add('show');
        
        setTimeout(() => {
            achievementToast.classList.remove('show');
        }, 4000);
    }
}

const btnIdiomaRef = document.getElementById('btnIdioma');
if (btnIdiomaRef) {
    btnIdiomaRef.addEventListener('click', () => {
        dispararConquista("Mr. Worldwide 🌍 (Idioma alterado)", "idioma");
    });
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        dispararConquista("Explorador de Esgotos 🐢 (Chegou ao rodapé)", "rodape");
    }
});

// ==========================================================================
// 12. Laboratório jQuery (Simulador de Help Desk)
// ==========================================================================
$(document).ready(function() {$('#form-chamado-jquery').on('submit', function(e) {
        e.preventDefault();
        
        const tituloProblema = $('#input-chamado').val().trim();
        
        if (tituloProblema !== "") {
            $('#msg-fila-vazia').slideUp('fast');

            const novoTicket = $(`
                <div class="ticket-card" style="display: none;">
                    <span class="ticket-titulo">${tituloProblema}</span>
                    <button class="btn-resolver-ticket">Resolver ✔</button>
                </div>
            `);

            $('#fila-chamados').append(novoTicket);
            novoTicket.slideDown('normal');
            $('#input-chamado').val('');
        }
    });

    $('#fila-chamados').on('click', '.btn-resolver-ticket', function() {
        const ticketAtual = $(this).closest('.ticket-card');
        
        ticketAtual.css('border-left-color', 'var(--accent-green)');
        $(this).text('Fechando...');

        ticketAtual.fadeOut(600, function() {
            $(this).remove();
            
            if ($('.ticket-card').length === 0) {$('#msg-fila-vazia').slideDown('fast');
            }
        });
    });
});