import Blog from '@/views/Blog';
import { fetchDataFromSheet } from '@/lib/sheets';
import { getBlurDataURL } from '@/lib/getBlurDataURL';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'News & Blog',
  description: 'Latest news, events, and stories from the Malla Reddy School campus.',
  path: '/blog',
});

const NEWS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=818070186&single=true&output=csv';

type BlogPost = {
  title: string;
  date: string;
  author: string;
  img: string;
  excerpt: string;
  blurDataURL?: string;
};

export default async function Page() {
  const posts = await fetchDataFromSheet<BlogPost>(NEWS_SHEET_URL, '0', (cols) => ({
    title: cols[1],
    excerpt: cols[2],
    date: cols[3],
    img: cols[4],
    author: 'School Admin',
  }));

  const validPosts = posts.filter((post) => post.title && post.title.trim() !== '');
  const postsWithBlur = await Promise.all(
    validPosts.map(async (post) => ({
      ...post,
      blurDataURL: post.img ? await getBlurDataURL(post.img) : undefined,
    })),
  );

  return <Blog posts={postsWithBlur} />;
}
