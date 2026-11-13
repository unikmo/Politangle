'use client';
import {useState} from 'react';
import {useLocale} from '../../LocaleProvider';
import {youthQuickEnglish} from '../../../lib/youth-quick-en';
import {youthDeepEnglish} from '../../../lib/youth-deep-en';
export default function YouthBelievePage(){
 const {locale}=useLocale();
 const [deep,setDeep]=useState(false);
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const questions=deep?[...youthQuickEnglish,...youthDeepEnglish]:[...youthQuickEnglish];
 const q=questions[index];
 const chosen=answers[q.id];
 const answered=questions.filter(x=>answers[x.id]).length;
 return <main style={{maxWidth:760,margin:'auto',padding:'2rem 1rem'}}>
  <h1>Youth BELIEVE (ages 14–17)</h1>
  <p>There are no right or wrong opinions. Choose the statement closer to your view, or select Not sure.</p>
  {locale!=='en'&&<p role="status">English-language pilot; translations are not enabled in this route.</p>}
  <fieldset><legend>Questionnaire length</legend><label><input type="radio" checked={!deep} onChange={()=>{setDeep(false);setIndex(0)}}/> Quick 26</label>{' '}<label><input type="radio" checked={deep} onChange={()=>{setDeep(true);setIndex(0)}}/> Deep 42</label></fieldset>
  <p>Question {index+1} of {questions.length} · Answered {answered}</p>
  <fieldset><legend>Which statement is closer to your view?</legend>
   {([['A',q.A],['B',q.B],['unsure','Not sure / I do not understand']] as const).map(([value,label])=><label key={value} style={{display:'block',padding:12}}><input type="radio" name={q.id} checked={chosen===value} onChange={()=>setAnswers(a=>({...a,[q.id]:value}))}/>{' '}{label}</label>)}
  </fieldset>
  <nav style={{display:'flex',gap:16,marginTop:24}}><button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button><button disabled={index===questions.length-1} onClick={()=>setIndex(i=>i+1)}>Next</button></nav>
  <p>Responses stay in this browser session. This pilot does not generate a political profile.</p>
 </main>;
}
