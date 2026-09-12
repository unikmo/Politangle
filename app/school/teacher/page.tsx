import TeacherHeader from './TeacherHeader';
import TeacherLicenseGate from './TeacherLicenseGate';

export default function SchoolTeacherPage() {
  return (
    <main className="engine-page">
      <TeacherHeader />
      <TeacherLicenseGate />
    </main>
  );
}
