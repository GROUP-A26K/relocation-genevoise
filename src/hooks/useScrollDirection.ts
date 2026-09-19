'use client';

import { useSyncExternalStore } from 'react';

export type TScrollDirection = 'up' | 'down';

const THRESHOLD = 4;

const DEFAULT_DIRECTION: TScrollDirection = 'down';

let direction: TScrollDirection = DEFAULT_DIRECTION;
let lastY = 0;
let frameId = 0;

const listeners = new Set<() => void>();

function getScrollY() {
  return Math.max(0, window.scrollY);
}

function measure() {
  frameId = 0;

  const currentY = getScrollY();
  const delta = currentY - lastY;

  if (Math.abs(delta) < THRESHOLD) {
    return;
  }

  lastY = currentY;

  const next: TScrollDirection = delta > 0 ? 'down' : 'up';

  if (next === direction) {
    return;
  }

  direction = next;
  listeners.forEach((listener) => listener());
}

function handleScroll() {
  if (frameId) {
    return;
  }

  frameId = requestAnimationFrame(measure);
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    lastY = getScrollY();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);

    if (listeners.size > 0) {
      return;
    }

    window.removeEventListener('scroll', handleScroll);

    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }

    direction = DEFAULT_DIRECTION;
  };
}

const getSnapshot = () => direction;

const getServerSnapshot = () => DEFAULT_DIRECTION;

export default function useScrollDirection(): TScrollDirection {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
