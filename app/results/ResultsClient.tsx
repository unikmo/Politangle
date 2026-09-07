'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { parseStoredResult, type QuickResult } from '../../lib/engine';

const RESULT_KEY = 'politangle.quick.result.v2';
const dimensionOrder = ['economy', 'society', 'power', 'world'] as const;

export default function ResultsClient() {
  const [result, setResult] = useState<QuickResult | null | undefined>(undefined);

  useEffect(() => {
    setResult(parseStoredResult(sessionStorage.getItem(RESULT_KEY)));
  }, []);

  if (result === undefined) {
    return <section className="engine-card"><p>Loading result…</p></section>;
  }

  if (!result) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">No current result</p>
          <h1>Take Politangle Quick first.</h1>
          <p>This build calculates and stores your result only in the current browser session.</p>
          <Link className="engine-primary-link" href="/quiz">Start Quick</Link>
        </article>
      </section>
    );
  }

  return (
    <section className="engine-shell">
      <article className="engine-card">
        <p className="engine-kicker">Your Political Angle</p>
        <h1>Four dimensions, scored independently.</h1>
        <p className="engine-help">A score near 50 means your scored choices are genuinely mixed or balanced on that dimension. “Not sure / I do not understand” is excluded from the score and shown through coverage instead.</p>

        <div className="engine-results">
          {dimensionOrder.map((dimension) => {
            const item = result.scores[dimension];
            const position = item.score ?? 50;
            return (
              <section className="engine-dimension" key={dimension}>
                <div className="engine-dimension-head">
                  <strong>{item.name}</strong>
                  <span>{item.label}</span>
                </div>
                <div className="engine-poles"><span>{item.negative}</span><span>{item.positive}</span></div>
                <div className="engine-score-track" aria-label={item.score === null ? 'Insufficient signal' : `Score ${item.score} of 100`}>
                  {item.score !== null && <span style={{ left: `${position}%` }} />}
                </div>
                <div className="engine-dimension-meta">
                  <span>{item.score === null ? 'No score' : `${item.score} / 100`}</span>
                  <span>{item.coverage}% scored coverage · {item.unsure} not sure</span>
                </div>
              </section>
            );
          })}
        </div>
      </article>

      <div className="engine-result-actions">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="engine-primary-link" href="/deep">Continue to Deep</Link>
          <Link className="engine-primary-link" href="/quiz">Retake Quick</Link>
        </div>
        <span>Questionnaire {result.questionnaireVersion} · scoring {result.scoringVersion}</span>
      </div>

      <p className="engine-disclaimer">Content-validation engine only. These results are descriptive outputs from the current question model, not a psychometrically validated diagnosis and not a party or ideology assignment.</p>
    </section>
  );
}
