import Curriculum from '@/views/Curriculum';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FaqJsonLd from '@/components/FaqJsonLd';
import RelatedLinksBar from '@/components/RelatedLinksBar';

export const metadata = constructMetadata({
  title: 'CBSE Curriculum & STEAM Education | Malla Reddy School Medchal',
  description:
    'Malla Reddy School Medchal follows the CBSE curriculum enriched with STEAM — Science, Technology, Engineering, Arts, and Mathematics. Holistic learning for pre-primary to middle school students in Hyderabad.',
  path: '/curriculum',
  keywords: [
    'CBSE curriculum Medchal',
    'STEAM education Hyderabad',
    'CBSE curriculum Hyderabad',
    'holistic education Medchal',
    'science technology engineering arts mathematics school',
    'CBSE syllabus primary school Hyderabad',
    'Malla Reddy School curriculum',
  ],
});

const curriculumFaqs = [
  {
    question: 'What curriculum does Malla Reddy School Medchal follow?',
    answer:
      'Malla Reddy School Medchal follows the CBSE (Central Board of Secondary Education) curriculum, enriched with a STEAM (Science, Technology, Engineering, Arts, Mathematics) approach to learning.',
  },
  {
    question: 'What is STEAM education at Malla Reddy School?',
    answer:
      'STEAM education at Malla Reddy School integrates Science, Technology, Engineering, Arts, and Mathematics into a hands-on, project-based curriculum. Students learn through experiments, coding, robotics, and creative projects rather than rote memorisation.',
  },
  {
    question: 'Does Malla Reddy School offer classes from pre-primary to middle school?',
    answer:
      'Yes. Malla Reddy School Medchal offers education from Pre-Primary (Nursery, LKG, UKG) through Primary and up to Class 8 (Middle School).',
  },
  {
    question: 'How does the CBSE curriculum at Malla Reddy School prepare students for higher classes?',
    answer:
      'The CBSE curriculum at Malla Reddy School builds strong conceptual foundations in core subjects, supported by lab-based learning, the IIT Foundation program, and co-curricular activities that develop analytical and life skills.',
  },
];

const curriculumRelatedLinks = [
  {
    label: 'Labs & Facilities',
    href: '/labs',
    description: 'Science, robotics, computer, and mathematics labs that support STEAM.',
  },
  {
    label: 'IIT Foundation Program',
    href: '/iit-foundation',
    description: 'Advanced STEM preparation for Classes 6 to 8.',
  },
  {
    label: 'Co-Curricular Activities',
    href: '/co-curricular',
    description: 'Arts, sports, music, and more alongside academics.',
  },
  {
    label: 'Apply for Admissions',
    href: '/admission',
    description: 'Admissions open for 2026-27 across all classes.',
  },
  {
    label: 'How STEAM Prepares Students',
    href: '/blog/how-steam-education-prepares-students-future-careers',
    description: 'Read how STEAM learning prepares students for future careers.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Curriculum', href: '/curriculum' },
        ]}
      />
      <FaqJsonLd faqs={curriculumFaqs} />
      <Curriculum />
      <RelatedLinksBar heading="Explore Our Programs" links={curriculumRelatedLinks} />
    </>
  );
}
