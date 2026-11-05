const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g;

export type StudentCertificateRecipient = { holderName: string };

function cleanText(value: unknown, maximumLength: number) {
  if (typeof value !== 'string') return '';
  return value.replace(CONTROL_CHARS, '').replace(/\s+/g, ' ').trim().slice(0, maximumLength);
}

/**
 * Student names are supplied only for immediate teacher-side certificate creation.
 * They are never saved alongside anonymous classroom responses.
 */
export function studentCertificateRecipients(input: unknown, maximumRecipients: number): StudentCertificateRecipient[] {
  if (!Array.isArray(input) || input.length < 1 || input.length > maximumRecipients) {
    throw new Error(`Enter between 1 and ${maximumRecipients} student names.`);
  }
  const seen = new Set<string>();
  return input.map((entry) => {
    const holderName = cleanText(typeof entry === 'object' && entry !== null ? (entry as { holderName?: unknown }).holderName : entry, 80);
    if (holderName.length < 2) throw new Error('Each certificate needs a student name of at least two characters.');
    const key = holderName.toLocaleLowerCase();
    if (seen.has(key)) throw new Error('Enter each student name only once.');
    seen.add(key);
    return { holderName };
  });
}
