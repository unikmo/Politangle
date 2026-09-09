import Link from 'next/link';
import PrivateLiteracyClient from './PrivateLiteracyClient';

export default function PrivateLiteracyPage() {
  return (
    <main className="engine-page school-page">
      <header className="engine-header"><Link href="/school/private" className="engine-brand">Politangle School</Link><span>Private literacy</span></header>
      <PrivateLiteracyClient />
    </main>
  );
}
