'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProjectorSchoolClient from './ProjectorSchoolClient';
import { LanguageSelector, useLocale } from '../../LocaleProvider';
import SchoolRoleLabel from '../SchoolRoleLabel';

export default function SchoolProjectorPage() {
  const params = useSearchParams();
  const code = (params.get('code') ?? '').trim().toUpperCase();
  const { locale } = useLocale();
  const missing = {
    en: ['Missing classroom code.', 'Open the projector from the teacher dashboard.'],
    de: ['Klassenraumcode fehlt.', 'Öffnen Sie den Projektor über den Lehrkraft-Bereich.'],
    es: ['Falta el código de la clase.', 'Abre el proyector desde el panel docente.'],
    fr: ['Le code de la classe manque.', 'Ouvrez le projecteur depuis le tableau enseignant.'],
  } as const;
  return (
    <main className="engine-page school-page school-projector-page">
      <header className="engine-header no-print"><Link href="/school" className="engine-brand">Politangle School</Link><SchoolRoleLabel role="projector" /><LanguageSelector /></header>
      {code ? <ProjectorSchoolClient code={code} /> : <section className="engine-shell"><article className="engine-card"><h1>{missing[locale][0]}</h1><p>{missing[locale][1]}</p></article></section>}
    </main>
  );
}
