'use client';

import { useMemo, useState } from 'react';
import { deepLiteracyQuestions } from '../../../../lib/deep-bank';
import { calculateDeepLiteracyResult } from '../../../../lib/deep-engine';

export default function PrivateLiteracyClient() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [finished, setFinished] = useState(false);
  const question = deepLiteracyQuestions[index];
  const selected = question ? answers[question.id] ?? [] : [];
  const result = useMemo(() => finished ? calculateDeepLiteracyResult(deepLiteracyQuestions, answers) : null, [finished, answers]);

  function choose(id: string) {
    if (!question) return;
    const existing = answers[question.id] ?? [];
    const next = question.multiSelect
      ? existing.includes(id) ? existing.filter((value) => value !== id) : [...existing, id]
      : [id];
    if (!next.length) return;
    setAnswers((current) => ({ ...current, [question.id]: next }));
  }

  if (finished && result) {
    return <section className="engine-shell school-shell"><article className="engine-card"><p className="engine-kicker">Your private literacy result</p><h1>{result.overall.percent}%</h1><div className="deep-literacy-line"><span>CLASSIFY</span><strong>{result.sections.classify.percent}%</strong></div><div className="deep-literacy-line"><span>UNDERSTAND</span><strong>{result.sections.understand.percent}%</strong></div><p className="engine-help">This result stays in this browser view. It is not submitted to a classroom or teacher.</p><button className="engine-primary-link" type="button" onClick={() => { setAnswers({}); setIndex(0); setFinished(false); }}>Try again</button></article></section>;
  }

  return <section className="engine-shell school-shell"><article className="engine-card"><p className="engine-kicker">Private political literacy · {index + 1} of {deepLiteracyQuestions.length}</p><h1>{question.prompt}</h1><p className="engine-help">Choose the best answer. No individual score is sent to a teacher.</p><div className="deep-options">{question.options.map((option) => <button key={option.id} type="button" className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} onClick={() => choose(option.id)}>{option.label}</button>)}</div><div className="engine-nav"><button type="button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>Previous</button><span>{Object.keys(answers).length}/{deepLiteracyQuestions.length} answered</span>{index === deepLiteracyQuestions.length - 1 ? <button type="button" disabled={Object.keys(answers).length !== deepLiteracyQuestions.length} onClick={() => setFinished(true)}>See my result</button> : <button type="button" disabled={!selected.length} onClick={() => setIndex((value) => value + 1)}>Next</button>}</div></article></section>;
}
