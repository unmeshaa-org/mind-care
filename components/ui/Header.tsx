'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo">
          <span className="site-logo__mark" aria-hidden="true">
            🧠
          </span>
          <span className="site-logo__text">Mind Care</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <button
            type="button"
            className="site-nav__toggle"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="site-nav__toggle-icon" />
          </button>

          <ul className={`site-nav__list ${open ? 'site-nav__list--open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href} className="site-nav__item">
                <Link href={link.href} className="site-nav__link" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
