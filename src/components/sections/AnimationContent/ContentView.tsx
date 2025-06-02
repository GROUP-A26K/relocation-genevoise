"use client";
import { ContentContainer } from "./ContentContainer";
import { Content, ContentProps } from "./Content";
import { FC } from "react";
export const ContentView: FC<ContentProps> = ({ items }) => {
  return (
    <ContentContainer>
      <Content items={items} />
    </ContentContainer>
  );
};
