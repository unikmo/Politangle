'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale } from '../../../LocaleProvider';

export default function PrivateLiteracyHeader() {
  const { locale } = useLocale();
  const label = locale === 'de' ? 'Politisches Wissen · privat' : locale === 'es' ? 'Conocimientos políticos · privado' : locale === 'fr' ? 'Culture politique · privé' : 'Private political literacy';
  return <header className="engine-header"><Link href="/school/private" className="engine-brand">Politangle School</Link><span>{label}</span><LanguageSelector /></header>;
}
