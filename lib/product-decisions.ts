export const POLITANGLE_PRODUCT_DECISIONS = {
  version: '2026-09-13.1',
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
    pricesEur: {
      launchIssuance: 9.9,
      standardIssuance: 16.99,
      renewal: 13.9,
    },
  },
  countries: {
    templateProfiles: ['US', 'DE', 'FR', 'GB'],
    initialProfiles: ['US', 'DE', 'FR', 'GB', 'NL', 'DK', 'FI', 'IS', 'NO', 'SE'],
    firstReleaseTarget: 20,
  },
} as const;

export type PolitangleProductDecisions = typeof POLITANGLE_PRODUCT_DECISIONS;
