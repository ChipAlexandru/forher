import { useParams, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import { clusters, wissenArticles, getArticlesByCluster, getClusterBySlug } from '../data/wissen';
import SEO from '../components/SEO';
import MarkdownContent from '../components/MarkdownContent';
import { useState } from 'react';

function formatDate(dateString, lang = 'de') {
  const date = new Date(dateString);
  const locale = lang === 'fr' ? 'fr-CH' : lang === 'en' ? 'en-GB' : 'de-CH';
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function WissenCluster() {
  const { cluster: clusterSlug } = useParams();
  const { lang } = useLang();
  const containerRef = useFadeIn();
  const [openFaq, setOpenFaq] = useState(null);

  const cluster = getClusterBySlug(clusterSlug);
  const articles = getArticlesByCluster(clusterSlug);
  const pillarArticle = articles.find((a) => a.isPillar);
  const supportingArticles = articles.filter((a) => !a.isPillar);

  const ui = {
    de: { error: 'Fehler', notFound: 'Thema nicht gefunden', back: 'Zurück zum Wissen', faq: 'Häufig gestellte Fragen', disclaimer: 'Dieser Artikel dient der Information und ersetzt keine ärztliche Beratung. Konsultieren Sie immer eine qualifizierte Fachperson.' },
    fr: { error: 'Erreur', notFound: 'Thème introuvable', back: 'Retour au savoir', faq: 'Questions fréquentes', disclaimer: 'Cet article est fourni à titre informatif et ne remplace pas un avis médical. Consultez toujours un professionnel qualifié.' },
    en: { error: 'Error', notFound: 'Topic not found', back: 'Back to Knowledge', faq: 'Frequently asked questions', disclaimer: 'This article is for informational purposes and does not replace medical advice. Always consult a qualified professional.' },
  };
  const uiText = ui[lang] || ui.de;

  if (!cluster) {
    return (
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">{uiText.error}</p>
        <h1 className="font-serif font-bold text-forest text-4xl mb-6">
          {uiText.notFound}
        </h1>
        <Link
          to="/wissen"
          className="font-sans font-medium text-base text-forest border-b border-forest pb-px hover:text-sage hover:border-sage transition-colors"
        >
          &larr;&thinsp;{uiText.back}
        </Link>
      </div>
    );
  }

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  // Resolve content: multilingual object (new pillar articles) or flat string (old articles)
  const resolvedPillarContent = pillarArticle
    ? (typeof pillarArticle.content === 'object'
        ? (pillarArticle.content[lang] || pillarArticle.content.de || '')
        : pillarArticle.content)
    : '';

  // Resolve faq: multilingual object or flat array
  const resolvedPillarFaq = pillarArticle
    ? (Array.isArray(pillarArticle.faq)
        ? pillarArticle.faq
        : (pillarArticle.faq ? (pillarArticle.faq[lang] || pillarArticle.faq.de || []) : []))
    : [];

  // pillarParagraphs no longer needed — MarkdownContent handles rendering

  const breadcrumbWissen = lang === 'fr' ? 'Savoir' : lang === 'en' ? 'Knowledge' : 'Wissen';
  const readMoreLabel = lang === 'fr' ? 'Lire' : lang === 'en' ? 'Read' : 'Lesen';
  const minuteRead = lang === 'fr' ? 'min de lecture' : lang === 'en' ? 'min read' : 'Min. Lesezeit';
  const moreArticlesLabel = lang === 'fr' ? 'Articles dans ce theme' : lang === 'en' ? 'Articles in this topic' : 'Weitere Artikel in diesem Thema';

  return (
    <div ref={containerRef}>
      <SEO
        title={`${cluster.title[lang] || cluster.title.de} — Equivie MED`}
        description={cluster.description[lang] || cluster.description.de}
        canonical={`https://equiviemed.ch/wissen/${clusterSlug}`}
        type="website"
      />

      {/* HEADER */}
      <section className="fade-in-section bg-cream border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-sm text-charcoal-light mb-6">
            <Link to="/wissen" className="hover:text-forest transition-colors">
              {breadcrumbWissen}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-forest font-medium">
              {cluster.title[lang] || cluster.title.de}
            </span>
          </nav>

          <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-3xl mb-4">
            {cluster.title[lang] || cluster.title.de}
          </h1>
          <p className="font-sans text-charcoal-light text-lg leading-relaxed max-w-2xl">
            {cluster.description[lang] || cluster.description.de}
          </p>
        </div>
      </section>

      {/* PILLAR ARTICLE (inline) */}
      {pillarArticle && (
        <section className="fade-in-section bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
            <div className="max-w-3xl">
              {/* Pillar title */}
              <h2 className="font-serif font-bold text-forest text-3xl md:text-4xl leading-[1.1] tracking-tight mb-4">
                {pillarArticle.title[lang] || pillarArticle.title.de}
              </h2>

              {/* Byline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10">
                <span className="font-sans text-sm text-charcoal-light">
                  {pillarArticle.author}
                </span>
                <span className="text-sage/40" aria-hidden="true">&middot;</span>
                <span className="font-sans text-sm text-charcoal-light">
                  {formatDate(pillarArticle.date, lang)}
                </span>
                <span className="text-sage/40" aria-hidden="true">&middot;</span>
                <span className="font-sans text-sm text-charcoal-light">
                  {pillarArticle.readingTime}&thinsp;{minuteRead}
                </span>
              </div>

              {/* Medical disclaimer */}
              <p className="font-sans text-xs text-charcoal-light italic mb-10">
                {uiText.disclaimer}
              </p>

              {/* Body */}
              <MarkdownContent content={resolvedPillarContent} />

              {/* FAQ Accordion */}
              {resolvedPillarFaq && resolvedPillarFaq.length > 0 && (
                <div className="mt-14 pt-10 border-t border-sage/20">
                  <h3 className="font-serif font-bold text-forest text-2xl mb-6">
                    {uiText.faq}
                  </h3>
                  <div className="divide-y divide-sage/20 border-t border-sage/20">
                    {resolvedPillarFaq.map((item, i) => (
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
            </div>
          </div>
        </section>
      )}

      {/* SUPPORTING ARTICLES */}
      {supportingArticles.length > 0 && (
        <section className="fade-in-section bg-cream-dark border-t border-sage/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <h2 className="font-serif font-bold text-forest text-2xl md:text-3xl mb-10">
              {moreArticlesLabel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {supportingArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/wissen/${clusterSlug}/${article.slug}`}
                  className="bg-white border border-sage/20 rounded-[2px] p-6 lg:p-7 flex flex-col hover:border-sage/50 hover:shadow-sm transition-all duration-200 no-underline group"
                >
                  <span className="font-sans text-xs uppercase tracking-widest text-sage mb-3">
                    {article.readingTime}&thinsp;{minuteRead}
                  </span>
                  <h3 className="font-serif font-bold text-forest text-lg leading-snug mb-3 group-hover:text-sage transition-colors">
                    {article.title[lang] || article.title.de}
                  </h3>
                  <p className="font-sans text-charcoal-light text-sm leading-relaxed flex-1 mb-4">
                    {article.excerpt[lang] || article.excerpt.de}
                  </p>
                  <span className="font-sans text-sm font-medium text-forest border-b border-forest pb-px self-start group-hover:text-sage group-hover:border-sage transition-colors">
                    {readMoreLabel}&thinsp;&rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
