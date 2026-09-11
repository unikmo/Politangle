'use client';

import { useLocale } from '../LocaleProvider';

export default function SchoolRoleLabel({ role }: { role: 'student' | 'teacher' | 'projector' }) {
  const { locale } = useLocale();
  const labels = {
    en: { student: 'Student', teacher: 'Teacher', projector: 'Classroom projector' },
    de: { student: 'Schüler', teacher: 'Lehrkraft', projector: 'Klassenraum-Projektor' },
    es: { student: 'Alumno/a', teacher: 'Docente', projector: 'Proyector de clase' },
    fr: { student: 'Élève', teacher: 'Enseignant', projector: 'Projecteur de classe' },
  } as const;
  return <span>{labels[locale][role]}</span>;
}
