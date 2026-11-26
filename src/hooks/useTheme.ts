import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

function getStoredTheme(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredTheme(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Theme switching should still work when browser storage is unavailable.
  }
}

export function useTheme() {
  const getInitialTheme = (): Theme => {
    const stored = getStoredTheme('portfolio-theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    setStoredTheme('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (event: MediaQueryListEvent) => {
      if (!getStoredTheme('portfolio-theme-manual')) {
        const nextTheme = event.matches ? 'dark' : 'light';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        document.documentElement.style.colorScheme = nextTheme;
      }
    };

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }

    const legacyMq = mq as MediaQueryList & {
      addListener: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    legacyMq.addListener(handler);
    return () => legacyMq.removeListener(handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setStoredTheme('portfolio-theme-manual', 'true');
    setTheme((previous) => {
      const nextTheme = previous === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      document.documentElement.style.colorScheme = nextTheme;
      setStoredTheme('portfolio-theme', nextTheme);
      return nextTheme;
    });
  }, []);

  return { theme, toggleTheme };
}
