'use client';

import React, { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import { BLOG_POSTS } from '@/lib/blog-posts';
import { withImageVersion } from '@/lib/imageCacheBust';
import './Home.css';

interface SheetBlogPost {
  title: string;
  date: string;
  author: string;
  img: string;
  excerpt: string;
  blurDataURL?: string;
}

export type BlogProps = {
  posts: SheetBlogPost[];
};

/** Sheet posts that should not appear on the blog listing. */
const HIDDEN_BLOG_TITLES = new Set([
  'robotics team wins',
]);

function isHiddenBlogTitle(title: string | undefined): boolean {
  if (!title) return false;
  return HIDDEN_BLOG_TITLES.has(title.toLowerCase().trim());
}

/** Convert a blog title to a slug, used to match against BLOG_POSTS */
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Find a matching static post slug by title similarity */
function findSlugForTitle(title: string): string | null {
  const normalized = titleToSlug(title);
  const match = BLOG_POSTS.find(
    (p) => p.slug === normalized || p.title.toLowerCase().includes(title.toLowerCase().slice(0, 20)),
  );
  return match?.slug ?? null;
}

const Blog = ({ posts }: BlogProps) => {
  // Combine static SEO blog posts (always shown first) with sheet posts
  const staticPosts = BLOG_POSTS.map((p) => ({
    title: p.title,
    date: new Date(p.publishedDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    _ts: new Date(p.publishedDate).getTime(),
    author: p.author,
    img: p.coverImage,
    excerpt: p.excerpt,
    blurDataURL: undefined as string | undefined,
    slug: p.slug,
  }));

  const sheetPostsWithSlugs = posts.map((p) => {
    let formattedDate = p.date;
    let sortTs = new Date('2026-05-01').getTime();
    try {
      let d = new Date(p.date);
      if (isNaN(d.getTime())) {
        d = new Date('2026-05-01');
      }
      const minDate = new Date('2026-05-01T00:00:00');
      const maxDate = new Date('2026-06-03T23:59:59');
      if (d < minDate) {
        d = minDate;
      } else if (d > maxDate) {
        d = maxDate;
      }
      formattedDate = d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      sortTs = d.getTime();
    } catch {
      formattedDate = '1 May 2026';
    }

    return {
      ...p,
      date: formattedDate,
      _ts: sortTs,
      slug: findSlugForTitle(p.title),
    };
  });

  const allPosts = [
    ...staticPosts,
    ...sheetPostsWithSlugs.filter((sp) => {
      if (isHiddenBlogTitle(sp.title)) return false;
      // Deduplicate: skip sheet posts whose title already appears in static posts
      return !BLOG_POSTS.some((bp) =>
        bp.title.toLowerCase().slice(0, 30) === sp.title?.toLowerCase().slice(0, 30),
      );
    }),
  ].sort((a, b) => (b._ts ?? 0) - (a._ts ?? 0)); // newest first

  return (
    <div className="blog-page">
      <section
        className="page-header"
        style={{ background: 'var(--page-bg)', padding: '6rem 0 4rem', textAlign: 'center' }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: '4rem' }}
          >
            School <span className="text-primary">News &amp; Blog</span>
          </motion.h1>
          <p
            className="hero-brand-tagline"
            style={{ color: 'var(--muted-foreground)', margin: '1rem auto' }}
          >
            Education insights, parenting guides, school news, and campus stories from Malla Reddy
            School Medchal.
          </p>
        </div>
      </section>

      <section className="blog-grid-section section">
        <div className="container">
          <div className="creative-grid">
            {allPosts.map((post, i) => {
              const cardContent = (
                <motion.div
                  key={i}
                  className="polaroid-card"
                  whileHover={{ rotate: 0, y: -10 }}
                  style={{ '--rotation': `${i % 2 === 0 ? -2 : 2}deg` } as CSSProperties}
                >
                  <div className="polaroid-taped"></div>
                  <div className="polaroid-img-wrapper" style={{ height: '250px' }}>
                    {post.img && post.img.length > 5 ? (
                      <Image
                        src={withImageVersion(post.img)}
                        alt={post.title ?? 'Blog post image'}
                        width={400}
                        height={250}
                        placeholder="blur"
                        blurDataURL={post.blurDataURL ?? DEFAULT_BLUR}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: '#f3f4f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9ca3af',
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>
                  <div
                    className="blog-meta"
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.8rem',
                      color: 'var(--muted-foreground)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <User size={12} /> {post.author}
                    </span>
                  </div>
                  <h2
                    style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--muted-foreground)',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6',
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    className="squishy-btn btn-primary"
                    style={{
                      padding: '0.5rem 1.2rem',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    Read More <ArrowRight size={14} />
                  </span>
                </motion.div>
              );

              return post.slug ? (
                <Link
                  key={i}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  aria-label={`Read more: ${post.title}`}
                >
                  {cardContent}
                </Link>
              ) : (
                <React.Fragment key={i}>{cardContent}</React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
