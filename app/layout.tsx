import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from "react";

import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import AdSensePlaceholder from '../components/adsense/AdSensePlaceholder';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Mind Care Counseling',
  description: 'Personalized psychology counseling and mental wellness support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="site-root">
      <body className="site-body">
        <Header />
        <main className="site-main">
            <Suspense fallback={null}>
                {children}
            </Suspense>
        </main>
        <Footer />
        <AdSensePlaceholder />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
