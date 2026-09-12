'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale, type Locale } from '../../LocaleProvider';

type Copy = {
  mode: string; kicker: string; title: string; intro: string;
  quickText: string; quickCta: string; fullText: string; fullCta: string;
  literacy: string; classifyText: string; classifyCta: string; understandText: string; understandCta: string;
  literacyNotice?: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    mode:'Private Student Mode', kicker:'Your device · your result', title:'Explore politics privately.',
    intro:'No classroom code is needed. These activities do not send your individual political profile to a teacher.',
    quickText:'Start with 26 single statements and see your broad multidimensional political shape.', quickCta:'Start Quick 26',
    fullText:'After Quick, Full adds 16 different questions and brings the assessment to 42 questions in total.', fullCta:'Start Quick → Full',
    literacy:'Political literacy', classifyText:'Match political descriptions to the traditions that fit them best.', classifyCta:'Start CLASSIFY',
    understandText:'Distinguish political concepts and common misconceptions.', understandCta:'Start UNDERSTAND',
  },
  de: {
    mode:'Privater Schülerbereich', kicker:'Dein Gerät · dein Ergebnis', title:'Erkunde Politik für dich.',
    intro:'Du brauchst keinen Klassencode. Dein persönliches politisches Profil wird bei diesen Aktivitäten nicht an eine Lehrkraft geschickt.',
    quickText:'Starte mit 26 einzelnen Aussagen und sieh, wie sich deine Ansichten über mehrere politische Dimensionen verteilen.', quickCta:'Quick 26 starten',
    fullText:'Nach Quick ergänzt Full 16 weitere Fragen. Zusammen sind es 42 Fragen.', fullCta:'Quick → Full starten',
    literacy:'Politisches Wissen', classifyText:'Ordne politische Beschreibungen den Traditionen zu, zu denen sie am besten passen.', classifyCta:'CLASSIFY starten',
    understandText:'Unterscheide politische Begriffe, Grenzen und typische Missverständnisse.', understandCta:'UNDERSTAND starten',
  },
  es: {
    mode:'Modo privado', kicker:'Tu dispositivo · tu resultado', title:'Explora la política por tu cuenta.',
    intro:'No necesitas código de clase. Estas actividades no envían tu perfil político individual al profesor.',
    quickText:'Empieza con 26 afirmaciones y descubre cómo se reparten tus ideas entre varias dimensiones políticas.', quickCta:'Empezar Quick 26',
    fullText:'Después de Quick, Full añade 16 preguntas más. En total son 42.', fullCta:'Empezar Quick → Full',
    literacy:'Conocimientos políticos', classifyText:'Relaciona descripciones políticas con las tradiciones que mejor encajan.', classifyCta:'Empezar CLASSIFY',
    understandText:'Distingue conceptos políticos, sus límites y confusiones habituales.', understandCta:'Empezar UNDERSTAND',
    literacyNotice:'La interfaz está en español, pero CLASSIFY y UNDERSTAND todavía usan su banco validado en inglés mientras se prepara una versión española revisada.',
  },
  fr: {
    mode:'Mode privé', kicker:'Ton appareil · ton résultat', title:'Explore la politique de ton côté.',
    intro:'Aucun code de classe n’est nécessaire. Ces activités n’envoient pas ton profil politique individuel à l’enseignant.',
    quickText:'Commence par 26 affirmations et vois comment tes idées se répartissent sur plusieurs dimensions politiques.', quickCta:'Lancer Quick 26',
    fullText:'Après Quick, Full ajoute 16 questions. Cela fait 42 questions au total.', fullCta:'Lancer Quick → Full',
    literacy:'Culture politique', classifyText:'Associe les descriptions politiques aux traditions qui leur correspondent le mieux.', classifyCta:'Lancer CLASSIFY',
    understandText:'Distingue les notions politiques, leurs limites et les confusions courantes.', understandCta:'Lancer UNDERSTAND',
    literacyNotice:'L’interface est en français, mais CLASSIFY et UNDERSTAND utilisent encore leur banque validée en anglais, en attendant une version française revue.',
  },
};

export default function PrivateSchoolPage() {
  const { locale } = useLocale();
  const c = copy[locale];
  return (
    <main className="engine-page school-page">
      <header className="engine-header"><Link href="/school" className="engine-brand">Politangle School</Link><span>{c.mode}</span><LanguageSelector /></header>
      <section className="engine-shell school-shell">
        <article className="engine-card"><p className="engine-kicker">{c.kicker}</p><h1>{c.title}</h1><p>{c.intro}</p>{c.literacyNotice && <p className="engine-help">{c.literacyNotice}</p>}</article>
        <div className="school-entry-grid">
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Quick 26</h2><p>{c.quickText}</p><Link className="engine-primary-link" href="/quiz">{c.quickCta}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Full 42</h2><p>{c.fullText}</p><Link className="engine-primary-link" href="/quiz">{c.fullCta}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">{c.literacy}</p><h2>CLASSIFY</h2><p>{c.classifyText}</p><Link className="engine-primary-link" href="/classify">{c.classifyCta}</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">{c.literacy}</p><h2>UNDERSTAND</h2><p>{c.understandText}</p><Link className="engine-primary-link" href="/understand">{c.understandCta}</Link></article>
        </div>
      </section>
    </main>
  );
}
