import assert from 'node:assert/strict';
import test from 'node:test';
import {createPaperCodes,digest,expired,gradeAnswer,makeAssessment,validStudentCode,verifySecret} from './school-assessment';
test('teacher paper numbers are unique and contain no roster identifiers',()=>{
 const codes=createPaperCodes(60);
 assert.equal(new Set(codes).size,60);
 assert.ok(codes.every(validStudentCode));
 assert.throws(()=>createPaperCodes(61));
});
test('individual assessment enforces password hashing and retention maximum',()=>{
 const a=makeAssessment({title:'Test',studentCount:3,questionIds:['T01-P'],ageBand:'youth-14-18'},'school','license');
 assert.equal(a.codes.length,3);
 assert.equal(a.record.allowedCodes[0],digest(a.codes[0]));
 assert.ok(!JSON.stringify(a.record).includes(a.codes[0]));
 assert.ok(verifySecret(a.password,a.record.passwordHash));
 assert.equal(verifySecret('wrong',a.record.passwordHash),false);
 assert.ok(Date.parse(a.record.expiresAt)-Date.parse(a.record.createdAt)<=365*86400000);
 assert.equal(expired({expiresAt:'2000-01-01T00:00:00.000Z'}),true);
});
test('BELIEVE answers remain unscored as correct or incorrect',()=>{
 assert.deepEqual(gradeAnswer('T01-P',2,'youth-14-18'),{answer:'2',correct:null});
 assert.equal(gradeAnswer('T01-P','anything','youth-14-18'),null);
});
