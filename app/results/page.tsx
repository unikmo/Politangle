import AssessmentHeader from '../AssessmentHeader';
import ResultsClient from './ResultsClient';

export default function ResultsPage() {
  return (
    <main className="engine-page">
      <AssessmentHeader kind="quick-result" />
      <ResultsClient />
    </main>
  );
}
