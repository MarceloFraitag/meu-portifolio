import { useEffect, useState } from 'react';
import usePreferences from './hooks/usePreferences';
import { getCopy } from './data/copy';
import { findProject } from './data/projects';
import { projectFromHash } from './lib/routing';
import Header from './components/Header';
import CaseStudy from './components/CaseStudy';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import StackStrip from './sections/StackStrip';
import Projects from './sections/Projects';
import About from './sections/About';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Courses from './sections/Courses';

export default function App() {
  const { language, setLanguage, theme, setTheme } = usePreferences();
  const [slug, setSlug] = useState<string|null>(() => projectFromHash(window.location.hash));
  useEffect(() => {
    const onHash = () => {
      const next = projectFromHash(window.location.hash);
      setSlug(next);
      window.requestAnimationFrame(() => {
        if (next) window.scrollTo(0, 0);
        else if (window.location.hash.startsWith('#')) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => { document.title = slug ? `${findProject(slug)?.title ?? 'Projeto'} | Marcelo Fraitag` : 'Marcelo Fraitag | Analista de Processos e desenvolvedor em formação'; }, [slug]);
  return <>
    <a className="skip-link" href="#conteudo">{getCopy(language).skip}</a>
    <Header language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme}/>
    {slug ? <CaseStudy slug={slug} language={language}/> : <main id="conteudo"><Hero language={language}/><StackStrip language={language}/><Projects language={language}/><About language={language}/><Experience language={language}/><Courses language={language}/><Contact language={language}/></main>}
    <Footer language={language}/>
  </>;
}
