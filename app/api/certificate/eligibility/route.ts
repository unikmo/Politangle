import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../lib/auth-session';
import { certificatePrice } from '../../../../lib/stripe-server';
import { getAdminDb } from '../../../../lib/firebase-admin';

export async function GET(request: Request) {
  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ error: 'SIGN_IN_REQUIRED' }, { status: 401 });
  const attemptId = new URL(request.url).searchParams.get('attemptId');
  const renewCertificateId = new URL(request.url).searchParams.get('renew');
  if (!attemptId || !/^att_[A-Za-z0-9_-]{32}$/.test(attemptId)) return NextResponse.json({ error: 'ATTEMPT_REQUIRED' }, { status: 400 });
  const snapshot = await getAdminDb().collection('certificateEligibilities').doc(attemptId).get();
  const eligibility = snapshot.data();
  if (!eligibility || eligibility.uid !== user.uid || eligibility.status !== 'eligible') return NextResponse.json({ eligible: false }, { status: 404 });
  let kind: 'issuance' | 'renewal' = 'issuance';
  if (renewCertificateId) {
    const oldSnapshot = await getAdminDb().collection('certificates').doc(renewCertificateId).get();
    const old = oldSnapshot.data();
    if (!old || old.uid !== user.uid || typeof old.expiresAt !== 'string' || new Date(old.expiresAt).getTime() > Date.now()) {
      return NextResponse.json({ error: 'RENEWAL_NOT_AVAILABLE' }, { status: 400 });
    }
    kind = 'renewal';
  }
  return NextResponse.json({ eligible: true, attemptId, priceCents: certificatePrice(kind), currency: 'EUR', scores: eligibility.scores }, { headers: { 'Cache-Control': 'no-store' } });
}
