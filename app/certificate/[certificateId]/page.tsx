import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { publicCertificate } from '../../../lib/certificate-server';
import { getAdminDb } from '../../../lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Certificate verification', robots: { index: false, follow: false, nocache: true } };

export default async function CertificatePage({ params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params;
  if (!/^cert_[A-Za-z0-9_-]{32}$/.test(certificateId)) notFound();
  const snapshot = await getAdminDb().collection('certificates').doc(certificateId).get();
  const certificate = snapshot.exists ? publicCertificate(certificateId, snapshot.data() ?? {}) : null;
  if (!certificate) notFound();
  const verificationUrl = `https://politangle.org/certificate/${certificateId}`;
  const qr = await QRCode.toDataURL(verificationUrl, { errorCorrectionLevel: 'H', margin: 1, width: 320, color: { dark: '#2e2118', light: '#fffaf1' } });
  const date = (value: string) => new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
  return <main className="certificate-page-public">
    <nav className="certificate-public-nav"><Link href="/" className="engine-brand">Politangle</Link><span>Certificate verification</span></nav>
    <article className={`certificate-document certificate-${certificate.status.toLowerCase()}`}>
      <div className="certificate-seal" aria-hidden="true">P</div>
      <p className="engine-kicker">POLITANGLE POLITICAL LITERACY CERTIFICATE</p>
      <h1>{certificate.holderName}</h1>
      <p className="certificate-lead">has demonstrated political literacy across classification and understanding.</p>
      <div className="certificate-scores"><div><strong>{certificate.classifyScore}/25</strong><span>CLASSIFY</span></div><div><strong>{certificate.understandScore}/25</strong><span>UNDERSTAND</span></div></div>
      <dl className="certificate-details"><div><dt>Status</dt><dd><span className="certificate-status-dot" />{certificate.status}</dd></div><div><dt>Issued</dt><dd>{date(certificate.issuedAt)}</dd></div><div><dt>Valid until</dt><dd>{date(certificate.expiresAt)}</dd></div><div><dt>Language</dt><dd>{certificate.language.toUpperCase()}</dd></div><div><dt>Bank version</dt><dd>{certificate.bankVersion}</dd></div><div><dt>Certificate ID</dt><dd>{certificate.certificateId}</dd></div></dl>
      <div className="certificate-verification"><img src={qr} alt="QR code linking to this verification page" width="160" height="160" /><p>Scan to verify this exact certificate. The holder name is user-supplied and is not an identity check.</p></div>
      {certificate.status === 'EXPIRED' && <Link className="engine-primary-link certificate-renew" href={`/certify?renew=${encodeURIComponent(certificate.certificateId)}`}>Take reassessment to renew · €13.90</Link>}
    </article>
  </main>;
}
