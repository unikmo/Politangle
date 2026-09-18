import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../lib/auth-session';
import { publicCertificate } from '../../../../lib/certificate-server';
import { getAdminDb } from '../../../../lib/firebase-admin';

export async function GET() {
  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ error: 'SIGN_IN_REQUIRED' }, { status: 401 });
  const snapshot = await getAdminDb().collection('certificates').where('uid', '==', user.uid).limit(25).get();
  const certificates = snapshot.docs.map((doc) => publicCertificate(doc.id, doc.data())).filter((value) => value !== null).sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
  return NextResponse.json({ emailVerified: user.emailVerified, certificationAgeConfirmed: user.certificationAgeConfirmed, isAdmin: user.isAdmin, certificates }, { headers: { 'Cache-Control': 'no-store' } });
}
