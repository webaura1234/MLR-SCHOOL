import CoCurricular from '../../views/CoCurricular';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Co-Curricular Activities | Malla Reddy School',
  description: 'Explore the wide range of co-curricular activities at Malla Reddy School, including sports, arts, and performing arts.',
  path: '/co-curricular',
});

export default function CoCurricularPage() {
  return <CoCurricular />;
}
