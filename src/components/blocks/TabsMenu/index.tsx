import Button from "@/components/customs/Button";
import { cn } from "@/libs/utils";
import { useLocale } from "next-intl";
import { FC } from "react";

export type IType = "primary" | "secondary";

interface TabsMenuProps {
  activeValue?: string;
  category: { title: string }[];
  onClick: (filterBy: string) => void;
  variant?: IType;
}

const TabsMenu: FC<TabsMenuProps> = ({
  activeValue = "",
  category,
  onClick,
  variant = "primary",
}) => {
  const locale = useLocale();

  const handleTabClick = (filterBy: string) => {
    if (filterBy === activeValue) return;
    onClick(filterBy);
  };

  /** centralised class builder so we don’t repeat long strings inline */
  const buildClasses = (isActive: boolean) => {
    if (variant === "secondary") {
      return cn(
        isActive
          ? "bg-yellow-400 text-black-500 shadow-none active:bg-yellow-400 active:text-black-500 hover:bg-yellow-400 hover:text-black-500"
          : "bg-grey-50 shadow-none text-black-500 hover:bg-grey-50 hover:text-black-500 active:bg-yellow-400 active:text-black-500"
      );
    }

    return cn(
      isActive
        ? "bg-black-400 text-white shadow-none active:bg-black-400 active:text-white hover:bg-black-400 hover:text-white"
        : "bg-grey-50 shadow-none text-black-500 hover:bg-grey-50 hover:text-black-500 active:bg-black-400 active:text-white"
    );
  };

  /** pass the same Button `type` prop we expose via `variant` */
  const buttonType: "primary" | "secondary" = variant;

  return (
    <div className="flex w-fit rounded-full bg-grey-50 p-1">
      {/* “All / Selected” tab */}
      <Button
        as="ghost"
        type={buttonType}
        variant="md"
        className={buildClasses(activeValue === "")}
        onClick={() => handleTabClick("")}
      >
        {locale === "fr" ? "Tous" : "View all"}
      </Button>

      {/* dynamic tabs */}
      {category.map(({ title }) => (
        <Button
          key={title}
          as="ghost"
          type={buttonType}
          variant="md"
          className={buildClasses(activeValue === title)}
          onClick={() => handleTabClick(title)}
        >
          {title}
        </Button>
      ))}
    </div>
  );
};

export default TabsMenu;
