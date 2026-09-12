'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale } from '../../LocaleProvider';

export default function TeacherHeader() {
  const { locale } = useLocale();
  const label = locale === 'de' ? 'Lehrkraft' : locale === 'es' ? 'Docente' : locale === 'fr' ? 'Enseignant' : 'Teacher';
  return <header className="engine-header"><Link href="/school" className="engine-brand">Politangle School</Link><span>{label}</span><LanguageSelector /></header>;
}
