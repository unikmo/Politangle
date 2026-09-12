import AssessmentHeader from '../AssessmentHeader';
import QuizClient from './QuizClient';

export default function QuizPage() {
  return (
    <main className="engine-page">
      <AssessmentHeader kind="quick" />
      <QuizClient />
    </main>
  );
}
