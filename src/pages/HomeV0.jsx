import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconDoctor = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconPrescription = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="12" y2="17" />
  </svg>
);

const IconPharmacy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const trustIcons = [IconShield, IconDoctor, IconPrescription, IconPharmacy];

export default function Home() {
  const { t } = useLang();
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef}>

      {/* HERO */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-serif font-bold text-forest text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
                {t.hero.headline}
              </h1>
              <p className="font-sans text-charcoal-light text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                {t.hero.subHeadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link
                  to="/0/assessment"
                  className="inline-block bg-forest text-cream font-sans font-medium text-base px-8 py-4 rounded-[2px] hover:bg-opacity-90 transition-colors"
                >
                  {t.hero.cta}
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-block font-sans text-base text-forest border-b border-forest pb-0.5 hover:text-sage transition-colors mt-1 sm:mt-3"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&h=600&fit=crop&q=80"
                alt="Woman in a peaceful natural setting"
                className="w-full max-w-sm lg:max-w-none rounded-[2px] object-cover bg-blush-light"
                style={{ height: '380px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="fade-in-section bg-cream-dark border-y border-sage/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {t.trustBar.map((item, i) => {
              const Icon = trustIcons[i % trustIcons.length];
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-sage mt-0.5 shrink-0">
                    <Icon />
                  </span>
                  <div>
                    <p className="font-sans font-semibold text-forest text-sm leading-snug">
                      {item.label}
                    </p>
                    <p className="font-sans text-charcoal-light text-xs leading-snug mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-16 lg:mb-20">
            {t.howItWorks.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="relative">
                <div
                  className="font-serif font-bold text-sage leading-none mb-5 select-none"
                  style={{ fontSize: '5rem' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <div className="w-8 border-t border-sage/40 mb-5" />
                <h3 className="font-serif font-semibold text-forest text-xl mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-charcoal-light text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="fade-in-section bg-cream-dark border-y border-sage/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-10">
            {t.symptoms.title}
          </h2>
          <div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#7C9A7E transparent' }}
          >
            {t.symptoms.items.map((symptom, i) => (
              <div
                key={i}
                className="min-w-[200px] bg-white border border-sage/20 p-5 rounded-[2px] hover:border-sage hover:shadow-sm transition-all duration-200 cursor-default"
              >
                <p className="font-sans font-medium text-forest text-sm leading-snug">
                  {symptom.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-16 lg:mb-20">
            {t.testimonials.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {t.testimonials.items.map((item, i) => (
              <div
                key={i}
                className="bg-cream-dark border border-sage/20 p-8 rounded-[2px] flex flex-col"
              >
                <span
                  className="font-serif text-sage leading-none mb-5 select-none"
                  style={{ fontSize: '3.5rem', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-sans text-charcoal text-base leading-relaxed flex-1">
                  {item.text}
                </p>
                <div className="mt-8 pt-6 border-t border-sage/20">
                  <p className="font-sans font-semibold text-forest text-sm">
                    {item.name}
                  </p>
                  <p className="font-sans text-charcoal-light text-xs mt-0.5">
                    {item.age} &middot; {item.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="fade-in-section bg-cream-dark border-y border-sage/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl lg:text-5xl mb-6">
              {t.whyNow.title}
            </h2>
            <p className="font-sans text-charcoal-light text-lg leading-relaxed mb-10">
              {t.whyNow.description}
            </p>
            <Link
              to="/0/assessment"
              className="inline-block font-sans font-medium text-base text-forest border-b border-forest pb-0.5 hover:text-sage hover:border-sage transition-colors"
            >
              {t.whyNow.ctaText}
            </Link>
          </div>
        </div>
      </section>

      {/* EMPLOYER TEASER */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-sage/30 p-8 rounded-[2px]">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-sage mb-2">
                Equilibra for Teams
              </p>
              <p className="font-serif font-semibold text-forest text-xl md:text-2xl">
                {t.employers.heroTitle}
              </p>
            </div>
            <Link
              to="/0/employers"
              className="shrink-0 inline-block font-sans font-medium text-sm text-forest border border-forest px-6 py-3 rounded-[2px] hover:bg-forest hover:text-cream transition-colors"
            >
              {t.common.learnMore}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
