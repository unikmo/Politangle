import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AUTH_SESSION_COOKIE, AUTH_SESSION_MAX_AGE_SECONDS, authenticatedCertificationUser } from '../../../../lib/auth-session';
import { getAdminAuth, getAdminDb } from '../../../../lib/firebase-admin';

const noStore = { 'Cache-Control': 'no-store' };

export async function GET() {
  const user = await authenticatedCertificationUser();
  return NextResponse.json({ authenticated: Boolean(user), user: user ? { emailVerified: user.emailVerified, adultConfirmed: user.adultConfirmed, isAdmin: user.isAdmin } : null }, { headers: noStore });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: 'Cross-site session creation is not allowed.' }, { status: 403, headers: noStore });
  }
  const input = await request.json().catch(() => ({})) as { idToken?: unknown; adultConfirmed?: unknown };
  if (typeof input.idToken !== 'string' || input.idToken.length < 100) {
    return NextResponse.json({ error: 'A valid Firebase ID token is required.' }, { status: 400, headers: noStore });
  }
  try {
    const decoded = await getAdminAuth().verifyIdToken(input.idToken, true);
    const expiresIn = AUTH_SESSION_MAX_AGE_SECONDS * 1000;
    const session = await getAdminAuth().createSessionCookie(input.idToken, { expiresIn });
    const now = new Date().toISOString();
    const update: Record<string, unknown> = { updatedAt: now };
    if (input.adultConfirmed === true) update.adultConfirmedAt = now;
    const profileRef = getAdminDb().collection('certificationUsers').doc(decoded.uid);
    await profileRef.set(update, { merge: true });
    const profile = await profileRef.get();
    const store = await cookies();
    store.set(AUTH_SESSION_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: AUTH_SESSION_MAX_AGE_SECONDS,
    });
    const adminUids = new Set((process.env.POLITANGLE_ADMIN_UIDS ?? '').split(',').map((value) => value.trim()).filter(Boolean));
    return NextResponse.json({
      authenticated: true,
      emailVerified: decoded.email_verified === true,
      adultConfirmed: profile.data()?.adultConfirmedAt != null,
      isAdmin: decoded.admin === true || adminUids.has(decoded.uid),
    }, { headers: noStore });
  } catch {
    return NextResponse.json({ error: 'The sign-in token could not be verified.' }, { status: 401, headers: noStore });
  }
}

export async function DELETE() {
  const store = await cookies();
  store.set(AUTH_SESSION_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  return NextResponse.json({ authenticated: false }, { headers: noStore });
}
