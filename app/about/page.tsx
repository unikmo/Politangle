import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'About', description: 'Why Politangle exists.', alternates: { canonical: '/about' } };

export default function AboutPage() {
  return <LocalizedInfoPage page="about" />;
}
