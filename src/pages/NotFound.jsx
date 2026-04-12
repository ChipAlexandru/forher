import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import SEO from '../components/SEO';

const text = {
  de: { title: 'Seite nicht gefunden', body: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', back: 'Zurück zur Startseite' },
  fr: { title: 'Page introuvable', body: 'La page que vous recherchez n\'existe pas ou a été déplacée.', back: 'Retour à l\'accueil' },
  en: { title: 'Page not found', body: 'The page you\'re looking for doesn\'t exist or has been moved.', back: 'Back to home' },
};

export default function NotFound() {
  const { lang, langPath } = useLang();
  const t = text[lang] || text.en;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <SEO
        title={`${t.title} — Equivie MED`}
        noindex={true}
      />
      <div className="text-center max-w-md">
        <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">404</p>
        <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl mb-4">
          {t.title}
        </h1>
        <p className="font-sans text-stone text-base leading-relaxed mb-8">
          {t.body}
        </p>
        <Link
          to={langPath('/')}
          className="inline-block bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-3 rounded-[2px] hover:bg-forest-mid transition-colors no-underline"
        >
          {t.back}
        </Link>
      </div>
    </div>
  );
}
