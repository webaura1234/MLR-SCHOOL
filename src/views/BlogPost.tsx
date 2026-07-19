'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import { withImageVersion } from '@/lib/imageCacheBust';

/* ─── JSON-LD helpers rendered server-side ─────────────────────────────────── */

function ArticleJsonLd({ post, siteUrl }: { post: BlogPost; siteUrl: string }) {
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${siteUrl}${post.coverImage}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: imageUrl,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Malla Reddy School',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    wordCount: estimateWordCount(post),
    timeRequired: `PT${post.readTimeMinutes}M`,
    inLanguage: 'en-IN',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FaqJsonLdInline({ faqs }: { faqs: BlogPost['faqs'] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLdInline({ post, siteUrl }: { post: BlogPost; siteUrl: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function estimateWordCount(post: BlogPost): number {
  const allText = [
    post.intro,
    ...post.sections.flatMap((s) => [
      s.content,
      ...(s.subsections?.map((sub) => sub.content) ?? []),
    ]),
    ...post.faqs.flatMap((f) => [f.question, f.answer]),
    post.conclusion,
  ].join(' ');
  return allText.split(/\s+/).length;
}

/* ─── Main view ─────────────────────────────────────────────────────────────── */

interface BlogPostViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  siteUrl: string;
}

export default function BlogPostView({ post, relatedPosts, siteUrl }: BlogPostViewProps) {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* JSON-LD schemas */}
      <ArticleJsonLd post={post} siteUrl={siteUrl} />
      <FaqJsonLdInline faqs={post.faqs} />
      <BreadcrumbJsonLdInline post={post} siteUrl={siteUrl} />

      <article className="blog-post-page">
        {/* ── Page header ── */}
        <header
          className="blog-post-header"
          style={{
            background: 'var(--page-bg)',
            padding: '6rem 0 3rem',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem' }}>
            {/* Breadcrumb nav */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: 'var(--muted-foreground)',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/blog" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                Blog
              </Link>
              <ChevronRight size={12} />
              <span style={{ color: 'var(--muted-foreground)' }}>{post.category}</span>
            </nav>

            {/* Category badge */}
            <span
              style={{
                display: 'inline-block',
                background: 'var(--primary)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}
            >
              {post.category}
            </span>

            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                color: 'var(--foreground)',
                marginBottom: '1.25rem',
              }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                fontSize: '0.875rem',
                color: 'var(--muted-foreground)',
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> {formattedDate}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} /> {post.readTimeMinutes} min read
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <User size={14} /> {post.author}
              </span>
            </div>

            {/* Excerpt */}
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--muted-foreground)',
                lineHeight: 1.7,
                borderLeft: '3px solid var(--primary)',
                paddingLeft: '1rem',
              }}
            >
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* ── Cover image ── */}
        <div style={{ maxWidth: '860px', margin: '2rem auto', padding: '0 1.5rem' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
            <Image
              src={withImageVersion(post.coverImage)}
              alt={post.coverImageAlt}
              fill
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR}
              priority
              sizes="(max-width: 860px) 100vw, 860px"
            />
          </div>
          {post.coverImageAlt && (
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', textAlign: 'center', marginTop: '0.5rem' }}>
              {post.coverImageAlt}
            </p>
          )}
        </div>

        {/* ── Article body ── */}
        <div
          className="blog-post-body"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '0 1.5rem 3rem',
            lineHeight: 1.85,
            fontSize: '1.0625rem',
            color: 'var(--foreground)',
          }}
        >
          {/* Intro */}
          <p style={{ marginBottom: '2rem', fontSize: '1.0625rem' }}>{post.intro}</p>

          {/* Sections */}
          {post.sections.map((section, i) => (
            <section key={i} style={{ marginBottom: '2.5rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  marginBottom: '0.75rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid var(--primary)',
                }}
              >
                {section.heading}
              </h2>
              <p style={{ marginBottom: section.subsections ? '1rem' : 0 }}>{section.content}</p>

              {section.subsections?.map((sub, j) => (
                <div key={j} style={{ marginTop: '1.25rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {sub.heading}
                  </h3>
                  <p>{sub.content}</p>
                </div>
              ))}
            </section>
          ))}

          {/* Conclusion */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                fontWeight: 700,
                color: 'var(--foreground)',
                marginBottom: '0.75rem',
                paddingBottom: '0.5rem',
                borderBottom: '2px solid var(--primary)',
              }}
            >
              Conclusion
            </h2>
            <p>{post.conclusion}</p>
          </section>

          {/* CTA box */}
          <div
            style={{
              background: 'var(--primary)',
              color: '#fff',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            <p style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
              {post.ctaText}
            </p>
            <Link
              href={post.ctaHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#fff',
                color: 'var(--primary)',
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.95rem',
              }}
            >
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>

          {/* FAQ Section */}
          {post.faqs.length > 0 && (
            <section
              style={{ marginBottom: '3rem' }}
              aria-label="Frequently Asked Questions"
            >
              <h2
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid var(--primary)',
                }}
              >
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {post.faqs.map((faq, i) => (
                  <details
                    key={i}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '1rem 1.25rem',
                      background: 'var(--card)',
                    }}
                  >
                    <summary
                      style={{
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '1rem',
                        color: 'var(--foreground)',
                        listStyle: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {faq.question}
                    </summary>
                    <p style={{ marginTop: '0.75rem', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid var(--primary)',
                }}
              >
                Related Articles
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    style={{
                      display: 'block',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      background: 'var(--card)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                      <Image
                        src={withImageVersion(related.coverImage)}
                        alt={related.coverImageAlt}
                        fill
                        style={{ objectFit: 'cover' }}
                        blurDataURL={DEFAULT_BLUR}
                        placeholder="blur"
                        sizes="280px"
                      />
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--primary)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        {related.category}
                      </span>
                      <p
                        style={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: 'var(--foreground)',
                          marginTop: '0.4rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {related.title}
                      </p>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.8rem',
                          color: 'var(--primary)',
                          marginTop: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        Read More <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to blog */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
