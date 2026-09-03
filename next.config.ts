import type { NextConfig } from 'next';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = dirname(fileURLToPath(import.meta.url));

/**
 * Blog slugs renamed when "CBSE School(s)" was replaced with "CBSE Curriculum"
 * site-wide. Old URLs are already indexed by Google and linked externally, so
 * every one of them 301s to its new address instead of 404ing.
 *
 * Keep these entries permanently — removing one resurrects a dead URL.
 */
const RENAMED_BLOG_SLUGS: Record<string, string> = {
  'cbse-schools-in-medchal-hyderabad-guide-for-parents':
    'cbse-curriculum-schools-in-medchal-hyderabad-guide-for-parents',
  'cbse-schools-near-outer-ring-road-hyderabad':
    'cbse-curriculum-schools-near-outer-ring-road-hyderabad',
  'cbse-schools-outer-ring-road-hyderabad':
    'cbse-curriculum-schools-outer-ring-road-hyderabad',
  'what-is-ncert-why-cbse-schools-use-it':
    'what-is-ncert-why-cbse-curriculum-schools-use-it',
  'what-is-formative-assessment-cbse-schools':
    'what-is-formative-assessment-cbse-curriculum-schools',
  'what-is-project-based-learning-cbse-schools':
    'what-is-project-based-learning-cbse-curriculum-schools',
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return Object.entries(RENAMED_BLOG_SLUGS).map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      // Explicit 301 rather than `permanent: true` (which emits a 308).
      // Both are permanent redirects and Google honours either, but 301 is
      // what every SEO auditing tool and older crawler expects to see.
      statusCode: 301,
    }));
  },
  /** Hides the Next.js dev-tools indicator (circular N) in development */
  devIndicators: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**'],
      };
    }
    return config;
  },
  turbopack: {
    // Ensure Turbopack resolves deps from this app folder,
    // even if parent directories contain unrelated lockfiles.
    root: appDir,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh4.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh6.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cmrschoolkompally.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.cmrschoollalgadimalakpet.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mbgrammarschool.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
