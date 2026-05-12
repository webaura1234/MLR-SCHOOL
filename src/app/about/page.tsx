import About from '@/views/About';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'About School',
  description: 'Vision, mission, principal message, and what makes Malla Reddy School different.',
  path: '/about',
});

export default function Page() {
  return <About />;
}
