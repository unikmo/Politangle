'use client';

import { useEffect, useState } from 'react';

type PhaseSummary = {
  submissions: number;
  overall: number;
  classify: number;
  understand: number;
  detailedAvailable: boolean;
  questions: Record<string, { answered: number; percent: number }> | null;
};

type TeacherSummary = {
  code: string;
  status: 'active' | 'closed';
  createdAt: string;
  minAggregateSize: number;
  baseline: PhaseSummary;
  practiceCompletions: number;
  post: PhaseSummary;
  change: number | null;
  privacy: {
    individualStudentsVisible: false;
    rawLiteracyAnswersStored: false;
    politicalBeliefAnswersAccepted: false;
  };
};

const CODE_KEY = 'politangle.school.teacher.code';
const SECRET_KEY = 'politangle.school.teacher.key';

export default function TeacherSchoolClient() {
  const [code, setCode] = useState('');
  const [teacherKey, setTeacherKey] = useState('');
  const [summary, setSummary] = useState<TeacherSummary | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const storedCode = sessionStorage.getItem(CODE_KEY) ?? '';
    const storedKey = sessionStorage.getItem(SECRET_KEY) ?? '';
    setCode(storedCode);
    setTeacherKey(storedKey);
    if (storedCode && storedKey) void load(storedCode, storedKey);
  }, []);

  function remember(nextCode: string, nextKey: string) {
    sessionStorage.setItem(CODE_KEY, nextCode);
    sessionStorage.setItem(SECRET_KEY, nextKey);
    setCode(nextCode);
    setTeacherKey(nextKey);
  }

  async function createClass() {
    setBusy(true);
    setMessage('Creating anonymous class…');
    const response = await fetch('/api/school/classes', { method: 'POST' }).catch(() => null);
    if (!response?.ok) {
      setBusy(false);
      setMessage('Class could not be created. Firebase configuration may be unavailable in this environment.');
      return;
    }
    const data = await response.json() as { code: string; teacherKey: string };
    remember(data.code, data.teacherKey);
    setMessage('Class created. Keep the teacher key private; students only need the class code.');
    await load(data.code, data.teacherKey);
    setBusy(false);
  }

  async function load(targetCode = code, targetKey = teacherKey) {
    const normalized = targetCode.trim().toUpperCase();
    const secret = targetKey.trim();
    if (!normalized || !secret) {
      setMessage('Enter both the class code and teacher key.');
      return;
    }
    setBusy(true);
    const response = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}`, {
      headers: { authorization: `Bearer ${secret}` },
    }).catch(() => null);
    if (!response?.ok) {
      setSummary(null);
      setBusy(false);
      setMessage('Class dashboard could not be loaded. Check the code and teacher key.');
      return;
    }
    const data = await response.json() as TeacherSummary;
    remember(normalized, secret);
    setSummary(data);
    setMessage('Dashboard refreshed.');
    setBusy(false);
  }

  async function setStatus(status: 'active' | 'closed') {
    if (!summary) return;
    setBusy(true);
    const response = await fetch(`/api/school/classes/${encodeURIComponent(summary.code)}`, {
      method: 'PATCH',
      headers: { authorization: `Bearer ${teacherKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    if (!response?.ok) {
      setMessage('Class status could not be changed.');
      setBusy(false);
      return;
    }
    const data = await response.json() as TeacherSummary;
    setSummary(data);
    setMessage(status === 'closed' ? 'Class closed to new submissions.' : 'Class reopened.');
    setBusy(false);
  }

  function clearLocalTeacherAccess() {
    sessionStorage.removeItem(CODE_KEY);
    sessionStorage.removeItem(SECRET_KEY);
    setCode('');
    setTeacherKey('');
    setSummary(null);
    setMessage('Teacher key removed from this browser session.');
  }

  return (
    <section className="engine-shell">
      <article className="engine-card">
        <p className="engine-kicker">Teacher control</p>
        <h1>Anonymous learning analytics, not political profiling.</h1>
        <p className="engine-help">Create a class code or reopen an existing dashboard with its private teacher key. Politangle School does not expose a student list and the class API does not accept BELIEVE/political-opinion answers.</p>
        <div style={{ display: 'grid', gap: 12, maxWidth: 560, marginTop: 18 }}>
          <label>
            <span>Class code</span>
            <input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} maxLength={6} style={{ display: 'block', padding: 12, width: '100%', marginTop: 6 }} />
          </label>
          <label>
            <span>Teacher key</span>
            <input value={teacherKey} onChange={(event) => setTeacherKey(event.target.value)} style={{ display: 'block', padding: 12, width: '100%', marginTop: 6 }} />
          </label>
        </div>
        <div className="engine-result-actions">
          <button className="engine-primary-link" type="button" disabled={busy} onClick={createClass}>Create anonymous class</button>
          <button className="engine-primary-link" type="button" disabled={busy || !code || !teacherKey} onClick={() => load()}>Open / refresh</button>
          <button className="engine-link-button" type="button" onClick={clearLocalTeacherAccess}>Forget key on this browser</button>
        </div>
        {message && <p className="engine-help">{message}</p>}
      </article>

      {summary && (
        <>
          <article className="engine-card" style={{ marginTop: 18 }}>
            <p className="engine-kicker">Class {summary.code} · {summary.status}</p>
            <h2>Student link</h2>
            <p><code>/school/student?code={summary.code}</code></p>
            <div className="engine-result-actions">
              <button className="engine-primary-link" type="button" disabled={busy} onClick={() => setStatus(summary.status === 'active' ? 'closed' : 'active')}>{summary.status === 'active' ? 'Close class' : 'Reopen class'}</button>
            </div>
          </article>

          <article className="engine-card" style={{ marginTop: 18 }}>
            <p className="engine-kicker">Learning outcomes</p>
            <h2>{summary.change === null ? 'Waiting for baseline and post-test data' : `${summary.change >= 0 ? '+' : ''}${summary.change} class-average points`}</h2>
            <div className="deep-literacy-line"><span>Baseline submissions</span><strong>{summary.baseline.submissions}</strong></div>
            <div className="deep-literacy-line"><span>Baseline overall</span><strong>{summary.baseline.submissions ? `${summary.baseline.overall}%` : '—'}</strong></div>
            <div className="deep-literacy-line"><span>Baseline CLASSIFY</span><strong>{summary.baseline.submissions ? `${summary.baseline.classify}%` : '—'}</strong></div>
            <div className="deep-literacy-line"><span>Baseline UNDERSTAND</span><strong>{summary.baseline.submissions ? `${summary.baseline.understand}%` : '—'}</strong></div>
            <div className="deep-literacy-line"><span>Practice completions</span><strong>{summary.practiceCompletions}</strong></div>
            <div className="deep-literacy-line"><span>Post-test submissions</span><strong>{summary.post.submissions}</strong></div>
            <div className="deep-literacy-line"><span>Post-test overall</span><strong>{summary.post.submissions ? `${summary.post.overall}%` : '—'}</strong></div>
            <div className="deep-literacy-line"><span>Post-test CLASSIFY</span><strong>{summary.post.submissions ? `${summary.post.classify}%` : '—'}</strong></div>
            <div className="deep-literacy-line"><span>Post-test UNDERSTAND</span><strong>{summary.post.submissions ? `${summary.post.understand}%` : '—'}</strong></div>
            <p className="engine-help">Per-question aggregates remain hidden until at least {summary.minAggregateSize} submissions exist for that phase.</p>
          </article>

          {(summary.baseline.detailedAvailable || summary.post.detailedAvailable) && (
            <article className="engine-card" style={{ marginTop: 18 }}>
              <p className="engine-kicker">Question-level class patterns</p>
              <div className="engine-table-wrap">
                <table className="engine-table">
                  <thead><tr><th>Question</th><th>Baseline correct</th><th>Post-test correct</th></tr></thead>
                  <tbody>
                    {Array.from(new Set([
                      ...Object.keys(summary.baseline.questions ?? {}),
                      ...Object.keys(summary.post.questions ?? {}),
                    ])).sort().map((id) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{summary.baseline.questions?.[id] ? `${summary.baseline.questions[id].percent}% (${summary.baseline.questions[id].answered})` : 'Hidden / n.a.'}</td>
                        <td>{summary.post.questions?.[id] ? `${summary.post.questions[id].percent}% (${summary.post.questions[id].answered})` : 'Hidden / n.a.'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          )}

          <article className="engine-card" style={{ marginTop: 18 }}>
            <p className="engine-kicker">Privacy boundary</p>
            <div className="deep-literacy-line"><span>Individual student profiles visible</span><strong>No</strong></div>
            <div className="deep-literacy-line"><span>Raw literacy answer choices stored</span><strong>No</strong></div>
            <div className="deep-literacy-line"><span>Political BELIEVE answers accepted by class API</span><strong>No</strong></div>
            <p className="engine-help">The backend stores anonymous aggregate correctness counts and one-way submission receipts used to avoid duplicate phase submissions. No student names or email addresses are requested.</p>
            <p><strong>REQUIRES QUALIFIED LEGAL REVIEW</strong> before real classroom/minor deployment.</p>
          </article>
        </>
      )}
    </section>
  );
}
