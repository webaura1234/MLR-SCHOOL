/**
 * Regenerates public/sitemap.xml from App Router pages.
 * Runs automatically on `npm run build` (postbuild).
 * Run manually anytime: npm run sitemap
 *
 * Exclusions:
 *   - /api          — server routes, never public pages
 *   - /[slug] paths — dynamic routes (e.g. /blog/[slug]); these are added manually
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.mallareddyschool.com'
);

const APP_DIR = join(process.cwd(), 'src', 'app');

/** Exact paths or prefixes that must never appear in the sitemap. */
const EXCLUDED_PREFIXES = ['/api'];
const EXCLUDED_EXACT   = [];

/** Returns true if the path should be skipped. */
function isExcluded(urlPath) {
  if (EXCLUDED_EXACT.includes(urlPath)) return true;
  if (EXCLUDED_PREFIXES.some((p) => urlPath.startsWith(p))) return true;
  return false;
}

function collectPageRoutes(dir, base = '') {
  const routes = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);

    if (statSync(fullPath).isDirectory()) {
      if (entry.startsWith('(') || entry.startsWith('_')) continue;
      // Skip dynamic route segments — these are handled by static data in blog-posts.ts
      if (entry.startsWith('[') && entry.endsWith(']')) continue;
      const childBase = base === '' ? `/${entry}` : `${base}/${entry}`;
      routes.push(...collectPageRoutes(fullPath, childBase));
      continue;
    }

    if (entry !== 'page.tsx' && entry !== 'page.js') continue;

    const urlPath = base === '' ? '/' : base;
    if (isExcluded(urlPath)) continue;

    routes.push(urlPath);
  }

  return routes;
}

function routeMeta(path) {
  if (path === '/') {
    return { changefreq: 'weekly', priority: '1.0' };
  }
  if (path === '/admission' || path === '/contact') {
    return { changefreq: 'weekly', priority: '1.0' };
  }
  if (path === '/blog') {
    return { changefreq: 'weekly', priority: '0.9' };
  }
  if (['/curriculum', '/iit-foundation', '/labs', '/co-curricular', '/about'].includes(path)) {
    return { changefreq: 'monthly', priority: '0.8' };
  }
  return { changefreq: 'monthly', priority: '0.7' };
}

const discovered = collectPageRoutes(APP_DIR).sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  return a.localeCompare(b);
});

/** Blog post slugs — dynamically extracted from src/lib/blog-posts.ts to keep in sync automatically */
const blogPostsPath = join(process.cwd(), 'src', 'lib', 'blog-posts.ts');
const blogPostsContent = readFileSync(blogPostsPath, 'utf8');
const BLOG_SLUGS = [];
const slugRegex = /\bslug:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = slugRegex.exec(blogPostsContent)) !== null) {
  if (!BLOG_SLUGS.includes(match[1])) {
    BLOG_SLUGS.push(match[1]);
  }
}


const blogRoutes = BLOG_SLUGS.map((slug) => ({
  path: `/blog/${slug}`,
  changefreq: 'monthly',
  priority: '0.8',
}));

const staticRoutes = discovered.map((path) => ({
  path,
  ...routeMeta(path),
}));

const routes = [...staticRoutes, ...blogRoutes];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${siteUrl}${path}</loc>
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

console.log(`✓ Wrote ${outPath} (${routes.length} URLs — ${staticRoutes.length} static + ${blogRoutes.length} blog posts)`);
console.log('  Excluded: /blog/[slug] (handled via BLOG_SLUGS array above)');
