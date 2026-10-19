import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import type { Language, Project } from '../data/projects';
import { getCopy } from '../data/copy';
import ProjectArt from './ProjectArt';

function ProjectCard({ project, language }: { project: Project; language: Language }) {
  const c = getCopy(language);
  return <article className="project-card">
    <ProjectArt project={project} language={language}/>
    <div className="project-card-body">
      <div className="project-meta"><span>{project.number} / {project.kind[language]}</span><span className="project-status"><i/>{project.status[language]}</span></div>
      <h3>{project.title}</h3>
      <p>{project.description[language]}</p>
      <div className="tech-tags">{project.technologies.slice(0,5).map(tech=><span key={tech}>{tech}</span>)}</div>
      <div className="project-links"><a href={`#/project/${project.slug}`}>{c.viewCase}<ArrowUpRight size={17}/></a>{project.github && <a className="project-secondary-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${c.openCode}: ${project.title}`}><Github size={17}/></a>}{project.demo && <a className="project-secondary-link" href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${c.openDemo}: ${project.title}`}><ExternalLink size={17}/></a>}</div>
    </div>
  </article>;
}

export default ProjectCard;
