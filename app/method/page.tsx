import type { Metadata } from 'next';
import { InfoSection, InfoShell } from '../InfoShell';

export const metadata: Metadata = { title: 'Method', description: 'How Politangle turns answers into a multidimensional political profile.', alternates: { canonical: '/method' } };

export default function MethodPage() {
  return <InfoShell eyebrow="METHOD" title="A map of patterns—not a verdict." intro="Politangle separates political questions into distinct dimensions, then shows how your answers combine without forcing every position onto one left–right line.">
    <InfoSection title="What Quick measures"><p>Quick uses 26 statements selected across the assessment constructs. Each screen presents one statement and a five-point agreement scale from −2 to +2, plus “Not sure”. Not-sure answers are excluded rather than treated as neutral.</p></InfoSection>
    <InfoSection title="The eight axes"><ul><li>Economic role</li><li>Ownership</li><li>Social values</li><li>Authority</li><li>Pluralism</li><li>World cooperation</li><li>Nationhood</li><li>Ecology</li></ul><p>Each axis is displayed separately so support for one position does not erase a different position elsewhere.</p></InfoSection>
    <InfoSection title="Quick and Full"><p><strong>Quick 26</strong> provides a first reading. The adult <strong>Full 42</strong> adds 16 items for greater depth. The Youth candidate form uses one statement per screen and therefore has a different screen count; it is versioned separately.</p></InfoSection>
    <InfoSection title="Interpretation"><p>Family matches describe resemblance to broad political traditions. They are not party recommendations, diagnoses or claims about identity. The detailed axes should be read before any family label.</p><p className="info-callout">Politangle is an educational and exploratory tool. It does not tell you what to believe or how to vote.</p></InfoSection>
  </InfoShell>;
}
