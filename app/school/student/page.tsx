import SchoolPilotLocked from '../SchoolPilotLocked';
import {schoolStudentPilotEnabled} from '../../../lib/school-release';
import StudentSchoolClient from './StudentSchoolClient';
import StudentHeader from './StudentHeader';

export default async function SchoolStudentPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  if (!schoolStudentPilotEnabled()) return <SchoolPilotLocked/>;
  const params = await searchParams;
  return (
    <main className="engine-page">
      <StudentHeader />
      <StudentSchoolClient initialCode={params.code ?? ''} />
    </main>
  );
}
