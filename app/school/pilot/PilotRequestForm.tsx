'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useLocale, localePath, type Locale } from '../../LocaleProvider';

const c:Record<Locale,{
 title:string;intro:string;school:string;country:string;contact:string;email:string;role:string;age:string;
 teacher:string;leader:string;researcher:string;other:string;junior:string;youth:string;both:string;
 confirm:string;privacy:string;send:string;sending:string;success:string;error:string;privacyNote:string;
}> = {
 en:{title:'Request a school pilot',intro:'Only teachers, school leaders and educational researchers may apply. Applying does not activate a classroom or authorize student participation.',school:'School or organisation',country:'Country',contact:'Adult contact name',email:'Work email',role:'Your role',age:'Intended age group',teacher:'Teacher',leader:'School leadership',researcher:'Educational researcher',other:'Other educator',junior:'10–13',youth:'14–18',both:'Both age groups',confirm:'I am an adult applying on behalf of an educational organisation.',privacy:'I understand my professional contact details will be used to review this pilot request. I will not submit student data.',send:'Request pilot participation',sending:'Sending request…',success:'Your pilot request has been recorded for review. No school account or student access has been activated.',error:'Your request could not be recorded. Please try again later.',privacyNote:'We only ask for adult professional contact details. Never include names, answers or other information about students.'},
 de:{title:'Schulpilot anfragen',intro:'Lehrkräfte, Schulleitungen und Bildungsforschende können sich bewerben. Deine Anfrage schaltet keine Klassen frei und erlaubt noch keine Teilnahme von Schüler:innen.',school:'Schule oder Organisation',country:'Land',contact:'Name der erwachsenen Kontaktperson',email:'Dienstliche E-Mail-Adresse',role:'Deine Funktion',age:'Vorgesehene Altersgruppe',teacher:'Lehrkraft',leader:'Schulleitung',researcher:'Bildungsforschung',other:'Andere pädagogische Funktion',junior:'10–13 Jahre',youth:'14–18 Jahre',both:'Beide Altersgruppen',confirm:'Ich bin volljährig und frage im Namen einer Bildungseinrichtung an.',privacy:'Meine dienstlichen Kontaktdaten dürfen zur Bearbeitung dieser Pilotanfrage verwendet werden. Ich übermittle keine Schülerdaten.',send:'Teilnahme am Schulpilot anfragen',sending:'Anfrage wird gesendet…',success:'Deine Pilotanfrage wurde zur Prüfung aufgenommen. Es wurden weder ein Schulkonto noch ein Schülerzugang freigeschaltet.',error:'Deine Anfrage konnte nicht gespeichert werden. Bitte versuche es später erneut.',privacyNote:'Wir fragen nur nach dienstlichen Kontaktdaten Erwachsener. Bitte gib keine Namen, Antworten oder sonstigen Daten von Schüler:innen an.'},
 es:{title:'Solicitar un piloto escolar',intro:'Pueden solicitarlo docentes, responsables de centros e investigadores educativos. La solicitud no activa aulas ni permite todavía participar al alumnado.',school:'Centro u organización',country:'País',contact:'Nombre de la persona adulta',email:'Correo de trabajo',role:'Función',age:'Edad del alumnado',teacher:'Docente',leader:'Dirección escolar',researcher:'Investigación educativa',other:'Otra función educativa',junior:'10–13 años',youth:'14–18 años',both:'Ambos grupos',confirm:'Soy una persona adulta que solicita el piloto en nombre de una organización educativa.',privacy:'Acepto que estos datos profesionales se usen para revisar la solicitud. No proporcionaré datos de menores.',send:'Solicitar participación',sending:'Enviando…',success:'Tu solicitud se ha registrado para su revisión. No se ha activado ningún acceso escolar.',error:'No se pudo registrar tu solicitud. Inténtalo más tarde.',privacyNote:'Solo se solicitan datos profesionales de adultos. No incluyas nombres ni respuestas del alumnado.'},
 fr:{title:'Demander un pilote scolaire',intro:'Les enseignants, directions et chercheurs en éducation peuvent déposer une demande. Cela ne crée pas de classe et ne donne pas accès aux élèves.',school:'École ou organisation',country:'Pays',contact:'Nom du contact adulte',email:'E-mail professionnel',role:'Fonction',age:'Groupe d’âge visé',teacher:'Enseignant',leader:'Direction',researcher:'Recherche en éducation',other:'Autre fonction éducative',junior:'10–13 ans',youth:'14–18 ans',both:'Les deux groupes',confirm:'Je suis adulte et j’agis pour une organisation éducative.',privacy:'J’accepte que mes coordonnées professionnelles servent à étudier la demande. Je ne fournirai aucune donnée sur des élèves.',send:'Demander à participer',sending:'Envoi…',success:'Ta demande a été enregistrée pour examen. Aucun compte d’école ni accès élève n’a été activé.',error:'Ta demande n’a pas pu être enregistrée. Réessaie plus tard.',privacyNote:'Fournis uniquement les coordonnées professionnelles d’un adulte, jamais de données ou réponses d’élèves.'},
 'pt-br':{title:'Solicitar piloto escolar',intro:'Professores, gestores e pesquisadores em educação podem solicitar participação. O pedido não ativa turmas nem autoriza estudantes.',school:'Escola ou organização',country:'País',contact:'Nome do contato adulto',email:'E-mail profissional',role:'Função',age:'Faixa etária',teacher:'Professor(a)',leader:'Gestão escolar',researcher:'Pesquisador(a)',other:'Outro profissional da educação',junior:'10–13 anos',youth:'14–18 anos',both:'Ambas as faixas',confirm:'Sou adulto e estou solicitando em nome de uma organização de ensino.',privacy:'Autorizo o uso destes contatos profissionais para analisar o pedido. Não enviarei dados de estudantes.',send:'Solicitar participação no piloto',sending:'Enviando…',success:'Seu pedido foi registrado para análise. Nenhuma conta escolar ou acesso de estudante foi ativado.',error:'Não foi possível registrar o pedido. Tente novamente depois.',privacyNote:'Informe apenas dados profissionais de adultos. Não inclua nomes ou respostas de estudantes.'},
};

