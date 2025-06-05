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
            "bg-grey-50 shadow-none text-black-500 hover:bg-grey-50 hover:text-black-500 active:bg-black-400 active:text-white",
          activeValue === "" &&
            "bg-black-400 text-white shadow-none active:bg-black-400 active:text-white hover:bg-black-400 hover:text-white"
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
              "bg-grey-50 shadow-none text-black-500 hover:bg-grey-50 hover:text-black-500 active:bg-black-400 active:text-white",
            activeValue === cat.title &&
              "bg-black-400 text-white shadow-none active:bg-black-400 active:text-white hover:bg-black-400 hover:text-white"
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
