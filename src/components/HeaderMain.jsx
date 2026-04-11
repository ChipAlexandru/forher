import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const navLabels = {
  de: { howItWorks: 'So funktioniert es', pricing: 'Preise', blog: 'Blog', bookNow: 'Termin buchen' },
  fr: { howItWorks: 'Comment ça marche', pricing: 'Tarifs', blog: 'Blog', bookNow: 'Réserver' },
  en: { howItWorks: 'How it works', pricing: 'Pricing', blog: 'Blog', bookNow: 'Book now' },
};

const langs = ['de', 'fr', 'en'];

export default function HeaderMain({ onBookClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const nav = navLabels[lang] || navLabels.en;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Anchor links point to sections on home page
  const anchorHref = (hash) => isHome ? hash : `/${hash}`;

  return (
    <header
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border/50 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl tracking-tight no-underline">
            <span className="text-forest">Equi</span>
            <span className="font-bold text-sage">vie</span>
            <span className="text-forest font-sans font-medium uppercase text-[0.55em] tracking-widest ml-1.5">med</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" role="navigation" aria-label="Main navigation">
            <a href={anchorHref('#how-it-works')} className="text-sm font-sans text-stone no-underline hover:text-forest transition-colors">
              {nav.howItWorks}
            </a>
            <a href={anchorHref('#pricing')} className="text-sm font-sans text-stone no-underline hover:text-forest transition-colors">
              {nav.pricing}
            </a>
            <Link to="/blog" className="text-sm font-sans text-stone no-underline hover:text-forest transition-colors">
              {nav.blog}
            </Link>
          </nav>

          {/* Desktop Right: Lang Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-xs font-sans tracking-wide" role="group" aria-label="Language selection">
              {langs.map((l, i) => (
                <span key={l} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-border">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    aria-label={`Switch language to ${l.toUpperCase()}`}
                    aria-pressed={lang === l}
                    className={`bg-transparent border-0 cursor-pointer uppercase text-xs tracking-wide transition-colors ${
                      lang === l ? 'text-forest font-medium' : 'text-stone hover:text-forest'
                    }`}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>
            {onBookClick ? (
              <button
                onClick={onBookClick}
                className="bg-forest text-cream font-sans font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-[2px] hover:bg-forest-mid transition-colors border-0 cursor-pointer"
              >
                {nav.bookNow}
              </button>
            ) : (
              <a
                href={anchorHref('#pricing')}
                className="bg-forest text-cream font-sans font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-[2px] hover:bg-forest-mid transition-colors no-underline"
              >
                {nav.bookNow}
              </a>
            )}
          </div>

          {/* Mobile: Lang Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-sans" role="group" aria-label="Language selection">
              {langs.map((l, i) => (
                <span key={l} className="flex items-center gap-1">
                  {i > 0 && <span className="text-border">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    aria-label={`Switch language to ${l.toUpperCase()}`}
                    aria-pressed={lang === l}
                    className={`bg-transparent border-0 cursor-pointer uppercase text-xs transition-colors ${
                      lang === l ? 'text-forest font-medium' : 'text-stone hover:text-forest'
                    }`}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-charcoal bg-transparent border-0 cursor-pointer"
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

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          <div className="absolute inset-0 bg-charcoal/20" onClick={() => setMenuOpen(false)} />
          <nav className="relative bg-cream border-t border-border/50 px-6 py-8 flex flex-col gap-1 shadow-lg" role="navigation" aria-label="Mobile navigation">
            <a href={anchorHref('#how-it-works')} onClick={() => setMenuOpen(false)} className="block py-3 text-base font-sans text-stone no-underline hover:text-forest transition-colors border-b border-border/30">
              {nav.howItWorks}
            </a>
            <a href={anchorHref('#pricing')} onClick={() => setMenuOpen(false)} className="block py-3 text-base font-sans text-stone no-underline hover:text-forest transition-colors border-b border-border/30">
              {nav.pricing}
            </a>
            <Link to="/blog" onClick={() => setMenuOpen(false)} className="block py-3 text-base font-sans text-stone no-underline hover:text-forest transition-colors border-b border-border/30">
              {nav.blog}
            </Link>
            {onBookClick ? (
              <button
                onClick={() => { setMenuOpen(false); onBookClick(); }}
                className="mt-6 block w-full bg-forest text-cream text-sm font-sans font-medium uppercase tracking-wider px-5 py-3 rounded-[2px] hover:bg-forest-mid transition-colors border-0 cursor-pointer text-center"
              >
                {nav.bookNow}
              </button>
            ) : (
              <a
                href={anchorHref('#pricing')}
                onClick={() => setMenuOpen(false)}
                className="mt-6 block w-full bg-forest text-cream text-sm font-sans font-medium uppercase tracking-wider px-5 py-3 rounded-[2px] hover:bg-forest-mid transition-colors no-underline text-center"
              >
                {nav.bookNow}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
