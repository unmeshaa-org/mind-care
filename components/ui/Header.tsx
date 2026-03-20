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

const themeOptions = [
  { value: 'theme-light', label: 'Light' },
  { value: 'theme-calm', label: 'Calm' },
  { value: 'theme-dark', label: 'Dark' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('theme-light');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('mind-care-theme') || 'theme-light';
    setTheme(savedTheme);
    document.documentElement.classList.remove('theme-light', 'theme-calm', 'theme-dark');
    document.documentElement.classList.add(savedTheme);
  }, []);

  const updateTheme = (nextTheme: string) => {
    setTheme(nextTheme);
    window.localStorage.setItem('mind-care-theme', nextTheme);
    document.documentElement.classList.remove('theme-light', 'theme-calm', 'theme-dark');
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

          <div className="theme-switcher">
            <label className="theme-switcher__label" htmlFor="theme-select">
              <span className="theme-switcher__hint">Theme</span>
              <select
                id="theme-select"
                className="theme-switcher__select"
                value={theme}
                onChange={(event) => updateTheme(event.target.value)}
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

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
