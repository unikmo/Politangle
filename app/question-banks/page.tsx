import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'Question-bank versions', description: 'Politangle adult, youth and junior question-bank versions.', alternates: { canonical: '/question-banks' } };

export default function QuestionBanksPage() {
  return <InfoShell eyebrow="QUESTION-BANK VERSIONS" title="Different audiences. Separate, traceable forms." intro="Language translation does not silently change country context, scoring constructs or the adult assessment. Material revisions receive a distinct version.">
    <InfoSection title="Adult"><table className="info-table"><tbody><tr><th>Quick</th><td>26 statements</td></tr><tr><th>Full</th><td>42 statements total</td></tr><tr><th>Status</th><td>Adult assessment preserved as its own form</td></tr></tbody></table></InfoSection>
    <InfoSection title="Youth 14–18"><p>A candidate plain-language form covering the same underlying constructs. Paired viewpoints are shown as separate one-statement screens to reduce cognitive load. Construct equivalence still requires validation.</p></InfoSection>
    <InfoSection title="Junior 10–13"><p>A separately versioned candidate bank designed for shorter, simpler classroom prompts, including social-media and populism learning contexts. It must be tested with intended users before real-school release.</p></InfoSection>
    <InfoSection title="Languages"><p>English, German, Spanish and French are language layers—not country profiles. Country-specific examples, elections, parties or advertising layers would require separate future versions.</p></InfoSection>
  </InfoShell>;
}
