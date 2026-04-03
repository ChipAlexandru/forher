import { useEffect, useRef } from 'react';

export function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const sections = node.querySelectorAll('.fade-in-section');

    // Immediately reveal elements that are already in the viewport
    sections.forEach((s) => {
      const rect = s.getBoundingClientRect();
      if (rect.top < window.innerHeight + 40) {
        s.classList.add('is-visible');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    sections.forEach((s) => {
      if (!s.classList.contains('is-visible')) {
        observer.observe(s);
      }
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
