import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Symptoms from './pages/Symptoms';
import Treatments from './pages/Treatments';
import Pricing from './pages/Pricing';
import Assessment from './pages/Assessment';
import Employers from './pages/Employers';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
