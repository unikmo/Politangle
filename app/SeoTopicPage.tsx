'use client';

import Link from 'next/link';
import { localePath, useLocale } from './LocaleProvider';
import { SiteHeader } from './SiteChrome';
import { getSeoTopic, seoSourceLibrary, type SeoTopicSlug } from '../lib/seo-topics';

export default function SeoTopicPage({ slug }: { slug: SeoTopicSlug }) {
  const { locale } = useLocale();
  const topic = getSeoTopic(locale, slug);
  const href = (path: string) => localePath(locale, path);
  const canonicalPath = locale === 'en' ? `/${slug}` : `/${locale}/${slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: topic.title,
    description: topic.metaDescription,
    inLanguage: locale === 'pt-br' ? 'pt-BR' : locale === 'en' ? 'en-US' : locale,
    mainEntityOfPage: `https://politangle.org${canonicalPath}`,
    dateModified: '2026-09-21',
    author: { '@type': 'Organization', name: 'Politangle', url: 'https://politangle.org' },
    publisher: { '@type': 'Organization', name: 'Politangle', url: 'https://politangle.org' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Politangle', item: `https://politangle.org${href('/')}` },
      { '@type': 'ListItem', position: 2, name: locale === 'de' ? 'Leitfäden' : locale === 'es' ? 'Guías' : locale === 'fr' ? 'Guides' : locale === 'pt-br' ? 'Guias' : 'Guides', item: `https://politangle.org${href('/guides')}` },
      { '@type': 'ListItem', position: 3, name: topic.title, item: `https://politangle.org${canonicalPath}` },
    ],
  };

  return (
    <main className="home info-page seo-topic-page">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="info-hero">
        <div className="info-shell">
          <p>{topic.eyebrow}</p>
          <h1>{topic.title}</h1>
          <div>{topic.answer}</div>
        </div>
      </section>

      <section className="info-shell countries-content">
        <article className="info-section">
          <h2>{locale === 'de' ? 'Kurz gesagt' : locale === 'es' ? 'En resumen' : locale === 'fr' ? 'En bref' : locale === 'pt-br' ? 'Em resumo' : 'Key points'}</h2>
          <ul>{topic.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul>
        </article>

        {topic.sections.map((section) => (
          <article className="info-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        ))}

        <section className="info-section">
          <h2>{locale === 'de' ? 'Häufige Fragen' : locale === 'es' ? 'Preguntas frecuentes' : locale === 'fr' ? 'Questions fréquentes' : locale === 'pt-br' ? 'Perguntas comuns' : 'Common questions'}</h2>
          {topic.questions.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </section>

        <section className="info-section">
          <h2>{locale === 'de' ? 'Quellen und weiterführende Literatur' : locale === 'es' ? 'Fuentes y lecturas' : locale === 'fr' ? 'Sources et lectures' : locale === 'pt-br' ? 'Fontes e leituras' : 'Sources and further reading'}</h2>
          <ul>
            {topic.sourceKeys.map((key) => {
              const source = seoSourceLibrary[key as keyof typeof seoSourceLibrary];
              return <li key={key}><a href={source.url} rel="noreferrer">{source.title}</a></li>;
            })}
          </ul>
          <p><Link href={href('/method')}>{locale === 'de' ? 'Politangle-Methode ansehen' : locale === 'es' ? 'Ver el método de Politangle' : locale === 'fr' ? 'Voir la méthode Politangle' : locale === 'pt-br' ? 'Ver o método do Politangle' : 'Read the Politangle method'} →</Link></p>
        </section>

        <section className="info-section">
          <h2>{topic.ctaTitle}</h2>
          <p>{topic.ctaText}</p>
          <p><Link className="p-button" href={href(topic.ctaHref)}>{topic.ctaLabel} →</Link></p>
        </section>
      </section>
    </main>
  );
}
