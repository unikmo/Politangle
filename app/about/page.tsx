import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'About', description: 'Why Politangle exists.', alternates: { canonical: '/about' } };

export default function AboutPage() {
  return <InfoShell eyebrow="ABOUT POLITANGLE" title="Political understanding without a single box." intro="Politangle helps people explore political trade-offs, distinguish beliefs from knowledge and discuss disagreement without exposing individual classroom profiles.">
    <InfoSection title="The problem"><p>Political language often collapses complex combinations of views into one label. That can hide meaningful differences and make discussion more tribal than informative.</p></InfoSection>
    <InfoSection title="The approach"><p>Politangle keeps multiple dimensions visible, separates BELIEVE from CLASSIFY and UNDERSTAND, and treats uncertainty as a legitimate response rather than a scoring failure.</p></InfoSection>
    <InfoSection title="Our standard"><p>Neutrality is not claimed merely because multiple viewpoints appear. Question wording, scoring, translations and classroom use must remain open to criticism, testing and revision.</p></InfoSection>
  </InfoShell>;
}
