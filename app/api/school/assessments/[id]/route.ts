import {NextResponse} from 'next/server';
import {loadAssessment,expired,digest,validStudentCode,verifySecret,gradeAnswer} from '../../../../../lib/school-assessment';
import {getClassroomQuestion,publicClassroomQuestion} from '../../../../../lib/school-classroom';
export const runtime='nodejs';
const fail=(error:string,status:number)=>NextResponse.json({error},{status,headers:{'Cache-Control':'no-store'}});
type Context={params:Promise<{id:string}>};
export async function POST(req:Request,context:Context){
 const {id}=await context.params;
 const row=await loadAssessment(id);
 if(!row||expired(row.data)||row.data.status!=='active')return fail('Assessment unavailable.',404);
 const raw=await req.json().catch(()=>null) as Record<string,unknown>|null;
 if(!raw||!validStudentCode(raw.paperNumber)||typeof raw.password!=='string'||!verifySecret(raw.password,row.data.passwordHash))return fail('Invalid session credentials.',403);
 const codeHash=digest(raw.paperNumber);
 if(!row.data.allowedCodes.includes(codeHash))return fail('Invalid student number.',403);
 if(raw.action==='questions'){
  return NextResponse.json({title:row.data.title,questionIds:row.data.activity.questionIds,
   questions:row.data.activity.questionIds.map((q:string)=>publicClassroomQuestion(q,false,row.data.activity.ageBand)),
   expiresAt:row.data.expiresAt},{headers:{'Cache-Control':'no-store'}});
 }
 if(raw.action!=='submit'||!raw.answers||typeof raw.answers!=='object'||Array.isArray(raw.answers))return fail('Invalid submission.',400);
 const ageBand=row.data.activity.ageBand as 'junior-10-13'|'youth-14-18';
 const ids=row.data.activity.questionIds as string[];
 const submitted=raw.answers as Record<string,unknown>;
 if(Object.keys(submitted).length!==ids.length||Object.keys(submitted).some(id=>!ids.includes(id)))return fail('Complete all questions before submission.',400);
 const responses=ids.map(id=>{
  const evaluated=gradeAnswer(id,submitted[id],ageBand);
  return evaluated?{questionId:id,question:getClassroomQuestion(id,ageBand)?.statement||getClassroomQuestion(id,ageBand)?.prompt||id,
   answer:evaluated.answer,correct:evaluated.correct}:null;
 });
 if(responses.some(x=>!x))return fail('Invalid answer.',400);
 const correct=responses.filter(x=>x?.correct===true).length;
 const graded=responses.filter(x=>x?.correct!==null).length;
 const answerRef=row.ref.collection('answers').doc(codeHash);
 try {
  await row.ref.firestore.runTransaction(async tx=>{
   const [current,assessment]=await Promise.all([tx.get(answerRef),tx.get(row.ref)]);
   if(current.exists)throw new Error('DUPLICATE');
   if(!assessment.exists||expired(assessment.data()!)||assessment.data()?.status!=='active')throw new Error('CLOSED');
   tx.create(answerRef,{paperNumber:raw.paperNumber,responses,correct,graded,submittedAt:new Date().toISOString(),expiresAtTimestamp:new Date(row.data.expiresAt)});
  });
 }catch(e){
  return fail(e instanceof Error&&e.message==='DUPLICATE'?'Student number already submitted.':'Submission not accepted.',409);
 }
 return NextResponse.json({submitted:true,correct,graded},{headers:{'Cache-Control':'no-store'}});
}
