import Link from 'next/link';
import LiteracyQuizClient from '../LiteracyQuizClient';
import { LanguageSelector } from '../LocaleProvider';

export default async function UnderstandPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const params = await searchParams;
  const schoolMode = params.mode === 'school';
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href={schoolMode ? '/school/private' : '/'} className="engine-brand">Politangle</Link>
        <span>UNDERSTAND · 20 questions</span><LanguageSelector />
      </header>
      <LiteracyQuizClient section="understand" feedbackMode={schoolMode ? 'instant' : 'end'} />
    </main>
  );
}
