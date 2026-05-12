import Labs from '@/views/Labs';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Labs & Facilities',
  description: 'Science, computer, mathematics, robotics labs, and the digital library at Malla Reddy School.',
  path: '/labs',
});

export default function Page() {
  return <Labs />;
}
