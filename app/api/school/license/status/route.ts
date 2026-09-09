import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  SCHOOL_LICENSE_COOKIE,
  publicSchoolLicense,
  schoolLicenseAllowsSession,
} from '../../../../../lib/school-license';
import { resolveSchoolTeacherLicense } from '../../../../../lib/school-license-server';

export async function GET() {
  const store = await cookies();
  const resolved = await resolveSchoolTeacherLicense(store.get(SCHOOL_LICENSE_COOKIE)?.value);
  if (!resolved || !schoolLicenseAllowsSession(resolved.record)) return NextResponse.json({ active: false });
  return NextResponse.json({ active: true, license: publicSchoolLicense(resolved.record) });
}
