import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet-custom";
import { PhoneCall, X } from "lucide-react";
import MenuIcon from "@/assets/img/icons/menu-icon.webp";
import { Accordion } from "@/components/ui/accordion-custom";
import { renderMobileMenuItem } from "@/components/blocks/MenuItem/MobileMenuItem";
import { NavbarProps } from "./NavbarContainer";
import { Link } from "@/libs/i18nNavigation";
import Image from "next/image";
import Logo from "@/assets/img/logos/rg-logo.svg";
import IconButton from "@/components/customs/IconButton";
import Button from "@/components/customs/Button";
import { LanguageSelector } from "./LanguageSelector";

const MobileMenu = ({ menu, callButton }: NavbarProps) => {
  return (
    <nav className="bg-white z-20 h-[72px] w-full md:px-4 px-4 nav:hidden">
      <div className="flex h-full w-full min-w-[205px] items-center justify-between relative">
        <Link
          href={"/"}
          className="flex items-center gap-2 pointer-events-auto"
        >
          <Image
            src={Logo.src}
            alt="Assurance Genevoise, courtier en assurance à Genève"
            title="Assurance Genevoise, courtier en assurance à Genève"
            width={57}
            height={21.97}
            className="min-w-[57px]"
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild className="z-20 absolute right-0">
            <span className="group">
              <IconButton
                variant="lg"
                type="primary"
                as="solid"
                className="border-2 border-white rounded-none bg-white text-black-500 active:!bg-white hover:!bg-white group-[&[data-state='open']]:hidden pointer-events-auto shadow-none"
                icon={() => (
                  <Image
                    height={22}
                    width={22}
                    src={MenuIcon.src}
                    alt="X logo"
                    title="X logo"
                  ></Image>
                )}
              />
            </span>
          </SheetTrigger>

          <div className="flex flex-row gap-3">
            <Link href={callButton?.url ?? "/rappelez-moi"}>
              <SheetClose asChild>
                <Button
                  as="ghost"
                  variant="md"
                  type="secondary"
                  className="w-full border-2 border-white pointer-events-auto whitespace-normal"
                  iconStart={PhoneCall}
                >
                  <div className="line-clamp-1">41 22 715 17 48</div>
                </Button>
              </SheetClose>
            </Link>
            <SheetClose asChild>
              <IconButton
                variant="lg"
                type="primary"
                as="solid"
                className="border-2 border-white rounded-[0.5rem] bg-black-500 text-white active:!bg-black-500 hover:!bg-black-500 group-[&[data-state='closed']]:hidden pointer-events-auto shadow-none"
                icon={X}
              />
            </SheetClose>
          </div>

          <SheetPortal>
            <SheetOverlay />
            <SheetContent
              side="top"
              className="absolute w-full p-0 pt-[72px] z-10 max-h-screen overflow-scroll lg:hidden"
            >
              <SheetHeader>
                <SheetTitle></SheetTitle>
              </SheetHeader>
              <div className="flex flex-col">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <LanguageSelector className="active:bg-transparent hover:bg-transparent bg-transparent shadow-none" />

                <div className="flex flex-col gap-3 p-3">
                  <Link
                    href={callButton?.url ?? "/rappelez-moi"}
                    className="flex items-center"
                  >
                    <SheetClose asChild>
                      <Button
                        as="solid"
                        variant="md"
                        type="primary"
                        className="w-full"
                        iconStart={PhoneCall}
                      >
                        {callButton?.text}
                      </Button>
                    </SheetClose>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </SheetPortal>
        </Sheet>
      </div>
    </nav>
  );
};

export { MobileMenu };
