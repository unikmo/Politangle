import StudentSchoolClient from './StudentSchoolClient';
import StudentHeader from './StudentHeader';

export default async function SchoolStudentPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const params = await searchParams;
  return (
    <main className="engine-page">
      <StudentHeader />
      <StudentSchoolClient initialCode={params.code ?? ''} />
    </main>
  );
}
