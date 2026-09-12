'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale } from './LocaleProvider';

export type AssessmentHeaderKind = 'quick' | 'quick-result' | 'full' | 'classify' | 'understand';

function label(kind: AssessmentHeaderKind, locale: 'en' | 'de' | 'es' | 'fr') {
  if (kind === 'quick') {
    if (locale === 'de') return 'Quick · 26 Fragen';
    if (locale === 'es') return 'Quick · 26 preguntas';
    if (locale === 'fr') return 'Quick · 26 questions';
    return 'Quick · 26 questions';
  }
  if (kind === 'quick-result') {
    if (locale === 'de') return 'Quick-Ergebnis';
    if (locale === 'es') return 'Resultado Quick';
    if (locale === 'fr') return 'Résultat Quick';
    return 'Quick result';
  }
  if (kind === 'full') {
    if (locale === 'de') return 'Full · 16 weitere Fragen';
    if (locale === 'es') return 'Full · 16 preguntas más';
    if (locale === 'fr') return 'Full · 16 questions de plus';
    return 'Full · 16 more questions';
  }
  const name = kind === 'classify' ? 'CLASSIFY' : 'UNDERSTAND';
  if (locale === 'de') return `${name} · 20 Fragen`;
  if (locale === 'es') return `${name} · 20 preguntas`;
  return `${name} · 20 questions`;
}

export default function AssessmentHeader({ kind }: { kind: AssessmentHeaderKind }) {
  const { locale } = useLocale();
  return (
    <header className="engine-header">
      <Link href="/" className="engine-brand">Politangle</Link>
      <span>{label(kind, locale)}</span>
      <LanguageSelector />
    </header>
  );
}
