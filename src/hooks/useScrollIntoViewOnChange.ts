import { useEffect, useRef } from 'react';

export default function useScrollIntoViewOnChange<T extends HTMLElement>(
  key: string
) {
  const ref = useRef<T>(null);
  const previousKey = useRef(key);

  useEffect(() => {
    if (previousKey.current === key) return;
    previousKey.current = key;

    const element = ref.current;
    if (!element) return;

    const marginTop =
      Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
    if (element.getBoundingClientRect().top >= marginTop) return;

    element.scrollIntoView({ block: 'start' });
  }, [key]);

  return ref;
}
