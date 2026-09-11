import type { Metadata } from 'next';
import './globals.css';
import './engine.css';
import './literacy.css';
import './results-shape.css';
import './school.css';
import './home.css';
import './palette.css';
import './hero-preview.css';
import './home-orange-hero.css';
import './home-readability-fix.css';
import './elite-engine-palette.css';
import './results-interpretation.css';
import './info.css';
import { LocaleProvider } from './LocaleProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://politangle.org'),
  title: {
    default: 'Politangle — Your politics are not a line',
    template: '%s — Politangle',
  },
  description: 'Explore 26 political questions across eight dimensions—without being reduced to one label.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Politangle',
    title: 'Politangle — Your politics are not a line',
    description: 'Explore 26 political questions across eight dimensions—without being reduced to one label.',
    url: 'https://politangle.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politangle — Your politics are not a line',
    description: 'Explore 26 political questions across eight dimensions—without being reduced to one label.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><LocaleProvider>{children}</LocaleProvider></body></html>;
}
