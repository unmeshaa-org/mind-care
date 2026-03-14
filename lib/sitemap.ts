import { getAllPosts } from './blog';
import { getSiteUrl } from './seo';

export type SitemapEntry = {
  url: string;
  lastmod?: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

export function getSitemapEntries(): SitemapEntry[] {
  const baseUrl = getSiteUrl().replace(/\/$/, '');

  const pages: SitemapEntry[] = [
    { url: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/services`, changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changefreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.7 },
  ];

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.publishDate,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  return [...pages, ...blogPosts];
}

export function buildSitemapXml(entries: SitemapEntry[]) {
  const urlSet = entries
    .map((entry) => {
      const parts = [`<loc>${entry.url}</loc>`];

      if (entry.lastmod) {
        parts.push(`<lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>`);
      }

      if (entry.changefreq) {
        parts.push(`<changefreq>${entry.changefreq}</changefreq>`);
      }

      if (typeof entry.priority === 'number') {
        parts.push(`<priority>${entry.priority.toFixed(1)}</priority>`);
      }

      return `<url>${parts.join('')}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlSet}
</urlset>`;
}
