import assert from 'node:assert/strict';
import test from 'node:test';
import { studentCertificateRecipients } from './school-student-certificates';
import { schoolStudentCertificatesHtml } from './school-student-certificates-html';

test('creates one printable certificate per teacher-entered student name', () => {
  const recipients = studentCertificateRecipients(['Amina Noor', 'Jonas Weber'], 20);
  const html = schoolStudentCertificatesHtml(recipients, { programmeTitle: 'Political literacy lab', schoolName: 'Example School', issuedOn: '5 November 2026' });
  assert.match(html, /Amina Noor/);
  assert.match(html, /Jonas Weber/);
  assert.match(html, /page-break-after: always/);
});

test('does not accept duplicate or excessive recipient names', () => {
  assert.throws(() => studentCertificateRecipients(['Amina Noor', 'amina noor'], 20), /only once/);
  assert.throws(() => studentCertificateRecipients(['Amina Noor', 'Jonas Weber'], 1), /between 1 and 1/);
});

test('print document preserves names as Unicode and escapes printable details', () => {
  const html = schoolStudentCertificatesHtml([{ holderName: 'Jörg Çelik' }], { programmeTitle: '<Political literacy>', schoolName: 'Example & School', issuedOn: '5 November 2026' });
  assert.match(html, /Jörg Çelik/);
  assert.match(html, /&lt;Political literacy&gt;/);
  assert.match(html, /Example &amp; School/);
});
