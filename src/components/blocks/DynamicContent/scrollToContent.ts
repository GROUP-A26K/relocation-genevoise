export function scrollToContent(id: string, reduceMotion = false) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  let top = 0;
  let parent: HTMLElement | null = element;
  while (parent) {
    top += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement | null;
  }

  const margin =
    Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const hash = `#${encodeURIComponent(id)}`;

  if (window.location.hash !== hash) {
    window.history.pushState(window.history.state, '', hash);
  }

  window.scrollTo({
    top: Math.max(0, top - margin),
    behavior: reduceMotion ? 'instant' : 'smooth',
  });
}
