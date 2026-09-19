import { FormDraftProvider } from '@/components/providers/FormDraftProvider';

import type { ReactNode } from 'react';

interface IRootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return <FormDraftProvider>{children}</FormDraftProvider>;
}
