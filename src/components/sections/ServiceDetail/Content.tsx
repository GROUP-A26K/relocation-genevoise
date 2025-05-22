"use client";
import { FC } from "react";

interface ContentProps {
  position?: string;
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const Content: FC<ContentProps> = ({ items }) => {
  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto w-full 2xl:max-w-[672px] xl:max-w-[620px] max-w-[672px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col items-end">
        <div className="w-full max-w-[560px] flex">
          <div className="flex flex-col gap-16">
            <div className="relative flex flex-col gap-8">
              {items.map((item, index) => (
                <div key={index} {...item}>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-base text-gray-700">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
