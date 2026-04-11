import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <SEO
        title="Page not found — Equivie MED"
        noindex={true}
      />
      <div className="text-center max-w-md">
        <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">404</p>
        <h1 className="font-serif font-bold text-forest text-4xl md:text-5xl mb-4">
          Page not found
        </h1>
        <p className="font-sans text-stone text-base leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-8 py-3 rounded-[2px] hover:bg-forest-mid transition-colors no-underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
