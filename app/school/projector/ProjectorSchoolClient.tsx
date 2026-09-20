'use client';

import { useEffect, useState } from 'react';
import { germanBeliefStatement } from '../../../lib/german-believe';
import { romanceBeliefStatement } from '../../../lib/romance-believe';
import { portugueseBrBeliefStatement } from '../../../lib/portuguese-br-believe';
import { useLocale } from '../../LocaleProvider';

type PublicRoom = {
  code: string;
  status: 'active' | 'closed';
  roomLabel: string;
  joinedCount: number;
  activity: { title: string; projectorMode: 'live' | 'reveal' };
  currentQuestionId: string | null;
  questionOpen: boolean;
  revealed: boolean;
  currentQuestion: { id: string; kind: 'believe' | 'literacy'; title: string; sourceItemId?: string; polarity?: 'negative' | 'positive'; statement?: string; prompt?: string; explanation?: string } | null;
  projectorDistribution: { responses: number; distribution: { id: string; label: string; count: number; percent: number }[]; correctPercent: number | null } | null;
};

export default function ProjectorSchoolClient({ code }: { code: string }) {
  const { locale } = useLocale();
  const [room, setRoom] = useState<PublicRoom | null>(null);
  const [error, setError] = useState('');
  const pt = locale === 'pt-br';
  const copy = {
    unavailable: pt ? 'Sala indisponível.' : 'Classroom not available.',
    loading: pt ? 'Carregando a sala…' : 'Loading classroom…',
    joined: (n: number) => pt ? `${n} participantes` : `${n} joined`,
    waiting: pt ? 'Aguardando o professor iniciar uma pergunta.' : 'Waiting for the teacher to launch a question.',
    join: pt ? 'ENTRAR' : 'JOIN',
    agree: pt ? 'Quanto você concorda?' : 'How much do you agree?',
    incoming: pt ? 'As respostas estão chegando.' : 'Responses are coming in.',
    later: pt ? 'O professor decidiu mostrar a distribuição mais tarde.' : 'The teacher has chosen to reveal the distribution later.',
    classWord: pt ? 'Turma' : 'Class',
  };

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    const load = async () => {
      const response = await fetch(`/api/school/classes/${encodeURIComponent(code)}`, { cache: 'no-store' }).catch(() => null);
      if (!response?.ok) { if (!cancelled) setError(copy.unavailable); return; }
      if (!cancelled) { setRoom(await response.json() as PublicRoom); setError(''); }
    };
    void load();
    const id = window.setInterval(load, 1200);
    return () => { cancelled = true; window.clearInterval(id); };
  }, [code, copy.unavailable]);

  if (error) return <section className="engine-shell"><article className="engine-card"><h1>{error}</h1></article></section>;
  if (!room) return <section className="engine-shell"><article className="engine-card"><p>{copy.loading}</p></article></section>;
  const projectedStatement = room.currentQuestion?.kind === 'believe' && room.currentQuestion.sourceItemId && room.currentQuestion.polarity
    ? (locale === 'de' ? germanBeliefStatement(room.currentQuestion.sourceItemId, room.currentQuestion.polarity) : locale === 'es' || locale === 'fr' ? romanceBeliefStatement(locale, room.currentQuestion.sourceItemId, room.currentQuestion.polarity) : locale === 'pt-br' ? portugueseBrBeliefStatement(room.currentQuestion.sourceItemId, room.currentQuestion.polarity) : room.currentQuestion.statement) ?? room.currentQuestion.statement
    : room.currentQuestion?.statement;

  return (
    <section className="engine-shell school-projector-shell">
      <div className="school-room-strip"><strong>{room.roomLabel || `${copy.classWord} ${room.code}`}</strong><span>{room.activity.title}</span><span>{copy.joined(room.joinedCount)}</span></div>
      {!room.currentQuestion ? <article className="engine-card school-projector-card"><p className="engine-kicker">Politangle School</p><h1>{copy.waiting}</h1><div className="school-code-display"><span>{copy.join}</span><strong>{room.code}</strong></div></article> : <article className="engine-card school-projector-card"><p className="engine-kicker">{room.currentQuestion.id} · {room.currentQuestion.title}</p>{room.currentQuestion.kind === 'believe' ? <><h1>{copy.agree}</h1><div className="engine-statement"><p>{projectedStatement}</p></div></> : <h1>{room.currentQuestion.prompt}</h1>}{room.projectorDistribution ? <div className="school-distribution school-projector-distribution">{room.projectorDistribution.distribution.map((row) => <div className="school-bar-row" key={row.id}><div className="school-bar-label"><span>{row.label}</span><strong>{row.percent}% · {row.count}</strong></div><div className="school-bar-track"><span style={{ width: `${row.percent}%` }} /></div></div>)}</div> : <div className="school-projector-wait"><strong>{copy.incoming}</strong><span>{copy.later}</span></div>}{room.revealed && room.currentQuestion.explanation && <div className="deep-explanation">{room.currentQuestion.explanation}</div>}</article>}
    </section>
  );
}
