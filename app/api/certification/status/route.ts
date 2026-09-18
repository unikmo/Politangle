import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../lib/auth-session';
import { attemptAvailability, certificationReadiness } from '../../../../lib/certification-server';
import { getAdminDb } from '../../../../lib/firebase-admin';

export async function GET() {
  const readiness = certificationReadiness();
  const publicReadiness = { enabled: readiness.enabled, bankReady: readiness.bankReady, bankVersion: readiness.bankVersion };
  const user = await authenticatedCertificationUser();
  if (!user) return NextResponse.json({ readiness: publicReadiness, authenticated: false }, { headers: { 'Cache-Control': 'no-store' } });
  const guard = await getAdminDb().collection('certificationAttemptGuards').doc(user.uid).get();
  const starts = Array.isArray(guard.data()?.recentAttemptStarts) ? guard.data()!.recentAttemptStarts.filter((value: unknown): value is string => typeof value === 'string') : [];
  return NextResponse.json({
    readiness: publicReadiness,
    authenticated: true,
    emailVerified: user.emailVerified,
    certificationAgeConfirmed: user.certificationAgeConfirmed,
    attempts: attemptAvailability(starts),
  }, { headers: { 'Cache-Control': 'no-store' } });
}
