import { getAdminDb } from './firebase-admin';
import {
  SCHOOL_LICENSE_COLLECTION,
  isSchoolTeacherLicenseRecord,
  normalizeSchoolLicenseKey,
  schoolLicenseDocumentId,
} from './school-license';

export async function resolveSchoolTeacherLicense(rawKey: unknown) {
  const key = normalizeSchoolLicenseKey(rawKey);
  if (!key) return null;
  const documentId = schoolLicenseDocumentId(key);
  const ref = getAdminDb().collection(SCHOOL_LICENSE_COLLECTION).doc(documentId);
  const snapshot = await ref.get();
  if (!snapshot.exists) return null;
  const record = snapshot.data();
  if (!isSchoolTeacherLicenseRecord(record)) return null;
  return { key, documentId, ref, record };
}
