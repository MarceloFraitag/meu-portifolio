import { ArrowUp } from 'lucide-react';
import type { Language } from '../data/projects';
import { getCopy } from '../data/copy';
import Logo from './Logo';

function Footer({ language }: { language: Language }) {
  const c = getCopy(language);
  return <footer className="footer"><div className="container footer-inner"><a href="#inicio" className="logo-link"><Logo/></a><span>© {new Date().getFullYear()} Marcelo Fraitag. {c.footerMade}.</span><a href="#inicio" className="footer-back">{c.footerBack}<ArrowUp size={16}/></a></div></footer>;
}

export default Footer;
