import Admission from '@/views/Admission';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FaqJsonLd from '@/components/FaqJsonLd';
import RelatedLinksBar from '@/components/RelatedLinksBar';

export const metadata = constructMetadata({
  title: 'School Admissions 2026-27 | Malla Reddy School Medchal Hyderabad',
  description:
    'Apply for school admissions 2026-27 at Malla Reddy School Medchal — a leading CBSE school in Hyderabad. Enrol your child for pre-primary, primary, or middle school. Visit our campus in Medchal, Telangana.',
  path: '/admission',
  keywords: [
    'school admissions 2026 Medchal',
    'CBSE school admissions Hyderabad',
    'school admissions Medchal Hyderabad',
    'Malla Reddy School admissions',
    'pre-primary school admissions Medchal',
    'primary school admissions Hyderabad',
    'middle school admissions Medchal',
    'school enrollment Hyderabad 2026',
    'best school admissions Medchal',
  ],
});

const admissionFaqs = [
  {
    question: 'How do I apply for admissions at Malla Reddy School Medchal?',
    answer:
      'You can apply by filling out the admission inquiry form on our website, calling our admissions office at +91 92 4758 7086, or visiting our campus at Sy No.1101/P, Medchal Village, Medchal, Telangana 501401.',
  },
  {
    question: 'Which classes are open for admission at Malla Reddy School?',
    answer:
      'Malla Reddy School Medchal offers admissions from Pre-Primary (Nursery/LKG/UKG) through to Class 8 (Middle School), subject to seat availability.',
  },
  {
    question: 'Is Malla Reddy School Medchal affiliated with CBSE?',
    answer:
      'Yes, Malla Reddy School Medchal follows the CBSE curriculum, ensuring a nationally recognised standard of education.',
  },
  {
    question: 'What is the admission process for the 2026-27 academic year?',
    answer:
      'The admission process involves submitting an inquiry, a campus visit, document verification, and completion of the enrollment form. Contact our admissions team for current availability and exact requirements.',
  },
  {
    question: 'Where is Malla Reddy School located?',
    answer:
      'Malla Reddy School is located at Sy No.1101/P, Medchal Village, Medchal Mandal, Medchal-Malkajgiri District, Telangana 501401, near Hyderabad.',
  },
  {
    question: 'Does Malla Reddy School Medchal offer STEAM education?',
    answer:
      'Yes. STEAM (Science, Technology, Engineering, Arts, and Mathematics) is at the core of our curriculum, supported by dedicated science, computer, mathematics, and robotics labs.',
  },
];

const admissionRelatedLinks = [
  {
    label: 'CBSE Curriculum & STEAM',
    href: '/curriculum',
    description: 'Learn how we integrate STEAM into our CBSE curriculum.',
  },
  {
    label: 'IIT Foundation Program',
    href: '/iit-foundation',
    description: 'Advanced STEM preparation from Class 6 onwards.',
  },
  {
    label: 'Labs & Facilities',
    href: '/labs',
    description: 'Science, robotics, computer, and mathematics labs.',
  },
  {
    label: 'Co-Curricular Activities',
    href: '/co-curricular',
    description: 'Sports, arts, music, and performing arts programs.',
  },
  {
    label: 'Parent Testimonials',
    href: '/testimonials',
    description: "What parents say about Malla Reddy School.",
  },
  {
    label: 'School Admissions Guide',
    href: '/blog/school-admissions-2026-27-hyderabad-what-parents-need-to-know',
    description: 'Read our complete parent guide to school admissions 2026-27.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Admissions', href: '/admission' },
        ]}
      />
      <FaqJsonLd faqs={admissionFaqs} />
      <Admission />
      <RelatedLinksBar heading="Learn More About Malla Reddy School" links={admissionRelatedLinks} />
    </>
  );
}
