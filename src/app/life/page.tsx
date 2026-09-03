import LifeAtSchool from '@/views/LifeAtSchool';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Life at Malla Reddy School Medchal | Campus, Wellness & Culture',
  description:
    'Discover life beyond the classroom at Malla Reddy School Medchal — vibrant community, modern campus, student wellness programs, arts, culture, and sports at our CBSE curriculum school in Hyderabad.',
  path: '/life',
  keywords: [
    'school life Medchal',
    'campus life Malla Reddy School',
    'student wellness school Hyderabad',
    'CBSE curriculum school campus activities Medchal',
    'school culture arts sports Hyderabad',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Life at School', href: '/life' },
        ]}
      />
      <LifeAtSchool />
    </>
  );
}
