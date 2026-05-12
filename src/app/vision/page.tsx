import About from '@/views/About';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Vision & Mission',
  description: 'Our vision, mission, and educational philosophy at Malla Reddy School.',
  path: '/vision',
});

export default function Page() {
  return <About />;
}
