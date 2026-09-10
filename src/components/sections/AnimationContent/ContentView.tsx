'use client';

import { ContentContainer } from './ContentContainer';
import { Content, type IContentProps } from './Content';

export const ContentView: React.FC<IContentProps> = ({ items }) => {
  return (
    <ContentContainer>
      <Content items={items} />
    </ContentContainer>
  );
};
