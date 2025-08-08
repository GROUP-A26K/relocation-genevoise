import { Whatsapp } from "@/components/blocks/Whatsapp";
import { Footer } from "@/components/sections/Footer";

export default async function Template(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <main>
        <Whatsapp phoneNumber={"41783371528"} />
        {props.children}
      </main>
      <Footer />
    </>
  );
}
