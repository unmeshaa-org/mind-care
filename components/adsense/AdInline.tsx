'use client';

import AdSenseLoader, { isAdSenseEnabled } from './AdSenseLoader';

type Props = {
  /**
   * The AdSense slot ID (e.g. 1234567890).
   * Replace this with your own slot ID.
   */
  slot?: string;
  className?: string;
};

export default function AdInline({ slot = 'YOUR_SLOT_ID', className }: Props) {
  if (!isAdSenseEnabled() || slot === 'YOUR_SLOT_ID') return null;

  return (
    <div className={className}>
      <AdSenseLoader />

      {/*
        Inline ads are typically used inside article content.
        Update the slot value with your own AdSense ad unit ID.
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="fluid"
        data-ad-layout="in-article"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}
