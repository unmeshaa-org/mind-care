import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogBySlug, getBlogs, getRelatedPosts } from '../../../services/blog';
import { estimateReadingTime } from '../../../lib/blog';
import { buildMetadata, getSiteUrl } from '../../../lib/seo';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import BlogToc from '../../../components/blog/BlogToc';
import BlogContent from '../../../components/blog/BlogContent';
import AuthorBio from '../../../components/blog/AuthorBio';
import RelatedPosts from '../../../components/blog/RelatedPosts';
import ShareButtons from '../../../components/blog/ShareButtons';
import StructuredData from '../../../components/blog/StructuredData';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return {
      title: 'Blog post not found',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = getSiteUrl();
  const url = `${baseUrl}/blog/${post.slug}`;

  return buildMetadata({
    title: `${post.title} | Mind Care Counseling`,
    description: post.metaDescription,
    url,
    canonicalUrl: url,
    images: [{ url: post.coverImage, alt: post.title }],
    type: 'article',
    publishedTime: post.publishDate,
    modifiedTime: post.publishDate,
    authors: [post.author.name],
    twitterHandle: post.author.twitterHandle,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-900">Post not found</h1>
        <p className="mt-4 text-slate-600">
          We couldn’t find the article you were looking for. Try browsing our <Link href="/blog">blog</Link>.
        </p>
      </main>
    );
  }

  const url = `${getSiteUrl()}/blog/${post.slug}`;
  const related = await getRelatedPosts(post.slug);
  const readingTime = estimateReadingTime(post);

  return (
    <main className="container mx-auto px-4 py-16">
      <StructuredData post={post} url={url} />
      <Breadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url },
        ]}
        className="mb-8"
      />

      <header className="mx-auto max-w-3xl">
        <div className="space-y-3">
          <p className="text-sm font-medium text-indigo-600">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{new Date(post.publishDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="inline-flex items-center gap-2">{readingTime}</span>
            <span className="inline-flex items-center gap-2">By {post.author.name}</span>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.metaDescription}</p>
          <div className="mt-6">
            <ShareButtons title={post.title} url={url} />
          </div>
        </div>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="space-y-10">
          <div className="relative h-64 w-full overflow-hidden rounded-3xl">
            <Image
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:items-start">
            <div className="space-y-8">
              <BlogContent sections={post.content} />
            </div>
            <aside className="space-y-8">
              <BlogToc sections={post.content} className="rounded-xl border border-slate-200 bg-white p-6" />
              <AuthorBio author={post.author} />
              <RelatedPosts posts={related} />
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
