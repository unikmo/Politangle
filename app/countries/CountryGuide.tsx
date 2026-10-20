import Link from 'next/link';
import type { Locale } from '../LocaleProvider';
import type { CountryProfile } from '../../lib/countries';

type UiCopy = {
  eyebrow: string;
  hero: (name: string) => string;
  intro: (name: string) => string;
  whyTitle: string;
  why1: string;
  why2: string;
  threeTitle: string;
  threeIntro: string;
  whyMatters: string;
  labelsTitle: string;
  labelsIntro: string;
  globalLabelsTitle: string;
  globalLabelsIntro: string;
  globalFit: Record<'strong'|'partial'|'limited', string>;
  localDimensions: string;
  moreContext: string;
  systemTitle: string;
  systemIntro: string;
  historyTitle: string;
  historyIntro: string;
  current: string;
  sources: string;
  incomplete: string;
  sourceLink: string;
  back: string;
};

const ui: Record<Locale, UiCopy> = {
  en: {
    eyebrow:'COUNTRY PERSPECTIVE',
    hero:(name)=>`${name}, in context.`,
    intro:(name)=>`Politangle maps political values across eight dimensions. In ${name}, those values play out through a distinct political system, party traditions and history. Use this guide to interpret your profile in local context—not to assign you a party or change your score.`,
    threeTitle:'Three things to know first', threeIntro:'The shortest useful version of how power works here.', whyMatters:'Why this matters',
    labelsTitle:'What familiar labels mean here', labelsIntro:'Some political words change meaning across countries. These are the distinctions worth knowing first.', globalLabelsTitle:'How well do global labels travel?', globalLabelsIntro:'Politangle uses shared dimensions for comparison, but it does not force local politics into a left–right box when that would mislead.', globalFit:{strong:'Strong fit',partial:'Partial fit',limited:'Limited fit'}, localDimensions:'What the global labels miss', moreContext:'More context',
    systemTitle:'The system in 30 seconds', systemIntro:'Enough structure to make the rest of the page intelligible.',
    historyTitle:'Turning points worth knowing', historyIntro:'Only the events that help explain how today’s system got here.',
    current:'Current political snapshot', sources:'Sources and update status', incomplete:'Current-data work still open', sourceLink:'Source', back:'All country perspectives',
  },
  de: {
    eyebrow:'LÄNDERPORTRÄT',
    hero:(name)=>`Politik in ${name} verstehen.`,
    intro:(name)=>`Politangle ordnet politische Werte entlang von acht Dimensionen ein. In ${name} prägen ein eigenes politisches System, Parteien und historische Erfahrungen, wie diese Werte verstanden werden. Dieser Überblick hilft dir, dein Ergebnis im lokalen Kontext zu lesen – ohne dir eine Partei zuzuordnen oder deinen Wert zu verändern.`,
    threeTitle:'Drei wichtige Grundlagen', threeIntro:'Ein kurzer Überblick darüber, wie politische Macht in diesem Land verteilt ist.', whyMatters:'Warum ist das wichtig?',
    labelsTitle:'Was bekannte politische Begriffe hier bedeuten', labelsIntro:'Einige politische Begriffe verändern ihre Bedeutung von Land zu Land. Diese Unterschiede solltest du zuerst kennen.', globalLabelsTitle:'Wie gut funktionieren globale Kategorien?', globalLabelsIntro:'Politangle nutzt gemeinsame Dimensionen zum Vergleich, zwingt lokale Politik aber nicht in ein Links-rechts-Schema, wenn das irreführend wäre.', globalFit:{strong:'Gut vergleichbar',partial:'Nur teilweise vergleichbar',limited:'Kaum vergleichbar'}, localDimensions:'Was globale Kategorien nicht erfassen', moreContext:'Mehr Kontext',
    systemTitle:'Das politische System kurz erklärt', systemIntro:'Die wichtigsten Grundlagen, damit du den Rest der Seite einordnen kannst.',
    historyTitle:'Wendepunkte, die man kennen sollte', historyIntro:'Nur Ereignisse, die erklären, wie das heutige System entstanden ist.',
    current:'Aktueller politischer Überblick', sources:'Quellen und Stand der Angaben', incomplete:'Aktuelle Angaben noch in Arbeit', sourceLink:'Quelle', back:'Alle Länderporträts',
  },
  es: {
    eyebrow:'PERSPECTIVA DEL PAÍS',
    hero:(name)=>`${name}, en contexto.`,
    intro:(name)=>`Politangle organiza los valores políticos en ocho dimensiones. En ${name}, un sistema político, unas tradiciones partidistas y una historia propios dan forma a esos valores. Esta guía te ayuda a interpretar tu resultado en su contexto local, sin asignarte un partido ni cambiar tu puntuación.`,
    threeTitle:'Tres cosas que conviene saber primero', threeIntro:'La versión más breve y útil de cómo funciona el poder aquí.', whyMatters:'Por qué importa',
    labelsTitle:'Qué significan aquí las etiquetas conocidas', labelsIntro:'Algunas palabras políticas cambian de significado entre países. Estas son las diferencias que conviene conocer primero.', globalLabelsTitle:'¿Qué tan bien funcionan las etiquetas globales?', globalLabelsIntro:'Politangle usa dimensiones comunes para comparar, pero no fuerza la política local dentro de un eje izquierda–derecha cuando eso sería engañoso.', globalFit:{strong:'Encaje alto',partial:'Encaje parcial',limited:'Encaje limitado'}, localDimensions:'Lo que las etiquetas globales no captan', moreContext:'Más contexto',
    systemTitle:'El sistema en 30 segundos', systemIntro:'La estructura suficiente para entender el resto de la página.',
    historyTitle:'Puntos de inflexión que conviene conocer', historyIntro:'Solo los hechos que ayudan a explicar cómo se llegó al sistema actual.',
    current:'Panorama político actual', sources:'Fuentes y estado de actualización', incomplete:'Datos actuales aún pendientes', sourceLink:'Fuente', back:'Todas las perspectivas nacionales',
  },
  fr: {
    eyebrow:'POLITIQUE PAR PAYS',
    hero:(name)=>`Comprendre la politique en ${name}.`,
    intro:(name)=>`Politangle situe les valeurs politiques sur huit dimensions. En ${name}, le système politique, les traditions partisanes et l’histoire donnent un sens particulier à ces valeurs. Ce guide t’aide à lire ton résultat dans son contexte national, sans t’attribuer un parti ni modifier ton score.`,
    threeTitle:'Trois repères pour commencer', threeIntro:'Un aperçu rapide de la manière dont le pouvoir est organisé dans ce pays.', whyMatters:'Pourquoi est-ce important ?',
    labelsTitle:'Ce que les mots politiques signifient ici', labelsIntro:'Certains termes changent de sens d’un pays à l’autre. Voici les principales différences à connaître.', globalLabelsTitle:'Peut-on comparer les étiquettes d’un pays à l’autre ?', globalLabelsIntro:'Politangle utilise des dimensions communes pour faciliter la comparaison, mais ne force pas la politique locale dans un simple axe gauche-droite lorsque ce serait trompeur.', globalFit:{strong:'Bonne correspondance',partial:'Correspondance partielle',limited:'Correspondance limitée'}, localDimensions:'Ce que ces catégories ne montrent pas', moreContext:'Pour aller plus loin',
    systemTitle:'Le système politique en bref', systemIntro:'Les bases nécessaires pour comprendre le reste de la page.',
    historyTitle:'Les tournants à connaître', historyIntro:'Uniquement les événements qui aident à expliquer la formation du système actuel.',
    current:'Situation politique actuelle', sources:'Sources et date de mise à jour', incomplete:'Certaines données actuelles restent à compléter', sourceLink:'Source', back:'Tous les pays',
  },
  'pt-br': {
    eyebrow:'PERSPECTIVA POR PAÍS',
    hero:(name)=>`${name}, em contexto.`,
    intro:(name)=>`O Politangle organiza valores políticos em oito dimensões. Em ${name}, o sistema político, as tradições partidárias e a história dão significado próprio a esses valores. Este guia ajuda você a interpretar seu resultado no contexto local, sem atribuir um partido a você nem alterar sua pontuação.`,
    threeTitle:'Três coisas para saber primeiro', threeIntro:'A versão mais curta e útil de como o poder funciona aqui.', whyMatters:'Por que isso importa',
    labelsTitle:'O que rótulos conhecidos significam aqui', labelsIntro:'Algumas palavras políticas mudam de sentido entre países. Estas são as diferenças que vale entender primeiro.', globalLabelsTitle:'Até que ponto os rótulos globais funcionam?', globalLabelsIntro:'O Politangle usa dimensões comuns para comparação, mas não força a política local em um eixo esquerda–direita quando isso seria enganoso.', globalFit:{strong:'Boa correspondência',partial:'Correspondência parcial',limited:'Correspondência limitada'}, localDimensions:'O que os rótulos globais não captam', moreContext:'Mais contexto',
    systemTitle:'O sistema em 30 segundos', systemIntro:'Estrutura suficiente para entender o restante da página.',
    historyTitle:'Pontos de virada que vale conhecer', historyIntro:'Somente os acontecimentos que ajudam a explicar como o sistema atual chegou até aqui.',
    current:'Panorama político atual', sources:'Fontes e status de atualização', incomplete:'Dados atuais ainda pendentes', sourceLink:'Fonte', back:'Todas as perspectivas por país',
  },
};

