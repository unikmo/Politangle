import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/school/teacher', '/school/student'] }, sitemap: 'https://politangle.org/sitemap.xml', host: 'https://politangle.org' };
}
