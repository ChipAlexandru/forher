import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://equiviemed.ch';
const DEFAULTS = {
  title: 'Equivie MED — Menopause specialists who listen | Switzerland',
  description: 'Video consultation with a gynaecologist specialised in menopause. Diagnosis, personalised treatment plan and prescription in one 45-60 minute session. FMH-certified, Swiss-regulated.',
  ogImage: '/og-image.png',
  type: 'website',
};

export default function SEO({
  title,
  description,
  canonical,
  type,
  ogImage,
  noindex = false,
  structuredData,
}) {
  const metaTitle = title || DEFAULTS.title;
  const metaDescription = description || DEFAULTS.description;
  const metaCanonical = canonical || `${BASE_URL}/`;
  const metaType = type || DEFAULTS.type;
  const metaImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`)
    : `${BASE_URL}${DEFAULTS.ogImage}`;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={metaCanonical} />

      {/* Hreflang */}
      <link rel="alternate" hreflang="en" href={metaCanonical} />
      <link rel="alternate" hreflang="de-CH" href={metaCanonical} />
      <link rel="alternate" hreflang="fr-CH" href={metaCanonical} />
      <link rel="alternate" hreflang="x-default" href={metaCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:type" content={metaType} />
      <meta property="og:image" content={metaImage} />

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
