import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import './engine.css';
import './literacy.css';
import './results-shape.css';
import './multilingual-shape-fix.css';
import './school.css';
import './school-refinement.css';
import './home.css';
import './palette.css';
import './hero-preview.css';
import './home-orange-hero.css';
import './home-readability-fix.css';
import './elite-engine-palette.css';
import './results-interpretation.css';
import './info.css';
import './certification.css';
import './accessibility.css';
import './countries.css';
import './admin.css';
import { LocaleProvider } from './LocaleProvider';
import { SiteFooter } from './SiteChrome';

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

const htmlLanguage: Record<string, string> = { en: 'en-US', de: 'de', es: 'es', fr: 'fr', 'pt-br': 'pt-BR' };
const skipLabel: Record<string, string> = {
  en: 'Skip to main content',
  de: 'Zum Hauptinhalt springen',
  es: 'Ir al contenido principal',
  fr: 'Aller au contenu principal',
  'pt-br': 'Ir para o conteúdo principal',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-politangle-locale') ?? 'en';
  const lang = htmlLanguage[locale] ?? 'en-US';
  const skip = skipLabel[locale] ?? skipLabel.en;

  return <html lang={lang} suppressHydrationWarning><body><a className="skip-link" href="#main-content">{skip}</a><div id="main-content" tabIndex={-1}><LocaleProvider>{children}<SiteFooter /></LocaleProvider></div></body></html>;
}
