import { Footer } from '@/components/sections/Footer';
import { Whatsapp } from '@/components/blocks/Whatsapp';

export default function Template(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <main>
        <Whatsapp phoneNumber="41783371528" />
        {props.children}
      </main>
      <Footer />
    </>
  );
}
