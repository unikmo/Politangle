import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'Privacy', description: 'Politangle privacy information and current pilot status.', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return <InfoShell eyebrow="PRIVACY" title="Collect less. Explain clearly. Protect political opinions." intro="This page describes the product’s current privacy design. Formal controller details and legally reviewed notices must be completed before commercial or real-school release.">
    <InfoSection title="Release status"><p className="info-callout"><strong>Preview notice:</strong> This is not yet the final legally reviewed privacy notice. Do not use the School pilot with real students until the release gate is complete.</p></InfoSection>
    <InfoSection title="Public assessment"><p>No account is required. The current public assessment keeps answers in the browser session for producing the result. Users should be able to restart and remove that local assessment state.</p></InfoSection>
    <InfoSection title="Classroom design"><p>Students join using temporary identifiers without a name, email, username or roster. Teachers receive aggregate totals and distributions, not a student-to-answer map or individual political profile.</p></InfoSection>
    <InfoSection title="Required before launch"><ul><li>Controller identity and contact</li><li>Purposes and lawful bases</li><li>Hosting, recipients and international transfers</li><li>Retention and deletion periods</li><li>Data-subject rights and supervisory authority</li><li>School controller/processor roles and a DPIA decision</li></ul></InfoSection>
  </InfoShell>;
}
