"use client";
import { ReactNode } from "react";

interface PropertyDetailSectionProps {
  title?: string;
  content: ReactNode;
}

export const PropertyDetailSection = ({
  title,
  content,
}: PropertyDetailSectionProps) => {
  return (
    <div className="flex flex-col gap-6">
      {title && (
        <h2 className="font-semibold !leading-[130%] text-2xl">{title}</h2>
      )}
      <div className="w-full">{content}</div>
    </div>
  );
};
