import Home from '@/views/Home';
import { fetchGalleryItemsFromPublishedSheet, normalizeGalleryImageUrl } from '@/lib/galleryFromPublishedSheet';
import { fetchDataFromSheet } from '@/lib/sheets';
import { PROGRAM_SECTION_IMAGES } from '@/lib/programSectionImages';
import type { SchoolEvent, EventCategory } from '@/lib/calendar-data';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import type { StaticImageData } from 'next/image';
import { DEFAULT_SITE_INFO } from '@/lib/siteInfo';
import { constructMetadata } from '@/lib/seo';
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE } from '@/lib/seoKeywords';
import {
  HOME_FACILITY_FALLBACKS,
  HOME_GALLERY_FALLBACKS,
  USE_HOMEPAGE_LOCAL_IMAGES,
} from '@/lib/homeFallbackImages';

export const metadata = constructMetadata({
  title: DEFAULT_SEO_TITLE,
  description: `${DEFAULT_SEO_DESCRIPTION} Located at ${DEFAULT_SITE_INFO.addressLine}`,
  path: '/',
});

// Do NOT change these IDs (hardcoded by requirement)
// NOTE: This must match the real spreadsheet id exactly (from the /d/<id>/edit URL).
const GOOGLE_SHEET_ID = '1yq3iz43AgYlSZKXJEE6P6aMmYme84eo8SXPmsgCt4Bs';
const GIDS = {
  PROGRAMS: '185361245',
  FACILITIES: '1248382523',
} as const;

const FACILITIES_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=1248382523&single=true&output=csv';

const CALENDAR_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=1328060838&single=true&output=csv';

const HOME_FETCH_TIMEOUT_MS = 5_000;

type RawGalleryItem = Record<string, unknown>;

function asString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  return String(value);
}

type Program = {
  title: string;
  desc: string;
  image: string | StaticImageData;
  icon: string;
};

type Facility = {
  images: string[];
};

const MONTH_MAP: Record<string, string> = {
  JAN: '01',
  FEB: '02',
  MAR: '03',
  APR: '04',
  MAY: '05',
  JUN: '06',
  JUL: '07',
  AUG: '08',
  SEP: '09',
  OCT: '10',
  NOV: '11',
  DEC: '12',
  JANUARY: '01',
  FEBRUARY: '02',
  MARCH: '03',
  APRIL: '04',
  JUNE: '06',
  JULY: '07',
  AUGUST: '08',
  SEPTEMBER: '09',
  OCTOBER: '10',
  NOVEMBER: '11',
  DECEMBER: '12',
};

const DEFAULT_PROGRAMS: Program[] = [
  {
    title: 'Pre-Primary',
    desc: 'Play-based learning that builds strong early foundations in language, numbers, and social skills.',
    image: PROGRAM_SECTION_IMAGES.prePrimary,
    icon: 'Star',
  },
  {
    title: 'Primary',
    desc: 'Core academics with activities that develop curiosity, confidence, and communication skills.',
    image: PROGRAM_SECTION_IMAGES.primary,
    icon: 'BookOpen',
  },
  {
    title: 'Middle (up to 8th class)',
    desc: 'Concept-driven learning with labs and projects to prepare students for higher classes.',
    image: PROGRAM_SECTION_IMAGES.middle,
    icon: 'Microscope',
  },
];

