/**
 * A school application and even approved teacher access do not by themselves
 * authorize real pupils to participate. This server-only release gate must
 * be enabled only after the documented minor-data/legal review.
 */
export function schoolStudentPilotEnabled() {
 return process.env.POLITANGLE_SCHOOL_PILOT_STUDENTS_ENABLED === 'true';
}
