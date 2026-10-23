import { cookies } from 'next/headers';
import {schoolResultsPdf} from '../../../../lib/school-assessment-pdf';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { SCHOOL_LICENSE_COOKIE,schoolLicenseAllowsSession } from '../../../../lib/school-license';
import { resolveSchoolTeacherLicense } from '../../../../lib/school-license-server';
import { ASSESSMENTS,createPaperCodes,makeAssessment,expired } from '../../../../lib/school-assessment';

export const runtime='nodejs';
const noStore={'Cache-Control':'no-store'};
const error=(msg:string,status:number)=>NextResponse.json({error:msg},{status,headers:noStore});
async function license() {
 const store=await cookies();
 const access=await resolveSchoolTeacherLicense(store.get(SCHOOL_LICENSE_COOKIE)?.value);
 return access&&schoolLicenseAllowsSession(access.record)?access:null;
}
export async function POST(req:Request) {
 const access=await license();
 if(!access)return error('Approved teacher access required.',403);
 const raw=await req.json().catch(()=>null);
 let data:ReturnType<typeof makeAssessment>;
 try {data=makeAssessment(raw,access.record.schoolId,access.documentId);}
 catch(e){return error(e instanceof Error?e.message:'Invalid assessment.',400);}
 const ref=getAdminDb().collection(ASSESSMENTS).doc(data.id);
 await ref.create({...data.record,expiresAtTimestamp:new Date(data.record.expiresAt)});
 return NextResponse.json({id:data.id,password:data.password,paperNumbers:data.codes,title:data.record.title,expiresAt:data.record.expiresAt},{status:201,headers:noStore});
}
export async function GET(req:Request) {
 const access=await license();
 if(!access)return error('Approved teacher access required.',403);
 const id=new URL(req.url).searchParams.get('id');
 if(id){
  if(!/^[a-f0-9]{24}$/.test(id))return error('Invalid assessment.',400);
  const snap=await getAdminDb().collection(ASSESSMENTS).doc(id).get();
  if(!snap.exists)return error('Assessment not found.',404);
  const data=snap.data()!;
  if(data.teacherLicenseId!==access.documentId||data.schoolId!==access.record.schoolId)return error('Forbidden.',403);
  if(expired(data))return error('Assessment expired.',410);
  const answers=await snap.ref.collection('answers').get();
  const rows=answers.docs.map(d=>d.data()).sort((a,b)=>a.paperNumber.localeCompare(b.paperNumber));
  if(new URL(req.url).searchParams.get('format')==='pdf') {
   const pdf=schoolResultsPdf(data.title,id,rows as Parameters<typeof schoolResultsPdf>[2]);
   return new Response(Buffer.from(pdf),{headers:{...noStore,'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="politangle-assessment-${id}.pdf"`}});
  }
  return NextResponse.json({id,title:data.title,createdAt:data.createdAt,expiresAt:data.expiresAt,
   questionIds:data.activity.questionIds,rows},{headers:noStore});
 }
 const snap=await getAdminDb().collection(ASSESSMENTS).where('teacherLicenseId','==',access.documentId).get();
 return NextResponse.json({assessments:snap.docs.map(d=>({id:d.id,title:d.data().title,expiresAt:d.data().expiresAt,expired:expired(d.data()),studentCount:d.data().studentCount}))},{headers:noStore});
}
export async function DELETE(req:Request){
 const access=await license();
 if(!access)return error('Approved teacher access required.',403);
 const id=new URL(req.url).searchParams.get('id');
 if(!id||!/^[a-f0-9]{24}$/.test(id))return error('Invalid assessment.',400);
 const ref=getAdminDb().collection(ASSESSMENTS).doc(id),snap=await ref.get();
 if(!snap.exists)return error('Assessment not found.',404);
 const data=snap.data()!;
 if(data.teacherLicenseId!==access.documentId||data.schoolId!==access.record.schoolId)return error('Forbidden.',403);
 await ref.update({status:'deleted',deletedAt:new Date().toISOString()});
 await getAdminDb().recursiveDelete(ref);
 return NextResponse.json({deleted:true},{headers:noStore});
}
