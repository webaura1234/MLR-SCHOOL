import MandatoryDisclosure from '@/views/MandatoryDisclosure';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Mandatory Public Disclosure (CBSE Appendix IX) | Malla Reddy School Medchal',
  description:
    'Official CBSE Appendix IX Mandatory Public Disclosure for Malla Reddy School, Medchal Hyderabad. View society registration, NOC, building safety, fire safety certificates, staff details, and infrastructure facilities.',
  path: '/mandatory-disclosure',
  keywords: [
    'Malla Reddy School mandatory disclosure',
    'CBSE mandatory public disclosure Medchal',
    'CBSE affiliation Malla Reddy School',
    'Malla Reddy School safety certificates',
    'Malla Reddy School staff qualifications',
    'CBSE Appendix IX disclosure Hyderabad',
    'Malla Reddy School infrastructure details',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Mandatory Disclosure', href: '/mandatory-disclosure' },
        ]}
      />
      <MandatoryDisclosure />
    </>
  );
}
