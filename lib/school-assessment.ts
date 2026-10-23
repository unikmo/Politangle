import { randomBytes, randomInt, createHash, timingSafeEqual } from 'node:crypto';
import { getAdminDb } from './firebase-admin';
import { buildClassroomActivity, getClassroomQuestion, classroomResponseIsCorrect } from './school-classroom';
import { resolveSchoolTeacherLicense } from './school-license-server';
import { schoolLicenseAllowsSession } from './school-license';

export const ASSESSMENTS = 'schoolAssessments';
export const MAX_RETENTION_DAYS = 365;
export const digest = (value: string) => createHash('sha256').update(value).digest('hex');
export const validStudentCode = (value: unknown): value is string => typeof value === 'string' && /^\\d{8}$/.test(value);
export const expired = (value: {expiresAt?: string; deletedAt?: string}) => Boolean(value.deletedAt || !value.expiresAt || Date.parse(value.expiresAt) <= Date.now());
export function verifySecret(value: string, hash: string) {
 const a = Buffer.from(digest(value), 'hex'), b = Buffer.from(hash || '', 'hex');
 return a.length === b.length && timingSafeEqual(a,b);
}
export function createPaperCodes(count: number) {
 if (!Number.isSafeInteger(count) || count < 1 || count > 60) throw new Error('Choose 1–60 student numbers.');
 const codes = new Set<string>();
 while (codes.size < count) codes.add(String(randomInt(10000000, 100000000)));
 return [...codes];
}
export function makeAssessment(input: unknown, schoolId: string, teacherLicenseId: string) {
 if (!input || typeof input !== 'object') throw new Error('Invalid assessment.');
 const fields = input as Record<string,unknown>;
 const questionIds = fields.questionIds;
 const activity = buildClassroomActivity({type:'custom',questionIds,ageBand:fields.ageBand,pacing:'student',projectorMode:'reveal',title:fields.title});
 if (!activity || !Array.isArray(questionIds) || questionIds.length > 60) throw new Error('Choose 1–60 valid questions.');
 const count = Number(fields.studentCount);
 const codes = createPaperCodes(count);
 const password = randomBytes(9).toString('base64url');
 const id = randomBytes(12).toString('hex');
 const createdAt = new Date().toISOString();
 const expiresAt = new Date(Math.min(Date.now()+MAX_RETENTION_DAYS*86400000, Date.parse(createdAt)+MAX_RETENTION_DAYS*86400000)).toISOString();
 return {
  id,password,codes,
  record:{schoolId,teacherLicenseId,title:activity.title,activity,createdAt,expiresAt,
   status:'active',passwordHash:digest(password),
   allowedCodes:codes.map(digest),responseCount:0,studentCount:count}
 };
}
export async function teacherAssessmentAccess(rawLicense: unknown, record: Record<string,unknown>) {
 const license = await resolveSchoolTeacherLicense(rawLicense);
 return Boolean(license && schoolLicenseAllowsSession(license.record) && license.documentId === record.teacherLicenseId && license.record.schoolId === record.schoolId);
}
export function gradeAnswer(questionId: string, answer: unknown, ageBand: 'junior-10-13'|'youth-14-18') {
 const question = getClassroomQuestion(questionId,ageBand);
 if (!question) return null;
 if (question.kind === 'believe') {
  const text = String(answer);
  return ['-2','-1','0','1','2','unsure'].includes(text) ? {answer:text,correct:null} : null;
 }
 const selected = Array.isArray(answer) ? answer : typeof answer === 'string' ? [answer] : [];
 if (!selected.length || selected.some(x => typeof x!=='string' || !question.options.some(option => option.id===x))) return null;
 if (!question.multiSelect && selected.length !== 1) return null;
 return {answer:selected,correct:classroomResponseIsCorrect(questionId,selected)};
}
export async function loadAssessment(id: string) {
 if (!/^[a-f0-9]{24}$/.test(id)) return null;
 const ref = getAdminDb().collection(ASSESSMENTS).doc(id);
 const snap = await ref.get();
 return snap.exists ? {ref,data:snap.data() as Record<string,any>} : null;
}
