import { getPlaiceholder } from 'plaiceholder';
import { DEFAULT_BLUR } from './blurPlaceholder';

const MAX_BLUR_SOURCE_BYTES = 500_000;
const BLUR_FETCH_TIMEOUT_MS = 3_000;

async function fetchWithTimeout(url: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BLUR_FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function getBlurDataURL(imageUrl: string): Promise<string> {
  try {
    // Try a cheap HEAD first to avoid downloading/caching multi-MB images.
    try {
      const head = await fetchWithTimeout(imageUrl, { method: 'HEAD', next: { revalidate: 3600 } });
      if (head.ok) {
        const contentLength = head.headers.get('content-length');
        if (contentLength) {
          const size = Number.parseInt(contentLength, 10);
          if (Number.isFinite(size) && size > MAX_BLUR_SOURCE_BYTES) {
            return DEFAULT_BLUR;
          }
        }
      }
    } catch {
      // ignore HEAD failures; we'll handle fallback below
    }

    // Keep 1h revalidation for blur generation requests.
    // If the server tells us (via content-length) it's too big, we abort before downloading.
    const res = await fetchWithTimeout(imageUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch');

    const contentLength = res.headers.get('content-length');
    if (contentLength) {
      const size = Number.parseInt(contentLength, 10);
      if (Number.isFinite(size) && size > MAX_BLUR_SOURCE_BYTES) {
        return DEFAULT_BLUR;
      }
    }

    const buffer = Buffer.from(await res.arrayBuffer());

    // Double check buffer size.
    if (buffer.byteLength > MAX_BLUR_SOURCE_BYTES) {
      return DEFAULT_BLUR;
    }

    const { base64 } = await getPlaiceholder(buffer, { size: 8 });
    return base64;
  } catch {
    return DEFAULT_BLUR;
  }
}

