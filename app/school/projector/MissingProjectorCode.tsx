'use client';

import { useLocale } from '../../LocaleProvider';

export default function MissingProjectorCode() {
  const { locale } = useLocale();
  const copy = {
    en: ['Missing classroom code.', 'Open the projector from the teacher dashboard.'],
    de: ['Klassenraumcode fehlt.', 'Öffnen Sie den Projektor über den Lehrkraft-Bereich.'],
    es: ['Falta el código de la clase.', 'Abre el proyector desde el panel docente.'],
    fr: ['Le code de la classe manque.', 'Ouvrez le projecteur depuis le tableau enseignant.'],
  } as const;
  return <section className="engine-shell"><article className="engine-card"><h1>{copy[locale][0]}</h1><p>{copy[locale][1]}</p></article></section>;
}
