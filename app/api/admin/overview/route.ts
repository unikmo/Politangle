import { NextResponse } from 'next/server';
import { authenticatedAdmin } from '../../../../lib/auth-session';
import { certificationReadiness } from '../../../../lib/certification-server';
import { countryProfiles, lockedCountryQueue } from '../../../../lib/countries';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { literacyMasterBankCandidates } from '../../../../lib/literacy-master-bank';

export async function GET() {
  if (!await authenticatedAdmin()) return NextResponse.json({ error: 'ADMIN_REQUIRED' }, { status: 403 });
  const db = getAdminDb();
  const [users, attempts, passed, failed, certificates, eligibilities] = await Promise.all([
    db.collection('certificationUsers').count().get(), db.collection('certificationAttempts').count().get(),
    db.collection('certificationAttempts').where('status', '==', 'passed').count().get(), db.collection('certificationAttempts').where('status', '==', 'failed').count().get(),
    db.collection('certificates').count().get(), db.collection('certificateEligibilities').where('status', '==', 'eligible').count().get(),
  ]);
  const readiness = certificationReadiness();
  const byStatus = literacyMasterBankCandidates.reduce<Record<string, number>>((totals, question) => { totals[question.status] = (totals[question.status] ?? 0) + 1; return totals; }, {});
  return NextResponse.json({
    release: { enabled: readiness.enabled, bankReady: readiness.bankReady, bankVersion: readiness.bankVersion, blockers: readiness.blockers },
    counts: { users: users.data().count, attempts: attempts.data().count, passed: passed.data().count, failed: failed.data().count, certificates: certificates.data().count, awaitingPurchase: eligibilities.data().count },
    questions: { total: literacyMasterBankCandidates.length, byStatus },
    countries: { drafts: countryProfiles.map(({ name, slug, status, incomplete }) => ({ name, slug, status, blockers: incomplete.length })), queued: lockedCountryQueue },
  }, { headers: { 'Cache-Control': 'no-store' } });
}
