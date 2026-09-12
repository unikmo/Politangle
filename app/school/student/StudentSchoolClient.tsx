'use client';

import { useEffect, useMemo, useState } from 'react';
import { germanBeliefStatement } from '../../../lib/german-believe';
import { romanceBeliefStatement } from '../../../lib/romance-believe';
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt } from '../../../lib/german-literacy';
import { useLocale, type Locale } from '../../LocaleProvider';
import { studentUi } from './student-native';

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

function beliefAria(locale: Locale, id: string) {
  const labels: Record<Locale, Record<string, string>> = {
    en: { '-2':'Strongly disagree', '-1':'Disagree', '0':'Neither / depends', '1':'Agree', '2':'Strongly agree', unsure:'Not sure' },
    de: { '-2':'Stimme gar nicht zu', '-1':'Stimme eher nicht zu', '0':'Teils teils / kommt darauf an', '1':'Stimme eher zu', '2':'Stimme völlig zu', unsure:'Unsicher' },
    es: { '-2':'Totalmente en desacuerdo', '-1':'Más bien en desacuerdo', '0':'Neutral / depende', '1':'Más bien de acuerdo', '2':'Totalmente de acuerdo', unsure:'No estoy seguro' },
    fr: { '-2':'Pas du tout d’accord', '-1':'Plutôt pas d’accord', '0':'Neutre / cela dépend', '1':'Plutôt d’accord', '2':'Tout à fait d’accord', unsure:'Je ne sais pas' },
  };
  return labels[locale][id] ?? id;
}

function DistributionChart({ data, locale, question }: { data: Distribution; locale: Locale; question: ClassroomQuestion | null }) {
  return (
    <div className="school-distribution" aria-label={`${studentUi(locale).roomAnswers}: ${data.title}`}>
      {data.distribution.map((row) => {
        const label = question?.kind === 'believe'
          ? beliefAria(locale, row.id)
          : locale === 'de' && question
            ? germanLiteracyOption(row.id, row.label)
            : row.label;
        return (
          <div className="school-bar-row" key={row.id}>
            <div className="school-bar-label"><span>{label}</span><strong>{row.percent}% · {row.count}</strong></div>
            <div className="school-bar-track"><span style={{ width: `${row.percent}%` }} /></div>
          </div>
        );
      })}
    </div>
  );
}

