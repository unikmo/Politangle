import { NextResponse } from 'next/server';
import {
  SCHOOL_LICENSE_COOKIE,
  publicSchoolLicense,
  schoolLicenseAllowsSession,
} from '../../../../../lib/school-license';
import { resolveSchoolTeacherLicense } from '../../../../../lib/school-license-server';

const secureCookie = process.env.NODE_ENV === 'production';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { licenseKey?: unknown } | null;
  const resolved = await resolveSchoolTeacherLicense(body?.licenseKey);
  if (!resolved || !schoolLicenseAllowsSession(resolved.record)) {
    return NextResponse.json({ error: 'Teacher license is invalid or inactive.' }, { status: 403 });
  }

  const response = NextResponse.json({ active: true, license: publicSchoolLicense(resolved.record) });
  response.cookies.set(SCHOOL_LICENSE_COOKIE, resolved.key, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'strict',
    path: '/api/school',
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ active: false });
  response.cookies.set(SCHOOL_LICENSE_COOKIE, '', {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'strict',
    path: '/api/school',
    maxAge: 0,
  });
  return response;
}
