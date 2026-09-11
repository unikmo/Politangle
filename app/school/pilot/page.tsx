import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoSection, InfoShell } from '../../InfoShell';

export const metadata: Metadata = { title: 'Controlled school pilot', robots: { index: false, follow: true }, alternates: { canonical: '/school/pilot' } };

export default function SchoolPilotPage() {
  return <InfoShell eyebrow="CONTROLLED SCHOOL PILOT" title="Interested in testing Politangle with educators?" intro="This is an interest and design-partner pathway—not authorization to use the current candidate assessment with real students.">
    <InfoSection title="Who it is for"><p>Secondary-school educators, political-education specialists and researchers interested in anonymous classroom discussion, age-appropriate political literacy and aggregate-only insights.</p></InfoSection>
    <InfoSection title="Current gate"><p className="info-callout">Real-student pilots require qualified legal review, safeguarding and accessibility checks, an approved school agreement and age-band content validation.</p></InfoSection>
    <InfoSection title="Preview the system"><p>Educators may inspect the non-production interface and teacher materials without entering real student information.</p><p><Link href="/school">Explore School mode →</Link></p></InfoSection>
  </InfoShell>;
}
