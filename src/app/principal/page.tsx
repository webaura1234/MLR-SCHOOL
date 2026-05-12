import About from '@/views/About';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: "Principal",
  description: "Message from the principal and leadership at Malla Reddy School.",
  path: '/principal',
});

export default function Page() {
  return <About />;
}
