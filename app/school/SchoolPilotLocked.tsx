'use client';
import Link from 'next/link';
import {useLocale, localePath} from '../LocaleProvider';
import {SiteHeader,SiteFooter} from '../SiteChrome';
export default function SchoolPilotLocked(){
 const {locale}=useLocale();
 const c={
  en:['School Edition is invitation-only','Teachers and schools can request access to a controlled pilot. Student activities are not yet open to the public.','Request pilot participation'],
  de:['School Edition nur auf Einladung','Schulen und Lehrkräfte können einen kontrollierten Pilot anfragen. Die Aktivitäten sind noch nicht öffentlich für Schüler:innen freigeschaltet.','Schulpilot anfragen'],
  es:['School Edition solo por invitación','Los centros y docentes pueden solicitar un piloto controlado. Las actividades todavía no están abiertas al alumnado.','Solicitar piloto'],
  fr:['School Edition sur invitation','Les écoles et enseignants peuvent demander un pilote encadré. Les activités ne sont pas encore ouvertes aux élèves.','Demander un pilote'],
  'pt-br':['School Edition por convite','Escolas e professores podem solicitar um piloto controlado. As atividades ainda não estão abertas a estudantes.','Solicitar piloto']
 }[locale];
 return <main className="home school-public-page"><SiteHeader/><section className="p-shell school-pilot-shell">
  <p className="p-kicker">POLITANGLE SCHOOL · PILOT</p>
  <h1>{c[0]}</h1><p className="school-public-lede">{c[1]}</p>
  <Link href={localePath(locale,'/school/pilot')} className="p-button">{c[2]} →</Link>
 </section><SiteFooter/></main>;
}
