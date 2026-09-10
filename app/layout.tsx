import type { Metadata } from 'next';
import './globals.css';
import './engine.css';
import './school.css';
import { LocaleProvider } from './LocaleProvider';

export const metadata: Metadata = {
  title: 'Politangle — Politics from every angle',
  description: 'Discover your political angle without party labels. 52 statements. About 6 minutes.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><LocaleProvider>{children}</LocaleProvider></body></html>;
}