export default function PilotRequestForm(){
 const {locale}=useLocale(), t=c[locale];const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 async function send(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(status==='sending')return;
  const form=e.currentTarget; const values=Object.fromEntries(new FormData(form)) as Record<string,string>;
  const body={
   schoolName:values.schoolName,country:values.country,contactName:values.contactName,
   contactEmail:values.contactEmail,role:values.role,ageBand:values.ageBand,locale,
   adultConfirmed:values.adultConfirmed==='yes',privacyAcknowledged:values.privacyAcknowledged==='yes',
   website:values.website||''
  };
  setStatus('sending');
  try {
   const response=await fetch('/api/school/pilot-request',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
   if(!response.ok)throw Error('REQUEST_NOT_RECORDED');
   form.reset();setStatus('sent');
  }catch{setStatus('error');}
 }
 return <section className="school-pilot-request" aria-labelledby="pilot-request-title">
  <p className="p-kicker">POLITANGLE SCHOOL · PILOT</p><h1 id="pilot-request-title">{t.title}</h1><p className="school-pilot-intro">{t.intro}</p>
  <form onSubmit={send} className="school-pilot-form">
   <p className="school-pilot-honeypot" aria-hidden="true"><label>Website <input name="website" autoComplete="off" tabIndex={-1} /></label></p>
   <div className="school-pilot-fields">
    <label>{t.school}<input name="schoolName" minLength={3} maxLength={120} autoComplete="organization" required /></label>
    <label>{t.country}<input name="country" minLength={2} maxLength={80} autoComplete="country-name" required /></label>
    <label>{t.contact}<input name="contactName" minLength={2} maxLength={120} autoComplete="name" required /></label>
    <label>{t.email}<input name="contactEmail" type="email" maxLength={254} autoComplete="email" required /></label>
    <label>{t.role}<select name="role" defaultValue="teacher" required><option value="teacher">{t.teacher}</option><option value="school-leader">{t.leader}</option><option value="researcher">{t.researcher}</option><option value="other">{t.other}</option></select></label>
    <label>{t.age}<select name="ageBand" defaultValue="youth-14-18" required><option value="youth-14-18">{t.youth}</option><option value="junior-10-13">{t.junior}</option><option value="both">{t.both}</option></select></label>
   </div>
   <p className="school-pilot-privacy-note">{t.privacyNote}</p><p className="school-pilot-privacy-note"><Link href={localePath(locale,'/privacy')}>{locale==='de'?'Datenschutzhinweise':locale==='es'?'Aviso de privacidad':locale==='fr'?'Notice de confidentialité':locale==='pt-br'?'Aviso de privacidade':'Read privacy information'} →</Link></p>
   <label className="school-pilot-check"><input type="checkbox" name="adultConfirmed" value="yes" required /><span>{t.confirm}</span></label>
   <label className="school-pilot-check"><input type="checkbox" name="privacyAcknowledged" value="yes" required /><span>{t.privacy}</span></label>
   <button className="p-button" type="submit" disabled={status==='sending'||status==='sent'}>{status==='sending'?t.sending:t.send}</button>
   <p className={status==='error'?'school-pilot-status error':'school-pilot-status'} role="status" aria-live="polite">{status==='sent'?t.success:status==='error'?t.error:''}</p>
  </form>
 </section>;
}
