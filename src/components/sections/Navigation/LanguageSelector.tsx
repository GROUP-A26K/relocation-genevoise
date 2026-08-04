"use client";

import Button from "@/components/customs/Button";
import { Globe } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { usePathname } from "@/libs/i18nNavigation";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import { getAlternatePath } from "@/utils/Helpers";
import {
  resolveAlternateSlug,
  type AlternateContentType,
} from "@/actions/alternateSlug.action";

interface LanguageSelectorProps {
  className?: string;
}

const CONTENT_ROUTES: { prefixes: string[]; type: AlternateContentType }[] = [
  { prefixes: ["/blog/"], type: "blog" },
  { prefixes: ["/carriere/", "/career/"], type: "career" },
  { prefixes: ["/properties/", "/proprietes/"], type: "property" },
];

const [english, french]: string[] = ["en", "fr"];

const LanguageSelector: FC<LanguageSelectorProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isRotated, setIsRotated] = useState(false);

  const handleChange = async () => {
    const targetLocale = locale === "fr" ? "en" : "fr";

    const route = CONTENT_ROUTES.find(({ prefixes }) =>
      prefixes.some((prefix) => pathname?.startsWith(prefix)),
    );

    if (route) {
      const currentSlug = pathname.split("/")[2];

      const translatedUrl = await resolveAlternateSlug(
        route.type,
        `${locale}-${currentSlug}`,
        targetLocale,
      ).catch(() => null);

      if (translatedUrl) {
        router.push(
          pathname.endsWith("/photo-tour")
            ? `${translatedUrl}/photo-tour`
            : translatedUrl,
        );
        router.refresh();
        return;
      }
    }

    router.push(getAlternatePath(`/${locale}${pathname}`));
    router.refresh();
  };

  useEffect(() => {
    setIsRotated((prev) => !prev);
  }, [locale]);

  return (
    <Button
      aria-label="Switch language"
      onClick={handleChange}
      as="ghost"
      variant="md"
      type="primary"
      className={className}
    >
      <Globe
        className={cn(
          "!h-5 !w-5 transition-transform duration-500",
          isRotated && "rotate-180",
        )}
      />
      <div className="flex divide-x-2 divide-grey-200">
        <div className={cn(locale === english && "text-grey-500", "pr-2")}>
          FR
        </div>
        <div className={cn(locale === french && "text-grey-500", "pl-2")}>
          EN
        </div>
      </div>
    </Button>
  );
};

export { LanguageSelector };
