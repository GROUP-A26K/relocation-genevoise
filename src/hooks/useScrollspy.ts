import { useLayoutEffect, useState } from 'react';

// Helpers
const clamp = (value: number) => Math.max(0, value);
const isBetween = (value: number, floor: number, ceil: number) =>
  value >= floor && value <= ceil;

// Hook
export const useScrollspy = (ids: string[], offset: number = 0) => {
  const [activeId, setActiveId] = useState(ids[0]);
  const [isManualUpdate, setIsManualUpdate] = useState(false);

  useLayoutEffect(() => {
    const listener = () => {
      if (isManualUpdate) return;
      const scroll = window.pageYOffset;
      const positions = ids.map((id) => {
        const element = document.getElementById(id);
        if (!element) return { id, top: -1, bottom: -1 };

        const rect = element.getBoundingClientRect();
        const top = clamp(rect.top + scroll - offset);
        const bottom = clamp(rect.bottom + scroll - offset);

        return { id, top, bottom };
      });

      const activePosition = positions.find(({ top, bottom }) =>
        isBetween(scroll, top, bottom)
      );

      if (activePosition?.id) {
        setActiveId(activePosition.id);
      } else {
        const validPositions = positions.filter((p) => p.top !== -1);
        if (validPositions.length) {
          const sortedPositions = validPositions.sort((a, b) => a.top - b.top);
          if (scroll < sortedPositions[0].top) {
            setActiveId(ids[0]);
          } else if (
            scroll > sortedPositions[sortedPositions.length - 1].bottom
          ) {
            setActiveId(sortedPositions[sortedPositions.length - 1].id);
          }
        } else {
          setActiveId('');
        }
      }
    };

    listener();

    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  }, [ids, offset, isManualUpdate]);

  const handleSetActiveId = (id: string) => {
    setIsManualUpdate(true);
    setActiveId(id);
    setTimeout(() => {
      setIsManualUpdate(false);
    }, 0);
  };

  return { activeId, setActiveId: handleSetActiveId };
};
