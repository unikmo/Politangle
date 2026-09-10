'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { deepLiteracyQuestions } from '../lib/deep-bank';
import { calculateDeepLiteracyResult, scoreLiteracyItem, type DeepSection } from '../lib/deep-engine';
import {
  answerLiteracy,
  createLiteracySession,
  literacyOrder,
  literacyPhaseProgress,
  parseLiteracySession,
  revealLiteracyAnswer,
  type LiteracySession,
} from '../lib/literacy-session';
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt } from '../lib/german-literacy';
import { useLocale } from './LocaleProvider';

const LITERACY_SESSION_KEY = 'politangle.literacy.v2.session';

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

function firstUnchecked(session: LiteracySession, section: DeepSection) {
  const order = literacyOrder(session, section);
  const found = order.findIndex((id) => !session.revealed.includes(id));
  return found === -1 ? Math.max(0, order.length - 1) : found;
}

export default function LiteracyQuizClient({ section }: { section: DeepSection }) {
  const { locale } = useLocale();
  const [session, setSession] = useState<LiteracySession | null>(null);
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const restored = parseLiteracySession(sessionStorage.getItem(LITERACY_SESSION_KEY));
    const initial = restored ?? createLiteracySession(newSeed());
    sessionStorage.setItem(LITERACY_SESSION_KEY, JSON.stringify(initial));
    setSession(initial);
    const progress = literacyPhaseProgress(initial, section);
    setShowResult(progress.complete);
    setIndex(firstUnchecked(initial, section));
  }, [section]);

  const current = useMemo(() => {
    if (!session || showResult) return null;
    const id = literacyOrder(session, section)[index];
    return deepLiteracyQuestions.find((question) => question.id === id) ?? null;
  }, [session, section, index, showResult]);

  if (!session) return <section className="engine-shell"><article className="engine-card"><p>Loading…</p></article></section>;

  const progress = literacyPhaseProgress(session, section);
  const selected = current ? session.answers[current.id] ?? [] : [];
  const checked = current ? session.revealed.includes(current.id) : false;
  const itemResult = current && checked ? scoreLiteracyItem(current, selected) : null;
  const sectionResult = calculateDeepLiteracyResult(deepLiteracyQuestions, session.answers).sections[section];
  const title = section === 'classify' ? 'CLASSIFY' : 'UNDERSTAND';
  const description = section === 'classify'
    ? 'Match each description to the political tradition that fits it best.'
    : 'Test whether you can distinguish political concepts and common misconceptions.';

  function save(next: LiteracySession) {
    sessionStorage.setItem(LITERACY_SESSION_KEY, JSON.stringify(next));
    setSession(next);
  }

  function choose(optionId: string) {
    if (!current || checked) return;
    const nextSelection = current.multiSelect
      ? selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId]
      : [optionId];
    if (!nextSelection.length) return;
    save(answerLiteracy(session, current.id, nextSelection));
  }

  function check() {
    if (!current || !selected.length || checked) return;
    save(revealLiteracyAnswer(session, current.id));
  }

  function next() {
    if (!current || !checked) return;
    const order = literacyOrder(session, section);
    if (index < order.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (literacyPhaseProgress(session, section).complete) setShowResult(true);
  }

  function restart() {
    const ids = new Set(literacyOrder(session, section));
    const answers = Object.fromEntries(Object.entries(session.answers).filter(([id]) => !ids.has(id)));
    const revealed = session.revealed.filter((id) => !ids.has(id));
    const next = { ...session, answers, revealed, completedAt: undefined };
    save(next);
    setIndex(0);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">{title} · result</p>
          <h1>{sectionResult.percent}%</h1>
          <p className="result-lede">{sectionResult.correct} of {sectionResult.total} correct. {description}</p>
          <div className="engine-result-actions">
            <button className="engine-primary-link" type="button" onClick={restart}>Retake {title}</button>
            <Link className="engine-primary-link" href="/">Back to Politangle</Link>
          </div>
        </article>
      </section>
    );
  }

  if (!current) return null;
  const correctLabels = current.acceptedAnswerSets[0]
    .map((id) => {
      const option = current.options.find((candidate) => candidate.id === id);
      return option ? (locale === 'de' ? germanLiteracyOption(option.id, option.label) : option.label) : undefined;
    })
    .filter(Boolean)
    .join(', ');
  const prompt = locale === 'de' ? germanLiteracyPrompt(current.id) ?? current.prompt : current.prompt;

  return (
    <section className="engine-shell">
      <div className="engine-progress-row">
        <span>{title} {progress.checked} / {progress.total}</span>
        <div className="engine-progress" aria-label={`${progress.percent}% complete`}><span style={{ width: `${progress.percent}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restart}>Restart</button>
      </div>

      <article className="engine-card">
        <p className="engine-kicker">{title} · {index + 1} of {progress.total}</p>
        <h1>{prompt}</h1>
        <p className="engine-help">{section === 'classify' ? 'Choose the best-fitting political tradition.' : 'Choose the best-supported explanation.'}</p>
        <div className="deep-options">
          {current.options.map((option) => (
            <button type="button" disabled={checked} className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{locale === 'de' ? germanLiteracyOption(option.id, option.label) : option.label}</button>
          ))}
        </div>

        {checked && itemResult && (
          <div className="engine-card" style={{ marginTop: 16 }}>
            <p className="engine-kicker">{itemResult.correct ? 'Correct' : 'Not quite'}</p>
            {!itemResult.correct && <p><strong>Best answer:</strong> {correctLabels}</p>}
            <p>{locale === 'de' ? germanLiteracyExplanation(current.id, current.explanation) : current.explanation}</p>
          </div>
        )}
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{description}</span>
        {checked ? <button type="button" onClick={next}>{index === progress.total - 1 ? `See ${title} result` : 'Next'}</button> : <button type="button" onClick={check} disabled={!selected.length}>Check answer</button>}
      </div>
    </section>
  );
}
