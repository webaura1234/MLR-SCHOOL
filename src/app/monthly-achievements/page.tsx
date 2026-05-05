import type { Metadata } from 'next';
import MonthlyAchievements from '@/components/MonthlyAchievements';
import { ACHIEVEMENTS_DATA } from '@/lib/achievements-data';
import { getBlurDataURL } from '@/lib/getBlurDataURL';

export const metadata: Metadata = {
  title: 'Monthly Achievements',
  description: 'Monthly achievements and highlights at Malla Reddy School.',
};

export default async function Page() {
  // Hardcoded/local data for now (no Sheets integration yet).
  const achievementsWithBlur = await Promise.all(
    ACHIEVEMENTS_DATA.map(async (a) => ({
      ...a,
      blurDataURL: a.image ? await getBlurDataURL(a.image) : undefined,
    })),
  );

  return <MonthlyAchievements achievements={achievementsWithBlur} />;
}

