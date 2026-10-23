import {getAdminDb} from './firebase-admin';
import {pilotApproved,SCHOOL_PILOT_COLLECTION} from './school-pilot';
import {SCHOOL_LICENSE_COLLECTION,isSchoolTeacherLicenseRecord,schoolLicenseAllowsSession} from './school-license';

export async function approvedSchoolAccount(schoolId:unknown) {
 if(typeof schoolId!=='string'||!schoolId||schoolId.length>64)return null;
 const db=getAdminDb();
 const accountRef=db.collection('schoolAccounts').doc(schoolId);
 const snapshot=await accountRef.get();
 if(!snapshot.exists)return null;
 const account=snapshot.data();
 if(account?.status!=='active'||typeof account.pilotRequestId!=='string'||!/^[a-f0-9]{64}$/.test(account.pilotRequestId))return null;
 const request=await db.collection(SCHOOL_PILOT_COLLECTION).doc(account.pilotRequestId).get();
 if(!request.exists||!pilotApproved(request.data())||request.data()?.schoolId!==schoolId)return null;
 return account;
}
export async function approvedClassroomPilot(data:unknown) {
 if(!data||typeof data!=='object')return false;
 const r=data as {schoolId?:unknown,teacherLicenseId?:unknown};
 if(typeof r.teacherLicenseId!=='string'||!r.teacherLicenseId||!(await approvedSchoolAccount(r.schoolId)))return false;
 const license=await getAdminDb().collection(SCHOOL_LICENSE_COLLECTION).doc(r.teacherLicenseId).get();
 const data=license.data();
 return license.exists&&isSchoolTeacherLicenseRecord(data)&&schoolLicenseAllowsSession(data)&&data.schoolId===r.schoolId;
}
