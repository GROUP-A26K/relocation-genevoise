import Button from "@/components/customs/Button";
import { cn } from "@/libs/utils";
import { FC } from "react";

interface TabsMenuProps {
  activeValue?: string;
  category: { title: string }[];
  onClick: (filterBy: string) => void;
}

const TabsMenu: FC<TabsMenuProps> = ({ activeValue, category, onClick }) => {
  const handleTabClick = (filterBy: string) => {
    onClick(filterBy);
  };

  return (
    <div className="flex p-1 bg-grey-50 w-fit rounded-full">
      <Button
        as="ghost"
        type="primary"
        variant="md"
        className={cn(
          activeValue !== "" &&
            "bg-grey-50 shadow-none text-grey-500 hover:bg-grey-50 hover:text-grey-500 active:bg-secondary-50 active:text-primary-500",
          activeValue === "" &&
            "bg-secondary-50 text-primary-500 shadow-none active:bg-secondary-50 active:text-primary-500"
        )}
        onClick={() => handleTabClick("")}
      >
        {"Selected"}
      </Button>
      {category.map((cat) => (
        <Button
          key={cat.title}
          as="ghost"
          type="primary"
          variant="md"
          className={cn(
            activeValue !== cat.title &&
              "bg-grey-50 shadow-none text-grey-500 hover:bg-grey-50 hover:text-grey-500 active:bg-secondary-50 active:text-primary-500",
            activeValue === cat.title &&
              "bg-secondary-50 text-primary-500 shadow-none active:bg-secondary-50 active:text-primary-500"
          )}
          onClick={() => handleTabClick(cat.title)}
        >
          {cat.title}
        </Button>
      ))}
    </div>
  );
};

export default TabsMenu;
