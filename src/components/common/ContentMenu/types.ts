export type TContentMenuItem = {
  id: string;
  title: string;
};

export interface IContentMenuProps {
  title?: string;
  activeId: string;
  setActiveId: (id: string) => void;
  menuItems: TContentMenuItem[];
  isTableContent?: boolean;
  className?: string;
}
