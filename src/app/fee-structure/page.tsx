import FeeStructure from '@/views/FeeStructure';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FaqJsonLd from '@/components/FaqJsonLd';
import RelatedLinksBar from '@/components/RelatedLinksBar';
import { FEE_ACADEMIC_YEAR, FEE_ROWS, formatFee } from '@/lib/fee-structure';

export const metadata = constructMetadata({
  title: `School Fee Structure ${FEE_ACADEMIC_YEAR} | Malla Reddy School Medchal Hyderabad`,
  description:
    `Class-wise fee structure for ${FEE_ACADEMIC_YEAR} at Malla Reddy School Medchal — registration and term/tuition fees for Nursery, PP-I, PP-II and Classes I to VIII at our CBSE school in Hyderabad.`,
  path: '/fee-structure',
  keywords: [
    'Malla Reddy School fee structure',
    `school fee structure ${FEE_ACADEMIC_YEAR}`,
    'CBSE school fees Medchal',
    'CBSE school fees Hyderabad',
    'school tuition fees Medchal',
    'nursery school fees Hyderabad',
    'primary school fees Medchal',
    'middle school fees Hyderabad',
    'school admission fees Medchal',
  ],
});

const feeFaqs = [
  {
    question: `What is the fee structure at Malla Reddy School Medchal for ${FEE_ACADEMIC_YEAR}?`,
    answer:
      `For the ${FEE_ACADEMIC_YEAR} academic year the term/tuition fee is ` +
      FEE_ROWS.map((r) => `${formatFee(r.tuitionFee)} for ${r.className}`).join(', ') +
      `. A one-time registration fee of ${formatFee(FEE_ROWS[0].registrationFee)} applies to all classes.`,
  },
  {
    question: 'What is the registration fee at Malla Reddy School?',
    answer: `The registration fee is ${formatFee(
      FEE_ROWS[0].registrationFee,
    )} across all classes, from Nursery through Class VIII. It is a one-time charge paid at the time of registration.`,
  },
  {
    question: 'Are transport, uniform, and books included in the tuition fee?',
    answer:
      'No. Transport, uniform, and books are billed separately from the term/tuition fee. Please contact the admissions office for current charges on these.',
  },
  {
    question: 'How do I pay the school fees?',
    answer:
      'Fee payment details are shared by the admissions office once your admission is confirmed. Call +91 92 4758 7086 or visit our campus in Medchal for assistance.',
  },
];

const feeRelatedLinks = [
  {
    label: 'Admission Procedure',
    href: '/admission',
    description: 'Apply for admission and submit your enquiry online.',
  },
  {
    label: 'CBSE Curriculum & STEAM',
    href: '/curriculum',
    description: 'See what your child learns at every stage.',
  },
  {
    label: 'Labs & Facilities',
    href: '/labs',
    description: 'Science, robotics, computer, and mathematics labs.',
  },
  {
    label: 'Documents Required for Admission',
    href: '/blog/documents-required-school-admission-hyderabad',
    description: 'The paperwork checklist for school admission in Hyderabad.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Fee Structure', href: '/fee-structure' },
        ]}
      />
      <FaqJsonLd faqs={feeFaqs} />
      <FeeStructure />
      <RelatedLinksBar heading="Next Steps" links={feeRelatedLinks} />
    </>
  );
}
