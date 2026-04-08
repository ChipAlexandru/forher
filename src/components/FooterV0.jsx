import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-forest text-cream/80">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/0" className="font-serif text-2xl font-bold text-cream no-underline">
              Equivie
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-cream/60 font-light max-w-md">
              {t.footer?.tagline || 'Hormones in balance. Life in full.'}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-cream/40">
              <span>Swiss-regulated</span>
              <span className="w-1 h-1 rounded-full bg-sage" />
              <span>nDSG compliant</span>
              <span className="w-1 h-1 rounded-full bg-sage" />
              <span>HIN e-prescription</span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-4 font-sans">Navigation</h4>
            <nav className="flex flex-col gap-2.5">
              <Link to="/0/how-it-works" className="text-sm text-cream/70 no-underline hover:text-cream transition-colors duration-150">{t.nav.howItWorks}</Link>
              <Link to="/0/symptoms" className="text-sm text-cream/70 no-underline hover:text-cream transition-colors duration-150">{t.nav.symptoms}</Link>
              <Link to="/0/treatments" className="text-sm text-cream/70 no-underline hover:text-cream transition-colors duration-150">{t.nav.treatments}</Link>
              <Link to="/0/pricing" className="text-sm text-cream/70 no-underline hover:text-cream transition-colors duration-150">{t.nav.pricing}</Link>
              <Link to="/0/employers" className="text-sm text-cream/70 no-underline hover:text-cream transition-colors duration-150">{t.nav.employers}</Link>
              <Link to="/0/blog" className="text-sm text-cream/70 no-underline hover:text-cream transition-colors duration-150">{t.nav.blog}</Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-4 font-sans">Legal</h4>
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-cream/70">Impressum</span>
              <span className="text-sm text-cream/70">Datenschutz</span>
              <span className="text-sm text-cream/70">AGB</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <p className="text-xs leading-relaxed text-cream/40 max-w-4xl">
            {t.footer?.legal || 'Equivie AG, Zürich, Schweiz. Medizinische Leistungen werden von Partnerärztinnen mit FMH-Zulassung und kantonaler Berufsausübungsbewilligung erbracht. Equivie AG ist kein Heilmittelhersteller und kein Leistungserbringer im Sinne des KVG. Diese Website stellt keine medizinische Beratung dar.'}
          </p>
          <p className="mt-3 text-xs text-cream/30">
            &copy; {new Date().getFullYear()} Equivie AG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
