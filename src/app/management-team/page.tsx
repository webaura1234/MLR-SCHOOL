import ManagementTeam from '@/views/ManagementTeam';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Leadership & Management Team | Malla Reddy School Medchal',
  description:
    'Meet the founders, directors, and leadership team of Malla Reddy School Medchal. Dedicated visionaries guiding our CBSE curriculum campus in Hyderabad towards excellence in holistic education.',
  path: '/management-team',
  keywords: [
    'Malla Reddy School management team',
    'Malla Reddy School leadership Medchal',
    'CBSE curriculum school founders Hyderabad',
    'Malla Reddy Group of Institutions leadership',
    'school directors Medchal Hyderabad',
  ],
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Management Team', href: '/management-team' },
        ]}
      />
      <ManagementTeam />
    </>
  );
}
