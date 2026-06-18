import { House, KeyRound } from "lucide-react";

import { cn } from "@/libs/utils";
import { Link } from "@/libs/i18nNavigation";

export type TFindATenantAudience = "landlords" | "tenant";

interface IHeroTabsProps {
  active: TFindATenantAudience;
  labels: { landlords: string; tenant: string };
}

const TABS = [
  { key: "landlords", href: "/find-a-tenant/landlords", Icon: KeyRound },
  { key: "tenant", href: "/find-a-tenant/tenant", Icon: House },
] as const;

export default function HeroTabs({ active, labels }: IHeroTabsProps) {
  return (
    <div className="flex w-fit items-center rounded-full border border-grey-100 bg-grey-50 p-1">
      {TABS.map(({ key, href, Icon }) => {
        const isActive = key === active;

        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group flex items-center gap-2 rounded-full px-3 py-2 text-base font-semibold !leading-[130%] transition-colors",
              isActive
                ? "bg-black-500 text-white shadow-sm"
                : "text-black-200 hover:text-black-500",
            )}
          >
            <Icon
              className={cn("size-4 shrink-0", {
                "group-hover:text-grey-900": !isActive,
              })}
            />
            {labels[key]}
          </Link>
        );
      })}
    </div>
  );
}
