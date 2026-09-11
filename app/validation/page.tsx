import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'Validation and limitations', description: 'The current evidence status and limitations of Politangle.', alternates: { canonical: '/validation' } };

export default function ValidationPage() {
  return <InfoShell eyebrow="VALIDATION & LIMITATIONS" title="Transparent about what is proven—and what is not." intro="The software and scoring implementation are technically tested. Scientific, cognitive and classroom validation are separate gates and must not be implied by a successful build.">
    <InfoSection title="Current status"><span className="info-status">CANDIDATE ASSESSMENT</span><p>The assessment engine has automated tests for scoring, question counts, result generation and classroom privacy boundaries. This demonstrates implementation consistency, not psychometric validity.</p></InfoSection>
    <InfoSection title="Not yet established"><ul><li>Representative population norms</li><li>Test–retest reliability</li><li>Construct equivalence across languages and age bands</li><li>Cognitive comprehension with intended Junior and Youth users</li><li>Predictive validity for voting or political behaviour</li></ul></InfoSection>
    <InfoSection title="Results must not be overread"><p>Scores are relative indicators produced by the current model. A score such as 61/100 is not a clinical or scientific probability that a person “is” a political ideology. Historical reference figures illustrate traditions; they do not imply endorsement or equivalence.</p></InfoSection>
    <InfoSection title="School release gate"><p className="info-callout"><strong>Real-school use with minors is not yet authorized.</strong> It requires qualified legal review, accessibility testing and age-appropriate content validation.</p></InfoSection>
  </InfoShell>;
}
