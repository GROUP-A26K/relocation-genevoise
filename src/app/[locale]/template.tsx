import { Footer } from '@/components/sections/Footer';
import { Whatsapp } from '@/components/common/Whatsapp';

interface ITemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: ITemplateProps) {
  return (
    <>
      <main>
        <Whatsapp phoneNumber="41783371528" />
        {children}
      </main>
      <Footer />
    </>
  );
}
