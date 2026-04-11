import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { articles } from '../data/articles';
import SEO from '../components/SEO';

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

const relatedPhotos = [
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop&q=80',
];

export default function BlogArticle() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const [scrollProgress, setScrollProgress] = useState(0);

  const article = articles.find((a) => a.slug === slug);

  const relatedArticles = article
    ? articles
        .filter((a) => a.slug !== article.slug)
        .sort((a, b) => {
          // Prefer same category
          const aMatch = a.category === article.category ? 1 : 0;
          const bMatch = b.category === article.category ? 1 : 0;
          return bMatch - aMatch;
        })
        .slice(0, 2)
    : [];

  useEffect(() => {
    if (!article) return;

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const blogUi = {
    de: { error: 'Fehler', notFound: 'Artikel nicht gefunden', notFoundDesc: 'Der gesuchte Artikel existiert nicht oder wurde entfernt.', backToGuide: 'Zurück zum Ratgeber', allArticles: 'Alle Ratgeber-Artikel', ctaTitle: 'Haben Sie Fragen zu Ihrer Situation?', ctaBody: 'Unsere Ärztinnen beraten Sie diskret und individuell.', ctaButton: 'Kostenlose Bewertung starten' },
    fr: { error: 'Erreur', notFound: 'Article introuvable', notFoundDesc: 'L\'article recherché n\'existe pas ou a été supprimé.', backToGuide: 'Retour au guide', allArticles: 'Tous les articles', ctaTitle: 'Des questions sur votre situation ?', ctaBody: 'Nos médecins vous conseillent de manière discrète et individuelle.', ctaButton: 'Commencer l\'évaluation gratuite' },
    en: { error: 'Error', notFound: 'Article not found', notFoundDesc: 'The article you are looking for does not exist or has been removed.', backToGuide: 'Back to guide', allArticles: 'All guide articles', ctaTitle: 'Questions about your situation?', ctaBody: 'Our doctors advise you discreetly and individually.', ctaButton: 'Start free assessment' },
  };
  const bu = blogUi[lang] || blogUi.de;

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">{bu.error}</p>
        <h1 className="font-serif font-bold text-forest text-4xl mb-6">
          {bu.notFound}
        </h1>
        <p className="font-sans text-charcoal-light text-lg leading-relaxed mb-10">
          {bu.notFoundDesc}
        </p>
        <Link
          to="/blog"
          className="font-sans font-medium text-base text-forest border-b border-forest pb-px hover:text-sage hover:border-sage transition-colors"
        >
          &larr;&thinsp;{bu.backToGuide}
        </Link>
      </div>
    );
  }

  const paragraphs = article.content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: (article.excerpt || article.content || '').slice(0, 155),
    datePublished: article.date,
    dateModified: article.dateModified || article.date,
    author: {
      '@type': 'Organization',
      name: 'Equivie MED Medical Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Equivie MED',
      url: 'https://equiviemed.ch',
    },
    mainEntityOfPage: `https://equiviemed.ch/blog/${slug}`,
  };

  return (
    <>
      <SEO
        title={`${article.title} — Equivie MED`}
        description={(article.excerpt || article.content || '').slice(0, 155)}
        canonical={`https://equiviemed.ch/blog/${slug}`}
        type="article"
        structuredData={blogPostingSchema}
      />

      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={lang === 'fr' ? 'Progression de lecture' : lang === 'en' ? 'Reading progress' : 'Lesefortschritt'}
      />

      <div className="bg-cream min-h-screen">

        {/* ARTICLE HEADER */}
        <header className="bg-cream border-b border-sage/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-14 lg:pt-16 lg:pb-18">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-block font-sans text-sm text-charcoal-light hover:text-forest transition-colors mb-8"
            >
              &larr;&thinsp;{t.blog?.title ?? 'Ratgeber'}
            </Link>

            <div className="max-w-4xl">
              {/* Category tag */}
              <span className="inline-block font-sans text-xs uppercase tracking-widest text-sage mb-5">
                {(categoryLabels[lang] || categoryLabels.de)[article.category] || article.category}
              </span>

              {/* Title */}
              <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl leading-[1.1] tracking-tight mb-7">
                {article.title}
              </h1>

              {/* Author + meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full bg-sage/30 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-sans text-sm font-medium text-forest">
                    {article.author}
                  </span>
                </div>
                <span className="text-sage/40 hidden sm:inline" aria-hidden="true">·</span>
                <span className="font-sans text-sm text-charcoal-light">
                  {formatDate(article.date, lang)}
                </span>
                <span className="text-sage/40 hidden sm:inline" aria-hidden="true">·</span>
                <span className="font-sans text-sm text-charcoal-light">
                  {article.readingTime}&thinsp;{t.blog.minuteRead}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY + SIDEBAR */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16 xl:gap-20">

            {/* ARTICLE BODY */}
            <article className="max-w-3xl">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'font-sans text-xl leading-relaxed text-charcoal mb-7'
                      : 'font-sans text-lg leading-relaxed text-charcoal mb-6'
                  }
                >
                  {paragraph}
                </p>
              ))}

              {/* Back link at bottom */}
              <div className="mt-14 pt-10 border-t border-sage/20">
                <Link
                  to="/blog"
                  className="font-sans font-medium text-base text-forest border-b border-forest pb-px hover:text-sage hover:border-sage transition-colors"
                >
                  &larr;&thinsp;{bu.allArticles}
                </Link>
              </div>
            </article>

            {/* RELATED ARTICLES SIDEBAR — desktop only */}
            {relatedArticles.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="font-sans text-xs uppercase tracking-widest text-sage mb-6">
                    {t.blog?.relatedArticles ?? 'Ähnliche Artikel'}
                  </p>

                  <div className="flex flex-col gap-5">
                    {relatedArticles.map((related, i) => (
                      <Link
                        key={related.slug}
                        to={`/blog/${related.slug}`}
                        className="group block bg-white border border-sage/20 rounded-[2px] overflow-hidden hover:border-sage/50 hover:shadow-sm transition-all duration-200"
                      >
                        {/* Article thumbnail */}
                        <img
                          src={relatedPhotos[i % relatedPhotos.length]}
                          alt={related.title}
                          loading="lazy"
                          width="600"
                          height="400"
                          className="h-28 w-full object-cover bg-cream-dark"
                        />
                        <div className="p-4">
                          <span className="font-sans text-xs uppercase tracking-widest text-sage block mb-2">
                            {(categoryLabels[lang] || categoryLabels.de)[related.category] || related.category}
                          </span>
                          <h3 className="font-serif font-semibold text-forest text-base leading-snug group-hover:text-sage transition-colors">
                            {related.title}
                          </h3>
                          <p className="font-sans text-xs text-charcoal-light mt-2">
                            {related.readingTime}&thinsp;{t.blog.minuteRead}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* CTA nudge */}
                  <div className="mt-10 p-5 bg-cream-dark border border-sage/20 rounded-[2px]">
                    <p className="font-serif font-semibold text-forest text-base leading-snug mb-3">
                      {bu.ctaTitle}
                    </p>
                    <p className="font-sans text-xs text-charcoal-light leading-relaxed mb-4">
                      {bu.ctaBody}
                    </p>
                    <Link
                      to="/"
                      className="inline-block font-sans font-medium text-xs text-forest border border-forest px-4 py-2 rounded-[2px] hover:bg-forest hover:text-cream transition-colors"
                    >
                      {bu.ctaButton}
                    </Link>
                  </div>
                </div>
              </aside>
            )}

          </div>
        </div>

      </div>
    </>
  );
}
