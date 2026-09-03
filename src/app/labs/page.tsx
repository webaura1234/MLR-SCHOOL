import Labs from '@/views/Labs';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Science, Computer & Robotics Labs | Malla Reddy School Medchal',
  description:
    'Explore world-class labs at Malla Reddy School Medchal — science, computer, mathematics, robotics, and a digital library. Hands-on learning facilities designed to inspire curiosity in every student.',
  path: '/labs',
  keywords: [
    'school labs Medchal',
    'science lab CBSE curriculum school Hyderabad',
    'computer lab school Medchal',
    'robotics lab school Hyderabad',
    'digital library school Medchal',
    'STEAM lab school Hyderabad',
    'Malla Reddy School labs facilities',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Labs & Facilities', href: '/labs' },
        ]}
      />
      <Labs />
    </>
  );
}
