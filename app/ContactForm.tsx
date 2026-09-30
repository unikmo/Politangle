'use client';

import { FormEvent, useState } from 'react';
import { useLocale, type Locale } from './LocaleProvider';

const copy: Record<Locale, { name:string; email:string; subject:string; subjects:string[]; message:string; privacy:string; send:string; sending:string; sent:string; error:string }> = {
  en: { name:'Name', email:'Email', subject:'Topic', subjects:['General','Account','Privacy or legal','School'], message:'Message', privacy:'I understand that Politangle will use these details only to answer this enquiry.', send:'Send enquiry', sending:'Sending…', sent:'Thank you. Your enquiry has been received.', error:'The message could not be sent. Please try again.' },
  de: { name:'Name', email:'E-Mail', subject:'Thema', subjects:['Allgemein','Konto','Datenschutz oder Recht','Schule'], message:'Nachricht', privacy:'Ich verstehe, dass Politangle diese Angaben nur zur Beantwortung dieser Anfrage verwendet.', send:'Anfrage senden', sending:'Wird gesendet…', sent:'Danke. Deine Anfrage ist eingegangen.', error:'Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.' },
  es: { name:'Nombre', email:'Correo electrónico', subject:'Tema', subjects:['General','Cuenta','Privacidad o asuntos legales','Escuela'], message:'Mensaje', privacy:'Entiendo que Politangle usará estos datos únicamente para responder a esta consulta.', send:'Enviar consulta', sending:'Enviando…', sent:'Gracias. Hemos recibido tu consulta.', error:'No se pudo enviar el mensaje. Inténtalo de nuevo.' },
  fr: { name:'Nom', email:'E-mail', subject:'Sujet', subjects:['Général','Compte','Vie privée ou juridique','École'], message:'Message', privacy:'Je comprends que Politangle utilisera ces informations uniquement pour répondre à cette demande.', send:'Envoyer la demande', sending:'Envoi…', sent:'Merci. Votre demande a bien été reçue.', error:'Le message n’a pas pu être envoyé. Veuillez réessayer.' },
  'pt-br': { name:'Nome', email:'E-mail', subject:'Assunto', subjects:['Geral','Conta','Privacidade ou jurídico','Escola'], message:'Mensagem', privacy:'Entendo que o Politangle usará estes dados somente para responder a esta solicitação.', send:'Enviar solicitação', sending:'Enviando…', sent:'Obrigado. Sua solicitação foi recebida.', error:'Não foi possível enviar a mensagem. Tente novamente.' },
};

export default function ContactForm() {
  const { locale } = useLocale();
  const c = copy[locale];
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('sending');
    const form = event.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => { if (typeof value === 'string') body.append(key, value); });
    try {
      const response = await fetch('/__forms.html', { method:'POST', headers:{ 'Content-Type':'application/x-www-form-urlencoded' }, body:body.toString() });
      if (!response.ok) throw new Error('FORM_SUBMISSION_FAILED');
      form.reset(); setStatus('sent');
    } catch { setStatus('error'); }
  }
  return <form className="contact-form" name="politangle-contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit}>
    <input type="hidden" name="form-name" value="politangle-contact" /><input type="hidden" name="locale" value={locale} />
    <p className="contact-honeypot" aria-hidden="true"><label>Do not fill this out<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
    <div className="contact-form-grid"><label><span>{c.name}</span><input name="name" type="text" autoComplete="name" maxLength={120} required /></label><label><span>{c.email}</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label></div>
    <label><span>{c.subject}</span><select name="subject" required defaultValue=""><option value="" disabled>—</option>{c.subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></label>
    <label><span>{c.message}</span><textarea name="message" rows={7} minLength={10} maxLength={5000} required /></label>
    <label className="contact-consent"><input name="privacy-acknowledged" type="checkbox" value="yes" required /><span>{c.privacy}</span></label>
    <button className="p-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? c.sending : c.send}</button>
    <p className={status === 'error' ? 'contact-form-status error' : 'contact-form-status'} role="status" aria-live="polite">{status === 'sent' ? c.sent : status === 'error' ? c.error : ''}</p>
  </form>;
}
