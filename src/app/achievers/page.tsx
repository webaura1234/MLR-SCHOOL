import Achievers from '@/views/Achievers';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Student Achievers',
  description: 'Hall of fame — celebrating academic, sports, arts, and science achievers.',
  path: '/achievers',
});

type Achiever = {
  name: string;
  cat: string;
  year: string;
  achievement: string;
  img: string;
};

export default async function Page() {
  // Temporarily hardcoded (no Sheets integration yet).
  // Add achievers here when you have a working data source.
  const achievers: Achiever[] = [];

  return <Achievers achievers={achievers} />;
}
