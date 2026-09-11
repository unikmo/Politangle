import assert from 'node:assert/strict';
import test from 'node:test';
import { parseSchoolPilotRequest } from './school-pilot-request';

test('School pilot request normalizes teacher and school contact data', () => {
  const parsed = parseSchoolPilotRequest({
    email: ' Teacher@Example.org ', school: ' Example School ', country: ' Germany ', role: ' Teacher ', ageBand: '10-13', locale: 'de', note: 'Interested in a Year 6 pilot.', website: '',
  });
  assert.ok(parsed);
  assert.equal(parsed.email, 'teacher@example.org');
  assert.equal(parsed.school, 'Example School');
  assert.equal(parsed.ageBand, '10-13');
  assert.equal(parsed.locale, 'de');
});

test('School pilot request requires adult/school fields and never asks for student data', () => {
  assert.equal(parseSchoolPilotRequest({ email: 'bad', school: 'S', country: '', role: '', ageBand: 'both' }), null);
  assert.equal(parseSchoolPilotRequest({ email: 'teacher@example.org', school: 'Example School', country: 'Germany', role: 'Teacher', ageBand: 'unknown' }), null);
  assert.equal(parseSchoolPilotRequest({ email: 'teacher@example.org', school: 'Example School', country: 'Germany', role: 'Teacher', ageBand: 'both', website: 'https://bot.example' }), null);
});
