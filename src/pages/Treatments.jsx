import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';

const IconInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-0.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="8" strokeWidth="2.5" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);

const IconArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Treatments() {
  const { t } = useLang();
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef}>

      {/* DISCLAIMER BANNER */}
      <div className="fade-in-section bg-blush/30 border-b border-blush">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-start gap-3 text-charcoal-light">
            <span className="text-forest/60 mt-0.5">
              <IconInfo />
            </span>
            <p className="font-sans text-sm leading-relaxed">
              {t.treatments.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* PAGE HEADER */}
      <section className="fade-in-section bg-cream border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
            Behandlungen
          </p>
          <h1 className="font-serif font-bold text-forest text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl">
            {t.treatments.title}
          </h1>
        </div>
      </section>

      {/* TREATMENT CATEGORY CARDS */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {t.treatments.categories.map((category, i) => (
              <div
                key={i}
                className="bg-white border border-sage/20 rounded-[2px] p-8 flex flex-col hover:border-sage/50 hover:shadow-sm transition-all duration-200"
              >
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-sage/15">
                  <h2 className="font-serif font-bold text-forest text-2xl md:text-3xl leading-snug">
                    {category.name}
                  </h2>
                </div>

                {/* Description */}
                <p className="font-sans text-charcoal text-base leading-relaxed mb-8">
                  {category.description}
                </p>

                {/* Für wen */}
                <div className="mb-6">
                  <p className="font-sans text-xs uppercase tracking-widest text-sage mb-2">
                    Für wen
                  </p>
                  <p className="font-sans text-charcoal-light text-sm leading-relaxed">
                    {category.forWhom}
                  </p>
                </div>

                {/* Formen */}
                <div className="mb-8">
                  <p className="font-sans text-xs uppercase tracking-widest text-sage mb-3">
                    Formen
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.forms.map((form, j) => (
                      <span
                        key={j}
                        className="bg-cream-dark text-charcoal font-sans text-xs px-3 py-1 rounded-[2px] border border-sage/15"
                      >
                        {form}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cost — pushed to bottom */}
                <div className="mt-auto pt-6 border-t border-sage/15 flex items-center justify-between">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-sage/70 mb-1">
                      Kosten
                    </p>
                    <p className="font-sans font-medium text-sage text-sm leading-snug">
                      {category.cost}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLEMENTARY INFORMATION */}
      <section className="fade-in-section bg-cream-dark border-y border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
                Evidenzbasiert
              </p>
              <h3 className="font-serif font-semibold text-forest text-xl mb-3 leading-snug">
                Leitliniengerechte Therapie
              </h3>
              <p className="font-sans text-charcoal-light text-sm leading-relaxed">
                Alle Behandlungsentscheidungen basieren auf den aktuellen Leitlinien der Schweizerischen Gesellschaft für Gynäkologie und Geburtshilfe (SGGG) sowie internationalen Konsensuspapieren zur Menopausenmedizin.
              </p>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
                Individuell
              </p>
              <h3 className="font-serif font-semibold text-forest text-xl mb-3 leading-snug">
                Kein Einheitsrezept
              </h3>
              <p className="font-sans text-charcoal-light text-sm leading-relaxed">
                Keine zwei Frauen erleben die Menopause gleich. Unsere Ärztinnen erarbeiten mit Ihnen einen personalisierten Plan, der Ihre Symptome, Lebensgewohnheiten, Risikostruktur und Präferenzen berücksichtigt.
              </p>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
                Kontinuität
              </p>
              <h3 className="font-serif font-semibold text-forest text-xl mb-3 leading-snug">
                Begleitung über die Zeit
              </h3>
              <p className="font-sans text-charcoal-light text-sm leading-relaxed">
                Menopausale Behandlung ist kein einmaliger Akt, sondern ein fortlaufender Prozess. Wir begleiten Sie bei Dosisanpassungen, Nebenwirkungsfragen und dem langfristigen Management Ihrer Gesundheit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-6 leading-snug">
              Erfahren Sie, welche Behandlung für Sie in Frage kommt.
            </h2>
            <p className="font-sans text-charcoal-light text-lg leading-relaxed mb-10">
              Das Assessment dauert weniger als zehn Minuten und gibt Ihnen eine erste, unverbindliche Einschätzung. Anschliessend entscheiden Sie, ob Sie eine Konsultation buchen möchten.
            </p>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-3 bg-forest text-cream font-sans font-medium text-base px-10 py-4 rounded-[2px] hover:bg-opacity-90 transition-colors"
            >
              {t.nav.startAssessment}
              <IconArrow />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
