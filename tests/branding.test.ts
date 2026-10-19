import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { getCopy } from '../src/data/copy';

describe('V4.1 identity', () => {
  it('uses the current job title in both languages', () => {
    expect(getCopy('pt').heroRole).toContain('Analista de Processos');
    expect(getCopy('en').heroRole).toContain('Process Analyst');
  });
  it('keeps the selected introduction', () => {
    expect(getCopy('pt').heroLine1).toBe('Oi, eu sou o');
    expect(getCopy('pt').heroDescription).toContain('Crio aplicações web e mobile');
  });
  it('includes the actual hero photo', () => {
    expect(existsSync('public/marcelo-fraitag.webp')).toBe(true);
  });
});
