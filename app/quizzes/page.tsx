'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { localePath, useLocale } from '../LocaleProvider';
import { SiteHeader } from '../SiteChrome';

const words = {
 en: ['Explore Politangle quizzes','Discover your views and test your understanding.','Explore your political views','Recognize political traditions','Distinguish political ideas','Recognize populist thinking','Explore wealth and inequality','US Latino political context','Choose your BELIEVE edition','Questions','Back to quizzes','Choose','Start','English (US)','Español (EE. UU.)','This edition is being integrated.'],
 de: ['Entdecke die Politangle-Quizze','Erkunde deine Ansichten und teste dein Wissen.','Entdecke deine politischen Ansichten','Erkenne politische Strömungen','Unterscheide politische Ideen','Erkenne populistisches Denken','Erkunde Vermögen und Ungleichheit','Politik im US-Latino-Kontext','Wähle deine BELIEVE-Version','Fragen','Zurück zu den Quizzen','Auswählen','Starten','English (US)','Español (EE. UU.)','Diese Version wird gerade integriert.'],
 es: ['Explora los cuestionarios de Politangle','Descubre tus ideas y pon a prueba tus conocimientos.','Explora tus ideas políticas','Reconoce tradiciones políticas','Distingue ideas políticas','Reconoce el pensamiento populista','Explora la riqueza y la desigualdad','Política en el contexto latino de EE. UU.','Elige tu versión de BELIEVE','preguntas','Volver a los cuestionarios','Elegir','Empezar','English (US)','Español (EE. UU.)','Esta versión está en proceso de integración.'],
 fr: ['Explore les quiz Politangle','Découvre tes opinions et teste tes connaissances.','Explore tes opinions politiques','Reconnais les traditions politiques','Distingue les idées politiques','Reconnais la pensée populiste','Explore la richesse et les inégalités','Politique dans le contexte latino-américain aux États-Unis','Choisis ta version de BELIEVE','questions','Retour aux quiz','Choisir','Commencer','English (US)','Español (EE. UU.)','Cette version est en cours d’intégration.'],
 'pt-br': ['Explore os quizzes do Politangle','Descubra suas opiniões e teste seus conhecimentos.','Explore suas opiniões políticas','Reconheça tradições políticas','Diferencie ideias políticas','Reconheça o pensamento populista','Explore riqueza e desigualdade','Política no contexto latino dos EUA','Escolha sua versão do BELIEVE','perguntas','Voltar aos quizzes','Escolher','Começar','English (US)','Español (EE. UU.)','Esta versão está sendo integrada.']
} as const;
const cards = [
 ['BELIEVE',''],['CLASSIFY','/practice?section=classify'],['UNDERSTAND','/practice?section=understand'],['POPULISM','/populism-quiz'],['MIDDLE CLASS TRAP','/middle-class-trap'],['US LATINO','/quiz?latino=es']
] as const;
export default function QuizzesPage(){
 const {locale}=useLocale(); const c=words[locale]; const href=(p:string)=>localePath(locale,p);
 const [view,setView]=useState<'all'|'believe'>('all');
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(new URLSearchParams(window.location.search).get('select')==='believe')setView('believe');},[]);
 function open(next:typeof view){setView(next);window.requestAnimationFrame(()=>heading.current?.focus());}
 return <main className="home quizzes-page"><SiteHeader/><section className="quiz-directory"><div className="p-shell">
 {view!=='all'&&<button type="button" className="quiz-directory-back" onClick={()=>open('all')}>← {c[10]}</button>}
 <h1 ref={heading} tabIndex={-1}>{view==='all'?c[0]:c[8]}</h1>
 {view==='all'&&<p>{c[1]}</p>}
 <div className="quiz-directory-grid">
 {view==='all'&&cards.map(([name,path],i)=>{const inner=<><strong>{name}</strong><span>{c[i+2]}</span><b>{c[11]} →</b></>;return path?<Link className="quiz-directory-card" key={name} href={name==='US LATINO'?localePath('es',path):name==='MIDDLE CLASS TRAP'?'/middle-class-trap':href(path)}>{inner}</Link>:<button className="quiz-directory-card" key={name} type="button" onClick={()=>open('believe')}>{inner}</button>;})}
 {view==='believe'&&(['junior','youth','adult'] as const).map((age,i)=><Link className="quiz-directory-card" key={age} href={href('/quiz?age='+age)}><strong>{['Junior','Youth','Adult'][i]}</strong><span>{['10–13','14–17','18+'][i]} · {i===0?'16':'26 / 42'} {c[9]}</span><b>{c[12]} →</b></Link>)}
 </div></div></section></main>;
}
