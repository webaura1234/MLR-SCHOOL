import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

// All public App Router pages (keep in sync with src/app route folders).
const PUBLIC_ROUTES = [
  '',
  '/about',
  '/management-team',
  '/vision',
  '/principal',
  '/iit-foundation',
  '/curriculum',
  '/labs',
  '/achievers',
  '/careers',
  '/co-curricular',
  '/competitions',
  '/life',
  '/gallery',
  '/blog',
  '/testimonials',
  '/admission',
  '/contact',
  '/utility',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/admission' || route === '/contact' ? 0.9 : 0.8,
  }));
}
