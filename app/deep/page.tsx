import Link from 'next/link';
import DeepClient from './DeepClient';

export default function DeepPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>Deep · beliefs + political literacy</span>
      </header>
      <DeepClient />
    </main>
  );
}
