import { createHash, randomBytes } from 'node:crypto';

export const SCHOOL_LICENSE_SCHEMA = 1 as const;
export const SCHOOL_PACK_LICENSES = 10 as const;
export const SCHOOL_PACK_PRICE_USD = 300 as const;
export const SCHOOL_LICENSE_COOKIE = 'politangle_school_teacher_license';
export const SCHOOL_LICENSE_COLLECTION = 'schoolTeacherLicenses';
export const SCHOOL_ACCOUNT_COLLECTION = 'schoolAccounts';

export type SchoolTeacherLicenseRecord = {
  schemaVersion: typeof SCHOOL_LICENSE_SCHEMA;
  schoolId: string;
  schoolName: string;
  seatNumber: number;
  seatLabel: string;
  status: 'active' | 'revoked';
  createdAt: string;
  lastUsedAt: string | null;
  sessionCount: number;
};

export function normalizeSchoolLicenseKey(value: unknown) {
  if (typeof value !== 'string') return '';
  const normalized = value.trim().toUpperCase();
  return normalized.length >= 20 && normalized.length <= 128 ? normalized : '';
}

export function hashSchoolLicenseKey(value: string) {
  return createHash('sha256').update(normalizeSchoolLicenseKey(value)).digest('hex');
}

export function schoolLicenseDocumentId(value: string) {
  const normalized = normalizeSchoolLicenseKey(value);
  return normalized ? hashSchoolLicenseKey(normalized) : '';
}

export function makeSchoolLicenseKey() {
  return `POL-EDU-${randomBytes(18).toString('hex').toUpperCase()}`;
}

export function isSchoolTeacherLicenseRecord(value: unknown): value is SchoolTeacherLicenseRecord {
  if (!value || typeof value !== 'object') return false;
  const record = value as Partial<SchoolTeacherLicenseRecord>;
  return record.schemaVersion === SCHOOL_LICENSE_SCHEMA
    && typeof record.schoolId === 'string' && record.schoolId.length > 0
    && typeof record.schoolName === 'string' && record.schoolName.length > 0
    && Number.isInteger(record.seatNumber) && Number(record.seatNumber) >= 1 && Number(record.seatNumber) <= SCHOOL_PACK_LICENSES
    && typeof record.seatLabel === 'string' && record.seatLabel.length > 0
    && (record.status === 'active' || record.status === 'revoked')
    && typeof record.createdAt === 'string' && record.createdAt.length > 0
    && (record.lastUsedAt === null || typeof record.lastUsedAt === 'string')
    && Number.isInteger(record.sessionCount) && Number(record.sessionCount) >= 0;
}

export function schoolLicenseAllowsSession(record: SchoolTeacherLicenseRecord) {
  return record.status === 'active';
}

export function publicSchoolLicense(record: SchoolTeacherLicenseRecord) {
  return {
    schoolId: record.schoolId,
    schoolName: record.schoolName,
    seatNumber: record.seatNumber,
    seatLabel: record.seatLabel,
  };
}

export function createSchoolLicensePack(
  rawSchoolId: string,
  rawSchoolName: string,
  createdAt = new Date().toISOString(),
  keyFactory: () => string = makeSchoolLicenseKey,
) {
  const schoolId = rawSchoolId.trim();
  const schoolName = rawSchoolName.trim();
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]{1,63}$/.test(schoolId)) throw new Error('School ID must be a 2–64 character slug using letters, numbers, underscore or hyphen.');
  if (!schoolName || schoolName.length > 120) throw new Error('School name is required and must be 120 characters or fewer.');

  const seats = Array.from({ length: SCHOOL_PACK_LICENSES }, (_, index) => {
    const key = normalizeSchoolLicenseKey(keyFactory());
    if (!key) throw new Error('License key factory returned an invalid key.');
    const seatNumber = index + 1;
    const record: SchoolTeacherLicenseRecord = {
      schemaVersion: SCHOOL_LICENSE_SCHEMA,
      schoolId,
      schoolName,
      seatNumber,
      seatLabel: `Teacher license ${seatNumber}`,
      status: 'active',
      createdAt,
      lastUsedAt: null,
      sessionCount: 0,
    };
    return { key, documentId: schoolLicenseDocumentId(key), record };
  });

  if (new Set(seats.map((seat) => seat.documentId)).size !== SCHOOL_PACK_LICENSES) throw new Error('License key factory produced duplicate keys.');

  return {
    schoolId,
    schoolName,
    packagePriceUsd: SCHOOL_PACK_PRICE_USD,
    teacherLicenseCount: SCHOOL_PACK_LICENSES,
    createdAt,
    seats,
  };
}
