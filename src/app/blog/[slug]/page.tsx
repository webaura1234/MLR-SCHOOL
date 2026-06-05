import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPost, getAllBlogPosts, getRelatedPosts } from '@/lib/blog-posts';
import { getSiteUrl } from '@/lib/siteUrl';
import BlogPostView from '@/views/BlogPost';

interface Props {
  params: Promise<{ slug: string }>;
}

/** Generate all static paths at build time */
export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

/** Per-post metadata */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const siteUrl = getSiteUrl();
  const canonicalUrl = `/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${siteUrl}${post.coverImage}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      siteName: 'Malla Reddy School',
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate ?? post.publishedDate,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug);
  const siteUrl = getSiteUrl();

  return (
    <BlogPostView
      post={post}
      relatedPosts={relatedPosts}
      siteUrl={siteUrl}
    />
  );
}
