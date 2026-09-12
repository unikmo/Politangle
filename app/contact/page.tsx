import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Contact', description: 'Contact and pilot information for Politangle.', alternates: { canonical: '/contact' } };

export default function ContactPage() {
  return <LocalizedInfoPage page="contact" />;
}
