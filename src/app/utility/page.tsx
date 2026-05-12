import Utility from '@/views/Utility';
import { getBlurDataURL } from '@/lib/getBlurDataURL';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Resources & Disclosure',
  description: 'Mandatory public disclosure, transport information, and school resources.',
  path: '/utility',
});

export default async function Page() {
  const busBlurDataURL = await getBlurDataURL(
    'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=800',
  );
  return <Utility busBlurDataURL={busBlurDataURL} />;
}
