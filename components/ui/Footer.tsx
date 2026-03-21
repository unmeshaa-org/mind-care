import Link from 'next/link';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/sitemap.xml', label: 'Sitemap' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-700">
      <div className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-3 lg:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-slate-900">Mind Care Counseling</h3>
          <p className="max-w-xs text-sm leading-relaxed text-slate-600">
            Professional counseling services in Pune to help you reduce stress, build self-awareness, and create lasting growth.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900">Navigation</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {footerLinks.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-indigo-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900">Resources</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {footerLinks.slice(4).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-indigo-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900">Contact</h4>
          <address className="mt-4 not-italic text-sm leading-relaxed text-slate-600">
            123 Pune Wellness Street
            <br />
            Pune, MH 411001
            <br />
            <a href="tel:+912022222222" className="block transition-colors hover:text-indigo-600">
              +91 20 2222 2222
            </a>
            <a href="mailto:info@mindcare.com" className="block transition-colors hover:text-indigo-600">
              info@mindcare.com
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-100 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Mind Care Counseling. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
