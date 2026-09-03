import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import ClientRoot from '@/components/ClientRoot';
import GoogleTagLoader from '@/components/GoogleTagLoader';
import MetaPixelLoader from '@/components/MetaPixelLoader';
import SchoolJsonLd from '@/components/SchoolJsonLd';
import { getSiteUrl } from '@/lib/siteUrl';
import {
  DEFAULT_SEO_DESCRIPTION,
  DEFAULT_SEO_TITLE,
  SITE_KEYWORDS,
} from '@/lib/seoKeywords';
import './globals.css';

const siteUrl = getSiteUrl();

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DEFAULT_SEO_TITLE,
    template: '%s | Malla Reddy School Medchal',
  },
  description: DEFAULT_SEO_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  applicationName: 'Malla Reddy School Medchal',
  alternates: {},
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: DEFAULT_SEO_TITLE,
    description: DEFAULT_SEO_DESCRIPTION,
    type: 'website',
    siteName: 'Malla Reddy School',
    locale: 'en_IN',
    images: [
      {
        url: '/malla-reddy-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Malla Reddy School Medchal — Leading CBSE Curriculum School in Hyderabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_SEO_TITLE,
    description: DEFAULT_SEO_DESCRIPTION,
    images: ['/malla-reddy-hero.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A2463' },
    { media: '(prefers-color-scheme: dark)',  color: '#0A2463' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GoogleTagLoader />
        <MetaPixelLoader />
        <SchoolJsonLd />
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
