import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/method', '/validation', '/question-banks', '/about', '/privacy', '/imprint', '/terms', '/contact', '/school'];
  return routes.map((route) => ({ url: `https://politangle.org${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : route === '/school' ? .8 : .6 }));
}
