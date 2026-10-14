'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LanguageSelector, localePath, useLocale, type Locale } from './LocaleProvider';

const Mark = () => <span className="p-mark p-mark-logo" aria-hidden="true"><Image src="/images/politangle-mark.webp" alt="" width={44} height={44} unoptimized /></span>;
const Arrow = () => <span aria-hidden="true">→</span>;

type ChromeCopy = {
  method: string;
  learn: string;
  quizzes: string;
  schools: string;
  about: string;
  countries: string;
  guides: string;
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
    method: 'Method', learn: 'Learn', guides: 'Guides', quizzes: 'Quizzes', countries: 'Countries', schools: 'For schools', about: 'About',
    account: 'Sign in', start: 'Start Quick', practice: 'Practice', validation: 'Validation',
    privacy: 'Privacy', imprint: 'Imprint', terms: 'Terms', contact: 'Contact',
  },
  de: {
    method: 'So funktioniert’s', learn: 'Wissen', guides: 'Themen', quizzes: 'Quizze', countries: 'Länder', schools: 'Für Schulen', about: 'Über Politangle',
    account: 'Anmelden', start: 'Test starten', practice: 'Wissen testen', validation: 'Qualität und Grenzen',
    privacy: 'Datenschutz', imprint: 'Impressum', terms: 'Nutzungsbedingungen', contact: 'Kontakt',
  },
  es: {
    method: 'Método', learn: 'Aprender', guides: 'Guías', quizzes: 'Quizzes', countries: 'Países', schools: 'Para centros', about: 'Acerca de',
    account: 'Iniciar sesión', start: 'Empezar Quick', practice: 'Práctica', validation: 'Validación',
    privacy: 'Privacidad', imprint: 'Aviso legal', terms: 'Condiciones', contact: 'Contacto',
  },
  fr: {
    method: 'Comment ça marche', learn: 'Comprendre', guides: 'Guides', quizzes: 'Quiz', countries: 'Pays', schools: 'Écoles', about: 'À propos',
    account: 'Se connecter', start: 'Commencer le test', practice: 'S’entraîner', validation: 'Qualité et limites',
    privacy: 'Vie privée', imprint: 'Mentions légales', terms: 'Conditions', contact: 'Contact',
  },
  'pt-br': {
    method: 'Método', learn: 'Aprender', guides: 'Guias', quizzes: 'Quizzes', countries: 'Países', schools: 'Para escolas', about: 'Sobre',
    account: 'Entrar', start: 'Começar Quick', practice: 'Praticar', validation: 'Validação',
    privacy: 'Privacidade', imprint: 'Informações legais', terms: 'Termos', contact: 'Contato',
  },
};

export function SiteHeader() {
  const { locale } = useLocale();
  const c = copy[locale];
  const href = (path: string) => localePath(locale, path);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuLabels: Record<Locale, [string, string]> = {
    en: ['Open menu', 'Close menu'], de: ['Menü öffnen', 'Menü schließen'],
    es: ['Abrir menú', 'Cerrar menú'], fr: ['Ouvrir le menu', 'Fermer le menu'],
    'pt-br': ['Abrir menu', 'Fechar menu'],
  };

  return (
    <header className="p-nav">
      <Link className="p-brand" href={href('/')}><Mark/><span>Politangle</span></Link>
      <nav id="politangle-primary-nav" className={mobileMenuOpen ? 'p-nav-main is-open' : 'p-nav-main'} aria-label="Primary navigation" onClick={() => setMobileMenuOpen(false)} onKeyDown={(event) => { if (event.key === 'Escape') setMobileMenuOpen(false); }}>
        <Link href={href('/method')}>{c.method}</Link>
        <Link href={href('/learn')}>{c.learn}</Link>
        <Link href={href('/guides')}>{c.guides}</Link>
        <Link href={href('/quizzes')}>{c.quizzes}</Link>
        <Link href={href('/countries')}>{c.countries}</Link>
        <Link href={href('/school')}>{c.schools}</Link>
        <Link href={href('/about')}>{c.about}</Link>
        <Link className="p-mobile-nav-link" href={href('/account')}>{c.account}</Link>
        <Link className="p-mobile-nav-link p-mobile-nav-start" href={href('/quiz')}>{c.start} →</Link>
      </nav>
      <div className="p-nav-actions">
        <LanguageSelector/>
        <button type="button" className="p-mobile-nav-toggle" aria-controls="politangle-primary-nav" aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? menuLabels[locale][1] : menuLabels[locale][0]} onClick={() => setMobileMenuOpen((open) => !open)}><span aria-hidden="true">{mobileMenuOpen ? '×' : '☰'}</span></button>
        <Link className="p-account-link" href={href('/account')}>{c.account}</Link>
        <Link className="p-button compact" href={href('/quiz')}>{c.start} <Arrow/></Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const context = useLocale();
  const pathname = usePathname();
  const routeLocale = pathname.match(/^\/(en|de|es|fr|pt-br)(?=\/|$)/)?.[1] as Locale | undefined;
  const locale = routeLocale ?? context.locale;
  const c = copy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <footer className="p-footer p-shell site-footer">
      <Link className="p-brand" href={href('/')}><Mark/><span><b>Politangle</b><small>politangle.org</small></span></Link>
      <div>
        <Link href={href('/learn')}>{c.learn}</Link>
        <Link href={href('/guides')}>{c.guides}</Link>
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
