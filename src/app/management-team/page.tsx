import ManagementTeam from '@/views/ManagementTeam';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Management Team | Malla Reddy School',
  description: 'Meet the visionaries and leadership team of Malla Reddy School who are dedicated to excellence in education.',
  path: '/management-team',
});

export default function Page() {
  return <ManagementTeam />;
}
