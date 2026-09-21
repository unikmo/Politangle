import type { Metadata } from 'next';
import { getSeoTopic, type SeoTopicSlug } from './seo-topics';

export function seoTopicMetadata(slug: SeoTopicSlug): Metadata {
  const topic = getSeoTopic('en', slug);
  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    alternates: {
      canonical: `/${slug}`,
      languages: {
        'en-US': `/${slug}`,
        de: `/de/${slug}`,
        es: `/es/${slug}`,
        fr: `/fr/${slug}`,
        'pt-BR': `/pt-br/${slug}`,
        'x-default': `/${slug}`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      siteName: 'Politangle',
      title: topic.metaTitle,
      description: topic.metaDescription,
      url: `/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.metaTitle,
      description: topic.metaDescription,
    },
  };
}
