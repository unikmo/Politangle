import Link from 'next/link';
import TeacherLicenseGate from './TeacherLicenseGate';
import { LanguageSelector } from '../../LocaleProvider';
import SchoolRoleLabel from '../SchoolRoleLabel';

export default function SchoolTeacherPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/school" className="engine-brand">Politangle School</Link>
        <SchoolRoleLabel role="teacher" /><LanguageSelector />
      </header>
      <TeacherLicenseGate />
    </main>
  );
}
