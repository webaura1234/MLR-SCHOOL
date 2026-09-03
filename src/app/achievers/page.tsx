import Achievers from '@/views/Achievers';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

/**
 * SEO NOTE: This page is currently set to noIndex because the achievers
 * data source is not yet connected and the page renders a placeholder message.
 * Remove noIndex: true once real achiever data is populated.
 */
export const metadata = constructMetadata({
  title: 'Student Achievers | Malla Reddy School Medchal',
  description:
    'Celebrating academic, sports, arts, and science achievers at Malla Reddy School Medchal — our students who have excelled in competitions, Olympiads, and co-curricular activities.',
  path: '/achievers',
  keywords: [
    'student achievers Malla Reddy School',
    'school achievements Medchal',
    'student awards CBSE curriculum school Hyderabad',
    'Malla Reddy School hall of fame',
  ],
  noIndex: true, // ⚠️ Remove once real achiever data is populated
});

type Achiever = {
  name: string;
  cat: string;
  year: string;
  achievement: string;
  img: string;
};

export default async function Page() {
  // Temporarily hardcoded (no Sheets integration yet).
  // Add achievers here when you have a working data source.
  const achievers: Achiever[] = [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Achievers', href: '/achievers' },
        ]}
      />
      <Achievers achievers={achievers} />
    </>
  );
}
