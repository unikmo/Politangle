'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { assessFamiliesV2Canonical, assessResponseConsistencyV2, calculatePolygonV2Canonical } from '../../lib/belief-v2-engine';
import { beliefV2StageProgress, lockedBeliefStatementsV3, parseBeliefV2Session, type BeliefV2Session } from '../../lib/belief-v2-session';
import { collapseStatementAnswers } from '../../lib/belief-statements';
import { describePolitangleHome, familyMeaningText } from '../../lib/politangle-home';
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

function coherenceBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 80) return 'Highly coherent';
  if (score >= 65) return 'Mostly coherent';
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
  const size = 500;
  const center = size / 2;
  const radius = 162;
  const labelRadius = 214;
  const known = axes.map((axis) => axis.score ?? 50);
  const point = (index: number, value: number, r = radius) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
    const scaled = r * (value / 100);
    return [center + Math.cos(angle) * scaled, center + Math.sin(angle) * scaled] as const;
  };
  const polygon = known.map((value, index) => point(index, value)).map(([x, y]) => `${x},${y}`).join(' ');
  const rings = [25, 50, 75, 100].map((level) => axes.map((_, index) => point(index, level)).map(([x, y]) => `${x},${y}`).join(' '));

  return (
    <div className="shape-wrap compact-shape">
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
              <text className="shape-label" x={lx} y={ly} textAnchor={lx < center - 12 ? 'end' : lx > center + 12 ? 'start' : 'middle'} dominantBaseline="middle">
                <tspan x={lx} dy="-0.25em">{axis.name}</tspan>
                <tspan className="shape-axis-score" x={lx} dy="1.35em">{axis.score ?? '—'}</tspan>
              </text>
            </g>
          );
        })}
        <polygon className="shape-area" points={polygon} />
        {known.map((value, index) => {
          const [x, y] = point(index, value);
          return <circle key={axes[index].id} className="shape-dot" cx={x} cy={y} r="5" />;
        })}
      </svg>
      <p className="shape-scale-note">The map uses the actual 0–100 score on every spoke. Political-family matches are calculated separately, so your strongest family does not force any one axis to be your most extreme.</p>
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
      coherence: assessResponseConsistencyV2(canonicalAnswers),
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

  const home = describePolitangleHome(result.families, result.polygon, false);
  const people = home.primary ? referencePeople(home.primary.id) : [];
  const divergences = result.thinkPolygon.map((axis, index) => {
    const think = axis.score;
    const act = result.actPolygon[index]?.score ?? null;
    return { ...axis, think, act, gap: think === null || act === null ? 0 : Math.abs(think - act) };
  }).filter((axis) => axis.think !== null && axis.act !== null).sort((a, b) => b.gap - a.gap);
  const largestGap = divergences[0];
  const topFamilies = [home.primary, home.secondary, home.tertiary].filter((family): family is NonNullable<typeof family> => Boolean(family && family.overall !== null));

  const copyShape = async () => {
    const axisText = result.polygon.map((axis) => `${axis.name} ${axis.score ?? '—'}`).join(' · ');
    const text = `My Politangle: ${home.headline} ${axisText}`;
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="engine-shell result-shell">
      <article className="engine-card politangle-home-card">
        <p className="engine-kicker">{t('Your Politangle · Quick','Ihr Politangle · Quick')}</p>
        <h1>{home.headline}</h1>
        <p className="result-lede">{home.summary}</p>

        <div className="politangle-family-story" aria-label="Closest political traditions">
          {topFamilies.map((family, index) => (
            <p key={family.id}>
              <strong>{index === 0 ? 'Main home' : index === 1 ? 'Significant leaning' : 'Additional influence'} · {family.name} · {family.overall}/100</strong>
              <span>{familyMeaningText(family.id)}.</span>
            </p>
          ))}
        </div>

        {people.length > 0 && home.primary && (
          <p className="home-reference"><strong>Historical reference points for {home.primary.name}:</strong> {people.join(' · ')}. They illustrate the tradition, not your exact personal profile.</p>
        )}

        <PoliticalShape axes={result.polygon} />
        <div className="result-action-row compact-actions">
          <button className="engine-primary-link" type="button" onClick={copyShape}>{copied ? 'Copied' : 'Copy my Politangle'}</button>
          <span>Your eight-axis map is the visual Politangle. The family reading explains which political traditions most closely resemble that wider pattern.</span>
        </div>
      </article>

      <article className="engine-card result-story-card compact-result-card" style={{ marginTop: 18 }}>
        <p className="engine-kicker">Why this is your result</p>
        <h2>The three positions that shape your profile most.</h2>
        <div className="result-insight-grid">
          {home.strongestAxes.map((axis) => (
            <section key={axis.id} className="result-insight">
              <strong>{axis.name}</strong>
              <span>{axis.score} / 100</span>
              <p>{axisSentence(axis.score, axis.low, axis.high)}</p>
            </section>
          ))}
        </div>

        <div className="consistency-quick">
          <div><strong>{result.coherence.score ?? '—'}<small>/100</small></strong><span>{coherenceBand(result.coherence.score)}</span></div>
          <p><b>Response coherence.</b> This checks whether your answers to related THINK and ACT questions point in similar directions. It does not judge whether your politics are correct, informed or strongly held.</p>
        </div>

        {largestGap && largestGap.gap >= 20 && (
          <div className="result-tension">
            <strong>Your largest principle-to-choice shift is on {largestGap.name}.</strong>
            <p>Your principle position is {largestGap.think}, while your practical-choice position is {largestGap.act}. That {largestGap.gap}-point difference suggests that concrete trade-offs change how you answer on this topic.</p>
          </div>
        )}
      </article>

      <details className="engine-card result-details-card" style={{ marginTop: 18 }}>
        <summary>See all eight political axes</summary>
        <div className="engine-results compact-axis-results">
          {result.polygon.map((axis) => (
            <section className="engine-dimension" key={axis.id}>
              <div className="engine-dimension-head"><strong>{axis.name}</strong><span>{directionLabel(axis.score, axis.low, axis.high)}</span></div>
              <div className="engine-poles"><span>{axis.low}</span><span>{axis.high}</span></div>
              <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
            </section>
          ))}
        </div>
      </details>

      <div className="engine-result-actions">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="engine-primary-link" href="/deep">{t('Continue to Full: 16 more','Weiter zu Full: 16 weitere')}</Link>
          <Link className="engine-primary-link" href="/quiz">{t('Review Quick','Quick prüfen')}</Link>
        </div>
        <span>{t('Full adds 16 questions and then gives you the completed Politangle.','Full ergänzt 16 Fragen und zeigt dann direkt Ihr vollständiges Politangle.')}</span>
      </div>
    </section>
  );
}
