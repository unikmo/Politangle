'use client';

import { useEffect, useState } from 'react';
import TeacherSchoolClient from './TeacherSchoolClient';

type LicenseInfo = {
  schoolId: string;
  schoolName: string;
  seatNumber: number;
  seatLabel: string;
};

type LicenseStatus = { active: false } | { active: true; license: LicenseInfo };

export default function TeacherLicenseGate() {
  const [status, setStatus] = useState<LicenseStatus | null>(null);
  const [licenseKey, setLicenseKey] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { void refresh(); }, []);

  async function refresh() {
    const response = await fetch('/api/school/license/status', { cache: 'no-store' }).catch(() => null);
    if (!response?.ok) { setStatus({ active: false }); setMessage('Teacher license could not be verified.'); return; }
    setStatus(await response.json() as LicenseStatus);
  }

  async function activate() {
    if (!licenseKey.trim()) return;
    setBusy(true); setMessage('Checking teacher license…');
    const response = await fetch('/api/school/license/activate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ licenseKey }),
    }).catch(() => null);
    if (!response?.ok) {
      const error = response ? await response.json().catch(() => null) as { error?: string } | null : null;
      setMessage(error?.error ?? 'Teacher license could not be verified.');
      setBusy(false);
      return;
    }
    const next = await response.json() as LicenseStatus;
    setStatus(next); setLicenseKey(''); setMessage('Teacher license active for this browser session.'); setBusy(false);
  }

  async function forget() {
    setBusy(true);
    await fetch('/api/school/license/activate', { method: 'DELETE' }).catch(() => null);
    setStatus({ active: false }); setMessage('Teacher license removed from this browser session.'); setBusy(false);
  }

  if (status === null) return <section className="engine-shell school-shell"><article className="engine-card school-config-card"><p className="engine-kicker">Teacher access</p><h2>Checking school license…</h2></article></section>;

  if (!status.active) {
    return (
      <section className="engine-shell school-shell">
        <article className="engine-card school-config-card">
          <p className="engine-kicker">Teacher access</p>
          <h1>Enter your school teacher license</h1>
          <p>A school pack is <strong>$300 for 10 teacher licenses</strong>. Your teacher license unlocks classroom creation; students still join anonymously with the temporary session code you generate.</p>
          <div className="school-config-grid">
            <label><span>Teacher license</span><input value={licenseKey} onChange={(event) => setLicenseKey(event.target.value)} placeholder="POL-EDU-…" autoComplete="off" spellCheck={false} /></label>
          </div>
          <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy || !licenseKey.trim()} onClick={activate}>Use teacher license</button></div>
          {message && <p className="school-status-message">{message}</p>}
          <p className="engine-help">No teacher name, student roster or student account is required by this access step. The license is kept only as a secure browser-session credential.</p>
        </article>
      </section>
    );
  }

  return (
    <>
      <section className="engine-shell school-shell no-print">
        <div className="school-room-strip"><strong>{status.license.schoolName}</strong><span>{status.license.seatLabel}</span><span>licensed teacher access</span><button className="engine-link-button" type="button" disabled={busy} onClick={forget}>Use another license</button></div>
        {message && <p className="school-status-message">{message}</p>}
      </section>
      <TeacherSchoolClient />
    </>
  );
}
