'use client';

import Link from 'next/link';
import { LanguageSelector, localePath, useLocale, type Locale } from './LocaleProvider';

type ShellCopy = {
  method: string;
  validation: string;
  schools: string;
  learn: string;
  start: string;
  privacy: string;
  imprint: string;
  terms: string;
  contact: string;
};

const shellCopy: Record<Locale, ShellCopy> = {
  en: {
    method: 'Method', validation: 'Validation', schools: 'Schools', learn: 'Learn', start: 'Start Quick',
    privacy: 'Privacy', imprint: 'Imprint', terms: 'Terms', contact: 'Contact',
  },
  de: {
    method: 'Methode', validation: 'Validierung', schools: 'Schulen', learn: 'Lernen', start: 'Quick starten',
    privacy: 'Datenschutz', imprint: 'Impressum', terms: 'Nutzungsbedingungen', contact: 'Kontakt',
  },
  es: {
    method: 'Método', validation: 'Validación', schools: 'Centros educativos', learn: 'Aprender', start: 'Empezar Quick',
    privacy: 'Privacidad', imprint: 'Aviso legal', terms: 'Condiciones', contact: 'Contacto',
  },
  fr: {
    method: 'Méthode', validation: 'Validation', schools: 'Établissements', learn: 'Apprendre', start: 'Lancer Quick',
    privacy: 'Vie privée', imprint: 'Mentions légales', terms: 'Conditions', contact: 'Contact',
  },
};

export function InfoShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  const { locale } = useLocale();
  const copy = shellCopy[locale];
  const href = (path: string) => localePath(locale, path);

  return <main className="info-page">
    <header className="info-nav"><Link href={href('/')} className="info-brand">Politangle<small>politangle.org</small></Link><nav><Link href={href('/learn')}>{copy.learn}</Link><Link href={href('/method')}>{copy.method}</Link><Link href={href('/validation')}>{copy.validation}</Link><Link href={href('/school')}>{copy.schools}</Link></nav><LanguageSelector/><Link className="info-cta" href={href('/quiz')}>{copy.start} →</Link></header>
    <section className="info-hero"><div className="info-shell"><p>{eyebrow}</p><h1>{title}</h1><div>{intro}</div></div></section>
    <section className="info-shell info-content">{children}</section>
    <footer className="info-footer info-shell"><Link href={href('/')}>Politangle</Link><div><Link href={href('/privacy')}>{copy.privacy}</Link><Link href={href('/imprint')}>{copy.imprint}</Link><Link href={href('/terms')}>{copy.terms}</Link><Link href={href('/contact')}>{copy.contact}</Link></div><small>© 2026 Politangle</small></footer>
  </main>;
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="info-section"><h2>{title}</h2><div>{children}</div></article>;
}
