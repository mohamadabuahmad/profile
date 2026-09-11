import { useEffect } from 'react';

// Adds `is-in` to every [data-reveal] element inside `rootRef` the first time it scrolls into view.
// CSS owns the actual transition, so prefers-reduced-motion is handled there.
export default function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}
