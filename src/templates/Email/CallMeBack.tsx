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
import { BookingFormInput } from '@/validations/booking.validation';

interface ContactProps {
  userInfo: BookingFormInput;
  baseUrl: string;
  locale: 'en' | 'fr';
}

const copy = {
  en: {
    heading: 'Booking information',
    phone: 'Phone',
  },
  fr: {
    heading: 'Informations de rendez-vous',
    phone: 'Téléphone',
  },
} as const;

export const CallMeBack = ({
  userInfo,
  baseUrl,
  locale = 'en',
}: ContactProps) => {
  const t = copy[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.heading}</Preview>

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
                    <Link href="https://assurance-genevoise.ch">
                      <div style={{ display: 'flex' }}>
                        <Img
                          src={`${baseUrl}/globe-lucid.png`}
                          width="13"
                          className="my-auto ml-auto"
                          height="13"
                          alt="Globe icon"
                        />
                        <Text className="text-[#7C6C06] text-xs font-semibold !leading-[100%] ml-1">
                          https://assurance-genevoise/ch
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
              {t.phone}: <strong>{userInfo.phone}</strong>,
            </Text>

            {/* ---------- Footer ---------- */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

CallMeBack.PreviewProps = {
  userInfo: {
    phone: '000-000-0000',
  },
  baseUrl: 'http://localhost:3000/',
  locale: 'fr',
} as ContactProps;
export default CallMeBack;
