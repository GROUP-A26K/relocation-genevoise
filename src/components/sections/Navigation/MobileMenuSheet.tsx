'use client';

import { useState } from 'react';
import { Twirl } from 'hamburger-react';

import {
  Sheet,
  SheetContent,
  SheetPortal,
  SheetTrigger,
} from '@/components/ui/sheet';

interface IMobileMenuSheetProps {
  phoneAction: React.ReactNode;
  children: React.ReactNode;
}

const MobileMenuSheet = ({ phoneAction, children }: IMobileMenuSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <div className="flex flex-row gap-3">
        {phoneAction}
        <SheetTrigger asChild>
          <div
            className="relative size-10 overflow-hidden [&>.hamburger-react]:absolute [&>.hamburger-react]:-inset-1"
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                setOpen((isOpen) => !isOpen);
              }
            }}
          >
            <Twirl
              toggled={open}
              label={open ? 'Close navigation menu' : 'Open navigation menu'}
              duration={0.35}
              size={22}
              hideOutline={false}
            />
          </div>
        </SheetTrigger>
      </div>
      <SheetPortal forceMount>
        <div
          aria-hidden="true"
          data-state={open ? 'open' : 'closed'}
          className="fixed inset-0 z-9 bg-white/50 opacity-0 transition-opacity duration-300 data-[state=closed]:pointer-events-none data-[state=open]:opacity-100"
          onClick={() => setOpen(false)}
        />
      </SheetPortal>
      <SheetContent
        side="top"
        className="fixed top-18 z-10 max-h-[calc(100dvh-4.5rem)] w-full overflow-y-auto p-0 nav:hidden"
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenuSheet };
