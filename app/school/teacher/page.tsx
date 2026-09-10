import Link from 'next/link';
import TeacherLicenseGate from './TeacherLicenseGate';
import { LanguageSelector } from '../../LocaleProvider';

export default function SchoolTeacherPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/school" className="engine-brand">Politangle School</Link>
        <span>Teacher</span><LanguageSelector />
      </header>
      <TeacherLicenseGate />
    </main>
  );
}
