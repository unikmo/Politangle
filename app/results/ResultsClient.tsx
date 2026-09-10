'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { assessFamiliesV2Canonical, assessResponseConsistencyV2, calculatePolygonV2Canonical } from '../../lib/belief-v2-engine';
import { beliefV2StageProgress, lockedBeliefStatementsV3, parseBeliefV2Session, type BeliefV2Session } from '../../lib/belief-v2-session';
import { collapseStatementAnswers } from '../../lib/belief-statements';
import { useLocale } from '../LocaleProvider';
import { translate } from '../translations';

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

function consistencyBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 80) return 'Highly consistent';
  if (score >= 65) return 'Mostly consistent';
  if (score >= 45) return 'Context-sensitive';
  return 'Strongly mixed';
}

function axisSentence(score: number | null, low: string, high: string) {
  if (score === null) return 'This part of your shape needs more answers.';
  if (score <= 24) return `${low} is one of the clearest features of your answers.`;
  if (score <= 39) return `You lean toward ${low.toLowerCase()}, but not absolutely.`;
  if (score <= 60) return `You balance ${low.toLowerCase()} with ${high.toLowerCase()}.`;
  if (score <= 74) return `You lean toward ${high.toLowerCase()}, but not absolutely.`;
  return `${high} is one of the clearest features of your answers.`;
}

function referencePeople(familyId: string) {
  const groups: Record<string, readonly string[]> = {
    'social-democracy': ['Willy Brandt', 'Olof Palme', 'Clement Attlee'],
    liberalism: ['John Stuart Mill', 'John Rawls', 'Václav Havel'],
    'green-politics': ['Petra Kelly', 'Wangari Maathai', 'Gro Harlem Brundtland'],
    socialism: ['Aneurin Bevan', 'Salvador Allende', 'Michael Manley'],
    conservatism: ['Edmund Burke', 'Konrad Adenauer', 'Charles de Gaulle'],
  };
  return groups[familyId] ?? [];
}

function PoliticalShape({ axes }: { axes: ReturnType<typeof calculatePolygonV2Canonical> }) {
  const size = 520;
  const center = size / 2;
  const radius = 170;
  const labelRadius = 222;
  const known = axes.map((axis) => axis.score ?? 50);
  const point = (index: number, value: number, r = radius) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
    const scaled = r * (0.22 + 0.78 * (value / 100));
    return [center + Math.cos(angle) * scaled, center + Math.sin(angle) * scaled] as const;
  };
  const polygon = known.map((value, index) => point(index, value)).map(([x, y]) => `${x},${y}`).join(' ');
  const rings = [25, 50, 75, 100].map((level) => axes.map((_, index) => point(index, level)).map(([x, y]) => `${x},${y}`).join(' '));

  return (
    <div className="shape-wrap">
      <svg className="political-shape" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Your eight-axis political shape">
        {rings.map((ring, index) => <polygon key={index} className="shape-ring" points={ring} />)}
        {axes.map((axis, index) => {
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
          const [x, y] = point(index, 100);
          const lx = center + Math.cos(angle) * labelRadius;
          const ly = center + Math.sin(angle) * labelRadius;
          return (
            <g key={axis.id}>
              <line className="shape-spoke" x1={center} y1={center} x2={x} y2={y} />
              <text className="shape-label" x={lx} y={ly} textAnchor={lx < center - 12 ? 'end' : lx > center + 12 ? 'start' : 'middle'} dominantBaseline="middle">{axis.name}</text>
            </g>
          );
        })}
        <polygon className="shape-area" points={polygon} />
        {known.map((value, index) => {
          const [x, y] = point(index, value);
          return <circle key={axes[index].id} className="shape-dot" cx={x} cy={y} r="5" />;
        })}
      </svg>
      <p className="shape-caption">Each spoke is one political axis. The inner end represents the first pole shown below; the outer end represents the second. The middle ring is the balanced area.</p>
    </div>
  );
}

