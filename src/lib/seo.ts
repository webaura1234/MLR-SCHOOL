import { Metadata } from 'next';
import { DEFAULT_SITE_INFO } from './siteInfo';
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
  image = '/logo.png',
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
      images: [
        {
          url: image,
          width: 512,
          height: 512,
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