async function fetchWithTimeout(url: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HOME_FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchHomeGallery() {
  // Prefer Apps Script, fallback to published CSV sheet
  try {
    const response = await fetchWithTimeout(
      'https://script.google.com/macros/s/AKfycbxzGg_9G09RThkXBTfxYnfdP25qbKjX07MAeN-9ABYwglidLfK6RvTizNWbiTuEzgk/exec?type=gallery',
      { next: { revalidate: 3600 } },
    );
    const galleryJson: unknown = await response.json();
    const galleryData: RawGalleryItem[] = Array.isArray(galleryJson)
      ? (galleryJson as RawGalleryItem[])
      : [];

    const validGallery = galleryData
      .filter((item) => {
        const src = item.coverimage ?? item.coverImage ?? item.src;
        const srcStr = asString(src);
        return srcStr.length > 10;
      })
      .map((item) => {
        const rawSrc = asString(item.coverimage ?? item.coverImage ?? item.src);
        const imgs = rawSrc
          .split(/[,|]/)
          .map((s: string) => s.trim())
          .filter(Boolean);
        return {
          src: normalizeGalleryImageUrl(imgs[0] || ''),
          title: asString(item.title ?? item.Title) || 'School Moment',
          category: asString(item.category ?? item.Category) || 'General',
        };
      })
      .filter(
        (item: { src: string }) =>
          item.src && (item.src.startsWith('http') || item.src.startsWith('/')),
      );

    if (validGallery.length > 0) return validGallery;
  } catch {
    // fallback below
  }

  const fromSheet = await fetchGalleryItemsFromPublishedSheet();
  return fromSheet.map((g) => ({ src: g.src, title: g.title, category: g.category }));
}

export default async function Page() {
  const [gallery, facilitiesData, calendarEvents] = await Promise.all([
    fetchHomeGallery(),
    fetchDataFromSheet<Facility>(FACILITIES_SHEET_URL, '0', (cols) => {
      const images = cols
        .flatMap((cell) => (cell ? cell.split(/[,|]/) : []))
        .map((s) => s.trim())
        .filter((s) => s.startsWith('http') || s.startsWith('/'))
        .filter(Boolean);
      return { images };
    }),
    fetchDataFromSheet<SchoolEvent>(CALENDAR_SHEET_URL, '0', (cols, index) => {
      const day = cols[0]?.padStart(2, '0');
      const monthRaw = cols[1]?.toUpperCase() || 'JAN';
      const month = MONTH_MAP[monthRaw] || '01';
      const year = cols[2] || new Date().getFullYear().toString();

      return {
        id: `event-${index}`,
        title: cols[4] || 'School Event',
        date: `${year}-${month}-${day}`,
        category: (cols[3] || 'Event') as EventCategory,
        description: cols[5] || '',
      };
    }),
  ]);

  const gallerySource = USE_HOMEPAGE_LOCAL_IMAGES
    ? HOME_GALLERY_FALLBACKS
    : gallery.length >= 3
      ? gallery
      : [...HOME_GALLERY_FALLBACKS, ...gallery];

  const galleryTop = gallerySource.slice(0, 3);
  const galleryTopWithBlur = galleryTop.map((g) => ({
    ...g,
    blurDataURL: g.src ? DEFAULT_BLUR : undefined,
  }));
  const galleryPreview = galleryTopWithBlur.map((g) => ({
    src: g.src,
    title: g.title,
    blurDataURL: g.blurDataURL,
  }));

  // Programs sheet gid is currently not accessible as CSV (Google returns 400),
  // so we render the built-in defaults for now (UI stays the same).
  const programs = DEFAULT_PROGRAMS;

  const validFacilities = facilitiesData.filter((f) => f.images?.length > 0);
  const remoteFacilityImages = Array.from(new Set(validFacilities.flatMap((f) => f.images)));
  const facilityImages = USE_HOMEPAGE_LOCAL_IMAGES
    ? HOME_FACILITY_FALLBACKS
    : remoteFacilityImages.length >= 3
      ? remoteFacilityImages
      : [...HOME_FACILITY_FALLBACKS, ...remoteFacilityImages];
  const facilityTopWithBlur = facilityImages.slice(0, 3).map((src) => ({
    src,
    blurDataURL: src ? DEFAULT_BLUR : undefined,
  }));

  return (
    <Home
      galleryPreview={galleryPreview}
      programs={programs}
      facilityImages={facilityTopWithBlur}
      calendarEvents={calendarEvents}
    />
  );
}
