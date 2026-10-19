import { useState } from 'react';
import { projects, type Category, type Language } from '../data/projects';
import { getCopy } from '../data/copy';
import ProjectCard from '../components/ProjectCard';
import TinyLabel from '../components/TinyLabel';
type Filter = 'all' | Category;

function Projects({ language }: { language: Language }) {
  const c = getCopy(language);
  const [filter, setFilter] = useState<Filter>('all');
  const buttons: { id: Filter; label: string }[] = [{id:'all',label:c.filterAll},{id:'featured',label:c.filterFeatured},{id:'learning',label:c.filterLearning}];
  return <section id="projetos" className="section project-section section-anchor"><div className="container">
    <div className="section-head project-heading"><div><TinyLabel>{c.sectionProjectsEyebrow}</TinyLabel><h2>{c.sectionProjectsTitle}<br/><span>{c.sectionProjectsHighlight}</span></h2><p className="section-description">{c.sectionProjectsDesc}</p></div><div className="filters" role="group" aria-label={language==='pt'?'Filtrar projetos':'Filter projects'}>{buttons.map(item=><button type="button" key={item.id} className={filter===item.id?'active':''} aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}</button>)}</div></div>
    <div className="projects-grid">{projects.filter(p=>filter==='all'||p.category===filter).map(project=><ProjectCard project={project} key={project.slug} language={language}/>)}</div>
  </div></section>;
}

export default Projects;
