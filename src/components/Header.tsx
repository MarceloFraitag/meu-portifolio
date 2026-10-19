import { useEffect, useState } from 'react';
import { ArrowUpRight, Globe2, Menu, Moon, Sun, X } from 'lucide-react';
import { getCopy } from '../data/copy';
import type { Language } from '../data/projects';
import type { Theme } from '../hooks/usePreferences';
import { profileLinks } from '../lib/links';
import Logo from './Logo';

function Header({ language, setLanguage, theme, setTheme }: {
  language: Language; setLanguage: (value: Language) => void; theme: Theme; setTheme: (value: Theme) => void;
}) {
  const c = getCopy(language);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header">
    <div className="container header-inner">
      <a className="logo-link" href="#inicio" onClick={() => setOpen(false)}><Logo /></a>
      <nav id="main-navigation" className={`header-nav ${open ? 'is-open' : ''}`} aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}>
        <a href="#projetos" onClick={() => setOpen(false)}>{c.nav.projects}</a>
        <a href="#sobre" onClick={() => setOpen(false)}>{c.nav.about}</a>
        <a href="#experiencia" onClick={() => setOpen(false)}>{c.nav.experience}</a>
        <a href="#cursos" onClick={() => setOpen(false)}>{c.nav.courses}</a>
        <a href="#contato" onClick={() => setOpen(false)}>{c.nav.contact}</a>
      </nav>
      <div className="header-controls">
        <button type="button" className="icon-button" aria-label={c.language} title={c.language} onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}><Globe2 size={17}/><span className="language-label">{language.toUpperCase()}</span></button>
        <button type="button" className="icon-button theme-button" aria-label={c.theme} title={c.theme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={19}/> : <Moon size={19}/>}</button>
        <a className="btn btn-nav-cv" href={`mailto:${profileLinks.email}?subject=${encodeURIComponent(language === 'pt' ? 'Solicitação de currículo' : 'Résumé request')}`}>{c.nav.resume}<ArrowUpRight size={16}/></a>
        <button type="button" className="icon-button mobile-menu" aria-label={open ? c.closeMenu : c.menu} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21}/> : <Menu size={21}/>}</button>
      </div>
    </div>
  </header>;
}

export default Header;
