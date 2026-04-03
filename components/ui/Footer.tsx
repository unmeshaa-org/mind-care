import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/sitemap.xml', label: 'Sitemap' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__brand-title">Mind Care Counseling</p>
          <p className="site-footer__tagline">
            Compassionate, evidence-informed support for stress, anxiety, and personal growth — in person
            and online.
          </p>
        </div>

        <div>
          <p className="site-footer__col-title">Quick links</p>
          <ul className="site-footer__list">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="site-footer__col-title">Legal</p>
          <ul className="site-footer__list">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="site-footer__col-title">Visit & hours</p>
          <p className="site-footer__hours">Mon – Sat · 9:00 AM – 7:00 PM</p>
          <address className="site-footer__address mt-4">
            123 Pune Wellness Street
            <br />
            Pune, Maharashtra 411001
            <br />
            <a href="tel:+912022222222" className="mt-2 inline-block">
              +91 20 2222 2222
            </a>
            <br />
            <a href="mailto:info@mindcare.com">info@mindcare.com</a>
          </address>
        </div>
      </div>

      <div className="site-footer__bottom">
        © {new Date().getFullYear()} Mind Care Counseling. All rights reserved.
      </div>
    </footer>
  );
}
