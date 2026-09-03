import IITFoundation from '@/views/IITFoundation';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FaqJsonLd from '@/components/FaqJsonLd';
import RelatedLinksBar from '@/components/RelatedLinksBar';

export const metadata = constructMetadata({
  title: 'IIT Foundation Program for Classes 6-8 | Malla Reddy School Medchal',
  description:
    'Malla Reddy School Medchal offers an IIT Foundation program for Classes 6 to 8, building strong STEM foundations in Mathematics, Physics, and Chemistry to prepare students for future competitive exams.',
  path: '/iit-foundation',
  keywords: [
    'IIT foundation school Hyderabad',
    'IIT foundation program Medchal',
    'IIT foundation classes 6 7 8 Hyderabad',
    'STEM foundation school Medchal',
    'competitive exam preparation school Hyderabad',
    'IIT JEE foundation CBSE curriculum school',
    'Malla Reddy School IIT foundation',
  ],
});

const iitFaqs = [
  {
    question: 'What is the IIT Foundation program at Malla Reddy School?',
    answer:
      'The IIT Foundation program at Malla Reddy School Medchal is designed for students in Classes 6 to 8. It builds a strong conceptual base in Mathematics, Physics, and Chemistry, preparing students for future competitive exams like JEE and NEET.',
  },
  {
    question: 'From which class does the IIT Foundation program start?',
    answer:
      'The IIT Foundation program begins from Class 6 at Malla Reddy School Medchal, giving students early exposure to advanced concepts in Science and Mathematics.',
  },
  {
    question: 'How does the IIT Foundation program benefit students?',
    answer:
      'It develops analytical thinking, problem-solving, and conceptual clarity from an early age — skills that are essential not just for IIT JEE but for any competitive exam or academic career in STEM fields.',
  },
];

const iitRelatedLinks = [
  {
    label: 'CBSE Curriculum & STEAM',
    href: '/curriculum',
    description: 'See how STEAM integrates with our CBSE program.',
  },
  {
    label: 'Labs & Facilities',
    href: '/labs',
    description: 'Science and mathematics labs supporting Foundation learning.',
  },
  {
    label: 'Apply for Admissions',
    href: '/admission',
    description: 'Admissions open for Classes 6, 7, and 8.',
  },
  {
    label: 'Why Start IIT Foundation Early',
    href: '/blog/iit-foundation-early-preparation-matters',
    description: 'Read our guide on early IIT Foundation preparation.',
  },
];

export default function IITFoundationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'IIT Foundation', href: '/iit-foundation' },
        ]}
      />
      <FaqJsonLd faqs={iitFaqs} />
      <IITFoundation />
      <RelatedLinksBar heading="Continue Exploring" links={iitRelatedLinks} />
    </>
  );
}
