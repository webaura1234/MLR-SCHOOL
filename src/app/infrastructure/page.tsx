import Infrastructure from '@/views/Infrastructure';
import { fetchDataFromSheet } from '@/lib/sheets';
import { fetchGalleryItemsFromPublishedSheet, normalizeGalleryImageUrl } from '@/lib/galleryFromPublishedSheet';
import { constructMetadata } from '@/lib/seo';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'Campus Infrastructure & Facilities | Malla Reddy School Medchal',
  description:
    'Explore state-of-the-art infrastructure, sports grounds, science and computer labs, digital learning spaces, and campus facilities at Malla Reddy School Medchal.',
  path: '/infrastructure',
  keywords: [
    'Malla Reddy School infrastructure',
    'school campus facilities Medchal',
    'CBSE school facilities Hyderabad',
    'science and computer labs Medchal',
    'sports grounds Malla Reddy School',
  ],
});

const FACILITIES_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=1248382523&single=true&output=csv';

type Facility = {
  images: string[];
};

export default async function InfrastructurePage() {
  let remoteFacilityImages: string[] = [];

  try {
    const facilitiesData = await fetchDataFromSheet<Facility>(
      FACILITIES_SHEET_URL,
      '0',
      (cols) => {
        const images = cols
          .flatMap((cell) => (cell ? cell.split(/[,|]/) : []))
          .map((s) => normalizeGalleryImageUrl(s.trim()))
          .filter((s) => s.startsWith('http') || s.startsWith('/'))
          .filter(Boolean);
        return { images };
      },
    );

    const validFacilities = facilitiesData.filter((f) => f.images?.length > 0);
    remoteFacilityImages = Array.from(new Set(validFacilities.flatMap((f) => f.images)));
  } catch (err) {
    console.error('Failed to fetch facilities from sheet:', err);
  }

  // Fallback: If facilities sheet returns empty, load photos from published gallery sheet
  if (remoteFacilityImages.length === 0) {
    try {
      const galleryItems = await fetchGalleryItemsFromPublishedSheet();
      remoteFacilityImages = galleryItems.map((item) => item.src);
    } catch {
      /* ignore fallback error */
    }
  }

  const facilityImagesWithBlur = remoteFacilityImages.map((src, index) => ({
    src,
    title: `Campus Facility Photo ${index + 1}`,
    blurDataURL: src ? DEFAULT_BLUR : undefined,
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Infrastructure', href: '/infrastructure' },
        ]}
      />
      <Infrastructure facilityImages={facilityImagesWithBlur} />
    </>
  );
}
