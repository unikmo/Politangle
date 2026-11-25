import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../lib/firebase-db';
import { FieldValue } from 'firebase-admin/firestore';

const quizzes=new Set(['believe-quick','believe-full','classify','understand','populism','middle-class-trap']);
const ages=new Set(['junior','youth','adult','unspecified']);
const locales=new Set(['en','de','es','fr','pt-br']);
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return NextResponse.json({error:'Forbidden'},{status:403});
 try{
  const raw=await request.text();
  if(raw.length>4096)return NextResponse.json({error:'Too large'},{status:413});
  const b=JSON.parse(raw);
  if(!b||!quizzes.has(b.quiz)||!ages.has(b.age)||!locales.has(b.locale)||
   typeof b.submissionId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(b.submissionId)||
   !Array.isArray(b.ratings)||b.ratings.length!==3||!b.ratings.every((v:unknown)=>v===null||(typeof v==='number'&&Number.isInteger(v)&&v>=1&&v<=5))||
   typeof b.comment!=='string'||b.comment.length>500||(!b.ratings.some((v:unknown)=>v!==null)&&!b.comment.trim()))
   return NextResponse.json({error:'Invalid feedback'},{status:400});
  const db=getAdminDb();
  const aggregate=db.collection('quizFeedbackAggregates').doc(['v1',b.quiz,b.age,b.locale].join('_'));
  const receipt=db.collection('quizFeedbackReceipts').doc(b.submissionId);
  await db.runTransaction(async tx=>{
   if((await tx.get(receipt)).exists)return;
   const values:Record<string,unknown>={version:'v1',quiz:b.quiz,age:b.age,locale:b.locale,submissions:FieldValue.increment(1)};
   ['clarity','fairness','usefulness'].forEach((key,i)=>{if(b.ratings[i]!==null){values[key+'Count']=FieldValue.increment(1);values[key+'Sum']=FieldValue.increment(b.ratings[i]);values[key+'Rating'+b.ratings[i]]=FieldValue.increment(1);}});
   tx.set(aggregate,values,{merge:true});
   tx.create(receipt,{createdAt:FieldValue.serverTimestamp()});
   if(b.comment.trim())tx.create(db.collection('quizFeedbackSuggestions').doc(),{version:'v1',quiz:b.quiz,age:b.age,locale:b.locale,comment:b.comment.trim(),createdAt:FieldValue.serverTimestamp()});
  });
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Unable to save feedback'},{status:503});}
}
