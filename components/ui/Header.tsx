'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  const [theme, setTheme] = useState<'theme-light' | 'theme-dark'>('theme-light');

  useEffect(() => {
    const savedTheme = (window.localStorage.getItem('mind-care-theme') as 'theme-light' | 'theme-dark') || 'theme-light';
    setTheme(savedTheme);
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
    setTheme(nextTheme);
    window.localStorage.setItem('mind-care-theme', nextTheme);
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(nextTheme);
  };

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

          <button
            type="button"
            className="theme-switcher-button"
            onClick={toggleTheme}
            aria-label={theme === 'theme-light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'theme-light' ? '🌙' : '☀️'}
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
