'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { scoreLiteracyItem, type DeepSection } from '../../lib/deep-engine';
import { LITERACY_MASTER_BANK_VERSION, type LiteracyQuestionRecord } from '../../lib/literacy-bank-schema';
import { selectPracticeQuestionPlan } from '../../lib/literacy-certified-selector';
import { glossaryEntriesForTags } from '../../lib/literacy-glossary';
import { literacyMasterBankCandidates } from '../../lib/literacy-master-bank';
import { useLocale, type Locale } from '../LocaleProvider';

type PracticeRun = {
  section: DeepSection;
  seed: number;
  questionIds: readonly string[];
  index: number;
  answers: Readonly<Record<string, string>>;
  revealed: readonly string[];
  finished: boolean;
};

type PracticeCopy = {
  headerAll: string; headerStart: string; learn: string; kicker: string; title: string; lede: string;
  classifyStrong: string; classifySmall: string; understandStrong: string; understandSmall: string;
  statusTitle: string; statusText: string; notice: string | null; complete: string;
  resultLede: (percent: number) => string; newSet: (section: string) => string; another: string;
  soFar: (n: number) => string; exit: string; question: (index: number, total: number) => string;
  correct: string; notQuite: string; best: string; review: string; see: string; next: string; check: string;
  progress: (index: number, total: number) => string;
};

