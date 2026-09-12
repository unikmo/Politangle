import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Validation and limitations', description: 'The current evidence status and limitations of Politangle.', alternates: { canonical: '/validation' } };

export default function ValidationPage() {
  return <LocalizedInfoPage page="validation" />;
}
