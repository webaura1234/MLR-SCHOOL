export type Campus = {
  name: string;
  board?: string;
  image: string;
};

/** Append "School" at the end when the name does not already include it */
export function formatCampusName(name: string): string {
  if (/\bschool\b/i.test(name)) return name;
  return `${name.trimEnd()} School`;
}

/** Campus photos served locally — avoids hotlink / Next image optimizer failures */
export const OUR_CAMPUSES: Campus[] = [
  {
    name: formatCampusName('CMR International, Suraram'),
    image: '/images/campuses/suraram.webp',
  },
  {
    name: formatCampusName('CMR School, Kompally'),
    image: '/images/campuses/kompally.webp',
  },
  {
    name: formatCampusName('CMR International School, Shapur'),
    image: '/images/campuses/shapur.webp',
  },
  {
    name: formatCampusName('MB Grammar School, Jeedimetla'),
    image: '/images/campuses/jeedimetla.jpg',
  },
  {
    name: formatCampusName('CMR School Lalgadi Malakpet'),
    board: 'CBSE curriculum',
    image: '/images/campuses/lalgadi.webp',
  },
  {
    name: formatCampusName('Malla Reddy School, Medchal'),
    board: 'CBSE curriculum',
    image: '/images/campuses/medchal.jpg',
  },
  {
    name: formatCampusName('CMR Kundanpally'),
    image: '/images/campuses/kundanpally.webp',
  },
];

export const CAMPUS_IMAGE_FALLBACK = '/images/school_campus_hero.png';
