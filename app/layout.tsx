import type { Metadata } from 'next';
import './globals.css';
import './engine.css';
import './literacy.css';
import './results-shape.css';
import './school.css';
import './home.css';
import { LocaleProvider } from './LocaleProvider';

export const metadata: Metadata = {
  title: 'Politangle — Politics from every angle',
  description: 'Discover your political angle without party labels. 26 questions. About 3 minutes.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><LocaleProvider>{children}</LocaleProvider></body></html>;
}
