import LifeAtSchool from '@/views/LifeAtSchool';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Life at School',
  description: 'Beyond the classroom: campus life, community, wellness, arts, and modern infrastructure at Malla Reddy School.',
  path: '/life',
});

export default function Page() {
  return <LifeAtSchool />;
}
