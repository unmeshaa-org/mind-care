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
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-logo__mark" aria-hidden="true">
            🧠
          </span>
          <span className="site-footer__brand-text">Mind Care Counseling</span>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul className="site-footer__list">
            {footerLinks.map((link) => (
              <li key={link.href} className="site-footer__item">
                <Link href={link.href} className="site-footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__copyright">
          © {new Date().getFullYear()} Mind Care Counseling. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
