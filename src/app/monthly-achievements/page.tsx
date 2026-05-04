import type { Metadata } from 'next';
import MonthlyAchievements from '@/components/MonthlyAchievements';

export const metadata: Metadata = {
  title: 'Monthly Achievements',
  description: 'Monthly achievements and highlights at Malla Reddy School.',
};

export default function Page() {
  return <MonthlyAchievements />;
}

