import { describe, expect, it } from 'vitest';
import { projectFromHash } from '../src/lib/routing';
import { findProject } from '../src/data/projects';

describe('project routing', () => {
  it('reads a case-study hash', () => expect(projectFromHash('#/project/nexus-dev')).toBe('nexus-dev'));
  it('ignores a section hash', () => expect(projectFromHash('#projetos')).toBeNull());
  it('ignores malformed hashes', () => expect(projectFromHash('#/project/../secret')).toBeNull());
  it('finds a known project', () => expect(findProject('helpdesk-mobile')?.title).toBe('HelpDesk Mobile'));
  it('does not invent a missing project', () => expect(findProject('missing')).toBeUndefined());
});
