import { NextResponse } from 'next/server';
import { buildSitemapXml, getSitemapEntries } from '../../lib/sitemap';

export async function GET() {
  const entries = getSitemapEntries();
  const xml = buildSitemapXml(entries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
