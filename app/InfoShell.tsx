'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale, type Locale } from './LocaleProvider';

type ShellCopy = {
  method: string;
  validation: string;
  schools: string;
  start: string;
  privacy: string;
  imprint: string;
  terms: string;
  contact: string;
};

const shellCopy: Record<Locale, ShellCopy> = {
  en: {
    method: 'Method', validation: 'Validation', schools: 'Schools', start: 'Start Quick',
    privacy: 'Privacy', imprint: 'Imprint', terms: 'Terms', contact: 'Contact',
  },
  de: {
    method: 'Methode', validation: 'Validierung', schools: 'Schulen', start: 'Quick starten',
    privacy: 'Datenschutz', imprint: 'Impressum', terms: 'Nutzungsbedingungen', contact: 'Kontakt',
  },
  es: {
    method: 'Método', validation: 'Validación', schools: 'Centros educativos', start: 'Empezar Quick',
    privacy: 'Privacidad', imprint: 'Aviso legal', terms: 'Condiciones', contact: 'Contacto',
  },
  fr: {
    method: 'Méthode', validation: 'Validation', schools: 'Établissements', start: 'Lancer Quick',
    privacy: 'Vie privée', imprint: 'Mentions légales', terms: 'Conditions', contact: 'Contact',
  },
};

export function InfoShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  const { locale } = useLocale();
  const copy = shellCopy[locale];

  return <main className="info-page">
    <header className="info-nav"><Link href="/" className="info-brand">Politangle<small>politangle.org</small></Link><nav><Link href="/method">{copy.method}</Link><Link href="/validation">{copy.validation}</Link><Link href="/school">{copy.schools}</Link></nav><LanguageSelector/><Link className="info-cta" href="/quiz">{copy.start} →</Link></header>
    <section className="info-hero"><div className="info-shell"><p>{eyebrow}</p><h1>{title}</h1><div>{intro}</div></div></section>
    <section className="info-shell info-content">{children}</section>
    <footer className="info-footer info-shell"><Link href="/">Politangle</Link><div><Link href="/privacy">{copy.privacy}</Link><Link href="/imprint">{copy.imprint}</Link><Link href="/terms">{copy.terms}</Link><Link href="/contact">{copy.contact}</Link></div><small>© 2026 Politangle</small></footer>
  </main>;
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="info-section"><h2>{title}</h2><div>{children}</div></article>;
}
