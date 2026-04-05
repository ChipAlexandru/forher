import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
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

  if (pathname === '/landing') {
    return (
      <>
        <ScrollToTop />
        <Landing />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header onQuizOpen={() => setQuizOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home quizOpen={quizOpen} setQuizOpen={setQuizOpen} />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
