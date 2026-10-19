import { assetPath } from '../lib/assetPath';
import type { Language, Project } from '../data/projects';

// Imagens reais dos projetos, com textos alternativos nos dois idiomas.
function ProjectArt({ project, language }: { project: Project; language: Language }) {
  const cover = project.screenshots[0];
  return <div className={`project-visual project-photo visual-${project.theme}`}>
    <img src={assetPath(cover.src)} alt={cover.alt[language]} loading="lazy" decoding="async" />
  </div>;
}

export default ProjectArt;
