/**
 * Junior 10–13 BELIEVE scoring for the revised 16 Quick + 8 Deep questionnaire.
 * Independent of Adult/Youth scoring. Answers A/B/neutral/unsure are opinions,
 * not correctness judgments. Never infer a definitive political identity.
 */
export const JUNIOR_QUICK_IDS = Array.from({length:16},(_,i)=>`B${i+1}`) as readonly string[];
export const JUNIOR_DEEP_IDS = Array.from({length:8},(_,i)=>`D${i+1}`) as readonly string[];
export const JUNIOR_AXES = ['economic-role','ownership','social-values','authority','pluralism','world-sovereignty','nationhood','ecology'] as const;
export type JuniorAxis = typeof JUNIOR_AXES[number];
export type JuniorResponse = 'A'|'B'|'neutral'|'unsure';
export type JuniorAnswers = Partial<Record<string,JuniorResponse>>;
export type JuniorAxisResult = {axis:JuniorAxis; score:number|null; answered:number; total:number; coverage:number};
export type JuniorScore = {mode:'quick'|'deep'; axes:JuniorAxisResult[]; answered:number; total:number; coverage:number; complete:boolean};
const axisFor:Readonly<Record<string,JuniorAxis>> = Object.fromEntries([
  ...JUNIOR_QUICK_IDS.map((id,i)=>[id,JUNIOR_AXES[Math.floor(i/2)]]),
  ...JUNIOR_DEEP_IDS.map((id,i)=>[id,JUNIOR_AXES[i]])
]) as Record<string,JuniorAxis>;
/**
 * Normalized axis score in [-100,100]. A = -100, B = +100,
 * neutral = 0; unsure is excluded from the denominator.
 * Each axis has two Quick items, plus one Deep item in deep mode.
 * All eight axes have equal influence; missing answers are never
 * treated as neutral. The B12 trade item shares the broad world axis
 * but must not be interpreted as equivalent to international cooperation.
 */
export function scoreJuniorBelieve(answers:JuniorAnswers, mode:'quick'|'deep'='quick'):JuniorScore {
  const ids=mode==='deep'?[...JUNIOR_QUICK_IDS,...JUNIOR_DEEP_IDS]:[...JUNIOR_QUICK_IDS];
  const axes=JUNIOR_AXES.map(axis=>{
    const matching=ids.filter(id=>axisFor[id]===axis);
    const values=matching.flatMap(id=>{
      const answer=answers[id];
      return answer==='A'?[-100]:answer==='B'?[100]:answer==='neutral'?[0]:[];
    });
    const answered=values.length;
    return {axis,score:answered?values.reduce((a,b)=>a+b,0)/answered:null,answered,total:matching.length,coverage:answered/matching.length};
  });
  const answered=axes.reduce((n,axis)=>n+axis.answered,0);
  return {mode,axes,answered,total:ids.length,coverage:answered/ids.length,complete:answered===ids.length};
}
