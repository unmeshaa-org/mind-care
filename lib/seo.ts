import type { Metadata } from 'next';

export type SeoImage = {
  url: string;
  alt?: string;
};

export type SeoOptions = {
  title: string;
  description: string;
  url: string;
  images?: SeoImage[];
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  twitterHandle?: string;
  canonicalUrl?: string;
  locale?: string;
  siteName?: string;
};

export function buildMetadata(options: SeoOptions): Metadata {
  const {
    title,
    description,
    url,
    images = [],
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    twitterHandle,
    canonicalUrl,
    locale = 'en_US',
    siteName = 'Mind Care Counseling',
  } = options;

  const openGraphImages = images.map((image) => ({
    url: image.url,
    alt: image.alt,
  }));

  const openGraph = {
    title,
    description,
    url,
    type: publishedTime || modifiedTime ? 'article' : type,
    siteName,
    images: openGraphImages,
    locale,
    ...(publishedTime && { publishedTime }),
    ...(modifiedTime && { modifiedTime }),
  };
  
  const metadata: Metadata = {
    title,
    description,
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((image) => image.url),
      site: twitterHandle ? `@${twitterHandle}` : undefined,
      creator: twitterHandle ? `@${twitterHandle}` : undefined,
    },
    alternates: {
      canonical: canonicalUrl || url,
    },
  };

  if (authors && authors.length > 0) {
    metadata.authors = authors.map((name) => ({ name }));
  }

  return metadata;
}

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://example.com';
}
