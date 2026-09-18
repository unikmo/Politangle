import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../../lib/auth-session';

const QUICK_COMPLETED_COOKIE = 'politangle_quick_completed';

function registrationAvailable() {
  const adminConfigured = Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
    (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY)
  );
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY && adminConfigured);
}

export async function GET() {
  const store = await cookies();
  const completedBefore = store.get(QUICK_COMPLETED_COOKIE)?.value === '1';
  const available = registrationAvailable();
  const user = available ? await authenticatedCertificationUser() : null;

  return NextResponse.json({
    completedBefore,
    authenticated: Boolean(user),
    registrationAvailable: available,
    repeatRegistrationRequired: completedBefore && !user && available,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
