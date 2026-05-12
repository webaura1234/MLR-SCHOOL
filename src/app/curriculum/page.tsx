import Curriculum from '@/views/Curriculum';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Curriculum',
  description: 'Academic curriculum with STEAM at the core — science, technology, engineering, arts, and mathematics for every learner.',
  path: '/curriculum',
});

export default function Page() {
  return <Curriculum />;
}
