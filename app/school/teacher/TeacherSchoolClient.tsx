'use client';

import { useEffect, useState } from 'react';
import { classroomActivityOptions, getClassroomQuestion } from '../../../lib/school-classroom';
import { schoolLessons } from '../../../lib/school-lessons';
import { germanBeliefStatement } from '../../../lib/german-believe';
import { romanceBeliefStatement } from '../../../lib/romance-believe';
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt } from '../../../lib/german-literacy';
import { deepAxis, deepConstruct, deepFamily } from '../../deep/deep-native';
import { useLocale, type Locale } from '../../LocaleProvider';
import { teacherUi } from './teacher-native';

type DistributionRow = { id: string; label: string; count: number; percent: number };
type QuestionSummary = {
  id: string;
  kind: 'believe' | 'literacy';
  title: string;
  construct: string | null;
  mode: string | null;
  section: string | null;
  responses: number;
  distribution: DistributionRow[];
  correct: number | null;
  correctPercent: number | null;
};
type TeacherSummary = {
  code: string;
  status: 'active' | 'closed';
  createdAt: string;
  roomLabel: string;
  joinedCount: number;
  activity: { type: string; title: string; questionIds: string[]; pacing: 'teacher' | 'student'; projectorMode: 'live' | 'reveal'; ageBand: 'junior-10-13' | 'youth-14-18'; lessonId?: string };
  currentIndex: number;
  currentQuestionId: string | null;
  questionOpen: boolean;
  revealed: boolean;
  currentQuestion: ReturnType<typeof getClassroomQuestion>;
  currentDistribution: QuestionSummary | null;
  classSummary: {
    joinedCount: number;
    activityTitle: string;
    answeredQuestions: number;
    totalQuestions: number;
    totalResponses: number;
    questions: QuestionSummary[];
    mostDivided: QuestionSummary[];
    mostConsensus: QuestionSummary[];
    polygon: { id: string; name: string; low: string; high: string; score: number | null; coverage: number }[];
    families: { id: string; name: string; overall: number | null; coverage: number }[];
    constructModes: { construct: string; think: number | null; feel: number | null; act: number | null; overall: number | null; tension: number | null }[];
    strongestModeTensions: { construct: string; think: number | null; feel: number | null; act: number | null; tension: number | null }[];
    literacy: { responses: number; correct: number; percent: number | null; weakestQuestions: QuestionSummary[] };
  };
};

const CODE_KEY = 'politangle.school.teacher.code';
const SECRET_KEY = 'politangle.school.teacher.key';
const activityOptions = classroomActivityOptions();

function beliefLabel(locale: Locale, id: string, fallback: string) {
  const labels: Record<Locale, Record<string, string>> = {
    en: { '-2':'Strongly disagree', '-1':'Disagree', '0':'Neither / depends', '1':'Agree', '2':'Strongly agree', unsure:'Not sure' },
    de: { '-2':'Stimme gar nicht zu', '-1':'Stimme eher nicht zu', '0':'Teils teils / kommt darauf an', '1':'Stimme eher zu', '2':'Stimme völlig zu', unsure:'Unsicher' },
    es: { '-2':'Totalmente en desacuerdo', '-1':'Más bien en desacuerdo', '0':'Neutral / depende', '1':'Más bien de acuerdo', '2':'Totalmente de acuerdo', unsure:'No estoy seguro' },
    fr: { '-2':'Pas du tout d’accord', '-1':'Plutôt pas d’accord', '0':'Neutre / cela dépend', '1':'Plutôt d’accord', '2':'Tout à fait d’accord', unsure:'Je ne sais pas' },
  };
  return labels[locale][id] ?? fallback;
}

function BarChart({ rows, locale, kind }: { rows: DistributionRow[]; locale: Locale; kind?: 'believe' | 'literacy' }) {
  return <div className="school-distribution">{rows.map((row) => {
    const label = kind === 'believe'
      ? beliefLabel(locale, row.id, row.label)
      : kind === 'literacy' && locale === 'de'
        ? germanLiteracyOption(row.id, row.label)
        : row.label;
    return <div className="school-bar-row" key={row.id}><div className="school-bar-label"><span>{label}</span><strong>{row.percent}% · {row.count}</strong></div><div className="school-bar-track"><span style={{ width: `${row.percent}%` }} /></div></div>;
  })}</div>;
}

