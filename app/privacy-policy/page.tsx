'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 text-lg text-slate-600">
          This Privacy Policy explains how Mind Care Counseling collects, uses, and protects your personal information.
        </p>
      </header>

      <section className="mt-12 space-y-8 max-w-3xl">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Information We Collect</h2>
          <p className="mt-4 text-slate-600">
            We collect information you provide directly to us, such as when you submit a contact form, sign up for an appointment, or communicate with us by email. This may include your name, email address, phone number, and any other information you choose to share.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Cookies &amp; Tracking</h2>
          <p className="mt-4 text-slate-600">
            We use cookies and similar tracking technologies to improve your experience and understand how our site is used. Cookies are small data files stored on your device. You can manage or disable cookies in your browser settings, but some features of the site may not work as intended if you do.
          </p>
          <p className="mt-4 text-slate-600">
            We may use analytics tools to collect information about website usage, such as pages visited, time spent on the site, and referral sources. This data is aggregated and does not include personally identifiable information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Ads &amp; Third-Party Services</h2>
          <p className="mt-4 text-slate-600">
            Our website may display advertising through third-party services (such as Google AdSense). These providers may use cookies or similar technologies to deliver ads based on your browsing activity. We do not have access to or control over the tracking technologies used by these providers.
          </p>
          <p className="mt-4 text-slate-600">
            For information about how Google uses data when you use our site, please visit <a href="https://policies.google.com/technologies/ads" className="font-medium text-indigo-600 hover:underline" target="_blank" rel="noreferrer">Google’s Advertising Policies</a>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">How We Use Your Information</h2>
          <p className="mt-4 text-slate-600">
            We use the information we collect to respond to your inquiries, schedule appointments, and improve our website and services. We do not sell your personal information to third parties.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Contact Us</h2>
          <p className="mt-4 text-slate-600">
            If you have questions about this policy or wish to request changes to your personal information, please <Link href="/contact" className="font-medium text-indigo-600 hover:underline">contact us</Link>.
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Last updated: March 14, 2026
          </p>
        </div>
      </section>
    </main>
  );
}
