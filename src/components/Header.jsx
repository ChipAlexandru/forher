import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const anchorLinks = (t) => [
  { href: '#how-it-works', label: t.nav.howItWorks },
  { href: '#symptoms', label: t.nav.symptoms },
  { href: '#treatments', label: t.nav.treatments },
  { href: '#pricing', label: t.nav.pricing },
];

const routeLinks = (t) => [
  { to: '/employers', label: t.nav.employers },
  { to: '/blog', label: t.nav.blog },
];

export default function Header({ onQuizOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLang();
  const location = useLocation();
  const langs = ['de', 'fr', 'en'];

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function renderAnchorLink(link, className, onClick) {
    const href = isHome ? link.href : `/${link.href}`;
    return (
      <a key={link.href} href={href} className={className} onClick={onClick}>
        {link.label}
      </a>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border/50 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center font-serif text-2xl tracking-tight no-underline">
            <span className="text-forest">Equi</span>
            <span className="font-bold text-sage">libra</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {anchorLinks(t).map((link) =>
              renderAnchorLink(
                link,
                'text-sm font-sans text-stone no-underline hover:text-forest transition-colors'
              )
            )}
            {routeLinks(t).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-sans text-stone no-underline hover:text-forest transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right: Lang Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-xs font-sans tracking-wide">
              {langs.map((l, i) => (
                <span key={l} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-border">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={`bg-transparent border-0 cursor-pointer uppercase text-xs tracking-wide transition-colors ${
                      lang === l
                        ? 'text-forest font-medium'
                        : 'text-stone hover:text-forest'
                    }`}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>

            <button
              onClick={onQuizOpen}
              className="bg-forest text-cream text-sm font-sans font-medium uppercase tracking-wider px-5 py-2.5 rounded-[2px] hover:bg-forest-mid transition-colors cursor-pointer border-0"
            >
              {t.nav.startAssessment}
            </button>
          </div>

          {/* Mobile: Lang Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-sans">
              {langs.map((l, i) => (
                <span key={l} className="flex items-center gap-1">
                  {i > 0 && <span className="text-border">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={`bg-transparent border-0 cursor-pointer uppercase text-xs transition-colors ${
                      lang === l
                        ? 'text-forest font-medium'
                        : 'text-stone hover:text-forest'
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
          <nav className="relative bg-cream border-t border-border/50 px-6 py-8 flex flex-col gap-1 shadow-lg">
            {anchorLinks(t).map((link) =>
              renderAnchorLink(
                link,
                'block py-3 text-base font-sans text-stone no-underline hover:text-forest transition-colors border-b border-border/30',
                () => setMenuOpen(false)
              )
            )}
            {routeLinks(t).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-3 text-base font-sans text-stone no-underline hover:text-forest transition-colors border-b border-border/30"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setMenuOpen(false);
                onQuizOpen?.();
              }}
              className="mt-6 w-full bg-forest text-cream text-sm font-sans font-medium uppercase tracking-wider px-5 py-3 rounded-[2px] hover:bg-forest-mid transition-colors cursor-pointer border-0"
            >
              {t.nav.startAssessment}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
