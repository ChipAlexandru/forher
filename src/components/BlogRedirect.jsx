import { Navigate, useParams } from 'react-router-dom';
import { wissenArticles } from '../data/wissen';

/**
 * Redirects old /blog URLs to new /wissen structure.
 * - /blog → /wissen
 * - /blog/:slug → /wissen/:cluster/:slug
 */
export function BlogIndexRedirect() {
  return <Navigate to="/wissen" replace />;
}

export function BlogArticleRedirect() {
  const { slug } = useParams();
  const article = wissenArticles.find((a) => a.slug === slug);

  if (article) {
    return <Navigate to={`/wissen/${article.cluster}/${article.slug}`} replace />;
  }

  // If article not found, redirect to wissen index
  return <Navigate to="/wissen" replace />;
}
