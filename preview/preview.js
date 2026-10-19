// Prévia estática para revisar o visual sem instalar o ambiente React.
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Private mode: keep the choice in memory. */ } }
};
let language = storage.get('v4-preview-lang') === 'en' ? 'en' : 'pt';
let theme = storage.get('v4-preview-theme') === 'light' ? 'light' : 'dark';
const locale = document.getElementById('language');
const themeBtn = document.getElementById('theme');
const menuBtn = document.getElementById('mobilemenu');
const nav = document.getElementById('main-navigation');
function translate() {
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.querySelector('.portrait-frame img').alt = language === 'pt' ? 'Marcelo Fraitag sorrindo, com os braços cruzados' : 'Marcelo Fraitag smiling with his arms crossed';
  document.querySelectorAll('[data-pt][data-en]').forEach(node => { node.textContent = node.dataset[language]; });
  document.querySelectorAll('.course-link').forEach(node => { node.setAttribute('aria-label', (language === 'pt' ? 'Ver comprovante: ' : 'View certificate: ') + node.closest('.course-card').querySelector('h3').textContent); });
  document.querySelector('.course-filters').setAttribute('aria-label', language === 'pt' ? 'Filtrar cursos por área' : 'Filter courses by subject');
  document.querySelector('.language-label').textContent = language.toUpperCase();
  document.querySelector('input[name="name"]').placeholder = language === 'pt' ? 'Como posso te chamar?' : 'What should I call you?';
  document.querySelector('input[name="email"]').placeholder = language === 'pt' ? 'voce@exemplo.com' : 'you@example.com';
  document.querySelector('textarea[name="message"]').placeholder = language === 'pt' ? 'Me conte um pouco sobre a oportunidade...' : 'Tell me about the opportunity...';
  updateCourses();
}
function applyTheme() { document.documentElement.dataset.theme = theme; themeBtn.textContent = theme === 'dark' ? '☼' : '☾'; }
locale.addEventListener('click',()=>{language = language === 'pt'?'en':'pt'; storage.set('v4-preview-lang',language);translate();});
themeBtn.addEventListener('click',()=>{theme = theme === 'dark'?'light':'dark';storage.set('v4-preview-theme',theme);applyTheme();});
menuBtn.addEventListener('click',()=>{const opened = nav.classList.toggle('is-open');menuBtn.setAttribute('aria-expanded',String(opened));menuBtn.textContent = opened ? '✕' : '☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menuBtn.textContent='☰';menuBtn.setAttribute('aria-expanded','false');}));
document.querySelectorAll('.filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('.project-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&button.dataset.filter!==card.dataset.category;});}));
const modal=document.getElementById('detailmodal');
document.querySelectorAll('.case-preview-link').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();document.getElementById('detailtitle').textContent=link.dataset.title;document.getElementById('detailtext').textContent=link.dataset['challenge'+(language==='pt'?'Pt':'En')];modal.classList.add('open');document.getElementById('closemodal').focus();}));
function closeModal(){modal.classList.remove('open');}
document.getElementById('closemodal').addEventListener('click',closeModal);document.getElementById('modalback').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
document.getElementById('copyemail').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('mussulan@gmail.com');document.getElementById('copyemail').textContent='✓';}catch{window.location.href='mailto:mussulan@gmail.com';}});
const previewForm=document.getElementById('previewform');
previewForm.addEventListener('submit',async e=>{e.preventDefault();const status=document.getElementById('previewstatus');const button=previewForm.querySelector('[type="submit"]');button.disabled=true;status.textContent=language==='pt'?'Enviando...':'Sending...';try{const response=await fetch('https://formspree.io/f/xaeyylnj',{method:'POST',headers:{Accept:'application/json'},body:new FormData(previewForm)});if(!response.ok)throw new Error('Submission failed');status.textContent=language==='pt'?'Mensagem enviada! Obrigado pelo contato.':'Message sent! Thanks for reaching out.';previewForm.reset();}catch{status.textContent=language==='pt'?'Não foi possível enviar. Use o e-mail ao lado.':'Could not send. Please use the email shown.';status.classList.add('error');}finally{button.disabled=false;}});



// O catálogo usa os próprios cards do HTML para funcionar mesmo aberto via file://.
const courseButtons = [...document.querySelectorAll('[data-course-filter]')];
const courseCards = [...document.querySelectorAll('[data-course-category]')];
const courseMore = document.getElementById('courses-more');
const courseCount = document.getElementById('courses-count');
let courseFilter = 'all';
let courseExpanded = false;
function updateCourses() {
  let visible = 0;
  courseCards.forEach(card => {
    const show = courseFilter === 'all' ? (courseExpanded || card.dataset.courseFeatured === 'true') : card.dataset.courseCategory === courseFilter;
    card.hidden = !show;
    if (show) visible++;
  });
  courseButtons.forEach(button => {
    const active = button.dataset.courseFilter === courseFilter;
    button.classList.toggle('is-selected',active);
    button.setAttribute('aria-pressed',String(active));
  });
  courseCount.textContent = language === 'pt' ? `${visible} de ${courseCards.length} cursos na seleção` : `${visible} of ${courseCards.length} courses shown`;
  courseMore.hidden = courseFilter !== 'all';
  courseMore.setAttribute('aria-expanded',String(courseExpanded));
  const label = courseMore.querySelector('span');
  label.dataset.pt = courseExpanded ? 'Mostrar só os destaques' : 'Ver catálogo completo';
  label.dataset.en = courseExpanded ? 'Show featured only' : 'See all courses';
  label.textContent = label.dataset[language];
  courseMore.querySelector('[aria-hidden]').textContent = courseExpanded ? '⌃' : '⌄';
}
courseButtons.forEach(button => button.addEventListener('click', () => { courseFilter = button.dataset.courseFilter; updateCourses(); }));
courseMore.addEventListener('click', () => { courseExpanded = !courseExpanded; updateCourses(); });

updateCourses();
translate();
applyTheme();
