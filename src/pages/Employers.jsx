import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';

export default function Employers() {
  const { t } = useLang();
  const containerRef = useFadeIn();
  const [employees, setEmployees] = useState(100);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ company: '', name: '', email: '', employees: '', message: '' });

  const pctFemale = 0.48;
  const pctInRange = 0.25;
  const prodLossDays = 14;
  const avgDailyCost = 480;
  const affected = Math.round(employees * pctFemale * pctInRange);
  const annualCost = affected * prodLossDays * avgDailyCost;
  const equivieCost = affected * 13 * 12;
  const roi = ((annualCost - equivieCost) / equivieCost * 100).toFixed(0);

  const companies = [
    { name: 'SBB', sector: 'Transport' },
    { name: 'Swisscom', sector: 'Telekommunikation' },
    { name: 'Zürcher Kantonalbank', sector: 'Finanzdienstleistungen' },
    { name: 'Migros', sector: 'Detailhandel' },
    { name: 'Novartis', sector: 'Pharma' },
  ];

  const tiers = [
    { name: 'Basic', price: 'CHF 8', features: ['Digitaler Zugang für Mitarbeiterinnen', 'Online-Selbsteinschätzung', 'Bildungsinhalte & Webinare', 'Anonymisierte Nutzungsberichte'] },
    { name: 'Standard', price: 'CHF 13', recommended: true, features: ['Alles aus Basic', 'Ermässigte Arztkonsultationen', 'HR-Dashboard & Analytics', 'Jährlicher Wellness-Workshop', 'Dedizierte Account-Betreuung'] },
    { name: 'Premium', price: 'CHF 18', features: ['Alles aus Standard', 'Vollständig subventionierte Behandlung', 'Massgeschneiderte Integration', 'Monatliche Strategie-Reviews', 'Co-Branding & Kommunikation'] },
  ];

  return (
    <div ref={containerRef} className="page-enter">
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section max-w-3xl">
            <p className="text-xs font-medium tracking-widest uppercase text-sage-light mb-4 font-sans">Equivie for Teams</p>
            <h1 className="font-serif font-bold text-cream text-4xl md:text-5xl lg:text-6xl leading-tight">{t.employers.heroTitle}</h1>
            <p className="mt-6 text-lg text-cream/70 leading-relaxed">{t.employers.heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.employers.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-serif font-bold text-forest text-4xl lg:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-charcoal">{stat.label}</p>
                <p className="mt-1 text-xs text-charcoal-light">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section max-w-3xl mx-auto">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl text-center">{t.employers.roiTitle}</h2>
            <p className="mt-4 text-center text-charcoal-light leading-relaxed">{t.employers.roiDescription}</p>

            <div className="mt-12 bg-white border border-sage/20 rounded-[2px] p-8 lg:p-10">
              <label className="block text-sm font-medium text-charcoal mb-3">
                Anzahl Mitarbeiterinnen im Alter 45–60
              </label>
              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min="10"
                  max="2000"
                  step="10"
                  value={employees}
                  onChange={e => setEmployees(Number(e.target.value))}
                  className="flex-1 accent-sage h-2"
                />
                <span className="font-serif font-bold text-forest text-2xl w-16 text-right">{employees}</span>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-cream p-5 rounded-[2px]">
                  <p className="text-xs text-charcoal-light uppercase tracking-wider">Betroffene</p>
                  <p className="mt-1 font-serif font-bold text-forest text-2xl">{affected}</p>
                  <p className="text-xs text-charcoal-light">Mitarbeiterinnen</p>
                </div>
                <div className="bg-rose-pale p-5 rounded-[2px]">
                  <p className="text-xs text-charcoal-light uppercase tracking-wider">Jährlicher Produktivitätsverlust</p>
                  <p className="mt-1 font-serif font-bold text-forest text-2xl">CHF {annualCost.toLocaleString('de-CH')}</p>
                  <p className="text-xs text-charcoal-light">geschätzt</p>
                </div>
                <div className="bg-sage/10 p-5 rounded-[2px]">
                  <p className="text-xs text-charcoal-light uppercase tracking-wider">ROI mit Equivie</p>
                  <p className="mt-1 font-serif font-bold text-sage text-2xl">{roi}%</p>
                  <p className="text-xs text-charcoal-light">Rendite auf Investition</p>
                </div>
              </div>

              <p className="mt-6 text-xs text-charcoal-light">
                Kalkulation basiert auf: {(pctFemale * 100).toFixed(0)}% weibliche Belegschaft, {(pctInRange * 100).toFixed(0)}% in der Altersgruppe 45–60, {prodLossDays} Tage Produktivitätsverlust/Jahr, CHF {avgDailyCost} durchschnittliche Tageskosten. Quellen: Meno Support Suisse, BFS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme tiers */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl text-center mb-12">Programme & Preise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {tiers.map((tier, i) => (
                <div key={i} className={`relative bg-white border p-8 rounded-[2px] flex flex-col ${tier.recommended ? 'border-sage shadow-lg ring-1 ring-sage/20' : 'border-sage/20'}`}>
                  {tier.recommended && (
                    <div className="absolute -top-3 left-8 bg-sage text-cream text-xs font-medium px-4 py-1 rounded-[2px]">{t.common.recommended}</div>
                  )}
                  <h3 className="font-serif font-bold text-forest text-2xl">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-serif font-bold text-forest text-3xl">{tier.price}</span>
                    <span className="text-sm text-charcoal-light">/ Mitarbeiterin / Monat</span>
                  </div>
                  <ul className="mt-6 flex-1 flex flex-col gap-3">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-charcoal">
                        <svg className="w-4 h-4 mt-0.5 text-sage flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <div className="fade-in-section">
            <p className="text-xs font-medium tracking-widest uppercase text-charcoal-light mb-8 font-sans">Schweizer Unternehmen mit vorbildlicher Gesundheitspolitik</p>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              {companies.map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-20 h-20 rounded-full bg-cream-dark flex items-center justify-center">
                    <span className="text-xs font-medium text-charcoal-light">{c.name.slice(0, 3)}</span>
                  </div>
                  <span className="text-xs text-charcoal-light mt-1">{c.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-charcoal-light italic">Dargestellt als Beispiele für Unternehmen mit dem Label «Friendly Work Space» — nicht als Equivie-Kunden.</p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="max-w-2xl mx-auto px-5 lg:px-8">
          <div className="fade-in-section">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl text-center">{t.employers.contactTitle}</h2>
            <p className="mt-4 text-center text-charcoal-light">{t.employers.contactSubtitle}</p>

            {formSubmitted ? (
              <div className="mt-10 bg-white border border-sage/20 rounded-[2px] p-8 text-center">
                <div className="w-12 h-12 mx-auto bg-sage/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <p className="text-charcoal">{t.employers.contactSuccess}</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setFormSubmitted(true); }} className="mt-10 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Unternehmen *</label>
                    <input type="text" required value={contactForm.company} onChange={e => setContactForm(p => ({ ...p, company: e.target.value }))} className="w-full px-4 py-3 bg-white border border-sage/30 rounded-[2px] text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Name *</label>
                    <input type="text" required value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-3 bg-white border border-sage/30 rounded-[2px] text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">E-Mail *</label>
                    <input type="email" required value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-3 bg-white border border-sage/30 rounded-[2px] text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Anzahl Mitarbeitende</label>
                    <input type="text" value={contactForm.employees} onChange={e => setContactForm(p => ({ ...p, employees: e.target.value }))} className="w-full px-4 py-3 bg-white border border-sage/30 rounded-[2px] text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Nachricht</label>
                  <textarea value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))} className="w-full px-4 py-3 bg-white border border-sage/30 rounded-[2px] text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/30 min-h-[120px]" />
                </div>
                <button type="submit" className="w-full py-3 bg-forest text-cream text-sm font-medium tracking-wide rounded-[2px] hover:bg-sage-dark transition-colors cursor-pointer border-0">
                  {t.common.contactUs}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
