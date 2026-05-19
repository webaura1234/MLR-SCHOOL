/** Canonical production site URL (used by sitemap, robots, and metadata). */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://www.mallareddyschool.com'
  );
}
