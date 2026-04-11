import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  const navLinks = [
    { label: 'So funktioniert es', href: '#how-it-works' },
    { label: 'Symptome', href: '#symptoms' },
    { label: 'Behandlungen', href: '#treatments' },
    { label: 'Preise', href: '#pricing' },
  ]

  const weitereLinks = [
    { label: 'Arbeitgeber', to: '/employers' },
    { label: 'Wissen', to: '/wissen' },
    { label: 'Kontakt', href: '#kontakt' },
  ]

  const legalLinks = [
    { label: 'Datenschutz', to: '/datenschutz' },
    { label: 'Impressum', to: '/impressum' },
    { label: 'AGB', to: '/agb' },
    { label: 'Cookie-Einstellungen', href: '#cookies' },
  ]

  const badges = ['Swissmedic', 'FMH', 'nDSG', 'HIN']

  return (
    <footer className="bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl">
                <span className="text-cream">Equi</span>
                <span className="text-sage font-bold">vie</span>
              </span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              {t.footer?.tagline}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="uppercase tracking-widest text-xs font-medium text-cream/40 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/60 hover:text-cream transition text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Weitere column */}
          <div>
            <h4 className="uppercase tracking-widest text-xs font-medium text-cream/40 mb-5">
              Weitere
            </h4>
            <ul className="space-y-3">
              {weitereLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-cream/60 hover:text-cream transition text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-cream/60 hover:text-cream transition text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches column */}
          <div>
            <h4 className="uppercase tracking-widest text-xs font-medium text-cream/40 mb-5">
              Rechtliches
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-cream/60 hover:text-cream transition text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-cream/60 hover:text-cream transition text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 mt-14 pt-8">
          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {badges.map((badge, i) => (
              <div key={badge} className="flex items-center gap-3">
                <span className="border border-cream/20 rounded-full px-3 py-1 text-xs text-cream/50 font-medium tracking-wide">
                  {badge}
                </span>
                {i < badges.length - 1 && (
                  <span className="text-cream/20 hidden sm:inline">&middot;</span>
                )}
              </div>
            ))}
          </div>

          {/* Legal text */}
          {t.footer?.legal && (
            <p className="text-cream/40 text-xs text-center leading-relaxed max-w-2xl mx-auto mb-6">
              {t.footer.legal}
            </p>
          )}

          {/* Copyright */}
          <p className="text-cream/40 text-xs text-center">
            {t.footer?.copyright || `\u00A9 ${new Date().getFullYear()} Equivie. Alle Rechte vorbehalten.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
