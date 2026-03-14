'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

function sendPageview(url: string) {
  if (!window.gtag) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;
    if (process.env.NODE_ENV !== 'production') return;

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    sendPageview(url);
  }, [pathname, searchParams]);

  if (!GA_TRACKING_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });`}
      </Script>
    </>
  );
}
