import { Metadata } from 'next';
import {
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  SITE_KEYWORDS,
} from './seoKeywords';

interface ConstructMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function constructMetadata({
  title = DEFAULT_SEO_TITLE,
  description = DEFAULT_SEO_DESCRIPTION,
  image = '/malla-reddy-hero.jpg',
  path = '',
  keywords = [...SITE_KEYWORDS],
  noIndex = false,
}: ConstructMetadataProps = {}): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: path === '' ? '/' : path,
      siteName: 'Malla Reddy School',
      locale: 'en_IN',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      // Next.js resolves relative paths against metadataBase (set in layout.tsx).
      // e.g. '/admission' → 'https://www.mallareddyschool.com/admission'
      canonical: path === '' ? '/' : path,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
