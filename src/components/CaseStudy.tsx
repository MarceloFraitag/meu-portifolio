import { assetPath } from '../lib/assetPath';
import { ArrowLeft, ArrowUpRight, Github, ShieldCheck } from 'lucide-react';
import type { Language } from '../data/projects';
import { findProject } from '../data/projects';
import { getCopy } from '../data/copy';
import TinyLabel from './TinyLabel';
import ProjectArt from './ProjectArt';

function CaseStudy({ slug, language }: { slug: string; language: Language }) {
  const c = getCopy(language);
  const project = findProject(slug);
  if (!project) return <main className="case-404 container"><h1>{c.projectUnavailable}</h1><a className="btn btn-primary" href="#projetos">{c.back}<ArrowLeft size={18}/></a></main>;
  const blocks = [
    {label:c.challenge,value:project.challenge[language]},
    {label:c.solution,value:project.solution[language]},
    {label:c.contribution,value:project.contribution[language]},
    {label:c.outcome,value:project.outcome[language]},
  ];
  return <main id="conteudo" className="case-main"><div className="container"><a href="#projetos" className="case-back"><ArrowLeft size={18}/>{c.back}</a><div className="case-hero"><div><TinyLabel>{c.details} / {project.number}</TinyLabel><h1>{project.title}<span className="case-dot">.</span></h1><p className="case-description">{project.description[language]}</p><span className="case-status"><span className="small-light"/>{project.status[language]}</span><div className="case-actions">{project.github&&<a href={project.github} className="btn btn-ghost" target="_blank" rel="noopener noreferrer"><Github size={17}/>{c.openCode}<ArrowUpRight size={17}/></a>}{project.demo&&<a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{c.openDemo}<ArrowUpRight size={17}/></a>}</div></div><ProjectArt project={project} language={language}/></div>{project.screenshots.length > 1 && <section className="case-gallery" aria-label={language === 'pt' ? 'Capturas do projeto' : 'Project screenshots'}>{project.screenshots.slice(1).map((shot, index) => <figure key={shot.src}><img src={assetPath(shot.src)} alt={shot.alt[language]} loading="lazy" decoding="async"/><figcaption>{language === 'pt' ? `Captura ${index + 2}` : `Screenshot ${index + 2}`}</figcaption></figure>)}</section>}<div className="case-body"><div className="case-copy"><TinyLabel>{c.overview}</TinyLabel>{blocks.map((block,i)=><section key={i}><h2>{block.label}</h2><p>{block.value}</p></section>)}</div><aside className="case-aside"><h3>{c.stack}</h3><div className="tech-tags">{project.technologies.map(item=><span key={item}>{item}</span>)}</div><p>{c.detailsNote}</p>{!project.github&&<div className="case-private"><ShieldCheck size={19}/>{c.privateInfo}</div>}</aside></div></div></main>;
}

export default CaseStudy;
