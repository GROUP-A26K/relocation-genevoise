export interface IContentMenuItem {
  id: string;
  title: string;
}

export interface IContentMenuProps {
  title?: string;
  activeId: string;
  setActiveId: (id: string) => void;
  menuItems: IContentMenuItem[];
  isTableContent?: boolean;
  className?: string;
}
