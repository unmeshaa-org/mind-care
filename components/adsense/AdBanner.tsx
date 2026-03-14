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

export default function AdBanner({ slot = 'YOUR_SLOT_ID', className }: Props) {
  if (!isAdSenseEnabled() || slot === 'YOUR_SLOT_ID') return null;

  return (
    <div className={className}>
      <AdSenseLoader />

      {/*
        Replace the data-ad-slot value with your own ad unit slot ID.
        This is a placeholder ad unit for a responsive banner.
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  );
}
