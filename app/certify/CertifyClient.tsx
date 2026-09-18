'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { localePath, useLocale } from '../LocaleProvider';

type Question = { id: string; section: 'classify' | 'understand'; prompt: string; options: { id: string; label: string }[] };
type Attempt = { attemptId: string; expiresAt: string; questions: Question[] };
type Status = { authenticated: boolean; emailVerified?: boolean; certificationAgeConfirmed?: boolean; readiness: { enabled: boolean; bankReady: boolean; bankVersion: string }; attempts?: { allowed: boolean; remaining: number; nextEligibleAt?: string } };
type Result = { result: { passed: boolean; classify: { correct: number; total: number }; understand: { correct: number; total: number } }; reviews: { id: string; correct: boolean; correctOptionIds?: string[]; explanation?: string }[]; certificateEligible: boolean };

export default function CertifyClient({ renewCertificateId }: { renewCertificateId?: string }) {
  const { locale } = useLocale();
  const [status, setStatus] = useState<Status | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const current = attempt?.questions[index];
  const questionById = useMemo(() => new Map(attempt?.questions.map((question) => [question.id, question]) ?? []), [attempt]);

  useEffect(() => { fetch('/api/certification/status', { cache: 'no-store' }).then((response) => response.json()).then(setStatus).catch(() => setMessage('Certification status is unavailable.')); }, []);

  async function start() {
    setBusy(true); setMessage('');
    const response = await fetch('/api/certification/start', { method: 'POST' });
    const data = await response.json();
    if (response.ok) { setAttempt(data); setIndex(0); setAnswers({}); setResult(null); }
    else setMessage(data.error ?? 'Could not start certification.');
    setBusy(false);
  }

  async function submit() {
    if (!attempt) return;
    setBusy(true); setMessage('');
    const response = await fetch(`/api/certification/attempts/${attempt.attemptId}/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers }) });
    const data = await response.json();
    if (response.ok) setResult(data); else setMessage(data.error ?? 'Could not submit the attempt.');
    setBusy(false);
  }

  if (attempt && current && !result) {
    const selected = answers[current.id]?.[0];
    return <main className="engine-page certification-page certified-play">
      <header className="engine-header"><span>POLITANGLE CERTIFIED TEST · ENGLISH</span><span>{current.section.toUpperCase()} · {index + 1} / {attempt.questions.length}</span></header>
      <section className="engine-shell literacy-shell">
        <div className="engine-progress" aria-label={`${index + 1} of ${attempt.questions.length}`}><span style={{ width: `${((index + 1) / attempt.questions.length) * 100}%` }} /></div>
        <article className="engine-card literacy-card">
          <p className="engine-kicker">{current.section.toUpperCase()} · QUESTION {index + 1}</p>
          <h1 className="literacy-prompt">{current.prompt}</h1>
          <div className="deep-options literacy-options" role="radiogroup" aria-label="Choose one answer">
            {current.options.map((option) => <button type="button" role="radio" aria-checked={selected === option.id} className={selected === option.id ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => setAnswers({ ...answers, [current.id]: [option.id] })}>{option.label}</button>)}
          </div>
        </article>
        <div className="engine-nav literacy-nav"><button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Previous</button><span>{Object.keys(answers).length} / {attempt.questions.length} answered</span>{index === attempt.questions.length - 1 ? <button type="button" disabled={Object.keys(answers).length !== attempt.questions.length || busy} onClick={submit}>Submit test</button> : <button type="button" disabled={!selected} onClick={() => setIndex(index + 1)}>Next</button>}</div>
        {message && <p className="certification-message" role="status">{message}</p>}
      </section>
    </main>;
  }

  if (result) {
    const issueQuery = new URLSearchParams({ attempt: attempt?.attemptId ?? '' });
    if (renewCertificateId) issueQuery.set('renew', renewCertificateId);
    return <main className="engine-page certification-page"><header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>CERTIFIED TEST · RESULT</span></header><section className="engine-shell certification-shell"><article className="engine-card certification-card"><p className="engine-kicker">{result.result.passed ? 'PASSED' : 'NOT YET PASSED'}</p><h1>CLASSIFY {result.result.classify.correct}/25<br/>UNDERSTAND {result.result.understand.correct}/25</h1><p>Both sections require at least 23/25 independently.</p>{result.reviews.filter((review) => !review.correct).map((review) => { const question = questionById.get(review.id); const answer = question?.options.find((option) => review.correctOptionIds?.includes(option.id)); return <div className="certification-review" key={review.id}><strong>{question?.prompt}</strong><p>Best answer: {answer?.label}</p><p>{review.explanation}</p></div>; })}<div className="engine-result-actions">{result.certificateEligible ? <Link className="engine-primary-link" href={`/certificate/issue?${issueQuery.toString()}`}>{renewCertificateId ? 'Renew certificate' : 'Get certificate'}</Link> : <Link className="engine-primary-link" href="/learn">Review and learn</Link>}<Link href="/certify">Certification home</Link></div></article></section></main>;
  }

  const canStart = Boolean(status?.authenticated && status.emailVerified && status.certificationAgeConfirmed && status.readiness.enabled && status.readiness.bankReady && status.attempts?.allowed);
  return <main className="engine-page certification-page">
    <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>POLITICAL LITERACY CERTIFICATE</span><Link href="/account">Account</Link></header>
    <section className="engine-shell certification-shell"><article className="engine-card certification-card">
      <p className="engine-kicker">FREE CERTIFIED ATTEMPT · ENGLISH · 16+</p><h1>Demonstrate political literacy.</h1>
      <p>Complete 25 CLASSIFY and 25 UNDERSTAND questions. You need at least 23 correct in each section. Attempts are free; a personalized certificate costs €9.90 only after you pass.</p>
      <div className="certification-status-list"><span>Signed in</span><strong>{status?.authenticated ? 'Yes' : 'No'}</strong><span>Email verified</span><strong>{status?.emailVerified ? 'Yes' : 'No'}</strong><span>Age requirement</span><strong>{status?.certificationAgeConfirmed ? '16+ confirmed' : 'Not confirmed'}</strong><span>Attempts remaining</span><strong>{status?.attempts?.remaining ?? '—'}</strong><span>Certified bank</span><strong>{status?.readiness.bankReady ? 'Ready' : 'Awaiting final approval'}</strong><span>Release gate</span><strong>{status?.readiness.enabled ? 'Open' : 'Closed'}</strong></div>
      {!status?.authenticated ? <Link className="engine-primary-link" href={localePath(locale, `/account?return=${encodeURIComponent('/certify')}&certification=1`)}>Create free account or sign in</Link> : !status.certificationAgeConfirmed ? <Link className="engine-primary-link" href={localePath(locale, `/account?return=${encodeURIComponent('/certify')}&certification=1`)}>Confirm 16+ for certification</Link> : <button className="engine-primary-link" type="button" disabled={!canStart || busy} onClick={start}>{busy ? 'Preparing…' : 'Start certified attempt'}</button>}
      {!status?.readiness.enabled && <p className="certification-message">Certification infrastructure is installed, but public attempts remain closed until the English bank and launch controls are approved.</p>}
      {message && <p className="certification-message" role="status">{message}</p>}
    </article></section>
  </main>;
}