function firstSentence(text: string) {
  const match = text.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] ?? text;
}

export function CountryGuide({ country, locale, backHref }: { country: CountryProfile; locale: Locale; backHref: string }) {
  const c = ui[locale];
  return <>
    <section className="country-hero">
      <div className="info-shell">
        <p>{c.eyebrow}</p>
        <h1>{c.hero(country.name)}</h1>
        <div>{c.intro(country.name)}</div>
      </div>
    </section>

    <section className="info-shell country-guide">
      <aside className="country-profile-context">
        <span>YOUR POLITANGLE RESULT, IN CONTEXT</span>
        <p>Your profile reflects your answers across eight political dimensions. This guide explains how those ideas appear in {country.name}; it does not predict your vote or claim that you belong to a party.</p>
      </aside>

      <section className="country-quick-read">
        <div className="method-section-head"><h2>{c.threeTitle}</h2><p>{c.threeIntro}</p></div>
        <div className="country-insight-grid">
          {country.power.slice(0, 3).map((paragraph, index) => (
            <article key={paragraph}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{paragraph}</p>
            </article>
          ))}
        </div>
      </section>

      {country.globalLabels && <section className="country-language">
        <div className="method-section-head"><h2>{c.globalLabelsTitle}</h2><p>{c.globalLabelsIntro}</p></div>
        <aside className="country-purpose">
          <strong>{c.globalFit[country.globalLabels.fit]}</strong>
          <p>{country.globalLabels.summary}</p>
          <div className="country-local-dimensions"><b>{c.localDimensions}</b>{country.globalLabels.localDimensions.map((dimension) => <span key={dimension}>{dimension}</span>)}</div>
        </aside>
      </section>}

      <section className="country-language">
        <div className="method-section-head"><h2>{c.labelsTitle}</h2><p>{c.labelsIntro}</p></div>
        <div className="country-language-grid">
          {country.vocabulary.map((paragraph) => (
            <article key={paragraph}><p>{paragraph}</p></article>
          ))}
        </div>
      </section>

      <section className="country-system">
        <div className="method-section-head country-system-head"><h2>{c.systemTitle}</h2><p>{c.systemIntro}</p></div>
        <dl className="country-facts">{country.atAGlance.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>

      <section className="country-history">
        <div className="method-section-head country-history-head"><h2>{c.historyTitle}</h2><p>{c.historyIntro}</p></div>
        <div className="country-timeline concise">
          {country.timeline.slice(0, 4).map((event) => (
            <article key={`${event.year}-${event.title}`}>
              <time>{event.year}</time>
              <strong>{event.title}</strong>
              <p>{event.text}</p>
            </article>
          ))}
        </div>
      </section>

      {country.current && <details className="country-current-details">
        <summary>{c.current} · {country.current.asOf}</summary>
        <div className="country-current-body">
          <dl className="country-facts">{country.current.officeholders.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <article><h3>{country.current.election.title}</h3><p>{country.current.election.summary}</p><small>{country.current.election.date} · {country.current.election.turnout}</small></article>
          <article><h3>{country.current.rights.provider} · {country.current.rights.edition}</h3><p>{country.current.rights.note}</p><a href={country.current.rights.url} rel="noreferrer">{c.sourceLink} →</a></article>
        </div>
      </details>}

      <details className="country-sources-details">
        <summary>{c.sources}</summary>
        <div>
          <ul className="country-sources">{country.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.title}</a><span>{source.publisher} · {source.checkedAt}</span></li>)}</ul>
          {country.incomplete.length > 0 && <p className="country-method-note">{locale === 'en' ? `${c.incomplete}: ${country.incomplete.join(' · ')}` : `${c.incomplete}.`}</p>}
        </div>
      </details>

      <div className="country-back"><Link href={backHref}>← {c.back}</Link></div>
    </section>
  </>;
}
