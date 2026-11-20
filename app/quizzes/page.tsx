'use client';

import Link from 'next/link';
import { localePath, useLocale, type Locale } from '../LocaleProvider';
import { SiteHeader } from '../SiteChrome';

type QuizCard = { label: string; title: string; meta: string; href: string };
type Copy = { kicker: string; title: string; intro: string; cards: readonly QuizCard[]; start: string };

const copy: Record<Locale, Copy> = {
  en: {
    kicker: 'AVAILABLE NOW',
    title: 'Which question would you like to explore?',
    intro: 'Some quizzes reveal patterns in your views. Others test how you distinguish political ideas. Pick one that makes you curious.',
    start: 'Try it',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 questions · see your views beyond one label', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Recognize political traditions', meta: '25-question practice set · explanations included', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Separate ideas that are often confused', meta: '25-question practice set · explanations included', href: '/practice?section=understand' },
      { label: 'FOCUSED QUIZ', title: 'Can you recognize populism?', meta: '12 questions · explanations included', href: '/populism-quiz' },
      { label: 'FOCUSED QUIZ', title: 'The Middle Class Trap', meta: '20 questions · taxes, services, wealth and influence', href: '/middle-class-trap' },
    ],
  },
  de: {
    kicker: 'JETZT VERFÜGBAR',
    title: 'Welche Frage möchtest du genauer erkunden?',
    intro: 'Manche Tests zeigen Muster in deinen Ansichten. Andere prüfen, wie du politische Begriffe unterscheidest. Wähle, was dich neugierig macht.',
    start: 'Ausprobieren',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 Fragen · mehr als links oder rechts', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Politische Strömungen erkennen', meta: '25 Fragen · mit Erklärungen', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Ähnliche politische Ideen unterscheiden', meta: '25 Fragen · mit Erklärungen', href: '/practice?section=understand' },
      { label: 'FOKUS-QUIZ', title: 'Erkennst du Populismus?', meta: '12 Fragen · mit Erklärungen', href: '/populism-quiz' },
    ],
  },
  es: {
    kicker: 'DISPONIBLES AHORA',
    title: '¿Qué pregunta te gustaría explorar?',
    intro: 'Unos cuestionarios exploran tus ideas; otros te invitan a distinguir conceptos políticos. Elige el que despierte tu curiosidad.',
    start: 'Probar',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 preguntas · más allá de una etiqueta', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Reconoce tradiciones políticas', meta: '25 preguntas · con explicaciones', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Distingue ideas que suelen confundirse', meta: '25 preguntas · con explicaciones', href: '/practice?section=understand' },
      { label: 'QUIZ ENFOCADO', title: '¿Reconoces el populismo?', meta: '12 preguntas · con explicaciones', href: '/populism-quiz' },
    ],
  },
  fr: {
    kicker: 'DISPONIBLES MAINTENANT',
    title: 'Quelle question aimerais-tu explorer ?',
    intro: 'Certains quiz explorent tes idées, d’autres mettent à l’épreuve ta compréhension des notions politiques. Choisis ce qui t’intrigue.',
    start: 'Essayer',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 questions · au-delà des étiquettes', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Reconnaître les traditions politiques', meta: '25 questions · avec explications', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Distinguer des idées souvent confondues', meta: '25 questions · avec explications', href: '/practice?section=understand' },
      { label: 'QUIZ CIBLÉ', title: 'Sais-tu reconnaître le populisme ?', meta: '12 questions · avec explications', href: '/populism-quiz' },
    ],
  },
  'pt-br': {
    kicker: 'DISPONÍVEIS AGORA',
    title: 'Qual ideia você quer explorar?',
    intro: 'Alguns testes mostram padrões nas suas opiniões; outros convidam você a distinguir conceitos políticos. Escolha o que desperta sua curiosidade.',
    start: 'Experimentar',
    cards: [
      { label: 'BELIEVE', title: 'Politangle Quick', meta: '26 perguntas · além de um único rótulo', href: '/quiz' },
      { label: 'CLASSIFY', title: 'Reconheça tradições políticas', meta: '25 perguntas · com explicações', href: '/practice?section=classify' },
      { label: 'UNDERSTAND', title: 'Diferencie ideias que costumam ser confundidas', meta: '25 perguntas · com explicações', href: '/practice?section=understand' },
      { label: 'QUIZ TEMÁTICO', title: 'Você reconhece o populismo?', meta: '12 perguntas · com explicações', href: '/populism-quiz' },
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
