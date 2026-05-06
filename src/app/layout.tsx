import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import ClientRoot from '@/components/ClientRoot';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://mallareddyschool.com';

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
    default: 'Malla Reddy School, Kompally — CBSE-Aligned STEAM Education',
    template: '%s | Malla Reddy School',
  },
  description:
    'Malla Reddy School (Kompally) offers CBSE-aligned learning with STEAM focus, expert faculty, and world-class facilities. Admissions open — apply online or call now.',
  keywords: [
    'school',
    'CBSE',
    'STEAM',
    'education',
    'admissions',
    'primary school',
    'pre-primary',
    'Kompally',
    'Hyderabad',
    'Medchal',
  ],
  alternates: {
    canonical: '/',
  },
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
    title: 'Malla Reddy School, Kompally',
    description:
      'CBSE-aligned learning with a STEAM focus, expert faculty, and world-class facilities. Admissions open.',
    type: 'website',
    url: '/',
    siteName: 'Malla Reddy School',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Malla Reddy School',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malla Reddy School, Kompally',
    description:
      'CBSE-aligned learning with a STEAM focus, expert faculty, and world-class facilities. Admissions open.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
