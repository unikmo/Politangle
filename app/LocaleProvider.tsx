'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'de';
const LOCALE_KEY = 'politangle.locale';

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: 'en', setLocale: () => undefined });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY);
    const detected = navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
    setLocaleState(saved === 'de' || saved === 'en' ? saved : detected);
  }, []);
  function setLocale(next: Locale) {
    localStorage.setItem(LOCALE_KEY, next);
    document.documentElement.lang = next;
    setLocaleState(next);
  }
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() { return useContext(LocaleContext); }

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();
  return <button type="button" className="lang" aria-label={locale === 'de' ? 'Sprache: Deutsch' : 'Language: English'} onClick={() => setLocale(locale === 'en' ? 'de' : 'en')}>◎ &nbsp; {locale.toUpperCase()}</button>;
}
