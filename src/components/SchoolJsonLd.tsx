import { DEFAULT_SITE_INFO } from '@/lib/siteInfo';
import { getSiteUrl } from '@/lib/siteUrl';
import { SITE_ALTERNATE_NAMES } from '@/lib/seoKeywords';

export default function SchoolJsonLd() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'School',
        '@id': `${siteUrl}/#school`,
        name: 'Malla Reddy School',
        alternateName: SITE_ALTERNATE_NAMES,
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${siteUrl}/malla-reddy-hero.jpg`,
        description:
          'Malla Reddy School Medchal is part of Malla Reddy Schools — a CBSE-affiliated campus in Hyderabad offering pre-primary to middle school education with STEAM learning, modern laboratories, and holistic development programs.',
        telephone: DEFAULT_SITE_INFO.phoneTel,
        email: DEFAULT_SITE_INFO.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Sy No.1101/P, Medchal Village, Medchal Mandal',
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
        hasMap: 'https://maps.google.com/?q=Malla+Reddy+School+Medchal+Hyderabad',
        openingHours: 'Mo-Sa 08:00-17:00',
        areaServed: [
          { '@type': 'City', name: 'Medchal' },
          { '@type': 'City', name: 'Hyderabad' },
          { '@type': 'State', name: 'Telangana' },
        ],
        sameAs: [
          'https://www.mallareddyschool.com',
          'https://www.facebook.com/people/Malla-Reddy-School-Medchal/61590200867782/',
          'https://x.com/mallareddyschl',
          'https://www.youtube.com/@mallareddyschool_medchal',
        ],
        educationalCredentialAwarded: 'CBSE',
        teaches: [
          'Pre-Primary Education',
          'Primary Education',
          'Middle School Education',
          'STEAM Education',
          'IIT Foundation',
        ],
        keywords:
          'CBSE school Medchal, best school Hyderabad, STEAM education, school admissions Medchal',
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Malla Reddy School Medchal',
        description:
          'Official website of Malla Reddy School Medchal — leading CBSE school in Hyderabad, Telangana.',
        publisher: {
          '@id': `${siteUrl}/#school`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
