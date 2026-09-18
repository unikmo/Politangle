'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type ReviewDecision = 'approve' | 'revise' | 'replace' | 'hold';
type Question = {
  id: string;
  section: 'classify' | 'understand';
  prompt: string;
  options: { id: string; label: string }[];
  acceptedAnswerSets: readonly (readonly string[])[];
  explanation: string;
  evidenceIds: readonly string[];
  difficulty: string;
  blueprintBucket: string;
  editorialNote: string;
  contentFingerprint: string;
  review: { decision: ReviewDecision; note: string; reviewedAt: string; current: boolean } | null;
};
type Payload = { bankVersion: string; total: number; reviewed: number; approved: number; allReviewed: boolean; allApproved: boolean; questions: Question[] };

export default function LiteracyReviewClient() {
  const [data, setData] = useState<Payload | null>(null);
  const [message, setMessage] = useState('Loading founder review…');
  const [filter, setFilter] = useState<'all' | 'unreviewed' | 'classify' | 'understand'>('unreviewed');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState('');

  async function load() {
    const response = await fetch('/api/admin/literacy-review', { cache: 'no-store' });
    const payload = await response.json();
    if (!response.ok) { setMessage(payload.error === 'ADMIN_REQUIRED' ? 'Admin access is required.' : 'Review data is unavailable.'); return; }
    setData(payload);
    setNotes(Object.fromEntries(payload.questions.map((question: Question) => [question.id, question.review?.note ?? ''])));
    setMessage('');
  }

  useEffect(() => { void load(); }, []);

  const questions = useMemo(() => {
    if (!data) return [];
    if (filter === 'unreviewed') return data.questions.filter((question) => !question.review?.current);
    if (filter === 'classify' || filter === 'understand') return data.questions.filter((question) => question.section === filter);
    return data.questions;
  }, [data, filter]);

  async function decide(questionId: string, decision: ReviewDecision) {
    setBusy(questionId); setMessage('');
    const response = await fetch('/api/admin/literacy-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, decision, note: notes[questionId] ?? '' }),
    });
    const payload = await response.json();
    if (!response.ok) setMessage(payload.error ?? 'Could not save review.');
    else await load();
    setBusy('');
  }

  return <main className="engine-page admin-page">
    <header className="engine-header"><Link href="/admin" className="engine-brand">Politangle Admin</Link><span>FOUNDER REVIEW</span><Link href="/account">Account</Link></header>
    <section className="engine-shell admin-shell founder-review-shell">
      <article className="engine-card admin-panel">
        <p className="engine-kicker">CERTIFICATION BANK</p>
        <h1>Review all 80 questions.</h1>
        <p>This records founder decisions against the exact content fingerprint. Approval here does <strong>not</strong> mark a question validated or open certification; the later evidence gates remain separate.</p>
        {data && <div className="admin-statuses"><span><strong>{data.reviewed}/{data.total}</strong>reviewed</span><span><strong>{data.approved}/{data.total}</strong>approved</span><span><strong>{data.allApproved ? 'YES' : 'NO'}</strong>all approved</span></div>}
        <div className="founder-review-filters">
          {(['unreviewed','all','classify','understand'] as const).map((value) => <button key={value} className={filter === value ? 'active' : ''} type="button" onClick={() => setFilter(value)}>{value}</button>)}
        </div>
        {message && <p role="status">{message}</p>}
      </article>

      {questions.map((question) => {
        const accepted = new Set(question.acceptedAnswerSets.flat());
        return <article className="engine-card admin-panel founder-review-card" key={question.id}>
          <div className="founder-review-meta"><span>{question.id}</span><span>{question.section}</span><span>{question.difficulty}</span><span>{question.blueprintBucket}</span>{question.review?.current && <span className="review-current">{question.review.decision}</span>}</div>
          <h2>{question.prompt}</h2>
          <div className="founder-review-options">{question.options.map((option) => <div className={accepted.has(option.id) ? 'accepted' : ''} key={option.id}><b>{option.id}</b><span>{option.label}</span>{accepted.has(option.id) && <strong>Accepted</strong>}</div>)}</div>
          <div className="founder-review-explanation"><strong>Explanation</strong><p>{question.explanation}</p></div>
          <div className="founder-review-explanation"><strong>Internal editorial note</strong><p>{question.editorialNote}</p></div>
          <p className="founder-review-evidence">Evidence IDs: {question.evidenceIds.join(' · ')}</p>
          <label className="founder-review-note"><span>Founder note</span><textarea value={notes[question.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [question.id]: event.target.value }))} /></label>
          <div className="founder-review-actions">
            {(['approve','revise','replace','hold'] as const).map((decision) => <button disabled={busy === question.id} type="button" key={decision} className={question.review?.current && question.review.decision === decision ? 'active' : ''} onClick={() => void decide(question.id, decision)}>{decision}</button>)}
          </div>
        </article>;
      })}
    </section>
  </main>;
}
