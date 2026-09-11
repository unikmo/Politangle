import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'Contact', description: 'Contact and pilot information for Politangle.', alternates: { canonical: '/contact' } };

export default function ContactPage() {
  return <InfoShell eyebrow="CONTACT" title="A verified contact channel is the next release dependency." intro="The Politangle.org domain is registered. A monitored project email address must be configured before this preview becomes a public launch.">
    <InfoSection title="School pilots"><p>Controlled school pilots will open only after the privacy, legal and educational validation gates are satisfied. The application route currently records interest without authorizing real-student use.</p></InfoSection>
    <InfoSection title="Required setup"><p className="info-callout">Configure and verify a monitored address such as hello@politangle.org, then add the responsible operator and response expectations here.</p></InfoSection>
  </InfoShell>;
}