// Practice questions and explanations are English for now (the quizzes page and a notice say so).
// Everything around them follows the reader's language, informal address throughout.
const practiceCopy: Record<Locale, PracticeCopy> = {
  en: {
    headerAll: 'PRACTICE', headerStart: 'PRACTICE · ENGLISH', learn: 'Learn the terms', kicker: 'FREE POLITICAL LITERACY PRACTICE',
    title: 'Choose what you want to practise.',
    lede: 'Each set draws 25 questions with balanced topic coverage. You see the answer and a short explanation after every question.',
    classifyStrong: 'Which political tradition fits?', classifySmall: 'Recognize political families from short descriptions.',
    understandStrong: 'What is the important difference?', understandSmall: 'Separate ideas that are often mixed up.',
    statusTitle: 'Practice bank under review', statusText: 'These questions are still being reviewed. Practice is free and does not issue a certificate.',
    notice: null, complete: 'PRACTICE COMPLETE',
    resultLede: (p) => `${p}% correct. Use the explanations to decide what to review, then try a fresh balanced set.`,
    newSet: (s) => `New ${s} set`, another: 'Choose another set', soFar: (n) => `${n} correct so far`, exit: 'Exit practice',
    question: (i, t) => `QUESTION ${i} OF ${t}`, correct: 'CORRECT', notQuite: 'NOT QUITE', best: 'Best answer:', review: 'Review:',
    see: 'See result', next: 'Next question', check: 'Check answer', progress: (i, t) => `${i} of ${t}`,
  },
  de: {
    headerAll: 'ÜBUNG', headerStart: 'ÜBUNG · FRAGEN AUF ENGLISCH', learn: 'Begriffe lernen', kicker: 'KOSTENLOSE ÜBUNG IN POLITISCHER BILDUNG',
    title: 'Was möchtest du üben?',
    lede: 'Jeder Satz enthält 25 Fragen mit ausgewogener Themenabdeckung. Nach jeder Frage siehst du die Antwort und eine kurze Erklärung.',
    classifyStrong: 'Welche politische Tradition passt?', classifySmall: 'Erkenne politische Strömungen anhand kurzer Beschreibungen.',
    understandStrong: 'Was ist der wichtige Unterschied?', understandSmall: 'Unterscheide Ideen, die oft verwechselt werden.',
    statusTitle: 'Übungsfragen in Prüfung', statusText: 'Diese Fragen werden noch geprüft. Die Übung ist kostenlos und führt zu keinem Zertifikat.',
    notice: 'Die Fragen und Erklärungen sind noch nicht ins Deutsche übersetzt und bleiben vorerst auf Englisch. Die Oberfläche ist auf Deutsch.',
    complete: 'ÜBUNG ABGESCHLOSSEN',
    resultLede: (p) => `${p} % richtig. Nutze die Erklärungen, um zu entscheiden, was du wiederholen willst, und starte dann einen neuen, ausgewogenen Satz.`,
    newSet: (s) => `Neuer ${s}-Satz`, another: 'Anderen Satz wählen', soFar: (n) => `Bisher ${n} richtig`, exit: 'Übung verlassen',
    question: (i, t) => `FRAGE ${i} VON ${t}`, correct: 'RICHTIG', notQuite: 'NOCH NICHT GANZ', best: 'Beste Antwort:', review: 'Nachschlagen:',
    see: 'Ergebnis ansehen', next: 'Nächste Frage', check: 'Antwort prüfen', progress: (i, t) => `${i} von ${t}`,
  },
  es: {
    headerAll: 'PRÁCTICA', headerStart: 'PRÁCTICA · PREGUNTAS EN INGLÉS', learn: 'Aprende los términos', kicker: 'PRÁCTICA GRATUITA DE CULTURA POLÍTICA',
    title: 'Elige qué quieres practicar.',
    lede: 'Cada serie tiene 25 preguntas con una cobertura equilibrada de temas. Después de cada pregunta ves la respuesta y una breve explicación.',
    classifyStrong: '¿Qué tradición política encaja?', classifySmall: 'Reconoce familias políticas a partir de descripciones breves.',
    understandStrong: '¿Cuál es la diferencia importante?', understandSmall: 'Distingue ideas que suelen confundirse.',
    statusTitle: 'Preguntas de práctica en revisión', statusText: 'Estas preguntas aún se están revisando. La práctica es gratuita y no da ningún certificado.',
    notice: 'Las preguntas y las explicaciones todavía no tienen una versión española validada y siguen en inglés. La interfaz está en español.',
    complete: 'PRÁCTICA COMPLETADA',
    resultLede: (p) => `${p} % de aciertos. Usa las explicaciones para decidir qué repasar y prueba después una serie nueva y equilibrada.`,
    newSet: (s) => `Nueva serie ${s}`, another: 'Elegir otra serie', soFar: (n) => `${n} correctas hasta ahora`, exit: 'Salir de la práctica',
    question: (i, t) => `PREGUNTA ${i} DE ${t}`, correct: 'CORRECTO', notQuite: 'NO DEL TODO', best: 'Mejor respuesta:', review: 'Repasa:',
    see: 'Ver resultado', next: 'Siguiente pregunta', check: 'Comprobar respuesta', progress: (i, t) => `${i} de ${t}`,
  },
  fr: {
    headerAll: 'ENTRAÎNEMENT', headerStart: 'ENTRAÎNEMENT · QUESTIONS EN ANGLAIS', learn: 'Apprendre les termes', kicker: 'ENTRAÎNEMENT GRATUIT À LA CULTURE POLITIQUE',
    title: 'Choisis ce que tu veux travailler.',
    lede: 'Chaque série comporte 25 questions avec une couverture équilibrée des thèmes. Après chaque question, tu vois la réponse et une courte explication.',
    classifyStrong: 'Quelle tradition politique correspond ?', classifySmall: 'Reconnais des familles politiques à partir de courtes descriptions.',
    understandStrong: 'Quelle est la différence importante ?', understandSmall: 'Distingue des idées souvent confondues.',
    statusTitle: 'Questions d’entraînement en cours de relecture', statusText: 'Ces questions sont encore en cours de relecture. L’entraînement est gratuit et ne donne aucun certificat.',
    notice: 'Les questions et les explications n’ont pas encore de version française validée et restent en anglais. L’interface est en français.',
    complete: 'ENTRAÎNEMENT TERMINÉ',
    resultLede: (p) => `${p} % de bonnes réponses. Utilise les explications pour décider quoi revoir, puis essaie une nouvelle série équilibrée.`,
    newSet: (s) => `Nouvelle série ${s}`, another: 'Choisir une autre série', soFar: (n) => `${n} bonnes réponses`, exit: 'Quitter l’entraînement',
    question: (i, t) => `QUESTION ${i} SUR ${t}`, correct: 'BONNE RÉPONSE', notQuite: 'PAS TOUT À FAIT', best: 'Meilleure réponse :', review: 'À revoir :',
    see: 'Voir le résultat', next: 'Question suivante', check: 'Vérifier la réponse', progress: (i, t) => `${i} sur ${t}`,
  },
  'pt-br': {
    headerAll: 'PRÁTICA', headerStart: 'PRÁTICA · PERGUNTAS EM INGLÊS', learn: 'Aprenda os termos', kicker: 'PRÁTICA GRATUITA DE EDUCAÇÃO POLÍTICA',
    title: 'Escolha o que você quer praticar.',
    lede: 'Cada conjunto reúne 25 perguntas com cobertura equilibrada de temas. Depois de cada pergunta, você vê a resposta e uma breve explicação.',
    classifyStrong: 'Qual tradição política combina?', classifySmall: 'Reconheça famílias políticas a partir de descrições curtas.',
    understandStrong: 'Qual é a diferença importante?', understandSmall: 'Diferencie ideias que costumam ser confundidas.',
    statusTitle: 'Perguntas de prática em revisão', statusText: 'Estas perguntas ainda estão em revisão. A prática é gratuita e não emite certificado.',
    notice: 'As perguntas e as explicações ainda não têm uma versão validada em português do Brasil e continuam em inglês. A interface está em português.',
    complete: 'PRÁTICA CONCLUÍDA',
    resultLede: (p) => `${p}% de acertos. Use as explicações para decidir o que revisar e depois tente um novo conjunto equilibrado.`,
    newSet: (s) => `Novo conjunto ${s}`, another: 'Escolher outro conjunto', soFar: (n) => `${n} acertos até agora`, exit: 'Sair da prática',
    question: (i, t) => `PERGUNTA ${i} DE ${t}`, correct: 'CORRETO', notQuite: 'NÃO EXATAMENTE', best: 'Melhor resposta:', review: 'Revise:',
    see: 'Ver resultado', next: 'Próxima pergunta', check: 'Verificar resposta', progress: (i, t) => `${i} de ${t}`,
  },
};

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function orderedOptions(question: LiteracyQuestionRecord, seed: number) {
  return [...question.options].sort((left, right) => hash(`${seed}:${question.id}:${left.id}`) - hash(`${seed}:${question.id}:${right.id}`));
}

