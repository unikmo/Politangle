import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Imprint', robots: { index: false, follow: true }, alternates: { canonical: '/imprint' } };

export default function ImprintPage() {
  return <LocalizedInfoPage page="imprint" />;
}
