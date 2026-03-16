"use client";

import Button from "@/components/customs/Button";
import { Globe } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { usePathname } from "@/libs/i18nNavigation";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import { getAlternatePath } from "@/utils/Helpers";
import { fetchCareerSlugBySlug } from "@/services/career/career.service";
import { fetchBlogSlugBySlug } from "@/services/blog.service";
import { fetchPropertySlugBySlug } from "@/services/property.service";
interface LanguageSelectorProps {
  className?: string;
}
const [english, french]: string[] = ["en", "fr"];
const LanguageSelector: FC<LanguageSelectorProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isRotated, setIsRotated] = useState(false);

  const handleContentTranslation = async (
    pathname: string,
    locale: string,
    targetLocale: string,
    fetchFunction: (slug: string) => Promise<
      {
        locale: string;
        slug: string;
        href: string;
      }[]
    >
  ) => {
    try {
      const currentSlug = pathname.split("/")[2];
      const response = await fetchFunction(`${locale}-${currentSlug}`);

      if (response.length === 0) {
        return null;
      }

      const translatedItem = response.find(
        (item) => item.locale === targetLocale
      );
      return translatedItem?.href
        ? `/${targetLocale}${translatedItem.href}`
        : null;
    } catch (error) {
      console.error("Failed to fetch translated URL:", error);
      return null;
    }
  };

  const handleChange = async () => {
    const targetLocale = locale === "fr" ? "en" : "fr";

    if (pathname?.startsWith("/blog/")) {
      const translatedUrl = await handleContentTranslation(
        pathname,
        locale,
        targetLocale,
        fetchBlogSlugBySlug
      );

      if (translatedUrl) {
        router.push(translatedUrl);
        router.refresh();
        return;
      }
    }

    if (
      pathname?.startsWith("/carriere/") ||
      pathname?.startsWith("/career/")
    ) {
      const translatedUrl = await handleContentTranslation(
        pathname,
        locale,
        targetLocale,
        fetchCareerSlugBySlug
      );

      if (translatedUrl) {
        router.push(translatedUrl);
        router.refresh();
        return;
      }
    }

    if (pathname?.startsWith("/properties/")) {
      const translatedUrl = await handleContentTranslation(
        pathname,
        locale,
        targetLocale,
        fetchPropertySlugBySlug
      );

      if (translatedUrl) {
        router.push(translatedUrl);
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
          isRotated && "rotate-180"
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
