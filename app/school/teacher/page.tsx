import Link from 'next/link';
import TeacherSchoolClient from './TeacherSchoolClient';

export default function SchoolTeacherPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/school" className="engine-brand">Politangle School</Link>
        <span>Teacher</span>
      </header>
      <TeacherSchoolClient />
    </main>
  );
}
