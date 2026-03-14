'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold text-slate-900">Terms and Conditions</h1>
        <p className="mt-4 text-lg text-slate-600">
          These Terms and Conditions govern your use of the Mind Care Counseling website.
        </p>
      </header>

      <section className="mt-12 space-y-8 max-w-3xl">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Acceptance of Terms</h2>
          <p className="mt-4 text-slate-600">
            By accessing or using this website, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use the site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Use of the Website</h2>
          <p className="mt-4 text-slate-600">
            You may use this website for lawful purposes only. You agree not to use the site in any way that violates applicable laws or infringes on the rights of others.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Content and Intellectual Property</h2>
          <p className="mt-4 text-slate-600">
            All content on this website, including text, graphics, images, and logos, is the property of Mind Care Counseling or its licensors. You may not reproduce, distribute, or create derivative works without permission.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Disclaimer of Warranties</h2>
          <p className="mt-4 text-slate-600">
            The website is provided on an "as is" and "as available" basis. Mind Care Counseling makes no warranties, express or implied, regarding the operation or availability of the website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Limitation of Liability</h2>
          <p className="mt-4 text-slate-600">
            To the maximum extent permitted by law, Mind Care Counseling is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Changes to These Terms</h2>
          <p className="mt-4 text-slate-600">
            We may update these terms at any time. Continued use of the site after changes constitute acceptance of the updated terms. The date at the bottom of this page indicates when the terms were last updated.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-4 text-slate-600">
            If you have questions about these terms, please <Link href="/contact" className="font-medium text-indigo-600 hover:underline">contact us</Link>.
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Last updated: March 14, 2026</p>
        </div>
      </section>
    </main>
  );
}
