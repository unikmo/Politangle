'use client';
import { useState } from 'react';
import { useLocale } from './LocaleProvider';

const copy = {
 en: ['Help us improve Politangle','Were the questions easy to understand?','Did the questions feel politically fair and balanced?','How useful was the quiz to you?','How could we make Politangle better?','Not at all','Very much','Send feedback','Thank you for your feedback.','Could not send. Please try again.','Optional. Do not include names or personal details.'],
 de: ['Hilf uns, Politangle zu verbessern','Waren die Fragen leicht verständlich?','Waren die Fragen politisch fair und ausgewogen?','Wie hilfreich war das Quiz für dich?','Wie können wir Politangle verbessern?','Überhaupt nicht','Sehr','Feedback senden','Danke für dein Feedback.','Senden fehlgeschlagen. Bitte erneut versuchen.','Freiwillig. Bitte keine Namen oder persönlichen Angaben.'],
 es: ['Ayúdanos a mejorar Politangle','¿Las preguntas eran fáciles de entender?','¿Te parecieron políticamente justas y equilibradas?','¿Qué tan útil te resultó el cuestionario?','¿Cómo podemos mejorar Politangle?','Nada','Mucho','Enviar comentarios','Gracias por tus comentarios.','No se pudo enviar. Inténtalo de nuevo.','Opcional. No incluyas nombres ni datos personales.'],
 fr: ['Aide-nous à améliorer Politangle','Les questions étaient-elles faciles à comprendre ?','Les questions te semblaient-elles politiquement justes et équilibrées ?','Le quiz t’a-t-il été utile ?','Comment pouvons-nous améliorer Politangle ?','Pas du tout','Beaucoup','Envoyer','Merci pour ton avis.','Échec de l’envoi. Réessaie.','Facultatif. N’indique aucun nom ni donnée personnelle.'],
 'pt-br': ['Ajude a melhorar o Politangle','As perguntas eram fáceis de entender?','As perguntas pareceram politicamente justas e equilibradas?','O quiz foi útil para você?','Como podemos melhorar o Politangle?','Nem um pouco','Muito','Enviar avaliação','Obrigado pela sua avaliação.','Não foi possível enviar. Tente novamente.','Opcional. Não inclua nomes nem dados pessoais.']
} as const;

export default function QuizFeedback({quiz,age='unspecified',language}:{quiz:string;age?:'junior'|'youth'|'adult'|'unspecified';language?:'en'|'es'}) {
 const {locale:siteLocale}=useLocale();
 const locale=language??siteLocale;
 const c=copy[locale] ?? copy.en;
 const [ratings,setRatings]=useState<(number|null)[]>([null,null,null]);
 const [comment,setComment]=useState('');
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [submissionId]=useState(()=>typeof crypto!=='undefined' && typeof crypto.randomUUID==='function'?crypto.randomUUID():'');
 async function submit(){
  if(status==='sending'||status==='sent'||!submissionId)return;
  setStatus('sending');
  try{
   const res=await fetch('/api/quiz-feedback',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',body:JSON.stringify({quiz,age,locale,ratings,comment:comment.trim(),submissionId})});
   if(!res.ok)throw new Error('feedback');
   setStatus('sent');
  }catch{setStatus('error');}
 }
 return <article className="engine-card" style={{marginTop:20}}>
  <h2 style={{fontSize:22}}>{c[0]}</h2>
  {status==='sent'?<p role="status">{c[8]}</p>:<form onSubmit={e=>{e.preventDefault();void submit();}}>
   <p className="engine-help">{c[10]}</p>
   {ratings.map((rating,i)=><fieldset key={i} style={{border:0,padding:0,margin:'16px 0'}}>
    <legend style={{fontWeight:600,marginBottom:8}}>{c[i+1]}</legend>
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{[1,2,3,4,5].map(n=><button key={n} type="button" aria-pressed={rating===n} aria-label={String(n)} className={'quick-scale-answer'+(rating===n?' selected':'')} style={{minWidth:44,minHeight:44,padding:8}} onClick={()=>setRatings(old=>old.map((v,j)=>i===j?(v===n?null:n):v))}>{n}</button>)}</div>
    <small>{c[5]} · 1 — 5 · {c[6]}</small>
   </fieldset>)}
   <label style={{display:'block',fontWeight:600}}>{c[4]}<textarea maxLength={500} value={comment} onChange={e=>setComment(e.target.value)} rows={3} style={{display:'block',width:'100%',marginTop:8,padding:10,border:'1px solid #c9bfb9',borderRadius:8}}/></label>
   <button className="engine-primary-link" style={{marginTop:12}} disabled={status==='sending'||(!ratings.some(v=>v!==null)&&!comment.trim())} type="submit">{c[7]}</button>
   {status==='error'&&<p role="alert">{c[9]}</p>}
  </form>}
 </article>;
}
