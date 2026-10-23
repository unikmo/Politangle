import AssessmentHeader from '../AssessmentHeader';
import DeepClient from './DeepClient';
import { countrySelectionOptions } from '../countries/result-country-options';

export default function DeepPage() {
  return (
    <main className="engine-page">
      <AssessmentHeader kind="full" />
      <DeepClient countryOptions={countrySelectionOptions()} />
    </main>
  );
}
