'use client';

import { useMemo, useState } from 'react';
import { calculateDeepLiteracyResult } from '../../../../lib/deep-engine';
import { schoolBaselineQuestions } from '../../../../lib/school-literacy';
import { germanLiteracyPrompt, germanLiteracyOption } from '../../../../lib/german-literacy';
import { useLocale, type Locale } from '../../../LocaleProvider';

function ui(locale: Locale) {
  if (locale === 'de') return { result:'Dein privates Wissens-Ergebnis', private:'Dieses Ergebnis bleibt in deinem Browser. Es wird weder an eine Klasse noch an eine Lehrkraft gesendet.', again:'Noch einmal', kicker:(n:number,total:number)=>`Politisches Wissen · ${n} von ${total}`, previous:'Zurück', next:'Weiter', answered:(n:number,total:number)=>`${n}/${total} beantwortet`, see:'Ergebnis ansehen', notice:null as string | null };
  if (locale === 'es') return { result:'Tu resultado privado de conocimientos', private:'Este resultado se queda en tu navegador. No se envía a una clase ni al profesor.', again:'Repetir', kicker:(n:number,total:number)=>`Conocimientos políticos · ${n} de ${total}`, previous:'Anterior', next:'Siguiente', answered:(n:number,total:number)=>`${n}/${total} respondidas`, see:'Ver resultado', notice:'La interfaz está en español, pero estas 15 preguntas siguen en inglés mientras se valida una versión española revisada.' };
  if (locale === 'fr') return { result:'Ton résultat privé de culture politique', private:'Ce résultat reste dans ton navigateur. Il n’est envoyé ni à une classe ni à l’enseignant.', again:'Recommencer', kicker:(n:number,total:number)=>`Culture politique · ${n} sur ${total}`, previous:'Précédent', next:'Suivant', answered:(n:number,total:number)=>`${n}/${total} répondues`, see:'Voir le résultat', notice:'L’interface est en français, mais ces 15 questions restent en anglais pendant la validation d’une version française revue.' };
  return { result:'Your private literacy result', private:'This result stays in this browser view. It is not submitted to a classroom or teacher.', again:'Try again', kicker:(n:number,total:number)=>`Private political literacy · ${n} of ${total}`, previous:'Previous', next:'Next', answered:(n:number,total:number)=>`${n}/${total} answered`, see:'See my result', notice:null as string | null };
}

export default function PrivateLiteracyClient() {
  const { locale } = useLocale();
  const c = ui(locale);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [finished, setFinished] = useState(false);
  const question = schoolBaselineQuestions[index];
  const selected = question ? answers[question.id] ?? [] : [];
  const result = useMemo(() => finished ? calculateDeepLiteracyResult(schoolBaselineQuestions, answers) : null, [finished, answers]);

  function choose(id: string) {
    if (!question) return;
    const existing = answers[question.id] ?? [];
    const next = question.multiSelect
      ? existing.includes(id) ? existing.filter((value) => value !== id) : [...existing, id]
      : [id];
    if (!next.length) return;
    setAnswers((current) => ({ ...current, [question.id]: next }));
  }

  if (finished && result) {
    return <section className="engine-shell school-shell"><article className="engine-card"><p className="engine-kicker">{c.result}</p><h1>{result.overall.percent}%</h1><div className="deep-literacy-line"><span>CLASSIFY</span><strong>{result.sections.classify.percent}%</strong></div><div className="deep-literacy-line"><span>UNDERSTAND</span><strong>{result.sections.understand.percent}%</strong></div><p className="engine-help">{c.private}</p><button className="engine-primary-link" type="button" onClick={() => { setAnswers({}); setIndex(0); setFinished(false); }}>{c.again}</button></article></section>;
  }

  const prompt = locale === 'de' ? germanLiteracyPrompt(question.id) ?? question.prompt : question.prompt;
  return <section className="engine-shell school-shell"><article className="engine-card"><p className="engine-kicker">{c.kicker(index + 1, schoolBaselineQuestions.length)}</p>{c.notice && <p className="engine-help">{c.notice}</p>}<h1>{prompt}</h1><div className="deep-options">{question.options.map((option) => <button key={option.id} type="button" className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} onClick={() => choose(option.id)}>{locale === 'de' ? germanLiteracyOption(option.id, option.label) : option.label}</button>)}</div><div className="engine-nav"><button type="button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>{c.previous}</button><span>{c.answered(Object.keys(answers).length, schoolBaselineQuestions.length)}</span>{index === schoolBaselineQuestions.length - 1 ? <button type="button" disabled={Object.keys(answers).length !== schoolBaselineQuestions.length} onClick={() => setFinished(true)}>{c.see}</button> : <button type="button" disabled={!selected.length} onClick={() => setIndex((value) => value + 1)}>{c.next}</button>}</div></article></section>;
}
