import Competitions from '@/views/Competitions';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Olympiads & Competitions | Malla Reddy School Medchal Hyderabad',
  description:
    'Students at Malla Reddy School Medchal participate in national and international competitions including SOF Olympiads and MI Champs. Building competitive excellence alongside academics in Hyderabad.',
  path: '/competitions',
  keywords: [
    'school olympiads Medchal Hyderabad',
    'SOF olympiad school Hyderabad',
    'national competitions CBSE school',
    'student competitions Medchal',
    'MI Champs school Hyderabad',
    'Malla Reddy School competitions',
    'academic competitions CBSE Medchal',
  ],
});

export default function CompetitionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Competitions & Olympiads', href: '/competitions' },
        ]}
      />
      <Competitions />
    </>
  );
}
