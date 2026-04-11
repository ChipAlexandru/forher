import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { wissenArticles, getArticlesByCluster, getClusterBySlug } from '../data/wissen';
import SEO from '../components/SEO';
import MarkdownContent from '../components/MarkdownContent';

function formatDate(dateString, lang = 'de') {
  const date = new Date(dateString);
  const locale = lang === 'fr' ? 'fr-CH' : lang === 'en' ? 'en-GB' : 'de-CH';
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function WissenArticle() {
  const { cluster: clusterSlug, slug } = useParams();
  const { lang } = useLang();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const article = wissenArticles.find((a) => a.slug === slug);
  const cluster = getClusterBySlug(clusterSlug);

  const relatedArticles = article
    ? getArticlesByCluster(article.cluster)
        .filter((a) => a.slug !== article.slug)
        .slice(0, 3)
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

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const ui = {
    de: { breadcrumb: 'Wissen', minuteRead: 'Min. Lesezeit', lastUpdated: 'Zuletzt aktualisiert', published: 'Veröffentlicht am', error: 'Fehler', notFound: 'Artikel nicht gefunden', backToWissen: 'Zurück zum Wissen', faq: 'Häufig gestellte Fragen', toc: 'Inhalt', related: 'Ähnliche Artikel', ctaTitle: 'Haben Sie Fragen zu Ihrer Situation?', ctaBody: 'Unsere Ärztinnen beraten Sie diskret und individuell.', ctaButton: 'Kostenlose Bewertung starten', progress: 'Lesefortschritt' },
    fr: { breadcrumb: 'Savoir', minuteRead: 'min de lecture', lastUpdated: 'Dernière mise à jour', published: 'Publié le', error: 'Erreur', notFound: 'Article introuvable', backToWissen: 'Retour au savoir', faq: 'Questions fréquentes', toc: 'Sommaire', related: 'Articles similaires', ctaTitle: 'Des questions sur votre situation ?', ctaBody: 'Nos médecins vous conseillent de manière discrète et individuelle.', ctaButton: 'Commencer l\'évaluation gratuite', progress: 'Progression de lecture' },
    en: { breadcrumb: 'Knowledge', minuteRead: 'min read', lastUpdated: 'Last updated', published: 'Published', error: 'Error', notFound: 'Article not found', backToWissen: 'Back to Knowledge', faq: 'Frequently asked questions', toc: 'Contents', related: 'Related articles', ctaTitle: 'Questions about your situation?', ctaBody: 'Our doctors advise you discreetly and individually.', ctaButton: 'Start free assessment', progress: 'Reading progress' },
  };
  const t = ui[lang] || ui.de;

  if (!article || !cluster) {
    return (
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">{t.error}</p>
        <h1 className="font-serif font-bold text-forest text-4xl mb-6">
          {t.notFound}
        </h1>
        <Link
          to="/wissen"
          className="font-sans font-medium text-base text-forest border-b border-forest pb-px hover:text-sage hover:border-sage transition-colors"
        >
          &larr;&thinsp;{t.backToWissen}
        </Link>
      </div>
    );
  }

  // Resolve content: multilingual object (new pillar articles) or flat string (old articles)
  const resolvedContent = typeof article.content === 'object'
    ? (article.content[lang] || article.content.de || '')
    : article.content;

  // Resolve faq: multilingual object or flat array
  const resolvedFaq = Array.isArray(article.faq)
    ? article.faq
    : (article.faq ? (article.faq[lang] || article.faq.de || []) : []);

  // Build TOC from H2 headings in content
  const tocItems = resolvedContent
    .split('\n')
    .filter((line) => line.trim().startsWith('## ') && !line.trim().startsWith('### '))
    .map((line) => {
      const text = line.trim().replace(/^## /, '');
      const id = text.toLowerCase().replace(/[^a-z0-9äöüàéèêïôùûç]+/g, '-').replace(/(^-|-$)/g, '');
      return { text, id };
    });

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title[lang] || article.title.de,
    description: (article.excerpt[lang] || article.excerpt.de || '').slice(0, 155),
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'Equivie MED Medical Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Equivie MED',
      url: 'https://equiviemed.ch',
    },
    mainEntityOfPage: `https://equiviemed.ch/wissen/${clusterSlug}/${slug}`,
  };

  const faqSchema = resolvedFaq && resolvedFaq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: resolvedFaq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }
    : null;

  const combinedSchema = faqSchema
    ? [blogPostingSchema, faqSchema]
    : blogPostingSchema;

  return (
    <>
      <SEO
        title={`${article.title[lang] || article.title.de} — Equivie MED`}
        description={(article.excerpt[lang] || article.excerpt.de || '').slice(0, 155)}
        canonical={`https://equiviemed.ch/wissen/${clusterSlug}/${slug}`}
        type="article"
        structuredData={combinedSchema}
      />

      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t.progress}
      />

      <div className="bg-cream min-h-screen">

        {/* ARTICLE HEADER */}
        <header className="bg-cream border-b border-sage/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-14 lg:pt-16 lg:pb-18">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-sans text-sm text-charcoal-light mb-8">
              <Link to="/wissen" className="hover:text-forest transition-colors">
                {t.breadcrumb}
              </Link>
              <span aria-hidden="true">/</span>
              <Link to={`/wissen/${clusterSlug}`} className="hover:text-forest transition-colors">
                {cluster.title[lang] || cluster.title.de}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-forest font-medium truncate max-w-[200px]">
                {article.title[lang] || article.title.de}
              </span>
            </nav>

            <div className="max-w-4xl">
              {/* Title */}
              <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl leading-[1.1] tracking-tight mb-7">
                {article.title[lang] || article.title.de}
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
                <span className="text-sage/40 hidden sm:inline" aria-hidden="true">&middot;</span>
                <span className="font-sans text-sm text-charcoal-light">
                  {t.published} {formatDate(article.date, lang)}
                </span>
                <span className="text-sage/40 hidden sm:inline" aria-hidden="true">&middot;</span>
                <span className="font-sans text-sm text-charcoal-light">
                  {article.readingTime}&thinsp;{t.minuteRead}
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
              <MarkdownContent content={resolvedContent} />

              {/* FAQ Section */}
              {resolvedFaq && resolvedFaq.length > 0 && (
                <div className="mt-14 pt-10 border-t border-sage/20">
                  <h2 className="font-serif font-bold text-forest text-2xl mb-6">
                    {t.faq}
                  </h2>
                  <div className="divide-y divide-sage/20 border-t border-sage/20">
                    {resolvedFaq.map((item, i) => (
                      <div key={i}>
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full flex items-center justify-between gap-6 py-5 text-left group bg-transparent border-0 cursor-pointer"
                          aria-expanded={openFaq === i}
                        >
                          <span className="font-sans font-medium text-forest text-base group-hover:text-sage transition-colors leading-snug">
                            {item.q}
                          </span>
                          <span className="shrink-0 w-8 h-8 rounded-full border border-sage/30 flex items-center justify-center text-stone group-hover:border-sage transition-colors" aria-hidden="true">
                            <span className="font-sans text-lg leading-none select-none">
                              {openFaq === i ? '\u2212' : '+'}
                            </span>
                          </span>
                        </button>
                        <div hidden={openFaq !== i} className={openFaq === i ? 'block' : 'hidden'}>
                          <p className="font-sans text-stone text-base leading-relaxed pb-5 pr-14">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Last updated */}
              <div className="mt-10 pt-6 border-t border-sage/20">
                <p className="font-sans text-xs text-charcoal-light">
                  {t.lastUpdated}: {formatDate(article.date, lang)}
                </p>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Link
                  to={`/wissen/${clusterSlug}`}
                  className="font-sans font-medium text-base text-forest border-b border-forest pb-px hover:text-sage hover:border-sage transition-colors"
                >
                  &larr;&thinsp;{cluster.title[lang] || cluster.title.de}
                </Link>
              </div>
            </article>

            {/* SIDEBAR — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                {/* Table of contents */}
                {tocItems.length > 0 && (
                  <>
                    <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
                      {t.toc}
                    </p>
                    <nav className="mb-10">
                      <ul className="flex flex-col gap-2">
                        {tocItems.map((item) => (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className="font-sans text-sm text-charcoal-light hover:text-forest transition-colors leading-snug block no-underline"
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </>
                )}

                {/* Related articles */}
                {relatedArticles.length > 0 && (
                  <>
                    <p className="font-sans text-xs uppercase tracking-widest text-sage mb-6">
                      {t.related}
                    </p>
                    <div className="flex flex-col gap-4">
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.slug}
                          to={`/wissen/${related.cluster}/${related.slug}`}
                          className="group block bg-white border border-sage/20 rounded-[2px] p-4 hover:border-sage/50 hover:shadow-sm transition-all duration-200 no-underline"
                        >
                          <h3 className="font-serif font-semibold text-forest text-base leading-snug group-hover:text-sage transition-colors">
                            {related.title[lang] || related.title.de}
                          </h3>
                          <p className="font-sans text-xs text-charcoal-light mt-2">
                            {related.readingTime}&thinsp;{minuteRead}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {/* CTA nudge */}
                <div className="mt-10 p-5 bg-cream-dark border border-sage/20 rounded-[2px]">
                  <p className="font-serif font-semibold text-forest text-base leading-snug mb-3">
                    {t.ctaTitle}
                  </p>
                  <p className="font-sans text-xs text-charcoal-light leading-relaxed mb-4">
                    {t.ctaBody}
                  </p>
                  <Link
                    to="/"
                    className="inline-block font-sans font-medium text-xs text-forest border border-forest px-4 py-2 rounded-[2px] hover:bg-forest hover:text-cream transition-colors no-underline"
                  >
                    {t.ctaButton}
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>

      </div>
    </>
  );
}
