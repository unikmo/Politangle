import { NextResponse } from 'next/server';
import { getAdminDb } from '../../../../lib/firebase-admin';
import { newPilotRequestRecord, parsePilotApplication, SCHOOL_PILOT_COLLECTION, schoolPilotRequestId } from '../../../../lib/school-pilot';

export const dynamic='force-dynamic';

export async function POST(request:Request){
  const contentType=request.headers.get('content-type')??'';
  if (!contentType.toLowerCase().startsWith('application/json')) return NextResponse.json({error:'Expected JSON request.'},{status:415});
  const length=Number(request.headers.get('content-length')??0);
  if (length>4096) return NextResponse.json({error:'Request too large.'},{status:413});
  let raw:unknown;
  try {
    const body=await request.text();
    if (body.length>4096) return NextResponse.json({error:'Request too large.'},{status:413});
    raw=JSON.parse(body);
  } catch {
    return NextResponse.json({error:'Invalid request.'},{status:400});
  }
  if (raw && typeof raw==='object' && 'website' in raw && (raw as {website?:unknown}).website) {
    // Do not store spam, and do not reveal honeypot behaviour to bots.
    return NextResponse.json({received:true},{status:202});
  }
  const application=parsePilotApplication(raw);
  if (!application) return NextResponse.json({error:'Invalid application. Use adult contact details only.'},{status:400});
  try{
    const ref=getAdminDb().collection(SCHOOL_PILOT_COLLECTION).doc(schoolPilotRequestId(application));
    await ref.create(newPilotRequestRecord(application,new Date().toISOString()));
    // A request is not an invitation, approval or active classroom licence.
    return NextResponse.json({received:true},{status:201,headers:{'Cache-Control':'no-store'}});
  }catch(error){
    // Duplicate contact+school application is still pending. No status is
    // disclosed publicly, preventing enumeration of school participation.
    if (error && typeof error==='object' &&
      ('code' in error && (error.code===6 || error.code==='already-exists' || error.code==='ALREADY_EXISTS'))) {
      return NextResponse.json({received:true},{status:202,headers:{'Cache-Control':'no-store'}});
    }
    return NextResponse.json({error:'Pilot application service is currently unavailable. No request was recorded.'},{status:503,headers:{'Cache-Control':'no-store'}});
  }
}
