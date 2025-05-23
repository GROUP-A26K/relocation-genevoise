"use client";
import { ContentContainer } from "./ContentContainer";
import { Content, ContentProps } from "./Content";
import { FC } from "react";
export const ContentView: FC<ContentProps> = ({ section }) => {
  return (
    <ContentContainer>
      <Content section={section} />
    </ContentContainer>
  );
};
