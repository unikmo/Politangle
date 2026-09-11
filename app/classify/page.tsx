import Link from 'next/link';
import LiteracyQuizClientV2 from '../LiteracyQuizClientV2';
import LiteracySessionMigration from '../LiteracySessionMigration';
import { LanguageSelector } from '../LocaleProvider';

export default async function ClassifyPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const params = await searchParams;
  const schoolMode = params.mode === 'school';
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href={schoolMode ? '/school/private' : '/'} className="engine-brand">Politangle</Link>
        <span>CLASSIFY · 20</span><LanguageSelector />
      </header>
      <LiteracySessionMigration active={schoolMode} />
      <LiteracyQuizClientV2 section="classify" feedbackMode={schoolMode ? 'instant' : 'end'} />
    </main>
  );
}
