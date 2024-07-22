// hooks/useInView.tsx

import { useEffect, useState, useRef, RefObject } from 'react';

const useInView = <T extends HTMLElement>(options: IntersectionObserverInit): { ref: RefObject<T>, isInView: boolean } => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return { ref, isInView };
};

export default useInView;
