import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import { clusters, wissenArticles } from '../data/wissen';
import SEO from '../components/SEO';

const pageText = {
  de: {
    tag: 'Wissen',
    title: 'Evidenzbasiertes Wissen zu den Wechseljahren',
    subtitle: 'Medizinisch geprufte Artikel zu Perimenopause, Hormontherapie, Symptomen und Behandlungsoptionen. Geschrieben und uberpruft von Schweizer Fachärztinnen.',
    articles: 'Artikel',
  },
  en: {
    tag: 'Knowledge',
    title: 'Evidence-based menopause knowledge',
    subtitle: 'Medically reviewed articles on perimenopause, hormone therapy, symptoms and treatment options. Written and reviewed by Swiss medical specialists.',
    articles: 'articles',
  },
  fr: {
    tag: 'Savoir',
    title: 'Connaissances fondees sur les preuves',
    subtitle: 'Articles medicalement revises sur la perimenopause, la therapie hormonale, les symptomes et les options de traitement.',
    articles: 'articles',
  },
};

export default function WissenIndex() {
  const { lang } = useLang();
  const containerRef = useFadeIn();
  const t = pageText[lang] || pageText.de;

  return (
    <div ref={containerRef}>
      <SEO
        title={`${t.tag} — Equivie MED | Menopause Wissen`}
        description={t.subtitle}
        canonical="https://equiviemed.ch/wissen"
        type="website"
      />

      {/* PAGE HEADER */}
      <section className="fade-in-section bg-cream border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
            {t.tag}
          </p>
          <h1 className="font-serif font-bold text-forest text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl mb-6">
            {t.title}
          </h1>
          <p className="font-sans text-charcoal-light text-lg md:text-xl leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* CLUSTER GRID */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {clusters.map((cluster) => {
              const articleCount = wissenArticles.filter(
                (a) => a.cluster === cluster.slug
              ).length;

              return (
                <Link
                  key={cluster.slug}
                  to={`/wissen/${cluster.slug}`}
                  className="bg-white border border-sage/20 rounded-[2px] p-6 lg:p-7 flex flex-col hover:border-sage/50 hover:shadow-sm transition-all duration-200 no-underline group"
                >
                  {/* Icon */}
                  <span className="text-3xl mb-4" aria-hidden="true">
                    {cluster.icon}
                  </span>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-forest text-xl leading-snug mb-3 group-hover:text-sage transition-colors">
                    {cluster.title[lang] || cluster.title.de}
                  </h2>

                  {/* Description */}
                  <p className="font-sans text-charcoal-light text-sm leading-relaxed flex-1 mb-5">
                    {cluster.description[lang] || cluster.description.de}
                  </p>

                  {/* Article count */}
                  <span className="font-sans text-xs uppercase tracking-widest text-sage">
                    {articleCount} {t.articles}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
