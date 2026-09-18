'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSelector, localePath, useLocale, type Locale } from './LocaleProvider';

const Mark = () => <span className="p-mark" aria-hidden="true"><i/><i/><i/></span>;
const Arrow = () => <span aria-hidden="true">→</span>;

type ChromeCopy = {
  method: string;
  learn: string;
  quizzes: string;
  schools: string;
  about: string;
  countries: string;
  account: string;
  start: string;
  practice: string;
  validation: string;
  privacy: string;
  imprint: string;
  terms: string;
  contact: string;
};

const copy: Record<Locale, ChromeCopy> = {
  en: {
    method: 'Method', learn: 'Learn', quizzes: 'Quizzes', countries: 'Countries', schools: 'For schools', about: 'About',
    account: 'Sign in', start: 'Start Quick', practice: 'Practice', validation: 'Validation',
    privacy: 'Privacy', imprint: 'Imprint', terms: 'Terms', contact: 'Contact',
  },
  de: {
    method: 'Methode', learn: 'Lernen', quizzes: 'Quizzes', countries: 'Länder', schools: 'Für Schulen', about: 'Über Politangle',
    account: 'Anmelden', start: 'Quick starten', practice: 'Üben', validation: 'Validierung',
    privacy: 'Datenschutz', imprint: 'Impressum', terms: 'Nutzungsbedingungen', contact: 'Kontakt',
  },
  es: {
    method: 'Método', learn: 'Aprender', quizzes: 'Quizzes', countries: 'Países', schools: 'Para centros', about: 'Acerca de',
    account: 'Iniciar sesión', start: 'Empezar Quick', practice: 'Práctica', validation: 'Validación',
    privacy: 'Privacidad', imprint: 'Aviso legal', terms: 'Condiciones', contact: 'Contacto',
  },
  fr: {
    method: 'Méthode', learn: 'Apprendre', quizzes: 'Quiz', countries: 'Pays', schools: 'Pour les écoles', about: 'À propos',
    account: 'Se connecter', start: 'Lancer Quick', practice: 'S’entraîner', validation: 'Validation',
    privacy: 'Vie privée', imprint: 'Mentions légales', terms: 'Conditions', contact: 'Contact',
  },
};

export function SiteHeader() {
  const { locale } = useLocale();
  const c = copy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <header className="p-nav">
      <Link className="p-brand" href={href('/')}><Mark/><span>Politangle</span></Link>
      <nav aria-label="Primary navigation">
        <Link href={href('/method')}>{c.method}</Link>
        <Link href={href('/learn')}>{c.learn}</Link>
        <Link href={href('/quizzes')}>{c.quizzes}</Link>
        <Link href={href('/countries')}>{c.countries}</Link>
        <Link href={href('/school')}>{c.schools}</Link>
        <Link href={href('/about')}>{c.about}</Link>
      </nav>
      <div className="p-nav-actions">
        <LanguageSelector/>
        <Link className="p-account-link" href={href('/account')}>{c.account}</Link>
        <Link className="p-button compact" href={href('/quiz')}>{c.start} <Arrow/></Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const context = useLocale();
  const pathname = usePathname();
  const routeLocale = pathname.match(/^\/(en|de|es|fr)(?=\/|$)/)?.[1] as Locale | undefined;
  const locale = routeLocale ?? context.locale;
  const c = copy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <footer className="p-footer p-shell site-footer">
      <Link className="p-brand" href={href('/')}><Mark/><span><b>Politangle</b><small>politangle.org</small></span></Link>
      <div>
        <Link href={href('/learn')}>{c.learn}</Link>
        <Link href={href('/quizzes')}>{c.quizzes}</Link>
        <Link href={href('/countries')}>{c.countries}</Link>
        <Link href={href('/practice')}>{c.practice}</Link>
        <Link href={href('/method')}>{c.method}</Link>
        <Link href={href('/validation')}>{c.validation}</Link>
        <Link href={href('/privacy')}>{c.privacy}</Link>
        <Link href={href('/imprint')}>{c.imprint}</Link>
        <Link href={href('/terms')}>{c.terms}</Link>
        <Link href={href('/contact')}>{c.contact}</Link>
      </div>
      <small>© 2026 Politangle</small>
    </footer>
  );
}
