import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import HeaderMain from './components/HeaderMain';
import Footer from './components/Footer';
import HeaderV0 from './components/HeaderV0';
import FooterV0 from './components/FooterV0';
import Landing from './pages/Landing';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const HomeV0 = lazy(() => import('./pages/HomeV0'));
const HowItWorksV0 = lazy(() => import('./pages/HowItWorksV0'));
const SymptomsV0 = lazy(() => import('./pages/SymptomsV0'));
const TreatmentsV0 = lazy(() => import('./pages/TreatmentsV0'));
const PricingV0 = lazy(() => import('./pages/PricingV0'));
const AssessmentV0 = lazy(() => import('./pages/AssessmentV0'));
const EmployersV0 = lazy(() => import('./pages/EmployersV0'));
const Employers = lazy(() => import('./pages/Employers'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const LandingV3 = lazy(() => import('./pages/LandingV3'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const { pathname } = useLocation();

  // V0: Original multi-page design with its own header/footer
  if (pathname.startsWith('/0')) {
    return (
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <HeaderV0 />
        <main className="flex-1">
          <Suspense fallback={<div className="min-h-screen bg-cream" />}>
            <Routes>
              <Route path="/0" element={<HomeV0 />} />
              <Route path="/0/how-it-works" element={<HowItWorksV0 />} />
              <Route path="/0/symptoms" element={<SymptomsV0 />} />
              <Route path="/0/treatments" element={<TreatmentsV0 />} />
              <Route path="/0/pricing" element={<PricingV0 />} />
              <Route path="/0/assessment" element={<AssessmentV0 />} />
              <Route path="/0/employers" element={<EmployersV0 />} />
              <Route path="/0/blog" element={<Blog />} />
              <Route path="/0/blog/:slug" element={<BlogArticle />} />
            </Routes>
          </Suspense>
        </main>
        <FooterV0 />
      </div>
    );
  }

  // V1: Redesigned single-page with shared header/footer
  if (pathname === '/1') {
    return (
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Header onQuizOpen={() => setQuizOpen(true)} />
        <main className="flex-1">
          <Suspense fallback={<div className="min-h-screen bg-cream" />}>
            <Home quizOpen={quizOpen} setQuizOpen={setQuizOpen} />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  // V2: Standalone landing page (own header/footer)
  if (pathname === '/2') {
    return (
      <>
        <ScrollToTop />
        <Landing />
      </>
    );
  }

  // V3: Quiz-led landing page (own header/footer)
  if (pathname === '/3') {
    return (
      <>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <LandingV3 />
        </Suspense>
      </>
    );
  }

  // Default homepage: V2 standalone (has its own header/footer)
  if (pathname === '/') {
    return (
      <>
        <ScrollToTop />
        <Landing />
      </>
    );
  }

  // Shared header/footer routes
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
