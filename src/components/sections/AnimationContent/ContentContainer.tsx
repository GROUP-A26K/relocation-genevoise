import { RevealSection } from '@/components/customs/Reveal';

interface IContentContainerProps {
  children: React.ReactNode;
}

export const ContentContainer: React.FC<IContentContainerProps> = ({
  children,
}) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-black-500">
      <RevealSection className="container px-4 pb-14 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-12 lg:pb-16 xl:max-w-(--breakpoint-xl) xl:px-25 2xl:max-w-(--breakpoint-2xl)">
        {children}
      </RevealSection>
    </section>
  );
};
