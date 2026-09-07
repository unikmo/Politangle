import type { Metadata } from 'next';
import './globals.css';
import './engine.css';

export const metadata: Metadata = {
  title: 'Politangle — Politics from every angle',
  description: 'Discover your political angle without party labels. 26 statements. About 3 minutes.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
