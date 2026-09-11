'use client';

import Link from 'next/link';
import { LanguageSelector } from './LocaleProvider';

export function InfoShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <main className="info-page">
    <header className="info-nav"><Link href="/" className="info-brand">Politangle<small>politangle.org</small></Link><nav><Link href="/method">Method</Link><Link href="/validation">Validation</Link><Link href="/school">Schools</Link></nav><LanguageSelector/><Link className="info-cta" href="/quiz">Start Quick →</Link></header>
    <section className="info-hero"><div className="info-shell"><p>{eyebrow}</p><h1>{title}</h1><div>{intro}</div></div></section>
    <section className="info-shell info-content">{children}</section>
    <footer className="info-footer info-shell"><Link href="/">Politangle</Link><div><Link href="/privacy">Privacy</Link><Link href="/imprint">Imprint</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div><small>© 2026 Politangle</small></footer>
  </main>;
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="info-section"><h2>{title}</h2><div>{children}</div></article>;
}
