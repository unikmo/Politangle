'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Locale = 'en' | 'de' | 'es' | 'fr';
const LOCALE_KEY = 'politangle.locale';

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: 'en', setLocale: () => undefined });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY);
    const browserLanguage = navigator.language.toLowerCase().slice(0, 2);
    const detected: Locale = browserLanguage === 'de' || browserLanguage === 'es' || browserLanguage === 'fr' ? browserLanguage : 'en';
    setLocaleState(saved === 'de' || saved === 'es' || saved === 'fr' || saved === 'en' ? saved : detected);
  }, []);
  function setLocale(next: Locale) {
    localStorage.setItem(LOCALE_KEY, next);
    document.documentElement.lang = next === 'en' ? 'en-US' : next;
    setLocaleState(next);
  }
  useEffect(() => { document.documentElement.lang = locale === 'en' ? 'en-US' : locale; }, [locale]);
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() { return useContext(LocaleContext); }

export function LanguageSelector() {
  const { locale, setLocale } = useLocale();
  const locales: Locale[] = ['en', 'de', 'es', 'fr'];
  const names: Record<Locale, string> = { en: 'English (US)', de: 'Deutsch', es: 'Español', fr: 'Français' };
  const next = locales[(locales.indexOf(locale) + 1) % locales.length];
  const aria = locale === 'de'
    ? `Sprache: ${names[locale]}. Wechseln zu ${names[next]}`
    : locale === 'es'
      ? `Idioma: ${names[locale]}. Cambiar a ${names[next]}`
      : locale === 'fr'
        ? `Langue : ${names[locale]}. Passer à ${names[next]}`
        : `Language: ${names[locale]}. Switch to ${names[next]}`;
  return <button type="button" className="lang" aria-label={aria} onClick={() => setLocale(next)}>◎ &nbsp; {locale === 'en' ? 'EN-US' : locale.toUpperCase()}</button>;
}
