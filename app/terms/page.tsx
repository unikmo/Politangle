import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'Terms', robots: { index: false, follow: true }, alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return <InfoShell eyebrow="TERMS" title="Pilot terms are not yet finalized." intro="The public Quick assessment is currently offered for evaluation. School licensing and real-student use remain outside the authorized release scope.">
    <InfoSection title="Current scope"><p>Politangle is an educational self-exploration tool, not voting advice, professional advice or a guarantee of political classification accuracy.</p></InfoSection>
    <InfoSection title="Before commercial release"><p className="info-callout">Final terms must identify the operator and accurately cover availability, permitted use, school responsibilities, pricing, cancellation, liability, intellectual property and governing law.</p></InfoSection>
  </InfoShell>;
}
