import type { Metadata } from 'next';
import CertifyClient from './CertifyClient';

export const metadata: Metadata = { title: 'Political Literacy Certificate', description: 'Take the free Politangle certified political-literacy assessment. Certificate issuance is available only after passing.', alternates: { canonical: '/certify' } };

export default async function CertifyPage({ searchParams }: { searchParams: Promise<{ renew?: string }> }) {
  const { renew } = await searchParams;
  return <CertifyClient renewCertificateId={typeof renew === 'string' ? renew : undefined} />;
}
