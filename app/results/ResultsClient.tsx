'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { assessFamiliesV2Canonical, calculatePolygonV2Canonical } from '../../lib/belief-v2-engine';
import { beliefV2StageProgress, lockedBeliefStatementsV3, parseBeliefV2Session, type BeliefV2Session } from '../../lib/belief-v2-session';
import { collapseStatementAnswers } from '../../lib/belief-statements';
import { useLocale } from '../LocaleProvider';

const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';

function directionLabel(score: number | null, low: string, high: string) {
  if (score === null) return 'Not enough information';
  if (score <= 24) return `Strongly toward ${low.toLowerCase()}`;
  if (score <= 39) return `Leans toward ${low.toLowerCase()}`;
  if (score <= 60) return 'Mixed / balanced';
  if (score <= 74) return `Leans toward ${high.toLowerCase()}`;
  return `Strongly toward ${high.toLowerCase()}`;
}

function familyBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 75) return 'Strong match';
  if (score >= 60) return 'Broad match';
  if (score >= 40) return 'Mixed / overlapping';
  if (score >= 25) return 'Limited match';
  return 'Strong tension';
}

export default function ResultsClient() {
  const { locale } = useLocale();
  const t = (en: string, de: string) => locale === 'de' ? de : en;
  const [session, setSession] = useState<BeliefV2Session | null | undefined>(undefined);

  useEffect(() => {
    setSession(parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY)));
  }, []);

  const result = useMemo(() => {
    if (!session || !beliefV2StageProgress(session, 'quick').complete) return null;
    const canonicalAnswers = collapseStatementAnswers(session.answers, lockedBeliefStatementsV3);
    return {
      polygon: calculatePolygonV2Canonical(canonicalAnswers),
      families: assessFamiliesV2Canonical(canonicalAnswers),
    };
  }, [session]);

  if (session === undefined) return <section className="engine-card"><p>{t('Loading result…', 'Ergebnis wird geladen…')}</p></section>;

  if (!session || !result) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">{t('No complete Quick result','Kein vollständiges Quick-Ergebnis')}</p>
          <h1>{t('Take Politangle Quick first.','Starten Sie zuerst Politangle Quick.')}</h1>
          <p>{t('Quick contains one clear question for each of 26 constructs. Full adds balancing statements for greater depth.','Quick enthält eine klare Frage für jedes von 26 Konstrukten. Full ergänzt Gegenfragen für mehr Tiefe.')}</p>
          <Link className="engine-primary-link" href="/quiz">{t('Start Quick','Quick starten')}</Link>
        </article>
      </section>
    );
  }

  return (
    <section className="engine-shell">
      <article className="engine-card">
        <p className="engine-kicker">{t('Your Political Shape · Quick','Ihre politische Form · Quick')}</p>
        <h1>{t('Eight political axes — not one box.','Acht politische Achsen – keine Schublade.')}</h1>
        <p className="engine-help">{t('These positions use 26 independently answered Quick questions. A middle value means mixed or balanced answers, not “no politics”. Full adds 58 balancing and additional statements.','Diese Positionen basieren auf 26 unabhängig beantworteten Quick-Fragen. Ein mittlerer Wert bedeutet gemischte oder ausgewogene Antworten. Full ergänzt 58 Gegen- und Zusatzfragen.')}</p>

        <div className="engine-results">
          {result.polygon.map((axis) => (
            <section className="engine-dimension" key={axis.id}>
              <div className="engine-dimension-head"><strong>{axis.name}</strong><span>{directionLabel(axis.score, axis.low, axis.high)}</span></div>
              <div className="engine-poles"><span>{axis.low}</span><span>{axis.high}</span></div>
              <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
              <div className="engine-dimension-meta"><span>{axis.score === null ? 'No score' : `${axis.score} / 100 position`}</span><span>{axis.coverage}% model coverage</span></div>
            </section>
          ))}
        </div>
      </article>

      <article className="engine-card" style={{ marginTop: 18 }}>
        <p className="engine-kicker">Broad family compatibility</p>
        <h2>Several families can fit you at the same time.</h2>
        <p className="engine-help">These scores are compatibility indices, not probabilities and not identity assignments. Only constructs that are evidence-relevant to a family affect that family; for example, support for universal public services does not automatically count against Conservatism.</p>
        <div className="engine-table-wrap">
          <table className="engine-table">
            <thead><tr><th>Family</th><th>Quick match</th><th>THINK</th><th>FEEL</th><th>ACT</th><th>Coverage</th></tr></thead>
            <tbody>
              {result.families.map((family) => (
                <tr key={family.id}>
                  <td><strong>{family.name}</strong></td>
                  <td>{family.overall === null ? '—' : `${family.overall} · ${familyBand(family.overall)}`}</td>
                  <td>{family.think ?? '—'}</td>
                  <td>{family.feel ?? '—'}</td>
                  <td>{family.act ?? 'Deep'}</td>
                  <td>{family.coverage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="engine-help">Quick contains all 14 THINK items and 12 of the 14 FEEL items. ACT is intentionally not inferred from THINK or FEEL; all 14 ACT items are in Deep.</p>
      </article>

      <div className="engine-result-actions">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="engine-primary-link" href="/deep">{t('Continue to Full: 58 more','Weiter zu Full: 58 weitere')}</Link>
          <Link className="engine-primary-link" href="/quiz">{t('Review Quick','Quick prüfen')}</Link>
        </div>
        <span>{t('BELIEVE model: 26 Quick + 58 Full follow-up = 84 statements.','BELIEVE-Modell: 26 Quick + 58 Full-Zusatzfragen = 84 Aussagen.')}</span>
      </div>

      <p className="engine-disclaimer">Content-validation engine. The family relevance matrix is evidence-informed but still requires respondent calibration, reliability testing and cross-national validation. Scores describe compatibility with measured characteristics; they do not assign a political identity.</p>
    </section>
  );
}
