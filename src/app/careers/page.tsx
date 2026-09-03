import Careers from '@/views/Careers';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Careers at Malla Reddy School Medchal | Teaching & Staff Jobs',
  description:
    'Explore career opportunities at Malla Reddy School Medchal — teaching positions, administrative roles, and general applications for educators who share our passion for quality education aligned to the CBSE curriculum in Hyderabad.',
  path: '/careers',
  keywords: [
    'teaching jobs Medchal',
    'school careers Hyderabad',
    'CBSE teacher jobs Medchal',
    'Malla Reddy School jobs',
    'school staff vacancies Hyderabad',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Careers', href: '/careers' },
        ]}
      />
      <Careers />
    </>
  );
}
