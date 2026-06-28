/**
 * Local homepage images used while remote gallery/facility URLs fail to load
 * (e.g. Vercel image optimizer quota). Set USE_HOMEPAGE_LOCAL_IMAGES to false
 * once remote images are working again.
 */
export const USE_HOMEPAGE_LOCAL_IMAGES = true;

/** Same three program photos shown in “Programs Offered” */
export const HOME_PROGRAM_IMAGE_PATHS = [
  '/images/programs/pre-primary.jpg',
  '/images/programs/primary.jpg',
  '/images/programs/middle.jpg',
] as const;

export type HomeGalleryFallback = {
  src: string;
  title: string;
  category: string;
};

export const HOME_GALLERY_FALLBACKS: HomeGalleryFallback[] = [
  {
    src: HOME_PROGRAM_IMAGE_PATHS[0],
    title: 'Pre-Primary',
    category: 'Programs',
  },
  {
    src: HOME_PROGRAM_IMAGE_PATHS[1],
    title: 'Primary',
    category: 'Programs',
  },
  {
    src: HOME_PROGRAM_IMAGE_PATHS[2],
    title: 'Middle (up to 8th class)',
    category: 'Programs',
  },
];

export const HOME_FACILITY_FALLBACKS: string[] = [...HOME_PROGRAM_IMAGE_PATHS];
