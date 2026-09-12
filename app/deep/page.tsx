import AssessmentHeader from '../AssessmentHeader';
import DeepClient from './DeepClient';

export default function DeepPage() {
  return (
    <main className="engine-page">
      <AssessmentHeader kind="full" />
      <DeepClient />
    </main>
  );
}
