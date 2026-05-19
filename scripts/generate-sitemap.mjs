/**
 * Regenerates public/sitemap.xml from App Router pages.
 * Runs automatically on `npm run build` (postbuild).
 * Run manually anytime: npm run sitemap
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.mallareddyschool.com'
);

const APP_DIR = join(process.cwd(), 'src', 'app');

/** Paths we never include in the sitemap. */
const EXCLUDED_PREFIXES = ['/api'];

function collectPageRoutes(dir, base = '') {
  const routes = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);

    if (statSync(fullPath).isDirectory()) {
      if (entry.startsWith('(') || entry.startsWith('_')) continue;
      const childBase = base === '' ? `/${entry}` : `${base}/${entry}`;
      routes.push(...collectPageRoutes(fullPath, childBase));
      continue;
    }

    if (entry !== 'page.tsx' && entry !== 'page.js') continue;

    const urlPath = base === '' ? '/' : base;
    if (EXCLUDED_PREFIXES.some((prefix) => urlPath.startsWith(prefix))) continue;

    routes.push(urlPath);
  }

  return routes;
}

function routeMeta(path) {
  if (path === '/') {
    return { changefreq: 'weekly', priority: '1.0' };
  }
  if (path === '/admission' || path === '/contact') {
    return { changefreq: 'monthly', priority: '0.9' };
  }
  return { changefreq: 'monthly', priority: '0.8' };
}

const discovered = collectPageRoutes(APP_DIR).sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  return a.localeCompare(b);
});

const routes = discovered.map((path) => ({
  path,
  ...routeMeta(path),
}));

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

console.log(`Wrote ${outPath} (${routes.length} URLs from src/app)`);
