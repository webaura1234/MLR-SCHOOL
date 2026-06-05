import About from '@/views/About';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: "Principal's Message | Malla Reddy School Medchal",
  description:
    "Read the Principal's message at Malla Reddy School Medchal. Learn about our leadership's commitment to nurturing every student's potential through quality CBSE education in Hyderabad.",
  path: '/principal',
  keywords: [
    'Malla Reddy School principal',
    'principal message CBSE school Medchal',
    'school leadership Medchal Hyderabad',
    'Malla Reddy Schools principal message',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: "Principal's Message", href: '/principal' },
        ]}
      />
      <About />
    </>
  );
}
