import Link from 'next/link';
import ProjectorSchoolClient from './ProjectorSchoolClient';

export default async function SchoolProjectorPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const params = await searchParams;
  const code = (params.code ?? '').trim().toUpperCase();
  return (
    <main className="engine-page school-page school-projector-page">
      <header className="engine-header no-print"><Link href="/school" className="engine-brand">Politangle School</Link><span>Classroom projector</span></header>
      {code ? <ProjectorSchoolClient code={code} /> : <section className="engine-shell"><article className="engine-card"><h1>Missing classroom code.</h1><p>Open the projector from the teacher dashboard.</p></article></section>}
    </main>
  );
}
