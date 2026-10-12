'use client';

import Link from 'next/link';
import { localePath, useLocale, type Locale } from '../LocaleProvider';
import { SiteHeader } from '../SiteChrome';

type SchoolCopy = {
  strap: string;
  kicker: string;
  title: string;
  intro: string;
  privacyLabel: string;
  privacyText: string;
  privateKicker: string;
  privateTitle: string;
  privateText: string;
  privateCta: string;
  classroomKicker: string;
  classroomTitle: string;
  classroomText: string;
  classroomCta: string;
  teacherKicker: string;
  teacherTitle: string;
  teacherText: string;
  teacherCta: string;
  teacherCanSee: string;
  visible: string;
  visibleText: string;
  never: string;
  neverText: string;
  pilotLabel: string;
  pilotText: string;
};

const copy: Record<Locale, SchoolCopy> = {
  en: {
    strap: 'Young people · classroom + private',
    kicker: 'Political literacy for young people',
    title: 'Understand politics. See the room. Keep each student private.',
    intro: 'For secondary-school classes. Explore privately or join an anonymous class. Teachers see only class totals.',
    privacyLabel: 'Classroom privacy:',
    privacyText: 'the teacher sees the room, never which student gave which answer.',
    privateKicker: 'Students · private',
    privateTitle: 'Explore on your own device',
    privateText: 'Take the quiz or practise political literacy. Your result is never sent to a teacher.',
    privateCta: 'Private Student Mode',
    classroomKicker: 'Students · classroom',
    classroomTitle: 'Join an anonymous classroom',
    classroomText: 'Enter your teacher’s six-character code. No name or email needed.',
    classroomCta: 'Join classroom',
    teacherKicker: 'Teachers',
    teacherTitle: 'Explore the controlled pilot',
    teacherText: 'See how the classroom system works. Not yet open to real students.',
    teacherCta: 'School pilot information',
    teacherCanSee: 'What the teacher can see',
    visible: 'VISIBLE',
    visibleText: 'Joined count, response totals, class distributions, aggregate shape and lesson summary.',
    never: 'NEVER VISIBLE',
    neverText: 'Names, who answered what, or any individual profile or score.',
    pilotLabel: 'CONTROLLED PILOT — NOT AUTHORIZED FOR REAL STUDENT USE.',
    pilotText: 'Legal, accessibility and educational review are still required.',
  },
  de: {
    strap: 'Junge Menschen · Unterricht + privat',
    kicker: 'Politische Bildung für junge Menschen',
    title: 'Politik verstehen. Die Klasse sehen. Einzelne bleiben privat.',
    intro: 'Für den Unterricht an weiterführenden Schulen. Privat ausprobieren oder anonym einer Klasse beitreten. Lehrkräfte sehen nur die Summen der Klasse.',
    privacyLabel: 'Privatsphäre im Unterricht:',
    privacyText: 'Die Lehrkraft sieht die Klasse, nie, wer welche Antwort gegeben hat.',
    privateKicker: 'Schüler:innen · privat',
    privateTitle: 'Auf deinem eigenen Gerät',
    privateText: 'Mach das Quiz oder trainiere politisches Wissen. Dein Ergebnis geht nie an eine Lehrkraft.',
    privateCta: 'Privater Schülerbereich',
    classroomKicker: 'Schüler:innen · Klasse',
    classroomTitle: 'Anonym einer Klasse beitreten',
    classroomText: 'Gib den sechsstelligen Code deiner Lehrkraft ein. Name oder E-Mail brauchst du nicht.',
    classroomCta: 'Klasse beitreten',
    teacherKicker: 'Lehrkräfte',
    teacherTitle: 'Den kontrollierten Pilot ansehen',
    teacherText: 'Sieh dir das Klassensystem an. Noch nicht für echte Schüler:innen freigegeben.',
    teacherCta: 'Infos zum Schulpilot',
    teacherCanSee: 'Was die Lehrkraft sehen kann',
    visible: 'SICHTBAR',
    visibleText: 'Anzahl der Teilnehmenden, Antwortsummen, Verteilungen der Klasse, aggregiertes Profil und Zusammenfassung.',
    never: 'NIE SICHTBAR',
    neverText: 'Namen, wer welche Antwort gegeben hat, individuelle Profile oder Scores.',
    pilotLabel: 'KONTROLLIERTER PILOT – NICHT FÜR DEN EINSATZ MIT ECHTEN SCHÜLERINNEN UND SCHÜLERN FREIGEGEBEN.',
    pilotText: 'Eine rechtliche und pädagogische Prüfung sowie ein Barrierefreiheitscheck bleiben Pflicht.',
  },
  es: {
    strap: 'Jóvenes · aula + privado',
    kicker: 'Alfabetización política para jóvenes',
    title: 'Entender la política. Ver el grupo. Proteger a cada persona.',
    intro: 'Para clases de secundaria. Explora por tu cuenta o entra en una clase anónima. El profesor solo ve los totales del grupo.',
    privacyLabel: 'Privacidad en el aula:',
    privacyText: 'el profesor ve el grupo, nunca quién dio cada respuesta.',
    privateKicker: 'Alumnado · privado',
    privateTitle: 'Explora desde tu propio dispositivo',
    privateText: 'Haz el cuestionario o practica conocimientos políticos. Tu resultado nunca llega al profesor.',
    privateCta: 'Modo privado',
    classroomKicker: 'Alumnado · aula',
    classroomTitle: 'Entra en una clase anónima',
    classroomText: 'Introduce el código de seis caracteres del profesor. No hace falta nombre ni correo.',
    classroomCta: 'Entrar en clase',
    teacherKicker: 'Docentes',
    teacherTitle: 'Explora el piloto controlado',
    teacherText: 'Revisa el sistema de aula. Aún no está autorizado para usarse con alumnado real.',
    teacherCta: 'Información del piloto escolar',
    teacherCanSee: 'Qué puede ver el profesor',
    visible: 'VISIBLE',
    visibleText: 'Número de participantes, totales de respuestas, distribuciones del grupo, perfil agregado y resumen de la sesión.',
    never: 'NUNCA VISIBLE',
    neverText: 'Nombres, quién eligió cada respuesta, perfiles o puntuaciones individuales.',
    pilotLabel: 'PILOTO CONTROLADO — NO AUTORIZADO PARA USO CON ALUMNADO REAL.',
    pilotText: 'La revisión jurídica, de accesibilidad y educativa sigue siendo obligatoria.',
  },
  'pt-br': {
    strap: 'Jovens · sala de aula + privado',
    kicker: 'Educação política para jovens',
    title: 'Entenda a política. Veja a turma. Preserve a privacidade de cada estudante.',
    intro: 'Para turmas do ensino fundamental II e do ensino médio. Explore em particular ou entre em uma turma anônima. O professor vê apenas os totais da turma.',
    privacyLabel: 'Privacidade em sala:',
    privacyText: 'o professor vê a turma, nunca qual estudante deu qual resposta.',
    privateKicker: 'Estudantes · privado',
    privateTitle: 'Explore no seu próprio dispositivo',
    privateText: 'Faça o quiz ou pratique conhecimentos políticos. Seu resultado nunca vai para o professor.',
    privateCta: 'Modo privado do estudante',
    classroomKicker: 'Estudantes · sala de aula',
    classroomTitle: 'Entre em uma sala anônima',
    classroomText: 'Digite o código de seis caracteres do professor. Não precisa de nome nem e-mail.',
    classroomCta: 'Entrar na sala',
    teacherKicker: 'Professores',
    teacherTitle: 'Conheça o piloto controlado',
    teacherText: 'Conheça o sistema de sala de aula. Ainda não autorizado para uso com estudantes reais.',
    teacherCta: 'Informações sobre o piloto escolar',
    teacherCanSee: 'O que o professor pode ver',
    visible: 'VISÍVEL',
    visibleText: 'Número de participantes, totais de respostas, distribuições da turma, perfil agregado e resumo da aula.',
    never: 'NUNCA VISÍVEL',
    neverText: 'Nomes, quem escolheu cada resposta, perfis ou pontuações individuais.',
    pilotLabel: 'PILOTO CONTROLADO — NÃO AUTORIZADO PARA USO COM ESTUDANTES REAIS.',
    pilotText: 'Revisões jurídica, de acessibilidade e educacional continuam obrigatórias.',
  },
  fr: {
    strap: 'Jeunes · classe + privé',
    kicker: 'Culture politique pour les jeunes',
    title: 'Comprendre la politique. Voir la classe. Protéger chaque élève.',
    intro: 'Pour les classes du secondaire. Explore seul ou rejoins une classe anonyme. L’enseignant ne voit que les totaux de la classe.',
    privacyLabel: 'Vie privée en classe :',
    privacyText: 'l’enseignant voit la classe, jamais qui a donné quelle réponse.',
    privateKicker: 'Élèves · privé',
    privateTitle: 'Explore sur ton propre appareil',
    privateText: 'Fais le quiz ou entraîne tes connaissances politiques. Ton résultat n’est jamais envoyé à l’enseignant.',
    privateCta: 'Mode privé',
    classroomKicker: 'Élèves · classe',
    classroomTitle: 'Rejoins une classe anonyme',
    classroomText: 'Entre le code à six caractères de l’enseignant. Ni nom ni e-mail demandés.',
    classroomCta: 'Rejoindre la classe',
    teacherKicker: 'Enseignants',
    teacherTitle: 'Découvrir le pilote encadré',
    teacherText: 'Découvre le système de classe. Pas encore autorisé pour de vrais élèves.',
    teacherCta: 'Infos sur le pilote scolaire',
    teacherCanSee: 'Ce que l’enseignant peut voir',
    visible: 'VISIBLE',
    visibleText: 'Nombre de participants, totaux de réponses, répartitions de la classe, profil agrégé et résumé de séance.',
    never: 'JAMAIS VISIBLE',
    neverText: 'Noms, qui a choisi quelle réponse, profils ou scores individuels.',
    pilotLabel: 'PILOTE ENCADRÉ — PAS AUTORISÉ POUR UNE UTILISATION AVEC DE VRAIS ÉLÈVES.',
    pilotText: 'Une revue juridique, d’accessibilité et pédagogique reste obligatoire.',
  },
};

