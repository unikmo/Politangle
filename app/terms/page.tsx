import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Terms', robots: { index: false, follow: true }, alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return <LocalizedInfoPage page="terms" />;
}
