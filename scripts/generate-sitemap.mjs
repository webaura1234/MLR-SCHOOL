import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.mallareddyschool.com'
);

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/management-team', changefreq: 'monthly', priority: '0.8' },
  { path: '/vision', changefreq: 'monthly', priority: '0.8' },
  { path: '/principal', changefreq: 'monthly', priority: '0.8' },
  { path: '/iit-foundation', changefreq: 'monthly', priority: '0.8' },
  { path: '/curriculum', changefreq: 'monthly', priority: '0.8' },
  { path: '/labs', changefreq: 'monthly', priority: '0.8' },
  { path: '/achievers', changefreq: 'monthly', priority: '0.8' },
  { path: '/careers', changefreq: 'monthly', priority: '0.8' },
  { path: '/co-curricular', changefreq: 'monthly', priority: '0.8' },
  { path: '/competitions', changefreq: 'monthly', priority: '0.8' },
  { path: '/life', changefreq: 'monthly', priority: '0.8' },
  { path: '/gallery', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'monthly', priority: '0.8' },
  { path: '/testimonials', changefreq: 'monthly', priority: '0.8' },
  { path: '/admission', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/utility', changefreq: 'monthly', priority: '0.8' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = join(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote ${outPath} (${routes.length} URLs)`);
