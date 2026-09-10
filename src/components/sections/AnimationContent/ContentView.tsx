'use client';
import { ContentContainer } from './ContentContainer';
import { Content, type ContentProps } from './Content';

import type { FC } from 'react';
export const ContentView: FC<ContentProps> = ({ items }) => {
  return (
    <ContentContainer>
      <Content items={items} />
    </ContentContainer>
  );
};
