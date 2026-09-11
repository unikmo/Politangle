import Link from 'next/link';
import StudentSchoolClient from './StudentSchoolClient';
import { LanguageSelector } from '../../LocaleProvider';
import SchoolRoleLabel from '../SchoolRoleLabel';

export default async function SchoolStudentPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const params = await searchParams;
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/school" className="engine-brand">Politangle School</Link>
        <SchoolRoleLabel role="student" /><LanguageSelector />
      </header>
      <StudentSchoolClient initialCode={params.code ?? ''} />
    </main>
  );
}