export default function PracticeClient() {
  const [run, setRun] = useState<PracticeRun | null>(null);
  const { locale } = useLocale();
  const c = practiceCopy[locale];

  const questions = useMemo(() => new Map(literacyMasterBankCandidates.map((question) => [question.id, question])), []);
  const current = run ? questions.get(run.questionIds[run.index]) ?? null : null;
  const selected = run && current ? run.answers[current.id] : undefined;
  const checked = Boolean(run && current && run.revealed.includes(current.id));
  const result = current && selected && checked ? scoreLiteracyItem(current, [selected]) : null;

  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section');
    if (section === 'classify' || section === 'understand') start(section);
  }, []);

  function start(section: DeepSection) {
    const seed = newSeed();
    const selection = selectPracticeQuestionPlan({
      questions: literacyMasterBankCandidates,
      section,
      bankVersion: LITERACY_MASTER_BANK_VERSION,
      seed,
    });
    if (!selection.ok) return;
    setRun({ section, seed, questionIds: selection.plan.questionIds, index: 0, answers: {}, revealed: [], finished: false });
  }

  function choose(optionId: string) {
    if (!run || !current || checked) return;
    setRun({ ...run, answers: { ...run.answers, [current.id]: optionId } });
  }

  function check() {
    if (!run || !current || !selected || checked) return;
    setRun({ ...run, revealed: [...run.revealed, current.id] });
  }

  function next() {
    if (!run || !checked) return;
    if (run.index === run.questionIds.length - 1) {
      setRun({ ...run, finished: true });
      return;
    }
    setRun({ ...run, index: run.index + 1 });
  }

  const correct = run?.revealed.reduce((total, id) => {
    const question = questions.get(id);
    const answer = run.answers[id];
    return total + (question && answer && scoreLiteracyItem(question, [answer]).correct ? 1 : 0);
  }, 0) ?? 0;

  if (!run) {
    return (
      <main className="engine-page practice-page practice-start-state">
        <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>{c.headerStart}</span><Link href="/learn">{c.learn}</Link></header>
        <section className="engine-shell practice-start">
          <p className="engine-kicker">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p className="practice-lede">{c.lede}</p>
          <div className="practice-choice-grid">
            <button type="button" onClick={() => start('classify')}><span>CLASSIFY</span><strong>{c.classifyStrong}</strong><small>{c.classifySmall}</small></button>
            <button type="button" onClick={() => start('understand')}><span>UNDERSTAND</span><strong>{c.understandStrong}</strong><small>{c.understandSmall}</small></button>
          </div>
          <div className="practice-status"><strong>{c.statusTitle}</strong><p>{c.statusText}</p>{c.notice && <p>{c.notice}</p>}</div>
        </section>
      </main>
    );
  }

  if (run.finished) {
    const percent = Math.round((correct / run.questionIds.length) * 100);
    return (
      <main className="engine-page practice-page">
        <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>{c.headerAll} · {run.section.toUpperCase()}</span><Link href="/learn">{c.learn}</Link></header>
        <section className="engine-shell literacy-shell">
          <article className="engine-card literacy-result-card">
            <p className="engine-kicker">{c.complete}</p>
            <h1>{correct} / {run.questionIds.length}</h1>
            <p className="result-lede">{c.resultLede(percent)}</p>
            <div className="engine-result-actions">
              <button className="engine-primary-link" type="button" onClick={() => start(run.section)}>{c.newSet(run.section.toUpperCase())}</button>
              <button className="engine-primary-link secondary" type="button" onClick={() => setRun(null)}>{c.another}</button>
            </div>
          </article>
        </section>
      </main>
    );
  }

  if (!current) return null;
  const correctLabels = current.acceptedAnswerSets[0]
    .map((id) => current.options.find((option) => option.id === id)?.label)
    .filter(Boolean)
    .join(', ');
  const glossary = checked ? glossaryEntriesForTags(current.secondaryTags) : [];

  return (
    <main className="engine-page practice-page">
      <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>{c.headerAll} · {run.section.toUpperCase()}</span><Link href="/learn">{c.learn}</Link></header>
      <section className="engine-shell literacy-shell">
        <div className="engine-progress-row">
          <span>{c.soFar(correct)}</span>
          <div className="engine-progress" aria-label={c.progress(run.index + 1, run.questionIds.length)}><span style={{ width: `${((run.index + 1) / run.questionIds.length) * 100}%` }} /></div>
          <button type="button" className="engine-link-button" onClick={() => setRun(null)}>{c.exit}</button>
        </div>
        {c.notice && <p className="engine-help practice-notice">{c.notice}</p>}
        <article className="engine-card literacy-card">
          <p className="engine-kicker">{c.question(run.index + 1, run.questionIds.length)}</p>
          <h1 className="literacy-prompt">{current.prompt}</h1>
          <div className="deep-options literacy-options">
            {orderedOptions(current, run.seed).map((option) => (
              <button type="button" disabled={checked} className={selected === option.id ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{option.label}</button>
            ))}
          </div>
          {checked && result && (
            <div className="literacy-feedback" aria-live="polite">
              <p className="engine-kicker">{result.correct ? c.correct : c.notQuite}</p>
              {!result.correct && <p><strong>{c.best}</strong> {correctLabels}</p>}
              <p>{current.explanation}</p>
              {glossary.length > 0 && <p className="practice-glossary"><strong>{c.review}</strong>{' '}{glossary.map((entry, index) => <span key={entry.slug}><Link href={`/learn#${entry.slug}`}>{entry.term}</Link>{index < glossary.length - 1 ? ', ' : ''}</span>)}</p>}
            </div>
          )}
        </article>
        <div className="engine-nav literacy-nav">
          <span>{run.index + 1} / {run.questionIds.length}</span>
          {checked ? <button type="button" onClick={next}>{run.index === run.questionIds.length - 1 ? c.see : c.next}</button> : <button type="button" onClick={check} disabled={!selected}>{c.check}</button>}
        </div>
      </section>
    </main>
  );
}
