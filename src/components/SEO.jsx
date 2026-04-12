import { Helmet } from 'react-helmet-async';
import { useLang } from '../context/LanguageContext';

const BASE_URL = 'https://equiviemed.ch';
const DEFAULTS = {
  title: 'Equivie MED — Menopause specialists who listen | Switzerland',
  description: 'Video consultation with a gynaecologist specialised in menopause. Diagnosis, personalised treatment plan and prescription in one 45-60 minute session. FMH-certified, Swiss-regulated.',
  ogImage: '/og-image.png',
  type: 'website',
};

/**
 * @param {string} pagePath — The path without language prefix, e.g. '/wissen' or '/wissen/perimenopause/what-is-perimenopause'.
 *                             If omitted, defaults to '/'.
 */
export default function SEO({
  title,
  description,
  pagePath = '/',
  type,
  ogImage,
  noindex = false,
  structuredData,
}) {
  const { lang } = useLang();

  const metaTitle = title || DEFAULTS.title;
  const metaDescription = description || DEFAULTS.description;
  const metaType = type || DEFAULTS.type;
  const metaImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`)
    : `${BASE_URL}${DEFAULTS.ogImage}`;

  // Canonical: language-specific URL
  const canonical = `${BASE_URL}/${lang}${pagePath === '/' ? '' : pagePath}`;

  // Hreflang: distinct URLs per language
  const hrefDe = `${BASE_URL}/de${pagePath === '/' ? '' : pagePath}`;
  const hrefFr = `${BASE_URL}/fr${pagePath === '/' ? '' : pagePath}`;
  const hrefEn = `${BASE_URL}/en${pagePath === '/' ? '' : pagePath}`;

  return (
    <Helmet>
      <html lang={lang === 'de' ? 'de-CH' : lang === 'fr' ? 'fr-CH' : 'en'} />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={canonical} />

      {/* Hreflang — distinct URLs per language */}
      <link rel="alternate" hreflang="de-CH" href={hrefDe} />
      <link rel="alternate" hreflang="fr-CH" href={hrefFr} />
      <link rel="alternate" hreflang="en" href={hrefEn} />
      <link rel="alternate" hreflang="x-default" href={hrefDe} />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={metaType} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:locale" content={lang === 'de' ? 'de_CH' : lang === 'fr' ? 'fr_CH' : 'en'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
