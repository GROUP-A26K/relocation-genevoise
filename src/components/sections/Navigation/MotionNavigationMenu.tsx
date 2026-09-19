'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { usePathname } from '@/libs/i18nNavigation';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { NavMotionContext } from './NavMotionContext';

const INDICATOR_EXIT_DELAY = 300;

interface IMotionNavigationMenuProps {
  children: React.ReactNode;
  className?: string;
  listClassName?: string;
  routeItems: Array<{
    key: string;
    paths: string[];
  }>;
}

const MotionNavigationMenu = ({
  children,
  className,
  listClassName,
  routeItems,
}: IMotionNavigationMenuProps) => {
  const pathname = usePathname();

  const [openKey, setOpenKey] = useState('');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [shouldGrow, setShouldGrow] = useState(true);

  const indicatorKeyRef = useRef<string | null>(null);

  const routeActiveKey = useMemo(
    () =>
      routeItems.find(({ paths }) =>
        paths.some(
          (path) =>
            path !== '#' &&
            (pathname === path ||
              (path !== '/' && pathname.startsWith(`${path}/`)))
        )
      )?.key ?? null,
    [pathname, routeItems]
  );

  const activeKey = hoveredKey ?? (openKey || null);
  const indicatorKey = activeKey ?? lastKey;

  useEffect(() => {
    indicatorKeyRef.current = indicatorKey;
  }, [indicatorKey]);

  const handleHover = useCallback((key: string | null) => {
    setHoveredKey(key);

    if (key) {
      setShouldGrow(key !== indicatorKeyRef.current);
      setLastKey(key);
    }
  }, []);

  useEffect(() => {
    if (activeKey || !lastKey) {
      return;
    }

    const timeout = setTimeout(() => setLastKey(null), INDICATOR_EXIT_DELAY);

    return () => clearTimeout(timeout);
  }, [activeKey, lastKey]);

  const contextValue = useMemo(
    () => ({
      activeKey,
      indicatorKey,
      routeActiveKey,
      shouldGrow,
      setHoveredKey: handleHover,
    }),
    [activeKey, indicatorKey, routeActiveKey, shouldGrow, handleHover]
  );

  return (
    <NavMotionContext.Provider value={contextValue}>
      <NavigationMenu
        value={openKey}
        onValueChange={setOpenKey}
        className={className}
      >
        <NavigationMenuList
          className={listClassName}
          onPointerLeave={() => handleHover(null)}
        >
          {children}
        </NavigationMenuList>
      </NavigationMenu>
    </NavMotionContext.Provider>
  );
};

export default MotionNavigationMenu;
