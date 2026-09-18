'use client';

import Link from 'next/link';
import { localePath, useLocale, type Locale } from '../LocaleProvider';
import { SiteHeader } from '../SiteChrome';

type QuizCard = { label: string; title: string; meta: string; href: string };
type Copy = { kicker: string; title: string; intro: string; cards: readonly QuizCard[]; start: string };

const copy: Record<Locale, Copy> = {
  en: {
    kicker: 'AVAILABLE NOW',
    title: 'Choose a quiz.',
    intro: 'Only quizzes you can take now are shown here.',
    start: 'Start',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 questions · your political shape', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Recognize political traditions', meta: '25-question practice set · explanations included', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Separate ideas that are often confused', meta: '25-question practice set · explanations included', href: '/practice?section=understand' },
      { label: 'FOCUSED QUIZ', title: 'Can you recognize populism?', meta: '12 questions · explanations included', href: '/populism-quiz' },
    ],
  },
  de: {
    kicker: 'JETZT VERFÜGBAR',
    title: 'Wähle einen Quiz.',
    intro: 'Hier stehen nur Tests, die du jetzt direkt machen kannst.',
    start: 'Starten',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 Fragen · dein politisches Profil', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Politische Traditionen erkennen', meta: '25 Fragen · mit Erklärungen', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Oft verwechselte Ideen unterscheiden', meta: '25 Fragen · mit Erklärungen', href: '/practice?section=understand' },
      { label: 'FOKUS-QUIZ', title: 'Erkennst du Populismus?', meta: '12 Fragen · mit Erklärungen', href: '/populism-quiz' },
    ],
  },
  es: {
    kicker: 'DISPONIBLES AHORA',
    title: 'Elige un quiz.',
    intro: 'Aquí solo aparecen los quizzes que puedes hacer ahora.',
    start: 'Empezar',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 preguntas · tu perfil político', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Reconoce tradiciones políticas', meta: '25 preguntas · con explicaciones', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Distingue ideas que suelen confundirse', meta: '25 preguntas · con explicaciones', href: '/practice?section=understand' },
      { label: 'QUIZ ENFOCADO', title: '¿Reconoces el populismo?', meta: '12 preguntas · con explicaciones', href: '/populism-quiz' },
    ],
  },
  fr: {
    kicker: 'DISPONIBLES MAINTENANT',
    title: 'Choisis un quiz.',
    intro: 'Seuls les quiz que tu peux faire maintenant sont affichés ici.',
    start: 'Commencer',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 questions · ton profil politique', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Reconnaître les traditions politiques', meta: '25 questions · avec explications', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Distinguer des idées souvent confondues', meta: '25 questions · avec explications', href: '/practice?section=understand' },
      { label: 'QUIZ CIBLÉ', title: 'Sais-tu reconnaître le populisme ?', meta: '12 questions · avec explications', href: '/populism-quiz' },
    ],
  },
};

export default function QuizzesPage() {
  const { locale } = useLocale();
  const c = copy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <main className="home quizzes-page">
      <SiteHeader />
      <section className="quizzes-hero">
        <div className="p-shell">
          <p className="p-kicker">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </div>
      </section>
      <section className="quiz-choice-grid p-shell" aria-label={c.title}>
        {c.cards.map((card) => (
          <Link className="quiz-choice-card" href={href(card.href)} key={card.href}>
            <span>{card.label}</span>
            <strong>{card.title}</strong>
            <small>{card.meta}</small>
            <b>{c.start} →</b>
          </Link>
        ))}
      </section>
    </main>
  );
}
