import { Code2, ShieldCheck, Sparkles } from 'lucide-react';
import type { Language } from '../data/projects';
import { getCopy } from '../data/copy';
import TinyLabel from '../components/TinyLabel';
import GitHubInfo from '../components/GitHubInfo';

function About({ language }: { language: Language }) {
  const c = getCopy(language);
  const features = [
    { icon: <Code2 size={21}/>, title: c.aboutCard1Title, text: c.aboutCard1Body },
    { icon: <Sparkles size={21}/>, title: c.aboutCard2Title, text: c.aboutCard2Body },
    { icon: <ShieldCheck size={21}/>, title: c.aboutCard3Title, text: c.aboutCard3Body },
  ];
  return <section id="sobre" className="section about-section section-anchor"><div className="container about-grid"><div><TinyLabel>{c.aboutEyebrow}</TinyLabel><h2>{c.aboutTitle}<br/><span>{c.aboutHighlight}</span></h2><p>{c.aboutP1}</p><p>{c.aboutP2}</p><GitHubInfo language={language}/></div><div className="about-cards">{features.map((feature,i)=><div className="about-feature" key={i}><div className="about-feature-icon">{feature.icon}</div><div><h3>{feature.title}</h3><p>{feature.text}</p></div><span className="about-index">0{i+1}</span></div>)}</div></div></section>;
}

export default About;
