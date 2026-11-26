import { NextResponse } from 'next/server';
import { authenticatedAdmin } from '../../../../lib/auth-session';
import { getAdminDb } from '../../../../lib/firebase-db';

export async function GET() {
 if (!await authenticatedAdmin()) return NextResponse.json({error:'ADMIN_REQUIRED'},{status:403});
 try {
  const db=getAdminDb();
  const [ratings, suggestions, unclear]=await Promise.all([
   db.collection('quizFeedbackAggregates').limit(500).get(),
   db.collection('quizFeedbackSuggestions').orderBy('createdAt','desc').limit(100).get(),
   db.collection('quizQuestionQuality').limit(2000).get()
  ]);
  return NextResponse.json({
   ratings:ratings.docs.map(d=>({id:d.id,...d.data()})),
   suggestions:suggestions.docs.map(d=>({id:d.id,...d.data()})),
   unclear:unclear.docs.map(d=>({id:d.id,...d.data()}))
  },{headers:{'Cache-Control':'no-store'}});
 } catch {return NextResponse.json({error:'Feedback unavailable'},{status:503});}
}
