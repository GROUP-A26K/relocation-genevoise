'use client';
import { ContentContainer } from './ContentContainer';
import { Content, type ContentProps } from './Content';

import type { FC } from 'react';
export const ContentView: FC<ContentProps> = ({ section }) => {
  return (
    <ContentContainer>
      <Content section={section} />
    </ContentContainer>
  );
};
