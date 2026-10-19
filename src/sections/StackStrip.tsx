import type { Language } from '../data/projects';
import { getCopy } from '../data/copy';

function StackStrip({ language }: { language: Language }) {
  const c = getCopy(language);
  return <div className="stack-strip"><div className="container stack-inner"><span>{c.stripLead}</span><div className="stack-logos"><span>React</span><span>TypeScript</span><span>Python</span><span>Git</span><span>REST APIs</span><span>CSS</span></div></div></div>;
}

export default StackStrip;
