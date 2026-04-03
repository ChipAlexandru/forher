import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function Header() {
  const { t, lang, setLang } = useLang();
  const langs = ['de', 'fr', 'en'];
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/how-it-works', label: t.nav.howItWorks },
    { to: '/symptoms', label: t.nav.symptoms },
    { to: '/treatments', label: t.nav.treatments },
    { to: '/pricing', label: t.nav.pricing },
    { to: '/employers', label: t.nav.employers },
    { to: '/blog', label: t.nav.blog },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sage/20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl lg:text-3xl font-bold text-forest tracking-tight no-underline">
            Equilibra
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-normal tracking-wide no-underline transition-colors duration-150
                  ${isActive(link.to) ? 'text-forest font-medium' : 'text-charcoal-light hover:text-forest'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-0 text-xs font-medium tracking-widest">
              {langs.map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="mx-1 text-sage">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={`bg-transparent border-0 cursor-pointer text-xs font-medium tracking-widest transition-colors duration-150 ${
                      lang === l ? 'text-forest font-medium' : 'text-charcoal-light hover:text-forest'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
            <Link
              to="/assessment"
              className="inline-block px-5 py-2.5 bg-forest text-cream text-sm font-medium tracking-wide no-underline rounded-[2px] hover:bg-sage-dark transition-colors duration-150"
            >
              {t.nav.startAssessment}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setLang(langs[(langs.indexOf(lang) + 1) % langs.length])}
              className="text-xs font-medium tracking-widest text-charcoal-light cursor-pointer bg-transparent border-0"
            >
              {langs[(langs.indexOf(lang) + 1) % langs.length].toUpperCase()}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-charcoal cursor-pointer bg-transparent border-0"
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-sage/20 bg-cream">
          <nav className="px-5 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`text-base no-underline py-1 ${isActive(link.to) ? 'text-forest font-medium' : 'text-charcoal'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/assessment"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-block text-center px-5 py-3 bg-forest text-cream text-sm font-medium tracking-wide no-underline rounded-[2px]"
            >
              {t.nav.startAssessment}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
