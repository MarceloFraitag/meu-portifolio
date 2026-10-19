import { useState } from 'react';
import { ArrowUpRight, BookOpen, ChevronDown, FileCheck2 } from 'lucide-react';
import coursesData from '../data/courses.json';
import type { Language } from '../data/projects';
import TinyLabel from '../components/TinyLabel';

export type CourseCategory = 'all' | 'dev' | 'ai' | 'cloud';
type Course = {
  id: string;
  title: string;
  category: Exclude<CourseCategory, 'all'>;
  featured: boolean;
  url: string;
  issuer?: string;
  date?: string;
  hours?: number;
};

const courses: Course[] = coursesData as Course[];
const words = {
  pt: {
    eyebrow: '04 / CURSOS E CERTIFICADOS', title: 'O que andei estudando.',
    text: 'Além da faculdade, venho fazendo cursos de programação, APIs, automação e outras áreas que uso nos meus projetos.',
    filter: { all: 'Em destaque', dev: 'Desenvolvimento', ai: 'IA e automação', cloud: 'Cloud e segurança' },
    certificate: 'Ver comprovante', overview: 'Os cursos que selecionei primeiro',
    more: 'Ver catálogo completo', less: 'Mostrar só os destaques',
    listed: 'cursos na seleção', of: 'de', hours: 'horas',
    note: 'Os links levam aos arquivos dos certificados no Google Drive. O acesso depende das permissões de compartilhamento.',
  },
  en: {
    eyebrow: '04 / COURSES & CERTIFICATES', title: 'What I’ve been studying.',
    text: 'Alongside my degree, I’ve taken courses in programming, APIs, automation and other areas I put to use in my projects.',
    filter: { all: 'Featured', dev: 'Development', ai: 'AI & automation', cloud: 'Cloud & security' },
    certificate: 'View certificate', overview: 'Courses I’ve chosen to highlight',
    more: 'See all courses', less: 'Show featured only',
    listed: 'courses shown', of: 'of', hours: 'hours',
    note: 'Certificate links open files on Google Drive. Access depends on the sharing permissions for each file.',
  }
} as const;

export default function Courses({ language }: { language: Language }) {
  const [category, setCategory] = useState<CourseCategory>('all');
  const [expanded, setExpanded] = useState(false);
  const t = words[language];
  const shown = courses.filter(c => category === 'all' ? (expanded || c.featured) : c.category === category);
  const categories: CourseCategory[] = ['all', 'dev', 'ai', 'cloud'];

  return <section id="cursos" className="section courses-section section-anchor">
    <div className="container">
      <div className="courses-head">
        <div className="courses-heading">
          <TinyLabel>{t.eyebrow}</TinyLabel>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </div>
        <div className="courses-mini" aria-hidden="true"><BookOpen size={24}/><span>{String(courses.length).padStart(2,'0')}</span></div>
      </div>
      <div className="courses-toolbar">
        <div className="course-filters" role="group" aria-label={language === 'pt' ? 'Filtrar cursos por área' : 'Filter courses by subject'}>
          {categories.map(value => <button key={value} type="button" className={category === value ? 'is-selected' : ''} aria-pressed={category === value} onClick={() => setCategory(value)}>{t.filter[value]}</button>)}
        </div>
        <span className="courses-count" aria-live="polite">{shown.length} {t.of} {courses.length} {t.listed}</span>
      </div>
      <div className="course-grid">
        {shown.map(course => <article className="course-card" key={course.id}>
          <div className="course-card-top">
            <span className="course-topic">{t.filter[course.category]}</span>
            <FileCheck2 size={18} aria-hidden="true"/>
          </div>
          <h3>{course.title}</h3>
          <div className="course-meta">
            {course.issuer && <span>{course.issuer}</span>}
            {course.date && <span>{course.date}</span>}
            {course.hours && <span>{course.hours} {t.hours}</span>}
          </div>
          <a href={course.url} target="_blank" rel="noopener noreferrer" className="course-link" aria-label={`${t.certificate}: ${course.title}`}>{t.certificate}<ArrowUpRight size={16}/></a>
        </article>)}
      </div>
      {category === 'all' && <button className="courses-more" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? t.less : t.more} <ChevronDown className={expanded ? 'rotated' : ''} size={18}/></button>}
      <p className="course-note">{t.note}</p>
    </div>
  </section>;
}
