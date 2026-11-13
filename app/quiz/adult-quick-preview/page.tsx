'use client';
import {useState} from 'react';
import {useLocale} from '../../LocaleProvider';
import {adultQuickEnglish} from '../../../lib/adult-quick-en';
export default function AdultQuickPage(){
 const {locale}=useLocale();
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const q=adultQuickEnglish[index];
 return <main style={{maxWidth:760,margin:'auto',padding:'2rem 1rem'}}>
  <h1>Adult BELIEVE — 26 questions</h1>
  <p>Choose the statement closer to your view. There are no correct answers.</p>
  {locale!=='en'&&<p role="status">English-language editorial preview.</p>}
  <p>Question {index+1} of {adultQuickEnglish.length}</p>
  <fieldset><legend>Which statement is closer to your view?</legend>
   {([['A',q.A],['B',q.B],['unsure','Not sure / I do not understand']] as const).map(([value,label])=><label key={value} style={{display:'block',padding:12}}><input type="radio" name={q.id} checked={answers[q.id]===value} onChange={()=>setAnswers(a=>({...a,[q.id]:value}))}/>{' '}{label}</label>)}
  </fieldset>
  <nav style={{display:'flex',gap:16,marginTop:24}}><button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button><button disabled={index===adultQuickEnglish.length-1} onClick={()=>setIndex(i=>i+1)}>Next</button></nav>
  <p>Editorial preview only. For the existing scored political profile, use the main Politangle quiz.</p>
 </main>;
}
