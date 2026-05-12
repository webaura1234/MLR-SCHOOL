import Admission from '@/views/Admission';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Admissions',
  description: 'Admissions portal — inquiry, campus visit, and enrollment information for Malla Reddy School.',
  path: '/admission',
});

export default function Page() {
  return <Admission />;
}
