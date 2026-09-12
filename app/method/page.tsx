import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Method', description: 'How Politangle turns answers into a multidimensional political profile.', alternates: { canonical: '/method' } };

export default function MethodPage() {
  return <LocalizedInfoPage page="method" />;
}
