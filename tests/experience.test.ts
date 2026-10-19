import { describe, expect, it } from 'vitest';
import { getCopy } from '../src/data/copy';

describe('professional timeline V4.2', () => {
  it('has all five professional milestones in both languages', () => {
    for (const locale of ['pt', 'en'] as const) {
      const c = getCopy(locale);
      expect(c.expCurrentWhen).toContain('2026');
      expect(c.expItWhen).toBe('2022 — 2026');
      expect(c.expPlanningWhen).toBe('2020 — 2021');
      expect(c.expWarehouseWhen).toBe('2019');
      expect(c.expApprenticeWhen).toBe('2018');
      expect(c.expApprenticeTitle).toContain('WestRock');
      expect(c.expDegreeWhen).toContain('2026');
      expect(c.expCareerGroup).toBeTruthy();
      expect(c.expEducationGroup).toBeTruthy();
    }
  });
  it('identifies the current role accurately', () => {
    expect(getCopy('pt').expCurrentTitle).toBe('Analista de Processos');
    expect(getCopy('en').expCurrentTitle).toBe('Process Analyst');
  });
});
