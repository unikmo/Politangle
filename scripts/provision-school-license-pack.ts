import { getAdminDb } from '../lib/firebase-admin';
import { pilotApproved, SCHOOL_PILOT_COLLECTION } from '../lib/school-pilot';
import {
  SCHOOL_ACCOUNT_COLLECTION,
  SCHOOL_LICENSE_COLLECTION,
  createSchoolLicensePack,
} from '../lib/school-license';

function argument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const schoolId = argument('--school-id');
  const schoolName = argument('--school-name');
  const requestId=argument('--pilot-request-id');
  if (!schoolId || !schoolName || !requestId || !/^[a-f0-9]{64}$/.test(requestId)) throw new Error('Usage: npm run school:provision-license-pack -- --school-id school-slug --school-name "School Name" --pilot-request-id 64-char-approved-id');

  const pack = createSchoolLicensePack(schoolId, schoolName);
  const db = getAdminDb();
  const requestRef=db.collection(SCHOOL_PILOT_COLLECTION).doc(requestId);
  const application=await requestRef.get();
  if (!application.exists || !pilotApproved(application.data()) || application.data()?.schoolId!==pack.schoolId || application.data()?.schoolName!==pack.schoolName) {
    throw new Error('School pilot has not completed the required independent approval checks.');
  }
  const accountRef = db.collection(SCHOOL_ACCOUNT_COLLECTION).doc(pack.schoolId);
  const existing = await accountRef.get();
  if (existing.exists) throw new Error(`School account ${pack.schoolId} already exists. Refusing to overwrite or silently regenerate licenses.`);

  const batch = db.batch();
  batch.set(accountRef, {
    schemaVersion: 1,
    schoolId: pack.schoolId,
    schoolName: pack.schoolName,
    status: 'active',
    pilotRequestId: requestId,
    pilotApprovedAt: application.data()?.review?.approvedAt,
    packagePriceUsd: pack.packagePriceUsd,
    teacherLicenseCount: pack.teacherLicenseCount,
    createdAt: pack.createdAt,
  });
  for (const seat of pack.seats) batch.set(db.collection(SCHOOL_LICENSE_COLLECTION).doc(seat.documentId), seat.record);
  await batch.commit();

  console.log(`Provisioned ${pack.schoolName}: $${pack.packagePriceUsd} school pack with ${pack.teacherLicenseCount} teacher licenses.`);
  console.log('Distribute one credential per licensed teacher. Raw credentials are shown only in this provisioning output:');
  for (const seat of pack.seats) console.log(`${seat.record.seatLabel}: ${seat.key}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
