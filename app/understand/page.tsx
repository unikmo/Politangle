import AssessmentHeader from '../AssessmentHeader';
import LiteracyQuizClient from '../LiteracyQuizClient';

export default function UnderstandPage() {
  return (
    <main className="engine-page">
      <AssessmentHeader kind="understand" />
      <LiteracyQuizClient section="understand" />
    </main>
  );
}
