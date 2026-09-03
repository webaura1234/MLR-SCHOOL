import CoCurricular from '../../views/CoCurricular';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Co-Curricular Activities | Malla Reddy School Medchal Hyderabad',
  description:
    'Discover co-curricular activities at Malla Reddy School Medchal — sports, arts, music, dance, and performing arts programs that develop well-rounded students. Admissions open for 2026-27.',
  path: '/co-curricular',
  keywords: [
    'co-curricular activities CBSE curriculum school Medchal',
    'sports school Medchal Hyderabad',
    'arts music dance school Hyderabad',
    'extracurricular activities school Medchal',
    'holistic development school Hyderabad',
    'Malla Reddy School activities',
  ],
});

export default function CoCurricularPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Co-Curricular', href: '/co-curricular' },
        ]}
      />
      <CoCurricular />
    </>
  );
}
