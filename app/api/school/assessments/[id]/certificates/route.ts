import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../../../lib/firebase-admin';
import { SCHOOL_LICENSE_COOKIE, schoolLicenseAllowsSession } from '../../../../../../lib/school-license';
import { resolveSchoolTeacherLicense } from '../../../../../../lib/school-license-server';
import { ASSESSMENTS, expired } from '../../../../../../lib/school-assessment';
import { studentCertificateRecipients } from '../../../../../../lib/school-student-certificates';
import { schoolStudentCertificatesHtml } from '../../../../../../lib/school-student-certificates-html';

export const runtime = 'nodejs';
const noStore = { 'Cache-Control': 'no-store' };
const error = (message: string, status: number) => NextResponse.json({ error: message }, { status, headers: noStore });
type Context = { params: Promise<{ id: string }> };

async function teacherAccess() {
  const store = await cookies();
  const access = await resolveSchoolTeacherLicense(store.get(SCHOOL_LICENSE_COOKIE)?.value);
  return access && schoolLicenseAllowsSession(access.record) ? access : null;
}

export async function POST(request: Request, context: Context) {
  const access = await teacherAccess();
  if (!access) return error('Approved teacher access required.', 403);
  const { id } = await context.params;
  if (!/^[a-f0-9]{24}$/.test(id)) return error('Invalid assessment.', 400);

  const assessmentSnapshot = await getAdminDb().collection(ASSESSMENTS).doc(id).get();
  if (!assessmentSnapshot.exists) return error('Assessment not found.', 404);
  const assessment = assessmentSnapshot.data() as Record<string, unknown>;
  if (assessment.schoolId !== access.record.schoolId || assessment.teacherLicenseId !== access.documentId) return error('Forbidden.', 403);
  if (expired(assessment)) return error('Assessment is no longer available for certificate issue.', 410);

  const raw = await request.json().catch(() => null) as { recipients?: unknown } | null;
  let recipients;
  try {
    recipients = studentCertificateRecipients(raw?.recipients, typeof assessment.studentCount === 'number' ? assessment.studentCount : 0);
  } catch (issue) {
    return error(issue instanceof Error ? issue.message : 'Invalid certificate recipients.', 400);
  }

  const title = typeof assessment.title === 'string' ? assessment.title : 'Politangle classroom programme';
  return new Response(schoolStudentCertificatesHtml(recipients, { programmeTitle: title, schoolName: access.record.schoolName }), {
    headers: { ...noStore, 'Content-Type': 'text/html; charset=utf-8' },
  });
}