function ScoreBar({ label, value, low, high, na }: { label: string; value: number | null; low?: string; high?: string; na: string }) {
  return <div className="school-score-row"><div className="school-bar-label"><span>{label}{low && high ? <small>{low} ↔ {high}</small> : null}</span><strong>{value === null ? na : value}</strong></div><div className="school-score-track"><span style={{ width: `${value ?? 0}%` }} /></div></div>;
}

export default function TeacherSchoolClient() {
  const { locale } = useLocale();
  const ui = teacherUi(locale);
  const [code, setCode] = useState('');
  const [teacherKey, setTeacherKey] = useState('');
  const [summary, setSummary] = useState<TeacherSummary | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [roomLabel, setRoomLabel] = useState('');
  const [ageBand, setAgeBand] = useState<'junior-10-13' | 'youth-14-18'>('youth-14-18');
  const [activityType, setActivityType] = useState<'junior' | 'quick26' | 'full42' | 'literacy' | 'guided' | 'custom'>('quick26');
  const [lessonId, setLessonId] = useState('room-stand');
  const [pacing, setPacing] = useState<'teacher' | 'student'>('teacher');
  const [projectorMode, setProjectorMode] = useState<'live' | 'reveal'>('reveal');
  const [customIds, setCustomIds] = useState<string[]>(['T01-P']);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
    const storedCode = sessionStorage.getItem(CODE_KEY) ?? '';
    const storedKey = sessionStorage.getItem(SECRET_KEY) ?? '';
    setCode(storedCode); setTeacherKey(storedKey);
    if (storedCode && storedKey) void load(storedCode, storedKey, true);
  }, []);

  useEffect(() => {
    if (!code || !teacherKey || !summary) return;
    const id = window.setInterval(() => { void load(code, teacherKey, true); }, 1300);
    return () => window.clearInterval(id);
  }, [code, teacherKey, Boolean(summary)]);

  function remember(nextCode: string, nextKey: string) {
    sessionStorage.setItem(CODE_KEY, nextCode); sessionStorage.setItem(SECRET_KEY, nextKey);
    setCode(nextCode); setTeacherKey(nextKey);
  }

  function activityPayload() {
    if (activityType === 'guided') return { type: activityType, lessonId, pacing, projectorMode, ageBand };
    if (activityType === 'custom') return { type: activityType, title: customIds.length === 1 ? ui.singleLive : ui.customActivity, questionIds: customIds, pacing, projectorMode, ageBand };
    return { type: activityType, pacing, projectorMode, ageBand };
  }

  async function createClass() {
    setBusy(true); setMessage(ui.creating);
    const response = await fetch('/api/school/classes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ roomLabel, activity: activityPayload() }) }).catch(() => null);
    if (!response?.ok) { setBusy(false); setMessage(ui.createFailed); return; }
    const data = await response.json() as { code: string; teacherKey: string };
    remember(data.code, data.teacherKey);
    await load(data.code, data.teacherKey, true);
    setMessage(ui.created);
    setBusy(false);
  }

  async function load(targetCode = code, targetKey = teacherKey, silent = false) {
    const normalized = targetCode.trim().toUpperCase();
    const secret = targetKey.trim();
    if (!normalized || !secret) return;
    const response = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}`, { headers: { authorization: `Bearer ${secret}` }, cache: 'no-store' }).catch(() => null);
    if (!response?.ok) { if (!silent) setMessage(ui.loadFailed); return; }
    const data = await response.json() as TeacherSummary;
    remember(normalized, secret); setSummary(data);
    if (!silent) setMessage(ui.refreshed);
  }

  async function teacherAction(body: Record<string, unknown>) {
    if (!summary) return;
    setBusy(true);
    const response = await fetch(`/api/school/classes/${encodeURIComponent(summary.code)}`, { method: 'PATCH', headers: { authorization: `Bearer ${teacherKey}`, 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null);
    if (!response?.ok) { const error = response ? await response.json().catch(() => null) as { error?: string } | null : null; setMessage(locale === 'en' && error?.error ? error.error : ui.actionFailed); setBusy(false); return; }
    setSummary(await response.json() as TeacherSummary); setBusy(false);
  }

  async function applyActivity() { await teacherAction({ action: 'configure', activity: activityPayload() }); setMessage(ui.activityLoaded); }
  async function copyJoinLink() { if (!summary || !origin) return; await navigator.clipboard.writeText(`${origin}/school/student?code=${summary.code}`); setMessage(ui.joinCopied); }
  function toggleCustom(id: string) { setCustomIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]); }
  function clearLocal() { sessionStorage.removeItem(CODE_KEY); sessionStorage.removeItem(SECRET_KEY); setCode(''); setTeacherKey(''); setSummary(null); setMessage(ui.accessRemoved); }

  const currentQuestionIds = summary?.activity.questionIds ?? [];
  const currentQuestion = summary?.currentQuestion;
  const currentQuestionStatement = currentQuestion?.kind === 'believe' && currentQuestion.sourceItemId && currentQuestion.polarity
    ? (locale === 'de' ? germanBeliefStatement(currentQuestion.sourceItemId, currentQuestion.polarity) : locale === 'es' || locale === 'fr' ? romanceBeliefStatement(locale, currentQuestion.sourceItemId, currentQuestion.polarity) : currentQuestion.statement) ?? currentQuestion.statement
    : currentQuestion?.statement;
  const currentQuestionPrompt = currentQuestion?.kind === 'literacy'
    ? (locale === 'de' ? germanLiteracyPrompt(currentQuestion.id) ?? currentQuestion.prompt : currentQuestion.prompt)
    : null;
  const currentQuestionTitle = currentQuestion?.kind === 'believe' && currentQuestion.construct
    ? deepConstruct(locale, currentQuestion.construct)
    : currentQuestion?.title;
  const lesson = summary?.activity.lessonId ? schoolLessons.find((item) => item.id === summary.activity.lessonId) : null;
  const availableLessons = schoolLessons.filter((item) => item.ageBand === (ageBand === 'junior-10-13' ? '10–13' : '14–18'));
  const joinUrl = summary && origin ? `${origin}/school/student?code=${summary.code}` : '';
  const projectorUrl = summary && origin ? `${origin}/school/projector?code=${summary.code}` : '';
  const activityTitle = (type: string, fallback: string) => type === 'quick26' ? 'Quick 26' : type === 'full42' ? 'Full 42' : type === 'junior' ? 'Junior 16' : type === 'literacy' ? ui.literacyQuiz : type === 'guided' ? ui.guided : type === 'custom' ? ui.customActivity : fallback;
  const questionTitle = (row: Pick<QuestionSummary, 'id' | 'kind' | 'title' | 'construct'>) => row.kind === 'believe' && row.construct ? deepConstruct(locale, row.construct) : row.title;

  const configuration = (
    <article className="engine-card school-config-card">
      <p className="engine-kicker">{ui.choose}</p>
      <div className="school-config-grid">
        <label><span>{ui.roomLabel}</span><input value={roomLabel} onChange={(e) => setRoomLabel(e.target.value)} placeholder={ui.roomPlaceholder} /></label>
        <label><span>{ui.ageBand}</span><select value={ageBand} onChange={(e) => { const next = e.target.value as typeof ageBand; setAgeBand(next); setActivityType(next === 'junior-10-13' ? 'junior' : 'quick26'); setLessonId(next === 'junior-10-13' ? 'junior-social-media' : 'room-stand'); setCustomIds(next === 'junior-10-13' ? ['J01-P'] : ['T01-P']); }}><option value="junior-10-13">Junior · {ui.ages('10–13')}</option><option value="youth-14-18">Youth · {ui.ages('14–18')}</option></select></label>
        <label><span>{ui.activity}</span><select value={activityType} onChange={(e) => setActivityType(e.target.value as typeof activityType)}>{ageBand === 'junior-10-13' ? <option value="junior">Junior 16</option> : <><option value="quick26">Youth Quick 26</option><option value="full42">Youth Full 42</option></>}<option value="literacy">{ui.literacyQuiz}</option><option value="guided">{ui.guided}</option><option value="custom">{ui.custom}</option></select></label>
        {activityType === 'guided' && <label><span>{ui.lesson}</span><select value={lessonId} onChange={(e) => setLessonId(e.target.value)}>{availableLessons.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.duration}</option>)}</select></label>}
        <label><span>{ui.pacing}</span><select value={pacing} onChange={(e) => setPacing(e.target.value as 'teacher' | 'student')}><option value="teacher">{ui.teacherPaced}</option><option value="student">{ui.studentPaced}</option></select></label>
        <label><span>{ui.projectorDistribution}</span><select value={projectorMode} onChange={(e) => setProjectorMode(e.target.value as 'live' | 'reveal')}><option value="reveal">{ui.revealChoice}</option><option value="live">{ui.liveChoice}</option></select></label>
      </div>
      {activityType === 'guided' && ui.lessonNotice && <p className="engine-help">{ui.lessonNotice}</p>}
      {activityType === 'literacy' && ui.literacyNotice && <p className="engine-help">{ui.literacyNotice}</p>}
      {activityType === 'custom' && <details className="engine-details" open><summary>{ui.selectApproved(customIds.length)}</summary><div className="school-question-picker">{(ageBand === 'junior-10-13' ? activityOptions.junior : activityOptions.full42).map((id) => { const q = getClassroomQuestion(id, ageBand); const label = q?.kind === 'believe' && q.construct ? `${id} · ${deepConstruct(locale, q.construct)}` : q?.title ?? id; return <label key={id}><input type="checkbox" checked={customIds.includes(id)} onChange={() => toggleCustom(id)} /> {label}</label>; })}{activityOptions.literacy.map((id) => { const q = getClassroomQuestion(id, ageBand); return <label key={id}><input type="checkbox" checked={customIds.includes(id)} onChange={() => toggleCustom(id)} /> {q?.title ?? id}</label>; })}</div></details>}
      {!summary ? <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || (activityType === 'custom' && !customIds.length)} onClick={createClass}>{ui.startClass}</button></div> : <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || (activityType === 'custom' && !customIds.length)} onClick={applyActivity}>{ui.loadActivity}</button></div>}
    </article>
  );

  if (!summary) return <section className="engine-shell school-shell">{configuration}{message && <p className="school-status-message">{message}</p>}<article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.openExisting}</p><div className="school-config-grid"><label><span>{ui.roomCode}</span><input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={6} /></label><label><span>{ui.teacherKey}</span><input value={teacherKey} onChange={(e) => setTeacherKey(e.target.value)} /></label></div><div className="engine-result-actions"><button className="engine-primary-link" type="button" onClick={() => load(code, teacherKey, false)}>{ui.openClass}</button></div></article></section>;

  return (
    <section className="engine-shell school-shell school-teacher-print">
      <div className="school-room-strip"><strong>{summary.roomLabel || `${ui.classWord} ${summary.code}`}</strong><span>{activityTitle(summary.activity.type, summary.activity.title)}</span><span>{ui.ages(summary.activity.ageBand === 'junior-10-13' ? '10–13' : '14–18')}</span><span>{ui.joined(summary.joinedCount)}</span><span>{summary.status === 'active' ? ui.active : ui.closed}</span></div>
      {message && <p className="school-status-message no-print">{message}</p>}
      <article className="engine-card school-room-card"><p className="engine-kicker">{ui.onboarding}</p><div className="school-code-display"><span>{ui.roomCodeCaps}</span><strong>{summary.code}</strong></div><p><strong>{ui.studentJoin}</strong> <code>{joinUrl || `/school/student?code=${summary.code}`}</code></p><p><strong>{ui.projector}</strong> <code>{projectorUrl || `/school/projector?code=${summary.code}`}</code></p><div className="engine-result-actions no-print"><button className="engine-primary-link" type="button" onClick={copyJoinLink}>{ui.copyStudent}</button><a className="engine-primary-link" href={`/school/projector?code=${summary.code}`} target="_blank" rel="noreferrer">{ui.openProjector}</a><button className="engine-link-button" type="button" onClick={() => teacherAction({ action: 'status', status: summary.status === 'active' ? 'closed' : 'active' })}>{summary.status === 'active' ? ui.endClass : ui.reopenClass}</button><button className="engine-link-button" type="button" onClick={clearLocal}>{ui.forgetKey}</button></div><p className="engine-help">{ui.privacyIntro}</p></article>
      <div className="no-print" style={{ marginTop: 18 }}>{configuration}</div>
      {lesson && <article className="engine-card school-lesson-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.lessonGuide(lesson.duration, lesson.ageBand)}</p><h2>{lesson.title}</h2>{ui.lessonNotice && <p className="engine-help">{ui.lessonNotice}</p>}<div className="school-goals">{lesson.goals.map((goal) => <span key={goal}>{goal}</span>)}</div><details className="engine-details"><summary>{ui.timeline}</summary>{lesson.timeline.map((step) => <div className="school-timeline" key={step.minutes}><strong>{step.minutes}</strong><p><b>{ui.teacher}:</b> {step.teacher}<br /><b>{ui.students}:</b> {step.students}</p></div>)}<h3>{ui.prompts}</h3><ul>{lesson.discussionPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></details></article>}
      <article className="engine-card school-live-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.liveClass} · {summary.activity.pacing === 'teacher' ? ui.teacherPaced : ui.studentPaced}</p><div className="school-live-head"><div><h2>{currentQuestion ? currentQuestionTitle : ui.chooseQuestion}</h2>{currentQuestion?.kind === 'believe' ? <p>{currentQuestionStatement}</p> : currentQuestionPrompt ? <p>{currentQuestionPrompt}</p> : null}{currentQuestion?.kind === 'literacy' && ui.literacyNotice && <p className="engine-help">{ui.literacyNotice}</p>}</div><div className="school-response-stat"><strong>{summary.currentDistribution?.responses ?? 0}</strong><span>{ui.responses}</span><small>{ui.ofJoined(summary.joinedCount)}</small></div></div>{summary.currentDistribution && <><BarChart rows={summary.currentDistribution.distribution} locale={locale} kind={summary.currentDistribution.kind as 'believe' | 'literacy'} />{summary.currentDistribution.kind === 'literacy' && summary.revealed && <p className="engine-callout"><strong>{summary.currentDistribution.correctPercent}% {ui.correct}</strong>{currentQuestion?.explanation ? ` · ${locale === 'de' ? germanLiteracyExplanation(currentQuestion.id, currentQuestion.explanation) : currentQuestion.explanation}` : ''}</p>}</>}<div className="engine-result-actions no-print"><button className="engine-primary-link" type="button" disabled={!summary.currentQuestionId || !summary.questionOpen || busy} onClick={() => teacherAction({ action: 'closeQuestion' })}>{ui.closeResponses}</button><button className="engine-primary-link" type="button" disabled={!summary.currentQuestionId || busy} onClick={() => teacherAction({ action: 'reveal', revealed: !summary.revealed })}>{summary.revealed ? ui.hideProjector : ui.revealProjector}</button><button className="engine-primary-link" type="button" disabled={!currentQuestionIds.length || busy} onClick={() => teacherAction({ action: 'next' })}>{ui.nextQuestion}</button></div></article>
      <article className="engine-card no-print" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.launcher}</p><p className="engine-help">{ui.launcherHelp}</p><div className="school-launch-grid">{currentQuestionIds.map((id, index) => { const q = getClassroomQuestion(id, summary.activity.ageBand); const result = summary.classSummary.questions.find((item) => item.id === id); const title = q?.kind === 'believe' && q.construct ? deepConstruct(locale, q.construct) : q?.title ?? id; return <button type="button" key={id} className={summary.currentQuestionId === id ? 'school-launch active' : 'school-launch'} onClick={() => teacherAction({ action: 'launch', questionId: id })}><span>{index + 1}</span><strong>{title}</strong><small>{result ? ui.responseCount(result.responses) : ui.notAnswered}</small></button>; })}</div></article>
      <article className="engine-card school-summary-card" style={{ marginTop: 18 }}><div className="school-summary-title"><div><p className="engine-kicker">{ui.classroomSummary}</p><h2>{summary.roomLabel || `${ui.classWord} ${summary.code}`}</h2><p>{activityTitle(summary.activity.type, summary.activity.title)} · {ui.joined(summary.joinedCount)} · {ui.questionsWithResponses(summary.classSummary.answeredQuestions, summary.classSummary.totalQuestions)}</p></div><button className="engine-primary-link no-print" type="button" onClick={() => window.print()}>{ui.print}</button></div><div className="school-summary-metrics"><div><strong>{summary.joinedCount}</strong><span>{ui.joinedMetric}</span></div><div><strong>{summary.classSummary.totalResponses}</strong><span>{ui.responsesMetric}</span></div><div><strong>{summary.classSummary.answeredQuestions}</strong><span>{ui.questionsAnswered}</span></div><div><strong>{summary.classSummary.literacy.percent === null ? '—' : `${summary.classSummary.literacy.percent}%`}</strong><span>{ui.literacyCorrect}</span></div></div></article>
      {summary.classSummary.polygon.some((row) => row.score !== null) && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.axisKicker}</p><h2>{ui.axisTitle}</h2><p className="engine-help">{ui.axisHelp}</p>{summary.classSummary.polygon.map((row) => { const axis = deepAxis(locale, row); return <ScoreBar key={row.id} label={axis.name} value={row.score} low={axis.low} high={axis.high} na={ui.na} />; })}</article>}
      {summary.classSummary.families.some((row) => row.overall !== null) && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.familyKicker}</p><h2>{ui.familyTitle}</h2>{summary.classSummary.families.map((row) => { const family = deepFamily(locale, row.id, row.name); return <ScoreBar key={row.id} label={`${family.name} · ${row.coverage}% ${ui.coverage}`} value={row.overall} na={ui.na} />; })}<p className="engine-help">{ui.familyHelp}</p></article>}
      {(summary.classSummary.mostDivided.length > 0 || summary.classSummary.mostConsensus.length > 0) && <div className="deep-summary-grid"><article className="engine-card"><p className="engine-kicker">{ui.mostDivided}</p><h2>{ui.dividedTitle}</h2>{summary.classSummary.mostDivided.map((row) => <div className="deep-literacy-line" key={row.id}><span>{row.id} · {questionTitle(row)}</span><strong>{row.responses}</strong></div>)}</article><article className="engine-card"><p className="engine-kicker">{ui.consensus}</p><h2>{ui.consensusTitle}</h2>{summary.classSummary.mostConsensus.map((row) => <div className="deep-literacy-line" key={row.id}><span>{row.id} · {questionTitle(row)}</span><strong>{row.responses}</strong></div>)}</article></div>}
      {summary.classSummary.strongestModeTensions.length > 0 && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">THINK · FEEL · ACT</p><h2>{ui.tensionTitle}</h2><div className="engine-table-wrap"><table className="engine-table compact"><thead><tr><th>{ui.construct}</th><th>THINK</th><th>FEEL</th><th>ACT</th><th>{ui.tension}</th></tr></thead><tbody>{summary.classSummary.strongestModeTensions.map((row) => <tr key={row.construct}><td>{deepConstruct(locale, row.construct)}</td><td>{row.think ?? '—'}</td><td>{row.feel ?? '—'}</td><td>{row.act ?? '—'}</td><td>{row.tension ?? '—'}</td></tr>)}</tbody></table></div><p className="engine-help">{ui.tensionHelp}</p></article>}
      {summary.classSummary.literacy.responses > 0 && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.literacy}</p><h2>{ui.aggregateCorrect(summary.classSummary.literacy.percent ?? 0)}</h2><p className="engine-help">{ui.literacyHelp}</p>{ui.literacyNotice && <p className="engine-help">{ui.literacyNotice}</p>}{summary.classSummary.literacy.weakestQuestions.map((row) => <div className="deep-literacy-line" key={row.id}><span>{row.id} · {questionTitle(row)}</span><strong>{row.correctPercent}%</strong></div>)}</article>}
      {summary.classSummary.questions.length > 0 && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.distributions}</p><h2>{ui.distributionTitle}</h2>{summary.classSummary.questions.map((row) => <details className="engine-details school-question-result" key={row.id}><summary>{row.id} · {questionTitle(row)} · {ui.responseCount(row.responses)}</summary><BarChart rows={row.distribution} locale={locale} kind={row.kind} />{row.correctPercent !== null && <p><strong>{row.correctPercent}% {ui.correct}</strong></p>}</details>)}</article>}
      <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">{ui.privacyBoundary}</p><div className="deep-literacy-line"><span>{ui.seeAggregate}</span><strong>{ui.yes}</strong></div><div className="deep-literacy-line"><span>{ui.seeWho}</span><strong>{ui.no}</strong></div><div className="deep-literacy-line"><span>{ui.roster}</span><strong>{ui.no}</strong></div><div className="deep-literacy-line"><span>{ui.mapping}</span><strong>{ui.no}</strong></div><p><strong>{ui.legal}</strong></p></article>
    </section>
  );
}
