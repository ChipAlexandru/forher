import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Employers from './pages/Employers';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Landing from './pages/Landing';
import HomeV0 from './pages/HomeV0';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);

  const { pathname } = useLocation();

  // Standalone version pages (no shared header/footer)
  if (pathname === '/0' || pathname === '/1' || pathname === '/2') {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/0" element={
            <div className="min-h-screen flex flex-col">
              <Header onQuizOpen={() => setQuizOpen(true)} />
              <main className="flex-1">
                <HomeV0 />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/1" element={
            <div className="min-h-screen flex flex-col">
              <Header onQuizOpen={() => setQuizOpen(true)} />
              <main className="flex-1">
                <Home quizOpen={quizOpen} setQuizOpen={setQuizOpen} />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/2" element={<Landing />} />
        </Routes>
      </>
    );
  }

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
