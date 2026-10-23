'use client';

import { useState, type FormEvent } from 'react';
import { useLocale, type Locale } from './LocaleProvider';

const content:Record<Locale,{title:string;intro:string;school:string;name:string;email:string;country:string;role:string;notes:string;consent:string;submit:string;sending:string;success:string;error:string;restricted:string}>={
 en:{title:'Request a School Edition pilot',intro:'For teachers and school coordinators only. Tell us about your school; we will review your request before issuing any classroom access. Do not include student names or responses.',school:'School or organisation',name:'Adult contact name',email:'Work email',country:'Country or region',role:'Role at school',notes:'What would you like to test? (optional)',consent:'I agree that Politangle may store these contact details to review this pilot request. I will not submit student data.',submit:'Request pilot participation',sending:'Submitting request…',success:'Your request has been recorded for review. This is not an approval or permission to use the service with students.',error:'Your request was not recorded. Please try again.',restricted:'Access is by invitation after a school-specific review. No student accounts or answers are requested here.'},
 de:{title:'Teilnahme am Schulpilot anfragen',intro:'Nur für Lehrkräfte und Schulverantwortliche. Beschreibe deine Schule. Wir prüfen die Anfrage, bevor wir einen Klassenzugang freigeben. Keine Namen oder Antworten von Schüler:innen angeben.',school:'Schule oder Organisation',name:'Name der erwachsenen Kontaktperson',email:'Dienstliche E-Mail-Adresse',country:'Land oder Region',role:'Funktion an der Schule',notes:'Was möchtest du erproben? (optional)',consent:'Ich bin einverstanden, dass Politangle diese Kontaktdaten für die Prüfung meiner Pilotanfrage speichert. Ich übermittle keine Schülerdaten.',submit:'Schulpilot anfragen',sending:'Anfrage wird übermittelt…',success:'Deine Anfrage wurde zur Prüfung gespeichert. Das ist noch keine Zusage und keine Freigabe für den Einsatz mit Schüler:innen.',error:'Deine Anfrage konnte nicht gespeichert werden. Bitte versuche es erneut.',restricted:'Zugang gibt es nur nach Einladung und Prüfung der jeweiligen Schule. Hier werden keine Schülerkonten oder Antworten abgefragt.'},
 es:{title:'Solicitar participación en el piloto escolar',intro:'Solo para docentes y responsables de centros educativos. Revisaremos la solicitud antes de conceder acceso. No incluyas nombres ni respuestas de estudiantes.',school:'Centro educativo u organización',name:'Nombre del contacto adulto',email:'Correo electrónico profesional',country:'País o región',role:'Cargo en el centro',notes:'¿Qué te gustaría probar? (opcional)',consent:'Acepto que Politangle guarde estos datos de contacto para revisar la solicitud. No enviaré datos de estudiantes.',submit:'Solicitar el piloto',sending:'Enviando solicitud…',success:'Solicitud registrada para revisión. No constituye aprobación ni autorización para usarla con estudiantes.',error:'No se pudo registrar la solicitud. Vuelve a intentarlo.',restricted:'El acceso se concede por invitación después de revisar el centro. Aquí no se piden datos del alumnado.'},
 fr:{title:'Demander à participer au pilote scolaire',intro:'Réservé aux enseignants et responsables scolaires. La demande sera examinée avant tout accès aux classes. Ne transmets aucun nom ni réponse d’élève.',school:'Établissement ou organisation',name:'Nom du contact adulte',email:'E-mail professionnel',country:'Pays ou région',role:'Fonction dans l’établissement',notes:'Que souhaites-tu tester ? (facultatif)',consent:'J’accepte que Politangle conserve ces coordonnées pour examiner la demande. Je ne transmettrai aucune donnée d’élève.',submit:'Demander le pilote',sending:'Envoi en cours…',success:'Ta demande est enregistrée pour examen. Elle ne vaut pas autorisation d’utilisation avec les élèves.',error:'La demande n’a pas pu être enregistrée. Réessaie.',restricted:'L’accès se fait sur invitation après examen de l’établissement. Aucun compte ou réponse d’élève n’est demandé ici.'},
 'pt-br':{title:'Solicitar participação no piloto escolar',intro:'Somente para professores e responsáveis por escolas. A solicitação será analisada antes de liberar qualquer sala. Não envie nomes ou respostas de estudantes.',school:'Escola ou organização',name:'Nome do contato adulto',email:'E-mail institucional',country:'País ou região',role:'Função na escola',notes:'O que você gostaria de testar? (opcional)',consent:'Concordo que o Politangle armazene meus dados de contato para analisar a solicitação. Não enviarei dados de estudantes.',submit:'Solicitar participação',sending:'Enviando…',success:'Sua solicitação foi registrada para análise. Isso não autoriza o uso com estudantes.',error:'Não foi possível registrar a solicitação. Tente novamente.',restricted:'O acesso é por convite após análise da escola. Não solicitamos contas ou respostas de estudantes.'},
};

export default function SchoolPilotRequestForm(){
 const {locale}=useLocale(),c=content[locale];
 const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(state==='sending')return;
  const form=event.currentTarget,values=new FormData(form);
  setState('sending');
  try{
   const payload=Object.fromEntries(['school','name','email','country','role','notes','website'].map(k=>[k,String(values.get(k)||'')]));
   const response=await fetch('/api/school/pilot-request',{
    method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',
    body:JSON.stringify({...payload,consent:values.get('consent')==='yes'}),
   });
   if(!response.ok)throw new Error('PILOT_INTAKE_FAILED');
   form.reset();setState('success');
  }catch{setState('error')}
 }
 return <section className="school-pilot-intake" id="request-school-pilot" aria-labelledby="pilot-request-heading">
  <p className="p-kicker">SCHOOL PILOT · REQUEST ONLY</p>
  <h2 id="pilot-request-heading">{c.title}</h2><p>{c.intro}</p>
  <form onSubmit={submit} className="contact-form">
   <p className="contact-honeypot" aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off"/></label></p>
   <div className="contact-form-grid">
    <label><span>{c.school}</span><input name="school" required maxLength={120} autoComplete="organization"/></label>
    <label><span>{c.name}</span><input name="name" required maxLength={100} autoComplete="name"/></label>
    <label><span>{c.email}</span><input name="email" type="email" required maxLength={254} autoComplete="email"/></label>
    <label><span>{c.country}</span><input name="country" required maxLength={80} autoComplete="country-name"/></label>
   </div>
   <label><span>{c.role}</span><input name="role" required maxLength={70}/></label>
   <label><span>{c.notes}</span><textarea name="notes" rows={4} maxLength={900}/></label>
   <label className="contact-consent"><input name="consent" value="yes" type="checkbox" required/><span>{c.consent}</span></label>
   <button className="p-button" type="submit" disabled={state==='sending'}>{state==='sending'?c.sending:c.submit}</button>
   <p role="status" aria-live="polite" className={state==='error'?'contact-form-status error':'contact-form-status'}>{state==='success'?c.success:state==='error'?c.error:''}</p>
  </form>
  <p className="school-pilot-notice">{c.restricted}</p>
 </section>;
}
