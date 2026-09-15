import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../../lib/auth-session';
import { getAdminDb } from '../../../../../lib/firebase-admin';

export async function GET(request: Request) {
  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ error: 'SIGN_IN_REQUIRED' }, { status: 401 });
  const sessionId = new URL(request.url).searchParams.get('session_id');
  if (!sessionId?.startsWith('cs_')) return NextResponse.json({ error: 'INVALID_SESSION' }, { status: 400 });
  const snapshot = await getAdminDb().collection('certificateIssuances').where('stripeSessionId', '==', sessionId).limit(1).get();
  const record = snapshot.docs[0]?.data();
  if (!record || record.uid !== user.uid) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  return NextResponse.json({ status: record.status, certificateId: record.certificateId ?? null }, { headers: { 'Cache-Control': 'no-store' } });
}
