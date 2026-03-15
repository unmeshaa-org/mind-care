import type { Metadata } from 'next'

export function generateSEO({
  title,
  description,
  url,
  type = 'website',
  publishedTime
}: {
  title: string
  description: string
  url: string
  type?: 'website' | 'article'
  publishedTime?: string
}): Metadata {

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type
    }
  }

  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      publishedTime
    }
  }

  return metadata
}