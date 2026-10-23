import AssessmentHeader from '../AssessmentHeader';
import ResultsClient from './ResultsClient';
import { countrySelectionOptions } from '../countries/result-country-options';

export default function ResultsPage() {
  return (
    <main className="engine-page">
      <AssessmentHeader kind="quick-result" />
      <ResultsClient countryOptions={countrySelectionOptions()} />
    </main>
  );
}
