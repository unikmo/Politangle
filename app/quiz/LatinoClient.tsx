'use client';
import {useState,useEffect} from 'react';
import Link from 'next/link';
import {latinoItems} from '../../lib/latino-us-bank';
import QuizFeedback from '../QuizFeedback';
import {localePath} from '../LocaleProvider';
type Choice='A'|'B'|'unsure';
export default function LatinoClient({language}:{language:'en'|'es'}){
 const es=language==='es';
 const [answers,setAnswers]=useState<Record<string,Choice>>({});
 const [index,setIndex]=useState(0);
 const [full,setFull]=useState(false);
 const [done,setDone]=useState(false);
 const [ready,setReady]=useState(false);
 const key='politangle.latino.v1.'+language;
 useEffect(()=>{try{const saved=JSON.parse(sessionStorage.getItem(key)||'null');if(saved){setAnswers(saved.answers||{});setIndex(Math.max(0,Math.min(saved.full?41:25,Number(saved.index)||0)));setFull(Boolean(saved.full));setDone(Boolean(saved.done));}}catch{}setReady(true);},[key]);
 useEffect(()=>{if(ready)sessionStorage.setItem(key,JSON.stringify({answers,index,full,done}));},[key,ready,answers,index,full,done]);
 const items=latinoItems.slice(0,full?42:26), current=items[index];
 const answered=items.filter(i=>answers[i.id]!==undefined).length;
 const t=(en:string,sp:string)=>es?sp:en;
 if(!ready||!current)return <section className="engine-shell"><p>{t('Loading…','Cargando…')}</p></section>;
 function reset(){setAnswers({});setIndex(0);setFull(false);setDone(false);}
 return <section className="engine-shell">
 <div className="engine-progress-row"><span>US LATINO · {full?'Full':'Quick'} · {answered}/{items.length}</span><div className="engine-progress"><span style={{width:100*answered/items.length+'%'}}/></div><button className="engine-link-button" onClick={reset}>{t('Restart','Reiniciar')}</button></div>
 {done?<><article className="engine-card"><h1>{t('Your political views','Tus ideas políticas')}</h1><p>{t('Your answers across four dimensions. These are exploratory comparisons, not a political identity or voting recommendation.','Tus respuestas en cuatro dimensiones. Son comparaciones exploratorias, no una identidad política ni una recomendación de voto.')}</p>
 {(['economy','society','power','world'] as const).map((dimension,i)=>{const all=items.filter(q=>q.dimension===dimension);const known=all.filter(q=>answers[q.id]==='A'||answers[q.id]==='B');const positive=known.filter(q=>answers[q.id]=== (q.sourceA==='A'?'B':'A')).length;const pct=known.length?Math.round(100*positive/known.length):null;return <div key={dimension} style={{margin:'24px 0'}}><h3>{(es?['Economía','Sociedad','Poder','Mundo']:['Economy','Society','Power','World'])[i]}</h3><p>{known.length}/{all.length} {t('scored answers','respuestas puntuadas')}</p>{pct===null?<p>{t('Not enough answers','No hay respuestas suficientes')}</p>:<><div style={{display:'flex',height:14,borderRadius:8,overflow:'hidden'}}><div style={{width:100-pct+'%',background:'#d84d20'}}/><div style={{width:pct+'%',background:'#34465a'}}/></div><p>{100-pct}% {t('source A','opción A original')} · {pct}% {t('source B','opción B original')}</p></>}</div>})}
 <p>{t('Questions marked unclear are excluded from scoring. The edition uses its own four-dimension framework and has not been validated with respondents.','Las preguntas poco claras no se puntúan. Esta edición utiliza cuatro dimensiones propias y no ha sido validada con participantes.')}</p>
 {!full&&<button className="engine-primary-link" onClick={()=>{setFull(true);setIndex(26);setDone(false);}}>{t('Continue to Full: 16 more','Continuar: 16 preguntas más')}</button>}
 <p><Link href={localePath(language,'/quizzes')}>{t('Back to quizzes','Volver a los cuestionarios')}</Link></p></article><QuizFeedback quiz={full?'latino-full':'latino-quick'} age="adult" key={String(full)}/></>:<>
 <article className="engine-card"><h1 style={{fontSize:'1.4rem'}}>{t('Which statement is closer to your view?','¿Qué afirmación se acerca más a tu opinión?')}</h1><div style={{display:'grid',gap:12}}>{current[language].map((statement,i)=>{const value=i===0?'A':'B';return <button key={value} type="button" className={'quick-scale-answer'+(answers[current.id]===value?' selected':'')} aria-pressed={answers[current.id]===value} style={{textAlign:'left',padding:20,height:'auto',whiteSpace:'normal'}} onClick={()=>setAnswers(a=>({...a,[current.id]:value}))}>{statement}</button>})}<button className={'quick-scale-answer'+(answers[current.id]==='unsure'?' selected':'')} aria-pressed={answers[current.id]==='unsure'} onClick={()=>setAnswers(a=>({...a,[current.id]:'unsure'}))}>{t('Question unclear','Pregunta poco clara')}</button></div></article>
 <div className="engine-nav"><button disabled={index===0} onClick={()=>setIndex(i=>i-1)}>{t('Previous','Anterior')}</button><span>{index+1}/{items.length}</span><button disabled={answers[current.id]===undefined} onClick={()=>{if(index<items.length-1)setIndex(i=>i+1);else if(answered===items.length)setDone(true);else setIndex(items.findIndex(q=>answers[q.id]===undefined));}}>{index===items.length-1?t('See result','Ver resultado'):t('Next','Siguiente')}</button></div></>}
 </section>;
}
