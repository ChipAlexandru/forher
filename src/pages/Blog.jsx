import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import { articles } from '../data/articles';
import SEO from '../components/SEO';

const cardPhotos = [
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&h=400&fit=crop&q=80',
];

const categoryLabels = {
  de: { hormones: 'Hormone & HRT', symptoms: 'Symptome', lifestyle: 'Lebensstil' },
  fr: { hormones: 'Hormones & THS', symptoms: 'Symptômes', lifestyle: 'Mode de vie' },
  en: { hormones: 'Hormones & HRT', symptoms: 'Symptoms', lifestyle: 'Lifestyle' },
};

function formatDate(dateString, lang = 'de') {
  const date = new Date(dateString);
  const locale = lang === 'fr' ? 'fr-CH' : lang === 'en' ? 'en-GB' : 'de-CH';
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Blog() {
  const { lang, langPath, t } = useLang();
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef}>
      <SEO
        title="Blog — Equivie MED | Menopause health resources"
        description="Evidence-based articles on menopause, perimenopause, hormone therapy and women's health. Written and reviewed by Swiss medical specialists."
        pagePath="/blog"
        type="website"
      />

      {/* PAGE HEADER */}
      <section className="fade-in-section bg-cream border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
            {lang === 'fr' ? 'Guide' : lang === 'en' ? 'Guide' : 'Ratgeber'}
          </p>
          <h1 className="font-serif font-bold text-forest text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl mb-6">
            {t.blog.title}
          </h1>
          <p className="font-sans text-charcoal-light text-lg md:text-xl leading-relaxed max-w-2xl">
            {t.blog.subtitle}
          </p>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="fade-in-section bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article, i) => (
              <article
                key={article.slug}
                className="bg-white border border-sage/20 rounded-[2px] flex flex-col hover:border-sage/50 hover:shadow-sm transition-all duration-200"
              >
                {/* Article photo */}
                <img
                  src={cardPhotos[i % cardPhotos.length]}
                  alt={article.title}
                  loading="lazy"
                  width="600"
                  height="400"
                  className="h-48 w-full rounded-t-[2px] shrink-0 object-cover bg-cream-dark"
                />

                {/* Card content */}
                <div className="flex flex-col flex-1 p-6 lg:p-7">
                  {/* Meta row */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-sans text-xs uppercase tracking-widest text-sage">
                      {(categoryLabels[lang] || categoryLabels.de)[article.category] || article.category}
                    </span>
                    <span className="text-sage/40 text-xs" aria-hidden="true">·</span>
                    <span className="font-sans text-xs text-charcoal-light">
                      {article.readingTime}&thinsp;{t.blog.minuteRead}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif font-bold text-forest text-xl leading-snug mb-3">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-sans text-charcoal-light text-sm leading-relaxed flex-1 mb-5">
                    {article.excerpt}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-5 border-t border-sage/15">
                    <span className="font-sans text-xs text-charcoal-light">
                      {formatDate(article.date, lang)}
                    </span>
                    <Link
                      to={langPath(`/blog/${article.slug}`)}
                      className="font-sans text-sm font-medium text-forest border-b border-forest pb-px hover:text-sage hover:border-sage transition-colors"
                      aria-label={`${t.blog.readMore}: ${article.title}`}
                    >
                      {t.blog.readMore}&thinsp;&rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
