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

interface Props {
  username: string;
  baseUrl: string;
  locale: 'en' | 'fr';
}

const copy = {
  en: {
    preview: 'Thank you for your application!',
    heading: 'We’ve Received Your Application <br /> Thank You!',
    hi: 'Hi',
    thanks: 'Thank you for reaching out to us through our contact form.',
    received:
      'We’ve received your application, and a member of our recruitment team will get back to you as soon as possible — typically within 1–2 business days.',
    urgent: 'If your request is urgent, feel free to call us directly at ',
    explore: 'In the meantime, feel free to explore our services at ',
    appreciate: 'We appreciate your interest in joining us!',
    regards: 'Best regards,',
    team: 'The Relocation Genevoise Recruitment Team',
    footer:
      'This email was sent to <strong>contact@relocation-genevoise.ch</strong> because you submitted a job application to Relocation Genevoise.',
    contactUs: 'Contact us',
    privacy: 'Privacy policy',
    unsubscribe: 'Unsubscribe',
  },
  fr: {
    preview: 'Merci pour votre candidature !',
    heading: 'Nous avons bien reçu votre candidature <br /> Merci !',
    hi: 'Bonjour',
    thanks: 'Merci de nous avoir contactés via notre formulaire.',
    received:
      'Nous avons bien reçu votre candidature. Un membre de notre équipe de recrutement vous répondra dans les plus brefs délais — généralement sous 1 à 2 jours ouvrables.',
    urgent:
      'Si votre demande est urgente, n’hésitez pas à nous appeler directement au ',
    explore: 'En attendant, vous pouvez consulter nos services ici : ',
    appreciate: 'Merci pour l’intérêt que vous portez à notre entreprise !',
    regards: 'Cordialement,',
    team: 'L’équipe de recrutement d’Assurance Genevoise',
    footer:
      'Cet e-mail a été envoyé à <strong>contact@relocation-genevoise.ch</strong> car vous avez soumis une candidature à Relocation Genevoise.',
    contactUs: 'Nous contacter',
    privacy: 'Politique de confidentialité',
    unsubscribe: 'Se désabonner',
  },
} as const;

export const Application = ({ username, baseUrl, locale = 'en' }: Props) => {
  const t = copy[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>

      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px] rounded border border-solid border-[#eaeaea]">
            {/* ---------- Header ---------- */}
            <Section className="px-[32px] py-[40px]">
              <Row>
                <Column className="w-[50%]">
                  <Img
                    src={`${baseUrl}rg-logo.png`}
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
                          src={`${baseUrl}globe-lucid.png`}
                          width="13"
                          className="my-auto ml-auto"
                          height="13"
                          alt="Globe icon"
                        />
                        <Text className="ml-1 text-xs leading-[100%]! font-semibold text-[#605204]">
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
              className="m-8 mb-6 text-start text-3xl leading-[130%]! font-semibold text-[#605204]"
              dangerouslySetInnerHTML={{ __html: t.heading }}
            />

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.hi} <strong>{username}</strong>,
            </Text>

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.thanks}
            </Text>

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.received}
            </Text>

            <Text className="px-8 text-[14px] leading-[24px] text-black">
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

            <Text className="px-8 text-[14px] leading-[24px] text-black">
              {t.appreciate}
            </Text>

            <Text className="mb-0 px-8 text-[14px] leading-[24px] text-black">
              {t.regards}
            </Text>
            <Text className="mt-0 px-8 text-[14px] leading-[24px] text-black">
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
                className="text-center text-[14px] leading-[24px] text-[#605204]"
                dangerouslySetInnerHTML={{ __html: t.footer }}
              />

              <Row>
                {/* Left column: icons + info */}
                <Column colSpan={4}>
                  {/* phone */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}phone-call-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Phone"
                      />
                      <Text className="my-0 mr-auto ml-1 text-xs leading-[100%]! font-semibold text-[#605204]">
                        +41 (022) 715 17 45
                      </Text>
                    </div>
                  </Link>

                  {/* website */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}globe-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Globe"
                      />
                      <Text className="my-3 mr-auto ml-1 text-xs leading-[100%]! font-semibold text-[#605204]">
                        https://relocation-genevoise/ch
                      </Text>
                    </div>
                  </Link>

                  {/* address */}
                  <Link href="https://relocation-genevoise.ch">
                    <div style={{ display: 'flex' }}>
                      <Img
                        src={`${baseUrl}buildings-lucid.png`}
                        width="13"
                        className="my-auto"
                        height="13"
                        alt="Building"
                      />
                      <Text className="my-0 mr-auto ml-1 text-xs leading-[100%]! font-semibold text-[#605204]">
                        Rue des Alpes 5, 1201 Geneva
                      </Text>
                    </div>
                  </Link>
                </Column>

                {/* Right column: links */}
                <Column colSpan={4}>
                  <Link href="https://relocation-genevoise.ch/contact">
                    <Text className="mr-5 ml-auto text-xs leading-[100%]! font-semibold text-[#605204]">
                      {t.contactUs}
                    </Text>
                  </Link>

                  <Link href="https://relocation-genevoise.ch/mentions-legales">
                    <Text className="my-3 ml-auto text-xs leading-[100%]! font-semibold text-[#605204]">
                      {t.privacy}
                    </Text>
                  </Link>

                  <Text className="mr-2 ml-auto text-xs leading-[100%]! font-semibold text-[#605204]">
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

Application.PreviewProps = {
  username: 'Gavin',
  baseUrl: 'https://relocation-genevoise.vercel.app/',
  locale: 'en',
} as Props;
export default Application;
