import type { StudentCertificateRecipient } from './school-student-certificates';

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
}

/**
 * A print document intentionally uses the browser's Unicode-capable fonts. That preserves
 * a student's actual name, unlike the limited built-in fonts of a dependency-free PDF.
 */
export function schoolStudentCertificatesHtml(
  recipients: StudentCertificateRecipient[],
  options: { programmeTitle: string; schoolName: string; issuedOn?: string },
) {
  const issuedOn = options.issuedOn ?? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date());
  const title = escapeHtml(options.programmeTitle);
  const school = escapeHtml(options.schoolName);
  const date = escapeHtml(issuedOn);
  const pages = recipients.map(({ holderName }) => `<article class="certificate">
    <p class="brand">POLITANGLE</p>
    <h1>Certificate of Classroom Learning</h1>
    <p class="presented">This certificate is presented to</p>
    <h2>${escapeHtml(holderName)}</h2>
    <p class="completion">for completing the Politangle Political Literacy Classroom Programme.</p>
    <p class="explanation">The programme supports informed, respectful discussion of political ideas.<br>It does not report, assess or label personal political beliefs.</p>
    <p class="activity"><strong>Classroom activity:</strong> ${title}</p>
    <p>Issued through ${school}</p>
    <p>Issued ${date}</p>
    <footer>Issued by the licensed teacher for the classroom programme.<br>No individual answers, score or political profile are included on this certificate.</footer>
  </article>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Politangle classroom certificates</title><style>
    @page { size: A4 portrait; margin: 10mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #2e2118; background: #ece8df; font-family: Arial, Helvetica, sans-serif; }
    .certificate { width: 190mm; min-height: 277mm; margin: 10mm auto; padding: 28mm 18mm 20mm; border: 2px solid #2e2118; outline: 1px solid #c78d26; outline-offset: -7px; background: #fffdf8; text-align: center; position: relative; page-break-after: always; break-after: page; }
    .brand { margin: 0; font-size: 18pt; font-weight: 800; letter-spacing: .08em; }
    h1 { margin: 15mm 0 27mm; font-size: 16pt; text-transform: uppercase; letter-spacing: .02em; }
    .presented { font-size: 13pt; margin: 0 0 10mm; }
    h2 { margin: 0 0 17mm; font-size: 28pt; overflow-wrap: anywhere; }
    .completion { font-size: 13pt; margin: 0 0 6mm; }
    .explanation { font-size: 11pt; line-height: 1.55; margin: 0 0 28mm; }
    .activity { margin: 0 0 5mm; font-size: 12pt; overflow-wrap: anywhere; }
    .activity + p, .activity + p + p { margin: 3mm 0; font-size: 11pt; }
    footer { position: absolute; left: 16mm; right: 16mm; bottom: 18mm; font-size: 9.5pt; line-height: 1.55; }
    @media print { body { background: #fff; } .certificate { margin: 0; } }
  </style></head><body>${pages}</body></html>`;
}
