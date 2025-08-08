import { useEffect, useState, useRef, useCallback } from 'react';

const clamp = (value: number) => Math.max(0, value);
const isBetween = (value: number, floor: number, ceil: number) =>
  value >= floor && value <= ceil;

export const useScrollspy = (ids: string[], offset: number = 0) => {
  const [activeId, setActiveId] = useState('');
  const activeIdRef = useRef('');
  const rafRef = useRef<number | null>(null);
  const isUpdatingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null || isUpdatingRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      try {
        const scroll = window.pageYOffset;
        let newActiveId = '';

        for (const id of ids) {
          const element = document.getElementById(id);
          if (!element) continue;

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);

          if (isBetween(scroll, top, bottom)) {
            newActiveId = id;
            break;
          }
        }

        if (!newActiveId && ids.length > 0) {
          let minDistance = Infinity;
          let closestId = '';

          for (const id of ids) {
            const element = document.getElementById(id);
            if (!element) continue;

            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top - offset);

            if (distance < minDistance) {
              minDistance = distance;
              closestId = id;
            }
          }

          newActiveId = closestId;
        }

        if (newActiveId !== activeIdRef.current) {
          isUpdatingRef.current = true;
          activeIdRef.current = newActiveId;
          setActiveId(newActiveId);
          
          setTimeout(() => {
            isUpdatingRef.current = false;
          }, 0);
        }
      } catch (error) {
        console.warn('Scrollspy error:', error);
      } finally {
        rafRef.current = null;
      }
    });
  }, [ids, offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const handleSetActiveId = useCallback((id: string) => {
    if (id !== activeIdRef.current && !isUpdatingRef.current) {
      isUpdatingRef.current = true;
      activeIdRef.current = id;
      setActiveId(id);
      
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);
    }
  }, []);

  return { activeId, setActiveId: handleSetActiveId };
};
