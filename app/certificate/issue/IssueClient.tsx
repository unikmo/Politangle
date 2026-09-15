'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Eligibility = {
  eligible: boolean;
  priceCents: number;
  currency: string;
  scores: { classify: { correct: number }; understand: { correct: number } };
};

export default function IssueClient({ attemptId, renewCertificateId }: { attemptId: string; renewCertificateId?: string }) {
  const [eligibility, setEligibility] = useState<Eligibility | null>(null);
  const [holderName, setHolderName] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!attemptId) { setMessage('A passed attempt is required.'); return; }
    fetch(`/api/certificate/eligibility?attemptId=${encodeURIComponent(attemptId)}${renewCertificateId ? `&renew=${encodeURIComponent(renewCertificateId)}` : ''}`, { cache: 'no-store' })
      .then(async (response) => ({ ok: response.ok, data: await response.json() }))
      .then(({ ok, data }) => ok ? setEligibility(data) : setMessage(data.error === 'SIGN_IN_REQUIRED' ? 'Sign in to continue.' : 'This attempt is not eligible for certificate issuance.'))
      .catch(() => setMessage('Certificate eligibility is temporarily unavailable.'));
  }, [attemptId, renewCertificateId]);

  async function checkout(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true); setMessage('');
    const response = await fetch('/api/certificate/checkout', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptId, holderName, verificationAcknowledged: acknowledged, renewCertificateId }),
    });
    const data = await response.json();
    if (response.ok && typeof data.url === 'string') window.location.assign(data.url);
    else {
      const messages: Record<string, string> = {
        TAX_CONFIGURATION_NOT_APPROVED: 'Payment is not open yet. Stripe tax settings must be approved before launch.',
        VERIFICATION_ACKNOWLEDGEMENT_REQUIRED: 'Please acknowledge how certificate verification works.',
        INVALID_CERTIFICATE_DETAILS: 'Enter the name you want shown on the certificate.',
      };
      setMessage(messages[data.error] ?? 'Checkout is temporarily unavailable.'); setBusy(false);
    }
  }

  const formattedPrice = eligibility ? new Intl.NumberFormat('en', { style: 'currency', currency: eligibility.currency }).format(eligibility.priceCents / 100) : '—';
  return <main className="engine-page certification-page">
    <header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>CERTIFICATE ISSUANCE</span><Link href="/account">Account</Link></header>
    <section className="engine-shell certification-shell"><article className="engine-card certification-card">
      <p className="engine-kicker">{renewCertificateId ? 'TWO-YEAR RENEWAL' : 'PERSONALIZED CERTIFICATE'}</p>
      <h1>{renewCertificateId ? 'Renew your certificate.' : 'Issue your certificate.'}</h1>
      <p>Your name is supplied by you and is not identity-verified. Payment is requested only after both test sections have been passed.</p>
      {eligibility && <div className="certification-status-list"><span>CLASSIFY</span><strong>{eligibility.scores.classify.correct}/25</strong><span>UNDERSTAND</span><strong>{eligibility.scores.understand.correct}/25</strong><span>Price</span><strong>{formattedPrice}</strong><span>Validity</span><strong>2 years</strong></div>}
      {eligibility && <form className="certification-form" onSubmit={checkout}>
        <label><span>NAME TO PRINT ON CERTIFICATE</span><input type="text" autoComplete="name" maxLength={80} required value={holderName} onChange={(event) => setHolderName(event.target.value)} /></label>
        <label className="certification-check"><input type="checkbox" required checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} /><span>I understand that anyone with the certificate’s exact QR code or verification link can see this name, both scores, issue and expiry dates, language, bank version, and validity status.</span></label>
        <p className="certificate-privacy-note">There is no public name search or certificate directory. Email and account details never appear on the verification page.</p>
        <p className="certificate-privacy-note">Because the certificate is personalized and issued immediately, it is not refundable after issuance except where applicable law requires otherwise or the service is defective.</p>
        <button className="engine-primary-link" type="submit" disabled={busy || holderName.trim().length < 2 || !acknowledged}>{busy ? 'Opening secure checkout…' : `Continue to payment · ${formattedPrice}`}</button>
      </form>}
      {message && <p className="certification-message" role="status">{message}</p>}
    </article></section>
  </main>;
}
