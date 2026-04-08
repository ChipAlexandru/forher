import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeaderV0 from './components/HeaderV0';
import FooterV0 from './components/FooterV0';
import Home from './pages/Home';
import HomeV0 from './pages/HomeV0';
import HowItWorksV0 from './pages/HowItWorksV0';
import SymptomsV0 from './pages/SymptomsV0';
import TreatmentsV0 from './pages/TreatmentsV0';
import PricingV0 from './pages/PricingV0';
import AssessmentV0 from './pages/AssessmentV0';
import EmployersV0 from './pages/EmployersV0';
import Employers from './pages/Employers';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Landing from './pages/Landing';

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
          <Home quizOpen={quizOpen} setQuizOpen={setQuizOpen} />
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

  // Default: V2 landing as homepage, plus shared routes
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header onQuizOpen={() => setQuizOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