export default function ResultsClient() {
  const { locale } = useLocale();
  const t = (en: string, de: string) => translate(locale, en, de);
  const [session, setSession] = useState<BeliefV2Session | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSession(parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY)));
  }, []);

  const result = useMemo(() => {
    if (!session || !beliefV2StageProgress(session, 'quick').complete) return null;
    const canonicalAnswers = collapseStatementAnswers(session.answers, lockedBeliefStatementsV3);
    return {
      polygon: calculatePolygonV2Canonical(canonicalAnswers),
      thinkPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'think'),
      actPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'act'),
      families: assessFamiliesV2Canonical(canonicalAnswers),
      consistency: assessResponseConsistencyV2(canonicalAnswers),
    };
  }, [session]);

  if (session === undefined) return <section className="engine-card"><p>{t('Loading result…', 'Ergebnis wird geladen…')}</p></section>;

  if (!session || !result) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">{t('No complete Quick result','Kein vollständiges Quick-Ergebnis')}</p>
          <h1>{t('Take Politangle Quick first.','Starten Sie zuerst Politangle Quick.')}</h1>
          <p>{t('Quick uses 26 questions to build your first political shape.','Quick verwendet 26 Fragen für Ihre erste politische Form.')}</p>
          <Link className="engine-primary-link" href="/quiz">{t('Start Quick','Quick starten')}</Link>
        </article>
      </section>
    );
  }

  const rankedAxes = [...result.polygon].filter((axis) => axis.score !== null).sort((a, b) => Math.abs((b.score ?? 50) - 50) - Math.abs((a.score ?? 50) - 50));
  const strongest = rankedAxes.slice(0, 3);
  const topFamily = result.families.find((family) => family.overall !== null) ?? result.families[0];
  const people = topFamily ? referencePeople(topFamily.id) : [];
  const divergences = result.thinkPolygon.map((axis, index) => {
    const think = axis.score;
    const act = result.actPolygon[index]?.score ?? null;
    return { ...axis, think, act, gap: think === null || act === null ? 0 : Math.abs(think - act) };
  }).filter((axis) => axis.think !== null && axis.act !== null).sort((a, b) => b.gap - a.gap);
  const largestGap = divergences[0];

  const copyShape = async () => {
    const axisText = result.polygon.map((axis) => `${axis.name} ${axis.score ?? '—'}`).join(' · ');
    const familyText = result.families.slice(0, 3).filter((family) => family.overall !== null).map((family) => `${family.name} ${family.overall}`).join(' · ');
    const text = `My Politangle political shape: ${axisText}. Broad family matches: ${familyText}.`;
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="engine-shell">
      <article className="engine-card result-hero">
        <p className="engine-kicker">{t('Your Political Shape · Quick','Ihre politische Form · Quick')}</p>
        <h1>{t('This is what your politics look like.','So sieht Ihre Politik aus.')}</h1>
        <p className="result-lede">You are not one dot on a left–right line. Your answers form an eight-sided shape. The sharpest corners show where your answers lean most clearly; flatter areas show balance or moderation.</p>
        <PoliticalShape axes={result.polygon} />
        <div className="result-action-row">
          <button className="engine-primary-link" type="button" onClick={copyShape}>{copied ? 'Copied' : 'Copy my shape'}</button>
          <span>Quick is a first reading. Full adds 16 different questions to complete THINK, FEEL and ACT across all topics.</span>
        </div>
      </article>

      <article className="engine-card result-story-card" style={{ marginTop: 18 }}>
        <p className="engine-kicker">What stands out</p>
        <h2>Start with the clearest parts of your shape.</h2>
        <div className="result-insight-grid">
          {strongest.map((axis) => (
            <section key={axis.id} className="result-insight">
              <strong>{axis.name}</strong>
              <span>{axis.score} / 100</span>
              <p>{axisSentence(axis.score, axis.low, axis.high)}</p>
            </section>
          ))}
        </div>

        <div className="consistency-quick">
          <div><strong>{result.consistency.score ?? '—'}<small>/100</small></strong><span>{consistencyBand(result.consistency.score)}</span></div>
          <p><b>Preliminary response consistency.</b> This checks whether your principle and practical-choice answers point in similar directions on comparable topics. It is not a knowledge or conviction score.</p>
        </div>

        {largestGap && largestGap.gap >= 20 ? (
          <div className="result-tension">
            <strong>Your principles and practical choices are not identical.</strong>
            <p>On <b>{largestGap.name}</b>, your principle answer sits at {largestGap.think}, while your practical-choice answer sits at {largestGap.act}. That {largestGap.gap}-point gap is useful: it shows where a concrete trade-off changes your position.</p>
          </div>
        ) : (
          <div className="result-tension">
            <strong>Your principles and practical choices are broadly consistent so far.</strong>
            <p>Quick did not find a large THINK-versus-ACT split on the axes it could compare. Full adds FEEL and the two remaining ACT topics before treating that pattern as complete.</p>
          </div>
        )}
      </article>

      <article className="engine-card" style={{ marginTop: 18 }}>
        <p className="engine-kicker">Political families</p>
        <h2>Your closest traditions, in ordinary language.</h2>
        <p className="engine-help">A family score means your measured answers resemble important parts of that tradition. It does not mean you belong to a party, agree with every policy, or have been assigned an identity. Overlap is normal.</p>
        <div className="family-cards">
          {result.families.slice(0, 3).map((family) => (
            <section className="family-card" key={family.id}>
              <span>{family.overall ?? '—'}</span>
              <div><strong>{family.name}</strong><p>{familyBand(family.overall)} · {family.coverage}% measured</p></div>
            </section>
          ))}
        </div>
        {topFamily && people.length > 0 && (
          <div className="reference-people">
            <strong>Historical reference points</strong>
            <p>{people.join(' · ')}</p>
            <small>These people are examples associated with {topFamily.name.toLowerCase()} traditions, not claims that they had your exact eight-axis profile.</small>
          </div>
        )}
        <details className="engine-details">
          <summary>Show the technical family scores</summary>
          <div className="engine-table-wrap">
            <table className="engine-table">
              <thead><tr><th>Family</th><th>Quick match</th><th>THINK</th><th>FEEL</th><th>ACT</th><th>Coverage</th></tr></thead>
              <tbody>
                {result.families.map((family) => (
                  <tr key={family.id}>
                    <td><strong>{family.name}</strong></td>
                    <td>{family.overall === null ? '—' : `${family.overall} · ${familyBand(family.overall)}`}</td>
                    <td>{family.think ?? '—'}</td>
                    <td>{family.feel ?? 'Full'}</td>
                    <td>{family.act ?? '—'}</td>
                    <td>{family.coverage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </article>

      <article className="engine-card axis-detail-card" style={{ marginTop: 18 }}>
        <p className="engine-kicker">All eight axes</p>
        <h2>See exactly where each edge of the shape comes from.</h2>
        <div className="engine-results">
          {result.polygon.map((axis) => (
            <section className="engine-dimension" key={axis.id}>
              <div className="engine-dimension-head"><strong>{axis.name}</strong><span>{directionLabel(axis.score, axis.low, axis.high)}</span></div>
              <div className="engine-poles"><span>{axis.low}</span><span>{axis.high}</span></div>
              <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
              <div className="engine-dimension-meta"><span>{axis.score === null ? 'No score' : `${axis.score} / 100`}</span><span>{axis.coverage}% measured in Quick</span></div>
            </section>
          ))}
        </div>
      </article>

      <div className="engine-result-actions">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="engine-primary-link" href="/deep">{t('Continue to Full: 16 more','Weiter zu Full: 16 weitere')}</Link>
          <Link className="engine-primary-link" href="/quiz">{t('Review Quick','Quick prüfen')}</Link>
        </div>
        <span>{t('Full adds 16 different questions, then shows the completed result.','Full ergänzt 16 andere Fragen und zeigt danach direkt das vollständige Ergebnis.')}</span>
      </div>

      <p className="engine-disclaimer">Quick is an explanatory first reading, not a diagnosis or party assignment. Full completes the three-angle comparison and response-consistency measure.</p>
    </section>
  );
}
