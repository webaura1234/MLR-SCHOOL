import Contact from '@/views/Contact';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Contact | Malla Reddy School Medchal',
  description:
    'Contact Malla Reddy School Medchal — phone, email, WhatsApp, campus address in Medchal, Hyderabad, and inquiry form.',
  path: '/contact',
});

export default function Page() {
  return <Contact />;
}
