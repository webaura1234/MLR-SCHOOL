import IITFoundation from '@/views/IITFoundation';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'IIT Foundation Program | Malla Reddy School',
  description: 'Our IIT Foundation program for grades 6th to 8th provides a strong base in STEM, preparing students for future competitive exams with conceptual clarity.',
  path: '/iit-foundation',
});

export default function IITFoundationPage() {
  return <IITFoundation />;
}
