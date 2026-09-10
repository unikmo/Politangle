'use client';

import { useEffect, useMemo, useState } from 'react';
import { germanBeliefStatement } from '../../../lib/german-believe';
import { romanceBeliefStatement } from '../../../lib/romance-believe';
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt } from '../../../lib/german-literacy';
import { useLocale } from '../../LocaleProvider';

type ClassroomQuestion = {
  id: string;
  kind: 'believe' | 'literacy';
  title: string;
  construct?: string;
  mode?: string;
  sourceItemId?: string;
  polarity?: 'negative' | 'positive';
  section?: string;
  statement?: string;
  prompt?: string;
  multiSelect?: boolean;
  options: readonly { id: string; label: string }[];
  explanation?: string;
  acceptedAnswerSets?: readonly (readonly string[])[];
};

type Distribution = {
  id: string;
  kind: string;
  title: string;
  responses: number;
  distribution: { id: string; label: string; count: number; percent: number }[];
  correct: number | null;
  correctPercent: number | null;
};

type PublicRoom = {
  code: string;
  status: 'active' | 'closed';
  active: boolean;
  roomLabel: string;
  joinedCount: number;
  activity: { type: string; title: string; questionIds: string[]; pacing: 'teacher' | 'student'; projectorMode: 'live' | 'reveal' };
  currentIndex: number;
  currentQuestionId: string | null;
  questionOpen: boolean;
  revealed: boolean;
  currentQuestion: ClassroomQuestion | null;
  activityQuestions: ClassroomQuestion[];
  projectorDistribution: Distribution | null;
};

const CODE_KEY = 'politangle.school.classroom.code';
function tokenKey(code: string) { return `politangle.school.classroom.token.${code}`; }
function answerKey(code: string) { return `politangle.school.classroom.local.${code}`; }

