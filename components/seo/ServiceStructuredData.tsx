import React from 'react';

type Props = {
  baseUrl: string;
};

export default function ServiceStructuredData({ baseUrl }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Mind Care Counseling',
    description:
      'Mind Care Counseling provides licensed psychology counseling services covering stress, anxiety, relationship support, mindfulness, and emotional resilience.',
    url: baseUrl,
    telephone: '+91-XXXXXXXXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '4110XX',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '18.5204',
        longitude: '73.8567',
      },
      geoRadius: 120000,
    },
    serviceType: ['Individual therapy', 'Stress management', 'Mindfulness coaching'],
    sameAs: [
      'https://www.facebook.com/yourpage',
      'https://www.instagram.com/yourpage',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Therapy Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Individual Therapy',
          itemListElement: [{ '@type': 'Offer', 'itemOffered': 'Individual therapy session' }],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Stress & Anxiety Management',
          itemListElement: [{ '@type': 'Offer', 'itemOffered': 'Stress management program' }],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Mindfulness Coaching',
          itemListElement: [{ '@type': 'Offer', 'itemOffered': 'Mindfulness support package' }],
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
