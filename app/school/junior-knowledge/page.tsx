'use client';
import {useState} from 'react';
import {useLocale} from '../../LocaleProvider';
import {juniorKnowledgeEnglish} from '../../../lib/junior-knowledge-en';

type Category='C'|'U'|'P'|'M';
const categories:Record<Category,string>={C:'CLASSIFY',U:'UNDERSTAND',P:'Populism',M:'Middle Class Trap'};
export default function JuniorKnowledgePage(){
 const {locale}=useLocale();
 const [category,setCategory]=useState<Category>('C');
 const [index,setIndex]=useState(0);
 const [answers,setAnswers]=useState<Record<string,string>>({});
 const questions=juniorKnowledgeEnglish.filter(q=>q.id.startsWith(category));
 const question=questions[index];
 const chosen=answers[question.id];
 const correct=chosen===question.answer;
 const answered=questions.filter(q=>answers[q.id]).length;
 const correctCount=questions.filter(q=>answers[q.id]===q.answer).length;
 return <main style={{maxWidth:760,margin:'auto',padding:'2rem 1rem'}}>
  <h1>Junior political literacy (ages 10–13)</h1>
  <p>Learn by choosing an answer and reading the explanation. These questions test knowledge, not your political opinions.</p>
  {locale!=='en'&&<p role="status">English preview: localized Junior quizzes are not yet enabled.</p>}
  <label>Choose a quiz: <select value={category} onChange={e=>{setCategory(e.target.value as Category);setIndex(0)}}>{(Object.keys(categories) as Category[]).map(k=><option key={k} value={k}>{categories[k]}</option>)}</select></label>
  <p>Question {index+1} of {questions.length} · Answered {answered} · Correct {correctCount}</p>
  <h2>{question.prompt}</h2>
  <fieldset><legend>Select one answer</legend>{(Object.entries(question.options) as [string,string][]).map(([key,value])=><label key={key} style={{display:'block',padding:12}}><input type="radio" name={question.id} checked={chosen===key} onChange={()=>setAnswers(a=>({...a,[question.id]:key}))}/>{' '}{key}. {value}</label>)}</fieldset>
  {chosen&&<section aria-live="polite"><p>{correct?'Correct.':'Not quite.'} The correct answer is {question.answer}.</p><p>{question.explanation}</p></section>}
  <nav style={{display:'flex',gap:16,marginTop:24}}><button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button><button disabled={index===questions.length-1} onClick={()=>setIndex(i=>i+1)}>Next</button></nav>
 </main>;
}
