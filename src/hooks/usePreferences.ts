import { useEffect, useState } from 'react';
import type { Language } from '../data/projects';
export type Theme = 'dark' | 'light';

function storedChoice<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  try {
    const value = localStorage.getItem(key);
    return value && allowed.includes(value as T) ? value as T : fallback;
  } catch { return fallback; }
}

function usePreferences() {
  const [language, setLanguage] = useState<Language>(() => storedChoice('portfolio-v4-lang', 'pt', ['pt', 'en']));
  const [theme, setTheme] = useState<Theme>(() => storedChoice('portfolio-v4-theme', 'dark', ['dark', 'light']));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    try { localStorage.setItem('portfolio-v4-theme', theme); localStorage.setItem('portfolio-v4-lang', language); } catch { /* Preferências são opcionais. */ }
  }, [language, theme]);
  return { language, setLanguage, theme, setTheme };
}

export default usePreferences;
