import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authenticatedCertificationUser } from '../../../../../lib/auth-session';
import { quickAccessDecision, quickRegistrationConfigured } from '../../../../../lib/quick-registration';

const QUICK_COMPLETED_COOKIE = 'politangle_quick_completed';

export async function GET() {
  const store = await cookies();
  const completedBefore = store.get(QUICK_COMPLETED_COOKIE)?.value === '1';
  const available = quickRegistrationConfigured();
  const user = available ? await authenticatedCertificationUser() : null;

  return NextResponse.json(quickAccessDecision({
    completedBefore,
    authenticated: Boolean(user),
    registrationAvailable: available,
  }), { headers: { 'Cache-Control': 'no-store' } });
}
