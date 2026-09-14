'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  POPULISM_ANGLE_LABELS,
  POPULISM_QUIZ_ANGLES,
  POPULISM_QUIZ_SIZE,
  type PopulismQuizQuestion,
  selectPopulismQuiz,
} from '../../lib/populism-quiz';

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
  const [run, setRun] = useState<Run | null>(null);
  const questions = useMemo(() => new Map(selectPopulismQuiz(run?.seed ?? 0).map((question) => [question.id, question])), [run?.seed]);
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
      <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>POPULISM QUIZ · ENGLISH</span><Link href="/learn#populism">Learn first</Link></header>
      <section className="engine-shell populism-start">
        <p className="engine-kicker">FREE · 12 QUESTIONS · ABOUT 5 MINUTES</p>
        <h1>Can you recognize populism?</h1>
        <p className="practice-lede">Spot the framing, the democratic warning signs and the false positives. This tests political literacy—it does not label your beliefs or discredit people for criticizing power.</p>
        <div className="populism-principle"><strong>Criticism is not automatically populism.</strong><p>Wealthy donors can influence policy. Companies and individuals can avoid tax. Institutions can fail or become captured. Populism concerns the additional claim that one authentic people faces a uniformly corrupt enemy, often with only one movement presented as legitimate.</p></div>
        <div className="populism-angle-list" aria-label="Quiz coverage">
          {POPULISM_QUIZ_ANGLES.map((angle) => <span key={angle}>{POPULISM_ANGLE_LABELS[angle]}</span>)}
        </div>
        <button className="engine-primary-link populism-start-button" type="button" onClick={start}>Start the quiz →</button>
        <p className="populism-candidate-note">Candidate learning content. Free, private on this device and not part of certification yet.</p>
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
    const resultTitle = correct >= 10 ? 'Strong recognition' : correct >= 7 ? 'Developing recognition' : 'Build the foundations';
    return <main className="engine-page practice-page populism-page">
      <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>POPULISM QUIZ · RESULT</span><Link href="/learn#populism">Review the term</Link></header>
      <section className="engine-shell literacy-shell">
        <article className="engine-card literacy-result-card populism-result-card">
          <p className="engine-kicker">{resultTitle.toUpperCase()}</p>
          <h1>{correct} / {POPULISM_QUIZ_SIZE}</h1>
          <p className="result-lede">This is a learning result, not a judgment about your political beliefs.</p>
          <div className="populism-score-grid">
            {angleScores.map(({ angle, score }) => <div key={angle}><span>{POPULISM_ANGLE_LABELS[angle]}</span><strong>{score}/2</strong></div>)}
          </div>
          <div className="engine-result-actions">
            <button className="engine-primary-link" type="button" onClick={start}>Try a different set</button>
            <Link className="engine-primary-link secondary" href="/learn#populism">Review populism</Link>
          </div>
        </article>
      </section>
    </main>;
  }

  if (!current) return null;
  const hintShown = run.hintShown.includes(current.id);
  const correctLabel = current.options.find((option) => option.id === current.answerId)?.label;
  return <main className="engine-page practice-page populism-page">
    <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>POPULISM QUIZ · ENGLISH</span><Link href="/learn#populism">Learn the term</Link></header>
    <section className="engine-shell literacy-shell">
      <div className="engine-progress-row">
        <span>{correct} correct so far</span>
        <div className="engine-progress" aria-label={`${run.index + 1} of ${run.questionIds.length}`}><span style={{ width: `${((run.index + 1) / run.questionIds.length) * 100}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={() => setRun(null)}>Exit quiz</button>
      </div>
      <article className="engine-card literacy-card">
        <div className="populism-question-meta"><p className="engine-kicker">QUESTION {run.index + 1} OF {run.questionIds.length}</p><span>{POPULISM_ANGLE_LABELS[current.angle]}</span></div>
        <h1 className="literacy-prompt">{current.prompt}</h1>
        {!checked && <div className="populism-hint"><button type="button" onClick={showHint} aria-expanded={hintShown}>{hintShown ? 'Hint' : 'Need a clue?'}</button>{hintShown && <p>{current.hint}</p>}</div>}
        <div className="deep-options literacy-options">
          {orderedOptions(current, run.seed).map((option) => <button type="button" disabled={checked} className={selectedId === option.id ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{option.label}</button>)}
        </div>
        {checked && selectedOption && <div className="literacy-feedback" aria-live="polite">
          <p className="engine-kicker">{selectedId === current.answerId ? 'CORRECT' : 'NOT QUITE'}</p>
          <p>{selectedOption.feedback}</p>
          {selectedId !== current.answerId && <p><strong>Best answer:</strong> {correctLabel}</p>}
          <p>{current.explanation}</p>
        </div>}
      </article>
      <div className="engine-nav literacy-nav"><span>{run.index + 1} / {run.questionIds.length}</span>{checked ? <button type="button" onClick={next}>{run.index === run.questionIds.length - 1 ? 'See result' : 'Next question'}</button> : <button type="button" onClick={check} disabled={!selectedId}>Check answer</button>}</div>
    </section>
  </main>;
}
