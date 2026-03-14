'use client';

import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-slate-900">Disclaimer</h1>
        <p className="mt-4 text-lg text-slate-600">
          The information provided on Mind Care Counseling is for general informational purposes only.
        </p>
      </header>

      <section className="mt-12 space-y-8 max-w-3xl">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">No Professional Advice</h2>
          <p className="mt-4 text-slate-600">
            The content on this site is not intended as professional medical, mental health, or legal advice. Always consult a qualified professional for personalized support.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Third-Party Links and Ads</h2>
          <p className="mt-4 text-slate-600">
            This website may contain links to third-party sites and display advertisements. We do not endorse or guarantee the accuracy of third-party content.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Cookies, Analytics &amp; Data Usage</h2>
          <p className="mt-4 text-slate-600">
            We use cookies and analytics tools to improve the user experience and understand how the site is used. This may include tracking site visits, page views, and ad performance. See our <Link href="/privacy-policy" className="font-medium text-indigo-600 hover:underline">Privacy Policy</Link> for more details.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Limitation of Liability</h2>
          <p className="mt-4 text-slate-600">
            Mind Care Counseling is not responsible for any damages resulting from your use of the site or reliance on the information provided.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-4 text-slate-600">
            If you have questions about this disclaimer, please <Link href="/contact" className="font-medium text-indigo-600 hover:underline">contact us</Link>.
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Last updated: March 14, 2026</p>
        </div>
      </section>
    </main>
  );
}
