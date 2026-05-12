import Contact from '@/views/Contact';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Contact',
  description: 'Contact Malla Reddy School — phone, email, office hours, inquiry form, and map.',
  path: '/contact',
});

export default function Page() {
  return <Contact />;
}
