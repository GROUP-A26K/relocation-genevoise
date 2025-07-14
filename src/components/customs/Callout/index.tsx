import React from "react";
import cn from "classnames";
import { Book, Siren, SunMedium } from "lucide-react";

type CalloutType = "goodToKnow" | "information" | "error";

const STYLE_SECTION: Record<CalloutType, string> = {
  goodToKnow: cn("bg-green-50 text-green-600 border-green-100"),
  information: cn("bg-cyan-50 text-cyan-600 border-cyan-100"),
  error: cn("bg-red-50 text-red-600 border-red-100"),
};

const STYLE_ICON: Record<CalloutType, string> = {
  goodToKnow: cn("bg-green-100 text-green-600"),
  information: cn("bg-cyan-100 text-cyan-600"),
  error: cn("bg-red-100 text-red-600"),
};

const STYLE_TITLE: Record<CalloutType, string> = {
  goodToKnow: cn("text-green-600"),
  information: cn("text-cyan-600"),
  error: cn("text-red-600"),
};

type CalloutProps = {
  title: string;
  content: React.ReactNode;
  sectionType: CalloutType;
};

const Callout: React.FC<CalloutProps> = ({ sectionType, content, title }) => {
  const Icon = {
    goodToKnow: SunMedium,
    information: Book,
    error: Siren,
  }[sectionType];

  return (
    <div className={cn("py-4 w-full", "lg:py-6")}>
      <div
        className={cn(
          "p-4 rounded-2xl flex flex-col items-start justify-start gap-2 border border-solid",
          "lg:p-6 lg:gap-4",
          STYLE_SECTION[sectionType]
        )}
      >
        <div className="flex items-center justify-start gap-2">
          {Icon && (
            <div
              className={cn("p-[6px] rounded-full", STYLE_ICON[sectionType])}
            >
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h3
            className={cn(
              "text-lg !leading-[130%] font-semibold",
              STYLE_TITLE[sectionType]
            )}
          >
            {title}
          </h3>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Callout;
