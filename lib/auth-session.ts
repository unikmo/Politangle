import { cookies } from 'next/headers';
import { getAdminAuth, getAdminDb } from './firebase-admin';

export const AUTH_SESSION_COOKIE = 'politangle_session';
export const AUTH_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;

export type CertificationUser = {
  uid: string;
  emailVerified: boolean;
  adultConfirmed: boolean;
};

export async function authenticatedCertificationUser(): Promise<CertificationUser | null> {
  const store = await cookies();
  const session = store.get(AUTH_SESSION_COOKIE)?.value;
  if (!session) return null;
  try {
    const decoded = await getAdminAuth().verifySessionCookie(session, true);
    const profile = await getAdminDb().collection('certificationUsers').doc(decoded.uid).get();
    return {
      uid: decoded.uid,
      emailVerified: decoded.email_verified === true,
      adultConfirmed: profile.data()?.adultConfirmedAt != null,
    };
  } catch {
    return null;
  }
}
