'use client';

import Link from 'next/link';
import { localePath, useLocale } from './LocaleProvider';
import { SiteHeader } from './SiteChrome';

export function InfoShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  const { locale } = useLocale();
  const href = (path: string) => localePath(locale, path);

  return <main className="home info-page">
    <SiteHeader />
    <section className="info-hero">
      <div className="info-shell">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <div>{intro}</div>
      </div>
    </section>
    <section className="info-shell info-content">{children}</section>
    <div className="info-bottom-nav info-shell">
      <Link href={href('/learn')}>{locale === 'de' ? 'Glossar' : locale === 'es' ? 'Glosario' : locale === 'fr' ? 'Glossaire' : locale === 'pt-br' ? 'Glossário' : 'Glossary'}</Link>
      <Link href={href('/quizzes')}>{locale === 'fr' ? 'Quiz' : locale === 'pt-br' ? 'Quizzes' : 'Quizzes'}</Link>
      <Link href={href('/method')}>{locale === 'de' ? 'Methode' : locale === 'es' ? 'Método' : locale === 'fr' ? 'Méthode' : locale === 'pt-br' ? 'Método' : 'Method'}</Link>
    </div>
  </main>;
}

export function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="info-section"><h2>{title}</h2><div>{children}</div></article>;
}
