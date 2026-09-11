import Link from 'next/link';
import LiteracyQuizEntry from '../LiteracyQuizEntry';
import { LanguageSelector } from '../LocaleProvider';

export default async function UnderstandPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const params = await searchParams;
  const schoolMode = params.mode === 'school';
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href={schoolMode ? '/school/private' : '/'} className="engine-brand">Politangle</Link>
        <span>UNDERSTAND · 20</span><LanguageSelector />
      </header>
      <LiteracyQuizEntry section="understand" schoolMode={schoolMode} />
    </main>
  );
}
