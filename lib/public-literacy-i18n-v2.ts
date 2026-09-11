import type { LiteracyQuestion } from './deep-engine';
import {
  publicLiteracyExplanation as baseExplanation,
  publicLiteracyOption as baseOption,
  publicLiteracyPrompt as basePrompt,
  type LiteracyLocale,
} from './public-literacy-i18n';

const u20 = {
  de: {
    prompt: 'Warum ist ein dauerhafter Einparteienstaat nicht das marxistische Endziel des Kommunismus?',
    explanation: 'Das marxistische kommunistische Endziel ist klassenlos und letztlich staatenlos, mit gemeinsamem Eigentum an den Produktionsmitteln. Ein dauerhafter Parteistaat ist daher nicht das in dieser Theorie beschriebene Endziel.',
    options: {
      'u20-a': 'Er ist das Endziel; Marx definierte Kommunismus als dauerhafte Einparteienherrschaft und zentrale Staatsplanung.',
      'u20-b': 'Das marxistische Endziel ist klassenlos und letztlich staatenlos; ein dauerhafter Parteistaat ist daher nicht der beschriebene Endzustand.',
      'u20-c': 'Weil Kommunismus hauptsächlich eine Theorie des Nationalismus ist und nicht von Klasse, Eigentum und Staat handelt.',
      'u20-d': 'Weil das kommunistische Ideal eine konstitutionelle Monarchie statt einer Republik verlangt.',
    },
  },
  es: {
    prompt: '¿Por qué un Estado permanente de partido único no es el ideal final marxista del comunismo?',
    explanation: 'El objetivo comunista marxista es una sociedad sin clases y, finalmente, sin Estado, con propiedad colectiva de los medios de producción. Por eso, un Estado permanente de partido único no es la condición final descrita por esa teoría.',
    options: {
      'u20-a': 'Sí es el ideal final; Marx definió el comunismo como gobierno permanente de partido único y planificación estatal centralizada.',
      'u20-b': 'El ideal marxista final es una sociedad sin clases y finalmente sin Estado, por lo que un Estado permanente de partido único no es la condición final descrita.',
      'u20-c': 'Porque el comunismo es principalmente una teoría del nacionalismo y no trata de clase, propiedad y Estado.',
      'u20-d': 'Porque el ideal comunista exige una monarquía constitucional en vez de una república.',
    },
  },
  fr: {
    prompt: 'Pourquoi un État permanent à parti unique n’est-il pas l’idéal final marxiste du communisme ?',
    explanation: 'L’objectif communiste marxiste est une société sans classes et finalement sans État, avec une propriété collective des moyens de production. Un État permanent à parti unique n’est donc pas la situation finale décrite par cette théorie.',
    options: {
      'u20-a': 'C’est bien l’idéal final : Marx définissait le communisme comme un régime permanent à parti unique et une planification étatique centralisée.',
      'u20-b': 'L’idéal marxiste final est sans classes et finalement sans État ; un État permanent à parti unique n’est donc pas la situation finale décrite.',
      'u20-c': 'Parce que le communisme est surtout une théorie du nationalisme plutôt qu’une théorie de la classe, de la propriété et de l’État.',
      'u20-d': 'Parce que l’idéal communiste exige une monarchie constitutionnelle plutôt qu’une république.',
    },
  },
} as const;

export type { LiteracyLocale };

export function publicLiteracyPrompt(locale: LiteracyLocale, question: LiteracyQuestion) {
  if (question.id === 'U20' && locale !== 'en') return u20[locale].prompt;
  return basePrompt(locale, question);
}

export function publicLiteracyExplanation(locale: LiteracyLocale, question: LiteracyQuestion) {
  if (question.id === 'U20' && locale !== 'en') return u20[locale].explanation;
  return baseExplanation(locale, question);
}

export function publicLiteracyOption(locale: LiteracyLocale, question: LiteracyQuestion, optionId: string) {
  if (question.id === 'U20' && locale !== 'en') {
    return u20[locale].options[optionId as keyof typeof u20[typeof locale]['options']] ?? baseOption(locale, question, optionId);
  }
  return baseOption(locale, question, optionId);
}