export default function SchoolPage() {
  const { locale } = useLocale();
  const c = copy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <main className="home school-public-page">
      <SiteHeader />

      <section className="school-public-hero">
        <div className="p-shell school-public-hero-grid">
          <div>
            <p className="p-kicker">{c.kicker}</p>
            <h1>{c.title}</h1>
            <p className="school-public-lede">{c.intro}</p>
            <p className="school-public-privacy-line"><strong>{c.privacyLabel}</strong> {c.privacyText}</p>
          </div>
          <div className="school-public-visual" aria-hidden="true">
            <span className="school-public-orbit one"/>
            <span className="school-public-orbit two"/>
            <div className="school-public-room">
              <small>{locale === 'de' ? 'KLASSENBILD' : locale === 'es' ? 'VISTA DEL AULA' : locale === 'fr' ? 'VUE DE CLASSE' : locale === 'pt-br' ? 'VISÃO DA TURMA' : 'CLASSROOM VIEW'}</small>
              <strong>24</strong>
              <span>{locale === 'de' ? 'Teilnehmende · nur aggregiert' : locale === 'es' ? 'participantes · solo agregado' : locale === 'fr' ? 'participants · agrégé uniquement' : locale === 'pt-br' ? 'participantes · apenas agregado' : 'participants · aggregate only'}</span>
              <i/>
              <i/>
              <i/>
            </div>
          </div>
        </div>
      </section>

      <section className="p-section p-shell">
        <div className="p-section-head">
          <div>
            <p className="p-kicker">{locale === 'de' ? 'DREI WEGE' : locale === 'es' ? 'TRES FORMAS' : locale === 'fr' ? 'TROIS PARCOURS' : locale === 'pt-br' ? 'TRÊS FORMAS DE USAR' : 'THREE WAYS TO USE IT'}</p>
            <h2>{locale === 'de' ? 'Privat lernen oder gemeinsam diskutieren.' : locale === 'es' ? 'Aprender en privado o conversar en grupo.' : locale === 'fr' ? 'Apprendre en privé ou discuter ensemble.' : locale === 'pt-br' ? 'Aprenda em particular ou discuta em grupo.' : 'Learn privately or discuss together.'}</h2>
          </div>
        </div>

        <div className="school-public-entry-grid">
          <article>
            <span>01</span>
            <p className="p-kicker">{c.privateKicker}</p>
            <h3>{c.privateTitle}</h3>
            <p>{c.privateText}</p>
            <Link className="p-text-link" href="/school/private">{c.privateCta} →</Link>
          </article>
          <article>
            <span>02</span>
            <p className="p-kicker">{c.classroomKicker}</p>
            <h3>{c.classroomTitle}</h3>
            <p>{c.classroomText}</p>
            <Link className="p-text-link" href="/school/student">{c.classroomCta} →</Link>
          </article>
          <article>
            <span>03</span>
            <p className="p-kicker">{c.teacherKicker}</p>
            <h3>{c.teacherTitle}</h3>
            <p>{c.teacherText}</p>
            <Link className="p-text-link" href={href('/school/pilot')}>{c.teacherCta} →</Link>
          </article>
        </div>
      </section>

      <section className="p-dark-section school-public-privacy">
        <div className="p-shell">
          <div className="school-public-privacy-head">
            <h2>{c.teacherCanSee}</h2>
          </div>
          <div className="school-public-principles">
            <div>
              <small>{c.visible}</small>
              <p>{c.visibleText}</p>
            </div>
            <div>
              <small>{c.never}</small>
              <p>{c.neverText}</p>
            </div>
          </div>
          <p className="school-public-pilot"><strong>{c.pilotLabel}</strong> {c.pilotText}</p>
        </div>
      </section>
    </main>
  );
}
