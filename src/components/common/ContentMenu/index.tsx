import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

import type { IContentMenuProps } from './types';

export const ContentMenu: React.FC<IContentMenuProps> = (props) => {
  return (
    <>
      <DesktopMenu {...props} />
      <MobileMenu {...props} />
    </>
  );
};
