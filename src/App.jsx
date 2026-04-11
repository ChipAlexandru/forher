import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import HeaderMain from './components/HeaderMain';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import { BlogIndexRedirect, BlogArticleRedirect } from './components/BlogRedirect';

// Lazy-loaded pages
const Employers = lazy(() => import('./pages/Employers'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const WissenIndex = lazy(() => import('./pages/WissenIndex'));
const WissenCluster = lazy(() => import('./pages/WissenCluster'));
const WissenArticle = lazy(() => import('./pages/WissenArticle'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();

  // Landing page: standalone with its own header/footer
  if (pathname === '/') {
    return (
      <>
        <ScrollToTop />
        <Landing />
      </>
    );
  }

  // All other routes: shared header/footer
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <HeaderMain />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <Routes>
            <Route path="/employers" element={<Employers />} />

            {/* Wissen (Knowledge Hub) */}
            <Route path="/wissen" element={<WissenIndex />} />
            <Route path="/wissen/:cluster" element={<WissenCluster />} />
            <Route path="/wissen/:cluster/:slug" element={<WissenArticle />} />

            {/* Blog redirects (301-equivalent client-side) */}
            <Route path="/blog" element={<BlogIndexRedirect />} />
            <Route path="/blog/:slug" element={<BlogArticleRedirect />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
