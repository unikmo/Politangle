import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../lib/auth-session';
import { getAdminDb } from '../../../../lib/firebase-admin';

const noStore = { 'Cache-Control': 'no-store' };

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Cross-site request is not allowed.' }, { status: 403, headers: noStore });
  }

  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ error: 'SIGN_IN_REQUIRED' }, { status: 401, headers: noStore });

  const now = new Date().toISOString();
  await getAdminDb().collection('certificationUsers').doc(user.uid).set({ adultConfirmedAt: now, updatedAt: now }, { merge: true });
  return NextResponse.json({ adultConfirmed: true }, { headers: noStore });
}
