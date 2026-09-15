'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  POPULISM_QUIZ_ANGLES,
  POPULISM_QUIZ_SIZE,
  type PopulismQuizQuestion,
  selectPopulismQuiz,
} from '../../lib/populism-quiz';
import { LanguageSelector, useLocale } from '../LocaleProvider';
import { localizedPopulismQuestion, nativeAngleLabels, populismUi } from './populism-native';

type Run = {
  seed: number;
  questionIds: readonly string[];
  index: number;
  answers: Readonly<Record<string, string>>;
  revealed: readonly string[];
  hintShown: readonly string[];
  finished: boolean;
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

function orderedOptions(question: PopulismQuizQuestion, seed: number) {
  return [...question.options].sort((left, right) => hash(`${seed}:${question.id}:${left.id}`) - hash(`${seed}:${question.id}:${right.id}`));
}

export default function PopulismQuizClient() {
  const { locale } = useLocale();
  const c = populismUi(locale);
  const angleLabels = nativeAngleLabels[locale];
  const [run, setRun] = useState<Run | null>(null);
  const questions = useMemo(() => new Map(selectPopulismQuiz(run?.seed ?? 0).map((question) => {
    const localized = localizedPopulismQuestion(locale, question);
    return [localized.id, localized] as const;
  })), [locale, run?.seed]);
  const current = run ? questions.get(run.questionIds[run.index]) ?? null : null;
  const selectedId = run && current ? run.answers[current.id] : undefined;
  const selectedOption = current?.options.find((option) => option.id === selectedId);
  const checked = Boolean(run && current && run.revealed.includes(current.id));

  function start() {
    const seed = newSeed();
    const selected = selectPopulismQuiz(seed);
    setRun({ seed, questionIds: selected.map((question) => question.id), index: 0, answers: {}, revealed: [], hintShown: [], finished: false });
  }

  function choose(optionId: string) {
    if (!run || !current || checked) return;
    setRun({ ...run, answers: { ...run.answers, [current.id]: optionId } });
  }

  function check() {
    if (!run || !current || !selectedId || checked) return;
    setRun({ ...run, revealed: [...run.revealed, current.id] });
  }

  function next() {
    if (!run || !checked) return;
    if (run.index === run.questionIds.length - 1) setRun({ ...run, finished: true });
    else setRun({ ...run, index: run.index + 1 });
  }

  function showHint() {
    if (!run || !current || run.hintShown.includes(current.id)) return;
    setRun({ ...run, hintShown: [...run.hintShown, current.id] });
  }

  if (!run) {
    return <main className="engine-page practice-page populism-page">
      <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>POPULISM QUIZ · {c.language}</span><div className="engine-header-actions"><LanguageSelector/><Link href="/learn#populism">{c.learnFirst}</Link></div></header>
      <section className="engine-shell populism-start">
        <p className="engine-kicker">{c.free}</p>
        <h1>{c.title}</h1>
        <p className="practice-lede">{c.lede}</p>
        <div className="populism-principle"><strong>{c.principleTitle}</strong><p>{c.principle}</p></div>
        <div className="populism-angle-list" aria-label={c.coverage}>
          {POPULISM_QUIZ_ANGLES.map((angle) => <span key={angle}>{angleLabels[angle]}</span>)}
        </div>
        <button className="engine-primary-link populism-start-button" type="button" onClick={start}>{c.start}</button>
        <p className="populism-candidate-note">{c.candidate}</p>
      </section>
    </main>;
  }

  const answeredQuestions = run.revealed.map((id) => questions.get(id)).filter((question): question is PopulismQuizQuestion => Boolean(question));
  const correct = answeredQuestions.filter((question) => run.answers[question.id] === question.answerId).length;

  if (run.finished) {
    const angleScores = POPULISM_QUIZ_ANGLES.map((angle) => {
      const angleQuestions = answeredQuestions.filter((question) => question.angle === angle);
      return { angle, score: angleQuestions.filter((question) => run.answers[question.id] === question.answerId).length };
    });
    const resultTitle = correct >= 10 ? c.strong : correct >= 7 ? c.developing : c.foundations;
    return <main className="engine-page practice-page populism-page">
      <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>{c.resultHeader}</span><div className="engine-header-actions"><LanguageSelector/><Link href="/learn#populism">{c.reviewTerm}</Link></div></header>
      <section className="engine-shell literacy-shell">
        <article className="engine-card literacy-result-card populism-result-card">
          <p className="engine-kicker">{resultTitle.toUpperCase()}</p>
          <h1>{correct} / {POPULISM_QUIZ_SIZE}</h1>
          <p className="result-lede">{c.resultLede}</p>
          <div className="populism-score-grid">
            {angleScores.map(({ angle, score }) => <div key={angle}><span>{angleLabels[angle]}</span><strong>{score}/2</strong></div>)}
          </div>
          <div className="engine-result-actions">
            <button className="engine-primary-link" type="button" onClick={start}>{c.retry}</button>
            <Link className="engine-primary-link secondary" href="/learn#populism">{c.review}</Link>
          </div>
        </article>
      </section>
    </main>;
  }

  if (!current) return null;
  const hintShown = run.hintShown.includes(current.id);
  const correctLabel = current.options.find((option) => option.id === current.answerId)?.label;
  return <main className="engine-page practice-page populism-page">
    <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>{c.quizHeader}</span><div className="engine-header-actions"><LanguageSelector/><Link href="/learn#populism">{c.learnTerm}</Link></div></header>
    <section className="engine-shell literacy-shell">
      <div className="engine-progress-row">
        <span>{c.correctSoFar(correct)}</span>
        <div className="engine-progress" aria-label={`${run.index + 1} of ${run.questionIds.length}`}><span style={{ width: `${((run.index + 1) / run.questionIds.length) * 100}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={() => setRun(null)}>{c.exit}</button>
      </div>
      <article className="engine-card literacy-card">
        <div className="populism-question-meta"><p className="engine-kicker">{c.question(run.index + 1, run.questionIds.length)}</p><span>{angleLabels[current.angle]}</span></div>
        <h1 className="literacy-prompt">{current.prompt}</h1>
        {!checked && <div className="populism-hint"><button type="button" onClick={showHint} aria-expanded={hintShown}>{hintShown ? c.hint : c.clue}</button>{hintShown && <p>{current.hint}</p>}</div>}
        <div className="deep-options literacy-options">
          {orderedOptions(current, run.seed).map((option) => <button type="button" disabled={checked} className={selectedId === option.id ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{option.label}</button>)}
        </div>
        {checked && selectedOption && <div className="literacy-feedback" aria-live="polite">
          <p className="engine-kicker">{selectedId === current.answerId ? c.correct : c.notQuite}</p>
          <p>{selectedOption.feedback}</p>
          {selectedId !== current.answerId && <p><strong>{c.best}</strong> {correctLabel}</p>}
          <p>{current.explanation}</p>
        </div>}
      </article>
      <div className="engine-nav literacy-nav"><span>{run.index + 1} / {run.questionIds.length}</span>{checked ? <button type="button" onClick={next}>{run.index === run.questionIds.length - 1 ? c.see : c.next}</button> : <button type="button" onClick={check} disabled={!selectedId}>{c.check}</button>}</div>
    </section>
  </main>;
}
