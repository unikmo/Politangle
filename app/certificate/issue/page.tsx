import type { Metadata } from 'next';
import IssueClient from './IssueClient';

export const metadata: Metadata = { title: 'Issue certificate', robots: { index: false, follow: false } };

export default async function CertificateIssuePage({ searchParams }: { searchParams: Promise<{ attempt?: string; renew?: string }> }) {
  const { attempt = '', renew } = await searchParams;
  return <IssueClient attemptId={attempt} renewCertificateId={renew} />;
}
