'use client';

import { useEffect, useState } from 'react';

interface INavigationHeaderProps {
  children: React.ReactNode;
}

const NavigationHeader = ({ children }: INavigationHeaderProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 0);

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-white transition-shadow duration-200 data-[scrolled=true]:shadow-[0_4px_14px_rgba(15,23,42,0.08)]"
      data-scrolled={hasScrolled}
    >
      {children}
    </header>
  );
};

export default NavigationHeader;
