import React from 'react';
import type { BlogPost } from '../../types/blog';

type Props = {
  post: BlogPost;
  url: string;
};

export default function StructuredData({ post, url }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: post.title,
    description: post.metaDescription,
    image: [post.coverImage],
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mind Care Counseling',
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo.png',
      },
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
