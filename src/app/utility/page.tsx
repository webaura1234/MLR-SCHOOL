import Utility from '@/views/Utility';
import { getBlurDataURL } from '@/lib/getBlurDataURL';
import { constructMetadata } from '@/lib/seo';

/**
 * This is an internal utility / mandatory public disclosure page.
 * It is intentionally excluded from the sitemap and disallowed in robots.txt.
 * noIndex is set here as a second layer so even if crawled it won't be indexed.
 */
export const metadata = constructMetadata({
  title: 'Resources & Disclosure | Malla Reddy School',
  description: 'Mandatory public disclosure, transport information, and school resources.',
  path: '/utility',
  noIndex: true,
});

export default async function Page() {
  const busBlurDataURL = await getBlurDataURL(
    'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=800',
  );
  return <Utility busBlurDataURL={busBlurDataURL} />;
}