function DistributionChart({ data }: { data: Distribution }) {
  return (
    <div className="school-distribution" aria-label={`Aggregate distribution for ${data.title}`}>
      {data.distribution.map((row) => (
        <div className="school-bar-row" key={row.id}>
          <div className="school-bar-label"><span>{row.label}</span><strong>{row.percent}% · {row.count}</strong></div>
          <div className="school-bar-track"><span style={{ width: `${row.percent}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

export default function StudentSchoolClient({ initialCode }: { initialCode: string }) {
  const { locale } = useLocale();
  const [entryCode, setEntryCode] = useState(initialCode.toUpperCase());
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [room, setRoom] = useState<PublicRoom | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [studentIndex, setStudentIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string | string[]>>({});
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem(CODE_KEY) ?? '';
    if (!initialCode && stored) setEntryCode(stored);
  }, [initialCode]);

  useEffect(() => {
    if (!code || !token) return;
    let cancelled = false;
    const refresh = async () => {
      const response = await fetch(`/api/school/classes/${encodeURIComponent(code)}`, { cache: 'no-store' }).catch(() => null);
      if (!cancelled && response?.ok) setRoom(await response.json() as PublicRoom);
    };
    void refresh();
    const id = window.setInterval(refresh, 1200);
    return () => { cancelled = true; window.clearInterval(id); };
  }, [code, token]);

  async function join() {
    const normalized = entryCode.trim().toUpperCase();
    if (normalized.length !== 6) { setMessage('Enter the six-character classroom code.'); return; }
    setBusy(true);
    setMessage('Joining anonymously…');
    const status = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}`, { cache: 'no-store' }).catch(() => null);
    if (!status?.ok) { setBusy(false); setMessage('Classroom not found or unavailable.'); return; }
    const preview = await status.json() as PublicRoom;
    if (!preview.active) { setBusy(false); setMessage('This classroom is closed.'); return; }
    let nextToken = sessionStorage.getItem(tokenKey(normalized)) ?? '';
    if (!nextToken) {
      nextToken = crypto.randomUUID();
      sessionStorage.setItem(tokenKey(normalized), nextToken);
    }
    const response = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}/join`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ participantToken: nextToken }),
    }).catch(() => null);
    if (!response?.ok) { setBusy(false); setMessage('Could not join this classroom.'); return; }
    const saved = JSON.parse(sessionStorage.getItem(answerKey(normalized)) ?? '{}') as { answers?: Record<string, string | string[]>; submitted?: string[] };
    setLocalAnswers(saved.answers ?? {});
    setSubmittedIds(saved.submitted ?? []);
    sessionStorage.setItem(CODE_KEY, normalized);
    setCode(normalized);
    setToken(nextToken);
    setRoom(preview);
    setMessage('You joined anonymously. Your teacher sees class totals and distributions, not which answer is yours.');
    setBusy(false);
  }

  function saveLocal(nextAnswers: Record<string, string | string[]>, nextSubmitted = submittedIds) {
    setLocalAnswers(nextAnswers);
    setSubmittedIds(nextSubmitted);
    if (code) sessionStorage.setItem(answerKey(code), JSON.stringify({ answers: nextAnswers, submitted: nextSubmitted }));
  }

  const question = useMemo(() => {
    if (!room) return null;
    if (room.activity.pacing === 'teacher') return room.currentQuestion;
    return room.activityQuestions[studentIndex] ?? null;
  }, [room, studentIndex]);

  const selected = question ? localAnswers[question.id] : undefined;
  const alreadySubmitted = question ? submittedIds.includes(question.id) : false;

  function choose(optionId: string) {
    if (!question || alreadySubmitted) return;
    let answer: string | string[];
    if (question.kind === 'believe') answer = optionId;
    else if (question.multiSelect) {
      const existing = Array.isArray(selected) ? selected : [];
      answer = existing.includes(optionId) ? existing.filter((id) => id !== optionId) : [...existing, optionId];
    } else answer = [optionId];
    if (Array.isArray(answer) && !answer.length) return;
    saveLocal({ ...localAnswers, [question.id]: answer });
  }

  async function submit() {
    if (!room || !question || selected === undefined || alreadySubmitted) return;
    setBusy(true);
    const response = await fetch(`/api/school/classes/${encodeURIComponent(room.code)}/submit`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ participantToken: token, questionId: question.id, answer: selected }),
    }).catch(() => null);
    if (!response?.ok) {
      const error = response ? await response.json().catch(() => null) as { error?: string } | null : null;
      setMessage(error?.error ?? 'Response could not be submitted.');
      setBusy(false);
      return;
    }
    const nextSubmitted = [...new Set([...submittedIds, question.id])];
    saveLocal(localAnswers, nextSubmitted);
    setMessage('Response received. Your answer was added to the class total without storing a student-to-answer record.');
    setBusy(false);
  }

  if (!code || !token) {
    return (
      <section className="engine-shell school-shell">
        <article className="engine-card school-join-card">
          <p className="engine-kicker">Join classroom</p>
          <h1>Enter the room code.</h1>
          <p className="engine-help">No name, email, username or student ID is required. Your teacher sees how the room answers, not which answer came from you.</p>
          <input className="school-code-input" value={entryCode} maxLength={6} onChange={(event) => setEntryCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} placeholder="ABC234" aria-label="Classroom code" />
          <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy} onClick={join}>{busy ? 'Joining…' : 'Join anonymously'}</button></div>
          {message && <p className="engine-help">{message}</p>}
          <p className="engine-disclaimer">Classroom answers contribute to aggregate room statistics. The classroom backend is designed not to retain a participant-to-answer mapping. Real school/minor deployment requires qualified legal/privacy review.</p>
        </article>
      </section>
    );
  }

  if (!room) return <section className="engine-shell school-shell"><article className="engine-card"><p>Loading classroom…</p></article></section>;

  const studentPacedComplete = room.activity.pacing === 'student' && room.activity.questionIds.every((id) => submittedIds.includes(id));
  const revealForCurrent = room.activity.pacing === 'teacher' && room.revealed && room.currentQuestionId === question?.id;

  return (
    <section className="engine-shell school-shell">
      <div className="school-room-strip"><strong>{room.roomLabel || `Class ${room.code}`}</strong><span>{room.activity.title}</span><span>{room.joinedCount} joined</span></div>
      {message && <p className="school-status-message">{message}</p>}
      {room.status === 'closed' ? (
        <article className="engine-card"><p className="engine-kicker">Session ended</p><h1>This classroom is closed.</h1><p>Your personal Politangle activities remain available in Private Student Mode.</p></article>
      ) : studentPacedComplete ? (
        <article className="engine-card"><p className="engine-kicker">Activity complete</p><h1>All {room.activity.questionIds.length} responses submitted.</h1><p>Your teacher receives the class distribution, not an individual report about you.</p></article>
      ) : question ? (
        <article className="engine-card school-question-card">
          <p className="engine-kicker">{room.activity.pacing === 'teacher' ? `Live question ${room.currentIndex + 1}` : `Question ${studentIndex + 1} of ${room.activity.questionIds.length}`} · {question.title}</p>
          {question.kind === 'believe' ? (
            <><h1>{locale === 'de' ? 'Stimmst du zu?' : locale === 'es' ? '¿Estás de acuerdo?' : locale === 'fr' ? 'Es-tu d’accord ?' : 'Do you agree?'}</h1><div className="engine-statement"><p>{question.sourceItemId && question.polarity ? (locale === 'de' ? germanBeliefStatement(question.sourceItemId, question.polarity) : locale === 'es' || locale === 'fr' ? romanceBeliefStatement(locale, question.sourceItemId, question.polarity) : question.statement) ?? question.statement : question.statement}</p></div></>
          ) : <><h1>{locale === 'de' ? germanLiteracyPrompt(question.id) ?? question.prompt : question.prompt}</h1><p className="engine-help">{locale === 'de' ? 'Dies ist eine Frage zur politischen Bildung. Nach den Antworten kann die richtige Lösung eingeblendet werden.' : 'This is a political-literacy question. A correct answer can be revealed after the class responds.'}</p></>}

          {!alreadySubmitted && (room.activity.pacing === 'student' || room.questionOpen) ? (
            <><div className={question.kind === 'believe' ? 'school-believe-options' : 'deep-options'}>{question.options.map((option) => { const active = Array.isArray(selected) ? selected.includes(option.id) : selected === option.id; const compactLabel = option.id === 'unsure' ? '?' : Number(option.id) > 0 ? `+${option.id}` : option.id.replace('-', '−'); return <button key={option.id} type="button" aria-label={option.label} className={active ? 'deep-option selected' : 'deep-option'} onClick={() => choose(option.id)}>{question.kind === 'believe' ? compactLabel : locale === 'de' ? germanLiteracyOption(option.id, option.label) : option.label}</button>; })}</div>{question.kind === 'believe' && <div className="quick-scale-key"><span><b>−2</b> {locale === 'de' ? 'Stimme gar nicht zu' : 'Strongly disagree'}</span><span><b>0</b> {locale === 'de' ? 'Neutral / kommt darauf an' : 'Neither / depends'}</span><span><b>+2</b> {locale === 'de' ? 'Stimme voll zu' : 'Strongly agree'}</span><span><b>?</b> {locale === 'de' ? 'Unsicher' : 'Not sure'}</span></div>}<div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || selected === undefined || (Array.isArray(selected) && !selected.length)} onClick={submit}>{busy ? (locale === 'de' ? 'Wird gesendet…' : 'Submitting…') : (locale === 'de' ? 'Anonym absenden' : 'Submit anonymously')}</button></div></>
          ) : alreadySubmitted ? <div className="school-submitted"><strong>Response received.</strong><span>Waiting for the class / teacher.</span></div> : <p className="engine-callout">Waiting for your teacher to open this question.</p>}

          {revealForCurrent && room.projectorDistribution && <div className="school-reveal-panel"><p className="engine-kicker">{locale === 'de' ? 'Antworten der Klasse' : 'How the room answered'} · {room.projectorDistribution.responses}</p><DistributionChart data={room.projectorDistribution} />{question.kind === 'literacy' && question.explanation && <div className="deep-explanation"><strong>{locale === 'de' ? 'Erklärung' : 'Explanation'}</strong><br />{locale === 'de' ? germanLiteracyExplanation(question.id, question.explanation) : question.explanation}</div>}</div>}

          {room.activity.pacing === 'student' && alreadySubmitted && <div className="engine-nav"><button type="button" disabled={studentIndex === 0} onClick={() => setStudentIndex((value) => Math.max(0, value - 1))}>Previous</button><span>{submittedIds.filter((id) => room.activity.questionIds.includes(id)).length}/{room.activity.questionIds.length} submitted</span><button type="button" disabled={studentIndex >= room.activity.questionIds.length - 1} onClick={() => setStudentIndex((value) => Math.min(room.activity.questionIds.length - 1, value + 1))}>Next</button></div>}
        </article>
      ) : <article className="engine-card"><p className="engine-kicker">Anonymous lobby</p><h1>You’re in.</h1><p>Waiting for your teacher to launch the next question.</p></article>}
    </section>
  );
}
