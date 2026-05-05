import Gallery from '@/views/Gallery';
import { fetchGalleryItemsFromPublishedSheet } from '@/lib/galleryFromPublishedSheet';
import { getBlurDataURL } from '@/lib/getBlurDataURL';

export default async function GalleryPage() {
  const items = await fetchGalleryItemsFromPublishedSheet();
  const itemsWithBlur = await Promise.all(
    items.map(async (item) => ({
      ...item,
      blurDataURL: await getBlurDataURL(item.src),
    })),
  );

  return <Gallery items={itemsWithBlur} />;
}
