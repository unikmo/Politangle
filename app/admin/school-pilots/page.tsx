'use client';

import Link from 'next/link';
import { useEffect,useState } from 'react';

type RequestItem={id:string;school:string;contactName:string;contactEmail:string;country:string;role:string;notes:string;submittedAt:string;status:string};
export default function SchoolPilotInbox(){
 const [requests,setRequests]=useState<RequestItem[]>([]);
 const [state,setState]=useState('Loading school pilot requests…');
 useEffect(()=>{
  fetch('/api/admin/school-pilots',{cache:'no-store'})
   .then(async r=>{if(!r.ok)throw new Error(r.status===403?'Admin authorization is required.':'Inbox unavailable.');return r.json();})
   .then(j=>{setRequests(j.requests??[]);setState('');})
   .catch(e=>setState(e instanceof Error?e.message:'Inbox unavailable.'));
 },[]);
 return <main className="engine-page admin-page">
  <header className="engine-header"><Link className="engine-brand" href="/admin">← Politangle Admin</Link><span>PROTECTED OPERATIONS</span></header>
  <section className="engine-shell admin-shell"><article className="engine-card">
   <p className="engine-kicker">SCHOOL EDITION / PILOT INTAKE</p>
   <h1>School pilot participation requests</h1>
   <p>Requests are applications only. No teacher license or classroom is issued automatically. Complete legal, safeguarding, accessibility and educational review before inviting a school to use the pilot with students.</p>
   {state&&<p role="status">{state}</p>}
   {!state&&<p>{requests.length} request(s) returned. Newest first; first 100 shown.</p>}
  </article>
  {requests.map(x=><article key={x.id} className="engine-card admin-panel">
   <p className="engine-kicker">{x.status==='requested'?'REVIEW PENDING':x.status.toUpperCase()}</p>
   <h2>{x.school}</h2>
   <p><strong>School contact:</strong> {x.contactName} · {x.role}</p>
   <p><strong>Email:</strong> <a href={`mailto:${encodeURIComponent(x.contactEmail)}`}>{x.contactEmail}</a></p>
   <p><strong>Region:</strong> {x.country} · {x.submittedAt?.slice(0,16).replace('T',' ')||'Date not recorded'} UTC</p>
   {x.notes&&<p><strong>Testing interest:</strong> {x.notes}</p>}
   <p><strong>Access:</strong> Not granted automatically.</p>
  </article>)}
  </section>
 </main>;
}
