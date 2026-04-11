import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { lang, t } = useLang()

  const contactLabel = lang === 'fr' ? 'Contact' : lang === 'en' ? 'Contact' : 'Kontakt'

  return (
    <footer className="bg-forest text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <p className="font-serif text-2xl font-bold text-cream">
                <span className="text-cream">Equi</span>
                <span className="text-sage font-bold">vie</span>
                <span className="text-cream font-sans font-medium uppercase text-[0.55em] tracking-widest ml-1.5">med</span>
              </p>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-cream/60 font-light max-w-md">
              {t.footer?.tagline}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-cream/40">
              <span>Swiss-regulated</span>
              <span className="w-1 h-1 rounded-full bg-sage" />
              <span>nDSG compliant</span>
              <span className="w-1 h-1 rounded-full bg-sage" />
              <span>HIN e-prescription</span>
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-4 font-sans">
              {contactLabel}
            </h4>
            <p className="font-sans text-cream/70 text-sm">contact@equivie.ch</p>
            <p className="font-sans text-cream/40 text-xs leading-relaxed mt-3">
              {t.footer?.regulatory}
            </p>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-4 font-sans">
              {lang === 'fr' ? 'Juridique' : lang === 'en' ? 'Legal' : 'Rechtliches'}
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/impressum" className="text-sm text-cream/70 hover:text-cream transition-colors">
                {t.footer?.links?.imprint || 'Impressum'}
              </Link>
              <Link to="/datenschutz" className="text-sm text-cream/70 hover:text-cream transition-colors">
                {t.footer?.links?.privacy || 'Datenschutz'}
              </Link>
              <Link to="/agb" className="text-sm text-cream/70 hover:text-cream transition-colors">
                {t.footer?.links?.terms || 'AGB'}
              </Link>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          {t.footer?.legal && (
            <p className="text-cream/40 text-xs leading-relaxed max-w-2xl mb-4">
              {t.footer.legal}
            </p>
          )}
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} Equivie MED. {lang === 'fr' ? 'Tous droits réservés.' : lang === 'en' ? 'All rights reserved.' : 'Alle Rechte vorbehalten.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
