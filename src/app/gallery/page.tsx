import Gallery from '@/views/Gallery';
import { fetchGalleryItemsFromPublishedSheet } from '@/lib/galleryFromPublishedSheet';
import { getBlurDataURL } from '@/lib/getBlurDataURL';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'School Gallery | Campus Life at Malla Reddy School Medchal',
  description:
    'Browse photos from Malla Reddy School Medchal — classrooms, labs, sports, events, arts, and everyday campus life. See what learning looks like at our CBSE curriculum school in Hyderabad.',
  path: '/gallery',
  keywords: [
    'Malla Reddy School gallery',
    'school campus photos Medchal',
    'CBSE curriculum school campus Hyderabad',
    'school life photos Medchal',
    'Malla Reddy School campus',
  ],
});

export default async function GalleryPage() {
  const items = await fetchGalleryItemsFromPublishedSheet();
  const itemsWithBlur = await Promise.all(
    items.map(async (item) => ({
      ...item,
      blurDataURL: await getBlurDataURL(item.src),
    })),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Gallery', href: '/gallery' },
        ]}
      />
      <Gallery items={itemsWithBlur} />
    </>
  );
}
