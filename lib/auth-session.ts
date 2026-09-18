import { cookies } from 'next/headers';
import { getAdminAuth, getAdminDb } from './firebase-admin';

export const AUTH_SESSION_COOKIE = 'politangle_session';
export const AUTH_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;

export type CertificationUser = {
  uid: string;
  emailVerified: boolean;
  certificationAgeConfirmed: boolean;
  isAdmin: boolean;
};

export async function authenticatedCertificationUser(): Promise<CertificationUser | null> {
  const store = await cookies();
  const session = store.get(AUTH_SESSION_COOKIE)?.value;
  if (!session) return null;
  try {
    const decoded = await getAdminAuth().verifySessionCookie(session, true);
    const profile = await getAdminDb().collection('certificationUsers').doc(decoded.uid).get();
    const adminUids = new Set((process.env.POLITANGLE_ADMIN_UIDS ?? '').split(',').map((value) => value.trim()).filter(Boolean));
    return {
      uid: decoded.uid,
      emailVerified: decoded.email_verified === true,
      certificationAgeConfirmed: profile.data()?.certificationAgeConfirmedAt != null || profile.data()?.adultConfirmedAt != null,
      isAdmin: decoded.admin === true || adminUids.has(decoded.uid),
    };
  } catch {
    return null;
  }
}

export async function authenticatedAdmin() {
  const user = await authenticatedCertificationUser();
  return user?.isAdmin ? user : null;
}
