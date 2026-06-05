import About from '@/views/About';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Vision & Mission | Malla Reddy School Medchal',
  description:
    'Discover the vision and mission of Malla Reddy School Medchal — shaping confident, curious, and compassionate learners through quality CBSE education in Hyderabad, Telangana.',
  path: '/vision',
  keywords: [
    'Malla Reddy School vision mission',
    'school philosophy Medchal',
    'CBSE school values Hyderabad',
    'Malla Reddy Schools educational philosophy',
    'school mission Medchal Hyderabad',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Vision & Mission', href: '/vision' },
        ]}
      />
      <About />
    </>
  );
}
