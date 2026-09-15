'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type Session = { authenticated: boolean; user?: { emailVerified: boolean; adultConfirmed: boolean } | null };

async function firebasePassword(endpoint: 'signUp' | 'signInWithPassword', email: string, password: string) {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) throw new Error('Firebase sign-in is not configured on this deployment.');
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${encodeURIComponent(key)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const data = await response.json();
  if (!response.ok || typeof data.idToken !== 'string') throw new Error(data.error?.message?.replaceAll('_', ' ') ?? 'Authentication failed.');
  return data.idToken as string;
}

async function sendVerificationEmail(idToken: string) {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) return;
  await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(key)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken }),
  });
}

export default function AccountClient() {
  const [mode, setMode] = useState<'sign-in' | 'create'>('sign-in');
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { fetch('/api/auth/session', { cache: 'no-store' }).then((response) => response.json()).then(setSession).catch(() => setSession({ authenticated: false })); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage('');
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    const adultConfirmed = form.get('adult') === 'on';
    try {
      if (!adultConfirmed) throw new Error('Certification accounts require confirmation that you are at least 18.');
      const idToken = await firebasePassword(mode === 'create' ? 'signUp' : 'signInWithPassword', email, password);
      if (mode === 'create') await sendVerificationEmail(idToken);
      const response = await fetch('/api/auth/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken, adultConfirmed: true }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Could not start a secure session.');
      setSession({ authenticated: true, user: { emailVerified: data.emailVerified === true, adultConfirmed: true } });
      setMessage(mode === 'create' ? 'Account created. Check your email and verify it before starting certification.' : 'Signed in securely.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed.');
    } finally { setBusy(false); }
  }

  async function signOut() {
    await fetch('/api/auth/session', { method: 'DELETE' });
    setSession({ authenticated: false }); setMessage('Signed out.');
  }

  return <main className="engine-page certification-page">
    <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>CERTIFICATION ACCOUNT · 18+</span><Link href="/certify">Certification</Link></header>
    <section className="engine-shell certification-shell">
      <article className="engine-card certification-card">
        <p className="engine-kicker">SECURE ACCOUNT</p>
        <h1>{session?.authenticated ? 'Your certification account' : mode === 'create' ? 'Create your account' : 'Sign in'}</h1>
        {session?.authenticated ? <>
          <p>Your account session is active. Certification requires a verified email and your declaration that you are at least 18.</p>
          <div className="certification-status-list"><span>Email verified</span><strong>{session.user?.emailVerified ? 'Yes' : 'Not yet'}</strong><span>18+ confirmed</span><strong>{session.user?.adultConfirmed ? 'Yes' : 'No'}</strong></div>
          <div className="engine-result-actions"><Link className="engine-primary-link" href="/certify">Continue to certification</Link><button className="engine-link-button" type="button" onClick={signOut}>Sign out</button></div>
        </> : <>
          <p>Practice remains free without an account. An account is required only for controlled certification attempts and certificates.</p>
          <form className="certification-form" onSubmit={submit}>
            <label><span>Email</span><input required type="email" name="email" autoComplete="email" /></label>
            <label><span>Password</span><input required minLength={8} type="password" name="password" autoComplete={mode === 'create' ? 'new-password' : 'current-password'} /></label>
            <label className="certification-check"><input required type="checkbox" name="adult" /><span>I confirm that I am at least 18 years old.</span></label>
            <button className="engine-primary-link" disabled={busy} type="submit">{busy ? 'Please wait…' : mode === 'create' ? 'Create account' : 'Sign in'}</button>
          </form>
          <button className="engine-link-button certification-mode" type="button" onClick={() => setMode(mode === 'create' ? 'sign-in' : 'create')}>{mode === 'create' ? 'Already have an account? Sign in' : 'Need an account? Create one'}</button>
        </>}
        {message && <p className="certification-message" role="status">{message}</p>}
      </article>
    </section>
  </main>;
}
