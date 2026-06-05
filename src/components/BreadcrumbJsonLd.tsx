import { getSiteUrl } from '@/lib/siteUrl';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * Renders a BreadcrumbList schema.org JSON-LD script tag.
 * Also renders a visible, accessible <nav> breadcrumb for users and crawlers.
 *
 * Usage:
 *   <BreadcrumbJsonLd items={[
 *     { name: 'Home', href: '/' },
 *     { name: 'Admissions', href: '/admission' },
 *   ]} />
 */
export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
