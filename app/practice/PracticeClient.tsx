'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { scoreLiteracyItem, type DeepSection } from '../../lib/deep-engine';
import { LITERACY_MASTER_BANK_VERSION, type LiteracyQuestionRecord } from '../../lib/literacy-bank-schema';
import { selectPracticeQuestionPlan } from '../../lib/literacy-certified-selector';
import { glossaryEntriesForTags } from '../../lib/literacy-glossary';
import { literacyMasterBankCandidates } from '../../lib/literacy-master-bank';

type PracticeRun = {
  section: DeepSection;
  seed: number;
  questionIds: readonly string[];
  index: number;
  answers: Readonly<Record<string, string>>;
  revealed: readonly string[];
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

function orderedOptions(question: LiteracyQuestionRecord, seed: number) {
  return [...question.options].sort((left, right) => hash(`${seed}:${question.id}:${left.id}`) - hash(`${seed}:${question.id}:${right.id}`));
}

export default function PracticeClient() {
  const [run, setRun] = useState<PracticeRun | null>(null);

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
      <main className="engine-page practice-page">
        <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>PRACTICE · ENGLISH</span><Link href="/learn">Learn the terms</Link></header>
        <section className="engine-shell practice-start">
          <p className="engine-kicker">FREE POLITICAL LITERACY PRACTICE</p>
          <h1>Choose what you want to practise.</h1>
          <p className="practice-lede">Each set draws 25 questions with balanced topic coverage. You see the answer and a short explanation after every question.</p>
          <div className="practice-choice-grid">
            <button type="button" onClick={() => start('classify')}><span>CLASSIFY</span><strong>Which political tradition fits?</strong><small>Recognize political families from short descriptions.</small></button>
            <button type="button" onClick={() => start('understand')}><span>UNDERSTAND</span><strong>What is the important difference?</strong><small>Separate ideas that are often mixed up.</small></button>
          </div>
          <div className="practice-status"><strong>Candidate practice bank</strong><p>These questions are being reviewed. Practice is free and does not issue a certificate.</p></div>
        </section>
      </main>
    );
  }

  if (run.finished) {
    const percent = Math.round((correct / run.questionIds.length) * 100);
    return (
      <main className="engine-page practice-page">
        <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>PRACTICE · {run.section.toUpperCase()}</span><Link href="/learn">Learn the terms</Link></header>
        <section className="engine-shell literacy-shell">
          <article className="engine-card literacy-result-card">
            <p className="engine-kicker">PRACTICE COMPLETE</p>
            <h1>{correct} / {run.questionIds.length}</h1>
            <p className="result-lede">{percent}% correct. Use the explanations to decide what to review, then try a fresh balanced set.</p>
            <div className="engine-result-actions">
              <button className="engine-primary-link" type="button" onClick={() => start(run.section)}>New {run.section.toUpperCase()} set</button>
              <button className="engine-primary-link secondary" type="button" onClick={() => setRun(null)}>Choose another set</button>
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
      <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>PRACTICE · {run.section.toUpperCase()}</span><Link href="/learn">Learn the terms</Link></header>
      <section className="engine-shell literacy-shell">
        <div className="engine-progress-row">
          <span>{correct} correct so far</span>
          <div className="engine-progress" aria-label={`${run.index + 1} of ${run.questionIds.length}`}><span style={{ width: `${((run.index + 1) / run.questionIds.length) * 100}%` }} /></div>
          <button type="button" className="engine-link-button" onClick={() => setRun(null)}>Exit practice</button>
        </div>
        <article className="engine-card literacy-card">
          <p className="engine-kicker">QUESTION {run.index + 1} OF {run.questionIds.length}</p>
          <h1 className="literacy-prompt">{current.prompt}</h1>
          <div className="deep-options literacy-options">
            {orderedOptions(current, run.seed).map((option) => (
              <button type="button" disabled={checked} className={selected === option.id ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{option.label}</button>
            ))}
          </div>
          {checked && result && (
            <div className="literacy-feedback" aria-live="polite">
              <p className="engine-kicker">{result.correct ? 'CORRECT' : 'NOT QUITE'}</p>
              {!result.correct && <p><strong>Best answer:</strong> {correctLabels}</p>}
              <p>{current.explanation}</p>
              {glossary.length > 0 && <p className="practice-glossary"><strong>Review:</strong>{' '}{glossary.map((entry, index) => <span key={entry.slug}><Link href={`/learn#${entry.slug}`}>{entry.term}</Link>{index < glossary.length - 1 ? ', ' : ''}</span>)}</p>}
            </div>
          )}
        </article>
        <div className="engine-nav literacy-nav">
          <span>{run.index + 1} / {run.questionIds.length}</span>
          {checked ? <button type="button" onClick={next}>{run.index === run.questionIds.length - 1 ? 'See result' : 'Next question'}</button> : <button type="button" onClick={check} disabled={!selected}>Check answer</button>}
        </div>
      </section>
    </main>
  );
}
