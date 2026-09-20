import type { GlobalLabelFit } from './countries';
import type { Locale } from '../app/LocaleProvider';
import { deGlobalLabels1 } from './country-global-labels-de-1';
import { deGlobalLabels2 } from './country-global-labels-de-2';
import { esGlobalLabels1 } from './country-global-labels-es-1';
import { esGlobalLabels2 } from './country-global-labels-es-2';
import { frGlobalLabels1 } from './country-global-labels-fr-1';
import { frGlobalLabels2 } from './country-global-labels-fr-2';
import { ptBrGlobalLabels1 } from './country-global-labels-ptbr-1';
import { ptBrGlobalLabels2 } from './country-global-labels-ptbr-2';

const texts: Partial<Record<Locale, Record<string, Pick<GlobalLabelFit, 'summary' | 'localDimensions'>>>> = {
  de: { ...deGlobalLabels1, ...deGlobalLabels2 },
  es: { ...esGlobalLabels1, ...esGlobalLabels2 },
  fr: { ...frGlobalLabels1, ...frGlobalLabels2 },
  'pt-br': { ...ptBrGlobalLabels1, ...ptBrGlobalLabels2 },
};

export function localizeLegacyGlobalLabels(slug: string, locale: Locale, base: GlobalLabelFit | undefined): GlobalLabelFit | undefined {
  if (!base || locale === 'en') return base;
  const text = texts[locale]?.[slug];
  return text ? { fit: base.fit, summary: text.summary, localDimensions: text.localDimensions } : base;
}

export const legacyGlobalLabelLocales = texts;
