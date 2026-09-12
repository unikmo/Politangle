import type { Metadata } from 'next';
import LocalizedInfoPage from '../../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Controlled school pilot', robots: { index: false, follow: true }, alternates: { canonical: '/school/pilot' } };

export default function SchoolPilotPage() {
  return <LocalizedInfoPage page="school-pilot" />;
}
