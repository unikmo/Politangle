'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PrismaticTriangle from '../../components/PrismaticTriangle';
import { trianglePoint, type QuickResult } from '../../lib/scoring';

const dimensionOrder = ['economy', 'society', 'power', 'world'] as const;

export default function ResultsClient() {
  const [result, setResult] = useState<QuickResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('politangle.quick.result');
    if (stored) setResult(JSON.parse(stored));
  }, []);

  if (!result) {
    return (
      <section className="empty-result-card">
        <p className="eyebrow">NO RESULT YET</p>
        <h1>Take Politangle Quick first.</h1>
        <p>Your result is calculated locally and stored only for the current browser session in this staging build.</p>
        <Link className="button button-dark" href="/quiz">Start the 26 statements</Link>
      </section>
    );
  }

  const point = trianglePoint(result);

  return (
    <div className="results-layout">
      <section className="results-intro">
        <p className="eyebrow">YOUR POLITICAL ANGLE</p>
        <h1>A multidimensional result — not a party label.</h1>
        <p>Your answers are shown independently across four dimensions. A mixed result is expected: people can combine views that political labels often bundle together.</p>
      </section>

      <section className="results-card">
        <div className="results-prism-column">
          <PrismaticTriangle point={point} />
          <p>The triangle is Politangle’s brand map. Your actual assessment remains the four independent dimensions shown beside it.</p>
        </div>
        <div className="results-meters-column">
          {dimensionOrder.map((dimension) => {
            const item = result.scores[dimension];
            return (
              <div className="result-dimension" key={dimension}>
                <div className="result-dimension-head">
                  <strong>{item.name}</strong>
                  <span>{item.label}</span>
                </div>
                <div className="result-poles"><span>{item.negative}</span><span>{item.positive}</span></div>
                <div className={`result-track ${dimension}`}><span style={{ left: `${item.score}%` }} /></div>
                <div className="result-score">{item.score} / 100</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="results-next">
        <div>
          <p className="eyebrow">GO FURTHER</p>
          <h2>Your beliefs are only half the picture.</h2>
          <p>Deep adds classification and understanding questions so Politangle can distinguish what you believe from how well you recognize political traditions, tensions and misconceptions.</p>
        </div>
        <div className="results-next-actions">
          <Link className="button button-dark" href="/deep">Preview Politangle Deep</Link>
          <Link className="text-link" href="/quiz">Retake Quick</Link>
        </div>
      </section>

      <p className="validation-note">Validation build: these scores are exploratory and are not yet a psychometrically validated political diagnostic.</p>
    </div>
  );
}
