import type { Metadata } from 'next';
import SuccessClient from './SuccessClient';

export const metadata: Metadata = { title: 'Certificate issuance', robots: { index: false, follow: false } };

export default async function CertificateSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id = '' } = await searchParams;
  return <SuccessClient sessionId={session_id} />;
}
