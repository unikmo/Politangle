'use client';
import {useState} from 'react';
import {classroomActivityOptions,getClassroomQuestion} from '../../../lib/school-classroom';
type Row={paperNumber:string;responses:{questionId:string;question:string;answer:string|string[];correct:boolean|null}[];correct:number;graded:number;submittedAt:string};
const banks=classroomActivityOptions();
export default function TeacherAssessments(){
 const [title,setTitle]=useState('Class assessment'),[ageBand,setAgeBand]=useState<'junior-10-13'|'youth-14-18'>('youth-14-18');
 const [ids,setIds]=useState<string[]>([]),[count,setCount]=useState(25),[created,setCreated]=useState<{id:string;password:string;paperNumbers:string[];expiresAt:string}|null>(null);
 const [existing,setExisting]=useState(''),[result,setResult]=useState<{id:string;title:string;rows:Row[];expiresAt:string}|null>(null),[message,setMessage]=useState('');
 const available=[...(ageBand==='junior-10-13'?banks.junior:banks.full42),...banks.literacy];
 function download(filename:string,content:string,type:string){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);}
 async function create(){
  const res=await fetch('/api/school/assessments',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({title,ageBand,questionIds:ids,studentCount:count})});
  const data=await res.json();if(!res.ok){setMessage(data.error);return;}setCreated(data);setExisting(data.id);setMessage('Assessment created. Print and distribute the numbers privately.');
 }
 async function load(){
  const res=await fetch('/api/school/assessments?id='+encodeURIComponent(existing),{cache:'no-store'});
  const data=await res.json();if(!res.ok){setMessage(data.error);return;}setResult(data);
 }
 async function remove(){
  if(!result||!window.confirm('Permanently delete this assessment and ALL its student responses?'))return;
  const res=await fetch('/api/school/assessments?id='+encodeURIComponent(result.id),{method:'DELETE'});
  if(res.ok){setResult(null);setCreated(null);setMessage('Assessment and responses deleted.');}else setMessage('Deletion failed.');
 }
 function exportCsv(){
  if(!result)return;
  const safe=(v:unknown)=>'"'+String(v??'').replace(/^[=+@\-\t\r]/,'\u0027$&').replace(/"/g,'""')+'"';
  const csv=[['Student number','Question ID','Question','Answer','Correct','Submitted at'].map(safe).join(','),
   ...result.rows.flatMap(row=>row.responses.map(q=>[row.paperNumber,q.questionId,q.question,Array.isArray(q.answer)?q.answer.join(' | '):q.answer,q.correct===null?'Not scored':q.correct?'Yes':'No',row.submittedAt].map(safe).join(',')))].join('\r\n');
  download('politangle-assessment-'+result.id+'.csv',csv,'text/csv;charset=utf-8');
 }
 return <section className="engine-shell school-shell">
  <article className="engine-card"><p className="engine-kicker">Teacher assessment</p><h2>Individual tests with paper numbers</h2>
   <p>Choose existing Politangle questions. Only you hold the paper-number-to-student mapping. No student accounts or names are collected.</p>
   <div className="school-config-grid"><label>Assessment title <input value={title} onChange={e=>setTitle(e.target.value)}/></label>
    <label>Age band <select value={ageBand} onChange={e=>{setAgeBand(e.target.value as typeof ageBand);setIds([]);}}><option value="junior-10-13">10–13</option><option value="youth-14-18">14–18</option></select></label>
    <label>Number of paper numbers (1–60) <input type="number" min={1} max={60} value={count} onChange={e=>setCount(Number(e.target.value))}/></label></div>
   <details><summary>Select questions ({ids.length})</summary><div className="school-question-picker">{available.map(id=><label key={id}><input type="checkbox" checked={ids.includes(id)} onChange={()=>setIds(prev=>prev.includes(id)?prev.filter(v=>v!==id):[...prev,id])}/>{id} · {getClassroomQuestion(id,ageBand)?.title}</label>)}</div></details>
   <button className="engine-primary-link" type="button" disabled={!ids.length} onClick={create}>Create assessment and numbers</button>
   {created&&<div><h3>Print before leaving this page</h3><p>Student link: <strong>{typeof window!=='undefined'?window.location.origin:''}/school/assessment/{created.id}</strong></p><p>Session password: <strong>{created.password}</strong></p><p>Student numbers: {created.paperNumbers.join(' · ')}</p><p>Maximum expiry: {new Date(created.expiresAt).toLocaleDateString()}</p><button type="button" onClick={()=>window.print()}>Print number sheet</button></div>}
  </article>
  <article className="engine-card"><h2>Retrieve, export or delete results</h2><p>Enter the assessment ID shown in the student link.</p><input value={existing} onChange={e=>setExisting(e.target.value)} placeholder="Assessment ID" /><button type="button" onClick={load}>View results</button>
   {result&&<><p>{result.rows.length} completed assessments · expires {new Date(result.expiresAt).toLocaleDateString()}</p>
    <div className="engine-result-actions"><button type="button" onClick={exportCsv}>Download per-question CSV</button><button type="button" onClick={()=>window.print()}>Print results</button><button type="button" onClick={remove}>Delete all results now</button></div>
    <div>{result.rows.map(row=><details key={row.paperNumber}><summary>Student number {row.paperNumber} — {row.correct}/{row.graded} scored questions</summary><table><thead><tr><th>Question</th><th>Answer</th><th>Correct</th></tr></thead><tbody>{row.responses.map(q=><tr key={q.questionId}><td>{q.questionId} · {q.question}</td><td>{Array.isArray(q.answer)?q.answer.join(', '):q.answer}</td><td>{q.correct===null?'Not scored':q.correct?'Yes':'No'}</td></tr>)}</tbody></table></details>)}</div></>}
  </article>{message&&<p role="status">{message}</p>}
 </section>;
}
