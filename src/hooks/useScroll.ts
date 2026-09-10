import { useRef, useState, useCallback, useLayoutEffect } from 'react';

interface IScrollOptions {
  headerSelector?: string;
  preserveScrollPosition?: boolean;
  lockActiveDuringScroll?: boolean;
}

export const useScroll = (
  ids: string[],
  offset = 0,
  {
    headerSelector,
    preserveScrollPosition = false,
    lockActiveDuringScroll = false,
  }: IScrollOptions = {}
) => {
  const [activeId, setActiveId] = useState(ids[0] ?? '');
  const activeIdRef = useRef(activeId);
  const manualScroll = useRef(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const releaseManualScroll = useCallback(() => {
    manualScroll.current = false;
    if (unlockTimer.current) clearTimeout(unlockTimer.current);
    unlockTimer.current = null;
  }, []);

  const scheduleUnlock = useCallback(() => {
    if (unlockTimer.current) clearTimeout(unlockTimer.current);
    // Debounce scroll events instead of guessing the duration of a smooth scroll.
    unlockTimer.current = setTimeout(releaseManualScroll, 200);
  }, [releaseManualScroll]);
  const pendingAnchor = useRef<{ element: HTMLElement; top: number } | null>(
    null
  );

  const handleSetActiveId = useCallback(
    (id: string) => {
      if (id === activeIdRef.current) return;

      const element = document.getElementById(id);
      pendingAnchor.current =
        preserveScrollPosition && element
          ? { element, top: element.getBoundingClientRect().top }
          : null;
      activeIdRef.current = id;
      setActiveId(id);
    },
    [preserveScrollPosition]
  );

  useLayoutEffect(() => {
    const anchor = pendingAnchor.current;
    pendingAnchor.current = null;
    if (!anchor?.element.isConnected) return;

    const delta = anchor.element.getBoundingClientRect().top - anchor.top;
    if (Math.abs(delta) > 0.5) {
      window.scrollBy({ top: delta, behavior: 'instant' });
    }
  }, [activeId]);

  useLayoutEffect(() => {
    const header = headerSelector
      ? document.querySelector<HTMLElement>(headerSelector)
      : null;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (manualScroll.current) return;
      const triggerLine =
        Math.max(0, header?.getBoundingClientRect().bottom ?? 0) + offset;
      let nextId = '';
      let lastTop = -Infinity;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (!nextId) nextId = id;

        const top = element.getBoundingClientRect().top;
        if (top <= triggerLine + 1 && top > lastTop) {
          nextId = id;
          lastTop = top;
        }
      }

      handleSetActiveId(nextId);
    };

    const listener = () => {
      if (manualScroll.current) scheduleUnlock();
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
        ].includes(event.key)
      ) {
        releaseManualScroll();
      }
    };

    update();

    const observer = new ResizeObserver(listener);
    if (header) observer.observe(header);
    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener, { passive: true });
    window.addEventListener('wheel', releaseManualScroll, { passive: true });
    window.addEventListener('touchstart', releaseManualScroll, {
      passive: true,
    });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
      window.removeEventListener('wheel', releaseManualScroll);
      window.removeEventListener('touchstart', releaseManualScroll);
      window.removeEventListener('keydown', handleKeyDown);
      releaseManualScroll();
    };
  }, [
    ids,
    offset,
    headerSelector,
    handleSetActiveId,
    releaseManualScroll,
    scheduleUnlock,
  ]);

  const selectActiveId = useCallback(
    (id: string) => {
      if (lockActiveDuringScroll) {
        manualScroll.current = true;
        scheduleUnlock();
      }
      handleSetActiveId(id);
    },
    [lockActiveDuringScroll, scheduleUnlock, handleSetActiveId]
  );

  return { activeId, setActiveId: selectActiveId };
};
