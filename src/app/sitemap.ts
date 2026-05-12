import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.mallareddyschool.com';

  const routes = [
    '',
    '/about',
    '/management-team',
    '/vision',
    '/iit-foundation',
    '/curriculum',
    '/labs',
    '/achievers',
    '/careers',
    '/co-curricular',
    '/gallery',
    '/admission',
    '/contact',
    '/blog',
    '/competitions',
    '/life',
    '/media',
    '/monthly-achievements',
    '/principal',
    '/testimonials',
    '/utility',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
