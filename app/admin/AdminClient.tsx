'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Overview = {
  release: { enabled: boolean; bankReady: boolean; bankVersion: string; blockers: string[] };
  counts: Record<string, number>;
  questions: { total: number; byStatus: Record<string, number> };
  countries: { drafts: { name: string; slug: string; status: string; blockers: number }[]; queued: string[] };
};

export default function AdminClient() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [message, setMessage] = useState('Loading protected overview…');
  useEffect(() => { fetch('/api/admin/overview', { cache: 'no-store' }).then(async (response) => ({ ok: response.ok, data: await response.json() })).then(({ ok, data }) => { if (ok) { setOverview(data); setMessage(''); } else setMessage('Admin access is required. Add your Firebase UID to POLITANGLE_ADMIN_UIDS or use an admin custom claim.'); }).catch(() => setMessage('The admin overview is unavailable.')); }, []);
  return <main className="engine-page admin-page"><header className="engine-header"><Link href="/" className="engine-brand">Politangle Admin</Link><span>PRIVATE OPERATIONS</span><Link href="/account">Account</Link></header><section className="engine-shell admin-shell">{message && <article className="engine-card"><h1>Admin dashboard</h1><p role="status">{message}</p></article>}{overview && <>
    <article className="engine-card"><p className="engine-kicker">RELEASE CONTROL</p><h1>{overview.release.enabled && overview.release.bankReady ? 'Certification ready' : 'Certification remains closed'}</h1><div className="certification-status-list"><span>Release switch</span><strong>{overview.release.enabled ? 'Open' : 'Closed'}</strong><span>Bank</span><strong>{overview.release.bankReady ? 'Validated' : 'Not validated'}</strong><span>Version</span><strong>{overview.release.bankVersion}</strong></div></article>
    <div className="admin-metrics">{Object.entries(overview.counts).map(([label, value]) => <article key={label}><strong>{value}</strong><span>{label.replace(/([A-Z])/g, ' $1')}</span></article>)}</div>
    <article className="engine-card admin-panel"><p className="engine-kicker">QUESTION BANK</p><h2>{overview.questions.total} master-bank records</h2><div className="admin-statuses">{Object.entries(overview.questions.byStatus).map(([status, count]) => <span key={status}><strong>{count}</strong>{status}</span>)}</div><p>The dashboard reports validation state but cannot silently approve questions. Final approval remains a versioned founder/editorial action.</p></article>
    <article className="engine-card admin-panel"><p className="engine-kicker">COUNTRIES</p><h2>Editorial queue</h2><div className="admin-country-list">{overview.countries.drafts.map((country) => <Link key={country.slug} href={`/countries/${country.slug}`}><strong>{country.name}</strong><span>{country.status} · {country.blockers} incomplete sections</span></Link>)}</div>{overview.countries.queued.length > 0 && <p>Queued: {overview.countries.queued.join(' · ')}</p>}</article>
    {overview.release.blockers.length > 0 && <article className="engine-card admin-panel"><p className="engine-kicker">BANK BLOCKERS</p><ul>{overview.release.blockers.slice(0, 20).map((blocker) => <li key={blocker}>{blocker}</li>)}</ul>{overview.release.blockers.length > 20 && <p>Plus {overview.release.blockers.length - 20} additional blockers.</p>}</article>}
  </>}</section></main>;
}
