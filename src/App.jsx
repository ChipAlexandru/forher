import { Routes, Route, Navigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import HeaderMain from './components/HeaderMain';
import Footer from './components/Footer';
import Landing from './pages/Landing';

// Lazy-loaded pages — keep main bundle small by deferring all non-landing routes
const WissenIndex = lazy(() => import('./pages/WissenIndex'));
const WissenCluster = lazy(() => import('./pages/WissenCluster'));
const WissenArticle = lazy(() => import('./pages/WissenArticle'));
const NotFound = lazy(() => import('./pages/NotFound'));
// Lazy-load BlogRedirect — it imports the 2,420-line wissen.js data that would
// otherwise bloat every page's bundle. Only loaded on legacy /blog routes.
const BlogIndexRedirect = lazy(() => import('./components/BlogRedirect').then((m) => ({ default: m.BlogIndexRedirect })));
const BlogArticleRedirect = lazy(() => import('./components/BlogRedirect').then((m) => ({ default: m.BlogArticleRedirect })));

const VALID_LANGS = ['de', 'fr', 'en'];
const DEFAULT_LANG = 'de';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/**
 * Layout: wraps all /:lang routes with LanguageProvider.
 * Renders <Outlet /> for child routes.
 */
function LanguageLayout() {
  const { lang } = useParams();

  if (!VALID_LANGS.includes(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return (
    <LanguageProvider urlLang={lang}>
      <ScrollToTop />
      <Outlet />
    </LanguageProvider>
  );
}

/**
 * Layout: shared header + footer for all pages except Landing.
 */
function SharedLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Redirect legacy bare /wissen/* URLs to /de/wissen/*
 * (Client-side fallback — Vercel 301s handle the SEO-critical path)
 */
function LegacyWissenRedirect() {
  const { '*': rest } = useParams();
  return <Navigate to={`/${DEFAULT_LANG}/wissen${rest ? `/${rest}` : ''}`} replace />;
}

function LegacyBlogRedirect() {
  const { '*': rest } = useParams();
  return <Navigate to={`/${DEFAULT_LANG}/blog${rest ? `/${rest}` : ''}`} replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Bare root → default language */}
      <Route path="/" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />

      {/* Legacy bare URLs → default language (client-side fallback for vercel.json 301s) */}
      <Route path="/wissen" element={<Navigate to={`/${DEFAULT_LANG}/wissen`} replace />} />
      <Route path="/wissen/*" element={<LegacyWissenRedirect />} />
      <Route path="/blog" element={<Navigate to={`/${DEFAULT_LANG}/wissen`} replace />} />
      <Route path="/blog/*" element={<LegacyBlogRedirect />} />

      {/* Language-prefixed routes */}
      <Route path="/:lang" element={<LanguageLayout />}>
        {/* Landing page: standalone layout (own header/footer inside component) */}
        <Route index element={<Landing />} />

        {/* All other pages: shared header + footer */}
        <Route element={<SharedLayout />}>
          <Route path="wissen" element={<WissenIndex />} />
          <Route path="wissen/:cluster" element={<WissenCluster />} />
          <Route path="wissen/:cluster/:slug" element={<WissenArticle />} />
          <Route path="blog" element={<BlogIndexRedirect />} />
          <Route path="blog/:slug" element={<BlogArticleRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}
