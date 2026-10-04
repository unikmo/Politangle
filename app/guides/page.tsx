'use client';

import Link from 'next/link';
import { localePath, useLocale, type Locale } from '../LocaleProvider';
import { SiteHeader } from '../SiteChrome';
import { seoTopicSlugs, seoTopicsByLocale } from '../../lib/seo-topics';

const copy: Record<Locale, { eyebrow:string; title:string; intro:string; open:string }> = {
  en: { eyebrow:'POLITICAL GUIDES', title:'Understand the words before arguing about the labels.', intro:'Neutral guides to political spectra, left and right, ideology, political tests and political literacy. Each guide links the concept back to Politangle’s transparent method and country context.', open:'Read guide' },
  de: { eyebrow:'POLITISCHE THEMEN', title:'Begriffe klären. Politik besser verstehen.', intro:'Unsere Themenseiten erklären das politische Spektrum, links und rechts, Ideologien, politische Tests und politische Bildung in verständlicher Sprache. Wo es wichtig ist, zeigen sie auch, wie sich Begriffe von Land zu Land unterscheiden.', open:'Mehr erfahren' },
  es: { eyebrow:'GUÍAS POLÍTICAS', title:'Entender las palabras antes de discutir las etiquetas.', intro:'Guías neutrales sobre espectro político, izquierda y derecha, ideologías, tests políticos y cultura política. Cada guía conecta el concepto con el método transparente de Politangle y con el contexto nacional.', open:'Leer guía' },
  fr: { eyebrow:'GUIDES POLITIQUES', title:'Comprendre les idées derrière les étiquettes.', intro:'Des explications accessibles sur la gauche et la droite, les grandes familles politiques, les tests d’opinion et la culture politique. Chaque guide replace les notions dans leur contexte et renvoie vers les sources utiles.', open:'Lire le guide' },
  'pt-br': { eyebrow:'GUIAS POLÍTICOS', title:'Entenda os termos antes de discutir os rótulos.', intro:'Guias neutros sobre espectro político, esquerda e direita, ideologias, testes políticos e educação política. Cada guia conecta o conceito ao método transparente do Politangle e ao contexto de cada país.', open:'Ler guia' },
};

export default function GuidesPage() {
  const { locale } = useLocale();
  const c = copy[locale];
  return (
    <main className="home info-page">
      <SiteHeader />
      <section className="info-hero">
        <div className="info-shell">
          <p>{c.eyebrow}</p>
          <h1>{c.title}</h1>
          <div>{c.intro}</div>
        </div>
      </section>
      <section className="info-shell countries-content">
        <div className="country-card-grid">
          {seoTopicSlugs.map((slug) => {
            const topic = seoTopicsByLocale[locale][slug];
            return (
              <article className="country-card" key={slug}>
                <span>{topic.eyebrow}</span>
                <h2>{topic.title}</h2>
                <p>{topic.answer}</p>
                <Link href={localePath(locale, `/${slug}`)}>{c.open} →</Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
