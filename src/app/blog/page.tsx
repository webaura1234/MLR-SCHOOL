import Blog from '@/views/Blog';
import { fetchDataFromSheet } from '@/lib/sheets';
import { getBlurDataURL } from '@/lib/getBlurDataURL';
import { constructMetadata } from '@/lib/seo';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = constructMetadata({
  title: 'School Blog & News | Malla Reddy School Medchal',
  description:
    'Stay updated with the latest news, events, parenting tips, and education insights from Malla Reddy School Medchal. Read expert articles on CBSE education, STEAM learning, and school admissions in Hyderabad.',
  path: '/blog',
  keywords: [
    'Malla Reddy School blog',
    'CBSE school news Medchal',
    'school events Hyderabad',
    'parenting education tips Hyderabad',
    'STEAM education articles',
    'school admissions guide Hyderabad',
    'Malla Reddy Schools news',
  ],
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

  const hiddenSheetTitles = new Set(['robotics team wins']);
  const validPosts = posts.filter(
    (post) =>
      post.title &&
      post.title.trim() !== '' &&
      !hiddenSheetTitles.has(post.title.toLowerCase().trim()),
  );
  const postsWithBlur = await Promise.all(
    validPosts.map(async (post) => ({
      ...post,
      blurDataURL: post.img ? await getBlurDataURL(post.img) : undefined,
    })),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ]}
      />
      <Blog posts={postsWithBlur} />
    </>
  );
}
