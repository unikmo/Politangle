import type { Metadata } from 'next';
import PopulismQuizClient from './PopulismQuizClient';

export const metadata: Metadata = {
  title: 'Can you recognize populism?',
  description: 'A free 12-question political-literacy quiz about populist framing, democratic warning signs and commonly confused concepts.',
  alternates: { canonical: '/populism-quiz' },
};

export default function PopulismQuizPage() {
  return <PopulismQuizClient />;
}

