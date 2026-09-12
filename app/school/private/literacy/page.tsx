import PrivateLiteracyClient from './PrivateLiteracyClient';
import PrivateLiteracyHeader from './PrivateLiteracyHeader';

export default function PrivateLiteracyPage() {
  return (
    <main className="engine-page school-page">
      <PrivateLiteracyHeader />
      <PrivateLiteracyClient />
    </main>
  );
}
