import Link from 'next/link';
import StudentSchoolClient from './StudentSchoolClient';

export default async function SchoolStudentPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const params = await searchParams;
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/school" className="engine-brand">Politangle School</Link>
        <span>Student</span>
      </header>
      <StudentSchoolClient initialCode={params.code ?? ''} />
    </main>
  );
}
