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

export default function AdSidebar({ slot = 'YOUR_SLOT_ID', className }: Props) {
  if (!isAdSenseEnabled() || slot === 'YOUR_SLOT_ID') return null;

  return (
    <aside className={className}>
      <AdSenseLoader />

      {/*
        Sidebar ad unit (typically 300x250 or similar).
        Update the ad slot to match your AdSense settings.
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '250px' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </aside>
  );
}
