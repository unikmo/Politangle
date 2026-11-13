'use client';
import {useState} from 'react';
import {scoreJuniorBelieve, JUNIOR_QUICK_IDS, JUNIOR_DEEP_IDS, type JuniorAnswers, type JuniorResponse} from '../../../lib/junior-believe-scoring';
import {useLocale} from '../../LocaleProvider';

// English reference questions. Language packages must be wired separately before multilingual release.
const questions:readonly [string,string,string,string][]=[
['B1','A school activity costs money. Some families cannot afford it.','The school should use shared funds so every student can take part.','Families should choose whether to pay, even if fewer students can take part.'],
['B2','Some children need sports equipment their families cannot afford.','The local council should use tax money to help pay for it.','Families and local charities should arrange help without using tax money.'],
['B3','The town’s only swimming pool needs repairs.','The town should own and run the pool.','A private company should own and run the pool, following town safety rules.'],
['B4','The town needs buses for school, work and shops.','The town should own and run the buses.','A private company should own and run the buses, following town rules.'],
['B5','Students ask to wear more of their own clothes at school.','The school should change the rules to allow more personal choice.','The school should keep its long-standing uniform rules to build a shared identity.'],
['B6','The school plans an event about families and community life.','Give equal space to newer and long-standing family traditions.','Focus mainly on traditions celebrated for many years.'],
['B7','Students want to protest peacefully at lunchtime.','The protest should go ahead, even if some dislike its message.','The school should be able to limit the protest if it expects disruption.'],
['B8','The school considers bag checks for dangerous items.','Check a bag only when there is a good reason for concern.','Allow checks of everyone’s bag under the same safety rule.'],
['B9','Most students vote for a rule. A smaller group disagrees.','The smaller group should be free to keep asking for change.','The smaller group should accept the decision until the next planned vote.'],
['B10','A student leader wins a clear majority.','Important decisions should still need the council’s agreement.','The leader should make more decisions alone until the next election.'],
['B11','Countries agree to reduce plastic waste in the sea.','Follow shared rules even when a country prefers another approach.','Each country should keep the final choice, even if cooperation is harder.'],
['B12','A country can buy cheaper supplies abroad or help local factories.','Usually allow cheaper imports, even if local factories face competition.','Usually protect local factories, even if supplies cost more.'],
['B13','A family has lived in a country for years and wants citizenship.','Meeting the laws and citizenship rules should be enough.','Citizenship rules should also ask people to learn shared traditions.'],
['B14','Two citizens have different lengths of family history in a country.','Citizenship matters most for equal national belonging.','Family and cultural roots should also matter for belonging.'],
['B15','The school can keep trees or make a larger car park.','Keep the trees, even if parking is less convenient.','Make the car park, even if some trees are removed.'],
['B16','A factory creates jobs but adds pollution within legal limits.','Put cleaner air first, even if fewer jobs are created.','Put new jobs first, as long as pollution stays within the law.'],
['D1','The town can lower taxes or fund free after-school clubs.','Pay for more clubs, even if taxes stay higher.','Lower taxes, even if there are fewer free clubs.'],
['D2','A sports centre needs a new owner; town and company could run it.','The town should own it and set its prices.','A private company should own it and set its prices, following safety rules.'],
['D3','Students want to replace a long-standing school celebration.','Be willing to replace traditions as students’ views change.','Usually keep traditions connecting students across generations.'],
['D4','After an incident, the school limits movement during breaks.','End limits unless the school shows they are still needed.','Let the school decide when it is safe enough to end limits.'],
['D5','A group wins an election and wants to pass its plans.','Hear the losing group’s ideas before important votes.','Put plans to a vote without first hearing the losing group.'],
['D6','Towns in different countries want shared rules on river rubbish.','Follow shared rules even if a town prefers another method.','Each town chooses its own method, even if joint action is harder.'],
['D7','A person becomes a citizen after living in a country for years.','Citizenship should be enough for full national belonging.','Taking part in shared culture should also matter.'],
['D8','A road would shorten journeys but remove part of a woodland.','Protect the woodland, even if journeys stay longer.','Build the road, even if some woodland is lost.'],
];
export default function JuniorBelievePage(){
 const {locale}=useLocale();
 const [mode,setMode]=useState<'quick'|'deep'>('quick');
 const [answers,setAnswers]=useState<JuniorAnswers>({});
 const [index,setIndex]=useState(0);
 const [showResult,setShowResult]=useState(false);
 const ids=mode==='quick'?JUNIOR_QUICK_IDS:[...JUNIOR_QUICK_IDS,...JUNIOR_DEEP_IDS];
 const id=ids[index];
 const question=questions.find(q=>q[0]===id);
 const result=scoreJuniorBelieve(answers,mode);
 return <main style={{maxWidth:720,margin:'0 auto',padding:'2rem 1rem'}}>
  <h1>Junior BELIEVE (ages 10–13)</h1>
  <p>There are no right or wrong opinions. Choose the view closer to yours. You can also choose not sure.</p>
  {locale!=='en'&&<p role="status">This questionnaire currently uses English wording. Translated Junior questions are not yet enabled.</p>}
  <fieldset><legend>Questionnaire length</legend><label><input type="radio" checked={mode==='quick'} onChange={()=>{setMode('quick');setIndex(0);setShowResult(false)}}/> Quick · 16</label>{' '}<label><input type="radio" checked={mode==='deep'} onChange={()=>{setMode('deep');setIndex(0);setShowResult(false)}}/> Deep · 24</label></fieldset>
  {!showResult&&question&&<section><p>Question {index+1} of {ids.length}</p><h2>{question[1]}</h2><fieldset><legend>Which is closer to your view?</legend>{([['A',question[2]],['B',question[3]],['neutral','Both / it depends'],['unsure','Not sure / I do not understand']] as const).map(([value,label])=><label key={value} style={{display:'block',padding:12}}><input type="radio" name={id} checked={answers[id]===value} onChange={()=>setAnswers(prev=>({...prev,[id]:value as JuniorResponse}))}/>{' '}{label}</label>)}</fieldset><nav style={{display:'flex',gap:16,marginTop:24}}><button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>Previous</button><button onClick={()=>{if(index===ids.length-1)setShowResult(true);else setIndex(i=>i+1)}}>{index===ids.length-1?'See results':'Next'}</button></nav></section>}
  {showResult&&<section><h2>Your responses</h2><p>Answered {result.answered} of {result.total}. These are exploratory views, not a diagnosis or fixed political identity.</p>{result.axes.map(a=><p key={a.axis}>{a.axis.replaceAll('-',' ')}: {a.score===null?'Not enough answers':a.score.toFixed(0)+' / 100'} ({a.answered}/{a.total})</p>)}<button onClick={()=>setShowResult(false)}>Review answers</button></section>}
 </main>;
}
