import {getAdminDb} from './firebase-admin';
import {pilotApproved,SCHOOL_PILOT_COLLECTION} from './school-pilot';

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
 return typeof r.teacherLicenseId==='string'&&r.teacherLicenseId.length>0&&Boolean(await approvedSchoolAccount(r.schoolId));
}
