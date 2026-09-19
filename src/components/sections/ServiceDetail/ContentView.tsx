'use client';
import { ContentContainer } from './ContentContainer';
import { Content, type IContentProps } from './Content';

interface IContentViewProps extends IContentProps {}

export const ContentView: React.FC<IContentViewProps> = ({ section }) => {
  return (
    <ContentContainer>
      <Content section={section} />
    </ContentContainer>
  );
};
