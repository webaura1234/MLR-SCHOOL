import Testimonials from '@/views/Testimonials';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Parent Testimonials | Malla Reddy School Medchal Reviews',
  description:
    "Read what parents say about Malla Reddy School Medchal. Real stories from families who chose our CBSE campus in Hyderabad for their children's education. See why parents trust Malla Reddy Schools.",
  path: '/testimonials',
  keywords: [
    'Malla Reddy School reviews',
    'Malla Reddy School Medchal parent reviews',
    'CBSE school parent testimonials Hyderabad',
    'best school Medchal reviews',
    'Malla Reddy Schools feedback',
    'school reviews Medchal Hyderabad',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Testimonials', href: '/testimonials' },
        ]}
      />
      <Testimonials />
    </>
  );
}
