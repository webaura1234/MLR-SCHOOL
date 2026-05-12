import Competitions from '@/views/Competitions';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Competitions & Olympiads | Malla Reddy School',
  description: 'Explore the various national and international competitions our students participate in, including SOF Olympiads, MI Champs, and more.',
  path: '/competitions',
});

export default function CompetitionsPage() {
  return <Competitions />;
}
