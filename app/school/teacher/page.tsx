import type {Metadata} from 'next';
export const metadata:Metadata={robots:{index:false,follow:false}};
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
