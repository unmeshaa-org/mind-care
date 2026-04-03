import React from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import AdSensePlaceholder from '../components/adsense/AdSensePlaceholder';
import GoogleAnalytics from '../components/analytics/GoogleAnalytics';
import StyleProbe from '../components/debug/StyleProbe';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

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
    <html lang="en" className={`site-root ${dmSans.variable} ${cormorant.variable}`}>
      <body className="site-body">
        <StyleProbe />
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
        <a href="/appointments" className="sticky-booking-btn" aria-label="Book an appointment">
          Book a session
        </a>
        <AdSensePlaceholder />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
