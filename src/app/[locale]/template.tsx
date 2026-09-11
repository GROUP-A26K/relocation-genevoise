import { Footer } from '@/components/sections/Footer';
import { Whatsapp } from '@/components/blocks/Whatsapp';

export default function Template({ children }: { children: React.ReactNode }) {
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
