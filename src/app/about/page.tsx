import About from '@/views/About';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'About Malla Reddy School Medchal | Leading CBSE School in Hyderabad',
  description:
    'Learn about Malla Reddy School Medchal — our vision, mission, leadership, and why parents choose us as their preferred CBSE school in Medchal, Hyderabad, Telangana.',
  path: '/about',
  keywords: [
    'about Malla Reddy School Medchal',
    'Malla Reddy Schools history',
    'CBSE school Hyderabad about',
    'school leadership Medchal',
    'best CBSE school Hyderabad',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'About Us', href: '/about' },
        ]}
      />
      <About />
    </>
  );
}
