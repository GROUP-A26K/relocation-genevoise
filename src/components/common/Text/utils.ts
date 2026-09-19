import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Typography owns its line height independently of font size. Keep an explicit
// leading utility when only size changes; slash modifiers (text-sm/6) still
// replace leading through tailwind-merge's modifier conflict configuration.
const mergeText = extendTailwindMerge({
  override: { conflictingClassGroups: { 'font-size': [] } },
});

export function cn(...inputs: ClassValue[]) {
  return mergeText(clsx(inputs));
}
