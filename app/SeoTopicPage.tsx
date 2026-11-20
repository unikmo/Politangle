'use client';

import Link from 'next/link';
import { localePath, useLocale } from './LocaleProvider';
import { SiteHeader } from './SiteChrome';
import { getSeoTopic, seoSourceLibrary, type SeoTopicSlug } from '../lib/seo-topics';

const seoHooks: Record<'en'|'de'|'es'|'fr'|'pt-br', Record<SeoTopicSlug, string>> = {
  en: {
    'political-spectrum':'One line can be a useful start. What does it leave out?',
    'left-vs-right-politics':'Two familiar labels. Which disagreements do they actually explain?',
    'political-ideologies':'Which political ideas travel together—and which can pull apart?',
    'political-test':'What if your answers do not fit neatly on one line?',
    'political-literacy':'You know the word. Can you spot the distinction?'
  },
  de: {
    'political-spectrum':'Eine Linie hilft beim Einstieg. Doch was lässt sie weg?',
    'left-vs-right-politics':'Zwei vertraute Etiketten. Welche Unterschiede erklären sie wirklich?',
    'political-ideologies':'Welche politischen Ideen gehören zusammen – und welche nicht?',
    'political-test':'Was, wenn deine Antworten nicht auf eine Linie passen?',
    'political-literacy':'Du kennst den Begriff. Erkennst du den Unterschied?'
  },
  es: {
    'political-spectrum':'Una línea ayuda a orientarse. ¿Qué deja fuera?',
    'left-vs-right-politics':'Dos etiquetas conocidas. ¿Qué diferencias explican realmente?',
    'political-ideologies':'¿Qué ideas políticas se relacionan y cuáles se separan?',
    'political-test':'¿Y si tus respuestas no caben en una sola línea?',
    'political-literacy':'Conoces la palabra. ¿Sabes distinguir el concepto?'
  },
  fr: {
    'political-spectrum':'Une ligne donne un repère. Mais que laisse-t-elle de côté ?',
    'left-vs-right-politics':'Deux étiquettes familières. Quelles différences expliquent-elles vraiment ?',
    'political-ideologies':'Quelles idées politiques vont ensemble, et lesquelles divergent ?',
    'political-test':'Et si tes réponses ne tenaient pas sur une seule ligne ?',
    'political-literacy':'Tu connais le mot. Sais-tu distinguer les idées ?'
  },
  'pt-br': {
    'political-spectrum':'Uma linha ajuda a começar. Mas o que ela deixa de fora?',
    'left-vs-right-politics':'Dois rótulos conhecidos. Que diferenças eles explicam de verdade?',
    'political-ideologies':'Quais ideias políticas caminham juntas e quais divergem?',
    'political-test':'E se suas respostas não couberem em uma única linha?',
    'political-literacy':'Você conhece o termo. Sabe reconhecer a diferença?'
  }
};

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
          <p className="p-kicker" style={{ marginTop:18 }}>{seoHooks[locale][slug]}</p>
          <div>{topic.answer}</div>
          <p style={{ marginTop:18 }}><Link className="p-text-link" href={href('/quiz')}>{locale === 'de' ? 'Mein Profil entdecken →' : locale === 'es' ? 'Descubrir mi perfil →' : locale === 'fr' ? 'Découvrir mon profil →' : locale === 'pt-br' ? 'Descobrir meu perfil →' : 'Discover my angle →'}</Link></p>
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
          <p><Link href={href('/method')}>{locale === 'de' ? 'Politangle-Methode ansehen' : locale === 'es' ? 'Ver el método de Politangle' : locale === 'fr' ? 'Voir la méthode Politangle' : locale === 'pt-br' ? 'Ver o método do Politangle' : 'Read the Politangle method'} →</Link> · <Link href={href('/faq')}>{locale === 'de' ? 'Fragen und Grenzen →' : locale === 'es' ? 'Dudas y límites →' : locale === 'fr' ? 'Questions et limites →' : locale === 'pt-br' ? 'Dúvidas e limites →' : 'Questions and limitations →'}</Link></p>
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
