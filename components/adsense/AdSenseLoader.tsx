'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function isAdSenseEnabled() {
  return Boolean(CLIENT_ID);
}

export default function AdSenseLoader() {
  useEffect(() => {
    if (!CLIENT_ID) return;

    // Ensure the adsbygoogle array exists when the script is loaded.
    // This is what AdSense expects to initialize ad units.
    // https://support.google.com/adsense/answer/9274634
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
  }, []);

  if (!CLIENT_ID) return null;

  return (
    <>
      {/*
        Replace the placeholder below with your AdSense client ID.
        Example: ca-pub-1234567890123456

        This script loads the AdSense runtime which is required to render ad slots.
      */}
      <Script
        id="adsense-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${CLIENT_ID}",
              enable_page_level_ads: true
            });
          `,
        }}
      />
    </>
  );
}
