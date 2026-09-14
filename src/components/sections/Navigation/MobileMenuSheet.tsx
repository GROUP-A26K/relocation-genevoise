'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide';
import { MorphIcon } from 'morphicons/react';

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
          <button
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex size-10 cursor-pointer items-center justify-center"
          >
            <MorphIcon icon={open ? X : Menu} size={24} spring="snappy" />
          </button>
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
