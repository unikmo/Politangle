import { NextResponse } from 'next/server';
import { authenticatedAdmin } from '../../../../lib/auth-session';
import { getAdminDb } from '../../../../lib/firebase-admin';

/** Protected operator inbox. A request never grants a pilot license. */
export async function GET() {
 if(!await authenticatedAdmin())return NextResponse.json({error:'ADMIN_REQUIRED'},{status:403});
 const snapshot=await getAdminDb().collection('schoolPilotRequests')
  .orderBy('submittedAt','desc').limit(100).get();
 const requests=snapshot.docs.map(doc=>{
  const x=doc.data();
  return {id:doc.id,school:x.school,contactName:x.contactName,
   contactEmail:x.contactEmail,country:x.country,role:x.role,
   notes:x.notes,submittedAt:x.submittedAt,status:x.status};
 });
 return NextResponse.json({requests,approvalRequired:true,autoLicensesIssued:false},
  {headers:{'Cache-Control':'no-store'}});
}
