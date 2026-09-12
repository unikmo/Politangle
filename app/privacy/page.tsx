import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Privacy', description: 'Politangle privacy information and current pilot status.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return <LocalizedInfoPage page="privacy" />;
}
