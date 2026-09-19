'use client';

import { motion } from 'motion/react';

import { cn } from '@/libs/utils';

import { useNavMotion } from './NavMotionContext';

const INDICATOR_CLIP_PATH =
  'polygon(0.25rem 0, calc(100% - 0.25rem) 0, 100% 100%, 0 100%)';

interface IMotionNavItemProps {
  itemKey: string;
  children: React.ReactNode;
  className?: string;
}

const MotionNavItem = ({
  itemKey,
  children,
  className,
}: IMotionNavItemProps) => {
  const { activeKey, indicatorKey, routeActiveKey, shouldGrow, setHoveredKey } =
    useNavMotion();
  const isRouteActive = routeActiveKey === itemKey;
  const shouldShowHoverIndicator = indicatorKey === itemKey && !isRouteActive;

  return (
    <div
      className={cn('relative flex items-center', className)}
      onPointerEnter={() => setHoveredKey(itemKey)}
    >
      {children}
      {isRouteActive && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.75 bg-secondary-500"
          style={{ clipPath: INDICATOR_CLIP_PATH }}
        />
      )}
      {shouldShowHoverIndicator && (
        <motion.span
          aria-hidden
          layoutId="nav-item-indicator"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.75"
          style={{ clipPath: INDICATOR_CLIP_PATH }}
          transition={{
            layout: { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 },
          }}
        >
          <motion.span
            key={itemKey}
            className="absolute inset-0 bg-secondary-500"
            initial={shouldGrow ? { clipPath: 'inset(0 100% 0 0)' } : false}
            animate={{
              clipPath:
                activeKey === itemKey ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.span>
      )}
    </div>
  );
};

export default MotionNavItem;
