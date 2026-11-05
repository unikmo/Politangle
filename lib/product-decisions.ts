export const POLITANGLE_PRODUCT_DECISIONS = {
  version: '2026-09-30.1',
  schoolAgeBands: {
    junior: { min: 10, max: 13 },
    youth: { min: 14, max: 18 },
  },
  literacy: {
    masterBankSizePerSection: 40,
    servedQuestionsPerSection: 25,
    passingAnswersPerSection: 23,
    certifiedAttempts: {
      maximum: 2,
      rollingWindowHours: 24,
    },
    certificationMinimumAge: 18,
    initialCertificationLanguage: 'en',
    certificateValidityYears: 2,
    practiceIsFree: true,
    certifiedAttemptsAreFree: true,
    bankLifecycle: {
      currentStage: 'founder_review',
      sequence: ['founder_review', 'pilot_frozen', 'pilot_running', 'post_pilot_review', 'final_frozen'],
      founderApprovalRequiredForPilotFreeze: true,
      contentChangeAfterFreezeRequiresNewVersion: true,
      finalFreezeRequiresPilotEvidence: true,
    },
    // A certificate is optional; taking Politangle and attempting the test remain free.
    // Renewal requires the same reassessment and produces the same digital product, so it
    // intentionally costs the same as first issuance.
    pricesEur: {
      certificate: 9.9,
      renewal: 9.9,
    },
  },
  countries: {
    templateProfiles: ['US', 'DE', 'FR', 'GB'],
    initialProfiles: ['US', 'DE', 'FR', 'GB', 'NL', 'DK', 'FI', 'IS', 'NO', 'SE'],
    firstReleaseTarget: 20,
  },
} as const;

export type PolitangleProductDecisions = typeof POLITANGLE_PRODUCT_DECISIONS;
