import { useEffect, useState } from 'react';

export function useIsStuck(offsetTop: number) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    if (!element) return;

    let frame: number | null = null;

    const check = () => {
      if (frame !== null) return;

      frame = requestAnimationFrame(() => {
        frame = null;
        setIsStuck(element.getBoundingClientRect().top <= offsetTop);
      });
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [element, offsetTop]);

  return { ref: setElement, isStuck };
}
