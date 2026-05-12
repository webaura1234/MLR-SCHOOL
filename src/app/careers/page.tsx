import Careers from '@/views/Careers';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Careers',
  description: 'Open positions and general applications for educators at Malla Reddy School.',
  path: '/careers',
});

export default function Page() {
  return <Careers />;
}
