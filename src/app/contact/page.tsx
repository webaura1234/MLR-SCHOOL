import Contact from '@/views/Contact';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Contact Malla Reddy School Medchal | Phone, Email & Campus Address',
  description:
    'Contact Malla Reddy School Medchal — call, WhatsApp, or email our admissions team. Visit our campus at Medchal, Hyderabad. Inquiry form available for school admissions 2026-27.',
  path: '/contact',
  keywords: [
    'contact Malla Reddy School Medchal',
    'Malla Reddy School phone number',
    'Malla Reddy School address Medchal',
    'school admissions contact Hyderabad',
    'Malla Reddy School email',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />
      <Contact />
    </>
  );
}
