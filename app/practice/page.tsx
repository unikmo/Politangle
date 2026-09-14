import type { Metadata } from 'next';
import PracticeClient from './PracticeClient';

export const metadata: Metadata = {
  title: 'Political literacy practice',
  description: 'Practise 25 balanced CLASSIFY or UNDERSTAND questions with immediate explanations.',
  alternates: { canonical: '/practice' },
};

export default function PracticePage() {
  return <PracticeClient />;
}
