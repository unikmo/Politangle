import { notFound } from 'next/navigation';
import { LocaleProvider, type Locale } from '../LocaleProvider';

const supported = new Set(['en', 'de', 'es', 'fr', 'pt-br']);

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!supported.has(locale)) notFound();
  return <LocaleProvider initialLocale={locale as Locale}>{children}</LocaleProvider>;
}
