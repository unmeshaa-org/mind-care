import Script from 'next/script';

export default function AdSensePlaceholder() {
  return (
    <>
      {/*
        Replace the placeholders below with your own AdSense client & slot IDs.

        Example:
        <Script
          id="adsense"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "ca-pub-XXXXXXXXXXXXXXXX",
                enable_page_level_ads: true
              });
            `,
          }}
        />
      */}
      <Script
        id="adsense-placeholder"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // TODO: Add Google AdSense initialization script here
          `,
        }}
      />
    </>
  );
}
