'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SuccessClient({ sessionId }: { sessionId: string }) {
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [message, setMessage] = useState('Confirming payment and issuing your certificate…');

  useEffect(() => {
    if (!sessionId) { setMessage('The checkout session is missing.'); return; }
    let active = true; let timer: ReturnType<typeof setTimeout>;
    async function check(remaining: number) {
      const response = await fetch(`/api/certificate/checkout/status?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' });
      const data = await response.json();
      if (!active) return;
      if (response.ok && data.status === 'issued' && data.certificateId) { setCertificateId(data.certificateId); setMessage('Your certificate is ready.'); return; }
      if (remaining > 0 && response.ok) timer = setTimeout(() => check(remaining - 1), 1500);
      else setMessage(response.ok ? 'Payment was received, but issuance is still processing. Refresh this page shortly.' : 'We could not confirm this checkout. Sign in with the purchasing account and try again.');
    }
    check(12).catch(() => setMessage('Certificate issuance is still processing. Refresh this page shortly.'));
    return () => { active = false; clearTimeout(timer); };
  }, [sessionId]);

  return <main className="engine-page certification-page"><header className="engine-header"><Link href="/" className="engine-brand">Politangle</Link><span>CERTIFICATE ISSUANCE</span></header><section className="engine-shell certification-shell"><article className="engine-card certification-card"><p className="engine-kicker">PAYMENT RETURN</p><h1>{certificateId ? 'Certificate issued.' : 'Finishing securely.'}</h1><p role="status">{message}</p>{certificateId && <div className="engine-result-actions"><Link className="engine-primary-link" href={`/certificate/${certificateId}`}>View certificate</Link><Link href="/">Return home</Link></div>}</article></section></main>;
}
