export type SchoolPilotLocale = 'en' | 'de' | 'es' | 'fr';
export type SchoolPilotAgeBand = '10-13' | '14-18' | 'both';

export type SchoolPilotRequest = {
  email: string;
  school: string;
  country: string;
  role: string;
  ageBand: SchoolPilotAgeBand;
  locale: SchoolPilotLocale;
  note: string;
};

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, max) : '';
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function parseSchoolPilotRequest(raw: unknown): SchoolPilotRequest | null {
  if (!raw || typeof raw !== 'object') return null;
  const value = raw as Record<string, unknown>;
  // Honeypot: browsers leave this hidden field empty; simple form bots often do not.
  if (clean(value.website, 120)) return null;

  const email = clean(value.email, 254).toLowerCase();
  const school = clean(value.school, 120);
  const country = clean(value.country, 80);
  const role = clean(value.role, 80);
  const note = clean(value.note, 500);
  const ageBand: SchoolPilotAgeBand | null = value.ageBand === '10-13' || value.ageBand === '14-18' || value.ageBand === 'both' ? value.ageBand : null;
  const locale: SchoolPilotLocale = value.locale === 'de' || value.locale === 'es' || value.locale === 'fr' ? value.locale : 'en';

  if (!validEmail(email) || school.length < 2 || country.length < 2 || role.length < 2 || !ageBand) return null;
  return { email, school, country, role, ageBand, locale, note };
}
