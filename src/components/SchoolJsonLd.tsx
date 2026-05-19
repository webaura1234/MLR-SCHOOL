import { DEFAULT_SITE_INFO } from '@/lib/siteInfo';
import { getSiteUrl } from '@/lib/siteUrl';
import { SITE_ALTERNATE_NAMES } from '@/lib/seoKeywords';

export default function SchoolJsonLd() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `${siteUrl}/#school`,
    name: 'Malla Reddy School',
    alternateName: SITE_ALTERNATE_NAMES,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/malla-reddy-hero.jpg`,
    description:
      'Malla Reddy School Medchal is part of Malla Reddy Schools — a CBSE-aligned campus in Hyderabad offering pre-primary to middle school education with STEAM and modern facilities.',
    telephone: DEFAULT_SITE_INFO.phoneTel,
    email: DEFAULT_SITE_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: DEFAULT_SITE_INFO.addressLine,
      addressLocality: 'Medchal',
      addressRegion: 'Telangana',
      postalCode: '501401',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.6297,
      longitude: 78.4827,
    },
    areaServed: ['Medchal', 'Hyderabad', 'Telangana'],
    keywords: SITE_ALTERNATE_NAMES.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
