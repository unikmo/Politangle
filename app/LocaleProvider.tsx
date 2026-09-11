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
  const names: Record<Locale, string> = { en: 'English (US)', de: 'Deutsch', es: 'Español', fr: 'Français' };
  const aria = locale === 'de'
    ? 'Sprache auswählen'
    : locale === 'es'
      ? 'Elegir idioma'
      : locale === 'fr'
        ? 'Choisir la langue'
        : 'Choose language';

  return (
    <label className="p-language-picker">
      <span aria-hidden="true">◎</span>
      <select
        className="lang"
        aria-label={aria}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        {(Object.keys(names) as Locale[]).map((code) => <option key={code} value={code}>{names[code]}</option>)}
      </select>
    </label>
  );
}
