import AssessmentHeader from '../AssessmentHeader';
import LiteracyQuizClient from '../LiteracyQuizClient';

export default function ClassifyPage() {
  return (
    <main className="engine-page">
      <AssessmentHeader kind="classify" />
      <LiteracyQuizClient section="classify" />
    </main>
  );
}
