/**
 * Regenerates public/sitemap.xml from App Router pages.
 * Runs automatically on `npm run build` (postbuild).
 * Run manually anytime: npm run sitemap
 *
 * Exclusions:
 *   - /api          — server routes, never public pages
 *   - /[slug] paths — dynamic routes (e.g. /blog/[slug]); these are added manually
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
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

/** Blog post slugs — keep in sync with src/lib/blog-posts.ts */
const BLOG_SLUGS = [
  // Batch 1
  'cbse-schools-in-medchal-hyderabad-guide-for-parents',
  'school-admissions-2026-27-hyderabad-what-parents-need-to-know',
  'what-is-steam-education-and-why-it-matters-for-your-child',
  'pre-primary-school-medchal-how-to-choose',
  'iit-foundation-early-preparation-matters',
  // Batch 2
  'documents-required-school-admission-hyderabad',
  'understanding-cbse-curriculum-parents-guide',
  'what-is-play-based-learning-and-why-it-matters',
  'why-families-choose-schools-near-medchal',
  'cbse-schools-near-outer-ring-road-hyderabad',
  'what-to-look-for-in-a-school-campus-parents-checklist',
  'school-safety-standards-every-parent-should-check',
  'why-co-curricular-activities-matter-child-development',
  'how-to-help-child-with-homework-without-taking-over',
  'how-to-create-perfect-study-environment-home-children',
  // Batch 3
  'how-to-choose-right-school-hyderabad',
  'what-to-ask-during-school-admission-visit',
  'cbse-vs-icse-which-board-right-child',
  'cbse-vs-state-board-hyderabad',
  'coding-robotics-problem-solving-children',
  'science-labs-schools-hands-on-learning',
  'nursery-lkg-ukg-difference-parents',
  'how-to-prepare-child-first-day-school',
  'build-confidence-child-school-activities',
  'sports-physical-education-academic-performance',
  'benefits-music-education-children',
  'dance-performing-arts-confidence-children',
  'how-to-build-reading-habit-children',
  'nep-2020-explained-parents',
  'iit-foundation-vs-regular-cbse',
  'emotional-intelligence-children-school',
  'managing-school-stress-children',
  'what-is-digital-library-school-benefits',
  'how-to-talk-to-child-teacher-effectively',
  'growth-mindset-children-school',
  'chess-schools-cognitive-benefits',
  'improve-concentration-children',
  'school-events-community-student-confidence',
  'learning-styles-visual-auditory-kinesthetic',
  'reading-readiness-early-literacy-home',
  'social-emotional-learning-pre-primary',
  'cbse-grading-system-explained',
  'benefits-team-sports-children-school',
  'how-to-revise-for-exams-children',
  'leadership-skills-school-students',
  'coding-schools-new-literacy-india',
  'living-in-medchal-schools-family',
  // Batch 3 C
  'signs-child-thriving-at-school',
  'competitive-exams-school-students-india',
  'study-habits-class-6-students',
  'mathematics-skills-competitive-exams',
  'what-is-mathematics-lab-benefits',
  'technology-in-classroom-primary-school',
  'rote-learning-vs-conceptual-understanding-india',
  'importance-school-canteen-nutrition-children',
  'art-craft-education-children-school',
  'benefits-of-sports-day-school',
  'summer-camp-school-children-benefits',
  'cbse-board-exam-preparation-hyderabad',
  'importance-physical-activity-learning-children',
  // Batch 4
  'class-5-to-6-transition-guide-parents',
  'how-much-homework-is-too-much-cbse',
  'what-is-ncert-why-cbse-schools-use-it',
  'how-to-help-child-make-friends-school',
  'parent-involvement-school-how-much-is-right',
  'screen-time-sleep-learning-school-children',
  'career-counselling-school-students-when-to-start',
  'why-reading-fiction-benefits-school-children',
  'multilingual-children-language-learning-benefits',
  'future-skills-children-school-2030',
  // Batch 5 — Posts 71–80
  'how-to-identify-good-school-cbse-hyderabad',
  'importance-of-morning-routine-school-children',
  'social-emotional-learning-schools-india',
  'what-is-formative-assessment-cbse-schools',
  'how-to-talk-to-child-about-failure-resilience',
  'what-is-cbse-pre-school-nursery-vs-class-1',
  'importance-of-extracurricular-leadership-school',
  'how-to-support-child-learning-disabilities-india',
  'medchal-malkajgiri-education-growing-families',
  'nutrition-brain-development-school-children',
  // Batch 6 — Posts 81–90
  'how-to-choose-between-cbse-and-state-board',
  'how-to-prepare-child-for-class-10-board-exams',
  'importance-of-peer-learning-school-children',
  'how-to-talk-to-school-teachers-effectively-parent',
  'what-is-project-based-learning-cbse-schools',
  'how-to-develop-critical-thinking-school-children',
  'back-to-school-checklist-parents-india',
  'understanding-cbse-grading-system-parents',
  'why-children-need-unstructured-play-school-age',
  'how-to-choose-right-tuition-coaching-class-cbse',
];

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
