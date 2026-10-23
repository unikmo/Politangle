import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import {newPilotRequestRecord,parsePilotApplication,pilotApproved,schoolPilotRequestId,SCHOOL_PILOT_REVIEW_ITEMS} from './school-pilot';

const valid={
 schoolName:'Test Secondary School',country:'Germany',contactName:'Adult Test',
 contactEmail:'adult@example.edu',role:'teacher',ageBand:'youth-14-18',locale:'de',
 adultConfirmed:true,privacyAcknowledged:true,
};
test('school pilot request accepts only adult contacts and no pupil information',()=>{
 const result=parsePilotApplication(valid);
 assert.ok(result);
 assert.equal(result.contactEmail,'adult@example.edu');
 for(const changes of [
  {adultConfirmed:false},{privacyAcknowledged:false},
  {contactEmail:'invalid'},{schoolName:'A'},
  {ageBand:'student-8-12'},{role:'student'},
  {studentNames:'Alice'},{politicalAnswers:'T11:2'},
  {message:'Student test results included'},
 ]) assert.equal(parsePilotApplication({...valid,...changes}),null,JSON.stringify(changes));
 assert.equal(parsePilotApplication(null),null);
 assert.equal(parsePilotApplication([]),null);
});
test('repeat school+adult requests produce the same document key, but never autoapprove',()=>{
 const one=parsePilotApplication(valid)!,two=parsePilotApplication({...valid,contactEmail:' ADULT@example.edu '})!;
 assert.equal(schoolPilotRequestId(one),schoolPilotRequestId(two));
 const record=newPilotRequestRecord(one,'2026-10-23T19:00:00.000Z');
 assert.equal(record.status,'requested');
 assert.equal(record.schoolId,null);
 assert.equal(pilotApproved(record),false);
 assert.equal(pilotApproved({...record,status:'approved',schoolId:'example-school'}),false);
 assert.equal(pilotApproved({...record,status:'approved',schoolId:'example-school',
  review:{privacy:true,education:true,safeguarding:true,accessibility:true,agreement:true,approvedAt:'2026-10-23T19:00:00.000Z'}}),true);
 assert.equal(SCHOOL_PILOT_REVIEW_ITEMS.length,5);
});
test('school pilot has a real request endpoint, no self-service activation, and classroom join receipt is required',()=>{
 const root=path.resolve(__dirname,'..');
 const read=(p:string)=>fs.readFileSync(path.join(root,p),'utf8');
 const front=read('app/school/pilot/PilotRequestForm.tsx');
 const api=read('app/api/school/pilot-request/route.ts');
 const join=read('app/api/school/classes/[code]/join/route.ts');
 const submit=read('app/api/school/classes/[code]/submit/route.ts');
 const access=read('lib/school-pilot-server.ts');
 const teacher=read('lib/school-license-server.ts');
 const provisioning=read('scripts/provision-school-license-pack.ts');
 assert.match(front,/fetch\('\/api\/school\/pilot-request'/);
 assert.match(api,/SCHOOL_PILOT_COLLECTION/);
 assert.match(api,/ref\.create/);
 assert.doesNotMatch(api,/teacherKey|makeSchoolLicenseKey|teacherLicenseCount/);
 assert.match(submit,/joinedSnapshot\.exists/);
 assert.match(submit,/joinReceipts/);
 assert.match(join,/approvedClassroomPilot/);
 assert.match(access,/pilotApproved/);
 assert.match(access,/schoolLicenseAllowsSession/);
 assert.match(teacher,/approvedSchoolAccount/);
 assert.match(provisioning,/pilotApproved/);
 assert.match(provisioning,/--pilot-request-id/);
});
