import { Navigate, useParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { wissenArticles } from '../data/wissen';

/**
 * Redirects /:lang/blog URLs to /:lang/wissen structure.
 * - /:lang/blog → /:lang/wissen
 * - /:lang/blog/:slug → /:lang/wissen/:cluster/:slug
 */
export function BlogIndexRedirect() {
  const { langPath } = useLang();
  return <Navigate to={langPath('/wissen')} replace />;
}

export function BlogArticleRedirect() {
  const { slug } = useParams();
  const { langPath } = useLang();
  const article = wissenArticles.find((a) => a.slug === slug);

  if (article) {
    return <Navigate to={langPath(`/wissen/${article.cluster}/${article.slug}`)} replace />;
  }

  // If article not found, redirect to wissen index
  return <Navigate to={langPath('/wissen')} replace />;
}
