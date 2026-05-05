import type { Metadata } from 'next';
import Achievers from '@/views/Achievers';

export const metadata: Metadata = {
  title: 'Student Achievers',
  description: 'Hall of fame — celebrating academic, sports, arts, and science achievers.',
};

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
