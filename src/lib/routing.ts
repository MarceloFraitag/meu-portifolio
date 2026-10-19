export function projectFromHash(hash: string): string | null {
  const matched = /^#\/project\/([a-z0-9-]+)$/.exec(hash);
  return matched?.[1] ?? null;
}
