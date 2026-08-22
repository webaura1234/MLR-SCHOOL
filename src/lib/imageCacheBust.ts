/** Bump when public blog images are replaced so browsers and Next.js reload them. */
const IMAGE_VERSION = '20260822b';

export function withImageVersion(src: string): string {
  if (!src || src.startsWith('http')) return src;
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}v=${IMAGE_VERSION}`;
}
