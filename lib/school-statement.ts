import { germanBeliefStatement } from './german-believe';
import { romanceBeliefStatement } from './romance-believe';
import { portugueseBrBeliefStatement } from './portuguese-br-believe';
import { schoolYouthStatement } from './school-youth-localized';

type Polarity = 'negative' | 'positive';

// Statement shown on the school screens. Classroom questions come from the Youth bank (or the
// English-only Junior bank), so the localized Youth wording is tried first. The adult wording is
// only a fallback, and the English text is the last resort (for example for Junior items).
export function schoolStatement(locale: string, sourceItemId: string, polarity: Polarity, fallback: string): string {
  if (locale === 'en') return fallback;
  const youth = schoolYouthStatement(locale, sourceItemId, polarity);
  if (youth) return youth;
  if (locale === 'de') return germanBeliefStatement(sourceItemId, polarity) ?? fallback;
  if (locale === 'es' || locale === 'fr') return romanceBeliefStatement(locale, sourceItemId, polarity) ?? fallback;
  if (locale === 'pt-br') return portugueseBrBeliefStatement(sourceItemId, polarity) ?? fallback;
  return fallback;
}
