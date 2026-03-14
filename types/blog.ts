export type BlogAuthor = {
  name: string;
  bio: string;
  avatarUrl?: string;
  twitterHandle?: string;
  website?: string;
};

export type BlogPostSection =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'blockquote'; text: string };

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  coverImage: string;
  metaDescription: string;
  publishDate: string; // ISO date
  published?: boolean;
  author: BlogAuthor;
  tags?: string[];
  content: BlogPostSection[];
};
