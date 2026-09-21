import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Political guides',
  description: 'Neutral guides to political spectra, left and right, ideologies, political tests and political literacy.',
  alternates: {
    canonical: '/guides',
    languages: {
      'en-US': '/guides',
      de: '/de/guides',
      es: '/es/guides',
      fr: '/fr/guides',
      'pt-BR': '/pt-br/guides',
      'x-default': '/guides',
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Politangle',
    title: 'Political guides | Politangle',
    description: 'Neutral guides to political spectra, left and right, ideologies, political tests and political literacy.',
    url: '/guides',
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
