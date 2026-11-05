import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { schoolRoomIsApproved } from '../../../../../../lib/school-pilot-authorization';
import { getAdminDb } from '../../../../../../lib/firebase-admin';
import { SCHOOL_LICENSE_COOKIE, schoolLicenseAllowsSession } from '../../../../../../lib/school-license';
import { resolveSchoolTeacherLicense } from '../../../../../../lib/school-license-server';
import { studentCertificateRecipients } from '../../../../../../lib/school-student-certificates';
import { schoolStudentCertificatesHtml } from '../../../../../../lib/school-student-certificates-html';
import { verifyTeacherKey, type SchoolClassRecord } from '../../../../../../lib/school-aggregate';

export const runtime = 'nodejs';
const noStore = { 'Cache-Control': 'no-store' };
const error = (message: string, status: number) => NextResponse.json({ error: message }, { status, headers: noStore });
type Context = { params: Promise<{ code: string }> };

function bearer(request: Request) {
  const value = request.headers.get('authorization') ?? '';
  return value.startsWith('Bearer ') ? value.slice(7).trim() : '';
}

async function licensedTeacher() {
  const store = await cookies();
  const access = await resolveSchoolTeacherLicense(store.get(SCHOOL_LICENSE_COOKIE)?.value);
  return access && schoolLicenseAllowsSession(access.record) ? access : null;
}

export async function POST(request: Request, context: Context) {
  const access = await licensedTeacher();
  if (!access) return error('Approved teacher access required.', 403);
  const { code: rawCode } = await context.params;
  const code = rawCode.trim().toUpperCase();
  if (!/^[A-HJ-NP-Z2-9]{6}$/.test(code)) return error('Invalid classroom code.', 400);

  const snapshot = await getAdminDb().collection('schoolClasses').doc(code).get();
  if (!snapshot.exists) return error('Class not found.', 404);
  const classroom = snapshot.data() as SchoolClassRecord & { schoolId?: unknown; teacherLicenseId?: unknown };
  if (classroom.schemaVersion !== 2) return error('This pilot room uses an older School schema. Create a new classroom.', 409);
  if (!await schoolRoomIsApproved(classroom as unknown as Record<string, unknown>)) return error('Pilot access is not approved or has expired.', 403);
  if (classroom.schoolId !== access.record.schoolId || classroom.teacherLicenseId !== access.documentId) return error('Forbidden.', 403);
  const teacherKey = bearer(request);
  if (!teacherKey || !verifyTeacherKey(classroom, teacherKey)) return error('Invalid teacher key.', 403);

  const raw = await request.json().catch(() => null) as { recipients?: unknown } | null;
  let recipients;
  try {
    recipients = studentCertificateRecipients(raw?.recipients, classroom.joinedCount);
  } catch (issue) {
    return error(issue instanceof Error ? issue.message : 'Invalid certificate recipients.', 400);
  }
  const programmeTitle = classroom.activity.title || classroom.roomLabel || 'Politangle classroom programme';
  return new Response(schoolStudentCertificatesHtml(recipients, { programmeTitle, schoolName: access.record.schoolName }), {
    headers: { ...noStore, 'Content-Type': 'text/html; charset=utf-8' },
  });
}
