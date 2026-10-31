import React from 'react';

const KEY = 'jr.lang';

/**
 * Shared ESP|ENG state, remembered in localStorage so the choice survives
 * moving between the landing and case-study pages. SSR renders ESP (default);
 * the stored value is applied after hydration. Storage can be blocked
 * (private mode), so every access is guarded and ESP is the fallback.
 */
export function useLang() {
  const [lang, setLang] = React.useState('ESP');
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'ESP' || saved === 'ENG') setLang(saved);
    } catch {}
  }, []);
  React.useEffect(() => {
    document.documentElement.lang = lang === 'ENG' ? 'en' : 'es';
  }, [lang]);
  const update = (next) => {
    setLang(next);
    try { localStorage.setItem(KEY, next); } catch {}
  };
  return [lang, update];
}
