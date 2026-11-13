'use client';
import {useState} from 'react';
import {scoreJuniorBelieve, JUNIOR_QUICK_IDS, JUNIOR_DEEP_IDS, type JuniorAnswers, type JuniorResponse} from '../../../lib/junior-believe-scoring';
import {useLocale} from '../../LocaleProvider';
import {juniorBelieveEnglish} from '../../../lib/junior-believe-en';

// English reference questions. Language packages must be wired separately before multilingual release.
export default function JuniorBelievePage(){
 const {locale}=useLocale();
 const [mode,setMode]=useState<'quick'|'deep'>('quick');
 const [answers,setAnswers]=useState<JuniorAnswers>({});
 const [index,setIndex]=useState(0);
 const [showResult,setShowResult]=useState(false);
 const ids=mode==='quick'?JUNIOR_QUICK_IDS:[...JUNIOR_QUICK_IDS,...JUNIOR_DEEP_IDS];
 const id=ids[index];
 const question=juniorBelieveEnglish.find(q=>q.id===id);
 const result=scoreJuniorBelieve(answers,mode);
 return <main style={{maxWidth:720,margin:'0 auto',padding:'2rem 1rem'}}>
  <h1>Junior BELIEVE (ages 10–13)</h1>
  <p>There are no right or wrong opinions. Choose the view closer to yours. You can also choose not sure.</p>
  {locale!=='en'&&<p role="status">This questionnaire currently uses English wording. Translated Junior questions are not yet enabled.</p>}
  <fieldset><legend>Questionnaire length</legend><label><input type="radio" checked={mode==='quick'} onChange={()=>{setMode('quick');setIndex(0);setShowResult(false)}}/> Quick · 16</label>{' '}<label><input type="radio" checked={mode==='deep'} onChange={()=>{setMode('deep');setIndex(0);setShowResult(false)}}/> Deep · 24</label></fieldset>
  {!showResult&&question&&<section><p>Question {index+1} of {ids.length}</p><h2>{question.prompt}</h2><fieldset><legend>Which is closer to your view?</legend>{([['A',question.A],['B',question.B],['neutral','Both / it depends'],['unsure','Not sure / I do not understand']] as const).map(([value,label])=><label key={value} style={{display:'block',padding:12}}><input type="radio" name={id} checked={answers[id]===value} onChange={()=>setAnswers(prev=>({...prev,[id]:value as JuniorResponse}))}/>{' '}{label}</label>)}</fieldset><nav style={{display:'flex',gap:16,marginTop:24}}><button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button><button onClick={()=>{if(index===ids.length-1)setShowResult(true);else setIndex(i=>i+1)}}>{index===ids.length-1?'See results':'Next'}</button></nav></section>}
  {showResult&&<section><h2>Your responses</h2><p>Answered {result.answered} of {result.total}. These are exploratory views, not a diagnosis or fixed political identity.</p>{result.axes.map(a=><p key={a.axis}>{a.axis.replaceAll('-',' ')}: {a.score===null?'Not enough answers':a.score.toFixed(0)+' / 100'} ({a.answered}/{a.total})</p>)}<button onClick={()=>setShowResult(false)}>Review answers</button></section>}
 </main>;
}
