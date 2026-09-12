'use client';

import Link from 'next/link';
import { LanguageSelector, useLocale, type Locale } from '../LocaleProvider';

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

  return (
    <main className="engine-page school-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle School</Link>
        <span>{c.strap}</span><LanguageSelector />
      </header>
      <section className="engine-shell school-shell">
        <article className="engine-card school-hero-card">
          <p className="engine-kicker">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
          <p className="engine-callout"><strong>{c.privacyLabel}</strong> {c.privacyText}</p>
        </article>

        <div className="school-entry-grid">
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">{c.privateKicker}</p>
            <h2>{c.privateTitle}</h2>
            <p>{c.privateText}</p>
            <Link className="engine-primary-link" href="/school/private">{c.privateCta}</Link>
          </article>
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">{c.classroomKicker}</p>
            <h2>{c.classroomTitle}</h2>
            <p>{c.classroomText}</p>
            <Link className="engine-primary-link" href="/school/student">{c.classroomCta}</Link>
          </article>
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">{c.teacherKicker}</p>
            <h2>{c.teacherTitle}</h2>
            <p>{c.teacherText}</p>
            <Link className="engine-primary-link" href="/school/pilot">{c.teacherCta}</Link>
          </article>
        </div>

        <article className="engine-card school-visibility-card">
          <p className="engine-kicker">{c.teacherCanSee}</p>
          <div className="school-principle-grid">
            <div className="school-visible"><strong>{c.visible}</strong><span>{c.visibleText}</span></div>
            <div className="school-never"><strong>{c.never}</strong><span>{c.neverText}</span></div>
          </div>
          <p className="engine-disclaimer"><strong>{c.pilotLabel}</strong> {c.pilotText}</p>
        </article>
      </section>
    </main>
  );
}
