import { createHash } from 'node:crypto';

export const SCHOOL_PILOT_COLLECTION = 'schoolPilotRequests';
export const SCHOOL_PILOT_SCHEMA = 1 as const;
export type PilotState = 'requested' | 'reviewing' | 'approved' | 'declined' | 'paused';
export type PilotApplication = {
  schoolName: string; country: string; contactName: string; contactEmail: string;
  role: 'teacher' | 'school-leader' | 'researcher' | 'other';
  ageBand: 'junior-10-13' | 'youth-14-18' | 'both';
  locale: 'en' | 'de' | 'es' | 'fr' | 'pt-br';
  adultConfirmed: true; privacyAcknowledged: true;
};
export type PilotRequestRecord = PilotApplication & {
  schemaVersion: typeof SCHOOL_PILOT_SCHEMA;
  status: PilotState;
  createdAt: string;
  schoolId: string | null;
  review?: { privacy: boolean; education: boolean; safeguarding: boolean; accessibility: boolean; agreement: boolean; approvedAt?: string };
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function required(value:unknown,min:number,max:number) {
  return typeof value==='string' && value.trim().length>=min && value.trim().length<=max ? value.trim() : null;
}
export function parsePilotApplication(raw:unknown): PilotApplication | null {
  if (!raw || typeof raw!=='object' || Array.isArray(raw)) return null;
  const r=raw as Record<string,unknown>;
  const schoolName=required(r.schoolName,3,120),country=required(r.country,2,80);
  const contactName=required(r.contactName,2,120), contactEmail=required(r.contactEmail,5,254)?.toLowerCase();
  if (!schoolName||!country||!contactName||!contactEmail||!emailPattern.test(contactEmail)) return null;
  if (!['teacher','school-leader','researcher','other'].includes(String(r.role))) return null;
  if (!['junior-10-13','youth-14-18','both'].includes(String(r.ageBand))) return null;
  if (!['en','de','es','fr','pt-br'].includes(String(r.locale))) return null;
  if (r.adultConfirmed!==true || r.privacyAcknowledged!==true) return null;
  if (r.studentDetails || r.studentNames || r.politicalAnswers || r.message || r.comments) return null;
  return {schoolName,country,contactName,contactEmail,role:r.role as PilotApplication['role'],
    ageBand:r.ageBand as PilotApplication['ageBand'],locale:r.locale as PilotApplication['locale'],
    adultConfirmed:true,privacyAcknowledged:true};
}
export function schoolPilotRequestId(a:PilotApplication) {
  return createHash('sha256').update(a.contactEmail+'|'+a.schoolName.toLocaleLowerCase()).digest('hex');
}
export function newPilotRequestRecord(a:PilotApplication,now:string): PilotRequestRecord {
  return {...a,schemaVersion:SCHOOL_PILOT_SCHEMA,status:'requested',schoolId:null,createdAt:now};
}
export const SCHOOL_PILOT_REVIEW_ITEMS = ['privacy','education','safeguarding','accessibility','agreement'] as const;
export function pilotApproved(value:unknown): value is PilotRequestRecord {
  if (!value||typeof value!=='object') return false;
  const r=value as Partial<PilotRequestRecord>;
  return r.schemaVersion===SCHOOL_PILOT_SCHEMA&&r.status==='approved'
    && typeof r.schoolId==='string'&&r.schoolId.length>1
    && SCHOOL_PILOT_REVIEW_ITEMS.every(key=>r.review?.[key]===true);
}
