'use client';

import { useEffect, useState } from 'react';
import { classroomActivityOptions, classroomQuestionLabel, getClassroomQuestion } from '../../../lib/school-classroom';
import { schoolLessons } from '../../../lib/school-lessons';
import { germanBeliefStatement } from '../../../lib/german-believe';
import { romanceBeliefStatement } from '../../../lib/romance-believe';
import { useLocale } from '../../LocaleProvider';

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

function BarChart({ rows }: { rows: DistributionRow[] }) {
  return <div className="school-distribution">{rows.map((row) => <div className="school-bar-row" key={row.id}><div className="school-bar-label"><span>{row.label}</span><strong>{row.percent}% · {row.count}</strong></div><div className="school-bar-track"><span style={{ width: `${row.percent}%` }} /></div></div>)}</div>;
}

function ScoreBar({ label, value, low, high }: { label: string; value: number | null; low?: string; high?: string }) {
  return <div className="school-score-row"><div className="school-bar-label"><span>{label}{low && high ? <small>{low} ↔ {high}</small> : null}</span><strong>{value === null ? 'n.a.' : value}</strong></div><div className="school-score-track"><span style={{ width: `${value ?? 0}%` }} /></div></div>;
}

export default function TeacherSchoolClient() {
  const { locale } = useLocale();
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
  const [customIds, setCustomIds] = useState<string[]>(['T01']);
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
    if (activityType === 'custom') return { type: activityType, title: customIds.length === 1 ? 'Single live question' : 'Custom activity', questionIds: customIds, pacing, projectorMode, ageBand };
    return { type: activityType, pacing, projectorMode, ageBand };
  }

  async function createClass() {
    setBusy(true); setMessage('Creating classroom…');
    const response = await fetch('/api/school/classes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ roomLabel, activity: activityPayload() }) }).catch(() => null);
    if (!response?.ok) { setBusy(false); setMessage('Classroom could not be created. Firebase may be unavailable in this environment.'); return; }
    const data = await response.json() as { code: string; teacherKey: string };
    remember(data.code, data.teacherKey);
    await load(data.code, data.teacherKey, true);
    setMessage('Classroom created. Share only the room code or join link; keep the teacher key private.');
    setBusy(false);
  }

  async function load(targetCode = code, targetKey = teacherKey, silent = false) {
    const normalized = targetCode.trim().toUpperCase();
    const secret = targetKey.trim();
    if (!normalized || !secret) return;
    const response = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}`, { headers: { authorization: `Bearer ${secret}` }, cache: 'no-store' }).catch(() => null);
    if (!response?.ok) { if (!silent) setMessage('Could not load classroom. Check code and teacher key.'); return; }
    const data = await response.json() as TeacherSummary;
    remember(normalized, secret); setSummary(data);
    if (!silent) setMessage('Classroom refreshed.');
  }

  async function teacherAction(body: Record<string, unknown>) {
    if (!summary) return;
    setBusy(true);
    const response = await fetch(`/api/school/classes/${encodeURIComponent(summary.code)}`, { method: 'PATCH', headers: { authorization: `Bearer ${teacherKey}`, 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null);
    if (!response?.ok) { const error = response ? await response.json().catch(() => null) as { error?: string } | null : null; setMessage(error?.error ?? 'Teacher action failed.'); setBusy(false); return; }
    setSummary(await response.json() as TeacherSummary); setBusy(false);
  }

  async function applyActivity() { await teacherAction({ action: 'configure', activity: activityPayload() }); setMessage('Activity loaded. Existing anonymous aggregates remain in the room history.'); }
  async function copyJoinLink() { if (!summary || !origin) return; await navigator.clipboard.writeText(`${origin}/school/student?code=${summary.code}`); setMessage('Student join link copied.'); }
  function toggleCustom(id: string) { setCustomIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]); }
  function clearLocal() { sessionStorage.removeItem(CODE_KEY); sessionStorage.removeItem(SECRET_KEY); setCode(''); setTeacherKey(''); setSummary(null); setMessage('Teacher access removed from this browser session.'); }

  const currentQuestionIds = summary?.activity.questionIds ?? [];
  const currentQuestion = summary?.currentQuestion;
  const currentQuestionStatement = currentQuestion?.kind === 'believe' && currentQuestion.sourceItemId && currentQuestion.polarity
    ? (locale === 'de' ? germanBeliefStatement(currentQuestion.sourceItemId, currentQuestion.polarity) : locale === 'es' || locale === 'fr' ? romanceBeliefStatement(locale, currentQuestion.sourceItemId, currentQuestion.polarity) : currentQuestion.statement) ?? currentQuestion.statement
    : currentQuestion?.statement;
  const lesson = summary?.activity.lessonId ? schoolLessons.find((item) => item.id === summary.activity.lessonId) : null;
  const availableLessons = schoolLessons.filter((item) => item.ageBand === (ageBand === 'junior-10-13' ? '10–13' : '14–18'));
  const joinUrl = summary && origin ? `${origin}/school/student?code=${summary.code}` : '';
  const projectorUrl = summary && origin ? `${origin}/school/projector?code=${summary.code}` : '';

  const configuration = (
    <article className="engine-card school-config-card">
      <p className="engine-kicker">Choose what to teach</p>
      <div className="school-config-grid">
        <label><span>Room label</span><input value={roomLabel} onChange={(e) => setRoomLabel(e.target.value)} placeholder="Politics Year 10" /></label>
        <label><span>Age band</span><select value={ageBand} onChange={(e) => { const next = e.target.value as typeof ageBand; setAgeBand(next); setActivityType(next === 'junior-10-13' ? 'junior' : 'quick26'); setLessonId(next === 'junior-10-13' ? 'junior-social-media' : 'room-stand'); setCustomIds(next === 'junior-10-13' ? ['J01'] : ['T01']); }}><option value="junior-10-13">Junior · ages 10–13</option><option value="youth-14-18">Youth · ages 14–18</option></select></label>
        <label><span>Activity</span><select value={activityType} onChange={(e) => setActivityType(e.target.value as typeof activityType)}>{ageBand === 'junior-10-13' ? <option value="junior">Junior 16</option> : <><option value="quick26">Youth Quick 26</option><option value="full42">Youth Full 42</option></>}<option value="literacy">Political Literacy Quiz</option><option value="guided">Guided Lesson</option><option value="custom">Build my own / single question</option></select></label>
        {activityType === 'guided' && <label><span>Lesson</span><select value={lessonId} onChange={(e) => setLessonId(e.target.value)}>{availableLessons.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.duration}</option>)}</select></label>}
        <label><span>Pacing</span><select value={pacing} onChange={(e) => setPacing(e.target.value as 'teacher' | 'student')}><option value="teacher">Teacher-paced</option><option value="student">Student-paced</option></select></label>
        <label><span>Projector distribution</span><select value={projectorMode} onChange={(e) => setProjectorMode(e.target.value as 'live' | 'reveal')}><option value="reveal">Reveal when teacher chooses</option><option value="live">Show live while answers arrive</option></select></label>
      </div>
      {activityType === 'custom' && <details className="engine-details" open><summary>Select approved questions ({customIds.length} selected)</summary><div className="school-question-picker">{(ageBand === 'junior-10-13' ? activityOptions.junior : activityOptions.full42).map((id) => <label key={id}><input type="checkbox" checked={customIds.includes(id)} onChange={() => toggleCustom(id)} /> {classroomQuestionLabel(id, ageBand)}</label>)}{activityOptions.literacy.map((id) => <label key={id}><input type="checkbox" checked={customIds.includes(id)} onChange={() => toggleCustom(id)} /> {classroomQuestionLabel(id, ageBand)}</label>)}</div></details>}
      {!summary ? <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || (activityType === 'custom' && !customIds.length)} onClick={createClass}>Start classroom</button></div> : <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || (activityType === 'custom' && !customIds.length)} onClick={applyActivity}>Load this activity</button></div>}
    </article>
  );

  if (!summary) return <section className="engine-shell school-shell">{configuration}{message && <p className="school-status-message">{message}</p>}<article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">Open existing classroom</p><div className="school-config-grid"><label><span>Room code</span><input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={6} /></label><label><span>Teacher key</span><input value={teacherKey} onChange={(e) => setTeacherKey(e.target.value)} /></label></div><div className="engine-result-actions"><button className="engine-primary-link" type="button" onClick={() => load(code, teacherKey, false)}>Open classroom</button></div></article></section>;

  return (
    <section className="engine-shell school-shell school-teacher-print">
      <div className="school-room-strip"><strong>{summary.roomLabel || `Class ${summary.code}`}</strong><span>{summary.activity.title}</span><span>{summary.activity.ageBand === 'junior-10-13' ? 'Ages 10–13' : 'Ages 14–18'}</span><span>{summary.joinedCount} joined</span><span>{summary.status}</span></div>
      {message && <p className="school-status-message no-print">{message}</p>}
      <article className="engine-card school-room-card"><p className="engine-kicker">Classroom onboarding</p><div className="school-code-display"><span>ROOM CODE</span><strong>{summary.code}</strong></div><p><strong>Student join:</strong> <code>{joinUrl || `/school/student?code=${summary.code}`}</code></p><p><strong>Projector:</strong> <code>{projectorUrl || `/school/projector?code=${summary.code}`}</code></p><div className="engine-result-actions no-print"><button className="engine-primary-link" type="button" onClick={copyJoinLink}>Copy student link</button><a className="engine-primary-link" href={`/school/projector?code=${summary.code}`} target="_blank" rel="noreferrer">Open projector</a><button className="engine-link-button" type="button" onClick={() => teacherAction({ action: 'status', status: summary.status === 'active' ? 'closed' : 'active' })}>{summary.status === 'active' ? 'End classroom' : 'Reopen classroom'}</button><button className="engine-link-button" type="button" onClick={clearLocal}>Forget key</button></div><p className="engine-help">Students join without names or accounts. The teacher dashboard receives aggregate room distributions, not participant-to-answer records.</p></article>
      <div className="no-print" style={{ marginTop: 18 }}>{configuration}</div>
      {lesson && <article className="engine-card school-lesson-card" style={{ marginTop: 18 }}><p className="engine-kicker">Lesson guide · {lesson.duration} · ages {lesson.ageBand}</p><h2>{lesson.title}</h2><div className="school-goals">{lesson.goals.map((goal) => <span key={goal}>{goal}</span>)}</div><details className="engine-details"><summary>Timeline and teacher guide</summary>{lesson.timeline.map((step) => <div className="school-timeline" key={step.minutes}><strong>{step.minutes}</strong><p><b>Teacher:</b> {step.teacher}<br /><b>Students:</b> {step.students}</p></div>)}<h3>Discussion prompts</h3><ul>{lesson.discussionPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul></details></article>}
      <article className="engine-card school-live-card" style={{ marginTop: 18 }}><p className="engine-kicker">Live classroom · {summary.activity.pacing === 'teacher' ? 'teacher-paced' : 'student-paced'}</p><div className="school-live-head"><div><h2>{currentQuestion ? currentQuestion.title : 'Choose a question to focus the room'}</h2>{currentQuestion?.kind === 'believe' ? <p>{currentQuestionStatement}</p> : currentQuestion?.prompt ? <p>{currentQuestion.prompt}</p> : null}</div><div className="school-response-stat"><strong>{summary.currentDistribution?.responses ?? 0}</strong><span>responses</span><small>of {summary.joinedCount} joined</small></div></div>{summary.currentDistribution && <><BarChart rows={summary.currentDistribution.distribution} />{summary.currentDistribution.kind === 'literacy' && summary.revealed && <p className="engine-callout"><strong>{summary.currentDistribution.correctPercent}% correct</strong>{currentQuestion?.explanation ? ` · ${currentQuestion.explanation}` : ''}</p>}</>}<div className="engine-result-actions no-print"><button className="engine-primary-link" type="button" disabled={!summary.currentQuestionId || !summary.questionOpen || busy} onClick={() => teacherAction({ action: 'closeQuestion' })}>Close responses</button><button className="engine-primary-link" type="button" disabled={!summary.currentQuestionId || busy} onClick={() => teacherAction({ action: 'reveal', revealed: !summary.revealed })}>{summary.revealed ? 'Hide from projector' : 'Reveal to projector'}</button><button className="engine-primary-link" type="button" disabled={!currentQuestionIds.length || busy} onClick={() => teacherAction({ action: 'next' })}>Next question</button></div></article>
      <article className="engine-card no-print" style={{ marginTop: 18 }}><p className="engine-kicker">Question launcher</p><p className="engine-help">Launch any approved question in the selected activity. You can pause, discuss, switch activity or change direction at any time.</p><div className="school-launch-grid">{currentQuestionIds.map((id, index) => { const q = getClassroomQuestion(id, summary.activity.ageBand); const result = summary.classSummary.questions.find((item) => item.id === id); return <button type="button" key={id} className={summary.currentQuestionId === id ? 'school-launch active' : 'school-launch'} onClick={() => teacherAction({ action: 'launch', questionId: id })}><span>{index + 1}</span><strong>{q?.title ?? id}</strong><small>{result ? `${result.responses} responses` : 'not answered yet'}</small></button>; })}</div></article>
      <article className="engine-card school-summary-card" style={{ marginTop: 18 }}><div className="school-summary-title"><div><p className="engine-kicker">Politangle Classroom Summary</p><h2>{summary.roomLabel || `Class ${summary.code}`}</h2><p>{summary.activity.title} · {summary.joinedCount} joined · {summary.classSummary.answeredQuestions}/{summary.classSummary.totalQuestions} questions with responses</p></div><button className="engine-primary-link no-print" type="button" onClick={() => window.print()}>Print / Save PDF</button></div><div className="school-summary-metrics"><div><strong>{summary.joinedCount}</strong><span>joined</span></div><div><strong>{summary.classSummary.totalResponses}</strong><span>responses</span></div><div><strong>{summary.classSummary.answeredQuestions}</strong><span>questions answered</span></div><div><strong>{summary.classSummary.literacy.percent === null ? '—' : `${summary.classSummary.literacy.percent}%`}</strong><span>literacy correct</span></div></div></article>
      {summary.classSummary.polygon.some((row) => row.score !== null) && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">Aggregate 8-axis class map</p><h2>Where the room sits across political dimensions</h2><p className="engine-help">These are aggregate question distributions, not an individual profile and not a label for the class.</p>{summary.classSummary.polygon.map((row) => <ScoreBar key={row.id} label={row.name} value={row.score} low={row.low} high={row.high} />)}</article>}
      {summary.classSummary.families.some((row) => row.overall !== null) && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">Aggregate political-family compatibility</p><h2>Several families can fit the room at once</h2>{summary.classSummary.families.map((row) => <ScoreBar key={row.id} label={`${row.name} · ${row.coverage}% coverage`} value={row.overall} />)}<p className="engine-help">This is calculated from aggregate response distributions using the same academically reviewed family priors. It is not a vote prediction or a claim that the class “is” one ideology.</p></article>}
      {(summary.classSummary.mostDivided.length > 0 || summary.classSummary.mostConsensus.length > 0) && <div className="deep-summary-grid"><article className="engine-card"><p className="engine-kicker">Most divided</p><h2>Where the room splits</h2>{summary.classSummary.mostDivided.map((row) => <div className="deep-literacy-line" key={row.id}><span>{row.id} · {row.title}</span><strong>{row.responses}</strong></div>)}</article><article className="engine-card"><p className="engine-kicker">Strongest consensus</p><h2>Where answers cluster</h2>{summary.classSummary.mostConsensus.map((row) => <div className="deep-literacy-line" key={row.id}><span>{row.id} · {row.title}</span><strong>{row.responses}</strong></div>)}</article></div>}
      {summary.classSummary.strongestModeTensions.length > 0 && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">THINK · FEEL · ACT</p><h2>Largest aggregate mode tensions</h2><div className="engine-table-wrap"><table className="engine-table compact"><thead><tr><th>Construct</th><th>THINK</th><th>FEEL</th><th>ACT</th><th>Tension</th></tr></thead><tbody>{summary.classSummary.strongestModeTensions.map((row) => <tr key={row.construct}><td>{row.construct.replaceAll('-', ' ')}</td><td>{row.think ?? '—'}</td><td>{row.feel ?? '—'}</td><td>{row.act ?? '—'}</td><td>{row.tension ?? '—'}</td></tr>)}</tbody></table></div><p className="engine-help">ACT is stated intended choice, not observed behavior. Tension is a discussion signal, not hypocrisy.</p></article>}
      {summary.classSummary.literacy.responses > 0 && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">Political literacy</p><h2>{summary.classSummary.literacy.percent}% aggregate correctness</h2><p className="engine-help">Use the lowest-performing concepts as follow-up teaching prompts. The teacher does not receive an individual score.</p>{summary.classSummary.literacy.weakestQuestions.map((row) => <div className="deep-literacy-line" key={row.id}><span>{row.id} · {row.title}</span><strong>{row.correctPercent}%</strong></div>)}</article>}
      {summary.classSummary.questions.length > 0 && <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">Question distributions</p><h2>The distribution matters more than the average.</h2>{summary.classSummary.questions.map((row) => <details className="engine-details school-question-result" key={row.id}><summary>{row.id} · {row.title} · {row.responses} responses</summary><BarChart rows={row.distribution} />{row.correctPercent !== null && <p><strong>{row.correctPercent}% correct</strong></p>}</details>)}</article>}
      <article className="engine-card" style={{ marginTop: 18 }}><p className="engine-kicker">Privacy boundary</p><div className="deep-literacy-line"><span>Teacher can see aggregate political distributions</span><strong>Yes</strong></div><div className="deep-literacy-line"><span>Teacher can see who selected an answer</span><strong>No</strong></div><div className="deep-literacy-line"><span>Student roster required</span><strong>No</strong></div><div className="deep-literacy-line"><span>Participant-to-answer mapping retained by classroom aggregate record</span><strong>No</strong></div><p><strong>REQUIRES QUALIFIED LEGAL REVIEW</strong> before real school/minor deployment.</p></article>
    </section>
  );
}
