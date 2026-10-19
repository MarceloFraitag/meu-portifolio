import { useEffect, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Language } from '../data/projects';
import { profileLinks } from '../lib/links';

function GitHubInfo({ language }: { language: Language }) {
  const [repos, setRepos] = useState<number | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/MarceloFraitag', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then(response => { if (!response.ok) throw new Error(`GitHub ${response.status}`); return response.json(); })
      .then((data: { public_repos?: number }) => { if (typeof data.public_repos === 'number') setRepos(data.public_repos); })
      .catch(() => { /* Link para o GitHub permanece disponível. */ });
    return () => controller.abort();
  }, []);
  return <a className="github-pill" href={profileLinks.github} target="_blank" rel="noopener noreferrer"><Github size={18}/><span>{language==='pt'?'Meu GitHub':'My GitHub'}</span>{repos!==null&&<span className="github-count">{repos} {language==='pt'?'repositórios públicos':'public repositories'}</span>}<ArrowUpRight size={16}/></a>;
}

export default GitHubInfo;
