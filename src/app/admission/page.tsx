import Admission from '@/views/Admission';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Admissions | Malla Reddy School Medchal',
  description:
    'Apply for admissions at Malla Reddy School Medchal — Malla Reddy Schools CBSE campus in Hyderabad. Inquiry, campus visit, and enrollment.',
  path: '/admission',
});

export default function Page() {
  return <Admission />;
}
