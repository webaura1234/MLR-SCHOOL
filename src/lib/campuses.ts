export type Campus = {
  name: string;
  board?: string;
  image: string;
};

/** Campus photos served locally — avoids hotlink / Next image optimizer failures */
export const OUR_CAMPUSES: Campus[] = [
  {
    name: 'CMR International, Suraram',
    image: '/images/campuses/suraram.webp',
  },
  {
    name: 'CMR School, Kompally',
    image: '/images/campuses/kompally.webp',
  },
  {
    name: 'CMR International School, Shapur',
    image: '/images/campuses/shapur.webp',
  },
  {
    name: 'MB Grammar School, Jeedimetla',
    image: '/images/campuses/jeedimetla.jpg',
  },
  {
    name: 'CMR School Lalgadi Malakpet',
    board: 'CBSE curriculum',
    image: '/images/campuses/lalgadi.webp',
  },
  {
    name: 'Malla Reddy School, Medchal',
    board: 'CBSE curriculum',
    image: '/images/campuses/medchal.jpg',
  },
  {
    name: 'CMR Kundanpally',
    image: '/images/campuses/kundanpally.webp',
  },
];

export const CAMPUS_IMAGE_FALLBACK = '/images/school_campus_hero.png';
