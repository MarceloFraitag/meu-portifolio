import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Language } from '../data/projects';
import { getCopy } from '../data/copy';
import TinyLabel from '../components/TinyLabel';

function Hero({ language }: { language: Language }) {
  const c = getCopy(language);
  return <section id="inicio" className="hero section-anchor">
    <div className="hero-texture" aria-hidden="true"/>
    <div className="container hero-grid">
      <div className="hero-text">
        <TinyLabel>{c.eyebrow}</TinyLabel>
        <h1>{c.heroLine1}<br/><span className="gradient-text">{c.heroLine2}</span></h1>
        <p className="hero-role">{c.heroRole}</p>
        <p className="hero-description">{c.heroDescription}</p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#projetos">{c.heroAction}<ArrowUpRight size={19}/></a>
          <a className="btn btn-ghost" href="#contato">{c.heroContact}<ArrowRight size={19}/></a>
        </div>
        <div className="hero-footnote"><span className="hero-line"/><span>{c.heroCaption}</span><a href="#projetos" aria-label={c.heroAction}><ArrowDown size={16}/></a></div>
      </div>
      <div className="hero-portrait">
        <div className="portrait-frame">
          <img src={`${import.meta.env.BASE_URL}marcelo-fraitag.webp`} alt={language === 'pt' ? 'Marcelo Fraitag sorrindo, com os braços cruzados' : 'Marcelo Fraitag smiling with his arms crossed'} width="1000" height="1333" fetchPriority="high" decoding="async"/>
        </div>
        <div className="portrait-accent" aria-hidden="true"/>
      </div>
    </div>
  </section>;
}

export default Hero;
