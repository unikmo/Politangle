import { randomBytes, randomInt } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { buildClassroomActivity, defaultClassroomActivity } from '../../../../lib/school-classroom';
import { createSchoolClassRecord, hashSchoolSecret } from '../../../../lib/school-aggregate';
import {
  SCHOOL_LICENSE_COOKIE,
  isSchoolTeacherLicenseRecord,
  publicSchoolLicense,
  schoolLicenseAllowsSession,
} from '../../../../lib/school-license';
import { resolveSchoolTeacherLicense } from '../../../../lib/school-license-server';

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function makeCode(length = 6) {
  return Array.from({ length }, () => CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)]).join('');
}

export async function POST(request: Request) {
  const raw = await request.json().catch(() => ({})) as { activity?: unknown; roomLabel?: unknown };
  const activity = raw.activity === undefined ? defaultClassroomActivity() : buildClassroomActivity(raw.activity);
  if (!activity) return NextResponse.json({ error: 'Invalid classroom activity.' }, { status: 400 });
  const roomLabel = typeof raw.roomLabel === 'string' ? raw.roomLabel.trim().slice(0, 80) : '';

  const store = await cookies();
  const license = await resolveSchoolTeacherLicense(store.get(SCHOOL_LICENSE_COOKIE)?.value);
  if (!license || !schoolLicenseAllowsSession(license.record)) {
    return NextResponse.json({ error: 'An active school teacher license is required to create a classroom.' }, { status: 403 });
  }

  const db = getAdminDb();
  const teacherKey = randomBytes(24).toString('base64url');
  const teacherKeyHash = hashSchoolSecret(teacherKey);

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = makeCode();
    const classRef = db.collection('schoolClasses').doc(code);
    const createdAt = new Date().toISOString();

    const result = await db.runTransaction(async (transaction) => {
      const [licenseSnapshot, classSnapshot] = await Promise.all([
        transaction.get(license.ref),
        transaction.get(classRef),
      ]);
      if (classSnapshot.exists) return { collision: true as const };
      if (!licenseSnapshot.exists) return { forbidden: true as const };
      const currentLicense = licenseSnapshot.data();
      if (!isSchoolTeacherLicenseRecord(currentLicense) || !schoolLicenseAllowsSession(currentLicense)) return { forbidden: true as const };

      const record = createSchoolClassRecord(code, teacherKeyHash, activity, roomLabel, createdAt);
      transaction.set(classRef, {
        ...record,
        schoolId: currentLicense.schoolId,
        teacherLicenseId: license.documentId,
      });
      transaction.update(license.ref, {
        lastUsedAt: createdAt,
        sessionCount: currentLicense.sessionCount + 1,
      });
      return { record, license: currentLicense };
    });

    if ('collision' in result) continue;
    if ('forbidden' in result) return NextResponse.json({ error: 'Teacher license is no longer active.' }, { status: 403 });

    return NextResponse.json({
      code,
      teacherKey,
      status: result.record.status,
      roomLabel: result.record.roomLabel,
      activity: result.record.activity,
      license: publicSchoolLicense(result.license),
      privacy: { studentNamesCollected: false, participantAnswerMappingsStored: false, politicalAnswersAggregated: true },
    });
  }
  return NextResponse.json({ error: 'Could not create a unique class code.' }, { status: 503 });
}
