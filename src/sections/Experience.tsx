import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, HardHat, Laptop2, Package, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Language } from '../data/projects';
import { getCopy } from '../data/copy';
import TinyLabel from '../components/TinyLabel';

type Milestone = {
  date: string;
  title: string;
  description: string;
  icon: ReactNode;
};

function Timeline({ entries }: { entries: Milestone[] }) {
  return (
    <div className="timeline">
      {entries.map(entry => (
        <article className="timeline-item" key={entry.title}>
          <div className="timeline-icon" aria-hidden="true">{entry.icon}</div>
          <div className="timeline-content">
            <span className="timeline-date">{entry.date}</span>
            <h4>{entry.title}</h4>
            <p>{entry.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Experience({ language }: { language: Language }) {
  const c = getCopy(language);
  const work: Milestone[] = [
    { date: c.expCurrentWhen, title: c.expCurrentTitle, description: c.expCurrentDesc, icon: <BriefcaseBusiness size={18} /> },
    { date: c.expItWhen, title: c.expItTitle, description: c.expItDesc, icon: <Laptop2 size={18} /> },
    { date: c.expPlanningWhen, title: c.expPlanningTitle, description: c.expPlanningDesc, icon: <Wrench size={18} /> },
    { date: c.expWarehouseWhen, title: c.expWarehouseTitle, description: c.expWarehouseDesc, icon: <Package size={18} /> },
    { date: c.expApprenticeWhen, title: c.expApprenticeTitle, description: c.expApprenticeDesc, icon: <HardHat size={18} /> },
  ];
  const education: Milestone[] = [
    { date: c.expDegreeWhen, title: c.expDegreeTitle, description: c.expDegreeDesc, icon: <GraduationCap size={18} /> },
    { date: c.expCoursesWhen, title: c.expCoursesTitle, description: c.expCoursesDesc, icon: <Code2 size={18} /> },
  ];

  return (
    <section id="experiencia" className="section experience-section section-anchor">
      <div className="container experience-grid">
        <div className="experience-heading">
          <TinyLabel>{c.expEyebrow}</TinyLabel>
          <h2>{c.expTitle}</h2>
          <div className="experience-ornament" aria-hidden="true">
            <span>{c.expRange}</span><span className="experience-line" /><ArrowUpRight size={24} />
          </div>
        </div>
        <div className="timeline-groups">
          <div className="timeline-group">
            <h3 className="timeline-group-label">{c.expCareerGroup}</h3>
            <Timeline entries={work} />
          </div>
          <div className="timeline-group">
            <h3 className="timeline-group-label">{c.expEducationGroup}</h3>
            <Timeline entries={education} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
