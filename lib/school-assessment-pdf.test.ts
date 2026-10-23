import assert from 'node:assert/strict';
import test from 'node:test';
import {schoolResultsPdf} from './school-assessment-pdf';

test('PDF download has valid structure and contains per-question records',()=>{
 const pdf=schoolResultsPdf('Class Assessment','abc123',[{paperNumber:'12345678',correct:1,graded:2,submittedAt:'2026-10-23',
  responses:[{questionId:'Q1',question:'What is government?',answer:['A'],correct:true},{questionId:'Q2',question:'Choose an option',answer:'B',correct:false}]}]);
 const bytes=Buffer.from(pdf).toString('latin1');
 assert.match(bytes,/^%PDF-1\.4/);
 assert.match(bytes,/Student number 12345678/);
 assert.match(bytes,/Q1/);
 assert.match(bytes,/Q2/);
 assert.match(bytes,/\/Type \/Pages/);
 assert.match(bytes,/%%EOF$/);
});
