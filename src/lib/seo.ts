import { Metadata } from 'next';
import { DEFAULT_SITE_INFO } from './siteInfo';

interface ConstructMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = 'Malla Reddy School, Medchal — CBSE School in Hyderabad',
  description = `CBSE-aligned learning with a STEAM focus, expert faculty, and world-class facilities. Address: ${DEFAULT_SITE_INFO.locationLine}.`,
  image = '/logo.png',
  path = '',
  noIndex = false,
}: ConstructMetadataProps = {}): Metadata {
  return {
    title,
    description,
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
