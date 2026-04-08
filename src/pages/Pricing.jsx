import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const { t } = useLang();
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef} className="page-enter">
      {/* Header */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section max-w-2xl">
            <p className="text-xs font-medium tracking-widest uppercase text-sage mb-4 font-sans">Preise</p>
            <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl lg:text-6xl leading-tight">{t.pricing.title}</h1>
            <p className="mt-6 text-lg text-charcoal-light leading-relaxed">{t.pricing.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {t.pricing.tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative bg-white border p-8 lg:p-10 rounded-[2px] flex flex-col ${
                  tier.recommended ? 'border-sage shadow-lg ring-1 ring-sage/20' : 'border-sage/20'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3 left-8 bg-sage text-cream text-xs font-medium px-4 py-1 rounded-[2px]">
                    {t.common.recommended}
                  </div>
                )}
                <h3 className="font-serif font-bold text-forest text-2xl">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-serif font-bold text-forest text-4xl">CHF {tier.price}</span>
                  <span className="text-sm text-charcoal-light">/ {tier.period}</span>
                </div>
                <p className="mt-4 text-sm text-charcoal-light leading-relaxed">{tier.description}</p>
                <ul className="mt-6 flex-1 flex flex-col gap-3">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-charcoal">
                      <svg className="w-4 h-4 mt-0.5 text-sage flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/assessment"
                  className={`mt-8 block text-center py-3 px-6 text-sm font-medium tracking-wide no-underline rounded-[2px] transition-colors duration-150 ${
                    tier.recommended
                      ? 'bg-forest text-cream hover:bg-sage-dark'
                      : 'border border-forest text-forest hover:bg-forest hover:text-cream'
                  }`}
                >
                  {t.nav.startAssessment}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KVG section */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl">{t.pricing.kvgTitle}</h2>
            <p className="mt-6 text-charcoal-light leading-relaxed">{t.pricing.kvgDescription}</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl text-center mb-12">{t.pricing.comparisonTitle}</h2>
            <div className="max-w-3xl mx-auto overflow-hidden border border-sage/20 rounded-[2px]">
              <div className="grid grid-cols-3 bg-forest text-cream text-sm font-medium">
                <div className="p-4 border-r border-cream/10"></div>
                <div className="p-4 border-r border-cream/10 text-center">Traditionell</div>
                <div className="p-4 text-center">Equivie</div>
              </div>
              {t.pricing.comparison.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-cream'}`}>
                  <div className="p-4 border-r border-sage/10 font-medium text-charcoal">{row.aspect}</div>
                  <div className="p-4 border-r border-sage/10 text-center text-charcoal-light">{row.traditional}</div>
                  <div className="p-4 text-center text-forest font-medium">{row.equivie}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
