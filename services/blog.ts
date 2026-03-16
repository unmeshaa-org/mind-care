import { supabase } from './supabaseClient';
import type { BlogPost } from '../types/blog';

type BlogRow = {
  id: string;
  title: string;
  slug: string;
  cover_image?: string;
  meta_description?: string;
  publish_date?: string;
  published: boolean;
  author_name?: string;
  author_bio?: string;
  author_avatar_url?: string;
  author_twitter_handle?: string;
  author_website?: string;
  tags?: string[];
  content?: string;
};

const TABLE = 'blogs';

function mapRowToPost(row: BlogRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    coverImage: row.cover_image,
    metaDescription: row.meta_description,
    publishDate: row.publish_date,
    published: row.published,
    author: {
      name: row.author_name,
      bio: row.author_bio,
      avatarUrl: row.author_avatar_url,
      twitterHandle: row.author_twitter_handle,
      website: row.author_website,
    },
    tags: row.tags,
    content: typeof row.content === 'string' 
    ? JSON.parse(row.content) 
    : row.content ?? [],
  };
}

export async function getBlogs(publishedOnly = true): Promise<BlogPost[]> {
  if (!supabase) return [];

  let query = supabase.from(TABLE).select('*');
  if (publishedOnly) {
    query = query.eq('published', true);
  }

  const { data, error } = await query.order('publish_date', { ascending: false });
  if (error) {
    console.error('Supabase getBlogs error', error);
    return [];
  }
  return (data ?? []).map((row: BlogRow) => mapRowToPost(row));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE).select('*').eq('slug', slug).limit(1).single() as { data: BlogRow | null; error: any };
  if (error) {
    console.error('Supabase getBlogBySlug error', error);
    return null;
  }

  return data ? mapRowToPost(data) : null;
}

export async function getRelatedPosts(slug: string, max = 3): Promise<BlogPost[]> {
  const post = await getBlogBySlug(slug);
  if (!post || !post.tags || post.tags.length === 0) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .neq('slug', slug)
    .overlaps('tags', post.tags)
    .order('publish_date', { ascending: false })
    .limit(max);

  if (error) {
    console.error('Supabase getRelatedPosts error', error);
    return [];
  }

  return (data ?? []).map((row: BlogRow) => mapRowToPost(row));
}

export async function createBlog(post: Partial<BlogPost>) {
  if (!supabase) throw new Error('Supabase is not available');

  const { data, error } = await supabase
  .from(TABLE)
  .insert({
    title: post.title,
    slug: post.slug,
    cover_image: post.coverImage,
    meta_description: post.metaDescription,
    publish_date: post.publishDate,
    published: post.published ?? false,
    author_name: post.author?.name,
    author_bio: post.author?.bio,
    author_avatar_url: post.author?.avatarUrl,
    author_twitter_handle: post.author?.twitterHandle,
    author_website: post.author?.website,
    tags: post.tags,
    content: post.content,
  })
  .select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  return mapRowToPost(data[0] as BlogRow);
}

export async function updateBlog(slug: string, updates: Partial<BlogPost>) {
  if (!supabase) throw new Error('Supabase is not available');

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      title: updates.title,
      cover_image: updates.coverImage,
      meta_description: updates.metaDescription,
      publish_date: updates.publishDate,
      published: updates.published,
      author_name: updates.author?.name,
      author_bio: updates.author?.bio,
      author_avatar_url: updates.author?.avatarUrl,
      author_twitter_handle: updates.author?.twitterHandle,
      author_website: updates.author?.website,
      tags: updates.tags,
      content: updates.content,
    })
    .eq('slug', slug)
    .select()
    .single() as { data: BlogRow | null; error: any };

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapRowToPost(data) : null;
}

export async function deleteBlog(slug: string) {
  if (!supabase) throw new Error('Supabase is not available');

  const { error } = await supabase.from(TABLE).delete().eq('slug', slug);
  if (error) {
    throw new Error(error.message);
  }

  return true;
}
