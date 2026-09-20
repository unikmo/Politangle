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
    intro: 'Politangle School is built for secondary-school learning. Students can explore privately or join an anonymous teacher-led classroom. Teachers see only class totals and distributions.',
    privacyLabel: 'Classroom privacy:',
    privacyText: 'the teacher sees the room, never which student gave which answer.',
    privateKicker: 'Students · private',
    privateTitle: 'Explore on your own device',
    privateText: 'Take Quick 26, continue with Full to 42 questions in total, or practise political literacy. Your individual result is not sent to a teacher.',
    privateCta: 'Private Student Mode',
    classroomKicker: 'Students · classroom',
    classroomTitle: 'Join an anonymous classroom',
    classroomText: 'Enter the six-character session code from your teacher. No name, email address, username or student ID is required.',
    classroomCta: 'Join classroom',
    teacherKicker: 'Teachers',
    teacherTitle: 'Explore the controlled pilot',
    teacherText: 'Educators can inspect the classroom system. Real-student use and paid licensing remain gated by legal, accessibility and age-band validation.',
    teacherCta: 'School pilot information',
    teacherCanSee: 'What the teacher can see',
    visible: 'VISIBLE',
    visibleText: 'Joined count, response totals, live class distributions, aggregate political shape, literacy patterns and lesson summary.',
    never: 'NEVER VISIBLE',
    neverText: 'Student names, who chose an answer, an individual political profile, individual polygon or individual literacy score.',
    pilotLabel: 'CONTROLLED PILOT — NOT AUTHORIZED FOR REAL STUDENT USE.',
    pilotText: 'Qualified legal, accessibility and educational review remain mandatory.',
  },
  de: {
    strap: 'Junge Menschen · Unterricht + privat',
    kicker: 'Politische Bildung für junge Menschen',
    title: 'Politik verstehen. Die Klasse sehen. Einzelne bleiben privat.',
    intro: 'Politangle School ist für den Politikunterricht an weiterführenden Schulen gedacht. Schülerinnen und Schüler können privat arbeiten oder anonym an einer von der Lehrkraft geführten Klasse teilnehmen. Lehrkräfte sehen nur Summen und Verteilungen der Klasse.',
    privacyLabel: 'Privatsphäre im Unterricht:',
    privacyText: 'Die Lehrkraft sieht das Gesamtbild der Klasse, aber nie, wer welche Antwort gegeben hat.',
    privateKicker: 'Schüler:innen · privat',
    privateTitle: 'Auf deinem eigenen Gerät',
    privateText: 'Mach Quick 26, geh mit Full auf insgesamt 42 Fragen oder trainiere politisches Wissen. Dein persönliches Ergebnis wird nicht an eine Lehrkraft geschickt.',
    privateCta: 'Privater Schülerbereich',
    classroomKicker: 'Schüler:innen · Klasse',
    classroomTitle: 'Anonym einer Klasse beitreten',
    classroomText: 'Gib den sechsstelligen Sitzungscode deiner Lehrkraft ein. Name, E-Mail-Adresse, Benutzername oder Schüler-ID brauchst du nicht.',
    classroomCta: 'Klasse beitreten',
    teacherKicker: 'Lehrkräfte',
    teacherTitle: 'Den kontrollierten Pilot ansehen',
    teacherText: 'Lehrkräfte können das Klassenzimmer-System prüfen. Der Einsatz mit echten Schülerinnen und Schülern und bezahlte Lizenzen bleiben bis zur rechtlichen, barrierefreien und altersgerechten Validierung gesperrt.',
    teacherCta: 'Infos zum Schulpilot',
    teacherCanSee: 'Was die Lehrkraft sehen kann',
    visible: 'SICHTBAR',
    visibleText: 'Anzahl der Teilnehmenden, Antwortsummen, Live-Verteilungen der Klasse, aggregiertes politisches Profil, Wissensmuster und Unterrichtszusammenfassung.',
    never: 'NIE SICHTBAR',
    neverText: 'Namen, wer welche Antwort gewählt hat, individuelle politische Profile, individuelle Polygone oder individuelle Wissensscores.',
    pilotLabel: 'KONTROLLIERTER PILOT – NICHT FÜR DEN EINSATZ MIT ECHTEN SCHÜLERINNEN UND SCHÜLERN FREIGEGEBEN.',
    pilotText: 'Eine qualifizierte rechtliche, barrierefreie und pädagogische Prüfung bleibt verpflichtend.',
  },
  es: {
    strap: 'Jóvenes · aula + privado',
    kicker: 'Alfabetización política para jóvenes',
    title: 'Entender la política. Ver el grupo. Proteger a cada persona.',
    intro: 'Politangle School está pensado para secundaria. El alumnado puede explorar por su cuenta o entrar de forma anónima en una sesión dirigida por el profesor. El docente solo ve totales y distribuciones del grupo.',
    privacyLabel: 'Privacidad en el aula:',
    privacyText: 'el profesor ve el conjunto de la clase, nunca quién dio cada respuesta.',
    privateKicker: 'Alumnado · privado',
    privateTitle: 'Explora desde tu propio dispositivo',
    privateText: 'Haz Quick 26, sigue con Full hasta 42 preguntas en total o practica conocimientos políticos. Tu resultado individual no se envía al profesor.',
    privateCta: 'Modo privado',
    classroomKicker: 'Alumnado · aula',
    classroomTitle: 'Entra en una clase anónima',
    classroomText: 'Introduce el código de seis caracteres que te dé el profesor. No necesitas nombre, correo electrónico, usuario ni número de estudiante.',
    classroomCta: 'Entrar en clase',
    teacherKicker: 'Docentes',
    teacherTitle: 'Explora el piloto controlado',
    teacherText: 'Los docentes pueden revisar el sistema de aula. El uso con alumnado real y las licencias de pago siguen bloqueados hasta completar la revisión legal, de accesibilidad y por edades.',
    teacherCta: 'Información del piloto escolar',
    teacherCanSee: 'Qué puede ver el profesor',
    visible: 'VISIBLE',
    visibleText: 'Número de participantes, totales de respuestas, distribuciones en directo, perfil político agregado, patrones de conocimiento y resumen de la sesión.',
    never: 'NUNCA VISIBLE',
    neverText: 'Nombres, quién eligió cada respuesta, perfiles políticos individuales, polígonos individuales o puntuaciones individuales de conocimientos.',
    pilotLabel: 'PILOTO CONTROLADO — NO AUTORIZADO PARA USO CON ALUMNADO REAL.',
    pilotText: 'Siguen siendo obligatorias una revisión jurídica, de accesibilidad y educativa cualificada.',
  },
  'pt-br': {
    strap: 'Jovens · sala de aula + privado',
    kicker: 'Educação política para jovens',
    title: 'Entenda a política. Veja a turma. Preserve a privacidade de cada estudante.',
    intro: 'O Politangle School foi pensado para o ensino médio. Estudantes podem explorar de forma privada ou participar anonimamente de uma sala conduzida pelo professor. O professor vê apenas totais e distribuições da turma.',
    privacyLabel: 'Privacidade em sala:',
    privacyText: 'o professor vê o conjunto da turma, nunca qual estudante deu qual resposta.',
    privateKicker: 'Estudantes · privado',
    privateTitle: 'Explore no seu próprio dispositivo',
    privateText: 'Faça o Quick 26, continue com o Full até 42 perguntas no total ou pratique conhecimentos políticos. Seu resultado individual não é enviado ao professor.',
    privateCta: 'Modo privado do estudante',
    classroomKicker: 'Estudantes · sala de aula',
    classroomTitle: 'Entre em uma sala anônima',
    classroomText: 'Digite o código de seis caracteres fornecido pelo professor. Não é necessário informar nome, e-mail, usuário ou número de estudante.',
    classroomCta: 'Entrar na sala',
    teacherKicker: 'Professores',
    teacherTitle: 'Conheça o piloto controlado',
    teacherText: 'Educadores podem examinar o sistema de sala de aula. O uso com estudantes reais e as licenças pagas continuam bloqueados até a conclusão das validações jurídica, de acessibilidade e por faixa etária.',
    teacherCta: 'Informações sobre o piloto escolar',
    teacherCanSee: 'O que o professor pode ver',
    visible: 'VISÍVEL',
    visibleText: 'Número de participantes, totais de respostas, distribuições ao vivo da turma, perfil político agregado, padrões de conhecimento e resumo da aula.',
    never: 'NUNCA VISÍVEL',
    neverText: 'Nomes de estudantes, quem escolheu cada resposta, perfil político individual, polígono individual ou pontuação individual de conhecimentos.',
    pilotLabel: 'PILOTO CONTROLADO — NÃO AUTORIZADO PARA USO COM ESTUDANTES REAIS.',
    pilotText: 'Revisões qualificadas jurídica, de acessibilidade e educacional continuam obrigatórias.',
  },
  fr: {
    strap: 'Jeunes · classe + privé',
    kicker: 'Culture politique pour les jeunes',
    title: 'Comprendre la politique. Voir la classe. Protéger chaque élève.',
    intro: 'Politangle School est pensé pour le secondaire. Les élèves peuvent explorer seuls ou rejoindre anonymement une séance menée par l’enseignant. L’enseignant ne voit que les totaux et les répartitions de la classe.',
    privacyLabel: 'Vie privée en classe :',
    privacyText: 'l’enseignant voit l’ensemble du groupe, jamais qui a donné quelle réponse.',
    privateKicker: 'Élèves · privé',
    privateTitle: 'Explore sur ton propre appareil',
    privateText: 'Fais Quick 26, puis Full pour aller jusqu’à 42 questions au total, ou entraîne tes connaissances politiques. Ton résultat individuel n’est pas envoyé à l’enseignant.',
    privateCta: 'Mode privé',
    classroomKicker: 'Élèves · classe',
    classroomTitle: 'Rejoins une classe anonyme',
    classroomText: 'Entre le code de séance à six caractères donné par l’enseignant. Aucun nom, e-mail, identifiant ou numéro d’élève n’est demandé.',
    classroomCta: 'Rejoindre la classe',
    teacherKicker: 'Enseignants',
    teacherTitle: 'Découvrir le pilote encadré',
    teacherText: 'Les enseignants peuvent examiner le système de classe. L’utilisation avec de vrais élèves et les licences payantes restent bloquées jusqu’aux validations juridique, d’accessibilité et par tranche d’âge.',
    teacherCta: 'Infos sur le pilote scolaire',
    teacherCanSee: 'Ce que l’enseignant peut voir',
    visible: 'VISIBLE',
    visibleText: 'Nombre de participants, totaux de réponses, répartitions en direct, profil politique agrégé, tendances de connaissance et résumé de séance.',
    never: 'JAMAIS VISIBLE',
    neverText: 'Noms, qui a choisi quelle réponse, profils politiques individuels, polygones individuels ou scores individuels de connaissances.',
    pilotLabel: 'PILOTE ENCADRÉ — PAS AUTORISÉ POUR UNE UTILISATION AVEC DE VRAIS ÉLÈVES.',
    pilotText: 'Une revue juridique, d’accessibilité et pédagogique qualifiée reste obligatoire.',
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
          <p>{c.privacyText}</p>
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
            <p className="p-kicker light">{c.teacherCanSee}</p>
            <h2>{locale === 'de' ? 'Die Klasse wird sichtbar. Einzelne Schüler:innen nicht.' : locale === 'es' ? 'El grupo se ve. Cada estudiante permanece privado.' : locale === 'fr' ? 'La classe est visible. Chaque élève reste privé.' : locale === 'pt-br' ? 'Veja a turma. Preserve a privacidade de cada estudante.' : 'See the class. Keep every student private.'}</h2>
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
