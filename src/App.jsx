import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import HeaderMain from './components/HeaderMain';
import Footer from './components/Footer';
import Landing from './pages/Landing';

// Lazy-loaded pages
const Employers = lazy(() => import('./pages/Employers'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
