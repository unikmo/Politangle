'use client';
import {useState} from 'react';
type Question={id:string;kind:'believe'|'literacy';statement?:string;prompt?:string;options:{id:string;label:string}[];multiSelect?:boolean};
export default function AssessmentStudent({id}:{id:string}){
 const [paperNumber,setPaperNumber]=useState(''),[password,setPassword]=useState(''),[questions,setQuestions]=useState<Question[]>([]),[answers,setAnswers]=useState<Record<string,string|string[]>>({}),[title,setTitle]=useState(''),[message,setMessage]=useState(''),[completed,setCompleted]=useState(false);
 async function call(action:string){
  const response=await fetch('/api/school/assessments/'+encodeURIComponent(id),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action,paperNumber,password,answers})});
  const data=await response.json();if(!response.ok){setMessage(data.error||'Request failed.');return;}
  if(action==='questions'){setQuestions(data.questions);setTitle(data.title);setMessage('');}else{setCompleted(true);setMessage('Your answers have been submitted.');}
 }
 function toggle(question:Question,option:string){setAnswers(prev=>{const current=prev[question.id];if(!question.multiSelect)return {...prev,[question.id]:option};const values=Array.isArray(current)?current:[];return {...prev,[question.id]:values.includes(option)?values.filter(x=>x!==option):[...values,option]};});}
 return <main className="engine-page"><section className="engine-shell school-shell"><article className="engine-card">
 <p className="engine-kicker">Politangle School · Assessment</p><h1>{title||'Join your assessment'}</h1>
 {!questions.length&&!completed&&<><p>Enter the session password and the random number your teacher gave you. Do not enter your name.</p><label>Paper number <input inputMode="numeric" maxLength={8} value={paperNumber} onChange={e=>setPaperNumber(e.target.value.replace(/\D/g,''))}/></label><label>Session password <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label><button className="engine-primary-link" type="button" onClick={()=>call('questions')}>Start assessment</button></>}
 {!completed&&questions.map((q,i)=><fieldset key={q.id} className="engine-card"><legend>{i+1}. {q.statement||q.prompt||q.id}</legend>{q.options.map(o=><label key={o.id} style={{display:'block',padding:'8px'}}><input type={q.multiSelect?'checkbox':'radio'} name={q.id} checked={q.multiSelect?Array.isArray(answers[q.id])&&(answers[q.id] as string[]).includes(o.id):answers[q.id]===o.id} onChange={()=>toggle(q,o.id)}/>{o.label}</label>)}</fieldset>)}
 {!completed&&questions.length>0&&<button className="engine-primary-link" type="button" disabled={questions.some(q=>!answers[q.id]||(Array.isArray(answers[q.id])&&!(answers[q.id] as string[]).length))} onClick={()=>call('submit')}>Submit answers</button>}
 {message&&<p role="status">{message}</p>}</article></section></main>;
}
