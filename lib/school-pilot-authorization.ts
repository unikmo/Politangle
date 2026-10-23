import { getAdminDb } from './firebase-admin';
import { isSchoolTeacherLicenseRecord, schoolLicenseAllowsSession, SCHOOL_LICENSE_COLLECTION } from './school-license';

/**
 * Every live pilot room is backed by a currently active, manually provisioned
 * teacher license. A revoked license immediately disables joining, submitting
 * and access to both teacher and student room responses.
 */
export async function schoolRoomIsApproved(data: Record<string,unknown>): Promise<boolean> {
 const licenseId=data.teacherLicenseId;
 const schoolId=data.schoolId;
 if(typeof licenseId!=='string'||!/^[a-f0-9]{64}$/.test(licenseId)||typeof schoolId!=='string'||!schoolId)return false;
 const snapshot=await getAdminDb().collection(SCHOOL_LICENSE_COLLECTION).doc(licenseId).get();
 const license=snapshot.data();
 return snapshot.exists&&isSchoolTeacherLicenseRecord(license)&&schoolLicenseAllowsSession(license)&&license.schoolId===schoolId;
}
