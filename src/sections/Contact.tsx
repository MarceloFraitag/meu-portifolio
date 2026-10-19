import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import type { Language } from '../data/projects';
import { getCopy } from '../data/copy';
import { contactEndpoint, profileLinks } from '../lib/links';
import TinyLabel from '../components/TinyLabel';

function Contact({ language }: { language: Language }) {
  const c = getCopy(language);
  const [state, setState] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [copied, setCopied] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState('sending');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(contactEndpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error(`Contact form returned ${response.status}`);
      setState('success');
      form.reset();
    } catch {
      setState('error');
    } finally {
      window.clearTimeout(timer);
    }
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profileLinks.email); setCopied(true); window.setTimeout(()=>setCopied(false),2000); }
    catch { window.location.href = `mailto:${profileLinks.email}`; }
  }
  return <section id="contato" className="section contact-section section-anchor"><div className="container contact-grid"><div className="contact-copy"><TinyLabel>{c.contactEyebrow}</TinyLabel><h2>{c.contactTitle}<br/><span>{c.contactHighlight}</span></h2><p>{c.contactDesc}</p><div className="email-card"><Mail size={20}/><div><small>{c.email}</small><a href={`mailto:${profileLinks.email}`}>{profileLinks.email}</a></div><button type="button" onClick={copyEmail} aria-label={copied?c.copied:c.copyEmail} title={copied?c.copied:c.copyEmail}>{copied?<Check size={19}/>:<Copy size={19}/>}</button></div><div className="social-links"><a href={profileLinks.github} target="_blank" rel="noopener noreferrer"><Github size={18}/>GitHub<ArrowUpRight size={17}/></a><a href={profileLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/>LinkedIn<ArrowUpRight size={17}/></a></div></div><form onSubmit={onSubmit} className="contact-form"><h3>{language==='pt'?'Envie uma mensagem':'Send a message'} <Send size={19}/></h3><div className="form-row"><label>{c.formName}<input name="name" type="text" required maxLength={100} autoComplete="name" placeholder={c.formNamePlaceholder}/></label><label>{c.formEmail}<input name="email" type="email" required maxLength={160} autoComplete="email" placeholder={c.formEmailPlaceholder}/></label></div><label>{c.formMessage}<textarea name="message" required rows={6} minLength={10} maxLength={3000} placeholder={c.formMessagePlaceholder}/></label><input name="_gotcha" type="text" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true"/><button className="btn btn-primary submit-btn" type="submit" disabled={state==='sending'}>{state==='sending'?c.formSending:c.formSend}<ArrowUpRight size={18}/></button><p className={`form-feedback ${state==='error'?'error':''}`} aria-live="polite" role={state==='error'?'alert':'status'}>{state==='success'?c.formSuccess:state==='error'?c.formError:''}</p></form></div></section>;
}

export default Contact;
