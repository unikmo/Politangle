'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  assessFamiliesV2Canonical,
  assessResponseConsistencyV2,
  assessTendenciesV2,
  calculatePolygonV2Canonical,
} from '../../lib/belief-v2-engine';
import {
  answerBeliefV2,
  beliefV2OverallProgress,
  beliefV2StageProgress,
  completeBeliefV2Session,
  getBeliefV2Item,
  parseBeliefV2Session,
  lockedBeliefStatementsV3,
  type BeliefV2Session,
} from '../../lib/belief-v2-session';
import { collapseStatementAnswers } from '../../lib/belief-statements';
import { assessNuancesV2 } from '../../lib/nuance-model';
import { describePolitangleHome } from '../../lib/politangle-home';
import { agreementAnswerOptions, type AnswerValue } from '../../lib/questions';
import { germanBeliefStatement } from '../../lib/german-believe';
import { romanceBeliefStatement } from '../../lib/romance-believe';
import { useLocale, type Locale } from '../LocaleProvider';
import {
  deepAxis,
  deepAxisSentence,
  deepCoherence,
  deepConstruct,
  deepDirection,
  deepFamily,
  deepGap,
  deepHome,
  deepModeDirection,
  deepNuance,
  deepTendency,
  deepUi,
} from './deep-native';

const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';
const FULL_RESULT_KEY = 'politangle.full.result.v3';

type FullOutput = {
  polygon: ReturnType<typeof calculatePolygonV2Canonical>;
  thinkPolygon: ReturnType<typeof calculatePolygonV2Canonical>;
  feelPolygon: ReturnType<typeof calculatePolygonV2Canonical>;
  actPolygon: ReturnType<typeof calculatePolygonV2Canonical>;
  families: ReturnType<typeof assessFamiliesV2Canonical>;
  tendencies: ReturnType<typeof assessTendenciesV2>;
  nuances: ReturnType<typeof assessNuancesV2>;
  coherence: ReturnType<typeof assessResponseConsistencyV2>;
};

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

function answerAria(locale: Locale, value: AnswerValue) {
  if (value === 'unsure') return locale === 'de' ? 'Unsicher' : locale === 'es' ? 'No estoy seguro' : locale === 'fr' ? 'Je ne sais pas' : 'Not sure';
  const map: Record<Locale, Record<string, string>> = {
    en: { '-2':'Strongly disagree', '-1':'Disagree', '0':'Neither / depends', '1':'Agree', '2':'Strongly agree' },
    de: { '-2':'Stimme gar nicht zu', '-1':'Stimme eher nicht zu', '0':'Teils teils / kommt darauf an', '1':'Stimme eher zu', '2':'Stimme völlig zu' },
    es: { '-2':'Totalmente en desacuerdo', '-1':'Más bien en desacuerdo', '0':'Neutral / depende', '1':'Más bien de acuerdo', '2':'Totalmente de acuerdo' },
    fr: { '-2':'Pas du tout d’accord', '-1':'Plutôt pas d’accord', '0':'Neutre / cela dépend', '1':'Plutôt d’accord', '2':'Tout à fait d’accord' },
  };
  return map[locale][String(value)];
}

