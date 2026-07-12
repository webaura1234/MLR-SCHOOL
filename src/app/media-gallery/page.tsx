import { promises as fsPromises } from 'fs';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
import MediaGallery from '@/views/MediaGallery';
import { MEDIA_GALLERY_ITEMS } from '@/lib/mediaGallery';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Media Gallery',
  description:
    'Newspaper coverage and publications featuring Malla Reddy School, Medchal inauguration, and press highlights.',
  path: '/media-gallery',
});

async function getLocalBlurDataURL(src: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'public', src.replace(/^\//, ''));
    const buffer = await fsPromises.readFile(filePath);
    const { base64 } = await getPlaiceholder(buffer, { size: 8 });
    return base64;
  } catch {
    return DEFAULT_BLUR;
  }
}

export default async function MediaGalleryPage() {
  const itemsWithBlur = await Promise.all(
    MEDIA_GALLERY_ITEMS.map(async (item) => ({
      ...item,
      blurDataURL: await getLocalBlurDataURL(item.src),
    })),
  );

  return <MediaGallery items={itemsWithBlur} />;
}
