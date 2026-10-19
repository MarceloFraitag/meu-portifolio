import { describe, expect, it } from 'vitest';
import courses from '../src/data/courses.json';
import { getCopy } from '../src/data/copy';

describe('course portfolio V4.3', () => {
  it('keeps a curated front page and a complete catalog', () => {
    expect(courses).toHaveLength(48);
    expect(courses.filter(course => course.featured)).toHaveLength(10);
    expect(courses.filter(course => course.category === 'dev').length).toBeGreaterThan(15);
  });

  it('links only to known Drive documents, not fabricated credentials', () => {
    const ids = new Set(courses.map(course => course.id));
    expect(ids.size).toBe(courses.length);
    for (const course of courses) {
      expect(course.url).toMatch(/^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view$/);
      expect(['dev', 'ai', 'cloud']).toContain(course.category);
    }
  });

  it('keeps courses accessible in both languages', () => {
    expect(getCopy('pt').nav.courses).toBe('Cursos');
    expect(getCopy('en').nav.courses).toBe('Courses');
  });
});
