import About from '@/views/About';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'About Malla Reddy School Medchal',
  description:
    'Learn about Malla Reddy Schools — vision, mission, leadership, and why we are a top CBSE school in Medchal, Hyderabad.',
  path: '/about',
});

export default function Page() {
  return <About />;
}