function PoliticalShape({ axes, locale }: { axes: ReturnType<typeof calculatePolygonV2Canonical>; locale: Locale }) {
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
  const shapeAria = locale === 'de' ? 'Dein vollständiges politisches Profil mit acht Achsen' : locale === 'es' ? 'Tu perfil político completo de ocho ejes' : locale === 'fr' ? 'Ton profil politique complet à huit axes' : 'Your completed eight-axis political shape';
  const ui = deepUi(locale);

  return (
    <div className="shape-wrap compact-shape">
      <svg className="political-shape" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={shapeAria}>
        {rings.map((ring, index) => <polygon key={index} className="shape-ring" points={ring} />)}
        {axes.map((axis, index) => {
          const display = deepAxis(locale, axis);
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
          const [x, y] = point(index, 100);
          const lx = center + Math.cos(angle) * labelRadius;
          const ly = center + Math.sin(angle) * labelRadius;
          return (
            <g key={axis.id}>
              <line className="shape-spoke" x1={center} y1={center} x2={x} y2={y} />
              <text className="shape-label" x={lx} y={ly} textAnchor={lx < center - 12 ? 'end' : lx > center + 12 ? 'start' : 'middle'} dominantBaseline="middle">
                <tspan x={lx} dy="-0.25em">{display.name}</tspan>
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
      <p className="shape-scale-note">{ui.shapeNote}</p>
    </div>
  );
}

function firstUnansweredFull(session: BeliefV2Session) {
  const found = session.deepOrder.findIndex((id) => session.answers[id] === undefined);
  return found === -1 ? Math.max(0, session.deepOrder.length - 1) : found;
}

function buildOutput(belief: BeliefV2Session): FullOutput {
  const canonicalAnswers = collapseStatementAnswers(belief.answers, lockedBeliefStatementsV3);
  return {
    polygon: calculatePolygonV2Canonical(canonicalAnswers),
    thinkPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'think'),
    feelPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'feel'),
    actPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'act'),
    families: assessFamiliesV2Canonical(canonicalAnswers),
    tendencies: assessTendenciesV2(canonicalAnswers),
    nuances: assessNuancesV2(canonicalAnswers),
    coherence: assessResponseConsistencyV2(canonicalAnswers),
  };
}

export default function DeepClient() {
  const { locale } = useLocale();
  const ui = deepUi(locale);
  const [beliefSession, setBeliefSession] = useState<BeliefV2Session | null | undefined>(undefined);
  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState<FullOutput | null>(null);

  useEffect(() => {
    const belief = parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY));
    setBeliefSession(belief);
    if (!belief || !beliefV2StageProgress(belief, 'quick').complete) return;

    const fullProgress = beliefV2StageProgress(belief, 'deep');
    if (fullProgress.complete) {
      setOutput(buildOutput(belief));
      return;
    }
    setIndex(firstUnansweredFull(belief));
  }, []);

  const currentBelief = useMemo(() => {
    if (!beliefSession || output) return null;
    return getBeliefV2Item(beliefSession.deepOrder[index]);
  }, [beliefSession, output, index]);

  if (beliefSession === undefined) {
    return <section className="engine-shell"><article className="engine-card"><p>{ui.loading}</p></article></section>;
  }

  if (!beliefSession || !beliefV2StageProgress(beliefSession, 'quick').complete) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">{ui.quickFirst}</p>
          <h1>{ui.quickFirstTitle}</h1>
          <Link className="engine-primary-link" href="/quiz">{ui.startQuick}</Link>
        </article>
      </section>
    );
  }

  function saveBelief(next: BeliefV2Session) {
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(next));
    setBeliefSession(next);
  }

  function restartFull() {
    const fullIds = new Set(beliefSession.deepOrder);
    const quickAnswers = Object.fromEntries(Object.entries(beliefSession.answers).filter(([id]) => !fullIds.has(id)));
    const nextBelief: BeliefV2Session = { ...beliefSession, answers: quickAnswers, completedAt: undefined };
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(nextBelief));
    sessionStorage.removeItem(FULL_RESULT_KEY);
    setBeliefSession(nextBelief);
    setIndex(0);
    setOutput(null);
  }

  function finishFull(session: BeliefV2Session) {
    if (!beliefV2OverallProgress(session).complete) return;
    const completed = session.completedAt ? session : completeBeliefV2Session(session);
    const result = buildOutput(completed);
    saveBelief(completed);
    sessionStorage.setItem(FULL_RESULT_KEY, JSON.stringify(result));
    setOutput(result);
  }

  if (output) {
    const home = describePolitangleHome(output.families, output.polygon, true);
    const localizedHome = deepHome(locale, home, true);
    const people = home.primary ? referencePeople(home.primary.id) : [];
    const topFamilies = [home.primary, home.secondary, home.tertiary].filter((family): family is NonNullable<typeof family> => Boolean(family && family.overall !== null));
    const gaps = output.thinkPolygon.map((axis, axisIndex) => {
      const think = axis.score;
      const feel = output.feelPolygon[axisIndex]?.score ?? null;
      const act = output.actPolygon[axisIndex]?.score ?? null;
      const known = [think, feel, act].filter((value): value is number => value !== null);
      return { ...axis, think, feel, act, gap: known.length > 1 ? Math.max(...known) - Math.min(...known) : 0 };
    }).sort((a, b) => b.gap - a.gap);
    const meaningfulGaps = gaps.filter((gap) => gap.gap >= 20).slice(0, 3);

    return (
      <section className="engine-shell result-shell">
        <article className="engine-card politangle-home-card">
          <p className="engine-kicker">{ui.fullLabel}</p>
          <h1>{localizedHome.headline}</h1>
          <p className="result-lede">{localizedHome.summary}</p>

          <div className="politangle-family-story" aria-label={ui.homeAria}>
            {topFamilies.map((family, familyIndex) => {
              const display = deepFamily(locale, family.id, family.name);
              const label = familyIndex === 0 ? ui.mainHome : familyIndex === 1 ? ui.secondary : ui.tertiary;
              return (
                <p key={family.id}>
                  <strong>{label} · {display.name} · {family.overall}/100</strong>
                  <span>{display.meaning}.</span>
                </p>
              );
            })}
          </div>

          {people.length > 0 && home.primary && (() => {
            const display = deepFamily(locale, home.primary.id, home.primary.name);
            return <p className="home-reference"><strong>{ui.historical} · {display.name}:</strong> {people.join(' · ')}. {ui.historicalNote}</p>;
          })()}

          <PoliticalShape axes={output.polygon} locale={locale} />
        </article>

        <article className="engine-card result-story-card compact-result-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">{ui.defines}</p>
          <h2>{ui.strongest}</h2>
          <div className="result-insight-grid">
            {home.strongestAxes.map((axis) => {
              const display = deepAxis(locale, axis);
              return (
                <section key={axis.id} className="result-insight">
                  <strong>{display.name}</strong>
                  <span>{axis.score} / 100</span>
                  <p>{deepAxisSentence(locale, axis.score, display.low, display.high)}</p>
                </section>
              );
            })}
          </div>
        </article>

        <article className="engine-card compact-result-card coherence-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">{ui.coherence}</p>
          <div className="consistency-hero">
            <strong>{output.coherence.score ?? '—'}<small>/100</small></strong>
            <div>
              <h2>{deepCoherence(locale, output.coherence.score)}</h2>
              <p>{ui.coherenceIntro}</p>
            </div>
          </div>
          <p className="engine-help">{ui.coherenceHelp}</p>

          {meaningfulGaps.length > 0 ? (
            <div className="coherence-gap-list">
              {meaningfulGaps.map((gap, gapIndex) => {
                const display = deepAxis(locale, gap);
                return (
                  <section className="coherence-gap-card" key={gap.id}>
                    <div className="coherence-gap-head">
                      <strong>{gapIndex === 0 ? ui.biggestShift : ui.anotherShift} · {display.name}</strong>
                      <span>{gap.gap}-{ui.spread}</span>
                    </div>
                    <div className="coherence-mode-grid">
                      <div><b>THINK</b><strong>{gap.think ?? '—'}</strong><span>{deepModeDirection(locale, gap.think, display.low, display.high)}</span></div>
                      <div><b>FEEL</b><strong>{gap.feel ?? '—'}</strong><span>{deepModeDirection(locale, gap.feel, display.low, display.high)}</span></div>
                      <div><b>ACT</b><strong>{gap.act ?? '—'}</strong><span>{deepModeDirection(locale, gap.act, display.low, display.high)}</span></div>
                    </div>
                    <p><b>{ui.explain}</b> {deepGap(locale, gap.think, gap.feel, gap.act)}</p>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="result-tension coherence-steady">
              <strong>{ui.noLarge}</strong>
              <p>{ui.noLargeText}</p>
            </div>
          )}
        </article>

        <details className="engine-card result-details-card" style={{ marginTop: 18 }}>
          <summary>{ui.allAxes}</summary>
          <div className="engine-results compact-axis-results">
            {output.polygon.map((axis) => {
              const display = deepAxis(locale, axis);
              return (
                <section className="engine-dimension" key={axis.id}>
                  <div className="engine-dimension-head"><strong>{display.name}</strong><span>{deepDirection(locale, axis.score, display.low, display.high)}</span></div>
                  <div className="engine-poles"><span>{display.low}</span><span>{display.high}</span></div>
                  <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
                </section>
              );
            })}
          </div>
        </details>

        {(output.tendencies.length > 0 || output.nuances.length > 0) && (
          <article className="engine-card compact-result-card political-style-card" style={{ marginTop: 18 }}>
            <p className="engine-kicker">{ui.powerStyle}</p>
            <h2>{ui.powerStyleTitle}</h2>
            <p className="result-lede">{ui.powerStyleLead}</p>
            <div className="tendency-grid">
              {output.tendencies.map((item) => {
                const reading = deepTendency(locale, item.id, item.score);
                return (
                  <section className="tendency-card" key={item.id}>
                    <div><strong>{reading.title}</strong><span>{item.score === null ? '—' : `${item.score}/100`}</span></div>
                    <p>{reading.explanation}</p>
                  </section>
                );
              })}
            </div>
            {output.nuances.length > 0 && (
              <div className="nuance-readings">
                <strong>{ui.combinations}</strong>
                {output.nuances.map((nuance) => {
                  const reading = deepNuance(locale, nuance);
                  return <p key={nuance.id}><b>{reading.name}.</b> {reading.explanation}{reading.caution ? ` ${reading.caution}` : ''}</p>;
                })}
              </div>
            )}
          </article>
        )}

        <div className="engine-result-actions">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="engine-primary-link" type="button" onClick={restartFull}>{ui.retake}</button>
            <Link className="engine-primary-link" href="/results">{ui.backQuick}</Link>
          </div>
          <span>{ui.complete}</span>
        </div>
      </section>
    );
  }

  const fullProgress = beliefV2StageProgress(beliefSession, 'deep');
  const selected = currentBelief ? beliefSession.answers[currentBelief.id] : undefined;
  const localizedStatement = currentBelief
    ? locale === 'de'
      ? germanBeliefStatement(currentBelief.sourceItemId, currentBelief.polarity)
      : locale === 'es' || locale === 'fr'
        ? romanceBeliefStatement(locale, currentBelief.sourceItemId, currentBelief.polarity)
        : null
    : null;

  function chooseBelief(value: AnswerValue) {
    if (!currentBelief) return;
    saveBelief(answerBeliefV2(beliefSession, currentBelief.id, value));
  }

  function advanceBelief() {
    if (!currentBelief || beliefSession.answers[currentBelief.id] === undefined) return;
    if (index < beliefSession.deepOrder.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (!fullProgress.complete) return;
    finishFull(beliefSession);
  }

  if (!currentBelief) return null;

  const unsureStatus = fullProgress.unsure ? `${fullProgress.unsure} ${ui.marked}` : ui.noUnsure;
  const progressAria = locale === 'de' ? `${fullProgress.percent}% abgeschlossen` : locale === 'es' ? `${fullProgress.percent}% completado` : locale === 'fr' ? `${fullProgress.percent}% terminé` : `${fullProgress.percent}% complete`;
  const beliefAria = locale === 'de' ? 'Antwort auf die politische Aussage' : locale === 'es' ? 'Respuesta a la afirmación política' : locale === 'fr' ? 'Réponse à l’affirmation politique' : 'Belief response';

  return (
    <section className="engine-shell">
      <div className="engine-progress-row">
        <span>Full {fullProgress.answered} / {fullProgress.total}</span>
        <div className="engine-progress" aria-label={progressAria}><span style={{ width: `${fullProgress.percent}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restartFull}>{ui.restart}</button>
      </div>

      <article className="engine-card">
        <p className="engine-kicker">{currentBelief.mode.toUpperCase()} · {deepConstruct(locale, currentBelief.construct)}</p>
        <div className="engine-statement"><p>{localizedStatement ?? currentBelief.statement}</p></div>
        <p className="engine-help">{ui.noCorrect}</p>
        <div className="quick-scale" role="radiogroup" aria-label={beliefAria}>
          {agreementAnswerOptions.map((option) => (
            <button type="button" role="radio" aria-checked={selected === option.value} aria-label={answerAria(locale, option.value)} className={selected === option.value ? 'quick-scale-answer selected' : 'quick-scale-answer'} key={String(option.value)} onClick={() => chooseBelief(option.value)}>{option.value === 'unsure' ? '?' : option.value > 0 ? `+${option.value}` : String(option.value).replace('-', '−')}</button>
          ))}
        </div>
        <div className="quick-scale-key">
          <span><b>−2</b> {answerAria(locale, -2)}</span>
          <span><b>0</b> {answerAria(locale, 0)}</span>
          <span><b>+2</b> {answerAria(locale, 2)}</span>
          <span><b>?</b> {answerAria(locale, 'unsure')}</span>
        </div>
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{ui.previous}</button>
        <span>{unsureStatus}</span>
        <button type="button" onClick={advanceBelief} disabled={selected === undefined || (index === beliefSession.deepOrder.length - 1 && !fullProgress.complete)}>{index === beliefSession.deepOrder.length - 1 ? ui.result : ui.next}</button>
      </div>
    </section>
  );
}
