'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale } from '../../LocaleProvider';
import { studentUi } from './student-native';

export default function StudentHeader() {
  const { locale } = useLocale();
  return (
    <header className="engine-header">
      <Link href="/school" className="engine-brand">Politangle School</Link>
      <span>{studentUi(locale).header}</span>
      <LanguageSelector />
    </header>
  );
}
