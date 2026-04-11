import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const footerText = {
  de: {
    tagline: 'Telemedizin aus Zürich. Medizinische Begleitung für die Wechseljahre — diskret, kompetent, digital.',
    noticeTitle: 'Wichtiger Hinweis',
    notice: 'Equivie MED bietet keine medizinische Beratung, Diagnose oder Behandlung an. Unsere Plattform verbindet Sie mit zertifizierten Gesundheitsfachpersonen — darunter FMH-lizenzierte Ärztinnen und zertifizierte Naturheilpraktikerinnen —, die Ihre individuelle Situation beurteilen und eine persönliche Betreuung anbieten. Konsultieren Sie immer eine qualifizierte Fachperson, bevor Sie gesundheitliche Entscheidungen treffen.',
    legalTitle: 'Rechtliches',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    terms: 'AGB',
    disclaimer: 'Equivie MED ist eine Telemedizinplattform, die unter Schweizer Bundesrecht operiert, einschliesslich des Bundesgesetzes über den Datenschutz (nDSG). Alle persönlichen und gesundheitsbezogenen Daten werden in der Schweiz verarbeitet und gespeichert.',
  },
  fr: {
    tagline: 'Télémédecine depuis Zurich. Accompagnement médical pour la ménopause — discret, compétent, numérique.',
    noticeTitle: 'Avis important',
    notice: 'Equivie MED ne fournit pas de conseils médicaux, de diagnostic ni de traitement. Notre plateforme vous met en relation avec des professionnels de santé certifiés — dont des médecins agréés FMH et des naturopathes certifiés — qui évaluent votre situation individuelle et vous offrent des soins personnalisés. Consultez toujours un professionnel qualifié avant de prendre des décisions concernant votre santé.',
    legalTitle: 'Juridique',
    imprint: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d\'utilisation',
    disclaimer: 'Equivie MED est une plateforme de télémédecine opérant sous le droit fédéral suisse, y compris la loi fédérale sur la protection des données (nLPD). Toutes les données personnelles et de santé sont traitées et stockées en Suisse.',
  },
  en: {
    tagline: 'Telehealth from Zurich. Medical support for menopause — discreet, expert, digital.',
    noticeTitle: 'Important notice',
    notice: 'Equivie MED does not provide medical advice, diagnosis, or treatment. Our platform connects you with certified healthcare professionals — including FMH-licensed physicians and certified naturopaths — who assess your individual situation and provide personalised care. Always consult a qualified professional before making health decisions.',
    legalTitle: 'Legal',
    imprint: 'Legal notice',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    disclaimer: 'Equivie MED is a telemedicine platform operating under Swiss federal law, including the Federal Act on Data Protection (nDSG). All personal and health data is processed and stored in Switzerland.',
  },
}

export default function Footer() {
  const { lang } = useLang()
  const f = footerText[lang] || footerText.de

  return (
    <footer className="bg-forest text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* Brand */}
        <Link to="/" className="inline-block">
          <p className="font-serif text-2xl font-bold text-cream">
            <span className="text-cream">Equi</span>
            <span className="text-sage font-bold">vie</span>
            <span className="text-cream font-sans font-medium uppercase text-[0.55em] tracking-widest ml-1.5">med</span>
          </p>
        </Link>
        <p className="mt-3 text-sm leading-relaxed text-cream/60 font-light max-w-xl">
          {f.tagline}
        </p>

        {/* Important notice */}
        <div className="mt-10">
          <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-3 font-sans">
            {f.noticeTitle}
          </h4>
          <p className="text-xs leading-relaxed text-cream/40 max-w-3xl">
            {f.notice}
          </p>
        </div>

        {/* Legal links */}
        <div className="mt-10">
          <h4 className="text-xs font-medium tracking-widest uppercase text-cream/40 mb-3 font-sans">
            {f.legalTitle}
          </h4>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/impressum" className="text-cream/70 hover:text-cream transition-colors">{f.imprint}</Link>
            <span className="text-cream/30">&middot;</span>
            <Link to="/datenschutz" className="text-cream/70 hover:text-cream transition-colors">{f.privacy}</Link>
            <span className="text-cream/30">&middot;</span>
            <Link to="/agb" className="text-cream/70 hover:text-cream transition-colors">{f.terms}</Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-cream/10">
          <p className="text-xs leading-relaxed text-cream/30 max-w-3xl">
            {f.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
