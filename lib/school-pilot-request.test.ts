import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root=path.resolve(__dirname,'..');
const read=(p:string)=>fs.readFileSync(path.join(root,p),'utf8');

test('school landing page requests pilot before teacher access',()=>{
 const page=read('app/school/page.tsx');
 assert.match(page,/Request School Edition pilot/);
 assert.match(page,/Teilnahme am Schulpilot anfragen/);
 assert.match(page,/classroom access is granted after review/i);
 assert.match(page,/href=\{href\('\/school\/pilot'\)\}/);
});
test('pilot interest does not grant a classroom or license',()=>{
 const page=read('app/SchoolPilotRequestForm.tsx');
 const api=read('app/api/school/pilot-request/route.ts');
 assert.match(page,/\/api\/school\/pilot-request/);
 assert.match(page,/consent.*yes/);
 assert.match(api,/schoolPilotRequests/);
 assert.match(api,/status:'requested'/);
 assert.match(api,/authorizedForClassroom:false/);
 assert.match(api,/studentDataCollected:false/);
 assert.doesNotMatch(api,/createSchoolLicensePack|makeSchoolLicenseKey|schoolClasses/);
 assert.match(api,/content-length/);
 assert.match(api,/origin/);
});
test('only manually issued teacher licenses create classrooms',()=>{
 const create=read('app/api/school/classes/route.ts');
 const active=read('app/api/school/license/activate/route.ts');
 assert.match(create,/resolveSchoolTeacherLicense/);
 assert.match(create,/schoolLicenseAllowsSession/);
 assert.match(active,/schoolLicenseAllowsSession/);
});
test('school pilot form is offered in all five locales and does not request student data',()=>{
 const page=read('app/SchoolPilotRequestForm.tsx');
 for(const locale of ['en','de','es','fr',"'pt-br'"])assert.ok(page.includes(locale+':'),locale);
 assert.doesNotMatch(page,/<input[^>]*name="student/);
 assert.match(page,/aria-live="polite"/);
});

test('revoking a teacher license disables an already created classroom',()=>{
 const middleware=read('lib/school-pilot-authorization.ts');
 assert.match(middleware,/SCHOOL_LICENSE_COLLECTION/);
 assert.match(middleware,/schoolLicenseAllowsSession/);
 assert.match(middleware,/license\.schoolId===schoolId/);
 for(const route of [
  'app/api/school/classes/[code]/route.ts',
  'app/api/school/classes/[code]/join/route.ts',
  'app/api/school/classes/[code]/submit/route.ts'
 ]) assert.match(read(route),/schoolRoomIsApproved/,route);
});
test('only authenticated operators can see stored school staff contact details',()=>{
 const inbox=read('app/api/admin/school-pilots/route.ts');
 assert.match(inbox,/authenticatedAdmin/);
 assert.match(inbox,/ADMIN_REQUIRED/);
 assert.match(inbox,/schoolPilotRequests/);
 assert.match(read('app/admin/AdminClient.tsx'),/\/admin\/school-pilots/);
});
