import { NextResponse } from 'next/server';
import { getSiteUrl } from '../../lib/seo';

export async function GET() {
  const siteUrl = getSiteUrl().replace(/\/$/, '');
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  const content = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
