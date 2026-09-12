import type { Metadata } from 'next';
import LocalizedInfoPage from '../LocalizedInfoPage';

export const metadata: Metadata = { title: 'Question-bank versions', description: 'Politangle adult, youth and junior question-bank versions.', alternates: { canonical: '/question-banks' } };

export default function QuestionBanksPage() {
  return <LocalizedInfoPage page="question-banks" />;
}
