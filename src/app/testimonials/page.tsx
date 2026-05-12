import Testimonials from '@/views/Testimonials';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Testimonials',
  description: 'Parent testimonials and video stories from the Malla Reddy School community.',
  path: '/testimonials',
});

export default function Page() {
  return <Testimonials />;
}
