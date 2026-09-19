'use client';

import { createContext, useContext } from 'react';

type TNavMotionContext = {
  activeKey: string | null;
  routeActiveKey: string | null;
  indicatorKey: string | null;
  shouldGrow: boolean;
  setHoveredKey: (key: string | null) => void;
};

const NavMotionContext = createContext<TNavMotionContext | null>(null);

const useNavMotion = () => {
  const context = useContext(NavMotionContext);

  if (!context) {
    throw new Error('useNavMotion must be used inside a MotionNavigationMenu');
  }

  return context;
};

export { NavMotionContext, useNavMotion };
export type { TNavMotionContext };
