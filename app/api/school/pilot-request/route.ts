import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';

export const runtime = 'nodejs';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const limits = { school: 120, name: 100, email: 254, country: 80, role: 70, notes: 900 };
const reply = (message: string,status: number) =>
  NextResponse.json({error:message},{status,headers:{'Cache-Control':'no-store'}});

export async function POST(request:Request){
 const origin=request.headers.get('origin');
 const host=request.headers.get('host');
 if(origin){
  try { if(new URL(origin).host!==host)return reply('Invalid request origin.',403); }
  catch { return reply('Invalid request origin.',403); }
 }
 if(Number(request.headers.get('content-length')||0)>7000)return reply('Request too large.',413);
 const raw=await request.json().catch(()=>null);
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return reply('Invalid request.',400);
 const item=raw as Record<string,unknown>;
 if(item.website)return NextResponse.json({accepted:true,pendingReview:true});
 const clean=(key:keyof typeof limits)=>{
  const value=item[key];
  return typeof value==='string'?value.trim().slice(0,limits[key]+1):'';
 };
 const school=clean('school'),name=clean('name'),email=clean('email').toLowerCase(),country=clean('country'),role=clean('role'),notes=clean('notes');
 const consent=item.consent===true;
 if(!school||!name||!email||!country||!role||!consent)return reply('Complete the required school-contact fields and consent.',400);
 if(!emailPattern.test(email)||Object.keys(limits).some(k=>(item[k] as string)?.length>limits[k as keyof typeof limits]))return reply('Invalid or overly long field.',400);
 if(/(?:@students?\.|@pupils?\.)/i.test(email))return reply('Use a staff or institutional contact, not a student account.',400);
 const date=new Date().toISOString();
 const key=createHash('sha256').update(email+'\0'+school.toLowerCase()+'\0'+date.slice(0,10)).digest('hex');
 try {
  const db=getAdminDb();
  const ref=db.collection('schoolPilotRequests').doc(key);
  await ref.create({
   school,contactName:name,contactEmail:email,country,role,notes,
   submittedAt:date,status:'requested',reviewedAt:null,
   consentVersion:'school-pilot-interest-v1',
   applicantType:'adult-school-contact',authorizedForClassroom:false,
   studentDataCollected:false,
  });
  return NextResponse.json({accepted:true,pendingReview:true},{status:202,headers:{'Cache-Control':'no-store'}});
 } catch(error){
  const code=(error as {code?:number|string})?.code;
  if(code===6||code==='already-exists')return NextResponse.json({accepted:true,pendingReview:true},{status:202,headers:{'Cache-Control':'no-store'}});
  console.error('School pilot intake unavailable',error instanceof Error?error.name:'unknown');
  return reply('Unable to record the request. Please try again later.',503);
 }
}
