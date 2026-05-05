/**
 * Loads gallery rows from the public Google Sheet CSV (same source as /gallery).
 */

import { fetchDataFromSheet } from '@/lib/sheets';

export type PublishedGalleryItem = {
  id: string;
  src: string;
  srcHd?: string;
  category: string;
  title: string;
  size?: 'sm' | 'md' | 'lg';
};

export const GALLERY_PUBLISHED_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=438455533&single=true&output=csv';

const URL_IN_TEXT = /https?:\/\/[^\s,"'<>]+/g;

/** Encode spaces etc. so Next/Image accepts Supabase and similar URLs from sheets. */
export function normalizeGalleryImageUrl(raw: string): string {
  let u = raw.trim().replace(/^["']|["']$/g, '').replace(/[,);]+$/g, '');
  if (!u.startsWith('http') && !u.startsWith('/')) return u;
  if (u.startsWith('http') && u.includes(' ') && !u.includes('%20')) {
    try {
      u = encodeURI(u);
    } catch {
      /* keep original */
    }
  }
  return u;
}

/** Stable key so the same image URL only appears once (sheet repeats / merged cells). */
function gallerySrcDedupeKey(src: string): string {
  const n = normalizeGalleryImageUrl(src);
  try {
    const u = new URL(n);
    u.hash = '';
    const href = u.href.replace(/\/+$/, '');
    return href.toLowerCase();
  } catch {
    return n.trim().replace(/\/+$/, '').toLowerCase();
  }
}

function urlsFromCell(cell: string | undefined): string[] {
  if (!cell?.trim()) return [];
  const trimmed = cell.trim();
  const pieces = trimmed
    .split(/[,|;\n\r]+/)
    .map((s) => normalizeGalleryImageUrl(s))
    .filter((s) => s.startsWith('http://') || s.startsWith('https://') || s.startsWith('/'));
  if (pieces.length > 0) return [...new Set(pieces)];
  const matched = trimmed.match(URL_IN_TEXT);
  if (!matched?.length) return [];
  return [...new Set(matched.map(normalizeGalleryImageUrl))];
}

function urlsFromWholeRow(cols: string[]): string[] {
  const fromCells = cols.flatMap((c) => urlsFromCell(c));
  if (fromCells.length > 0) return [...new Set(fromCells)];
  const joined = cols.join(' ');
  const matched = joined.match(URL_IN_TEXT);
  if (!matched?.length) return [];
  return [...new Set(matched.map(normalizeGalleryImageUrl))];
}

function sheetRowToGalleryItems(cols: string[], rowIndex: number): PublishedGalleryItem[] {
  const idBase = cols[0]?.trim() || `row-${rowIndex + 1}`;
  const category = (cols[2]?.trim() || 'general').toLowerCase();
  let title = cols[3]?.trim() || '';
  const sizeRaw = cols[4]?.trim();
  const size: PublishedGalleryItem['size'] =
    sizeRaw === 'sm' || sizeRaw === 'md' || sizeRaw === 'lg' ? sizeRaw : 'md';

  let urls = urlsFromCell(cols[1]);
  if (urls.length === 0) urls = urlsFromWholeRow(cols);
  if (urls.length === 0) return [];

  urls = [...new Set(urls.map(normalizeGalleryImageUrl))];

  if (!title && cols[1]?.trim() && !cols[1].includes('http')) {
    title = cols[1].trim();
  }

  return urls.map((src, i) => ({
    id: urls.length > 1 ? `${idBase}-${i + 1}` : idBase,
    src,
    srcHd: src,
    category,
    title:
      urls.length > 1 ? `${title || 'Photo'} (${i + 1})` : title || `Photo ${rowIndex + 1}`,
    size,
  }));
}

export async function fetchGalleryItemsFromPublishedSheet(): Promise<PublishedGalleryItem[]> {
  const url = GALLERY_PUBLISHED_SHEET_URL;
  const rows = await fetchDataFromSheet<PublishedGalleryItem[]>(
    url,
    '0',
    sheetRowToGalleryItems,
  );
  const data = rows.flat();
  const filtered = data.filter(
    (item) => item.src && (item.src.startsWith('http') || item.src.startsWith('/')),
  );

  const seen = new Set<string>();
  const unique: PublishedGalleryItem[] = [];
  for (const item of filtered) {
    const key = gallerySrcDedupeKey(item.src);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}
