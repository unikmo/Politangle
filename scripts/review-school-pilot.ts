import {FieldValue} from 'firebase-admin/firestore';
import {getAdminDb} from '../lib/firebase-admin';
import {SCHOOL_PILOT_COLLECTION, SCHOOL_PILOT_REVIEW_ITEMS, type PilotRequestRecord} from '../lib/school-pilot';

const args=process.argv.slice(2);
const value=(flag:string)=>{const i=args.indexOf(flag);return i>=0?args[i+1]:undefined};
const list=args.includes('--list');
const approve=args.includes('--approve');
async function main(){
 const db=getAdminDb(),collection=db.collection(SCHOOL_PILOT_COLLECTION);
 if(list){
  const snap=await collection.orderBy('createdAt','desc').limit(100).get();
  for(const doc of snap.docs){
   const x=doc.data() as Partial<PilotRequestRecord>;
   console.log(JSON.stringify({id:doc.id,school:x.schoolName,country:x.country,email:x.contactEmail,status:x.status,createdAt:x.createdAt}));
  }
  return;
 }
 const id=value('--request-id'),schoolId=value('--school-id');
 if(!approve||!id||!schoolId)throw Error('Use --list or --approve --request-id ID --school-id SCHOOL --privacy-reviewed --education-reviewed --safeguarding-reviewed --accessibility-reviewed --agreement-signed');
 for(const item of SCHOOL_PILOT_REVIEW_ITEMS){
  const flag=item==='agreement'?'--agreement-signed':`--${item}-reviewed`;
  if(!args.includes(flag))throw Error('Cannot approve without explicit check: '+flag);
 }
 if(!/^[A-Za-z0-9][A-Za-z0-9_-]{1,63}$/.test(schoolId))throw Error('School ID must be 2–64 letters, numbers, dashes or underscores.');
 if(!/^[a-f0-9]{64}$/.test(id))throw Error('Invalid request ID.');
 const requestRef=collection.doc(id), accountRef=db.collection('schoolAccounts').doc(schoolId);
 await db.runTransaction(async tx=>{
  const [req,account]=await Promise.all([tx.get(requestRef),tx.get(accountRef)]);
  if(!req.exists)throw Error('School pilot application not found.');
  const application=req.data() as PilotRequestRecord;
  if(application.schemaVersion!==1||!['requested','reviewing'].includes(application.status))throw Error('Application is not awaiting review.');
  if(account.exists)throw Error('School account already exists; refusing to overwrite.');
  const now=new Date().toISOString();
  tx.update(requestRef,{status:'approved',schoolId,expiresAt:FieldValue.delete(),review:{
   privacy:true,education:true,safeguarding:true,accessibility:true,agreement:true,approvedAt:now
  }});
  // Access remains blocked until licensed teacher credentials are provisioned.
 });
 console.log('Pilot review approved for schoolId '+schoolId+'. Next step: provision the school licences with --pilot-request-id '+id+'.');
}
main().catch(error=>{console.error(error instanceof Error?error.message:error);process.exitCode=1});
