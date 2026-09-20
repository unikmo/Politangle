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
    intro:(name)=>`What changes when you read political ideas in ${name}? This page gives the minimum context you need before comparing labels across countries.`,
    whyTitle:'Why this page exists',
    why1:'Political words do not travel perfectly. “Liberal”, “conservative”, “left”, “right”, “national” or “federal” can point to different coalitions and institutions in different countries.',
    why2:'This page does not change your Politangle score. It helps you understand the local context behind the vocabulary.',
    threeTitle:'Three things to know first', threeIntro:'The shortest useful version of how power works here.', whyMatters:'Why this matters',
    labelsTitle:'What familiar labels mean here', labelsIntro:'Some political words change meaning across countries. These are the distinctions worth knowing first.', globalLabelsTitle:'How well do global labels travel?', globalLabelsIntro:'Politangle uses shared dimensions for comparison, but it does not force local politics into a left–right box when that would mislead.', globalFit:{strong:'Strong fit',partial:'Partial fit',limited:'Limited fit'}, localDimensions:'What the global labels miss', moreContext:'More context',
    systemTitle:'The system in 30 seconds', systemIntro:'Enough structure to make the rest of the page intelligible.',
    historyTitle:'Turning points worth knowing', historyIntro:'Only the events that help explain how today’s system got here.',
    current:'Current political snapshot', sources:'Sources and update status', incomplete:'Current-data work still open', sourceLink:'Source', back:'All country perspectives',
  },
  de: {
    eyebrow:'LÄNDERPERSPEKTIVE',
    hero:(name)=>`${name} im politischen Kontext.`,
    intro:(name)=>`Was verändert sich, wenn politische Begriffe in ${name} verwendet werden? Hier steht nur der Kontext, den du brauchst, bevor du politische Etiketten zwischen Ländern vergleichst.`,
    whyTitle:'Warum diese Seite existiert',
    why1:'Politische Begriffe bedeuten nicht überall dasselbe. „Liberal“, „konservativ“, „links“, „rechts“, „national“ oder „föderal“ können je nach Land andere Bündnisse und Institutionen meinen.',
    why2:'Diese Seite verändert deinen Politangle-Wert nicht. Sie erklärt den lokalen Kontext hinter den Begriffen.',
    threeTitle:'Drei Dinge zuerst', threeIntro:'Die kürzeste sinnvolle Erklärung dafür, wie politische Macht hier funktioniert.', whyMatters:'Warum das wichtig ist',
    labelsTitle:'Was bekannte politische Begriffe hier bedeuten', labelsIntro:'Einige politische Begriffe verändern ihre Bedeutung von Land zu Land. Diese Unterschiede solltest du zuerst kennen.', globalLabelsTitle:'Wie gut funktionieren globale Kategorien?', globalLabelsIntro:'Politangle nutzt gemeinsame Dimensionen zum Vergleich, zwingt lokale Politik aber nicht in ein Links-rechts-Schema, wenn das irreführend wäre.', globalFit:{strong:'Gute Passung',partial:'Teilweise passend',limited:'Nur begrenzt passend'}, localDimensions:'Was globale Kategorien nicht erfassen', moreContext:'Mehr Kontext',
    systemTitle:'Das System in 30 Sekunden', systemIntro:'Genug Struktur, um den Rest der Seite einordnen zu können.',
    historyTitle:'Wendepunkte, die man kennen sollte', historyIntro:'Nur Ereignisse, die erklären, wie das heutige System entstanden ist.',
    current:'Aktuelle politische Momentaufnahme', sources:'Quellen und Aktualisierungsstand', incomplete:'Noch offene aktuelle Daten', sourceLink:'Quelle', back:'Alle Länderperspektiven',
  },
  es: {
    eyebrow:'PERSPECTIVA DEL PAÍS',
    hero:(name)=>`${name}, en contexto.`,
    intro:(name)=>`¿Qué cambia cuando lees ideas políticas en ${name}? Esta página ofrece solo el contexto necesario antes de comparar etiquetas entre países.`,
    whyTitle:'Por qué existe esta página',
    why1:'Las palabras políticas no viajan perfectamente. “Liberal”, “conservador”, “izquierda”, “derecha”, “nacional” o “federal” pueden señalar coaliciones e instituciones distintas según el país.',
    why2:'Esta página no cambia tu puntuación de Politangle. Te ayuda a entender el contexto local detrás del vocabulario.',
    threeTitle:'Tres cosas que conviene saber primero', threeIntro:'La versión más breve y útil de cómo funciona el poder aquí.', whyMatters:'Por qué importa',
    labelsTitle:'Qué significan aquí las etiquetas conocidas', labelsIntro:'Algunas palabras políticas cambian de significado entre países. Estas son las diferencias que conviene conocer primero.', globalLabelsTitle:'¿Qué tan bien funcionan las etiquetas globales?', globalLabelsIntro:'Politangle usa dimensiones comunes para comparar, pero no fuerza la política local dentro de un eje izquierda–derecha cuando eso sería engañoso.', globalFit:{strong:'Encaje alto',partial:'Encaje parcial',limited:'Encaje limitado'}, localDimensions:'Lo que las etiquetas globales no captan', moreContext:'Más contexto',
    systemTitle:'El sistema en 30 segundos', systemIntro:'La estructura suficiente para entender el resto de la página.',
    historyTitle:'Puntos de inflexión que conviene conocer', historyIntro:'Solo los hechos que ayudan a explicar cómo se llegó al sistema actual.',
    current:'Panorama político actual', sources:'Fuentes y estado de actualización', incomplete:'Datos actuales aún pendientes', sourceLink:'Fuente', back:'Todas las perspectivas nacionales',
  },
  fr: {
    eyebrow:'PERSPECTIVE NATIONALE',
    hero:(name)=>`${name}, en contexte.`,
    intro:(name)=>`Qu’est-ce qui change quand on lit les idées politiques en ${name} ? Cette page donne seulement le contexte nécessaire avant de comparer les étiquettes entre pays.`,
    whyTitle:'Pourquoi cette page existe',
    why1:'Les mots politiques ne voyagent pas parfaitement. « Libéral », « conservateur », « gauche », « droite », « national » ou « fédéral » peuvent désigner des coalitions et des institutions différentes selon les pays.',
    why2:'Cette page ne modifie pas ton score Politangle. Elle aide à comprendre le contexte local derrière le vocabulaire.',
    threeTitle:'Trois choses à savoir d’abord', threeIntro:'La version la plus courte et utile du fonctionnement du pouvoir ici.', whyMatters:'Pourquoi c’est important',
    labelsTitle:'Ce que les étiquettes familières veulent dire ici', labelsIntro:'Certains mots politiques changent de sens selon les pays. Voici les différences à connaître en premier.', globalLabelsTitle:'Dans quelle mesure les étiquettes globales fonctionnent-elles ?', globalLabelsIntro:'Politangle utilise des dimensions communes pour comparer, mais ne force pas la politique locale dans un axe gauche–droite lorsque cela serait trompeur.', globalFit:{strong:'Bonne correspondance',partial:'Correspondance partielle',limited:'Correspondance limitée'}, localDimensions:'Ce que les étiquettes globales ne saisissent pas', moreContext:'Plus de contexte',
    systemTitle:'Le système en 30 secondes', systemIntro:'Juste assez de structure pour comprendre le reste de la page.',
    historyTitle:'Les tournants à connaître', historyIntro:'Uniquement les événements qui aident à expliquer la formation du système actuel.',
    current:'Instantané politique actuel', sources:'Sources et état de mise à jour', incomplete:'Données actuelles encore à compléter', sourceLink:'Source', back:'Toutes les perspectives nationales',
  },
  'pt-br': {
    eyebrow:'PERSPECTIVA POR PAÍS',
    hero:(name)=>`${name}, em contexto.`,
    intro:(name)=>`O que muda quando ideias políticas são lidas em ${name}? Esta página traz o contexto mínimo necessário antes de comparar rótulos entre países.`,
    whyTitle:'Por que esta página existe',
    why1:'Palavras políticas não significam exatamente a mesma coisa em todo lugar. “Liberal”, “conservador”, “esquerda”, “direita”, “nacional” ou “federal” podem apontar para coalizões e instituições diferentes em cada país.',
    why2:'Esta página não altera sua pontuação no Politangle. Ela ajuda a entender o contexto local por trás do vocabulário.',
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
      <aside className="country-purpose">
        <strong>{c.whyTitle}</strong>
        <p>{c.why1}</p>
        <p><b>{c.why2}</b></p>
      </aside>

      <section className="country-quick-read">
        <div className="method-section-head"><h2>{c.threeTitle}</h2><p>{c.threeIntro}</p></div>
        <div className="country-insight-grid">
          {country.power.slice(0, 3).map((paragraph, index) => (
            <article key={paragraph}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{firstSentence(paragraph)}</p>
              {firstSentence(paragraph) !== paragraph && <details><summary>{c.whyMatters}</summary><p>{paragraph}</p></details>}
            </article>
          ))}
        </div>
      </section>

      {country.globalLabels && <section className="country-language">
        <div className="method-section-head"><h2>{c.globalLabelsTitle}</h2><p>{c.globalLabelsIntro}</p></div>
        <aside className="country-purpose">
          <strong>{c.globalFit[country.globalLabels.fit]}</strong>
          <p>{country.globalLabels.summary}</p>
          <p><b>{c.localDimensions}:</b> {country.globalLabels.localDimensions.join(' · ')}</p>
        </aside>
      </section>}

      <section className="country-language">
        <div className="method-section-head"><h2>{c.labelsTitle}</h2><p>{c.labelsIntro}</p></div>
        <div className="country-language-grid">
          {country.vocabulary.map((paragraph) => (
            <article key={paragraph}>
              <p>{firstSentence(paragraph)}</p>
              {firstSentence(paragraph) !== paragraph && <details><summary>{c.moreContext}</summary><p>{paragraph}</p></details>}
            </article>
          ))}
        </div>
      </section>

      <section className="country-system">
        <div className="method-section-head"><h2>{c.systemTitle}</h2><p>{c.systemIntro}</p></div>
        <dl className="country-facts">{country.atAGlance.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>

      <section className="country-history">
        <div className="method-section-head"><h2>{c.historyTitle}</h2><p>{c.historyIntro}</p></div>
        <div className="country-timeline concise">
          {country.timeline.slice(0, 4).map((event) => (
            <details key={`${event.year}-${event.title}`}>
              <summary><time>{event.year}</time><strong>{event.title}</strong></summary>
              <p>{event.text}</p>
            </details>
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