export default function StudentSchoolClient({ initialCode }: { initialCode: string }) {
  const { locale } = useLocale();
  const ui = studentUi(locale);
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
    if (normalized.length !== 6) { setMessage(ui.badCode); return; }
    setBusy(true);
    setMessage(ui.joining);
    const status = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}`, { cache: 'no-store' }).catch(() => null);
    if (!status?.ok) { setBusy(false); setMessage(ui.notFound); return; }
    const preview = await status.json() as PublicRoom;
    if (!preview.active) { setBusy(false); setMessage(ui.closed); return; }
    let nextToken = sessionStorage.getItem(tokenKey(normalized)) ?? '';
    if (!nextToken) {
      nextToken = crypto.randomUUID();
      sessionStorage.setItem(tokenKey(normalized), nextToken);
    }
    const response = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}/join`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ participantToken: nextToken }),
    }).catch(() => null);
    if (!response?.ok) { setBusy(false); setMessage(ui.joinFailed); return; }
    const saved = JSON.parse(sessionStorage.getItem(answerKey(normalized)) ?? '{}') as { answers?: Record<string, string | string[]>; submitted?: string[] };
    setLocalAnswers(saved.answers ?? {});
    setSubmittedIds(saved.submitted ?? []);
    sessionStorage.setItem(CODE_KEY, normalized);
    setCode(normalized);
    setToken(nextToken);
    setRoom(preview);
    setMessage(ui.joined);
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
      setMessage(locale === 'en' && error?.error ? error.error : ui.responseFailed);
      setBusy(false);
      return;
    }
    const nextSubmitted = [...new Set([...submittedIds, question.id])];
    saveLocal(localAnswers, nextSubmitted);
    setMessage(ui.received);
    setBusy(false);
  }

  if (!code || !token) {
    return (
      <section className="engine-shell school-shell">
        <article className="engine-card school-join-card">
          <p className="engine-kicker">{ui.joinKicker}</p>
          <h1>{ui.joinTitle}</h1>
          <p className="engine-help">{ui.joinHelp}</p>
          <input className="school-code-input" value={entryCode} maxLength={6} onChange={(event) => setEntryCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} placeholder="ABC234" aria-label={ui.codeAria} />
          <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy} onClick={join}>{busy ? ui.joining : ui.join}</button></div>
          {message && <p className="engine-help">{message}</p>}
          <p className="engine-disclaimer">{ui.privacyDisclaimer}</p>
        </article>
      </section>
    );
  }

  if (!room) return <section className="engine-shell school-shell"><article className="engine-card"><p>{ui.loading}</p></article></section>;

  const studentPacedComplete = room.activity.pacing === 'student' && room.activity.questionIds.every((id) => submittedIds.includes(id));
  const revealForCurrent = room.activity.pacing === 'teacher' && room.revealed && room.currentQuestionId === question?.id;
  const localizedQuestionTitle = question?.kind === 'believe' && question.construct ? question.construct.replaceAll('-', ' ') : question?.title;

  return (
    <section className="engine-shell school-shell">
      <div className="school-room-strip"><strong>{room.roomLabel || ui.classLabel(room.code)}</strong><span>{room.activity.title}</span><span>{ui.joinedCount(room.joinedCount)}</span></div>
      {message && <p className="school-status-message">{message}</p>}
      {room.status === 'closed' ? (
        <article className="engine-card"><p className="engine-kicker">{ui.sessionEnded}</p><h1>{ui.closedTitle}</h1><p>{ui.closedText}</p></article>
      ) : studentPacedComplete ? (
        <article className="engine-card"><p className="engine-kicker">{ui.complete}</p><h1>{ui.completeTitle(room.activity.questionIds.length)}</h1><p>{ui.completeText}</p></article>
      ) : question ? (
        <article className="engine-card school-question-card">
          <p className="engine-kicker">{room.activity.pacing === 'teacher' ? ui.liveQuestion(room.currentIndex + 1) : ui.questionOf(studentIndex + 1, room.activity.questionIds.length)} · {localizedQuestionTitle}</p>
          {question.kind === 'believe' ? (
            <div className="engine-statement"><p>{question.sourceItemId && question.polarity ? (locale === 'de' ? germanBeliefStatement(question.sourceItemId, question.polarity) : locale === 'es' || locale === 'fr' ? romanceBeliefStatement(locale, question.sourceItemId, question.polarity) : question.statement) ?? question.statement : question.statement}</p></div>
          ) : <><h1>{locale === 'de' ? germanLiteracyPrompt(question.id) ?? question.prompt : question.prompt}</h1>{ui.literacyNotice && <p className="engine-help">{ui.literacyNotice}</p>}</>}

          {!alreadySubmitted && (room.activity.pacing === 'student' || room.questionOpen) ? (
            <>
              <div className={question.kind === 'believe' ? 'school-believe-options' : 'deep-options'}>
                {question.options.map((option) => {
                  const active = Array.isArray(selected) ? selected.includes(option.id) : selected === option.id;
                  const compactLabel = option.id === 'unsure' ? '?' : Number(option.id) > 0 ? `+${option.id}` : option.id.replace('-', '−');
                  const label = question.kind === 'believe' ? beliefAria(locale, option.id) : locale === 'de' ? germanLiteracyOption(option.id, option.label) : option.label;
                  return <button key={option.id} type="button" aria-label={label} className={active ? 'deep-option selected' : 'deep-option'} onClick={() => choose(option.id)}>{question.kind === 'believe' ? compactLabel : label}</button>;
                })}
              </div>
              {question.kind === 'believe' && <div className="quick-scale-key"><span><b>−2</b> {ui.scale[0]}</span><span><b>0</b> {ui.scale[1]}</span><span><b>+2</b> {ui.scale[2]}</span><span><b>?</b> {ui.scale[3]}</span></div>}
              <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || selected === undefined || (Array.isArray(selected) && !selected.length)} onClick={submit}>{busy ? ui.submitting : ui.submit}</button></div>
            </>
          ) : alreadySubmitted ? <div className="school-submitted"><strong>{ui.submitted}</strong><span>{ui.waitingClass}</span></div> : <p className="engine-callout">{ui.waitingOpen}</p>}

          {revealForCurrent && room.projectorDistribution && <div className="school-reveal-panel"><p className="engine-kicker">{ui.roomAnswers} · {room.projectorDistribution.responses}</p><DistributionChart data={room.projectorDistribution} locale={locale} question={question} />{question.kind === 'literacy' && question.explanation && <div className="deep-explanation"><strong>{ui.explanation}</strong><br />{locale === 'de' ? germanLiteracyExplanation(question.id, question.explanation) : question.explanation}</div>}</div>}

          {room.activity.pacing === 'student' && alreadySubmitted && <div className="engine-nav"><button type="button" disabled={studentIndex === 0} onClick={() => setStudentIndex((value) => Math.max(0, value - 1))}>{ui.previous}</button><span>{ui.submittedCount(submittedIds.filter((id) => room.activity.questionIds.includes(id)).length, room.activity.questionIds.length)}</span><button type="button" disabled={studentIndex >= room.activity.questionIds.length - 1} onClick={() => setStudentIndex((value) => Math.min(room.activity.questionIds.length - 1, value + 1))}>{ui.next}</button></div>}
        </article>
      ) : <article className="engine-card"><p className="engine-kicker">{ui.lobby}</p><h1>{ui.inTitle}</h1><p>{ui.inText}</p></article>}
    </section>
  );
}
