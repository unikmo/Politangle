import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'Imprint', robots: { index: false, follow: true }, alternates: { canonical: '/imprint' } };

export default function ImprintPage() {
  return <InfoShell eyebrow="IMPRINT" title="Provider information must be completed before release." intro="Politangle.org has been registered, but the legally responsible operator details were not supplied for this build preview.">
    <InfoSection title="Release blocker"><p className="info-callout">Operator name, legal form, service address, email address, authorized representative and applicable registration/tax details must be inserted and legally reviewed before public commercial release.</p></InfoSection>
  </InfoShell>;
}
