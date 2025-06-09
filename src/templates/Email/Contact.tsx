import * as React from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ContactProps {
  username: string;
  baseUrl: string;
  locale: 'en' | 'fr';
}

const copy = {
  en: {
    preview: 'Welcome to our service!',
    heading: 'We Received Your Message <br /> Thank You!',
    hi: 'Hi',
    thanks: 'Thank you for reaching out to us through our contact form.',
    received:
      'We’ve received your message and a member of our team will get back to you as soon as possible — typically within 1–2 business days.',
    urgent: 'If your request is urgent, feel free to call us directly at ',
    explore:
      'In the meantime, feel free to explore more about our services at ',
    appreciate: 'We appreciate you getting in touch!',
    regards: 'Best regards,',
    team: 'The Relocation Genevoise Customer Support',
    footer:
      'This email was sent to <strong>contact@relocation-genevoise.ch</strong> because you signed up to receive newsletter from Relocation Genevoise',
    contactUs: 'Contact us',
    privacy: 'Privacy policy',
    unsubscribe: 'Unsubscribe',
  },
  fr: {
    preview: 'Bienvenue dans notre service !',
    heading: 'Nous avons bien reçu votre message <br /> Merci !',
    hi: 'Bonjour',
    thanks: 'Merci de nous avoir contactés via notre formulaire.',
    received:
      'Nous avons bien reçu votre message et un membre de notre équipe vous répondra dans les plus brefs délais — généralement sous 1 à 2 jours ouvrables.',
    urgent: 'Si votre demande est urgente, appelez-nous directement au ',
    explore: 'En attendant, découvrez nos services ici : ',
    appreciate: 'Nous vous remercions de nous avoir contactés !',
    regards: 'Cordialement,',
    team: 'Le service client d’Relocation Genevoise',
    footer:
      'Cet e-mail a été envoyé à <strong>contact@relocation-genevoise.ch</strong> car vous vous êtes inscrit pour recevoir la newsletter d’Relocation Genevoise',
    contactUs: 'Nous contacter',
    privacy: 'Politique de confidentialité',
    unsubscribe: 'Se désabonner',
  },
} as const;

export const Contact = ({ username, baseUrl, locale = 'en' }: ContactProps) => {
  const t = copy[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto max-w-[600px]">
            {/* ---------- Header ---------- */}
            <Section className="px-[32px] py-[40px]">
              <Row>
                <Column className="w-[50%]">
                  <Img
                    src={`${baseUrl}/rg-logo.png`}
                    width="93.26"
                    height="36"
                    alt="React Email logo"
                  />
                </Column>

                <Column align="right">
                  <Row align="right">
                    <Link href="https://relocation-genevoise.ch">
                      <div style={{ display: 'flex' }}>
                        <Img
                          src={`${baseUrl}/globe-lucid.png`}
                          width="13"
                          className="my-auto ml-auto"
                          height="13"
                          alt="Globe icon"
                        />
                        <Text className="text-[#7C6C06] text-xs font-semibold !leading-[100%] ml-1">
                          https://relocation-genevoise/ch
                        </Text>
                      </div>
                    </Link>
                  </Row>
                </Column>
              </Row>
            </Section>

            {/* ---------- Main copy ---------- */}
            <Heading
              className="text-[#7C6C06] text-3xl font-semibold !leading-[130%] text-start m-8 mb-6"
              dangerouslySetInnerHTML={{ __html: t.heading }}
            />

            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.hi} <strong>{username}</strong>,
            </Text>

            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.thanks}
            </Text>

            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.received}
            </Text>

            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.urgent}
              <strong className="text-[#D7BC12]">
                +41 (022) 715 17 45
              </strong>. {t.explore}
              <Link href="https://relocation-genevoise.ch/service">
                <strong className="text-[#D7BC12]">
                  https://relocation-genevoise.ch/service
                </strong>
              </Link>
            </Text>

            <Text className="text-black text-[14px] leading-[24px] px-8">
              {t.appreciate}
            </Text>

            <Text className="text-black text-[14px] leading-[24px] px-8 mb-0">
              {t.regards}
            </Text>
            <Text className="text-black text-[14px] leading-[24px] px-8 mt-0">
              <strong>{t.team}</strong>
            </Text>

            {/* ---------- Footer ---------- */}
            <Section
              className="p-8"
              style={{
                background: 'linear-gradient(90deg, #F8E166 0%, #FDF6D3 100%)',
                padding: '20px',
                borderRadius: '0 30px 0 0',
              }}
            >
              <Text
                className="text-[#605204] text-[14px] leading-[24px] text-center"
                dangerouslySetInnerHTML={{ __html: t.footer }}
              />

              <Row>
                {/* Left column: icons + info */}
                <Column colSpan={4}>
                  {/* phone */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}/phone-call-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Phone"
                      />
                      <Text className="text-[#605204] text-xs font-semibold !leading-[100%] my-0 ml-1 mr-auto">
                        +41 (022) 715 17 45
                      </Text>
                    </div>
                  </Link>

                  {/* website */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}/globe-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Globe"
                      />
                      <Text className="text-[#605204] text-xs font-semibold !leading-[100%]  my-3 ml-1 mr-auto">
                        https://relocation-genevoise/ch
                      </Text>
                    </div>
                  </Link>

                  {/* address */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}/buildings-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Building"
                      />
                      <Text className="text-[#605204] text-xs font-semibold !leading-[100%] my-0 ml-1 mr-auto">
                        Rue des Alpes 5, 1201 Geneva
                      </Text>
                    </div>
                  </Link>
                </Column>

                {/* Right column: links */}
                <Column colSpan={4}>
                  <Link href="https://relocation-genevoise.ch/contact">
                    <Text className="text-[#605204] text-xs font-semibold !leading-[100%] ml-auto mr-5">
                      {t.contactUs}
                    </Text>
                  </Link>

                  <Link href="https://relocation-genevoise.ch/mentions-legales">
                    <Text className="text-[#605204] text-xs font-semibold !leading-[100%] my-3 ml-auto">
                      {t.privacy}
                    </Text>
                  </Link>

                  <Text className="text-[#605204] text-xs font-semibold !leading-[100%] ml-auto mr-2">
                    {t.unsubscribe}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

Contact.PreviewProps = {
  username: 'Gavin',
  baseUrl: 'http://localhost:3000/',
  locale: 'fr',
} as ContactProps;
export default Contact;
